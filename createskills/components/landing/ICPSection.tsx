"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const profiles = [
  { emoji: "🤖", label: "AI Agent Developers", desc: "Build smarter agents faster with pre-packaged domain skills." },
  { emoji: "🧠", label: "LLM Engineers", desc: "Stop prompt engineering from scratch. Start from structured skill files." },
  { emoji: "✍️", label: "Technical Writers", desc: "Turn documentation into deployable knowledge artifacts." },
  { emoji: "📢", label: "Developer Advocates", desc: "Package your talks, tutorials, and guides into reusable skills." },
  { emoji: "🎓", label: "Course Creators", desc: "Monetise your knowledge in the agent economy marketplace." },
  { emoji: "⚡", label: "Indie AI Builders", desc: "Ship faster. One .skill file replaces dozens of custom prompts." },
];

export function ICPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-semibold text-white mb-3 text-center"
        >
          Built for
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm text-white/30 text-center mb-12"
        >
          Anyone who works at the intersection of knowledge and AI agents.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span className="text-xl">{p.emoji}</span>
              <div>
                <p className="text-sm font-medium text-white/80">{p.label}</p>
                <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
