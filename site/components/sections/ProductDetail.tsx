"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

const features = [
  {
    label: "Universal Compatibility",
    headline: "Your rifle. Your scope. No modifications.",
    body: "ZeroShot VR clips onto the objective bell of any rifle scope without permanent modification to the firearm or optic. Switch between rifles in seconds. Train with your actual competition setup so the reps transfer perfectly when it counts.",
    specs: ["Compatible with any standard objective bell", "No tools required", "Any caliber · Any platform · Any scope"],
    image: "/images/render-mounted.png",
    imageAlt: "ZeroShot VR attachment mounted on a rifle scope objective bell",
    flip: false,
  },
  {
    label: "High-Fidelity Ballistics",
    headline: "Physics that match the real world.",
    body: "Our in-house ballistics engine runs full G7 drag model simulations accounting for wind, elevation, latitude, air density, humidity, and barrel twist. The correction you apply in ZeroShot matches the correction you apply at the range.",
    specs: ["G3/G7 drag model · Full environmental simulation", "Wind · Humidity · Air density · Latitude", "Custom DOPE cards · Scenario library"],
    image: "/images/render-cutout.png",
    imageAlt: "ZeroShot VR internal optics and sensor cutaway view",
    flip: true,
  },
  {
    label: "Optical Clarity",
    headline: "See what you'd see at a real range.",
    body: "A proprietary optical train delivers a bright, clear, high-contrast virtual reticle overlay through the rifle scope eyepiece. No external screen. No VR headset required for the shooter. The sight picture is natural — because it is your actual scope.",
    specs: ["120Hz refresh · High contrast virtual overlay", "Reticle simulation matches optic zero", "Target placement · Range distances up to 1000m+"],
    image: "/images/hero-render.png",
    imageAlt: "ZeroShot VR device showing the optical clarity of the virtual sight picture",
    flip: false,
  },
];

export default function ProductDetail() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <SectionWrapper id="product" dark>
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-6"
      >
        {/* Section header */}
        <motion.div variants={animate ? fadeUp : {}} className="mb-12">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            The Product
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight max-w-2xl">
            ZeroShot VR.{" "}
            <span className="text-gray-500">
              A 1000-meter range in your home.
            </span>
          </h2>
        </motion.div>

        {/* Feature rows */}
        <div className="flex flex-col gap-24">
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              initial={animate ? "hidden" : "visible"}
              whileInView="visible"
              viewport={viewportOptions}
              variants={animate ? staggerContainer : {}}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                feature.flip ? "lg:flex lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                variants={animate ? fadeUp : {}}
                whileHover={animate ? { scale: 1.02 } : {}}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5"
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </motion.div>

              {/* Copy */}
              <motion.div
                variants={animate ? fadeUp : {}}
                className="flex flex-col gap-5"
              >
                <span className="text-xs font-mono font-semibold text-copper uppercase tracking-widest">
                  {feature.label}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                  {feature.headline}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {feature.body}
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {feature.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2 text-xs font-mono text-gray-500"
                    >
                      <span className="text-teal-500 mt-0.5 shrink-0">›</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </SectionWrapper>
  );
}
