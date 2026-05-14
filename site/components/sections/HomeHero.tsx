"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pages = [
  {
    label: "Vision",
    href: "/vision",
    description: "Our thesis, our values, and why we exist.",
  },
  {
    label: "Engineering",
    href: "/engineering",
    description: "The domains we build for.",
  },
  {
    label: "Team",
    href: "/team",
    description: "The co-founders building Aretex Labs.",
  },
  {
    label: "ZeroShot",
    href: "/zeroshot",
    description: "Our first product. In development.",
  },
  {
    label: "Investors",
    href: "/investors",
    description: "The opportunity and where we're headed.",
  },
];

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden"
      aria-label="Welcome"
    >
      <div className="relative site-container py-24 lg:py-28 w-full">
        <div className="flex flex-col gap-16">
          {/* Wordmark / eyebrow */}
          <motion.p
            className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em]"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Aretex Labs
          </motion.p>

          {/* Headline */}
          <div className="flex flex-col gap-4 max-w-4xl">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight"
              initial={animate ? { opacity: 0, y: 30 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Building systems that {" "}
              <span className="text-teal-400">elevate the user.</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl"
              initial={animate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              We believe every person carries elite potential. Our job is to
              build the technology that helps them reach it.
            </motion.p>
          </div>

          {/* Page cards */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-600/30 p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-teal-500 uppercase tracking-widest">
                    {page.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-gray-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all duration-200"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {page.description}
                </p>
              </Link>
            ))}
          </motion.div>

          {/* Subtle divider line */}
          <motion.div
            className="h-px bg-white/[0.06] max-w-xs origin-left"
            initial={animate ? { opacity: 0, scaleX: 0 } : false}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            aria-hidden="true"
          />

          {/* Footer-level aside */}
          <motion.p
            className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.25em]"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            Aretex Labs, LLC · Alabama · Stealth Mode
          </motion.p>
        </div>
      </div>
    </section>
  );
}
