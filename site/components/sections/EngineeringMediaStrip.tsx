"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type EngineeringMediaEntry = {
  id: string;
  label: string;
  caption: string;
  bodyText?: string;
  alt: string;
  gradientClass: string;
  imageSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
};

type EngineeringMediaStripProps = {
  entry: EngineeringMediaEntry;
  icon: LucideIcon;
  ariaLabel: string;
  layout?: "strip" | "background";
  showMeta?: boolean;
  className?: string;
};

export default function EngineeringMediaStrip({
  entry,
  icon: Icon,
  ariaLabel,
  layout = "strip",
  showMeta = true,
  className,
}: EngineeringMediaStripProps) {
  const hasVideo = Boolean(entry.videoSrc);
  const hasImage = Boolean(entry.imageSrc);
  const mediaKind = hasVideo ? "video" : hasImage ? "image" : "gradient";
  const isBackground = layout === "background";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isBackground
          ? "absolute inset-0"
          : "w-screen left-1/2 -translate-x-1/2 border-y border-white/[0.08]",
        className,
      )}
      aria-label={ariaLabel}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`${entry.id}-${mediaKind}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {hasVideo ? (
            <video
              className="h-full w-full object-cover"
              src={entry.videoSrc}
              poster={entry.posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={entry.alt}
            />
          ) : hasImage ? (
            <Image
              src={entry.imageSrc as string}
              alt={entry.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className={`absolute inset-0 ${entry.gradientClass}`} aria-hidden="true" />
          )}
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(20,184,166,0.24),rgba(0,0,0,0))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-35 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0)_35%,rgba(255,255,255,0.08)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      {showMeta ? (
        <div className="relative site-container py-10 md:py-14 lg:py-16 min-h-[36svh] md:min-h-[40svh] flex items-end justify-between gap-6">
          <div className="flex items-center gap-3 text-white/95">
            <div className="h-10 w-10 rounded-md border border-white/20 bg-black/20 grid place-items-center">
              <Icon size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-gray-200">
                {hasVideo
                  ? "Active video"
                  : hasImage
                    ? "Active image"
                    : "Gradient placeholder"}
              </p>
              <p className="text-sm md:text-base font-semibold">{entry.caption}</p>
            </div>
          </div>

          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-gray-100">
            {entry.label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
