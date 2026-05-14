"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FormInput } from "@/components/ui/FormInput";
import { submitContact } from "@/lib/contact";
import { fadeUp, staggerContainer, viewportOptions } from "@/lib/motion";

// Dynamically import the 3D canvas to avoid SSR issues
const PointCloud = dynamic(() => import("@/components/ui/PointCloud"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-teal-900/10 via-transparent to-gray-900/20 rounded-2xl" />
  ),
});

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ZeroShotContent() {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const emailRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setSubmitError("");
    try {
      await submitContact({ type: "presale", email: data.email });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Form unavailable right now. Please try again shortly.");
    }
  }

  return (
    <>
      {/* Hero — point cloud + headline */}
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
                ZeroShot
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

      {/* Coming soon + email capture */}
      <section
        className="relative site-section"
        aria-label="Stay updated"
      >
        <div className="site-container">
          <motion.div
            className="flex flex-col gap-12 max-w-2xl"
            initial={animate ? "hidden" : "visible"}
            whileInView="visible"
            viewport={viewportOptions}
            variants={animate ? staggerContainer : {}}
          >
            <motion.div className="flex flex-col gap-5" variants={animate ? fadeUp : {}}>
              <p className="text-xs font-mono text-teal-500 uppercase tracking-widest">
                Coming Soon
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                Don&apos;t miss the launch.
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                We&apos;re building ZeroShot to bring precision long-range
                training to any environment. Pre-sales are coming — leave your
                email and you&apos;ll be the first to know when we&apos;re
                ready.
              </p>
            </motion.div>

            <motion.div
              ref={emailRef}
              variants={animate ? fadeUp : {}}
              className="border border-teal-600/20 rounded-xl p-6 md:p-8 bg-teal-600/[0.04]"
            >
              {submitted ? (
                <p className="text-sm font-mono text-teal-400">
                  You&apos;re on the list. We&apos;ll be in touch.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row sm:items-end gap-3"
                  noValidate
                >
                  <div className="flex-1">
                    <FormInput
                      label=""
                      id="zeroshot-email"
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      aria-label="Email address"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={isSubmitting}
                    className="w-full sm:w-auto shrink-0 self-center sm:self-auto !h-[46px] !py-0"
                  >
                    Notify Me
                  </Button>
                </form>
              )}
              {submitError && (
                <p className="mt-2 text-xs text-red-400">{submitError}</p>
              )}
            </motion.div>
          </motion.div>
          <p className="mt-4 text-[11px] font-mono text-gray-500 uppercase tracking-[0.25em]">
            sales@aretexlabs.com
          </p>
        </div>
      </section>
    </>
  );
}
