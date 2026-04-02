"use client";

import { motion } from "framer-motion";

const lines = [
  { text: "[skill-name]/", indent: 0, dim: false },
  { text: "├── manifest.json", indent: 1, dim: false, comment: "metadata, version, ICP tags" },
  { text: "├── core.skill", indent: 1, dim: false, comment: "compressed knowledge graph" },
  { text: "├── prompts/", indent: 1, dim: false },
  { text: "│   └── default.md", indent: 2, dim: true, comment: "curated prompt templates" },
  { text: "├── tools/", indent: 1, dim: false },
  { text: "│   └── tools.json", indent: 2, dim: true, comment: "tool call definitions" },
  { text: "└── README.md", indent: 1, dim: false, comment: "human-readable overview" },
];

interface FileArchitectureProps {
  skillName?: string;
}

export function FileArchitecture({ skillName }: FileArchitectureProps) {
  const displayLines = lines.map((l) => ({
    ...l,
    text: skillName ? l.text.replace("[skill-name]", skillName) : l.text,
  }));

  return (
    <div
      className="rounded-xl p-5 font-mono text-xs overflow-x-auto"
      style={{
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {displayLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
          className="flex items-baseline gap-3 leading-6"
        >
          <span className={line.dim ? "text-white/30" : "text-white/70"}>
            {line.text}
          </span>
          {line.comment && (
            <span className="text-white/20">← {line.comment}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
