import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center py-8 md:py-10 px-6",
        className
      )}
    >
      <span className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-teal-500/35" />
      <span className="mx-4 inline-flex items-center justify-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="text-teal-500"
        >
          <circle
            cx="10"
            cy="10"
            r="7"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="0.6"
            fill="none"
          />
          <circle
            cx="10"
            cy="10"
            r="3.4"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.5"
            fill="none"
          />
          <line
            x1="0"
            y1="10"
            x2="3.5"
            y2="10"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
          <line
            x1="16.5"
            y1="10"
            x2="20"
            y2="10"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="3.5"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
          <line
            x1="10"
            y1="16.5"
            x2="10"
            y2="20"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="0.6"
          />
          <circle cx="10" cy="10" r="1.3" fill="currentColor" fillOpacity="0.9" />
        </svg>
      </span>
      <span className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-teal-500/35" />
    </div>
  );
}
