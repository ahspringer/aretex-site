"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FormInput } from "@/components/ui/FormInput";
import { heroHeadline, heroSubheadline, heroCta } from "@/lib/motion";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function handleScroll(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  async function onSubmit(data: FormData) {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "presale", email: data.email }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  const animate = !prefersReducedMotion;

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-near-black flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Crosshair watermark background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='70' stroke='%230D9488' stroke-width='0.75' fill='none'/%3E%3Ccircle cx='100' cy='100' r='35' stroke='%230D9488' stroke-width='0.75' fill='none'/%3E%3Ccircle cx='100' cy='100' r='3' fill='%230D9488'/%3E%3Cline x1='0' y1='100' x2='75' y2='100' stroke='%230D9488' stroke-width='0.75'/%3E%3Cline x1='125' y1='100' x2='200' y2='100' stroke='%230D9488' stroke-width='0.75'/%3E%3Cline x1='100' y1='0' x2='100' y2='75' stroke='%230D9488' stroke-width='0.75'/%3E%3Cline x1='100' y1='125' x2='100' y2='200' stroke='%230D9488' stroke-width='0.75'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Teal glow top left */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-24 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <motion.div
              initial={animate ? "hidden" : "visible"}
              animate="visible"
              variants={animate ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } } : {}}
            >
              <Badge variant="copper">Pre-Sales Coming Fall 2026</Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
              initial={animate ? "hidden" : "visible"}
              animate="visible"
              variants={animate ? heroHeadline : {}}
            >
              No Range.{" "}
              <span className="text-teal-400">No Ammo.</span>
              <br />
              No Compromise.
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
              initial={animate ? "hidden" : "visible"}
              animate="visible"
              variants={animate ? heroSubheadline : {}}
            >
              ZeroShot VR attaches to any rifle scope with no modifications and
              delivers sub-MOA-accurate ballistic simulation through your own
              optic. Any caliber. Any setup. Anywhere you train.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 pt-2"
              initial={animate ? "hidden" : "visible"}
              animate="visible"
              variants={animate ? heroCta : {}}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleScroll("#product")}
              >
                See the Product
              </Button>
              <Button
                variant="copper"
                size="lg"
                onClick={() => handleScroll("#investors")}
              >
                Invest in Aretex Labs
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 pt-2"
              initial={animate ? "hidden" : "visible"}
              animate="visible"
              variants={animate ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.6, duration: 0.5 } } } : {}}
            >
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                Alabama LLC · Stealth Mode · Patent Pending · App. No. 64/060,960
              </span>
            </motion.div>
          </div>

          {/* Right: Product render */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={animate ? { opacity: 0, scale: 0.95 } : {}}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={animate ? { scale: 1.02 } : {}}
          >
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden border border-white/5">
              <Image
                src="/images/hero-render.png"
                alt="ZeroShot VR scope attachment mounted on a rifle in a dark studio environment"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Teal glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating spec badge */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-teal-600/30 rounded-md px-3 py-2">
              <p className="text-xs font-mono text-teal-400 tracking-wider">
                SUB-MOA ACCURACY
              </p>
              <p className="text-xs font-mono text-gray-500">
                Any caliber · No modifications
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full mt-10 border border-teal-600/20 rounded-xl p-6 md:p-8 bg-teal-600/[0.04] flex flex-col gap-4"
          initial={animate ? "hidden" : "visible"}
          animate="visible"
          variants={animate ? { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } } } : {}}
        >
          <div>
            <h3 className="text-lg font-bold text-white">
              Don&apos;t miss the presale.
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              ZeroShot VR presales open to early subscribers first. Leave your
              email and we will reach out before the public launch.
            </p>
          </div>

          {submitted ? (
            <p className="text-sm font-mono text-teal-400">
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row gap-3"
              noValidate
            >
              <div className="flex-1">
                <FormInput
                  label=""
                  placeholder="your@email.com"
                  type="email"
                  aria-label="Email address for presale updates"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                className="shrink-0"
              >
                Notify Me
              </Button>
            </form>
          )}
          {submitError && (
            <p className="text-xs text-red-400">{submitError}</p>
          )}

          <p className="text-xs text-gray-600">
            Unsubscribe at any time.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-teal-500/60 to-transparent"
          animate={animate ? { scaleY: [1, 0.4, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
