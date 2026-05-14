"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Crosshair, Wrench, Eye } from "lucide-react";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

const domains = [
  {
    icon: Cpu,
    title: "Embedded Systems & Sensor Integration",
    description:
      "We design and build hardware-software systems from the ground up — precision measurements, real-time firmware, and hardware/software co-design that closes the loop between the physical and computational.",
  },
  {
    icon: Crosshair,
    title: "Ballistics & Physics Simulation",
    description:
      "High-fidelity modeling, environmental effects, and predictive solutions. We model the real world and validate against it.",
  },
  {
    icon: Wrench,
    title: "Hardware Prototyping & Manufacturing",
    description:
      "Mechanical design and rapid iteration from proof-of-concept through pilot production. We build things that survive contact with the real world, and we engineer for manufacturability from the start.",
  },
  {
    icon: Eye,
    title: "Optical Systems & Human-Machine Interface",
    description:
      "Display optics integration, sight picture fidelity, and human-centered interaction design. The interface between a precision tool and the human using it is never an afterthought.",
  },
];

export default function EngineeringDomains() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      className="relative bg-near-black px-6 md:px-12 lg:px-24 py-24 lg:py-32"
      aria-labelledby="engineering-domains-heading"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? fadeUp : {}}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            Domains
          </p>
          <h2
            id="engineering-domains-heading"
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            What we build.
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed">
            Aretex Labs operates across a focused set of hardware and software
            engineering disciplines.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={
            animate
              ? {
                  hidden: {},
                  visible: {
                    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
                  },
                }
              : {}
          }
        >
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                variants={animate ? fadeUp : {}}
                className="flex flex-col gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-teal-600/20 hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-md border border-teal-600/20 bg-teal-600/5 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-teal-400" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-white leading-snug">
                    {domain.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {domain.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
