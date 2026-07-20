import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { withBasePath } from "@/lib/assets";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Products", href: "/zeroshot" },
  { label: "ZeroShot", href: "/zeroshot" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const samUei = "WDTGLDLZR7C5"; // System for Award Management Unique Entity Identifier
  const CAGECode = "TBD"; // Commercial and Government Entity Code

  return (
    <footer className="relative z-20 w-full mt-0 bg-near-black border-t border-white/10">
      <div className="site-container">
        {/* Hairline */}
        <div className="h-px bg-white/[0.06]" aria-hidden="true" />

        {/* Meta row */}
        <div className="py-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="py-2 md:py-4 flex justify-center">
            <Image
              src={withBasePath("/images/logo.png")}
              alt="Aretex Labs"
              width={375}
              height={190}
              className="h-15 md:h-17 w-auto invert"
            />
          </div>

          <p className="text-xs text-white-600">
            &copy; {year} Aretex Labs, LLC. All rights reserved.
          </p>

          <div className="flex flex-col items-center sm:items-end leading-tight">
            <span className="text-xs font-mono text-white-700 uppercase tracking-widest">
              Alabama, United States
            </span>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              SAM & DUNS Registered
            </span>
            {/* <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              CAGE: {CAGECode}
            </span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

