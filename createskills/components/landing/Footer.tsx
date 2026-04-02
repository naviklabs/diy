export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} CreateSkills.xyz — All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
            Privacy
          </a>
          <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
