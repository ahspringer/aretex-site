"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    title: "What",
    text: "ZeroShot is an at-home precision training platform for long-range shooters.",
  },
  {
    title: "How",
    text: "We combine precision hardware, accurate simulation, and professional-grade feedback in one system.",
  },
  {
    title: "Why",
    text: "Range access is limited. Elite snipers need a better way to train between range days.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Mount",
    detail: "Attach to your existing setup.",
  },
  {
    number: "02",
    title: "Calibrate",
    detail: "Align to your rifle and optic profile.",
  },
  {
    number: "03",
    title: "Train",
    detail: "Run high-frequency reps with structured feedback.",
  },
  {
    number: "04",
    title: "Improve",
    detail: "Review trends and close skill gaps between range days.",
  },
];

const capabilities = [
  "Modeling & simulation",
  "Optics + HMI",
  "Rapid prototyping",
  "Sensor fusion",
];

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <section className="relative overflow-hidden" aria-label="Welcome">
      <div className="site-container py-20 lg:py-24">
        <div className="flex flex-col gap-16">
          <motion.div
            className="flex flex-col gap-8 max-w-5xl"
            initial={animate ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono text-teal-500 uppercase tracking-[0.3em]">Introducing ZeroShot VR</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.92] tracking-tight">
              Help us shape the future of precision shooting.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              We need your help defining the future of ZeroShot. Send an email to <Link href="mailto:contact@aretexlabs.com" className="text-teal-400">contact@aretexlabs.com</Link> to provide 
              feedback and be entered to win a free kit when we launch. Don't feel like contacting us but 
              want to remain in the loop? Join our early access list and be the first to know when we launch.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/zeroshot"
                className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
              >
                Learn More
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial={animate ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            {pillars.map((item, idx) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
                initial={animate ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <p className="text-xs font-mono uppercase tracking-widest text-teal-500">{item.title}</p>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.section
            id="cta"
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
            initial={animate ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-teal-500">Get Involved</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Interested in collaborating?
            </h2>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              At Aretex Labs, we're always looking to connect with passionate individuals and teams who need help building something new. Whether you're a shooter with an idea for a product, a company in need of rapid prototyping, or just someone who wants to be part of the journey, we'd love to hear from you. Our engineers are experts in modeling & simulation, optics, HMI, rapid prototyping, and sensor fusion. If you have a project in mind or just want to chat about all things shooting and technology, don't hesitate to reach out. Contact us directly to discuss how we can work together.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-teal-600 px-6 py-3 text-sm font-semibold text-teal-400 transition hover:bg-teal-600/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
}
