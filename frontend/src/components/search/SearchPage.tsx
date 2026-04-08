import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedProperties, setSavedProperties } from "../../utils/savedProperties";

const BATCH_SIZE = 5;

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Mont Kiara Condos",
    "Cyberjaya Semi-D",
    "Bangsar South Bungalow",
  ]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [sortType, setSortType] = useState<"none" | "low" | "high">("none");

  const categories = [
    { id: "all", label: "All Homes", icon: "grid_view" },
    { id: "apartment", label: "Apartment", icon: "apartment" },
    { id: "condominium", label: "Condo", icon: "home_work" },
    { id: "Semi D", label: "Semi D", icon: "villa" },
    { id: "other", label: "Other", icon: "home" },
  ];
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [riskByPropertyId, setRiskByPropertyId] = useState<Record<string, { flood: string; landslide: string; safety: string }>>({});
  const requestedRiskRef = useRef<Set<string>>(new Set());
  const riskQueueRef = useRef<string[]>([]);
  const isRiskQueueProcessingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  const toggleSort = () => {
    const newType = sortType === "low" ? "high" : "low";

    setSortType(newType);
  };

  const featuredAreas = [
    {
      id: 1,
      name: "Kuala Lumpur",
      count: "20 properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCd9ziQmieN5_83eNOvudtUU7Yt6zW7KEvVWu3Dd1jRrk7miaXWyPByo63e_-XdXyMT-NVMhIJNcKBQjQhrrdYMKfIi0vqMKYyywM9vtO-tV09HlFHyByUequ2MmB10xEp5D_nfE1O8HcxWZtzVih9IlFQUgD-elt2BtAhMOZZZqVEvD_PjUwi9yUevPfMozewum1mO2OW95PbJ0uXQshFERsBVsaaugEymBtk9xqaYRp2OtRj8ndZvUXyGcEyWDKcXl9rTF-2an1U",
    },
    {
      id: 2,
      name: "Putrajaya",
      count: "20 properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGrmunf4UQFNQDSH_58qtOjduBzpBgrtlPj5gYX9FEwbX531QFvHoC-nTVABfoLaG_P4Avgwk8DugRDdcFETLrrDhZdrhJ7mAP0UQxLBDORQw_VmHxQozy5qhYtVNK28xOK6ccizF3UVMvAKGOKxkZmKFozEz-s6IiPnFYbUbPDiCN3VQ3vMl-ixZRbsnpf2a7yawKBRzsxHN2zPgFUYtaO689W7LlJJRUFSJyatDoWtczjLCGOi0ilVXxV3Twd5R0qGEpHS1mKyg",
    },
    {
      id: 3,
      name: "Selangor",
      count: "20 properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzuSa_9boX2apdjiYOjwVcIBQNMJRV57e7KB_a8UdYFFGHSMTfNV5CbFzzZITDLUxy6zcWfvfwWjaPRjCysgglaQTMct3uBsCEF08zW_rHsOuP_tIjzvGM7tUDJHefdjNYXn5jE85wcpwsYpSV8x4E7KYelHZjbeQcQBaFhhDR3su_CECoFjAmEuf_4Za5MFyu773-zDIzf3IhIF81TEHa-aFIRVvt3iQQS5kclp325VCejFYVguP0TZDhUtdaqw2P-9I7CmJp41o",
    },
    {
      id: 4,
      name: "Coming Soon",
      count: "- properties",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2IkP9ylsmEZsnGiMLezfMh4lWLE0PnRjVxeYXxziWb_u7Ag2tH4qrxwfGGHtL-plpzlv03GwFkpigCWb2nQx8Zar_bztiBaeTQCZcIpuL6CpNLUW-x7KkDGlrtla8XoornOoulXBaI1YB-IvDH7qwIx_AqJWIWS7g060DFWNonWxVwZ925-PQnYrOEOih173_psgaoMpLFqR56BI3Xf5-xWZuaWxr--5n86Y5KHbqgHvtvy5Gr9JfOPMYwcL8g5k7MVnCgiGycS8",
    },
  ];

  const recommendedProperty = {
    name: "The Elements Sky Suite",
    price: "RM 2,800",
    priceSpan: "/mo",
    location: "Ampang, KL",
    beds: 2,
    baths: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiIrTMumIXnLv7YAjxitshD5IZmHD2JjwIIBQc1lbO5o8M8YGSqjo7KFfElDWVa_gQEyqbaut7eRyQzQ8oTsHmxMo2wku4ohoKrI2ARCAXeXecOCTIFSGt5qQChQ1tdoGjeObQCgPGnJMk0nKpjLfn3zZEy8qUvQ8rJEtN1IjhtcjdGnXvJUsgIuMD8Qm3FTbs_n6aYF41UhP5oWJDVlmlciT8LHBvtURQrD0ZsOcb6qRiV_6R6K9DclzKdVSevdNUFXJ-MWV_E24",
  };

 const toggleSaved = (property: any) => {
  const saved = getSavedProperties();

  const exists = saved.find(
    (item: any) => item.Property_ID === property.Property_ID
  );

  let updated;

  if (exists) {
    updated = saved.filter(
      (item: any) => item.Property_ID !== property.Property_ID
    );
  } else {
    updated = [...saved, property]; // 💥 SAVE FULL OBJECT
  }

  setSavedProperties(updated);

  setSavedItems(updated.map((p: any) => String(p.Property_ID))); // keep UI in sync

  console.log("UPDATED SAVED:", updated);
};

