import Badge from "@/components/ui/Badge";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-near-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">
          ARETEX
          <span className="text-teal-400 mx-1">·</span>
          LABS
        </span>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          &copy; {year} Aretex Labs, LLC. All rights reserved.
        </p>

        {/* Stealth badge */}
        <Badge variant="copper">Stealth Mode</Badge>
      </div>
    </footer>
  );
}
