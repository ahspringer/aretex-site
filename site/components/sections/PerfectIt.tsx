"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Crosshair } from "lucide-react";
import EngineeringMediaStrip, {
  type EngineeringMediaEntry,
} from "@/components/sections/EngineeringMediaStrip";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";
import { withBasePath } from "@/lib/assets";

// Constant image location for only one background image while retaining the flexibility to add more later.
const defaultMediaSrc = withBasePath("/images/ray-tracing.png");

// Designers: put assets in public/images/engineering/perfect and set imageSrc or videoSrc.
const analysisDomains: EngineeringMediaEntry[] = [
  {
    id: "electrical",
    label: "Electrical",
    caption: "Electrical behavior and signal integrity review",
    bodyText:
      "Electrical analysis verifies signal integrity, power distribution, and component interaction before integration, reducing rework during bring-up.",
    alt: "Electrical systems analysis view",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-slate-900 via-amber-500/35 to-rose-500/35",
  },
  {
    id: "optical",
    label: "Optical",
    caption: "Optical behavior and light path analysis",
    bodyText:
      "Optical studies refine light path behavior and performance tradeoffs early, so system-level decisions are made with confidence.",
    alt: "Optical simulation view",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-zinc-900 via-orange-500/45 to-yellow-400/35",
  },
  {
    id: "structural",
    label: "Structural",
    caption: "Load paths and deformation checks under mission conditions",
    bodyText:
      "Structural analysis exposes stress concentrations, deformation risk, and fatigue concerns before hardware is cut.",
    alt: "Structural finite element stress plot",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-slate-950 via-blue-600/40 to-cyan-500/35",
  },
  {
    id: "aerodynamics",
    label: "Aerodynamics",
    caption: "Flow behavior and drag-informed geometry decisions",
    bodyText:
      "Aerodynamic modeling informs geometry updates for stability and performance in realistic operating conditions.",
    alt: "Aerodynamics flow field visualization",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-slate-900 via-sky-500/40 to-teal-500/35",
  },
  {
    id: "test-evaluation",
    label: "Test & Evaluation",
    caption: "Systems tested in real-world conditions before final delivery",
    bodyText:
      "Test and evaluation ties simulation to reality through measured results, tightening the loop between design intent and field behavior.",
    alt: "Test and evaluation dashboard",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-zinc-950 via-emerald-500/35 to-cyan-500/30",
  },
  {
    id: "conops",
    label: "Operations",
    caption: "Operational concept testing tied to real user workflows",
    bodyText:
      "Operational analysis keeps engineering aligned to real user workflows, ensuring technical decisions support mission outcomes.",
    alt: "Concept of operations test session",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-black via-indigo-600/40 to-copper/35",
  },
];

const defaultPerfectBody =
  "Using real-world data, operator feedback, and advanced simulations, we ensure designs perform flawlessly under all conditions before production.";

const defaultPerfectMedia: EngineeringMediaEntry = {
  id: "perfect-overview",
  label: "Overview",
  caption: "Select a tag to preview a focused analysis capability",
  alt: "Analysis capability placeholder",
  imageSrc: defaultMediaSrc,
  gradientClass: "bg-gradient-to-br from-zinc-950 via-copper/35 to-teal-500/25",
};

export default function PerfectIt() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const activeItem =
    activeMediaId !== null
      ? analysisDomains.find((item) => item.id === activeMediaId) ?? null
      : null;
  const activeMedia = activeItem ?? defaultPerfectMedia;
  const activeBody = activeItem?.bodyText ?? defaultPerfectBody;

  return (
    <section
      id="perfect-it"
      className="relative w-full min-h-[92svh] border-b border-white/[0.06] bg-[#060606] overflow-hidden"
      aria-labelledby="perfect-it-heading"
    >
      <EngineeringMediaStrip
        entry={activeMedia}
        icon={Crosshair}
        ariaLabel="Perfect media background"
        layout="background"
        showMeta={false}
        instantSwap  // Remove later for fade between media entries once there is more than one.
      />

      <div className="site-container pb-16 md:pb-20 lg:pb-24">
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? staggerContainer : {}}
          className="relative z-0 flex flex-col gap-10"
        >
          <motion.div
            variants={animate ? fadeUp : {}}
            className="relative w-screen left-1/2 -translate-x-1/2"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.82)_70%,rgba(0,0,0,0)_100%)]"
              aria-hidden="true"
            />
            <div className="site-container relative z-10 py-10 md:py-12 lg:py-14">
              <p className="text-xs font-mono text-copper-light uppercase tracking-[0.3em] mb-4">
                Perfect It
              </p>
              <h2
                id="perfect-it-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.9] tracking-tight max-w-4xl"
              >
                Intelligent analysis.
              </h2>
              <p className="mt-6 text-base md:text-lg text-white leading-relaxed max-w-3xl">
                {activeBody}
              </p>
            </div>
          </motion.div>

          <motion.ul
            variants={animate ? fadeUp : {}}
            className="grid sm:grid-cols-2 gap-3 relative z-10"
            aria-label="Analysis capabilities"
          >
            {analysisDomains.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveMediaId(item.id)}
                  className={`w-full rounded-full border px-4 py-2 text-xs font-mono tracking-[0.18em] uppercase text-left transition-colors duration-200 ${
                    activeMediaId === item.id
                      ? "border-copper-light/70 bg-copper/30 text-white"
                      : "border-white/25 bg-white/[0.12] text-gray-100 hover:border-copper-light/55 hover:bg-white/[0.16] hover:text-white"
                  }`}
                  aria-pressed={activeMediaId === item.id}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