const handleAreaClick = (areaName: string) => {
  setSearchQuery(areaName);
  setHasSearched(true);
};

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setHasSearched(true);
  };
  const sortProperties = (data: any[], type: string) => {
    return [...data].sort((a, b) => {
      if (type === "low") return a.Median_Price - b.Median_Price;
      if (type === "high") return b.Median_Price - a.Median_Price;
      return 0;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search));
  };

  useEffect(() => {
    const saved = getSavedProperties();
    setSavedItems(saved.map((p: any) => String(p.Property_ID)));
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/houses");
        const data = await res.json();

        setProperties(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
    }, []);

  useEffect(() => {
    if (!hasSearched) {
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    const category = selectedCategory.toLowerCase();
    const mainTypes = ["apartment", "condominium", "semi d"];

    let filtered = properties.filter((p) => {
      const propertyType = String(p.Property_Type || "").toLowerCase();
      const matchSearch =
        String(p.Township || "").toLowerCase().includes(query) ||
        String(p.State || "").toLowerCase().includes(query) ||
        String(p.Property_Type || "").toLowerCase().includes(query) ||
        String(p.Property_Name || "").toLowerCase().includes(query) ||
        String(p.Area || "").toLowerCase().includes(query);

      const matchCategory =
        category === "all"
          ? true
          : category === "other"
            ? !mainTypes.includes(propertyType)
            : propertyType.includes(category);

      return matchSearch && matchCategory;
    });

    if (sortType !== "none") {
      filtered = sortProperties(filtered, sortType);
    }

    setFilteredProperties(filtered);
    setVisibleCount(BATCH_SIZE);
  }, [hasSearched, properties, searchQuery, selectedCategory, sortType]);

  const visibleProperties = useMemo(
    () => filteredProperties.slice(0, visibleCount),
    [filteredProperties, visibleCount]
  );

  const fetchRiskForProperty = useCallback(async (id: string) => {
    try {
      const riskRes = await fetch("http://localhost:5000/api/analyze-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: id }),
      });

      const risk = await riskRes.json();

      setRiskByPropertyId((prev) => ({
        ...prev,
        [id]: {
          flood: String(risk?.floodRisk ?? "Unknown"),
          landslide: String(risk?.landslideRisk ?? "Unknown"),
          safety: String(risk?.safetyIndex ?? "Unknown"),
        },
      }));
    } catch (err) {
      console.error("Risk error:", err);
      setRiskByPropertyId((prev) => ({
        ...prev,
        [id]: {
          flood: "Unknown",
          landslide: "Unknown",
          safety: "Unknown",
        },
      }));
    }
  }, []);

  const processRiskQueue = useCallback(async () => {
    if (isRiskQueueProcessingRef.current) {
      return;
    }

    isRiskQueueProcessingRef.current = true;

    try {
      while (riskQueueRef.current.length > 0) {
        const nextId = riskQueueRef.current.shift();

        if (!nextId) {
          continue;
        }

        await fetchRiskForProperty(nextId);
      }
    } finally {
      isRiskQueueProcessingRef.current = false;
    }
  }, [fetchRiskForProperty]);

  const enqueueRiskFetch = useCallback((propertyId: string) => {
    if (!propertyId || requestedRiskRef.current.has(propertyId)) {
      return;
    }

    requestedRiskRef.current.add(propertyId);
    riskQueueRef.current.push(propertyId);
    void processRiskQueue();
  }, [processRiskQueue]);

  useEffect(() => {
    if (!hasSearched || filteredProperties.length === 0) {
      return;
    }

    filteredProperties.forEach((property) => {
      enqueueRiskFetch(String(property.Property_ID));
    });
  }, [hasSearched, filteredProperties, enqueueRiskFetch]);

  useEffect(() => {
    if (!hasSearched || !sentinelRef.current || filteredProperties.length <= visibleCount) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredProperties.length));
        }
      },
      {
        root: mainRef.current,
        threshold: 0.2,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasSearched, filteredProperties.length, visibleCount]);
    

  return (
    <div className="dark">
      <div className="bg-background-dark text-slate-100 font-display min-h-screen flex flex-col pb-24">
        <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-100 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-xl font-semibold">Search Properties</h1>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, project..."
                className="w-full bg-card-dark border border-slate-800 rounded-xl py-3 pl-10 pr-10 focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-slate-500 text-slate-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>
            <button
              type="button"
              className="bg-primary/10 text-primary p-3 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined">tune</span>
            </button>
          </form>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-card-dark text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        <main ref={mainRef as React.RefObject<HTMLElement>} className="flex-1 overflow-y-auto px-4 space-y-8 py-6">
          {!hasSearched ? (
            <>
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Recent Searches</h2>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="text-primary text-sm font-semibold hover:text-primary/80"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentSearches.map((search) => (
                    <div key={search} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3 cursor-pointer flex-1">
                        <span className="material-symbols-outlined text-slate-400">history</span>
                        <span className="text-slate-300">{search}</span>
                      </div>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="material-symbols-outlined text-slate-400 text-lg cursor-pointer hover:text-slate-300 transition-colors"
                      >
                        close
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Popular Homes</h2>
                  <button className="text-primary text-sm font-semibold hover:text-primary/80">
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {featuredAreas.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => handleAreaClick(area.name)}
                      className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        alt={area.name}
                        src={area.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white font-bold">{area.name}</p>
                        <p className="text-white/70 text-xs">{area.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold mb-4">Recommended for You</h2>
                <div className="bg-card-dark rounded-2xl p-4 flex gap-4 items-center border border-slate-800">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      alt={recommendedProperty.name}
                      src={recommendedProperty.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm">{recommendedProperty.name}</h3>
                      <span className="material-symbols-outlined text-primary text-lg">bookmark</span>
                    </div>
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      {recommendedProperty.location}
                    </p>
                    <div className="mt-2 flex justify-between items-end">
                      <p className="text-primary font-bold text-base">
                        {recommendedProperty.price}
                        <span className="text-[10px] text-slate-500 font-normal">{recommendedProperty.priceSpan}</span>
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">bed</span> {recommendedProperty.beds}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">bathtub</span> {recommendedProperty.baths}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-slate-400 text-sm font-medium">
                  {filteredProperties.length} properties found in <span className="text-primary font-bold">{searchQuery}</span>
                </p>
                <button
                  onClick={toggleSort}
                  className="text-primary text-xs font-bold flex items-center gap-1 hover:text-primary/80"
                >
                  SORT BY PRICE

                  <span className="material-symbols-outlined text-xs">
                    {sortType === "low" ? "arrow_upward" :
                      sortType === "high" ? "arrow_downward" :
                        "sort"}
                  </span>
                </button>
              </div>

              <div className="space-y-6">
                {visibleProperties.map((property) => {
                  const propertyRisk = riskByPropertyId[String(property.Property_ID)];
                  return (
                    <div
                      key={property.Property_ID}
                      data-property-id={property.Property_ID}
                      className="group relative bg-card-dark rounded-2xl overflow-hidden border border-slate-800 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="relative h-56 w-full">
                        <img
                          alt={property.Property_Name}
                          src={property.propertyImage}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          <button
                            onClick={() => toggleSaved(property)}

                            className="bg-slate-900/80 backdrop-blur p-2 rounded-full text-slate-100 shadow-sm hover:bg-slate-800 transition-colors"
                          >
                            <span className={`material-symbols-outlined text-xl ${savedItems.includes(String(property.Property_ID)) ? "fill-1 text-primary" : ""}`}>
                              bookmark
                            </span>
                          </button>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            {property.matchScore} Match
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-slate-900/60 backdrop-blur px-3 py-1 rounded-lg text-white text-sm font-bold">
                          RM {property.Median_Price.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-slate-100 leading-tight">{property.Property_Name}</h3>
                        </div>
                        <p className="text-slate-500 text-sm flex items-center gap-1 mb-3">
                          <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                          {property.Area}
                        </p>
                        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                          <div className="flex flex-1 gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 text-slate-400">
                                <span className="material-symbols-outlined text-base">bed</span>
                                <span className="text-sm font-semibold">{property.Bedroom} Beds</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400">
                                <span className="material-symbols-outlined text-base">bathtub</span>
                                <span className="text-sm font-semibold">{property.Toilet} Baths</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-400">
                                <span className="material-symbols-outlined text-base">square_foot</span>
                                <span className="text-sm font-semibold">{property.Floor_Area_sqft} sqft</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-2 border-l border-slate-800 pl-4">
                              <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-base">water_drop</span>
                                <span className="text-[10px] font-bold uppercase tracking-tight">Flood: {propertyRisk?.flood || "Loading..."}</span>
                              </div>
                              <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-base">terrain</span>
                                <span className="text-[10px] font-bold uppercase tracking-tight">Landslide: {propertyRisk?.landslide || "Loading..."}</span>
                              </div>
                              <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-base">shield</span>
                                <span className="text-[10px] font-bold uppercase tracking-tight">Safety: {propertyRisk?.safety || "Loading..."}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => navigate(`/property/${property.Property_ID}`, {
                              state: { from: "search"}
                            })}
                            className="w-fit bg-primary text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg shadow-primary/20 hover:bg-emerald-600 transition-colors uppercase tracking-tight"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredProperties.length > visibleCount && (
                  <div ref={sentinelRef} className="py-4 text-center text-xs text-slate-500">
                    Loading more properties...
                  </div>
                )}
              </div>
            </>
          )}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800 px-6 pb-6 pt-3 z-20">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="material-symbols-outlined text-[28px]">home</span>
              <span className="text-[10px] uppercase font-medium">Home</span>
            </button>

            <a className="flex flex-col items-center gap-1 text-primary" href="#">
              <span className="material-symbols-outlined text-[28px] fill-1">search</span>
              <span className="text-[10px] uppercase font-medium">Search</span>
            </a>

            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/saved")}
            >
              <span className="material-symbols-outlined text-[28px]">bookmark</span>
              <span className="text-[10px] uppercase font-medium">Saved</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Profile
              </span>
            </button>
          </div>
        </nav>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .fill-1 {
            font-variation-settings: 'FILL' 1;
          }
        `}</style>
      </div>
    </div>
  );
}