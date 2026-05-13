"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

const codeItems = [
  {
    number: "01",
    title: "Excellence takes precedence over pride.",
    enforcement:
      "Feedback is open, candid, and non-negotiable — we attack the work, never the person.",
  },
  {
    number: "02",
    title: "There is always a hidden option C.",
    enforcement:
      "We make it a celebrated, documented moment when someone surfaces the non-obvious path.",
  },
  {
    number: "03",
    title: "We make asymmetric bets.",
    enforcement:
      "Every project gets a name, a patch, and full team ownership from day one. When we're in, we're all in.",
  },
  {
    number: "04",
    title: "We serve the human behind the technology.",
    enforcement:
      "We train alongside our end-users and get in the dirt with them. If we've lost touch with the person, we've lost the plot.",
  },
  {
    number: "05",
    title: "Every dollar serves the mission.",
    enforcement:
      "Leadership is a responsibility, not a perk — and we enforce that from the moment we show up.",
  },
];

export default function AretexCode() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      className="relative bg-near-black px-6 md:px-12 lg:px-24 py-24 lg:py-32"
      aria-labelledby="aretex-code-heading"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? fadeUp : {}}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            How We Operate
          </p>
          <h2
            id="aretex-code-heading"
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            The Aretex Code
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed">
            These aren&apos;t statements on a wall. Each one is backed by a
            hard rule that is codified into how we operate, every day.
          </p>
        </motion.div>

        <motion.ol
          className="flex flex-col divide-y divide-white/[0.05]"
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
          {codeItems.map((item) => (
            <motion.li
              key={item.number}
              variants={animate ? fadeUp : {}}
              className="grid sm:grid-cols-[4rem_1fr] gap-x-6 gap-y-1 py-7"
            >
              <span className="text-2xl font-extrabold font-mono text-teal-600/40 leading-none pt-0.5">
                {item.number}
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-base md:text-lg font-bold text-white leading-snug">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.enforcement}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
