"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-2 group">
        <span className="text-sm font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
          CS
        </span>
        <span className="hidden sm:block text-sm text-white/30 font-light">
          CreateSkills
        </span>
      </Link>
      <div className="flex items-center gap-6">
        <a
          href="#how-it-works"
          className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-wide uppercase"
        >
          How it works
        </a>
        <Link
          href="/login"
          className="text-xs text-white/40 hover:text-white/80 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
