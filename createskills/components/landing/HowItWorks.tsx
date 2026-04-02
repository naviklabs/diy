"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, Cpu, Zap } from "lucide-react";

const steps = [
  {
    icon: Link2,
    num: "01",
    title: "Paste any source",
    desc: "Drop a URL, GitHub repo, doc, YouTube video, or just your own thoughts.",
  },
  {
    icon: Cpu,
    num: "02",
    title: "We structure the skill",
    desc: "Our engine distils the knowledge into a layered .skill file — prompts, tools, and a knowledge graph.",
  },
  {
    icon: Zap,
    num: "03",
    title: "Deploy to any agent",
    desc: "Use it with LangChain, CrewAI, AutoGen, or any custom orchestration layer. Portable by design.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-semibold text-white mb-12 text-center"
        >
          How it works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="relative rounded-xl p-6"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span className="absolute top-4 right-4 text-3xl font-bold text-white/5">
                  {step.num}
                </span>
                <Icon className="w-5 h-5 text-emerald-400 mb-4" />
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
