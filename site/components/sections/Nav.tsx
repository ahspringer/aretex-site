"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { withBasePath } from "@/lib/assets";

const navLinks = [
  { label: "Vision", href: "/vision" },
  { label: "Engineering", href: "/engineering" },
  { label: "Team", href: "/team" },
  { label: "ZeroShot", href: "/zeroshot" },
  { label: "Investors", href: "/investors" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-near-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none"
            aria-label="Aretex Labs home"
          >
            <Image
              src={withBasePath("/images/logo-mark.png")}
              alt=""
              width={247}
              height={215}
              priority
              className="h-7 w-auto invert"
              aria-hidden="true"
            />
            <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">
              ARETEX
              <span className="text-teal-400 mx-1">·</span>
              LABS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-sm font-semibold tracking-wide transition-all duration-200 border border-teal-600 text-teal-400 hover:bg-teal-600/10 hover:shadow-[0_0_12px_rgba(13,148,136,0.3)] px-4 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Get Involved
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-near-black flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  className="text-2xl font-bold text-gray-300 hover:text-white tracking-widest uppercase transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center text-base font-semibold tracking-wide transition-all duration-200 border border-teal-600 text-teal-400 hover:bg-teal-600/10 hover:shadow-[0_0_12px_rgba(13,148,136,0.3)] px-8 py-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                Get Involved
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
