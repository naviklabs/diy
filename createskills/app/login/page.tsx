"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Step = "email" | "otp";

const slideVariants = {
  enterFromRight: { x: 30, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -30, opacity: 0 },
};

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Could not send code");
      setStep("otp");
    } catch {
      setError("Could not send login code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error("Invalid code");
      router.push("/my-skills");
    } catch {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <a href="/" className="text-sm font-bold text-white/60 hover:text-white transition-colors mb-12">
        CS
        <span className="font-light text-white/30 ml-1.5">CreateSkills</span>
      </a>

      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <AnimatePresence mode="wait">
          {step === "email" && (
            <motion.div
              key="email"
              variants={slideVariants}
              initial="enterFromRight"
              animate="center"
              exit="exitToLeft"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h1 className="text-xl font-semibold text-white mb-1">Welcome back</h1>
              <p className="text-sm text-white/40 mb-6">Enter your email to receive a login code.</p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div
                  className="flex items-center rounded-full px-4 py-2.5"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
                >
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full rounded-full h-10">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <> Send Login Code <ArrowRight className="w-4 h-4" /> </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-white/25 text-center mt-4">
                First time?{" "}
                <a href="/" className="text-white/50 hover:text-white/80 transition-colors">
                  Create a skill
                </a>
              </p>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              variants={slideVariants}
              initial="enterFromRight"
              animate="center"
              exit="exitToLeft"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="text-2xl mb-3">📬</div>
              <h1 className="text-xl font-semibold text-white mb-1">Check your inbox</h1>
              <p className="text-sm text-white/40 mb-6">
                We sent a 6-digit code to <span className="text-white/70">{email}</span>
              </p>
              <form onSubmit={handleOtpSubmit} className="space-y-3">
                <div
                  className="flex items-center justify-center rounded-xl px-4 py-3"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
                >
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    autoFocus
                    className="text-center text-2xl tracking-[0.5em] font-mono"
                  />
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full rounded-full h-10">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <> Verify & Sign In <ArrowRight className="w-4 h-4" /> </>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => { setStep("email"); setError(""); setOtp(""); }}
                  className="w-full text-xs text-white/30 hover:text-white/60 transition-colors pt-1"
                >
                  ← Change email
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
