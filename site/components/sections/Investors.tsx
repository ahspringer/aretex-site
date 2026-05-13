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
import { submitContact } from "@/lib/contact";

const investorSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  affiliation: z.string().optional(),
  investorType: z.string().optional(),
  message: z.string().min(20, "Share a bit more about your interest"),
});

type InvestorFormData = z.infer<typeof investorSchema>;

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
    defaultValues: { investorType: "" },
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
        className="flex flex-col gap-8"
      >
        <motion.div variants={animate ? fadeUp : {}} className="max-w-2xl">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            Investors
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            We&apos;re not actively raising &mdash; yet.
          </h2>
          <p className="mt-6 text-base text-gray-400 leading-relaxed">
            Aretex Labs is currently focused on product development ahead of our
            next funding round. Wait-list members will be notified before the
            round opens publicly. Early-access investors secure preferred terms
            and priority allocation.
          </p>
        </motion.div>

        <div className="grid xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 xl:gap-12 items-start pt-4">
          <motion.div
            variants={animate ? fadeUp : {}}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 flex flex-col gap-4"
          >
            <p className="text-xs font-mono text-teal-500 uppercase tracking-widest">
              Investor Contact
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Interested in learning more or staying in the loop? Join the wait
              list and we&apos;ll reach out directly before the round opens &mdash;
              with full round materials ahead of public release.
            </p>
            <div className="pt-2">
              <p className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.25em]">
                contact@aretexlabs.com
              </p>
            </div>
          </motion.div>

          <motion.div variants={animate ? fadeUp : {}}>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-8 md:p-10 shadow-[0_18px_80px_rgba(0,0,0,0.28)]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600/10 border border-teal-600/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-white">You&apos;re on the list.</p>
                  <p className="text-sm text-gray-400 max-w-sm">We&apos;ll reach out before the next round opens.</p>
                  <button onClick={() => setSubmitted(false)} className="text-xs text-teal-400 hover:underline mt-2">Submit another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                  <div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Early-Access Wait List</p>
                    <h3 className="text-2xl font-bold text-white">Don&apos;t miss our next round</h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">Investors on the list get first look when our next round opens.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput label="Name" placeholder="Your name" autoComplete="name" error={errors.name?.message} {...register("name")} />
                    <FormInput label="Email" type="email" placeholder="you@fund.com" autoComplete="email" error={errors.email?.message} {...register("email")} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormInput label="Firm or Affiliation" placeholder="Fund, syndicate, angel, or operator" error={errors.affiliation?.message} {...register("affiliation")} />
                    <FormInput label="Investor Type" placeholder="Lead, strategic, angel, scout..." error={errors.investorType?.message} {...register("investorType")} />
                  </div>
                  <FormTextarea label="What You'd Want to Evaluate" placeholder="Optional &mdash; what would you want to look at when the round opens?" error={errors.message?.message} {...register("message")} />
                  {submitError && <p className="text-xs text-red-400">{submitError}</p>}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                    <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full sm:w-auto">Add Me to the List</Button>
                    <p className="text-xs text-gray-500 leading-relaxed">We&apos;ll reach out before our next round opens.</p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
