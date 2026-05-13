"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";
import { withBasePath } from "@/lib/assets";

type Feature = {
  label: string;
  headline: string;
  body: string;
  specs: string[];
} & (
  | { layout: "image"; image: string; imageAlt: string; flip: boolean }
  | { layout: "centered" }
);

const features: Feature[] = [
  {
    layout: "image",
    label: "Universal Compatibility",
    headline: "Your rifle. Your scope. No modifications.",
    body: "ZeroShot VR clips onto the objective bell of any rifle scope without permanent modification to the firearm or optic. Switch between rifles in seconds. Train with your actual competition setup so the reps transfer perfectly when it counts.",
    specs: ["Any objective bell", "No tools required", "Any caliber · platform · optic"],
    image: withBasePath("/images/render-mounted.png"),
    imageAlt: "ZeroShot VR attachment mounted on a rifle scope objective bell",
    flip: false,
  },
  {
    layout: "image",
    label: "High-Fidelity Ballistics",
    headline: "Physics that match the real world.",
    body: "Our in-house ballistics engine runs full G7 drag model simulations accounting for wind, elevation, latitude, air density, humidity, and barrel twist. The correction you apply in ZeroShot matches the correction you apply at the range.",
    specs: ["G7 drag model", "Full environmental sim", "Custom DOPE · Scenario library"],
    image: withBasePath("/images/render-cutout.png"),
    imageAlt: "ZeroShot VR internal optics and sensor cutaway view",
    flip: true,
  },
  {
    layout: "centered",
    label: "Optical Clarity",
    headline: "See what you'd see at a real range.",
    body: "A proprietary optical train delivers a bright, clear, high-contrast virtual reticle overlay through the rifle scope eyepiece. No external screen. No VR headset required for the shooter. The sight picture is natural — because it is your actual scope.",
    specs: ["120Hz refresh", "Reticle simulation matches optic zero", "Up to 1000m+ · Headset-free"],
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

        <div className="flex flex-col gap-28">
          {features.map((feature) =>
            feature.layout === "image" ? (
              <ImageFeatureRow key={feature.label} feature={feature} animate={animate} />
            ) : (
              <CenteredFeatureRow key={feature.label} feature={feature} animate={animate} />
            )
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

function ImageFeatureRow({
  feature,
  animate,
}: {
  feature: Extract<Feature, { layout: "image" }>;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={viewportOptions}
      variants={animate ? staggerContainer : {}}
      className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      <motion.div
        variants={animate ? fadeUp : {}}
        className={feature.flip ? "lg:order-2" : ""}
      >
        <motion.div
          whileHover={animate ? { y: -4 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative aspect-[4/3] rounded-lg overflow-hidden"
          style={{
            boxShadow:
              "0 30px 60px -25px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={animate ? fadeUp : {}}
        className={`flex flex-col gap-5 ${feature.flip ? "lg:order-1" : ""}`}
      >
        <FeatureLabel text={feature.label} />
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight">
          {feature.headline}
        </h3>
        <p className="text-gray-400 leading-relaxed text-base">
          {feature.body}
        </p>
        <SpecRow specs={feature.specs} />
      </motion.div>
    </motion.div>
  );
}

function CenteredFeatureRow({
  feature,
  animate,
}: {
  feature: Extract<Feature, { layout: "centered" }>;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={viewportOptions}
      variants={animate ? staggerContainer : {}}
      className="relative flex flex-col items-center text-center max-w-3xl mx-auto pt-8"
    >
      {/* Subtle top ornament — a hairline mark + small teal node */}
      <motion.div
        variants={animate ? fadeUp : {}}
        className="flex flex-col items-center gap-3 mb-2"
      >
        <span className="block w-px h-12 bg-gradient-to-b from-transparent via-teal-500/40 to-teal-400" />
        <span className="block w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
      </motion.div>

      <motion.div variants={animate ? fadeUp : {}} className="mt-4">
        <FeatureLabel text={feature.label} centered />
      </motion.div>

      <motion.h3
        variants={animate ? fadeUp : {}}
        className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
      >
        {feature.headline}
      </motion.h3>

      <motion.p
        variants={animate ? fadeUp : {}}
        className="mt-6 text-gray-400 leading-relaxed text-base md:text-lg max-w-2xl"
      >
        {feature.body}
      </motion.p>

      <motion.div variants={animate ? fadeUp : {}} className="mt-8">
        <SpecRow specs={feature.specs} centered />
      </motion.div>
    </motion.div>
  );
}

function FeatureLabel({
  text,
  centered = false,
}: {
  text: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
    >
      <span className="h-px w-10 bg-teal-400/70" aria-hidden="true" />
      <span className="text-[11px] font-mono font-semibold text-copper uppercase tracking-[0.25em]">
        {text}
      </span>
      <span className="h-px w-10 bg-teal-400/70 hidden md:block" aria-hidden="true" style={{ display: centered ? undefined : "none" }} />
    </div>
  );
}

function SpecRow({
  specs,
  centered = false,
}: {
  specs: string[];
  centered?: boolean;
}) {
  return (
    <ul
      className={`flex flex-wrap gap-x-6 gap-y-2 ${
        centered ? "justify-center" : ""
      }`}
    >
      {specs.map((spec, i) => (
        <li
          key={spec}
          className="flex items-center gap-2 text-[11px] font-mono text-gray-400 tracking-wide"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-teal-400" aria-hidden="true" />
            {spec}
          </span>
        </li>
      ))}
    </ul>
  );
}
