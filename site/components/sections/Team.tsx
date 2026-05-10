"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

type Founder = {
  name: string;
  initials: string;
  role: string;
  education: string;
  bio: string;
  tag: string;
  image?: string;
};

const founders: Founder[] = [
  {
    name: "Alex Springer",
    initials: "AS",
    role: "Chief Executive Officer",
    education: "B.S. Aerospace Engineering (UAH '19)\tM.S. Mechanical Engineering (UA '24)",
    bio: "Experienced Technical Program Manager and Former U.S. Army Aviation Test Director. Has led multi-million-dollar weapon system programs and engineering projects.",
    tag: "Systems Leadership",
    image: "/images/alex-springer.jpg",
  },
  {
    name: "Mike Mangrum",
    initials: "MM",
    role: "Chief of Research & Development",
    education: "B.S. Aerospace Engineering (UAH '19)",
    bio: "Senior R&D engineer with successful OTA prototype contract awards. Active precision rifle competitor and hunter focused on practical field performance.",
    tag: "Applied R&D",
    image: "/images/mike-mangrum.jpg",
  },
  {
    name: "Wiley Irish",
    initials: "WI",
    role: "Chief of Engineering & Technology",
    education: "B.S. Aerospace Engineering (UAH '24)",
    bio: "Army civilian engineer who led red team cybersecurity test programs and threat replication engineering. Sensor integration and systems architecture specialist.",
    tag: "Systems Architecture",
  },
];

export default function Team() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <SectionWrapper id="team">
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-14"
      >
        <motion.div variants={animate ? fadeUp : {}} className="max-w-3xl">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            The Team
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Three founders. One technical standard.
          </h2>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            Aretex Labs combines advanced systems engineering, applied ballistics,
            and field-first shooter context. Our founding team is built to ship
            precision hardware and software under real constraints.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {founders.map((founder) => (
            <motion.article
              key={founder.name}
              variants={animate ? fadeUp : {}}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark-2 p-6 flex flex-col gap-4"
            >
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-lg ${
                  founder.image
                    ? "border border-teal-600/20"
                    : "border border-dashed border-teal-600/25 bg-gradient-to-br from-teal-600/8 via-transparent to-copper/8 flex items-center justify-center"
                }`}
              >
                {founder.image ? (
                  <Image
                    src={founder.image}
                    alt={`${founder.name} headshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-40" aria-hidden="true">
                      <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.16),transparent_55%)]" />
                    </div>
                    <div className="relative flex flex-col items-center gap-2 text-center">
                      <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {founder.initials}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                        Headshot Placeholder
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {founder.name}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-copper border border-copper/30 bg-copper/5 rounded-full px-2 py-1">
                  {founder.tag}
                </span>
              </div>

              <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 leading-snug">
                {founder.role}
              </p>

              <p className="text-xs font-mono text-gray-500 leading-relaxed">
                {founder.education}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {founder.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
