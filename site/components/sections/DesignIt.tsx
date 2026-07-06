"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu } from "lucide-react";
import EngineeringMediaStrip, {
  type EngineeringMediaEntry,
} from "@/components/sections/EngineeringMediaStrip";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

// Designers: put assets in public/images/engineering/design and set imageSrc or videoSrc.
const designMedia: EngineeringMediaEntry[] = [
  {
    id: "aerospace",
    label: "Aerospace",
    caption: "Mission architecture and CAD package development",
    bodyText:
      "Aerospace design at Aretex starts with mission constraints, then moves into CAD packages that are manufacturable, testable, and ready for rapid iteration. Our test engineers and manufacturing teams are involved at every step.",
    alt: "Aerospace CAD visualization",
    imageSrc: undefined,
    gradientClass:
      "bg-gradient-to-br from-slate-800 via-teal-700/60 to-cyan-500/40",
  },
  {
    id: "defense",
    label: "Defense",
    caption: "Operator-focused design reviews and subsystem fit checks",
    bodyText:
      "Defense-focused design decisions are built around operator realities, field constraints, and integration requirements so systems perform when stakes are highest. We work with operators and design to their needs, not the other way around.",
    alt: "Defense systems concept render",
    imageSrc: undefined,
    gradientClass:
      "bg-gradient-to-br from-zinc-900 via-copper/50 to-amber-500/35",
  },
  {
    id: "human-performance",
    label: "Human Performance",
    caption: "Advancing elite performance with human-first design principles",
    bodyText:
      "At Aretex, we believe that human performance systems must elevate the user via human-centric designs, intelligent feedback, and measurable training quality as primary design objectives. If the design doesn't serve the user, it doesn't serve the mission.",
    alt: "Human performance assembly model",
    imageSrc: undefined,
    gradientClass:
      "bg-gradient-to-br from-slate-900 via-emerald-600/45 to-sky-600/35",
  },
  {
    id: "autonomous-systems",
    label: "Autonomous Systems",
    caption: "Rapid concept-to-geometry iterations for mission-driven autonomy",
    bodyText:
      "We design autonomous systems with rapid concept-to-geometry iterations, so that mission intent carries from the first sketch to the final prototype. Our sensor fusion, GN&C, and autonomy design is grounded in first-principles thinking.",
    alt: "Autonomous systems CAD flythrough",
    imageSrc: undefined,
    gradientClass:
      "bg-gradient-to-br from-black via-indigo-600/45 to-teal-500/35",
  },
];

const defaultDesignBody =
  "Our engineers enable your mission by helping turn concepts of need into production-grade designs. From early concept models to tolerance-critical assemblies, design intent stays intact from screen to shop floor.";

const defaultDesignMedia: EngineeringMediaEntry = {
  id: "design-overview",
  label: "Overview",
  caption: "Select a tag to preview a focused design capability",
  alt: "Design capability placeholder",
  imageSrc: undefined,
  gradientClass: "bg-gradient-to-br from-zinc-900 via-teal-700/45 to-copper/35",
};

export default function DesignIt() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const activeItem =
    activeMediaId !== null
      ? designMedia.find((item) => item.id === activeMediaId) ?? null
      : null;
  const activeMedia = activeItem ?? defaultDesignMedia;
  const activeBody = activeItem?.bodyText ?? defaultDesignBody;

  return (
    <section
      id="design-it"
      className="relative w-full min-h-[92svh] border-y border-white/[0.06] bg-[#080808] overflow-hidden"
      aria-labelledby="design-it-heading"
    >
      <EngineeringMediaStrip
        entry={activeMedia}
        icon={Cpu}
        ariaLabel="Design media background"
        layout="background"
        showMeta={false}
      />

      <div className="site-container pb-16 md:pb-20 lg:pb-24">
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? staggerContainer : {}}
          className="relative z-10 flex flex-col gap-10"
        >
          <motion.div
            variants={animate ? fadeUp : {}}
            className="relative w-screen left-1/2 -translate-x-1/2"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.82)_68%,rgba(0,0,0,0)_100%)]"
              aria-hidden="true"
            />
            <div className="site-container relative z-10 py-10 md:py-12 lg:py-14">
              <p className="text-xs font-mono text-teal-400 uppercase tracking-[0.3em] mb-4">
                Design It
              </p>
              <h1
                id="design-it-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.9] tracking-tight max-w-4xl"
              >
                Built for the real world.
              </h1>
              <p className="mt-6 text-base md:text-lg text-white leading-relaxed max-w-3xl">
                {activeBody}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={animate ? fadeUp : {}}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl relative z-10"
            aria-label="Capability areas"
          >
            {designMedia.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMediaId(item.id)}
                className={`rounded-full border px-4 py-2 text-xs font-mono tracking-[0.18em] uppercase text-left transition-colors duration-200 ${
                  activeMediaId === item.id
                    ? "border-teal-400/60 bg-teal-500/20 text-white"
                    : "border-white/12 bg-white/[0.03] text-gray-300 hover:border-teal-400/40 hover:text-gray-100"
                }`}
                aria-pressed={activeMediaId === item.id}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
