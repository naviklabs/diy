"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SourceCard } from "@/components/landing/SourceCard";
import { GenerateModal } from "@/components/landing/GenerateModal";
import { SocialProof } from "@/components/landing/SocialProof";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ICPSection } from "@/components/landing/ICPSection";
import { Footer } from "@/components/landing/Footer";
import type { SourceTypeId } from "@/components/landing/TypeSelector";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [skillData, setSkillData] = useState({
    skillType: "url" as SourceTypeId,
    sourceInput: "",
    userPrompt: "",
    youtubeUrls: [] as string[],
  });

  const handleGenerate = (data: {
    skillType: SourceTypeId;
    sourceInput: string;
    userPrompt: string;
    youtubeUrls: string[];
  }) => {
    setSkillData(data);
    setModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="pb-8">
          <SourceCard onGenerate={handleGenerate} />
        </div>
        <SocialProof />
        <HowItWorks />
        <ICPSection />
      </main>
      <Footer />

      <GenerateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        skillType={skillData.skillType}
        sourceInput={
          skillData.skillType === "youtube"
            ? skillData.youtubeUrls.filter(Boolean).join(", ")
            : skillData.sourceInput
        }
        userPrompt={skillData.userPrompt}
      />
    </>
  );
}
