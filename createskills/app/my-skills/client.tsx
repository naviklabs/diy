"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LogOut, Plus } from "lucide-react";
import { SkillCard } from "@/components/dashboard/SkillCard";
import { SkillDetailDrawer } from "@/components/dashboard/SkillDetailDrawer";
import { Button } from "@/components/ui/button";

interface Skill {
  skill_id: string;
  skill_name: string;
  skill_type: string;
  source_input: string;
  created: string;
}

interface MySkillsClientProps {
  skills: Skill[];
  isFirstLogin: boolean;
  userEmail: string;
}

export function MySkillsClient({ skills, isFirstLogin, userEmail }: MySkillsClientProps) {
  const router = useRouter();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isFirstLogin && skills.length > 0) {
      setSelectedSkill(skills[0]);
      setDrawerOpen(true);
    }
  }, [isFirstLogin, skills]);

  const handleLogout = async () => {
    await fetch("/api/otp/verify", { method: "DELETE" }).catch(() => {});
    document.cookie = "pb_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
          CS
          <span className="font-light text-white/30 ml-1.5 hidden sm:inline">CreateSkills</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/30 hidden sm:block">{userEmail}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs">
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </Button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-semibold text-white"
          >
            My Skills
          </motion.h1>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New Skill
            </Button>
          </Link>
        </div>

        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <p className="text-white/30 text-sm mb-4">No skills yet.</p>
            <Link href="/">
              <Button variant="outline" size="sm">Create your first skill →</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <SkillCard
                key={skill.skill_id}
                skill={skill}
                index={i}
                onClick={() => {
                  setSelectedSkill(skill);
                  setDrawerOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <SkillDetailDrawer
        skill={selectedSkill}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedSkill(null);
        }}
        autoOpen={isFirstLogin}
      />
    </div>
  );
}
