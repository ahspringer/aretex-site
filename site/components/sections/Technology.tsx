"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Eye, RefreshCw, Activity } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

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
  // {
  //   number: "04",
  //   icon: Activity,
  //   label: "Training Analytics",
  //   body: "Your session data syncs to the companion app, where you receive customized training insights. Analyze pre-shot stability trends, track accuracy relative to environmental compensation, and review detailed performance metrics to accelerate skill development.",
  // },
];

export default function Technology() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <SectionWrapper id="technology">
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-16"
      >
        {/* Header */}
        <motion.div variants={animate ? fadeUp : {}} className="max-w-2xl">
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
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={animate ? fadeUp : {}}
                className="relative flex flex-col gap-5"
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-extrabold font-mono text-teal-900/40 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-teal-600/30 bg-teal-600/5 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-teal-400" aria-hidden="true" />
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
        </div>

        {/* Bottom callout */}
        <motion.div
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
      </motion.div>
    </SectionWrapper>
  );
}
