"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { FormInput, FormTextarea } from "@/components/ui/FormInput";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";
import { submitContact } from "@/lib/contact";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  affiliation: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
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
    <SectionWrapper id="contact">
      <motion.div
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={viewportOptions}
        variants={animate ? staggerContainer : {}}
        className="flex flex-col gap-16"
      >
        {/* Header */}
        <motion.div variants={animate ? fadeUp : {}} className="max-w-2xl">
          <p className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Get in touch.
          </h2>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a question or want to connect? Reach out to us and we'll get back
            to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact info */}
          <motion.div
            variants={animate ? fadeUp : {}}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md border border-teal-600/30 bg-teal-600/5 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-teal-400" aria-hidden="true" />
                </div>
                <div>
                  {/* <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                    Email
                  </p> */}
                  <a
                    href="mailto:contact@aretexlabs.com"
                    className="text-sm text-gray-900 dark:text-white hover:text-teal-400 transition-colors"
                  >
                    coming soon
                  </a>
                  {/* <p className="text-xs text-gray-500 mt-0.5">
                    [Placeholder — email in setup]
                  </p> */}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md border border-teal-600/30 bg-teal-600/5 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-teal-400" aria-hidden="true" />
                </div>
                <div>
                  {/* <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                    Phone
                  </p> */}
                  <a
                    href="tel:+10000000000"
                    className="text-sm text-gray-900 dark:text-white hover:text-teal-400 transition-colors"
                  >
                    coming soon
                  </a>
                  {/* <p className="text-xs text-gray-500 mt-0.5">
                    [Placeholder — number in setup]
                  </p> */}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              {/* <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
                Location
              </p> */}
              <p className="text-sm text-gray-900 dark:text-gray-300">
                Aretex Labs, LLC
              </p>
              <p className="text-sm text-gray-500">Alabama, United States</p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div variants={animate ? fadeUp : {}}>
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
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Message received.
                </p>
                <p className="text-sm text-gray-500">
                  We will be in touch.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-teal-500 hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
                noValidate
              >
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
                    placeholder="your@email.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
                <FormInput
                  label="Organization (optional)"
                  placeholder="Company or organization name"
                  {...register("affiliation")}
                />
                <FormTextarea
                  label="Message (optional)"
                  placeholder="Tell us how we can help"
                  {...register("message")}
                />
                {submitError && (
                  <p className="text-xs text-red-400">{submitError}</p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
                <p className="text-xs text-gray-500">
                  We typically respond within 48 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
