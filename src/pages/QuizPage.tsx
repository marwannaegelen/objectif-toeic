import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  Lightbulb,
  RotateCcw,
  Zap,
  Trophy,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBattery } from "@/components/ui/ProgressBattery";
import { quizQuestions } from "@/lib/mockData";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

export default function QuizPage() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[index];
  const total = quizQuestions.length;
  const progress = ((index + (revealed ? 1 : 0)) / total) * 100;
  const isCorrect = selected === q.answerIndex;

  function choose(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.answerIndex) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
  }

  if (finished) {
    const score = Math.round((correctCount / total) * 100);
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Card className="p-8 sm:p-10 text-center">
            <motion.span
              className="inline-grid place-items-center size-16 rounded-2xl bg-brand-gradient text-white mb-5 shadow-glow"
              initial={reduce ? false : { rotate: -12, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.15 }}
            >
              <Trophy size={30} />
            </motion.span>
            <h1 className="text-3xl font-display font-bold">Quiz terminé !</h1>
            <p className="text-ink-muted mt-2">
              Vous avez obtenu {correctCount} bonnes réponses sur {total}.
            </p>

            <div className="my-8 flex justify-center">
              <ProgressBattery value={score} size="xl" showTier />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <ResultStat label="Score" value={`${score}%`} />
              <ResultStat label="Correctes" value={`${correctCount}`} tone="success" />
              <ResultStat label="À revoir" value={`${total - correctCount}`} tone="warn" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={restart} variant="secondary">
                <RotateCcw size={16} /> Recommencer
              </Button>
              <Link to="/dashboard">
                <Button>
                  Voir mon tableau de bord <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-14">
      {/* Barre de progression */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Badge tone="electric">
            <Zap size={13} /> Mode Quiz
          </Badge>
          <span className="text-sm text-ink-muted tabular-nums">
            Question {index + 1} / {total}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/6 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            animate={{ width: `${progress}%` }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          <Card className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-electric-soft mb-3">
              {q.part}
            </p>
            {q.context && (
              <div className="mb-4 p-4 rounded-xl bg-night/60 border border-line text-sm text-ink-muted leading-relaxed italic">
                {q.context}
              </div>
            )}
            <h2 className="text-lg sm:text-xl font-display font-semibold leading-snug">
              {q.prompt}
            </h2>

            <div className="mt-6 space-y-3">
              {q.options.map((opt, i) => {
                const isAnswer = i === q.answerIndex;
                const isPicked = i === selected;
                const state = !revealed
                  ? "idle"
                  : isAnswer
                    ? "correct"
                    : isPicked
                      ? "wrong"
                      : "dim";
                return (
                  <motion.button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={revealed}
                    whileTap={reduce || revealed ? undefined : { scale: 0.99 }}
                    animate={
                      !reduce && state === "wrong"
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : undefined
                    }
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-colors",
                      state === "idle" &&
                        "border-line bg-white/4 hover:bg-white/8 hover:border-line-strong",
                      state === "correct" && "border-success/50 bg-success/12",
                      state === "wrong" && "border-danger/50 bg-danger/12",
                      state === "dim" && "border-line bg-white/4 opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "grid place-items-center size-8 rounded-lg text-sm font-bold shrink-0 border transition-colors",
                        state === "correct"
                          ? "bg-success text-night border-success"
                          : state === "wrong"
                            ? "bg-danger text-night border-danger"
                            : "bg-white/6 text-ink-muted border-line",
                      )}
                    >
                      {state === "correct" ? (
                        <Check size={16} />
                      ) : state === "wrong" ? (
                        <X size={16} />
                      ) : (
                        LETTERS[i]
                      )}
                    </span>
                    <span className="text-sm sm:text-base text-ink">{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback + explication */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "mt-5 p-4 rounded-xl border flex gap-3",
                      isCorrect
                        ? "border-success/40 bg-success/8"
                        : "border-danger/40 bg-danger/8",
                    )}
                  >
                    <span
                      className={cn(
                        "grid place-items-center size-8 rounded-lg shrink-0",
                        isCorrect ? "bg-success/20 text-success" : "bg-danger/20 text-danger",
                      )}
                    >
                      {isCorrect ? <Check size={17} /> : <Lightbulb size={17} />}
                    </span>
                    <div>
                      <p className={cn("font-semibold text-sm", isCorrect ? "text-success" : "text-danger")}>
                        {isCorrect ? "Bonne réponse !" : "Pas tout à fait."}
                      </p>
                      <p className="text-sm text-ink-muted mt-1 leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button onClick={next}>
                      {index + 1 >= total ? "Voir le résultat" : "Question suivante"}
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ResultStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success" | "warn";
}) {
  return (
    <div className="p-4 rounded-xl border border-line bg-surface/50">
      <p
        className={cn(
          "text-2xl font-display font-bold tabular-nums",
          tone === "success" && "text-success",
          tone === "warn" && "text-warn",
        )}
      >
        {value}
      </p>
      <p className="text-xs text-ink-muted mt-0.5">{label}</p>
    </div>
  );
}
