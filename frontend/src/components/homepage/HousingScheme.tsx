import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HousingScheme() {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState("all");
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
      feature: "Eligible",
      scheme: "PR1MA",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5fgMARjAQgfJykASp7hPIPs1-w3LkorEEcDG2IBRck910g_9O1a8m1vBYbu-m-7bngzMZGlVuGsYEQQs7zKx6ylJK4F9DetZPDB4OIWgMpX7QMZSXRaJ5KJdFeYRQqlFxvIOrsPtPpFTd-vPlRYPx9CNoQNWCnxIl3ihhMxAc4LMolsPoEWvdhmw9PCXsltmIYc-0yupiXWk7Quj1U1eM000PE2BKHSJKj2I-Z3BmAjFEF3mWUm736SwAXoFzTdpebePPDShuax8",
    },
    {
      id: 2,
      name: "SkyVantage Residensi",
      price: "RM 300,000",
      match: "88%",
      beds: 3,
      baths: 2,
      sqft: "850 sqft",
      feature: "Eligible",
      scheme: "RUMAWIP",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDMPgokMJ-BRBHjmAB5jbIBA_eSrpgco9enHeB254549SR42qgjNaoXL_-DYV7uWEYg6VAOqDdtE2Rw1TeRKXFcVI95qTmfo0yG4B8H15LKc9Qbe3T1EuOsqp7A1jhN4SSB4MaOEHRb3wuz-FuRSWh22p0fu6XWfOhxqBQcDVfV5fteg459Lowx8d7073tDP5Ehg6BA0JibB74008Oy_bsBVNLfHpDU-DUt5LOb5vdsTBvgcROpuBh36mYJhcrwneBOY6JZqnwASQc",
    },
  ];

  const tools = [
    {
      id: 1,
      icon: "rule",
      title: "Scheme Eligibility Checker",
      description: "Check if you qualify for national schemes",
      bgColor: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      id: 2,
      icon: "map",
      title: "Area Insights",
      description: "Explore neighborhood amenities & trends",
      bgColor: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      id: 3,
      icon: "account_balance_wallet",
      title: "Affordable Financing Guide",
      description: "Learn about low-interest housing loans",
      bgColor: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="dark">
      <div className="bg-background-dark text-slate-100 font-display min-h-screen flex flex-col">
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
                  Based on your RM4.5k income & commitments.
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

          <section className="px-6 py-2">
            <div className="p-1 bg-card-dark/50 border border-slate-800 rounded-2xl flex gap-1">
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 px-4 text-slate-400 font-bold rounded-xl text-sm hover:bg-navy-accent/50 transition-all"
              >
                Regular Houses
              </button>
              <button className="flex-1 py-3 px-4 bg-primary text-white font-bold rounded-xl text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                Housing Schemes
              </button>
            </div>
          </section>

          <section className="flex gap-3 px-6 py-4 overflow-x-auto hide-scrollbar">
            {schemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setSelectedScheme(scheme.id)}
                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap font-bold transition-all ${
                  selectedScheme === scheme.id
                    ? "bg-primary text-background-dark shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-card-dark text-slate-400 border border-slate-800 hover:bg-navy-accent"
                }`}
              >
                {scheme.label}
              </button>
            ))}
          </section>

          <section className="px-6 pt-4 pb-2 flex justify-between items-end">
            <div>
              <h3 className="text-white text-xl font-bold">Top Housing Schemes For You</h3>
              <p className="text-slate-500 text-xs">
                AI-curated based on your financial health
              </p>
            </div>
            <button
              onClick={() => navigate("/all-housing-schemes")}
              className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </button>
          </section>

          <section className="flex gap-5 px-6 py-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => navigate("/property-detail")}
                className="min-w-[280px] w-[80vw] bg-card-dark rounded-2xl border border-slate-800 overflow-hidden snap-start group text-left hover:border-primary/30 transition-colors"
              >
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${property.image}')` }}
                  ></div>

                  <div className="absolute top-3 right-3 bg-primary text-background-dark px-3 py-1.5 rounded-lg text-xs font-black shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] fill-1">
                      star
                    </span>
                    {property.match} Match
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white uppercase font-bold tracking-widest">
                    {property.scheme}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold text-lg">
                      {property.name}
                    </h4>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                    >
                      <span
                        className={`material-symbols-outlined cursor-pointer ${
                          favorites.includes(property.id)
                            ? "fill-1 text-red-400"
                            : "text-slate-500"
                        }`}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <p className="text-primary font-extrabold text-xl mb-3">
                    {property.price}
                  </p>

                  <div className="flex items-center gap-4 text-slate-400 text-sm mb-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">bed</span>
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">
                        bathtub
                      </span>
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">
                        square_foot
                      </span>
                      <span>{property.sqft}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[14px] font-bold">
                        check_circle
                      </span>
                    </div>
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-tight">
                      {property.feature}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </section>

          <section className="px-6 py-4">
            <div className="bg-navy-accent/40 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h4 className="text-white font-bold">PR1MA Benefits</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                    check_circle
                  </span>
                  <span className="text-slate-300 text-sm">
                    Affordable pricing below market value
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                    check_circle
                  </span>
                  <span className="text-slate-300 text-sm">
                    Government supported housing scheme
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-0.5">
                    check_circle
                  </span>
                  <span className="text-slate-300 text-sm">
                    Tailored for first-time homebuyers
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="px-6 py-6">
            <h3 className="text-white text-lg font-bold mb-4">Helpful Tools</h3>

            <div className="flex flex-col gap-3">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  className="bg-card-dark rounded-2xl p-4 border border-slate-800 flex items-center gap-4 text-left active:bg-navy-accent transition-colors"
                >
                  <div
                    className={`size-12 rounded-xl ${tool.bgColor} ${tool.iconColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="material-symbols-outlined">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{tool.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-600">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </section>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800 px-6 pb-6 pt-3 z-50">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={() => navigate("/")}
              className="flex flex-col items-center gap-1 text-primary"
            >
              <span className="material-symbols-outlined text-[28px] fill-1">
                home
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Home
              </span>
            </button>

            <button
              onClick={() => navigate("/search")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">search</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Search
              </span>
            </button>

            <button
              onClick={() => navigate("/saved")}
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">
                bookmark
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Saved
              </span>
            </button>

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