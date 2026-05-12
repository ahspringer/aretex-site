"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

type Stat = {
  prefix?: string;
  from?: number;
  to: number;
  suffix?: string;
  label: string;
  detail: string;
};

const stats: Stat[] = [
  {
    prefix: "$",
    to: 500,
    suffix: "+",
    label: "Average cost per range session",
    detail:
      "Travel, range fees, ammo, and a full day gone. Dedicated shooters absorb this cost repeatedly just to maintain proficiency.",
  },
  {
    prefix: "<",
    from: 12,
    to: 3,
    suffix: "%",
    label: "Of long-range shooters live within 30 min of a 1000m+ facility",
    detail:
      "Long-range rifle practice requires space most of the country simply does not have nearby. Distance is not an excuse — it is the reality.",
  },
  {
    to: 72,
    suffix: " hrs",
    label: "Time before motor memory begins to degrade",
    detail:
      "Precision marksmanship is a perishable skill. Without consistent repetition, the muscle memory built at the range erodes faster than most shooters realize.",
  },
];

export default function Problem() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <SectionWrapper id="problem">
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-16"
      >
        <motion.div variants={animate ? fadeUp : {}} className="max-w-3xl">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Long-range skill decays without repetition.
            <br />
            <span className="text-gray-500 dark:text-gray-400">
              Ranges are inaccessible.
            </span>
          </h2>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            PRS competitors, F-Class shooters, and serious long-range marksmen
            all face the same friction: consistent practice is expensive,
            time-consuming, and geographically limited. The gap between
            competition days is where proficiency is lost.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={animate ? fadeUp : {}}
              className="flex flex-col gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark-2 hover:border-copper/40 transition-colors duration-300"
            >
              <span className="text-4xl font-extrabold font-mono text-copper tabular-nums">
                {stat.prefix}
                <CountTo
                  from={stat.from ?? 0}
                  to={stat.to}
                  enabled={animate}
                />
                {stat.suffix}
              </span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

function CountTo({
  from,
  to,
  duration = 1.4,
  enabled,
}: {
  from: number;
  to: number;
  duration?: number;
  enabled: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(enabled ? from : to);

  useEffect(() => {
    if (!enabled || !inView) return;
    let frameId: number;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [enabled, inView, from, to, duration]);

  return <span ref={ref}>{value}</span>;
}
