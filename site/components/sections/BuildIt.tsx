"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Wrench } from "lucide-react";
import EngineeringMediaStrip, {
  type EngineeringMediaEntry,
} from "@/components/sections/EngineeringMediaStrip";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";
import { withBasePath } from "@/lib/assets";

// Constant image location for only one background image while retaining the flexibility to add more later.
const defaultMediaSrc = withBasePath("/images/3d-print-build.png");

// Designers: put assets in public/images/engineering/build and set imageSrc or videoSrc.
const buildCapabilities: EngineeringMediaEntry[] = [
  {
    id: "additive-manufacturing",
    label: "Additive manufacturing",
    caption: "Rapid additive iterations for form, fit, and functional validation",
    bodyText:
      "Additive manufacturing turns designs into functional parts on demand, no tooling or lead time required. Local prototyping keeps defense programs moving at the speed of need.",
    alt: "Additive manufacturing setup",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-zinc-950 via-teal-600/45 to-cyan-500/35",
  },
//   {
//     id: "custom-parts",
//     label: "Custom metal and polymer parts",
//     caption: "Custom parts produced for demanding performance envelopes",
//     alt: "Custom machined and printed parts",
//     imageSrc: undefined,
//     gradientClass:
//       "bg-gradient-to-br from-slate-950 via-copper/45 to-orange-400/30",
//   },
  {
    id: "pcb-design",
    label: "PCB design and fabrication",
    caption: "Board design flow from layout through fabrication and test",
    bodyText:
      "From schematic to fabricated board, PCB workflows are engineered for speed, reliability, and fast integration into larger systems.",
    alt: "PCB boards and reflow setup",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-black via-emerald-600/45 to-teal-500/35",
  },
  {
    id: "electronics-assembly",
    label: "assembly",
    caption: "Electronics assembly, soldering, and system bring-up",
    bodyText:
      "Mechanical and electrical assembly happens under one roof, reducing handoff friction and accelerating bring-up and verification.",
    alt: "Electronics assembly bench",
    imageSrc: defaultMediaSrc,
    gradientClass:
      "bg-gradient-to-br from-zinc-950 via-indigo-600/45 to-sky-500/35",
  },
  // {
  //   id: "prototype-pilot",
  //   label: "Prototype to pilot builds",
  //   caption: "From first article through pilot-level hardware builds",
  //   bodyText:
  //     "Prototype and pilot builds are structured for rapid learning, so each build cycle improves manufacturability and field readiness.",
  //   alt: "Prototype hardware build line",
  //   imageSrc: undefined,
  //   gradientClass:
  //     "bg-gradient-to-br from-slate-900 via-copper/50 to-red-500/35",
  // },
];

const defaultBuildBody =
  "We manufacture and integrate under real schedule pressure. The same team that designs and validates your system is the team that builds and delivers it for real-world deployment.";

const defaultBuildMedia: EngineeringMediaEntry = {
  id: "build-overview",
  label: "Overview",
  caption: "Select a tag to preview a focused build capability",
  alt: "Build capability placeholder",
  imageSrc: defaultMediaSrc,
  gradientClass: "bg-gradient-to-br from-zinc-950 via-teal-600/35 to-copper/25",
};

export default function BuildIt() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const activeItem =
    activeMediaId !== null
      ? buildCapabilities.find((item) => item.id === activeMediaId) ?? null
      : null;
  const activeMedia = activeItem ?? defaultBuildMedia;
  const activeBody = activeItem?.bodyText ?? defaultBuildBody;

  return (
    <section
      id="build-it"
      className="relative w-full min-h-[92svh] border-b border-white/[0.06] bg-[#050505] overflow-hidden"
      aria-labelledby="build-it-heading"
    >
      <EngineeringMediaStrip
        entry={activeMedia}
        icon={Wrench}
        ariaLabel="Build media background"
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
                Build It
              </p>
              <h2
                id="build-it-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.9] tracking-tight max-w-4xl"
              >
                Precision prototypes.
              </h2>
              <p className="mt-6 text-base md:text-lg text-white leading-relaxed max-w-3xl">
                {activeBody}
              </p>
            </div>
          </motion.div>

          <motion.div variants={animate ? fadeUp : {}} className="grid md:grid-cols-3 gap-3 relative z-10">
            {buildCapabilities.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMediaId(item.id)}
                className={`rounded-full border px-4 py-2 text-xs font-mono tracking-[0.18em] uppercase text-left transition-colors duration-200 ${
                  activeMediaId === item.id
                    ? "border-teal-400/70 bg-teal-500/30 text-white"
                    : "border-white/25 bg-white/[0.12] text-gray-100 hover:border-teal-400/55 hover:bg-white/[0.16] hover:text-white"
                }`}
                aria-pressed={activeMediaId === item.id}
                disabled
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
