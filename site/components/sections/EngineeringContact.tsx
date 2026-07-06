"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";
import { submitContact } from "@/lib/contact";

const engineeringContactSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type EngineeringContactFormData = z.infer<typeof engineeringContactSchema>;

export default function EngineeringContact() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EngineeringContactFormData>({
    resolver: zodResolver(engineeringContactSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: EngineeringContactFormData) {
    setSubmitError("");
    try {
      await submitContact({ type: "engineering", email: data.email });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Form is unavailable right now. Please email hello@aretexlabs.com");
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full min-h-[40svh] bg-gradient-to-br from-gray-950 via-teal-500/45 to-orange-800/50"
      aria-labelledby="engineering-contact-heading"
    >
      <div className="site-container py-16 md:py-20 lg:py-24">
        <motion.div
          initial={animate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={viewportOptions}
          variants={animate ? staggerContainer : {}}
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start"
        >
          <motion.div variants={animate ? fadeUp : {}} className="max-w-2xl">
            <p className="text-xs font-mono text-copper-light uppercase tracking-[0.3em] mb-4">
              Build with us
            </p>
            {/* <h2
              id="engineering-contact-heading"
              className="text-5xl md:text-6xl font-extrabold text-white leading-[0.95] tracking-tight"
            >
              Bring us the problem.
            </h2> */}
            <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed">
              Send your email and we will reach out to discuss your project
              and what it takes to get your system designed, validated, and built.
            </p>
          </motion.div>

          <motion.div
            variants={animate ? fadeUp : {}}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            {submitted ? (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-mono text-teal-400 uppercase tracking-[0.2em]">
                  Received
                </p>
                <p className="text-2xl font-bold text-white">Thanks. We will be in touch.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300 hover:text-teal-200 text-left"
                >
                  Submit another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <FormInput
                  label="Work Email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                {submitError && <p className="text-xs text-red-400">{submitError}</p>}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isSubmitting}
                  className="w-full"
                >
                  Request Engineering Contact
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
