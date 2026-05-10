import Image from "next/image";
import Badge from "@/components/ui/Badge";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-near-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Logo */}
        <div className="py-12 md:py-16 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Aretex Labs"
            width={750}
            height={380}
            className="h-20 md:h-24 w-auto invert"
          />
        </div>

        {/* Hairline */}
        <div className="h-px bg-white/[0.06]" aria-hidden="true" />

        {/* Meta row */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">
            ARETEX
            <span className="text-teal-400 mx-1">·</span>
            LABS
          </span>

          <p className="text-xs text-gray-600">
            &copy; {year} Aretex Labs, LLC. All rights reserved.
          </p>

          <Badge variant="copper">Stealth Mode</Badge>
        </div>
      </div>
    </footer>
  );
}
