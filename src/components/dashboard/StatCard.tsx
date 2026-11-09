import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  grouped?: boolean;
  trend?: string;
  tone?: "electric" | "violet" | "success";
  delay?: number;
}

const tones = {
  electric: "bg-electric/12 text-electric-soft",
  violet: "bg-violet/12 text-violet-soft",
  success: "bg-success/12 text-success",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  decimals,
  grouped,
  trend,
  tone = "electric",
  delay = 0,
}: StatCardProps) {
  return (
    <Reveal delay={delay}>
      <div className="h-full p-5 rounded-2xl border border-line bg-surface/60 transition-colors hover:border-line-strong">
        <div className="flex items-center justify-between">
          <span className={cn("grid place-items-center size-10 rounded-xl border border-line", tones[tone])}>
            <Icon size={18} />
          </span>
          {trend && (
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success">
              <ArrowUpRight size={13} /> {trend}
            </span>
          )}
        </div>
        <div className="mt-4 text-3xl font-display font-bold tabular-nums">
          <AnimatedCounter value={value} suffix={suffix} decimals={decimals} grouped={grouped} />
        </div>
        <p className="text-sm text-ink-muted mt-1">{label}</p>
      </div>
    </Reveal>
  );
}
