import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SavedPage() {
  const navigate = useNavigate();

  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("savedProperties");

    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }
  }, []);

  const handleRemoveSaved = (id: string) => {
    const updated = savedProperties.filter(
      (prop) => prop.Property_ID !== id
    );

    setSavedProperties(updated);

    //update local storage
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  return (
    <div className="dark">
      <div className="bg-background-dark text-slate-100 font-display min-h-screen flex flex-col pb-24">
        <header className="p-6 pb-2 sticky top-0 bg-background-dark z-20 border-b border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-slate-100 p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-xl font-semibold">Saved Properties</h1>
            </div>
            <button className="relative text-slate-100 p-2 hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="flex justify-between items-center text-sm mb-4">
            <p className="text-slate-400">
              <span className="text-primary font-semibold">{savedProperties.length}</span> properties saved
            </p>
            <button className="text-primary flex items-center gap-1 hover:text-primary/80 transition-colors">
              
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {savedProperties.length > 0 ? (
            savedProperties.map((property) => (
              <article
                key={property.Property_ID}
                className="bg-card-dark rounded-3xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56 w-full">
                  <img
                    alt={property.Property_Name
}
                    src={property.propertyImage || property.Property_Image || "/placeholder.jpg"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {property.matchScore} MATCH
                  </div>
                  <button
                    onClick={() => handleRemoveSaved(property.Property_ID)}
                    className="absolute top-4 right-4 bg-background-dark/60 p-2 rounded-full text-primary backdrop-blur-sm hover:bg-background-dark/80 transition-colors"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-lg fill-1">bookmark</span>
                  </button>
                  <div className="absolute bottom-4 left-4 bg-background-dark/80 backdrop-blur-md px-3 py-1 rounded-lg">
                    <p className="text-white text-sm font-bold">RM {property.Median_Price?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-white text-lg font-bold">{property.Property_Name}</h2>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1 mb-4">
                    <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                    {property.Area || property.Township || property.State}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-3">

                  <div className="flex flex-1 gap-4">

                    {/* LEFT */}
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

                    {/* RIGHT */}
                    <div className="flex-1 space-y-2 border-l border-slate-800 pl-4">

                      <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-base">water_drop</span>
                        <span className="text-[10px] font-bold uppercase">
                          Flood: {property.flood}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-base">terrain</span>
                        <span className="text-[10px] font-bold uppercase">
                          Landslide: {property.landslide}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-base">shield</span>
                        <span className="text-[10px] font-bold uppercase">
                          Safety: {property.safety}
                        </span>
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

                

              </article>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">
                bookmark_border
              </span>
              <p className="text-slate-400 text-lg">No saved properties yet</p>
              <p className="text-slate-500 text-sm mt-2">Properties you save will appear here</p>
            </div>
          )}
        </section>

        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800 px-6 pb-6 pt-3 z-20">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="material-symbols-outlined text-[28px]">home</span>
              <span className="text-[10px] uppercase font-medium">Home</span>
            </button>

            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/search")}
            >
              <span className="material-symbols-outlined text-[28px]">search</span>
              <span className="text-[10px] uppercase font-medium">Search</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[28px] fill-1">bookmark</span>
              <span className="text-[10px] uppercase font-medium">Saved</span>
            </button>

            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              <span className="text-[10px] uppercase font-medium">Profile</span>
            </button>
          </div>
        </nav>

        <style>{`
          .fill-1 {
            font-variation-settings: 'FILL' 1;
          }
        `}</style>
      </div>
    </div>
  );
}