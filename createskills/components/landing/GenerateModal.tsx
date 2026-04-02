"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, CheckCircle2, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SourceTypeId } from "./TypeSelector";

interface GenerateModalProps {
  open: boolean;
  onClose: () => void;
  skillType: SourceTypeId;
  sourceInput: string;
  userPrompt: string;
}

type Step = "email" | "otp" | "success";

const slideVariants = {
  enterFromRight: { x: 30, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -30, opacity: 0 },
};

export function GenerateModal({
  open,
  onClose,
  skillType,
  sourceInput,
  userPrompt,
}: GenerateModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillPath, setSkillPath] = useState("");

  const reset = () => {
    setStep("email");
    setEmail("");
    setOtp("");
    setError("");
    setSkillPath("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, skillType, sourceInput, userPrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setSkillPath(data.downloadUrl ?? "");
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid code");
      setStep("success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const shortSource = sourceInput.length > 40 ? sourceInput.slice(0, 40) + "…" : sourceInput;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "email" && (
            <motion.div
              key="email"
              variants={slideVariants}
              initial="enterFromRight"
              animate="center"
              exit="exitToLeft"
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <DialogHeader>
                <div className="mb-3 flex items-center gap-2 text-emerald-400">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Crafting your skill</span>
                </div>
                <DialogTitle>Ready to package</DialogTitle>
                <DialogDescription>
                  {shortSource
                    ? `We'll turn "${shortSource}" into a .skill file and send you a login code.`
                    : "Drop your email — we'll send your .skill file and a login code."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEmailSubmit} className="mt-4 space-y-3">
                <div
                  className="flex items-center gap-2 rounded-full px-4 py-2.5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                  }}
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
                {error && <p className="text-xs text-red-400 px-1">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full h-10"
                  variant="default"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Generate My Skill
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              variants={slideVariants}
              initial="enterFromRight"
              animate="center"
              exit="exitToLeft"
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <DialogHeader>
                <div className="mb-3 text-2xl">📬</div>
                <DialogTitle>Check your inbox</DialogTitle>
                <DialogDescription>
                  We sent a 6-digit code to <span className="text-white/70">{email}</span>
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleOtpSubmit} className="mt-4 space-y-3">
                <div
                  className="flex items-center justify-center rounded-xl px-4 py-3"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.04)",
                  }}
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
                {error && <p className="text-xs text-red-400 px-1">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full h-10"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Verify & Enter
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full text-xs text-white/30 hover:text-white/60 transition-colors pt-1"
                >
                  ← Change email
                </button>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              variants={slideVariants}
              initial="enterFromRight"
              animate="center"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Skill queued!</h3>
                  <p className="text-sm text-white/50 mt-1">
                    Your .skill file will be ready shortly.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    handleClose();
                    router.push(`/my-skills?first=true`);
                  }}
                  className="w-full rounded-full h-10"
                >
                  View My Skills
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
