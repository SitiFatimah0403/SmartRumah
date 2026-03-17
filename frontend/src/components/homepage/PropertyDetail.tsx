import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyDetail() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const property = {
    name: "Residensi Melawati",
    price: "RM 380,000",
    beds: 3,
    baths: 2,
    sqft: "950",
    psf: "400",
    matchScore: "92%",
    address: "Jalan Melawati 1, Taman Melawati, 53100 Kuala Lumpur",
    coordinates: "3.2104° N, 101.7485° E",
    monthlyCost: "RM 2,697",
    mortgage: "RM 2,147",
    commute: "RM 300",
    maintenance: "RM 250",
    principal: "RM 712",
    interest: "RM 1,434",
    propertyPrice: "RM 512,000",
    loanAmount: "RM 460,800",
    interestRate: "3.8%",
    loanTenure: "30 years",
    downpayment: "RM 51,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfloFoDAthw9axGztjPWhr97mHCQR_II_EawZzZqMkoPM_8Y69yKRhKUZCimPrbju8BxsdR9OLde7BCHI0DzoeeKpfAV4okkoXfF-drtGSw-GAX-_Wy18g7x8dnHfXXvOFXXE3A8-7pRM6iim62xJ2eH5FlMBSCGitRdfZT7A3Hnhr7RTqnWhvPgffgsstZdGuJwp0P3Qu8x3FVxMuGQ6dbVWWdlsDkA3Duy8pmO0iGJeGeT10G6Hm5JQbCkF7OqExKTx70gndRG0",
  };

  return (
    <div className="dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-slate-100 font-display pb-40">
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-900/40 backdrop-blur-md rounded-full p-2 text-white flex items-center justify-center hover:bg-slate-800/60 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </header>

        <section className="relative w-full h-[400px] pt-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 15, 26, 0.2), rgba(10, 15, 26, 0.9)), url('${property.image}')`,
            }}
          />
          <div className="absolute bottom-16 left-0 p-6 w-full flex flex-col gap-1">
            <h1 className="text-3xl font-extrabold text-white">{property.name}</h1>
            <p className="text-primary text-2xl font-bold">{property.price}</p>
          </div>
        </section>

        <section className="px-4 -mt-16 relative z-20 mb-4">
          <div className="bg-slate-900/90 border border-primary/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">bed</span>
              </div>
              <div className="text-center">
                <p className="text-white font-extrabold text-lg leading-none">{property.beds}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Beds</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">bathtub</span>
              </div>
              <div className="text-center">
                <p className="text-white font-extrabold text-lg leading-none">{property.baths}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Baths</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">square_foot</span>
              </div>
              <div className="text-center">
                <p className="text-white font-extrabold text-lg leading-none">{property.sqft}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">sqft</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">grid_view</span>
              </div>
              <div className="text-center">
                <p className="text-white font-extrabold text-lg leading-none">{property.psf}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">PSF</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 relative z-10 mt-4">
          <div className="bg-slate-900/80 border border-primary/30 backdrop-blur-xl rounded-xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center gap-4">
            <div className="flex flex-col items-center justify-center bg-primary/20 rounded-lg p-3 min-w-[80px]">
              <span className="text-3xl font-bold text-primary">{property.matchScore}</span>
            </div>
            <div className="flex flex-col">
              <p className="text-white font-bold text-lg">Overall Suitability Score</p>
              <p className="text-slate-400 text-sm">Highly Recommended based on your profile.</p>
            </div>
          </div>
        </section>

        <section className="px-4 mt-8">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Location & Accessibility
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold text-sm">{property.address}</p>
              <p className="text-slate-500 text-xs tracking-wide">Coordinates: {property.coordinates}</p>
            </div>
            <div className="relative w-full h-40 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center border border-slate-700/50">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl"></div>
                  <span className="material-symbols-outlined text-primary text-5xl fill-1 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">location_on</span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <a className="text-primary text-[10px] font-bold flex items-center gap-1 bg-background-dark/80 backdrop-blur px-2 py-1 rounded" href="#">
                  Open Map <span className="material-symbols-outlined text-[10px]">north_east</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* keep the rest of your sections unchanged */}

        <footer className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-background-dark/80 backdrop-blur-xl border-t border-slate-800 px-6 py-4 flex items-center gap-3">
            <button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-colors">
              <span className="material-symbols-outlined">chat_bubble</span>
              Contact Verified Agent
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-3.5 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl flex items-center justify-center group active:scale-95 transition-transform hover:bg-slate-700/50"
            >
              <span className={`material-symbols-outlined fill-1 ${isSaved ? "text-primary" : ""}`}>bookmark</span>
            </button>
          </div>

          <nav className="bg-background-dark/95 backdrop-blur-xl border-t border-slate-800 px-6 pb-6 pt-3">
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
                <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
              </button>

              <button
                className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                onClick={() => navigate("/saved")}
              >
                <span className="material-symbols-outlined text-[28px]">bookmark</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Saved</span>
              </button>

              <button
                className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <span className="material-symbols-outlined text-[28px]">person</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
              </button>
            </div>
          </nav>
        </footer>

        <style>{`
          .accent-blue {
            background-color: #3b82f6;
          }
          .accent-orange {
            background-color: #f97316;
          }
          .accent-purple {
            background-color: #a855f7;
          }
        `}</style>
      </div>
    </div>
  );
}