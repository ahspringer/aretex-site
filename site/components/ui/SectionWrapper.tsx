import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className,
  dark: _dark = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full site-section",
        className
      )}
    >
      <div className="site-container">{children}</div>
    </section>
  );
}
