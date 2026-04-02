"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Plus, X, ArrowRight } from "lucide-react";
import { TypeSelector, SOURCE_TYPES, type SourceTypeId } from "./TypeSelector";
import { Textarea } from "@/components/ui/textarea";

interface SourceCardProps {
  onGenerate: (data: {
    skillType: SourceTypeId;
    sourceInput: string;
    userPrompt: string;
    youtubeUrls: string[];
  }) => void;
}

export function SourceCard({ onGenerate }: SourceCardProps) {
  const [selectedType, setSelectedType] = useState<SourceTypeId>("url");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>([""]);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guide, setGuide] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const currentType = SOURCE_TYPES.find((t) => t.id === selectedType)!;

  const handleTypeSelect = (id: SourceTypeId) => {
    setSelectedType(id);
    setDropdownOpen(false);
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleGenerate = () => {
    const sourceInput =
      selectedType === "youtube"
        ? youtubeUrls.filter(Boolean).join(", ")
        : inputValue;
    if (!sourceInput.trim() && selectedType !== "file") return;
    onGenerate({ skillType: selectedType, sourceInput, userPrompt: guide, youtubeUrls });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Main pill bar */}
      <div
        className="relative flex items-center gap-3 rounded-full px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(110,231,183,0.04), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Type selector */}
        <TypeSelector
          selected={selectedType}
          onSelect={handleTypeSelect}
          open={dropdownOpen}
          onToggle={() => setDropdownOpen((v) => !v)}
        />

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 flex-shrink-0" />

        {/* Input area */}
        <div className="flex-1 min-w-0">
          {selectedType === "thoughts" ? (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentType.placeholder}
              rows={1}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none resize-none leading-relaxed"
              style={{ minHeight: "1.5rem" }}
            />
          ) : selectedType === "file" ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-sm text-white/30 hover:text-white/60 transition-colors text-left"
            >
              {inputValue || "Click to select a file…"}
            </button>
          ) : selectedType === "youtube" ? (
            <input
              ref={inputRef}
              type="url"
              value={youtubeUrls[0]}
              onChange={(e) => {
                const urls = [...youtubeUrls];
                urls[0] = e.target.value;
                setYoutubeUrls(urls);
              }}
              placeholder={currentType.placeholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
          ) : (
            <input
              ref={inputRef}
              type={selectedType === "url" ? "url" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder={currentType.placeholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
          )}
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => setInputValue(e.target.files?.[0]?.name ?? "")}
          />
        </div>

        {/* Guide toggle */}
        <button
          type="button"
          onClick={() => setGuideOpen((v) => !v)}
          title="Add context to shape your skill"
          className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${
            guideOpen ? "text-emerald-400" : "text-white/30 hover:text-white/60"
          }`}
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGenerate}
          className="flex-shrink-0 h-8 w-8 rounded-full bg-white hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center"
        >
          <ArrowRight className="w-4 h-4 text-black" />
        </button>
      </div>

      {/* YouTube — add more URLs */}
      <AnimatePresence>
        {selectedType === "youtube" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4">
              {youtubeUrls.slice(1).map((url, i) => (
                <div key={i + 1} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      const urls = [...youtubeUrls];
                      urls[i + 1] = e.target.value;
                      setYoutubeUrls(urls);
                    }}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none border-b border-white/10 pb-1"
                  />
                  <button
                    type="button"
                    onClick={() => setYoutubeUrls(youtubeUrls.filter((_, idx) => idx !== i + 1))}
                    className="text-white/30 hover:text-white/60"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setYoutubeUrls([...youtubeUrls, ""])}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors self-start mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add another URL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide textarea */}
      <AnimatePresence>
        {guideOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 px-4">
              <Textarea
                value={guide}
                onChange={(e) => setGuide(e.target.value)}
                placeholder="Guide the skill — e.g. 'Focus on the authentication section, target junior developers, include code examples'"
                rows={3}
                className="text-xs rounded-2xl px-4 py-3 border-white/8 bg-white/3"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
