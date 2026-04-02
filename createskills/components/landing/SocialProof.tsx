"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const quotes = [
  {
    text: "Turned our entire API docs into a .skill file in under a minute. Our agents now answer questions that used to take 3 tool calls.",
    author: "Priya M.",
    role: "AI Platform Lead",
  },
  {
    text: "Skills are the missing primitive between raw context and agent capability. CreateSkills nails the packaging layer.",
    author: "Dayo O.",
    role: "LLM Engineer",
  },
  {
    text: "We replaced 12 custom prompt templates with one .skill file. Portability across AutoGen, LangChain, and our own stack.",
    author: "Tomas L.",
    role: "Indie AI Builder",
  },
];

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 px-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-xs tracking-widest uppercase text-white/20 mb-10"
      >
        Trusted by builders in 40+ countries
      </motion.p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="rounded-xl p-5"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p className="text-sm text-white/50 leading-relaxed mb-4">"{q.text}"</p>
            <div>
              <p className="text-xs font-medium text-white/70">{q.author}</p>
              <p className="text-xs text-white/30">{q.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
