import Image from "next/image";
import Link from "next/link";
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

  return (
    <footer className="relative z-20 w-full mt-0 bg-near-black border-t border-white/10">
      <div className="site-container">
        {/* Logo */}
        {/* <div className="py-12 md:py-16 flex justify-center">
          <Image
            src={withBasePath("/images/logo.png")}
            alt="Aretex Labs"
            width={750}
            height={380}
            className="h-20 md:h-24 w-auto invert"
          />
        </div> */}

        {/* Nav links */}
        {/* <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 pb-10" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-gray-500 hover:text-gray-300 tracking-wider uppercase transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav> */}

        {/* Hairline */}
        <div className="h-px bg-white/[0.06]" aria-hidden="true" />

        {/* Meta row */}
        <div className="py-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">
            ARETEX
            <span className="text-teal-400 mx-1">·</span>
            LABS
          </span> */}

          {/* Logo */}
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

          <span className="text-xs font-mono text-white-700 uppercase tracking-widest">
            Alabama, United States
          </span>
        </div>
      </div>
    </footer>
  );
}

