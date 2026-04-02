"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { FileArchitecture } from "./FileArchitecture";
import { ICPGrid } from "./ICPGrid";
import { DownloadSection } from "./DownloadSection";
import { humanize } from "@/lib/utils";

interface Skill {
  skill_id: string;
  skill_name: string;
  skill_type: string;
  source_input: string;
  created: string;
}

interface SkillDetailDrawerProps {
  skill: Skill | null;
  open: boolean;
  onClose: () => void;
  autoOpen?: boolean;
}

const typeLabels: Record<string, string> = {
  url: "Web URL",
  github: "GitHub Repo",
  md: "Markdown",
  txt: "Text File",
  file: "File Upload",
  youtube: "YouTube",
  thoughts: "Your Thoughts",
};

export function SkillDetailDrawer({ skill, open, onClose, autoOpen }: SkillDetailDrawerProps) {
  useEffect(() => {
    if (autoOpen && skill) {
      // auto-open is handled by the parent via open prop
    }
  }, [autoOpen, skill]);

  if (!skill) return null;

  const displayName = humanize(skill.skill_name);
  const typeLabel = typeLabels[skill.skill_type] ?? skill.skill_type;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant="accent">{typeLabel}</Badge>
            {skill.created && (
              <span className="text-xs text-white/25">
                {new Date(skill.created).toLocaleDateString()}
              </span>
            )}
          </div>
          <SheetTitle className="text-2xl">{displayName}</SheetTitle>
          <p className="text-xs text-white/25 mt-1 font-mono break-all">
            {skill.source_input}
          </p>
        </SheetHeader>

        <div className="space-y-8 mt-6">
          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-xs tracking-widest uppercase text-white/25 mb-3">
              About this skill
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              <strong className="text-white/80">{displayName}</strong> is a structured knowledge artifact
              distilled from a <span className="text-emerald-400">{typeLabel}</span> source. In the
              emerging AI Agent Economy, skills are the currency of intelligence — discrete, portable units
              that any agent can acquire, deploy, and compose into powerful workflows. This skill
              encapsulates domain knowledge that would otherwise require hours of prompt engineering
              and context management.
            </p>
          </motion.section>

          {/* Value */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h3 className="text-xs tracking-widest uppercase text-white/25 mb-3">
              Why it matters to the Agent Economy
            </h3>
            <div className="space-y-3">
              {[
                { emoji: "🧩", text: "Agents need structured knowledge, not raw text. Skills provide a distilled, queryable format optimised for LLM consumption." },
                { emoji: "🔄", text: "Reusable across any LLM or orchestration layer — LangChain, CrewAI, AutoGen, or your own stack." },
                { emoji: "📡", text: "Follows the open .skill Protocol — interoperable by design, versionable, and composable." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-white/50">
                  <span className="flex-shrink-0">{item.emoji}</span>
                  <span className="leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* File architecture */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-xs tracking-widest uppercase text-white/25 mb-3">
              File architecture
            </h3>
            <FileArchitecture skillName={skill.skill_name} />
          </motion.section>

          {/* ICP */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <h3 className="text-xs tracking-widest uppercase text-white/25 mb-3">
              Who can use this
            </h3>
            <ICPGrid skillType={skill.skill_type} />
          </motion.section>

          {/* Download */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 className="text-xs tracking-widest uppercase text-white/25 mb-3">
              Download
            </h3>
            <DownloadSection skillName={skill.skill_name} skillId={skill.skill_id} />
          </motion.section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
