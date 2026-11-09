import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { ProgressBattery } from "@/components/ui/ProgressBattery";
import { testQuestions, user } from "@/lib/mockData";
import { estimateToeicScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];
const SECONDS_PER_Q = 75;

type Phase = "intro" | "running" | "done";

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function TestPage() {
  const reduce = useReducedMotion();
  const total = testQuestions.length;
  const totalSeconds = total * SECONDS_PER_Q;

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
  const [remaining, setRemaining] = useState(totalSeconds);

  const finish = useCallback(() => setPhase("done"), []);

  useEffect(() => {
    if (phase !== "running") return;
    if (remaining <= 0) {
      finish();
      return;
    }
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [phase, remaining, finish]);

  function start() {
    setPhase("running");
    setIndex(0);
    setAnswers(Array(total).fill(null));
    setRemaining(totalSeconds);
  }

  function pick(i: number) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = i;
      return copy;
    });
  }

  const answeredCount = answers.filter((a) => a !== null).length;
  const timeLow = remaining < totalSeconds * 0.15;

  /* ---------------- INTRO ---------------- */
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
        <Card className="p-8 sm:p-10">
          <Badge tone="violet">
            <ShieldCheck size={13} /> Mode Test blanc
          </Badge>
          <h1 className="text-3xl font-display font-bold mt-4">Test en conditions réelles</h1>
          <p className="text-ink-muted mt-2 leading-relaxed">
            Interface immersive, chronomètre visible et navigation libre entre les questions.
            Aucune correction ne s'affiche avant la fin — exactement comme le jour J.
          </p>

          <div className="grid grid-cols-3 gap-3 my-8">
            <IntroStat icon={<Flag size={16} />} label="Questions" value={`${total}`} />
            <IntroStat icon={<Clock size={16} />} label="Durée" value={fmtTime(totalSeconds)} />
            <IntroStat icon={<ShieldCheck size={16} />} label="Format" value="L & R" />
          </div>

          <ul className="space-y-2 text-sm text-ink-muted mb-8">
            {[
              "Naviguez librement entre les questions.",
              "Le chronomètre tourne : gérez votre temps.",
              "Votre score TOEIC estimé s'affiche à la fin.",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-electric-soft" /> {t}
              </li>
            ))}
          </ul>

          <Button size="lg" className="w-full" onClick={start}>
            Démarrer le test <ArrowRight size={18} />
          </Button>
        </Card>
      </div>
    );
  }

  /* ---------------- DONE ---------------- */
  if (phase === "done") {
    const correct = answers.reduce<number>(
      (acc, a, i) => acc + (a === testQuestions[i].answerIndex ? 1 : 0),
      0,
    );
    const accuracy = Math.round((correct / total) * 100);
    // Estimation à partir de la précision (démo : même précision L & R)
    const est = estimateToeicScore(accuracy, accuracy);
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
        <Card className="p-8 sm:p-10 text-center">
          <Badge tone="violet" className="mx-auto">
            Test terminé
          </Badge>
          <h1 className="text-3xl font-display font-bold mt-4">Votre bilan</h1>

          <div className="my-8 flex justify-center">
            <ScoreGauge score={est.total} goal={user.goalScore} size={220} />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <IntroStat label="Précision" value={`${accuracy}%`} />
            <IntroStat label="Correctes" value={`${correct}/${total}`} />
            <IntroStat label="Temps" value={fmtTime(totalSeconds - remaining)} />
          </div>

          <div className="mb-8 flex flex-col items-center">
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-2">
              Impact sur votre préparation
            </p>
            <ProgressBattery value={Math.min(100, accuracy + 8)} size="md" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={start}>
              <RotateCcw size={16} /> Relancer
            </Button>
            <Link to="/dashboard">
              <Button>
                Tableau de bord <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------- RUNNING ---------------- */
  const q = testQuestions[index];
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      {/* Barre supérieure : chrono + progression */}
      <div className="sticky top-16 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 mb-6">
        <div className="glass rounded-2xl border border-line px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Badge tone="violet">Test</Badge>
            <span className="text-sm text-ink-muted tabular-nums hidden sm:inline">
              {answeredCount}/{total} répondues
            </span>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 font-display font-bold tabular-nums text-lg px-3 py-1 rounded-lg transition-colors",
              timeLow ? "text-danger bg-danger/10" : "text-ink",
            )}
          >
            <Clock size={18} className={timeLow && !reduce ? "animate-pulse" : ""} />
            {fmtTime(remaining)}
          </div>
        </div>
      </div>

      {/* Navigateur de questions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {testQuestions.map((_, i) => {
          const answered = answers[i] !== null;
          const current = i === index;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Aller à la question ${i + 1}`}
              className={cn(
                "size-9 rounded-lg text-sm font-semibold tabular-nums border transition-colors",
                current
                  ? "bg-brand-gradient text-white border-transparent"
                  : answered
                    ? "bg-electric/15 text-electric-soft border-electric/30"
                    : "bg-white/4 text-ink-muted border-line hover:border-line-strong",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question (transition sobre) */}
      <motion.div
        key={q.id}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-soft mb-3">
            {q.part} · Question {index + 1}
          </p>
          {q.context && (
            <div className="mb-4 p-4 rounded-xl bg-night/60 border border-line text-sm text-ink-muted leading-relaxed italic">
              {q.context}
            </div>
          )}
          <h2 className="text-lg sm:text-xl font-display font-semibold leading-snug">{q.prompt}</h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const picked = answers[index] === i;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  className={cn(
                    "w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-colors",
                    picked
                      ? "border-violet/50 bg-violet/12"
                      : "border-line bg-white/4 hover:bg-white/8 hover:border-line-strong",
                  )}
                >
                  <span
                    className={cn(
                      "grid place-items-center size-8 rounded-lg text-sm font-bold shrink-0 border",
                      picked
                        ? "bg-violet text-night border-violet"
                        : "bg-white/6 text-ink-muted border-line",
                    )}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="text-sm sm:text-base text-ink">{opt}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Navigation bas */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ChevronLeft size={16} /> Précédent
        </Button>

        {index + 1 < total ? (
          <Button onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>
            Suivant <ChevronRight size={16} />
          </Button>
        ) : (
          <Button onClick={finish}>
            <Flag size={16} /> Terminer le test
          </Button>
        )}
      </div>
    </div>
  );
}

function IntroStat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-line bg-surface/50 text-center">
      {icon && <span className="inline-flex text-electric-soft mb-1.5">{icon}</span>}
      <p className="text-xl font-display font-bold tabular-nums">{value}</p>
      <p className="text-xs text-ink-muted mt-0.5">{label}</p>
    </div>
  );
}
