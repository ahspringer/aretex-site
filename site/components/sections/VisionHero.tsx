"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOptions } from "@/lib/motion";

export default function VisionHero() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      className="relative min-h-[80vh] bg-near-black flex flex-col justify-center overflow-hidden"
      aria-label="Vision"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[50rem] h-[40rem] rounded-full bg-teal-600/[0.06] blur-3xl -translate-x-1/3 -translate-y-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-32 w-full">
        <motion.div
          className="flex flex-col gap-10 max-w-3xl"
          initial={animate ? "hidden" : "visible"}
          animate="visible"
          variants={animate ? staggerContainer : {}}
        >
          <motion.p
            className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em]"
            variants={animate ? fadeUp : {}}
          >
            Vision
          </motion.p>

          {/* Name origin */}
          <motion.div className="flex flex-col gap-5" variants={animate ? fadeUp : {}}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight">
              Built for{" "}
              <span className="text-teal-400">what&apos;s possible</span>.
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 text-base md:text-lg text-gray-400 leading-relaxed"
            variants={animate ? fadeUp : {}}
          >
            <p>
              <span className="text-white font-semibold">Aretex</span> is drawn
              from two ideas.{" "}
              <span className="text-gray-300 italic">Arete</span> — the ancient
              Greek ideal of achieving one&apos;s fullest potential. And{" "}
              <span className="text-teal-400 font-mono">x</span> — the unsolved
              for, the future state not yet reached. Together, they define our
              mandate.
            </p>
            <p>
              Aretex Labs exists to build systems that{" "}
              <span className="text-white font-semibold">
                elevate the human, not replace them
              </span>
              . We recognize that every person carries elite potential. Our job
              is to leverage technology to help them achieve it — and surpass
              it.
            </p>
            <p>
              That&apos;s not a tagline. It&apos;s the lens through which we
              evaluate every product decision, every hire, and every dollar we
              spend.
            </p>
          </motion.div>

          {/* Thin rule + supporting statement */}
          <motion.div
            className="flex flex-col gap-4 pt-2"
            variants={animate ? fadeUp : {}}
          >
            <div className="h-px bg-teal-600/20 max-w-xs" aria-hidden="true" />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
              We are a small team of engineers who believe that precision,
              humility, and commitment to the human on the other end of the work
              are the only real advantages that matter.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
