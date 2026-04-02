"use client";

import { motion } from "framer-motion";
import { Globe, GitBranch, FileText, AlignLeft, Paperclip, CirclePlay, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { humanize } from "@/lib/utils";

const typeIcons: Record<string, React.ElementType> = {
  url: Globe,
  github: GitBranch,
  md: FileText,
  txt: AlignLeft,
  file: Paperclip,
  youtube: CirclePlay,
  thoughts: MessageSquare,
};

const typeLabels: Record<string, string> = {
  url: "Web URL",
  github: "GitHub",
  md: "Markdown",
  txt: "Text",
  file: "File",
  youtube: "YouTube",
  thoughts: "Thoughts",
};

interface Skill {
  skill_id: string;
  skill_name: string;
  skill_type: string;
  source_input: string;
  created: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  onClick: () => void;
}

export function SkillCard({ skill, index, onClick }: SkillCardProps) {
  const Icon = typeIcons[skill.skill_type] ?? Globe;
  const displayName = humanize(skill.skill_name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <Card
        className="cursor-pointer hover:border-white/15 hover:bg-white/5 transition-all duration-200 group"
        onClick={onClick}
      >
        <CardContent className="pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                <Badge variant="muted" className="text-xs py-0.5">
                  {typeLabels[skill.skill_type] ?? skill.skill_type}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                {displayName}
              </h3>
              <p className="text-xs text-white/25 mt-1 truncate font-mono">
                {skill.source_input}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors" />
          </div>
          {skill.created && (
            <p className="text-xs text-white/20 mt-3">
              {new Date(skill.created).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
