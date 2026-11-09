import { motion, useReducedMotion } from "framer-motion";
import { Zap, Clock } from "lucide-react";
import { sessions } from "@/lib/mockData";
import { timeAgo, formatDuration } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function SessionList() {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      className="space-y-2"
      variants={reduce ? undefined : staggerContainer(0.07)}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-40px" }}
    >
      {sessions.map((s) => {
        const pct = Math.round((s.correct / s.questions) * 100);
        const isTest = s.mode === "test";
        return (
          <motion.li
            key={s.id}
            variants={reduce ? undefined : staggerItem}
            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/4 transition-colors"
          >
            <span
              className={`grid place-items-center size-10 rounded-xl border border-line shrink-0 ${
                isTest ? "bg-violet/12 text-violet-soft" : "bg-electric/12 text-electric-soft"
              }`}
            >
              {isTest ? <Clock size={17} /> : <Zap size={17} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">{s.title}</p>
              <p className="text-xs text-ink-faint">
                {s.part} · {s.questions} questions · {formatDuration(s.durationMin)} · {timeAgo(s.date)}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p
                className={`text-sm font-bold tabular-nums ${
                  pct >= 75 ? "text-success" : pct >= 50 ? "text-ink" : "text-warn"
                }`}
              >
                {pct}%
              </p>
              <p className="text-xs text-ink-faint tabular-nums">
                {s.correct}/{s.questions}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
