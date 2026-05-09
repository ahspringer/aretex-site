"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

const investorSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  affiliation: z.string().optional(),
  investorType: z.string().optional(),
  message: z.string().min(20, "Share a bit more about your interest"),
});

type InvestorFormData = z.infer<typeof investorSchema>;

const milestones = [
  {
    id: "T-0",
    label: "Proof of Concept",
    date: "April 2026",
    status: "complete",
    type: "technical",
  },
  {
    id: "B-0",
    label: "Foundations & Patent",
    date: "May 2026",
    status: "complete",
    type: "business",
  },
  {
    id: "T-1",
    label: "Subsystem Integration & Test",
    date: "May 2026",
    status: "complete",
    type: "technical",
  },
  {
    id: "T-2",
    label: "Initial Prototype",
    date: "In Progress | June 2026",
    status: "active",
    type: "technical",
  },
    {
    id: "B-1",
    label: "Business Validation",
    date: "In Progress | August 2026",
    status: "active",
    type: "business",
  },
  {
    id: "T-3",
    label: "Hybrid Prototype",
    date: "September 2026",
    status: "upcoming",
    type: "technical",
  },
  {
    id: "T-4",
    label: "Pilot Unit",
    date: "December 2026",
    status: "upcoming",
    type: "technical",
  },
  {
    id: "B-2",
    label: "Customer Acceptance & Launch",
    date: "Official Launch | January 2027",
    status: "upcoming",
    type: "business",
  },
  {
    id: "T-5 / B-3",
    label: "Pre-Production & Scale",
    date: "April 2027",
    status: "upcoming",
    type: "business",
  },
];

export default function Investors() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InvestorFormData>({
    resolver: zodResolver(investorSchema),
    defaultValues: {
      investorType: "",
    },
  });

  async function onSubmit(data: InvestorFormData) {
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "investor", ...data }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  return (
    <SectionWrapper id="investors" dark>
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-16"
      >
        {/* Header */}
        <motion.div variants={animate ? fadeUp : {}} className="max-w-3xl">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            Investors
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Built for a{" "}
            <span className="text-teal-400">$9.4B market.</span>
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed max-w-2xl">
            The gun accessories market represents <b>9.9+ million</b> active firearm
            enthusiasts in the United States alone. Our primary targets are PRS,
            F-Class, and serious long-range marksmanship competitors — a
            technically sophisticated, underserved, high-intent segment.
          </p>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          variants={animate ? fadeUp : {}}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[
            { value: "$9.4B", label: "Gun accessories market (TAM)" },
            { value: "9.9M", label: "Active firearm enthusiasts (US)" },
            { value: "Pre-Seed", label: "Current stage · Raising now" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-white/5 rounded-xl p-6 bg-white/[0.02]"
            >
              <p className="text-3xl font-extrabold font-mono text-copper">
                {item.value}
              </p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Milestone timeline */}
        <motion.div variants={animate ? fadeUp : {}} className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white">
            Development Roadmap
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  m.status === "complete"
                    ? "border-teal-600/30 bg-teal-600/5"
                    : m.status === "active"
                    ? "border-copper/30 bg-copper/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <span
                  className={`shrink-0 mt-0.5 w-2 h-2 rounded-full ${
                    m.status === "complete"
                      ? "bg-teal-400"
                      : m.status === "active"
                      ? "bg-copper animate-pulse"
                      : "bg-gray-700"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono text-gray-500">
                    {m.id}
                  </span>
                  <span className="text-sm font-semibold text-white leading-snug">
                    {m.label}
                  </span>
                  <span className="text-xs text-gray-600">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 xl:gap-12 items-start">
          <motion.div
            variants={animate ? fadeUp : {}}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
          >
            <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
              Investor Contact
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
              Start a direct conversation with the founding team.
            </h3>
            <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-xl">
              We are currently raising our pre-seed round and speaking with investors
              who understand category creation, product-led hardware, and performance
              markets. Share your fund profile and diligence focus and we will route
              the conversation appropriately.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Round",
                  value: "Pre-Seed",
                  detail: "Founder-led raise underway",
                },
                {
                  label: "Focus",
                  value: "Precision Shooting",
                  detail: "Mission-critical enthusiast market",
                },
                {
                  label: "Response",
                  value: "Within 24 Hours",
                  detail: "Direct founder follow-up",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-gray-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

          </motion.div>

          <motion.div variants={animate ? fadeUp : {}}>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-8 md:p-10 shadow-[0_18px_80px_rgba(0,0,0,0.28)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600/10 border border-teal-600/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-teal-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-white">
                    Investor inquiry received.
                  </p>
                  <p className="text-sm text-gray-400 max-w-sm">
                    We will follow up directly with the appropriate materials within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-teal-400 hover:underline mt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                      Private Investor Intake
                    </p>
                    <h3 className="text-2xl font-bold text-white">Request the investor brief</h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                      Share enough context for us to prepare a relevant conversation.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Name"
                      placeholder="Your name"
                      autoComplete="name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="you@fund.com"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Firm Or Affiliation"
                      placeholder="Fund, syndicate, angel, or operator"
                      error={errors.affiliation?.message}
                      {...register("affiliation")}
                    />
                    <FormInput
                      label="Investor Type"
                      placeholder="Lead, strategic, angel, scout..."
                      error={errors.investorType?.message}
                      {...register("investorType")}
                    />
                  </div>

                  <FormTextarea
                    label="Investment Context"
                    placeholder="Tell us what you want to evaluate first: market thesis, prototype progress, go-to-market, patent position, or round structure."
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  {submitError && <p className="text-xs text-red-400">{submitError}</p>}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      Connect With The Founders
                    </Button>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Investor inquiries are reviewed directly by the team within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Get Involved
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-teal-500/60 to-transparent"
          animate={animate ? { scaleY: [1, 0.4, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </SectionWrapper>
  );
}
