"use client";

import { motion } from "framer-motion";

const subline = "Transform any knowledge source into a portable .skill file — ready for any AI agent, workflow, or marketplace.";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-16 px-6">
      {/* Radial vignette over grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(8,8,8,0) 0%, #080808 100%)",
        }}
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 text-xs tracking-[0.25em] uppercase text-white/30 font-medium"
      >
        AI · Agent · Economy
      </motion.p>

      {/* Headline — word stagger */}
      <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-0">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none"
        >
          Create Skill
        </motion.h1>

        <motion.em
          initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold italic leading-none"
          style={{ color: "#6ee7b7", fontStyle: "italic" }}
        >
          of
        </motion.em>
      </div>

      {/* Subline with char stagger */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-8 max-w-lg text-base text-white/40 leading-relaxed"
      >
        {subline.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.015, ease: "easeOut" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}
