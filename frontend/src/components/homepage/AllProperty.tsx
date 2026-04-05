import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllProperty() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: "all", label: "All Homes" },
    { id: "condo", label: "Condominium" },
    { id: "landed", label: "Landed" },
    { id: "apartment", label: "Apartment" },
    { id: "townhouse", label: "Townhouse" },
  ];

  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
  async function fetchData() {
    try {
      //nanti ni ubah
      const user = {
        employmentDetails: {
          workplaceLat: 3.1319,
          workplaceLng: 101.6841,
        },
        propertyPreferences: {
          maxBudget: 500000,
        },
      };

      const res = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

    //ONLY REGULAR HOUSES
    const regularOnly = data.filter(
      (p: any) => p.propertyType === "regular"
    );

    setProperties(regularOnly);
        } catch (err) {
          console.error(err);
        }
  }

  fetchData();
}, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="dark">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-slate-100 font-display">
        <header className="sticky top-0 z-20 flex items-center bg-background-dark/95 backdrop-blur-md p-4 justify-between border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-slate-100 hover:bg-slate-800 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined block">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              All Properties
            </h1>
          </div>
          <button
            onClick={() => navigate("/search")}
            className="flex items-center justify-center p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-100">
              search
            </span>
          </button>
        </header>

        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-primary text-white font-semibold shadow-lg shadow-primary/20"
                  : "bg-card-dark text-slate-400 border border-slate-800 font-medium hover:border-primary/30"
              }`}
            >
              <p className="text-sm leading-normal">{category.label}</p>
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

        <main className="flex-1 p-4 space-y-6 pb-24">
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
        </main>

        <button className="fixed bottom-24 right-6 flex items-center justify-center gap-2 rounded-full h-14 px-6 bg-primary text-white font-bold shadow-xl shadow-primary/30 z-30 hover:scale-105 transition-transform active:scale-95">
          <span className="material-symbols-outlined">map</span>
          <span>View on Map</span>
        </button>

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