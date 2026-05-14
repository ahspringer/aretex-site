"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOptions } from "@/lib/motion";

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

export default function VisionHero() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      className="relative bg-near-black overflow-hidden"
      aria-label="Vision"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-[50rem] h-[40rem] rounded-full bg-teal-600/[0.06] blur-3xl -translate-x-1/3 -translate-y-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-32 lg:py-36 w-full">
        <motion.div
          className="flex flex-col gap-16"
          initial={animate ? "hidden" : "visible"}
          animate="visible"
          variants={animate ? staggerContainer : {}}
        >
          <div className="flex flex-col gap-10 max-w-3xl">
            <motion.p
              className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em]"
              variants={animate ? fadeUp : {}}
            >
              Vision
            </motion.p>

            <motion.div className="flex flex-col gap-5" variants={animate ? fadeUp : {}}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight">
                Built for {" "}
              <span className="text-teal-400">what&apos;s possible.</span>
              </h1>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6 text-base md:text-lg text-gray-400 leading-relaxed"
              variants={animate ? fadeUp : {}}
            >
              <p>
                There&apos;s a lot in a name.
                <span className="text-white font-semibold"> Aretex </span>
                is drawn directly from our company&apos;s vision:{" "}
                <span className="text-gray-300 italic"> Arete </span> — the ancient
                ideal of achieving one&apos;s fullest potential. And{" "}
                <span className="text-gray-300 italic">x</span> — the unsolved
                for, the future state not yet reached.
              </p>
              <p>Together, they define our mission.</p>
              <p>
                Aretex Labs exists to build systems that{" "}
                <span className="text-white font-semibold">
                  elevate the human, not replace them.
                </span>{" "}
                We recognize that every person carries elite potential. Our job
                is to build the technology to help them achieve it.
              </p>
              <p>
                That&apos;s not a tagline. It&apos;s the lens through which we
                evaluate every product decision, every hire, and every dollar we
                spend.
              </p>
            </motion.div>

            <motion.p
              className="text-sm text-gray-500 leading-relaxed max-w-xl"
              variants={animate ? fadeUp : {}}
            >
              We are a small team of engineers who believe that precision,
              humility, and commitment to the human on the other end of the work
              are the only real advantages that matter.
            </motion.p>
          </div>

          <div className="flex flex-col gap-14 pt-4">
            <motion.div
              variants={animate ? fadeUp : {}}
              viewport={viewportOptions}
              whileInView="visible"
              initial={animate ? "hidden" : "visible"}
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
        </motion.div>
      </div>
    </section>
  );
}
