import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Target, Flame, ClipboardCheck } from "lucide-react";
import { recommendations } from "@/lib/mockData";
import { staggerContainer, staggerItem } from "@/lib/motion";

const toneMap = {
  focus: { icon: Target, cls: "bg-electric/12 text-electric-soft" },
  boost: { icon: Flame, cls: "bg-warn/12 text-warn" },
  test: { icon: ClipboardCheck, cls: "bg-violet/12 text-violet-soft" },
} as const;

export function Recommendations() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="space-y-3"
      variants={reduce ? undefined : staggerContainer(0.08)}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-40px" }}
    >
      {recommendations.map((r) => {
        const t = toneMap[r.tone];
        return (
          <motion.div key={r.id} variants={reduce ? undefined : staggerItem}>
            <Link
              to={r.to}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-line bg-surface/50 hover:border-electric-soft/30 hover:bg-surface/80 transition-all"
            >
              <span className={`grid place-items-center size-10 rounded-xl border border-line shrink-0 ${t.cls}`}>
                <t.icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{r.title}</p>
                <p className="text-xs text-ink-muted mt-0.5">{r.reason}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-electric-soft whitespace-nowrap">
                {r.cta}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
