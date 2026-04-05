import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllProperty from "./AllProperty";
import HousingScheme from "./HousingScheme";
import PropertyDetail from "./PropertyDetail";
import ProfilePage from "../profile/ProfilePage";
import ProfileEdit from "../profile/ProfileEdit";
import SearchPage from "../search/SearchPage";
import SavedPage from "../saved/SavedPage";

export type Property = {
  Property_ID: string;
  Property_Name: string;
  Median_Price: number;
  Bedroom: number;
  Toilet: number;
  Floor_Area_sqft: number;
  propertyImage: string;
  State: string;
  matchScore: number; 
};

export default function HomeDashboard() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
  async function fetchData() {
    try {
      // ni hardcoded dullu sbb firestore belum siap, nanti kena adjust ikut data user sebenar
      const user = {
        employmentDetails: {
          workplaceLocation: "Bangsar", // optional
          workplaceLat: 3.1319,   
          workplaceLng: 101.6841  
        },
        propertyPreferences: {
          maxBudget: 500000,
        },
      };

      //const user = firestoreUserData -> ni time firestore dh siap

       const res = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), 
      });

      const data = await res.json();
      console.log("DATA:", data);

      setProperties(data);

    } catch (err) {
      console.error(err);
    }
  }

  fetchData();
}, []);
  
  const categories = [
    { id: "all", label: "All Homes" },
    { id: "condo", label: "Condominium" },
    { id: "landed", label: "Landed" },
    { id: "studio", label: "Studio" },
  ];

  const regularProperties = properties.filter(
    (p) => p.propertyType === "regular"
  );

  const schemeProperties = properties.filter(
    (p) => p.propertyType === "scheme"
  );

  return (
    
    <div className="dark">
      <div className="bg-background-dark text-slate-100 font-display min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 pt-8 pb-4 bg-background-dark sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 overflow-hidden">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHXyBP9x9-mMtJXhX5NyrxpJE3cvY8AoOBeaoEDrgnxPRppAMkTHYvceqJqQhIkSkAI9vFbjJBabs2JM0k1btKhCHgsvwqDL-U9tT75ohiJ5_0913vzDWh-JG8BVTz9MVNMZR5pW5TN6o2gSuAxAdU27XBenz_87sXwuDHzK_RVtqf82iRskc3fGVw5QLvnQZ7Fz2L6vcKctEcWSIdESLt7qmw6OFqz4cXN1lkj2ld_sBvs4E2Cn6LNFrdZk9divBqKL-aLYaBj2g"
              />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium">Good Morning</p>
              <h2 className="text-slate-100 text-lg font-bold leading-tight">
                Welcome back, Luqman 👋
              </h2>
            </div>
          </div>

          <button className="relative p-2 rounded-xl bg-card-dark border border-slate-800 text-slate-300">
            <span className="material-symbols-outlined text-[24px]">
              notifications
            </span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-background-dark"></span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-24">
          {/* Summary Card */}
          <section className="px-6 py-4">
            <div className="relative overflow-hidden rounded-2xl bg-card-dark border border-slate-800 p-6 shadow-xl">
              <div className="absolute -top-12 -right-12 size-32 bg-primary/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-sm">
                    account_balance_wallet
                  </span>
                  <p className="text-slate-400 text-sm font-semibold tracking-wide uppercase">
                    Your Calculated Buying Power
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    RM 450,000
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Based on your RM4.5k income &amp; commitments.
                </p>

                <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-background-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                  <span>Recalculate Power</span>
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Housing Type Selector */}
          <section className="px-6 py-2">
            <div className="p-1 bg-card-dark/50 border border-slate-800 rounded-2xl flex gap-1">
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 px-4 bg-primary text-white font-bold rounded-xl text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
              >
                Regular Houses
              </button>
              <button
                onClick={() => navigate("/housing-schemes")}
                className="flex-1 py-3 px-4 text-slate-400 font-bold rounded-xl text-sm hover:bg-navy-accent/50 transition-all"
              >
                Housing Schemes
              </button>
            </div>
          </section>

          {/* Category Filter Chips */}
          <section className="flex gap-3 px-6 py-4 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap font-bold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-background-dark shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-card-dark text-slate-400 border border-slate-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </section>

          {/* Top Matches Header */}
          <section className="px-6 pt-4 pb-2 flex justify-between items-end">
            <div>
              <h3 className="text-white text-xl font-bold">Top Matches For You</h3>
              <p className="text-slate-500 text-xs">
                AI-curated based on your financial health
              </p>
            </div>
            <button
              onClick={() => navigate("/all-properties")}
              className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </button>
          </section>

          {/* Property Carousel */}
          <section className="flex gap-5 px-6 py-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {regularProperties.map((property) => (
            <button
              key={property.Property_ID}
              onClick={() => navigate(`/property/${property.Property_ID}`)}
              className="min-w-[280px] w-[80vw] bg-card-dark rounded-2xl border border-slate-800 overflow-hidden snap-start group text-left transition-all hover:scale-[1.02]"
            >
              {/* IMAGE */}
              <div className="relative h-48">

                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${property.propertyImage}')`,
                  }}
                />

                {/* Match Score */}
                <div className="absolute top-3 right-3 bg-primary text-background-dark px-3 py-1.5 rounded-lg text-xs font-black shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                  {property.matchScore}% Match
                </div>

                {/* Scheme */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white uppercase font-bold tracking-widest">
                  {property.Housing_Scheme || "FEATURED"}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">

                {/* Title + Heart */}
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-white font-bold text-lg">
                    {property.Property_Name}
                  </h4>

                  <span className="material-symbols-outlined text-slate-500 cursor-pointer">
                    favorite
                  </span>
                </div>

                {/* Price */}
                <p className="text-primary font-extrabold text-xl mb-3">
                  RM {property.Median_Price?.toLocaleString()}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 text-slate-400 text-sm mb-4 border-b border-slate-800 pb-4">

                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">bed</span>
                    <span>{property.Bedroom}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">bathtub</span>
                    <span>{property.Toilet}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">square_foot</span>
                    <span>{property.Floor_Area_sqft} sqft</span>
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[14px]">
                      check_circle
                    </span>
                  </div>

                  <span className="text-emerald-500 text-xs font-bold uppercase tracking-tight">
                    {property.Near_MRT === "Yes" ? "Near MRT" : "Good Location"}
                  </span>
                </div>
              </div>
            </button>
          ))}
          </section>

          {/* Helpful Tools */}
          <section className="px-6 py-6">
            <h3 className="text-white text-lg font-bold mb-4">Helpful Tools</h3>

            <div className="flex flex-col gap-3">
              <button className="bg-card-dark rounded-2xl p-4 border border-slate-800 flex items-center gap-4 text-left active:bg-navy-accent transition-colors w-full">
                <div className="size-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">
                    Mortgage Eligibility
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Check your home loan qualification status
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-600">
                  chevron_right
                </span>
              </button>

              <button className="bg-card-dark rounded-2xl p-4 border border-slate-800 flex items-center gap-4 text-left active:bg-navy-accent transition-colors w-full">
                <div className="size-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">Area Insights</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Explore neighborhood amenities &amp; trends
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-600">
                  chevron_right
                </span>
              </button>

              <button className="bg-card-dark rounded-2xl p-4 border border-slate-800 flex items-center gap-4 text-left active:bg-navy-accent transition-colors w-full">
                <div className="size-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">
                    account_balance_wallet
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">
                    Affordable Financing Guide
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Learn about low-interest housing loans
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-600">
                  chevron_right
                </span>
              </button>
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800 px-6 pb-6 pt-3 z-50">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <a className="flex flex-col items-center gap-1 text-primary" href="#">
              <span className="material-symbols-outlined text-[28px] fill-1">
                home
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Home
              </span>
            </a>

            <a
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                navigate("/search")
              }}
            >
              <span className="material-symbols-outlined text-[28px]">search</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Search
              </span>
            </a>

            <a
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                navigate("/saved")
              }}
            >
              <span className="material-symbols-outlined text-[28px]">
                bookmark
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Saved
              </span>
            </a>

            <button
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Profile
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}