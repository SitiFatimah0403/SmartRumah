import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  Eye,
  Globe,
  Heart,
  Home,
  IdCard,
  Info,
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

type SchemeKey = "prima" | "selangorku" | "myhome" | "rumawip" | "spb";

type FormData = {
  fullName: string;
  nric: string;
  email: string;
  age: string;
  password: string;
  confirmPassword: string;
  citizenship: string;
  race: string;
  otherRace: string;
  maritalStatus: string;
  employmentStatus: string;
  jobSector: string;
  yearsOfEmployment: number;
  workplaceLocation: string;
  preferredState: string;
  maxBudget: number;
  commuteRange: string;
  priorities: string[];
  interestRate: string;
  loanTenure: string;
  downpayment: string;
  firstTimeHomebuyer: boolean;
  householdIncome: string;
  dependents: number;
  householdSize: string;
  ownResidentialProperty: string;
  applyingJointly: boolean;
  spouseIncome: string;
  currentResidentialState: string;
  financingStatus: string;
  selectedSchemes: SchemeKey[];
};

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

const schemeOptions: {
  key: SchemeKey;
  title: string;
  subtitle: string;
}[] = [
  { key: "prima", title: "PR1MA", subtitle: "Affordable Urban Living" },
  { key: "selangorku", title: "Rumah Selangorku", subtitle: "Selangor State Housing" },
  { key: "myhome", title: "MyHome", subtitle: "Private Affordable Housing" },
  { key: "rumawip", title: "RUMAWIP", subtitle: "Federal Territory Residency" },
  { key: "spb", title: "SPB", subtitle: "Youth Housing Scheme" },
];

type ProfileEditSection =
  | "personal-information"
  | "employment-details"
  | "property-preferences"
  | "scheme-eligibility"
  | "scheme-interest"
  | "all";

type ProfileEditProps = {
  activeSection?: ProfileEditSection;
};

