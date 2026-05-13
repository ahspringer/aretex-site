"use client";

import { Fragment, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";
import { submitContact } from "@/lib/contact";

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
      await submitContact({ type: "investor", ...data });

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Form is unavailable right now. Please try again shortly.");
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
            <span className="text-teal-400">$3.9B market.</span>
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed max-w-2xl">
            The gun accessories market represents <b>52.7+ million</b> active firearm
            target shooting enthusiasts in the United States alone. Our primary targets are PRS,
            F-Class, and serious long-range marksmanship competitors — a
            technically sophisticated, underserved, high-intent segment. A displacement
            strategy also allows us to target the staggering <b>$4.7B</b> spent on ammunition
            at the range each year, by offering a compelling alternative to live-fire training.
          </p>
        </motion.div>

        {/* Key metrics */}
        <motion.div
          variants={animate ? fadeUp : {}}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[
            { value: "$3.9B", label: "Gun accessories market (TAM)" },
            { value: "52.7M", label: "Active firearm target shooting enthusiasts (US)" },
            { value: "Pre-Seed", label: "Don't miss out · Wait list open" },
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
        <motion.div
          variants={animate ? fadeUp : {}}
          className="flex flex-col gap-8"
        >
          <div className="flex items-baseline justify-between flex-wrap gap-x-6 gap-y-3">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Development Roadmap
            </h3>
            <div className="flex items-center gap-5 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 text-teal-400">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Complete
              </span>
              <span className="flex items-center gap-2 text-copper-light">
                <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
                In Progress
              </span>
              <span className="flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full border border-gray-600" />
                Upcoming
              </span>
            </div>
          </div>

          <div className="relative">
            {(() => {
              type Group = { status: string; items: typeof milestones };
              const groups: Group[] = milestones.reduce<Group[]>((acc, m) => {
                const last = acc[acc.length - 1];
                if (last && last.status === m.status) {
                  last.items.push(m);
                } else {
                  acc.push({ status: m.status, items: [m] });
                }
                return acc;
              }, []);
              return groups.map((group, gi) => (
                <Fragment key={gi}>
                  {gi > 0 && (
                    <PhaseConnector
                      gi={gi}
                      fromStatus={groups[gi - 1].status}
                      toStatus={group.status}
                    />
                  )}
                  <div className={PHASE_INDENT_CLASS[gi] ?? ""}>
                    {/* Phase header */}
                    <div className="ml-7 mb-4 flex items-center gap-3">
                      <span className="text-[10px] font-mono text-gray-500 tracking-[0.28em] uppercase">
                        Phase 0{gi + 1}
                      </span>
                      <span className="h-px flex-1 bg-white/[0.06]" />
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.22em] ${phaseHeaderColor(
                          group.status
                        )}`}
                      >
                        {PHASE_HEADER_TEXT[group.status]}
                      </span>
                    </div>

                    {/* Milestones in this phase */}
                    <ol>
                      {group.items.map((m, i) => {
                        const isFirst = i === 0;
                        const isLast = i === group.items.length - 1;
                        return (
                          <li
                            key={m.id}
                            className="relative flex items-start gap-5 md:gap-7 pb-8 last:pb-0"
                          >
                            <div className="relative flex-shrink-0 w-4 mt-1">
                              {!isFirst && (
                                <span
                                  aria-hidden="true"
                                  className={`absolute left-1/2 -translate-x-1/2 -top-8 w-px h-8 ${railColor(
                                    m.status
                                  )}`}
                                />
                              )}
                              {!isLast && (
                                <span
                                  aria-hidden="true"
                                  className={`absolute left-1/2 -translate-x-1/2 top-4 w-px ${railColor(
                                    m.status
                                  )}`}
                                  style={{ height: "calc(100% - 1rem)" }}
                                />
                              )}
                              <MilestoneNode status={m.status} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                                <span
                                  className={`text-[11px] font-mono font-semibold tracking-[0.18em] ${idColor(
                                    m.type
                                  )}`}
                                >
                                  {m.id}
                                </span>
                                <StatusPill status={m.status} />
                              </div>
                              <h4 className="text-base md:text-[17px] font-semibold text-white leading-snug">
                                {m.label}
                              </h4>
                              <p className="mt-1 text-xs font-mono text-gray-500 tracking-wide">
                                {m.date}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </Fragment>
              ));
            })()}
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
              We&apos;re not actively raising — yet.
            </h3>
            <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-xl">
              Aretex Labs is currently focused on product development ahead of
              our next funding round. Wait-list members will be notified before the
              round opens publicly. Early-access investors secure preferred terms and
              priority allocation, with first look at all round materials before public
              release.
            </p>
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
                    You&apos;re on the list.
                  </p>
                  <p className="text-sm text-gray-400 max-w-sm">
                    We&apos;ll reach out before the next round opens.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-teal-400 hover:underline mt-2"
                  >
                    Submit another
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
                      Early-Access Wait List
                    </p>
                    <h3 className="text-2xl font-bold text-white">Don't miss our next round</h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                      Investors on the list get first look when our next round opens.
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
                    label="What You'd Want to Evaluate"
                    placeholder="Optional — what would you want to look at when the round opens? Market thesis, prototype progress, patent position, etc."
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
                      Add Me to the List
                    </Button>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      We&apos;ll reach out before our next round opens.
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

function MilestoneNode({ status }: { status: string }) {
  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className="block w-3.5 h-3.5 rounded-full bg-teal-400 ring-4 ring-teal-400/15 shadow-[0_0_10px_rgba(45,212,191,0.45)]"
      />
    );
  }
  if (status === "active") {
    return (
      <span aria-hidden="true" className="relative block w-3.5 h-3.5">
        <span className="absolute inset-0 rounded-full bg-copper" />
        <span className="absolute -inset-1 rounded-full border border-copper/50 animate-pulse" />
        <span className="absolute -inset-2 rounded-full bg-copper/20 blur-sm animate-pulse" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="block w-3.5 h-3.5 rounded-full border border-gray-600 bg-near-black"
    />
  );
}

function StatusPill({ status }: { status: string }) {
  if (status === "complete") {
    return (
      <span className="text-[9px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300">
        Complete
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border border-copper/40 bg-copper/10 text-copper-light">
        <span className="w-1 h-1 rounded-full bg-copper animate-pulse" />
        In Progress
      </span>
    );
  }
  return (
    <span className="text-[9px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.02] text-gray-500">
      Upcoming
    </span>
  );
}

function idColor(type: string): string {
  return type === "technical" ? "text-teal-400" : "text-copper-light";
}

const PHASE_INDENT_CLASS = ["", "md:pl-16", "md:pl-32"];

const PHASE_HEADER_TEXT: Record<string, string> = {
  complete: "Foundation Complete",
  active: "Currently Building",
  upcoming: "Path to Launch",
};

function phaseHeaderColor(status: string): string {
  switch (status) {
    case "complete":
      return "text-teal-400";
    case "active":
      return "text-copper-light";
    default:
      return "text-gray-500";
  }
}

function railColor(status: string): string {
  switch (status) {
    case "complete":
      return "bg-teal-500/55";
    case "active":
      return "bg-copper/55";
    default:
      return "bg-white/[0.08]";
  }
}

function gradientHorizontal(from: string, to: string): string {
  if (from === "complete" && to === "active")
    return "bg-gradient-to-r from-teal-500/55 to-copper/55";
  if (from === "active" && to === "upcoming")
    return "bg-gradient-to-r from-copper/55 to-white/[0.08]";
  return "bg-white/[0.08]";
}

function gradientVertical(from: string, to: string): string {
  if (from === "complete" && to === "active")
    return "bg-gradient-to-b from-teal-500/55 to-copper/55";
  if (from === "active" && to === "upcoming")
    return "bg-gradient-to-b from-copper/55 to-white/[0.08]";
  return "bg-white/[0.08]";
}

function PhaseConnector({
  gi,
  fromStatus,
  toStatus,
}: {
  gi: number;
  fromStatus: string;
  toStatus: string;
}) {
  const offsetPx = 64;
  const fromBg = railColor(fromStatus);
  const toBg = railColor(toStatus);
  const horizontalGradient = gradientHorizontal(fromStatus, toStatus);
  const verticalGradient = gradientVertical(fromStatus, toStatus);

  return (
    <div className="relative h-12 mb-4" aria-hidden="true">
      {/* Mobile: simple vertical line bridges the gap */}
      <span
        className={`md:hidden absolute top-0 bottom-0 w-px ${verticalGradient}`}
        style={{ left: 7.5 }}
      />
      {/* Desktop: L-elbow connector */}
      <span
        className={`hidden md:block absolute w-px ${fromBg}`}
        style={{ left: (gi - 1) * offsetPx + 7.5, top: 0, height: 24 }}
      />
      <span
        className={`hidden md:block absolute h-px ${horizontalGradient}`}
        style={{ left: (gi - 1) * offsetPx + 7.5, top: 24, width: offsetPx }}
      />
      <span
        className={`hidden md:block absolute w-px ${toBg}`}
        style={{ left: gi * offsetPx + 7.5, top: 24, height: 24 }}
      />
    </div>
  );
}
