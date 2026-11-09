import { cn } from "@/lib/utils";

type Tone = "neutral" | "electric" | "violet" | "success" | "warn" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-white/6 text-ink-muted border-line",
  electric: "bg-electric/10 text-electric-soft border-electric/30",
  violet: "bg-violet/10 text-violet-soft border-violet/30",
  success: "bg-success/10 text-success border-success/30",
  warn: "bg-warn/10 text-warn border-warn/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
