import { useState } from "react";
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
    { id: "selangorku", label: "Selangorku" },
    { id: "myhome", label: "MyHome" },
  ];

  const properties = [
    {
      id: 1,
      name: "Residensi Melawati",
      price: "RM 380,000",
      match: "92%",
      beds: 3,
      baths: 2,
      sqft: "950 sqft",
      status: "ELIGIBLE",
      schemeTag: "PR1MA",
      schemeBg: "bg-primary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBvg-9tV6Aec4WMN3GV7v5DWNlIzltlkqjqhc3Z5w3MEdI_ssbgzsZvyuSE4owqJOrOhqeKA0ClkY-UMPF_ffF5H2xGUnHi3osRI40_c1m56uCW4Z5JeXk5fA-4gGkxBYzFOBw21p9-U7P2ICB4IjCXebmKm24ladeM2raZ9c43BOHPcuhctq8FuOc7iMcLcpd09qOSnYXbe6tU9BLP5RQBoRcveO2LpoNmInGYdOiVu5hFScX5w3SEiSVhh3mC6WrcfXT3YBxKBpw",
    },
    {
      id: 2,
      name: "SkyAwani V Residence",
      price: "RM 300,000",
      match: "88%",
      beds: 3,
      baths: 2,
      sqft: "800 sqft",
      status: "ELIGIBLE",
      schemeTag: "RUMAWIP",
      schemeBg: "bg-blue-600",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAL32lNXPUSTCWxeB9l2_MWnBx8KHPNYn1UH83reTVOhkhfB4mt2ciczCzdpfGOqdfOuLN07km1AmXNPifkGsFxIce1zqf_3nOAJTSLlB66qqPx4Rj0UvWpkD1uNS_GWSTNRiyIGmk_Pk_UqyqN8oUNY_dH7hP7m8DPJ1T1b3IdVMo-UepRtB5sGS1Fe3ChBxHOLRH23iI50oiKC5eogb28T7niIClF_hQFB7b4p7QwP-ZmlcZ8CDxY03OY-hBTTSe0OFDNOx4L5qQ",
    },
    {
      id: 3,
      name: "Serene Heights",
      price: "RM 250,000",
      match: "75%",
      beds: 3,
      baths: 2,
      sqft: "900 sqft",
      status: "CHECK STATUS",
      schemeTag: "Selangorku",
      schemeBg: "bg-amber-600",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQnvzsy9iZ7wmuYih5_XYI7K0_NOgS3PWnkpUNGFxMX7h1rHt-O6foBSEYv5K06WaFj_YJ1lIldZ24SGFNcHyRAfHwIDRVia4CqS9_Xspy1LC9D-NlgpMInhRhym_3lE3dy42-t9uy8fVhTnYV9HkVqieN8LnTcr-ecM5mDaRn7_m8xdqDItAA9ju3De2zNTQ_A4x3vOEvS7_FUl9LDz61zAIDoaxM2KOGubxmPiYzWHZ4bJoecEz2FF0SXt8wAf9L9vOtpheNpdQ",
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

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
                key={property.id}
                onClick={() => navigate("/property-detail")}
                className="group relative flex flex-col bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-navy-700 hover:shadow-md hover:border-primary/30 transition-shadow text-left w-full"
              >
                <div
                  className="relative aspect-video w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${property.image}')` }}
                >
                  <div className={`absolute top-3 left-3 ${property.schemeBg} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                    {property.schemeTag}
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          favorites.includes(property.id) ? "fill-1 text-red-400" : ""
                        }`}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      {property.match} Match
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {property.name}
                    </h3>
                    <span
                      className={`text-xs font-bold flex items-center gap-1 ${
                        property.status === "ELIGIBLE"
                          ? "text-primary"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {property.status === "ELIGIBLE" ? "check_circle" : "info"}
                      </span>
                      {property.status}
                    </span>
                  </div>

                  <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
                    {property.price}
                  </p>

                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">bed</span>
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">bathtub</span>
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-lg">square_foot</span>
                      <span>{property.sqft}</span>
                    </div>
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