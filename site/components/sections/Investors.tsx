"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

const milestones = [
  {
    id: "T-0",
    label: "Proof of Concept",
    date: "April 2026",
    status: "complete",
    type: "technical",
  },
  {
    id: "B-0",
    label: "Foundations & Patent",
    date: "May 2026",
    status: "complete",
    type: "business",
  },
  {
    id: "T-1",
    label: "Subsystem Integration & Test",
    date: "In Progress",
    status: "active",
    type: "technical",
  },
  {
    id: "B-1",
    label: "Business Validation",
    date: "In Progress",
    status: "active",
    type: "business",
  },
  {
    id: "T-2",
    label: "Initial Prototype",
    date: "June 2026",
    status: "upcoming",
    type: "technical",
  },
  {
    id: "T-3",
    label: "Hybrid Prototype",
    date: "September 2026",
    status: "upcoming",
    type: "technical",
  },
  {
    id: "B-2",
    label: "Customer Acceptance",
    date: "Shot Show 2027",
    status: "upcoming",
    type: "business",
  },
  {
    id: "T-4",
    label: "Pilot Unit",
    date: "December 2026",
    status: "upcoming",
    type: "technical",
  },
  {
    id: "T-5 / B-3",
    label: "Pre-Production & Scale",
    date: "March 2027",
    status: "upcoming",
    type: "business",
  },
];

export default function Investors() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <SectionWrapper id="investors" dark>
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-16"
      >
        {/* Header */}
        <motion.div variants={animate ? fadeUp : {}} className="max-w-3xl">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            Investors
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Built for a{" "}
            <span className="text-teal-400">$9.4B market.</span>
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed max-w-2xl">
            The gun accessories market represents 9.9 million active firearm
            enthusiasts in the United States alone. Our primary targets are PRS,
            F-Class, and serious long-range marksmanship competitors — a
            technically sophisticated, underserved, and high-intent segment.
          </p>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          variants={animate ? fadeUp : {}}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[
            { value: "$9.4B", label: "Gun accessories market (TAM)" },
            { value: "9.9M", label: "Active firearm enthusiasts (US)" },
            { value: "Pre-Seed", label: "Current stage · Raising now" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-white/5 rounded-xl p-6 bg-white/[0.02]"
            >
              <p className="text-3xl font-extrabold font-mono text-copper">
                {item.value}
              </p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Milestone timeline */}
        <motion.div variants={animate ? fadeUp : {}} className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white">
            Development Roadmap
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  m.status === "complete"
                    ? "border-teal-600/30 bg-teal-600/5"
                    : m.status === "active"
                    ? "border-copper/30 bg-copper/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <span
                  className={`shrink-0 mt-0.5 w-2 h-2 rounded-full ${
                    m.status === "complete"
                      ? "bg-teal-400"
                      : m.status === "active"
                      ? "bg-copper animate-pulse"
                      : "bg-gray-700"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono text-gray-500">
                    {m.id}
                  </span>
                  <span className="text-sm font-semibold text-white leading-snug">
                    {m.label}
                  </span>
                  <span className="text-xs text-gray-600">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </SectionWrapper>
  );
}
