"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Globe,
  GitBranch,
  FileText,
  AlignLeft,
  Paperclip,
  CirclePlay,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export const SOURCE_TYPES = [
  { id: "url", label: "Web URL", icon: Globe, placeholder: "https://docs.example.com/..." },
  { id: "github", label: "GitHub Repo", icon: GitBranch, placeholder: "github.com/org/repo" },
  { id: "md", label: "Markdown", icon: FileText, placeholder: "Paste a .md URL" },
  { id: "txt", label: "Text File", icon: AlignLeft, placeholder: "Paste a .txt URL" },
  { id: "file", label: "File Upload", icon: Paperclip, placeholder: "" },
  { id: "youtube", label: "YouTube", icon: CirclePlay, placeholder: "https://youtube.com/watch?v=..." },
  { id: "thoughts", label: "Your Thoughts", icon: MessageSquare, placeholder: "What skill do you want to create?" },
] as const;

export type SourceTypeId = typeof SOURCE_TYPES[number]["id"];

interface TypeSelectorProps {
  selected: SourceTypeId;
  onSelect: (id: SourceTypeId) => void;
  open: boolean;
  onToggle: () => void;
}

export function TypeSelector({ selected, onSelect, open, onToggle }: TypeSelectorProps) {
  const current = SOURCE_TYPES.find((t) => t.id === selected)!;
  const Icon = current.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors px-1 py-1 rounded-md"
      >
        <motion.div
          key={selected}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-white/10 bg-[#111] shadow-2xl overflow-hidden z-50"
          >
            {SOURCE_TYPES.map((type) => {
              const TIcon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    onSelect(type.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-left ${
                    selected === type.id
                      ? "text-white bg-white/8"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <TIcon className="w-4 h-4 flex-shrink-0" />
                  {type.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
