import React, { useEffect, useState } from "react";
import { Home, BarChart3, ShieldCheck, Mail, Lock, Eye, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

export default function SmartRumahCombined() {
  const [showSplash, setShowSplash] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      // send token to backend
      const res = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("User:", data);

      navigate("/");

    } catch (error: any) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      const res = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Google User:", data);

      navigate("/");

    } catch (error: any) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#101622] text-white font-sans">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45 }}
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0F1C]"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-500 blur-[120px]" />
              <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-emerald-500 blur-[120px]" />
            </div>

            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#10B981 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 flex h-screen w-full max-w-md flex-col items-center justify-between px-6 py-16">
              <div className="flex flex-1 flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mb-10 flex h-40 w-40 items-center justify-center rounded-[28px] border border-emerald-400/20 bg-emerald-500/5 shadow-2xl shadow-emerald-500/10"
                >
                  <div className="relative flex items-center justify-center">
                    <Home className="h-20 w-20 text-white" strokeWidth={2.2} />
                    <div className="absolute -bottom-3 -right-3 rounded-2xl border border-emerald-400/30 bg-[#0A0F1C] p-2.5 shadow-lg">
                      <BarChart3 className="h-7 w-7 text-emerald-400" strokeWidth={2.3} />
                    </div>
                  </div>
                </motion.div>

                <div className="text-center">
                  <h1 className="mb-3 text-5xl font-extrabold tracking-tight">
                    Smart<span className="text-emerald-400">Rumah</span>
                  </h1>
                  <div className="mx-auto h-1.5 w-16 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-10">
                <div className="flex items-center justify-center gap-3">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`h-2.5 w-2.5 rounded-full ${i === 0
                        ? "bg-emerald-400"
                        : i === 1
                          ? "bg-emerald-400/60"
                          : "bg-emerald-400/30"
                        }`}
                      animate={{ opacity: [1, 0.45, 1], scale: [1, 0.92, 1] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                  <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 opacity-80">
                    Smarter Decisions, Better Homes
                  </p>

                  <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                      Enterprise Security
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#F6F6F8] text-slate-900 dark:bg-[#101622] dark:text-slate-100"
          >
            <div className="absolute right-0 top-0 -z-0 opacity-10 blur-[100px] pointer-events-none">
              <div className="h-64 w-64 rounded-full bg-emerald-500" />
            </div>
            <div className="absolute bottom-0 left-0 -z-0 opacity-10 blur-[80px] pointer-events-none">
              <div className="h-48 w-48 rounded-full bg-emerald-500" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-6">
              <div className="pt-14 pb-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                    <Home className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                      Smart<span className="text-emerald-500">Rumah</span>
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Personalized housing insights
                    </p>
                  </div>
                </div>

                <h1 className="pb-3 text-[32px] font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                  Find a home that actually fits your life.
                </h1>
                <p className="text-base leading-normal text-slate-600 dark:text-slate-400">
                  Log in to view your personalized Suitability Scores.
                </p>
              </div>

              <div className="flex flex-col gap-6 py-3">
                <label className="flex w-full flex-col">
                  <p className="pb-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    Email Address
                  </p>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/40 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>
                </label>

                <label className="flex w-full flex-col">
                  <div className="flex items-end justify-between pb-2">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Password
                    </p>
                    <button
                      type="button"
                      className="text-sm font-bold text-emerald-500 transition hover:text-emerald-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-base font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/40 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 text-emerald-500 transition hover:text-emerald-600"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </label>
              </div>

              <div className="py-6">
                <button
                  onClick={handleLogin}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-extrabold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600">
                  <span>Log In</span>
                  <LogIn className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 py-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800/50" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                  Quick Connect
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800/50" />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-800 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-800/50">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>

              <div className="mt-auto pb-10 pt-16 text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Don&apos;t have an account?
                  <button
                    onClick={() => navigate("/register")}
                    className="ml-1 font-extrabold text-emerald-500 hover:underline"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
