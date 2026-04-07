import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllHousingScheme() {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [favorites, setFavorites] = useState<number[]>([]);

  const schemes = [
    { id: "all", label: "All Schemes" },
    { id: "pr1ma", label: "PR1MA" },
    { id: "rumawip", label: "RUMAWIP" },
    { id: "selangorku", label: "Selangorku" }
  ];

  const [properties, setProperties] = useState<any[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  useEffect(() => {
  async function fetchData() {
    try {
      //ni TUKAR
      const user = {
      personalInfo: {
        age: 25,
      },
      employmentDetails: {
        workplaceLat: 3.1319,
        workplaceLng: 101.6841,
      },
      propertyPreferences: {
        preferredState: "Kuala Lumpur",
        maxBudget: 500000,
      },
      eligibility: {
        householdIncome: 5000,
        firstTimeHomebuyer: true,
      },
    };

      const res = await fetch("http://localhost:5000/housing-schemes/eligible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

      const data = await res.json();

      console.log("API RESPONSE:", data); 
      setProperties(data.matchingProjects);

    } catch (err) {
      console.error(err);
    }
  }

  fetchData();
}, []);

  return (
    <div className="dark">
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-navy-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-slate-200 dark:hover:bg-navy-700 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">
                arrow_back
              </span>
            </button>
            <h1 className="text-lg font-bold tracking-tight">All Housing Schemes</h1>
          </div>
          <button
            onClick={() => navigate("/search")}
            className="p-2 hover:bg-slate-200 dark:hover:bg-navy-700 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">
              search
            </span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-24">
          <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            {schemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedScheme === scheme.id
                    ? "bg-primary text-white font-semibold"
                    : "bg-card-dark text-slate-400 border border-slate-800"
                }`}
              >
                {scheme.label}
              </button>
            ))}
          </div>

          <div className="px-4 py-2 flex justify-between items-center border-b border-slate-200 dark:border-navy-700">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-card-dark border border-slate-800 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition-colors">
              <span>Sort: {sortBy === "match" ? "Match Score" : "Price"}</span>
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card-dark border border-slate-800 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-sm">map</span>
              <span>Map View</span>
            </button>
          </div>

          <div className="p-4 space-y-6">
            {properties.map((property) => (
              <button
              key={property.Property_ID}
              onClick={() => navigate(`/property/${property.Property_ID}`)}
              className="flex flex-col rounded-xl overflow-hidden bg-surface-dark shadow-xl shadow-black/5 border border-slate-800 transition-transform active:scale-[0.98] hover:shadow-2xl hover:shadow-black/20 hover:border-primary/30 text-left w-full"
            >
              <div
                className="relative w-full aspect-[16/10] bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${property.propertyImage}")` }}
              >
                <div className="absolute top-3 left-3 bg-primary text-white text-[15px] font-bold px-2 py-1 rounded-md shadow-lg uppercase tracking-wider">
                  {property.matchScore}% Match
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md transition-colors hover:text-red-400"
                >
                  <span
                    className={`material-symbols-outlined text-[22px] ${
                      favorites.includes(property.id) ? "fill-1 text-red-400" : "text-white"
                    }`}
                  >
                    favorite
                  </span>
                </button>
              </div>

              <div className="flex flex-col p-4 gap-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-white font-bold text-lg">
                    {property.Property_Name}
                  </h4>
                </div>

                {/* Price */}
                <p className="text-primary font-extrabold text-2xl mb-3">
                  RM {property.Median_Price?.toLocaleString()}
                </p>

                <div className="flex items-center gap-4 text-slate-400 text-sm mb-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">bed</span>
                    <span>{property.Bedroom}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">bathtub</span>
                    <span>{property.Toilet}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">square_foot</span>
                    <span>{property.Floor_Area_sqft}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm font-bold">
                      check_circle
                    </span>
                    {property.feature}
                  </span>
                </div>
              </div>
            </button>
            ))}
          </div>
        </main>

        <div className="fixed bottom-24 right-4 z-40">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white shadow-xl hover:scale-105 active:scale-95 transition-transform font-bold">
            <span className="material-symbols-outlined">map</span>
            <span>View on Map</span>
          </button>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800 px-6 pb-6 pt-3 z-50">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={() => navigate("/")}
              className="flex flex-col items-center gap-1 text-primary"
            >
              <span className="material-symbols-outlined text-[28px] fill-1">home</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
            </button>

            <button
              onClick={() => navigate("/search")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">search</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
            </button>

            <button
              onClick={() => navigate("/saved")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">bookmark</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Saved</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
            </button>
          </div>
        </nav>

        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
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