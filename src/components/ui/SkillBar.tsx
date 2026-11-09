import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SkillBarProps {
  label: string;
  value: number; // 0–100
  sub?: string;
  tone?: "listening" | "reading";
  delay?: number;
}

export function SkillBar({ label, value, sub, tone = "listening", delay = 0 }: SkillBarProps) {
  const reduce = useReducedMotion();
  const pct = Math.round(value);
  const gradient =
    tone === "listening"
      ? "linear-gradient(90deg, #3D7BFF, #5B8DFF)"
      : "linear-gradient(90deg, #9B5CFF, #B388FF)";

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-ink truncate">{label}</span>
          {sub && <span className="text-xs text-ink-faint shrink-0">{sub}</span>}
        </div>
        <span className="text-sm font-semibold tabular-nums text-ink-muted">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/6 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full")}
          style={{ background: gradient }}
          initial={reduce ? { width: `${pct}%` } : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE_OUT, delay }}
        />
      </div>
    </div>
  );
}
