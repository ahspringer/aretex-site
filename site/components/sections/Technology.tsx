"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Eye, RefreshCw } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, viewportOptions } from "@/lib/motion";

const steps = [
  {
    number: "01",
    icon: Cpu,
    label: "Onboard Sensors",
    body: "Precision inertial sensors mounted in the ZeroShot VR unit track the rifle's position and orientation at a resolution sufficient for ultra long-range ballistic calculation. Every cant, drift, and hold is captured.",
  },
  {
    number: "02",
    icon: Eye,
    label: "Ballistics Engine",
    body: "Sensor data feeds our in-house ballistics engine in real time. Environmental parameters — wind call, air density, humidity, latitude, elevation — are factored against G7 drag tables to compute the exact flight path of your selected cartridge.",
  },
  {
    number: "03",
    icon: RefreshCw,
    label: "Virtual Coaching",
    body: "Real-time visual feedback integrates ballistic solutions directly into your sight picture. Instant correction markers guide your hold and trigger timing, turning every shot into a deliberate training rep with immediate cognitive reinforcement.",
  },
];

export default function Technology() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <SectionWrapper id="technology">
      <div className="flex flex-col gap-16">
        {/* Header */}
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? fadeUp : {}}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Three components.{" "}
            <span className="text-gray-500">
              One complete system.
            </span>
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed">
            ZeroShot VR delivers real-time ballistic feedback during live training.
            Session data syncs to the companion app, where you receive customized
            analytics—pre-shot stability trends, environmental compensation accuracy,
            and actionable performance insights to accelerate skill development.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={
            animate
              ? {
                  hidden: {},
                  visible: {
                    transition: {
                      delayChildren: 0.15,
                      staggerChildren: 0.45,
                    },
                  },
                }
              : {}
          }
          className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 relative"
        >
          {/* Animated connector line — draws in as the first stagger child */}
          <motion.div
            variants={
              animate
                ? {
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: {
                      scaleX: 1,
                      opacity: 1,
                      transition: { duration: 1.4, ease: "easeOut" },
                    },
                  }
                : {}
            }
            className="hidden md:block absolute top-5 left-[calc(16.67%+1.25rem)] right-[calc(16.67%+1.25rem)] h-px bg-gradient-to-r from-teal-500/0 via-teal-500/45 to-teal-500/0 origin-left pointer-events-none"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={
                  animate
                    ? {
                        hidden: { opacity: 0, y: 28 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }
                    : {}
                }
                className="relative flex flex-col gap-5"
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-extrabold font-mono text-teal-900/40 leading-none select-none tabular-nums">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-teal-500/40 bg-near-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(45,212,191,0.18)] z-10">
                    <Icon
                      size={18}
                      className="text-teal-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Copy */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {step.label}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? fadeUp : {}}
          className="border border-teal-600/20 bg-teal-600/5 rounded-xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">
              Proprietary IP — Patent Pending (App. No. 64/060,960)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              The optical train design and sensor fusion methodology are the
              subject of pending patent protection. Technical disclosures
              available to qualified investors under NDA.
            </p>
          </div>
          <span className="shrink-0 text-xs font-mono text-teal-400 bg-teal-600/10 border border-teal-600/20 px-3 py-1 rounded-full whitespace-nowrap">
            APP. NO. 64/060,960
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
