import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "copper" | "teal" | "neutral";
  className?: string;
}

export default function Badge({
  children,
  variant = "copper",
  className,
}: BadgeProps) {
  const variants = {
    copper:
      "border border-copper/40 text-copper bg-copper/5",
    teal:
      "border border-teal-600/40 text-teal-400 bg-teal-600/5",
    neutral:
      "border border-gray-600/40 text-gray-400 bg-gray-600/5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1 rounded-full tracking-widest uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
