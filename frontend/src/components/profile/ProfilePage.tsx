import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [viewCount] = useState(128);
  const [collectionsCount] = useState(12);
  const [savedCount] = useState(45);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  const personalInfo = profile?.personalInfo || {};
  const propertyPreferences = profile?.propertyPreferences || {};
  const eligibility = profile?.eligibility || {};

  const formatValue = (value: any) => {
    if (value === undefined || value === null || value === "") {
      return "-";
    }

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : "-";
    }

    return String(value);
  };

  useEffect(() => {
    const loadProfile = async () => {
      let token = localStorage.getItem("token");

      if (!token && auth.currentUser) {
        token = await auth.currentUser.getIdToken();
        localStorage.setItem("token", token);
      }

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        let res = await fetch("http://localhost:5000/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          if (auth.currentUser) {
            const refreshedToken = await auth.currentUser.getIdToken(true);
            localStorage.setItem("token", refreshedToken);

            res = await fetch("http://localhost:5000/users/me", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${refreshedToken}`,
              },
            });
          }

          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
        }

        if (res.status === 404) {
          setProfile(null);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data.profile || null);
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // 1. Sign out from Firebase
      await signOut(auth);

      // 2. Remove token
      localStorage.removeItem("token");

      // 3. Redirect to login
      navigate("/login");

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const profileSetupItems = [
    {
      id: 1,
      title: "Personal Information",
      section: "personal-information",
      description: "Update your basic details such as name, age, citizenship, and marital status.",
      icon: "person",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 2,
      title: "Employment Details",
      section: "employment-details",
      description: "Update your employment status, job sector, years of employment, and workplace location.",
      icon: "work",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 3,
      title: "Housing Preferences",
      section: "property-preferences",
      description: "Update your preferred state, budget range, commute distance, and priorities.",
      icon: "home",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 4,
      title: "Housing Scheme Eligibility",
      section: "scheme-eligibility",
      description: "Update financial information such as income, dependents, and property ownership.",
      icon: "description",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 5,
      title: "Housing Scheme Interest",
      section: "scheme-interest",
      description: "Select which government housing schemes you want SmartRumah to evaluate.",
      icon: "checklist",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
  ];

  const accountSettings = [
    {
      id: 1,
      title: "Notification Preferences",
      icon: "notifications",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Payment Methods",
      icon: "credit_card",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: 3,
      title: "Help & Support",
      icon: "help",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="dark">
      <div className="bg-background-dark text-slate-100 font-display min-h-screen flex flex-col pb-24">
        <header className="p-6 pt-10 flex items-center justify-between sticky top-0 bg-background-dark z-10 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-slate-100 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>

          <button
            onClick={() => navigate("/profile/edit")}
            className="p-2 bg-card-dark rounded-full hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-100">edit</span>
          </button>
        </header>

        <main className="flex-grow">
          <section className="profile-gradient px-6 py-8 flex flex-col items-center text-center">
            <div className="relative w-24 h-24 mb-4">
              <img
                alt="User Avatar"
                className="rounded-full w-full h-full object-cover border-4 border-card-dark shadow-xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWTfQseSKQ1QevA84AEoPuu-Me3zsVVm-o937ZJdLYHbz5cDXysQRqJJT2mMAsP6GNf05ryvck6f8h1HN70j03x3sFTLH8stmKYGv2H_sxiXwvzbWfK-lDnU1fxfth2eR1qMx6kXGAFgQdfmui2FAACPPpG56ym4LsR6pssCsdrzbVZUrIm3XCWdVFqIn0z6Ix5Ms6W-fF2i-ROQAjl5UwWCne-4mpJurUvxjT3fcOmiq9-y4bKxkHtuQjb7qNmGHd3g4LpTFXz7Z_"
              />
              <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full border-2 border-background-dark">
                <span className="material-symbols-outlined text-white text-sm">edit</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold">
              {loading
                ? "Loading..."
                : profile?.personalInfo?.fullName || auth.currentUser?.displayName || "New User"}
            </h2>
            <p className="text-primary flex items-center gap-1 mt-1 text-sm justify-center">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {profile?.eligibility?.currentResidentialState || "Malaysia"}
            </p>
          </section>

          <section className="px-6 grid grid-cols-3 gap-4 mb-8 mt-6">
            <div className="bg-card-dark p-4 rounded-2xl text-center shadow-md border border-slate-800">
              <span className="block text-xl font-bold text-white">{formatValue(personalInfo.age)}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Age</span>
            </div>
            <div className="bg-card-dark p-4 rounded-2xl text-center shadow-md border border-slate-800">
              <span className="block text-xl font-bold text-white">RM {formatValue(eligibility.householdIncome)}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Income</span>
            </div>
            <div className="bg-card-dark p-4 rounded-2xl text-center shadow-md border border-slate-800">
              <span className="block text-xl font-bold text-white">RM {formatValue(propertyPreferences.maxBudget)}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Budget</span>
            </div>
          </section>

          <section className="px-6 space-y-2 mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">
              Profile Setup
            </h3>
            <div className="space-y-3">
              {profileSetupItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/profile/edit/${item.section}`)}
                  className="w-full flex items-center gap-4 p-4 bg-card-dark rounded-2xl shadow-lg hover:bg-slate-700 transition-colors text-left border border-slate-800 hover:border-primary/30"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center ${item.iconColor}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-500 flex-shrink-0">chevron_right</span>
                </button>
              ))}
            </div>
          </section>

          <section className="px-6 space-y-2 mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4">
              Account Settings
            </h3>
            <div className="bg-card-dark rounded-2xl overflow-hidden shadow-lg border border-slate-800">
              {accountSettings.map((setting, index) => (
                <button
                  key={setting.id}
                  className={`w-full flex items-center justify-between p-4 hover:bg-slate-700 transition-colors ${index < accountSettings.length - 1 ? "border-b border-slate-700" : ""
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${setting.bgColor} flex items-center justify-center ${setting.iconColor}`}>
                      <span className="material-symbols-outlined text-lg">{setting.icon}</span>
                    </div>
                    <span className="font-medium text-white">{setting.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500">chevron_right</span>
                </button>
              ))}
            </div>
          </section>

          <section className="px-6 mt-8">
            <button
              onClick={handleLogout}
              className="w-full py-4 rounded-2xl bg-red-500/10 text-red-500 font-semibold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors border border-red-500/20">
              <span className="material-symbols-outlined">logout</span>
              Log Out
            </button>
          </section>
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

            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/search")}
            >
              <span className="material-symbols-outlined text-[28px]">search</span>
              <span className="text-[10px] uppercase font-medium">Search</span>
            </button>

            <button
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              onClick={() => navigate("/saved")}
            >
              <span className="material-symbols-outlined text-[28px]">bookmark</span>
              <span className="text-[10px] uppercase font-medium">Saved</span>
            </button>

            <button
              className="flex flex-col items-center gap-1 text-primary cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <span className="material-symbols-outlined text-[28px] fill-1">person</span>
              <span className="text-[10px] uppercase font-medium">Profile</span>
            </button>
          </div>
        </nav>

        <style>{`
          .profile-gradient {
            background: linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(10, 15, 26, 0) 100%);
          }
          .fill-1 {
            font-variation-settings: 'FILL' 1;
          }
        `}</style>
      </div>
    </div>
  );
}