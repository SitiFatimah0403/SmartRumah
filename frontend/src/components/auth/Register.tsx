import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Eye,
  Globe,
  Heart,
  HelpCircle,
  Home,
  House,
  IdCard,
  Info,
  Landmark,
  Mail,
  MapPin,
  Minus,
  Plus,
  Search,
  Train,
  User,
  Users,
  Wallet,
} from "lucide-react";

let timeout: any;

const states = [
  "Kuala Lumpur",
  "Selangor",
  "Johor",
  "Penang",
  "Perak",
  "Negeri Sembilan",
  "Melaka",
  "Pahang",
  "Kedah",
  "Kelantan",
  "Terengganu",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Putrajaya",
  "Labuan",
];

type SchemeKey = "prima" | "selangorku" | "rumawip" ;

const schemeOptions: {
  key: SchemeKey;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  { key: "prima", title: "PR1MA", subtitle: "Affordable Urban Living", icon: <BuildingIcon /> },
  { key: "selangorku", title: "Rumah Selangorku", subtitle: "Selangor State Housing", icon: <House className="h-7 w-7" /> },
  { key: "rumawip", title: "RUMAWIP", subtitle: "Federal Territory Residency", icon: <Landmark className="h-7 w-7" /> },
];

export default function SmartRumahCombinedPage() {
  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToHome = () => {
    window.location.href = "/";
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    nric: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    citizenship: "Malaysian",
    race: "Bumiputera",
    otherRace: "",
    maritalStatus: "Married",

    employmentStatus: "Employed",
    jobSector: "Private Sector",
    yearsOfEmployment: 5,
    workplaceLocation: "",
    workplaceLat: null as number | null,
    workplaceLng: null as number | null,

    preferredState: "Kuala Lumpur",
    maxBudget: 450000,
    commuteRange: "10km",
    priorities: ["Affordable Price", "Public Transport"],
    interestRate: "3.8%",
    loanTenure: "30",
    downpayment: "10%",

    firstTimeHomebuyer: true,
    householdIncome: "5500",
    dependents: 2,
    householdSize: "3",
    ownResidentialProperty: "No",
    applyingJointly: true,
    spouseIncome: "",
    currentResidentialState: "Selangor",
    financingStatus: "Not applied yet",

    selectedSchemes: ["prima", "selangorku"] as SchemeKey[],
  });

  const handleChange = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const togglePriority = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(label)
        ? prev.priorities.filter((item) => item !== label)
        : [...prev.priorities, label],
    }));
  };

  const toggleScheme = (scheme: SchemeKey) => {
    setFormData((prev) => ({
      ...prev,
      selectedSchemes: prev.selectedSchemes.includes(scheme)
        ? prev.selectedSchemes.filter((item) => item !== scheme)
        : [...prev.selectedSchemes, scheme],
    }));
  };

  async function searchLocation(query: string) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=my&limit=1`,
        {
          headers: {
            "Accept": "application/json",
            "User-Agent": "SmartRumahApp/1.0"
          }
        }
      );

      const data = await res.json();
      console.log("RESULT:", data);

      if (data.length > 0) {
        const place = data[0];

        handleChange("workplaceLat", parseFloat(place.lat));
        handleChange("workplaceLng", parseFloat(place.lon));
        handleChange("workplaceLocation", place.display_name);
      }

    } catch (err) {
      console.error(err);
    }
  }

function handleSearch(value: string) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    searchLocation(value);
  }, 600);
}

  const handleSubmit = async () => {
  try {
    const userId = "testUser123"; // temporary

    const res = await fetch("http://localhost:5000/users/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        formData, // THIS sends workplaceLat & workplaceLng
      }),
    });

    const data = await res.json();
    console.log("Saved:", data);

    // redirect after save
    window.location.href = "/";

  } catch (err) {
    console.error("Error saving:", err);
  }
};

  const allSchemesSelected = useMemo(
    () => formData.selectedSchemes.length === schemeOptions.length,
    [formData.selectedSchemes]
  );

  const toggleAllSchemes = () => {
    setFormData((prev) => ({
      ...prev,
      selectedSchemes: allSchemesSelected ? [] : schemeOptions.map((item) => item.key),
    }));
  };

  const completedSections = useMemo(() => {
    let score = 0;
    if (formData.fullName && formData.email && formData.nric) score += 1;
    if (formData.employmentStatus && formData.jobSector) score += 1;
    if (formData.preferredState && formData.maxBudget) score += 1;
    if (formData.householdIncome && formData.financingStatus) score += 1;
    if (formData.selectedSchemes.length > 0) score += 1;
    return score;
  }, [formData]);

  const sectionTitleClass =
    "mb-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-500";
  const cardClass =
    "rounded-3xl border border-white/5 bg-slate-900/60 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl";
  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-slate-500";

    

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto min-h-screen max-w-7xl bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_26%)]">
        <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={goToLogin}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <p className="text-sm font-semibold text-white">SmartRumah</p>
                <p className="text-xs text-slate-400">Complete onboarding profile</p>
              </div>
            </div>

            <div className="hidden w-full max-w-md px-6 md:block">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-[0.18em] text-emerald-500">Progress</span>
                <span className="text-slate-400">{completedSections} of 5 sections completed</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${(completedSections / 5) * 100}%` }}
                />
              </div>
            </div>

            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <section className={cardClass}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className={sectionTitleClass}>Step 1</p>
                  <h2 className="text-2xl font-extrabold tracking-tight">Personal Information</h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-400">
                    Provide your basic details to personalize your home ownership journey.
                  </p>
                </div>
                <Badge text="Step 1 of 5" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Full Name" icon={<User className="h-4 w-4" />}>
                  <input
                    className={inputClass}
                    placeholder="e.g., Luqman Hakim"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </Field>

                <Field label="NRIC" icon={<IdCard className="h-4 w-4" />}>
                  <input
                    className={inputClass}
                    placeholder="e.g., 950101-14-5051"
                    value={formData.nric}
                    onChange={(e) => handleChange("nric", e.target.value)}
                  />
                </Field>

                <Field label="Email Address" icon={<Mail className="h-4 w-4" />}>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="e.g., alex@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </Field>

                <Field label="Age" icon={<CalendarDays className="h-4 w-4" />}>
                  <input
                    type="number"
                    className={inputClass}
                    placeholder="e.g., 28"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                </Field>

                <Field label="Password" icon={<Eye className="h-4 w-4" />}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`${inputClass} pr-12`}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </Field>

                <Field label="Confirm Password" icon={<Eye className="h-4 w-4" />}>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${inputClass} pr-12`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </Field>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Field label="Citizenship" icon={<Globe className="h-4 w-4" />}>
                  <div className="flex rounded-2xl border border-slate-700 bg-slate-900/70 p-1">
                    {["Malaysian", "Non-Malaysian"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("citizenship", option)}
                        className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          formData.citizenship === option
                            ? "bg-emerald-500 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Marital Status" icon={<Heart className="h-4 w-4" />}>
                  <div className="grid grid-cols-3 gap-2">
                    {["Single", "Married", "Divorced"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("maritalStatus", option)}
                        className={toggleButtonClass(formData.maritalStatus === option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              {formData.citizenship === "Malaysian" && (
                <div className="mt-5">
                  <Field label="Race" icon={<Users className="h-4 w-4" />}>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {["Bumiputera", "Chinese", "Indian", "Others"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange("race", option)}
                          className={toggleCardClass(formData.race === option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {formData.race === "Others" && (
                      <input
                        className={`${inputClass} mt-3`}
                        placeholder="Please specify your race"
                        value={formData.otherRace}
                        onChange={(e) => handleChange("otherRace", e.target.value)}
                      />
                    )}
                  </Field>
                </div>
              )}
            </section>

            <section className={cardClass}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className={sectionTitleClass}>Step 2</p>
                  <h2 className="text-2xl font-extrabold tracking-tight">Employment Details</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Tell us about your work profile so we can estimate eligibility more accurately.
                  </p>
                </div>
                <Badge text="Step 2 of 5" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Employment Status" icon={<Briefcase className="h-4 w-4" />}>
                  <div className="grid grid-cols-2 gap-3">
                    {["Employed", "Self-employed"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("employmentStatus", option)}
                        className={toggleButtonClass(formData.employmentStatus === option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Job Sector" icon={<Briefcase className="h-4 w-4" />}>
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none pr-10`}
                      value={formData.jobSector}
                      onChange={(e) => handleChange("jobSector", e.target.value)}
                    >
                      <option>Private Sector</option>
                      <option>Public Sector</option>
                      <option>Non-Profit</option>
                      <option>Freelance</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </Field>

                <Field label="Years of Employment" icon={<CalendarDays className="h-4 w-4" />}>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-white">
                      <span>{formData.yearsOfEmployment} years</span>
                      <span className="text-slate-400">Experience</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={formData.yearsOfEmployment}
                      onChange={(e) => handleChange("yearsOfEmployment", Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </Field>

                <Field label="Workplace Location" icon={<MapPin className="h-4 w-4" />}>
                  <div className="relative">

                  {/*Search Icon */}
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />

                  {/* INPUT */}
                  <input
                    type="text"
                    placeholder="Search area (e.g. Bangsar, KLCC)"
                    value={formData.workplaceLocation}
                    onChange={(e) => {
                      const value = e.target.value;

                      // update text
                      handleChange("workplaceLocation", value);

                      // 🔥 RESET OLD LOCATION
                      handleChange("workplaceLat", null);
                      handleChange("workplaceLng", null);

                      // 🔥 debounce search
                      if (value.length > 3) {
                        handleSearch(value);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white font-medium focus:outline-none focus:border-emerald-400"
                  />

                  {/* BUTTON */}
                  <button
                    type="button"
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition((pos) => {
                        handleChange("workplaceLat", pos.coords.latitude);
                        handleChange("workplaceLng", pos.coords.longitude);
                        handleChange("workplaceLocation", "Current Location 📍");
                      });
                    }}
                    className="mt-3 w-full rounded-xl bg-emerald-500/10 py-2 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20"
                  >
                    Use My Current Location 📍
                  </button>

                </div>
                </Field>
              </div>

              {formData.workplaceLat && formData.workplaceLng && (
                <iframe
                  width="100%"
                  height="220"
                  style={{ borderRadius: "16px" }}
                  src={`https://www.google.com/maps?q=${formData.workplaceLat},${formData.workplaceLng}&z=15&output=embed`}
                />
              )}
            </section>

            <section className={cardClass}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className={sectionTitleClass}>Step 3</p>
                  <h2 className="text-2xl font-extrabold tracking-tight">Property Preferences</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Tailor your property match with location, budget, commute, and financing preferences.
                  </p>
                </div>
                <Badge text="Step 3 of 5" />
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Field label="Preferred State" icon={<MapPin className="h-4 w-4" />}>
                  <div className="relative">
                    <select
                      className={`${inputClass} appearance-none pr-10`}
                      value={formData.preferredState}
                      onChange={(e) => handleChange("preferredState", e.target.value)}
                    >
                      {states.map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </Field>

                <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                      <Wallet className="h-4 w-4 text-emerald-500" />
                      Max Budget
                    </div>
                    <span className="text-xl font-extrabold text-emerald-500">
                      RM {formData.maxBudget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={1000000}
                    step={10000}
                    value={formData.maxBudget}
                    onChange={(e) => handleChange("maxBudget", Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    <span>RM 100k</span>
                    <span>RM 1.0M</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {["5km", "10km", "20km", "Any"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange("commuteRange", option)}
                    className={toggleCardClass(formData.commuteRange === option)}
                  >
                    <div className="mb-2 flex justify-center">
                      {option === "20km" ? (
                        <Train className="h-5 w-5" />
                      ) : option === "Any" ? (
                        <MapPin className="h-5 w-5" />
                      ) : (
                        <Briefcase className="h-5 w-5" />
                      )}
                    </div>
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <Field label="What Matters Most" icon={<CheckCircle2 className="h-4 w-4" />}>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      "Affordable Price",
                      "Public Transport",
                      "Nearby Schools",
                      "Lifestyle",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => togglePriority(item)}
                        className={toggleCardClass(formData.priorities.includes(item))}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                <MiniStat label="Interest Rate" value={formData.interestRate} />
                <MiniStat label="Loan Tenure" value={formData.loanTenure} suffix="years" />
                <MiniStat label="Downpayment" value={formData.downpayment} />
              </div>
            </section>

            <section className={cardClass}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className={sectionTitleClass}>Step 4</p>
                  <h2 className="text-2xl font-extrabold tracking-tight">Housing Scheme Eligibility</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Check household, ownership, and financing details used by housing schemes.
                  </p>
                </div>
                <Badge text="Step 4 of 5" />
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="space-y-5">
                  <Field label="First-time Homebuyer" icon={<Home className="h-4 w-4" />}>
                    <button
                      type="button"
                      onClick={() => handleChange("firstTimeHomebuyer", !formData.firstTimeHomebuyer)}
                      className={`flex h-14 w-full items-center justify-between rounded-2xl border px-4 transition ${
                        formData.firstTimeHomebuyer
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 bg-slate-900/60"
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">I have never owned a residential property before</p>
                      </div>
                      <div
                        className={`relative h-7 w-14 rounded-full transition ${
                          formData.firstTimeHomebuyer ? "bg-emerald-500" : "bg-slate-700"
                        }`}
                      >
                        <div
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                            formData.firstTimeHomebuyer ? "right-1" : "left-1"
                          }`}
                        />
                      </div>
                    </button>
                  </Field>

                  <Field label="Monthly Household Income (RM)" icon={<Wallet className="h-4 w-4" />}>
                    <input
                      className={inputClass}
                      value={formData.householdIncome}
                      onChange={(e) => handleChange("householdIncome", e.target.value.replace(/[^\d]/g, ""))}
                      placeholder="e.g. 5500"
                    />
                  </Field>

                  <Field label="Number of Dependents" icon={<Users className="h-4 w-4" />}>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 p-2">
                      <button
                        type="button"
                        onClick={() => handleChange("dependents", Math.max(0, formData.dependents - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-extrabold">{formData.dependents}</span>
                      <button
                        type="button"
                        onClick={() => handleChange("dependents", formData.dependents + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </Field>
                </div>

                <div className="space-y-5">
                  <Field label="Household Size" icon={<Users className="h-4 w-4" />}>
                    <div className="grid grid-cols-5 gap-2">
                      {["1", "2", "3", "4", "5+"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleChange("householdSize", size)}
                          className={toggleButtonClass(formData.householdSize === size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Do you own any residential property?" icon={<House className="h-4 w-4" />}>
                    <div className="grid grid-cols-2 gap-3">
                      {["No", "Yes"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleChange("ownResidentialProperty", option)}
                          className={toggleButtonClass(formData.ownResidentialProperty === option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Applying jointly with spouse?" icon={<Heart className="h-4 w-4" />}>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleChange("applyingJointly", false)}
                        className={toggleButtonClass(!formData.applyingJointly)}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange("applyingJointly", true)}
                        className={toggleButtonClass(formData.applyingJointly)}
                      >
                        Yes
                      </button>
                    </div>
                  </Field>

                  {formData.applyingJointly && (
                    <Field label="Spouse Monthly Income (RM)" icon={<Wallet className="h-4 w-4" />}>
                      <input
                        className={inputClass}
                        value={formData.spouseIncome}
                        onChange={(e) => handleChange("spouseIncome", e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="e.g. 3500"
                      />
                    </Field>
                  )}

                  <Field label="Current Residential State" icon={<MapPin className="h-4 w-4" />}>
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-10`}
                        value={formData.currentResidentialState}
                        onChange={(e) => handleChange("currentResidentialState", e.target.value)}
                      >
                        {states.map((state) => (
                          <option key={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </Field>

                  <Field label="Financing Status" icon={<Landmark className="h-4 w-4" />}>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Not applied yet",
                        "Planning to apply",
                        "Pre-approved",
                        "Already approved",
                      ].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleChange("financingStatus", status)}
                          className={toggleButtonClass(formData.financingStatus === status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className={sectionTitleClass}>Step 5</p>
                  <h2 className="text-2xl font-extrabold tracking-tight">Housing Scheme Interest</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Select the government housing schemes you want SmartRumah to check for eligibility.
                  </p>
                </div>
                <Badge text="Step 5 of 5" />
              </div>

              <div className="mb-5 flex items-center justify-between rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Select All</h3>
                    <p className="text-xs text-slate-400">Toggle all available schemes</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleAllSchemes}
                  className={`relative h-7 w-14 rounded-full transition ${
                    allSchemesSelected ? "bg-emerald-500" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      allSchemesSelected ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {schemeOptions.map((scheme) => {
                  const active = formData.selectedSchemes.includes(scheme.key);
                  return (
                    <button
                      key={scheme.key}
                      type="button"
                      onClick={() => toggleScheme(scheme.key)}
                      className={`flex items-center justify-between rounded-3xl border p-4 text-left transition ${
                        active
                          ? "border-emerald-500/40 bg-emerald-500/10 ring-1 ring-emerald-500/20"
                          : "border-white/5 bg-slate-900/40 hover:border-emerald-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                            active ? "bg-white text-slate-900" : "bg-slate-800 text-white"
                          }`}
                        >
                          {scheme.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{scheme.title}</h4>
                          <p className="text-xs text-slate-400">{scheme.subtitle}</p>
                        </div>
                      </div>
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          active ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-600"
                        }`}
                      >
                        {active && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className={cardClass}>
              <p className={sectionTitleClass}>Summary</p>
              <h3 className="text-xl font-extrabold tracking-tight">Profile snapshot</h3>
              <div className="mt-5 space-y-3 text-sm">
                <SummaryRow label="Applicant" value={formData.fullName || "Not entered"} />
                <SummaryRow label="Citizenship" value={formData.citizenship} />
                <SummaryRow label="Employment" value={formData.employmentStatus} />
                <SummaryRow label="Workplace" value={formData.workplaceLocation} />
                <SummaryRow label="Preferred State" value={formData.preferredState} />
                <SummaryRow label="Budget" value={`RM ${formData.maxBudget.toLocaleString()}`} />
                <SummaryRow label="Household Income" value={`RM ${Number(formData.householdIncome || 0).toLocaleString()}`} />
                <SummaryRow label="Financing" value={formData.financingStatus} />
              </div>
            </section>

            <section className={cardClass}>
              <p className={sectionTitleClass}>Selected schemes</p>
              <h3 className="text-xl font-extrabold tracking-tight">Eligibility targets</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.selectedSchemes.length > 0 ? (
                  schemeOptions
                    .filter((item) => formData.selectedSchemes.includes(item.key))
                    .map((item) => (
                      <span
                        key={item.key}
                        className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300"
                      >
                        {item.title}
                      </span>
                    ))
                ) : (
                  <span className="text-sm text-slate-400">No scheme selected yet.</span>
                )}
              </div>
            </section>

            

            <button
              onClick={handleSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-500 px-6 py-4 text-lg font-extrabold text-white shadow-[0_10px_30px_rgba(16,185,129,0.28)] transition hover:brightness-110 active:scale-[0.98]"
            >
              <span>Set My Profile</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        <span className="text-emerald-500">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
      {text}
    </span>
  );
}

function MiniStat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-extrabold text-emerald-400">
        {value} {suffix ? <span className="text-sm text-slate-500">{suffix}</span> : null}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/40 px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}

function toggleButtonClass(active: boolean) {
  return `rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
    active
      ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
      : "border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white"
  }`;
}

function toggleCardClass(active: boolean) {
  return `rounded-2xl border px-4 py-4 text-sm font-semibold transition ${
    active
      ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
      : "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-emerald-500/30 hover:text-white"
  }`;
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 21V7a2 2 0 0 1 2-2h5v16" />
      <path d="M11 21V3h7a2 2 0 0 1 2 2v16" />
      <path d="M7 9h1M7 12h1M7 15h1M14 7h1M14 10h1M14 13h1M14 16h1" />
    </svg>
  );
}
