"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Badge from "@/components/ui/Badge";
import { fadeUp, staggerContainer } from "@/lib/motion";

// Dynamically import the 3D canvas to avoid SSR issues
const PointCloud = dynamic(() => import("@/components/ui/PointCloud"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-teal-900/10 via-transparent to-gray-900/20 rounded-2xl" />
  ),
});

export default function ZeroShotContent() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section
      className="relative overflow-hidden"
      aria-label="ZeroShot"
    >
      <div className="relative site-container py-4 lg:py-1 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            className="flex flex-col gap-7"
            initial={animate ? "hidden" : "visible"}
            animate="visible"
            variants={animate ? staggerContainer : {}}
          >
            <motion.div variants={animate ? fadeUp : {}}>
              <Badge variant="copper">In Development</Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight"
              variants={animate ? fadeUp : {}}
            >
              ZeroShot VR
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-gray-400 leading-relaxed"
              variants={animate ? fadeUp : {}}
            >
              Developing elite long-range skill demands consistent,
              high-quality repetition. For most shooters, that repetition is
              out of reach — constrained by distance, cost, and time. Skill
              degrades between sessions. Access to the right training
              environment is rare.
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-gray-400 leading-relaxed"
              variants={animate ? fadeUp : {}}
            >
              ZeroShot exists to remove those barriers.
            </motion.p>
          </motion.div>

          {/* Right: animated point cloud */}
          <motion.div
            className="relative aspect-square w-full max-w-lg mx-auto lg:mx-0"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <PointCloud className="w-full h-full" />
            {/* Subtle ring */}
            <div
              className="absolute inset-4 rounded-full border border-teal-600/10 pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
