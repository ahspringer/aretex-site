"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FormInput } from "@/components/ui/FormInput";
import { submitContact } from "@/lib/contact";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

const TICKER_ITEMS = [
  "SUB-MOA ACCURACY",
  "G7 BALLISTICS",
  "1000M+ RANGE",
  "ANY CALIBER",
  "ANY OPTIC",
  "120HZ REFRESH",
  "NO MODIFICATIONS",
  "FULL ENVIRONMENTAL SIM",
];

export default function Hero() {
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

  function scrollToId(href: string) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function focusEmail() {
    emailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      emailRef.current?.querySelector("input")?.focus();
    }, 400);
  }

  async function onSubmit(data: FormData) {
    setSubmitError("");
    try {
      await submitContact({ type: "presale", email: data.email });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Form is unavailable right now. Please try again shortly.");
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-near-black flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* Crosshair watermark background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Ccircle cx='110' cy='110' r='80' stroke='%230D9488' stroke-width='0.6' fill='none'/%3E%3Ccircle cx='110' cy='110' r='40' stroke='%230D9488' stroke-width='0.6' fill='none'/%3E%3Ccircle cx='110' cy='110' r='3' fill='%230D9488'/%3E%3Cline x1='0' y1='110' x2='80' y2='110' stroke='%230D9488' stroke-width='0.6'/%3E%3Cline x1='140' y1='110' x2='220' y2='110' stroke='%230D9488' stroke-width='0.6'/%3E%3Cline x1='110' y1='0' x2='110' y2='80' stroke='%230D9488' stroke-width='0.6'/%3E%3Cline x1='110' y1='140' x2='110' y2='220' stroke='%230D9488' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute -top-48 -left-48 w-[40rem] h-[40rem] rounded-full bg-teal-600/[0.08] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-48 -right-48 w-[36rem] h-[36rem] rounded-full bg-copper/[0.05] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full pt-28 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left: Copy */}
          <div className="lg:col-span-5 flex flex-col gap-7">
            <motion.div
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="copper">Pre-Sales · Coming Soon</Badge>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight">
              <motion.span
                className="block"
                initial={animate ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                No Range.
              </motion.span>
              <motion.span
                className="block text-teal-400"
                initial={animate ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                No Ammo.
              </motion.span>
              <motion.span
                className="block"
                initial={animate ? { opacity: 0, y: 30 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
              >
                No Compromise.
              </motion.span>
            </h1>

            <motion.p
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
              initial={animate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              ZeroShot VR attaches to any rifle scope with no modifications and
              delivers sub-MOA-accurate ballistic simulation through your own
              optic. Any caliber. Any setup. Anywhere you train.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1"
              initial={animate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <Button variant="primary" size="lg" onClick={focusEmail}>
                Get Early Access
              </Button>
              <button
                type="button"
                onClick={() => scrollToId("#investors")}
                className="text-sm font-mono text-copper hover:text-copper-light tracking-wide transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded"
              >
                Investor inquiry →
              </button>
            </motion.div>

            <motion.p
              className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.25em] pt-2"
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              Alabama LLC · Stealth Mode · Patent Pending · App. No. 64/060,960
            </motion.p>
          </div>

          {/* Right: Product render with subtle tactical framing */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={animate ? { opacity: 0, scale: 0.96 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image
                  src="/images/hero-render.png"
                  alt="ZeroShot VR scope attachment mounted on a rifle in a dark studio environment"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-near-black/60 via-transparent to-teal-900/15 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-near-black/40 pointer-events-none" />
              </div>

              {/* Corner brackets — clean tactical UI chrome */}
              <CornerBracket position="top-left" />
              <CornerBracket position="top-right" />
              <CornerBracket position="bottom-left" />
              <CornerBracket position="bottom-right" />

              {/* Static spec badge — clearly a product spec callout, not live data */}
              <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-sm border border-teal-600/30 rounded-md px-3 py-2">
                <p className="text-xs font-mono text-teal-400 tracking-[0.2em]">
                  SUB-MOA · G7 BALLISTICS
                </p>
                <p className="text-[10px] font-mono text-gray-500 tracking-wider mt-0.5">
                  Any caliber · Any optic · No modifications
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Data ticker band */}
      <div
        className="relative border-y border-white/[0.06] bg-black/30 backdrop-blur-sm overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-near-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-near-black to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-12 py-3 whitespace-nowrap will-change-transform"
          animate={animate ? { x: ["0%", "-50%"] } : false}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-xs font-mono tracking-[0.3em] text-gray-500"
            >
              <span className="text-teal-500">▸</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Email capture */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full py-10">
        <motion.div
          ref={emailRef}
          className="border border-teal-600/20 rounded-xl p-6 md:p-7 bg-teal-600/[0.04] flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white">
              Don&apos;t miss the presale.
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Early subscribers get first access before public launch.
            </p>
          </div>

          <div className="flex-1 min-w-0 max-w-xl w-full">
            {submitted ? (
              <p className="text-sm font-mono text-teal-400">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-3"
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
              <p className="text-xs text-red-400 mt-2">{submitError}</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-teal-500/60 to-transparent"
          animate={animate ? { scaleY: [1, 0.4, 1] } : false}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div> */}
    </section>
  );
}

function CornerBracket({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const base = "absolute w-7 h-7 border-teal-400/45";
  const map = {
    "top-left": "top-3 left-3 border-t border-l",
    "top-right": "top-3 right-3 border-t border-r",
    "bottom-left": "bottom-3 left-3 border-b border-l",
    "bottom-right": "bottom-3 right-3 border-b border-r",
  };
  return <div className={`${base} ${map[position]}`} aria-hidden="true" />;
}
