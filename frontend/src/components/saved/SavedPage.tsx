import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedPage() {
  const navigate = useNavigate();

  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      name: "Mont Kiara Luxury Condo",
      price: "RM 1,250,000",
      location: "Jalan Kiara, Mont Kiara, Kuala Lumpur",
      beds: 3,
      baths: 2,
      sqft: "1,250",
      matchScore: "92%",
      flood: "Low",
      landslide: "Low",
      safety: "92",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAX7CI-ILFS8F48gXdFaooPUag73m_gl43c7-937apkt36pZPeGw3QaAQ5jMpxxRlrgcfuLkZSpnuuyB5oTo5SKLD27xUO2gTTji92ZZThjl5IfbBVvmozNMrBZrLlJ5PyMtbXjeQ4UxTkGQa2Ue7dqhmeza0NozqdB0shz2qRvqqyJd-8Cc3OSeuyEuOWOsl-OGKp31qJauPv2L4Jq5HuaWIMsgNkmjSk9PaM6Cpv5sFwgJc29zNQd99VRtYa896Gfw8LW1xDcWTM",
    },
    {
      id: 2,
      name: "Kiara 163 Serviced Suites",
      price: "RM 980,000",
      location: "Mont Kiara, KL",
      beds: 2,
      baths: 2,
      sqft: "850",
      matchScore: "92%",
      flood: "Low",
      landslide: "Low",
      safety: "88",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAwhEuDhMNtnketd9C097RqKDBFM-6O9pZvRxP9esONOjCHUdKhsFA8x3Ioc2e4bNMh7ppeCs2mXMFwy9dvCnYQXlsVbKZ0UCG3psAq5UkO5yORoaX_7gVDPNKT4HJwytEI_voZh-AuydJc38vd7dkEOwWn_V-XjD-QriXjJEld_q-J6ef7mZ3o5ol4xVYZIy0tZHS9n9AWHiu6Jnim2N2gom42nciGn5iFBWy6XQ2fUmweqxvIORqg6693Z4Ow6fkL9NOTjVxGcEs",
    },
    {
      id: 3,
      name: "Residensi 22 Penthouse",
      price: "RM 2,450,000",
      location: "North Kiara, Mont Kiara",
      beds: 4,
      baths: 4,
      sqft: "2,900",
      matchScore: "92%",
      flood: "Low",
      landslide: "Low",
      safety: "95",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbSLa8jy0FIbF2UpX35zeoUIxkeYEryxa3u-sEn7E-DP0ywoq8rdeAKnYIWeUkPnvjuGGJZJttwCxDJnD1fG2ltRT4BaXUbaSZBKRfY1ld-a9VfOpqFfCynxLd-vGV4x9tLG46Y_sv1gefq9IGEoDlqmfDlPlR0ltuMSkc6iWv1R5zqy1mKp7rbg_vY5ZIlDUcPvppTnsKhGexFKhR81TqMmLgp8Vs8yp4Yuce2QBVLkWN-nKUxTycLqmDRD77DhF-YDmwYna4Y2Y",
    },
  ]);

  const handleRemoveSaved = (id: number) => {
    setSavedProperties((prev) => prev.filter((prop) => prop.id !== id));
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
              <span>Sort By</span>
              <span className="material-symbols-outlined text-sm">sort</span>
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {savedProperties.length > 0 ? (
            savedProperties.map((property) => (
              <article
                key={property.id}
                className="bg-card-dark rounded-3xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56 w-full">
                  <img
                    alt={property.name}
                    src={property.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {property.matchScore} MATCH
                  </div>
                  <button
                    onClick={() => handleRemoveSaved(property.id)}
                    className="absolute top-4 right-4 bg-background-dark/60 p-2 rounded-full text-primary backdrop-blur-sm hover:bg-background-dark/80 transition-colors"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-lg fill-1">bookmark</span>
                  </button>
                  <div className="absolute bottom-4 left-4 bg-background-dark/80 backdrop-blur-md px-3 py-1 rounded-lg">
                    <p className="text-white text-sm font-bold">{property.price}</p>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-white text-lg font-bold">{property.name}</h2>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1 mb-4">
                    <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                    {property.location}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <span className="material-symbols-outlined text-base">bed</span>
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <span className="material-symbols-outlined text-base">bathtub</span>
                        <span>{property.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <span className="material-symbols-outlined text-base">square_foot</span>
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                          Flood: {property.flood}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                          Landslide: {property.landslide}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                          Safety: {property.safety}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate("/property-detail")}
                        className="w-full mt-2 bg-primary text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-primary/20"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
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