export default function ProfileEdit({ activeSection = "all" }: ProfileEditProps) {
  const navigate = useNavigate();

  const isSectionVisible = (section: ProfileEditSection) => activeSection === "all" || activeSection === section;


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "Luqman Hakim",
    nric: "950101-14-5051",
    email: "alex@email.com",
    age: "28",
    password: "password123",
    confirmPassword: "password123",
    citizenship: "Malaysian",
    race: "Bumiputera",
    otherRace: "",
    maritalStatus: "Married",
    employmentStatus: "Employed",
    jobSector: "Private Sector",
    yearsOfEmployment: 5,
    workplaceLocation: "KLCC, Kuala Lumpur",
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
    spouseIncome: "3500",
    currentResidentialState: "Selangor",
    financingStatus: "Not applied yet",
    selectedSchemes: ["prima", "selangorku"],
  });

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePriority = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(item)
        ? prev.priorities.filter((p) => p !== item)
        : [...prev.priorities, item],
    }));
  };

  const toggleScheme = (scheme: SchemeKey) => {
    setFormData((prev) => ({
      ...prev,
      selectedSchemes: prev.selectedSchemes.includes(scheme)
        ? prev.selectedSchemes.filter((s) => s !== scheme)
        : [...prev.selectedSchemes, scheme],
    }));
  };

  const allSchemesSelected = useMemo(
    () => formData.selectedSchemes.length === schemeOptions.length,
    [formData.selectedSchemes]
  );

  const toggleAllSchemes = () => {
    setFormData((prev) => ({
      ...prev,
      selectedSchemes: allSchemesSelected ? [] : schemeOptions.map((s) => s.key),
    }));
  };

  const sectionClass =
    "rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl";
  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-slate-500";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto min-h-screen max-w-6xl bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_26%)]">
        <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/85 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h1 className="text-lg font-extrabold tracking-tight">Edit Profile</h1>
              <p className="text-xs text-slate-400">Update your SmartRumah details</p>
            </div>

            <div className="w-11" />
          </div>
        </header>

        <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {isSectionVisible("personal-information") && (
              <section className={sectionClass}>
                <SectionHeader title="Personal Information" subtitle="Basic identity and account details." />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Full Name" icon={<User className="h-4 w-4" />}>
                  <input className={inputClass} value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                </Field>

                <Field label="NRIC" icon={<IdCard className="h-4 w-4" />}>
                  <input className={inputClass} value={formData.nric} onChange={(e) => handleChange("nric", e.target.value)} />
                </Field>

                <Field label="Email Address" icon={<Mail className="h-4 w-4" />}>
                  <input type="email" className={inputClass} value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                </Field>

                <Field label="Age" icon={<CalendarDays className="h-4 w-4" />}>
                  <input type="number" className={inputClass} value={formData.age} onChange={(e) => handleChange("age", e.target.value)} />
                </Field>

                <Field label="Password" icon={<Eye className="h-4 w-4" />}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`${inputClass} pr-12`}
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

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Citizenship" icon={<Globe className="h-4 w-4" />}>
                  <div className="flex rounded-2xl border border-slate-700 bg-slate-900/70 p-1">
                    {["Malaysian", "Non-Malaysian"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("citizenship", option)}
                        className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          formData.citizenship === option ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"
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
            )}

            {isSectionVisible("employment-details") && (
              <section className={sectionClass}>
                <SectionHeader title="Employment Details" subtitle="Your current work and location profile." />

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
                    <div className="mb-3 flex items-center justify-between text-sm font-semibold">
                      <span>{formData.yearsOfEmployment}</span>
                      <span className="text-slate-400">Years</span>
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

                <Field label="Workplace Location" icon={<Search className="h-4 w-4" />}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                    <input
                      className={`${inputClass} pl-11`}
                      value={formData.workplaceLocation}
                      onChange={(e) => handleChange("workplaceLocation", e.target.value)}
                    />
                  </div>
                </Field>
              </div>

              <div className="mt-5 h-52 overflow-hidden rounded-3xl border border-white/5 bg-[radial-gradient(rgba(16,185,129,0.22)_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="relative flex h-full items-center justify-center bg-slate-950/50">
                  <div className="absolute bottom-3 left-3 rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Live Preview
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="h-12 w-12 text-emerald-500 drop-shadow-[0_0_14px_rgba(16,185,129,0.65)]" />
                    <p className="text-sm font-semibold">{formData.workplaceLocation}</p>
                  </div>
                </div>
              </div>
            </section>
            )}

            {isSectionVisible("property-preferences") && (
              <section className={sectionClass}>
              <SectionHeader title="Property Preferences" subtitle="Refine budget, commute, and property priorities." />
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

              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    <Wallet className="h-4 w-4 text-emerald-400" />
                    Max Budget
                  </div>
                  <span className="text-xl font-extrabold text-emerald-400">
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
                <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  <span>RM 100k</span>
                  <span>RM 1.0M</span>
                </div>
              </div>

              <div className="mt-5">
                <Field label="Commute Range" icon={<Train className="h-4 w-4" />}>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {["5km", "10km", "20km", "Any"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange("commuteRange", option)}
                        className={toggleCardClass(formData.commuteRange === option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="What Matters Most" icon={<Heart className="h-4 w-4" />}>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {["Affordable Price", "Public Transport", "Nearby Schools", "Lifestyle"].map((item) => (
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
                <MiniStat label="Loan Tenure" value={formData.loanTenure} suffix="Years" />
                <MiniStat label="Downpayment" value={formData.downpayment} />
              </div>
            </section>
            )}

            {isSectionVisible("scheme-eligibility") && (
              <section className={sectionClass}>
              <SectionHeader title="Housing Scheme Eligibility" subtitle="Update household and financing details." />

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="space-y-5">
                  <Field label="First-Time Homebuyer" icon={<Home className="h-4 w-4" />}>
                    <button
                      type="button"
                      onClick={() => handleChange("firstTimeHomebuyer", !formData.firstTimeHomebuyer)}
                      className={`flex h-14 w-full items-center justify-between rounded-2xl border px-4 transition ${
                        formData.firstTimeHomebuyer ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700 bg-slate-900/50"
                      }`}
                    >
                      <span className="text-sm font-semibold">I have never owned a residential property before</span>
                      <div className={`relative h-7 w-14 rounded-full ${formData.firstTimeHomebuyer ? "bg-emerald-500" : "bg-slate-700"}`}>
                        <div className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${formData.firstTimeHomebuyer ? "right-1" : "left-1"}`} />
                      </div>
                    </button>
                  </Field>

                  <Field label="Monthly Household Income (RM)" icon={<Wallet className="h-4 w-4" />}>
                    <input
                      className={inputClass}
                      value={formData.householdIncome}
                      onChange={(e) => handleChange("householdIncome", e.target.value.replace(/[^\d]/g, ""))}
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

                  <Field label="Own any residential property?" icon={<Home className="h-4 w-4" />}>
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
                      <button type="button" onClick={() => handleChange("applyingJointly", false)} className={toggleButtonClass(!formData.applyingJointly)}>
                        No
                      </button>
                      <button type="button" onClick={() => handleChange("applyingJointly", true)} className={toggleButtonClass(formData.applyingJointly)}>
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

                  <Field label="Housing Loan / Financing Status" icon={<Wallet className="h-4 w-4" />}>
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
            )}

            {isSectionVisible("scheme-interest") && (
              <section className={sectionClass}>
                <SectionHeader title="Housing Scheme Interest" subtitle="Choose which schemes to keep on your profile." />

              <div className="mb-5 flex items-center justify-between rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div>
                  <h3 className="font-bold">Select All</h3>
                  <p className="text-xs text-slate-400">Toggle all housing schemes</p>
                </div>
                <button
                  type="button"
                  onClick={toggleAllSchemes}
                  className={`relative h-7 w-14 rounded-full ${allSchemesSelected ? "bg-emerald-500" : "bg-slate-700"}`}
                >
                  <div className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${allSchemesSelected ? "right-1" : "left-1"}`} />
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
                        active ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/5 bg-slate-900/40 hover:border-emerald-500/20"
                      }`}
                    >
                      <div>
                        <h4 className="font-bold">{scheme.title}</h4>
                        <p className="text-xs text-slate-400">{scheme.subtitle}</p>
                      </div>
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          active ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-600"
                        }`}
                      >
                        {active && <Check className="h-4 w-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex gap-3 rounded-3xl border border-emerald-500/15 bg-slate-900/50 p-4">
                <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-400">
                  <Info className="h-4 w-4" />
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  SmartRumah uses these preferences to personalize your profile and improve housing recommendations.
                </p>
              </div>
            </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className={sectionClass}>
              <SectionHeader title="Profile Summary" subtitle="Quick overview of your updated details." />
              <div className="space-y-3 text-sm">
                <SummaryRow label="Name" value={formData.fullName} />
                <SummaryRow label="Email" value={formData.email} />
                <SummaryRow label="Employment" value={formData.employmentStatus} />
                <SummaryRow label="State" value={formData.preferredState} />
                <SummaryRow label="Budget" value={`RM ${formData.maxBudget.toLocaleString()}`} />
                <SummaryRow label="Income" value={`RM ${Number(formData.householdIncome || 0).toLocaleString()}`} />
                <SummaryRow label="Financing" value={formData.financingStatus} />
              </div>
            </section>

            <section className={sectionClass}>
              <SectionHeader title="Selected Schemes" subtitle="Schemes attached to this profile." />
              <div className="flex flex-wrap gap-2">
                {formData.selectedSchemes.map((schemeKey) => {
                  const scheme = schemeOptions.find((item) => item.key === schemeKey);
                  return (
                    <span
                      key={schemeKey}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300"
                    >
                      {scheme?.title}
                    </span>
                  );
                })}
              </div>
            </section>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-500 px-6 py-4 text-lg font-extrabold text-white shadow-[0_10px_30px_rgba(16,185,129,0.28)] transition hover:brightness-110 active:scale-[0.98]"
            >
              <span>Done</span>
              <Check className="h-5 w-5" />
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        <span className="text-emerald-400">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

function MiniStat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-4">
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
