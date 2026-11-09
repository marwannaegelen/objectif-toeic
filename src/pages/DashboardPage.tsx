import { Link } from "react-router-dom";
import {
  Zap,
  Clock,
  Flame,
  Target,
  CheckCircle2,
  ListChecks,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProgressBattery } from "@/components/ui/ProgressBattery";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { SkillBar } from "@/components/ui/SkillBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScoreEvolutionChart } from "@/components/dashboard/ScoreEvolutionChart";
import { WeeklyActivityChart } from "@/components/dashboard/WeeklyActivityChart";
import { SessionList } from "@/components/dashboard/SessionList";
import { Recommendations } from "@/components/dashboard/Recommendations";
import {
  user,
  estimate,
  preparation,
  skills,
  totalQuestions,
  trainingMinutes,
  successRate,
  listeningAccuracy,
  readingAccuracy,
} from "@/lib/mockData";
import { batteryTier } from "@/lib/scoring";
import { formatDuration } from "@/lib/utils";

export default function DashboardPage() {
  const tier = batteryTier(preparation);
  const toGoal = Math.max(0, user.goalScore - estimate.total);
  const listeningSkills = skills.filter((s) => s.category === "listening");
  const readingSkills = skills.filter((s) => s.category === "reading");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* En-tête */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Badge tone="warn">
                <Flame size={13} /> Série de {user.streakDays} jours
              </Badge>
              <Badge tone="neutral">{user.sessionsThisWeek} séances cette semaine</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold">
              Bonjour, {user.firstName} <span className="inline-block">👋</span>
            </h1>
            <p className="text-ink-muted mt-1.5">
              Plus que <span className="font-semibold text-ink">{toGoal} points</span> pour
              atteindre votre objectif de {user.goalScore}.
            </p>
          </div>
          <div className="flex gap-2.5">
            <Link to="/quiz">
              <Button variant="secondary">
                <Zap size={16} /> Quiz
              </Button>
            </Link>
            <Link to="/test">
              <Button>
                <Clock size={16} /> Test blanc
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Rangée 1 : indicateurs clés */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <Reveal>
          <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-2">
              Score TOEIC estimé
            </p>
            <ScoreGauge score={estimate.total} goal={user.goalScore} size={200} />
            <div className="flex gap-6 mt-4 text-sm">
              <div className="text-center">
                <p className="text-ink-faint text-xs">Listening</p>
                <p className="font-semibold tabular-nums">{estimate.listening}</p>
              </div>
              <div className="text-center">
                <p className="text-ink-faint text-xs">Reading</p>
                <p className="font-semibold tabular-nums">{estimate.reading}</p>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card interactive className="p-6 h-full flex flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-4">
              Batterie de préparation
            </p>
            <ProgressBattery value={preparation} size="lg" />
            <p className="mt-5 text-sm font-semibold text-ink">{tier.label}</p>
            <p className="text-sm text-ink-muted mt-1 max-w-[240px]">{tier.message}</p>
          </Card>
        </Reveal>

        <Reveal delay={0.16}>
          <Card className="p-6 h-full flex flex-col justify-center">
            <CardHeader title="Objectif personnel" icon={<Target size={18} />} />
            <div className="text-center py-2">
              <p className="text-5xl font-display font-bold tabular-nums gradient-text">
                {user.goalScore}
              </p>
              <p className="text-sm text-ink-muted mt-1">points visés</p>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-white/6 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-gradient"
                style={{ width: `${Math.min(100, (estimate.total / user.goalScore) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-ink-faint mt-2">
              <span>{estimate.total} actuel</span>
              <span>{user.goalScore} objectif</span>
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Rangée 2 : statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <StatCard
          icon={ListChecks}
          label="Questions traitées"
          value={totalQuestions}
          grouped
          tone="electric"
          trend="+124 cette sem."
        />
        <StatCard
          icon={Clock}
          label="Temps d'entraînement"
          value={Math.round((trainingMinutes / 60) * 10) / 10}
          suffix=" h"
          decimals={1}
          tone="violet"
          delay={0.06}
        />
        <StatCard
          icon={CheckCircle2}
          label="Taux de réussite"
          value={successRate}
          suffix=" %"
          tone="success"
          trend="+6 pts"
          delay={0.12}
        />
        <StatCard
          icon={Flame}
          label="Série en cours"
          value={user.streakDays}
          suffix=" j"
          tone="electric"
          delay={0.18}
        />
      </div>

      {/* Rangée 3 : graphiques */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <Reveal className="lg:col-span-2">
          <Card className="p-6 h-full">
            <CardHeader
              title="Évolution de votre score"
              subtitle="Score estimé et taux de préparation"
              icon={<TrendingUp size={18} />}
              action={
                <div className="hidden sm:flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <span className="size-2 rounded-full bg-electric-soft" /> Score
                  </span>
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <span className="size-2 rounded-full bg-violet-soft" /> Préparation
                  </span>
                </div>
              }
            />
            <ScoreEvolutionChart />
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6 h-full">
            <CardHeader
              title="Cette semaine"
              subtitle={formatDuration(
                [35, 22, 48, 0, 30, 65, 18].reduce((a, b) => a + b, 0),
              )}
              icon={<Zap size={18} />}
            />
            <WeeklyActivityChart />
          </Card>
        </Reveal>
      </div>

      {/* Rangée 4 : compétences + sessions */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Reveal>
          <Card className="p-6 h-full">
            <CardHeader
              title="Statistiques par compétence"
              subtitle="Maîtrise sur les 7 parties du TOEIC"
              icon={<Target size={18} />}
            />
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mt-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-electric-soft mb-3">
                  Listening · {listeningAccuracy}%
                </p>
                <div className="space-y-3.5">
                  {listeningSkills.map((s, i) => (
                    <SkillBar key={s.id} label={s.label} value={s.mastery} sub={s.part} tone="listening" delay={i * 0.05} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-soft mb-3">
                  Reading · {readingAccuracy}%
                </p>
                <div className="space-y-3.5">
                  {readingSkills.map((s, i) => (
                    <SkillBar key={s.id} label={s.label} value={s.mastery} sub={s.part} tone="reading" delay={i * 0.05} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6 h-full">
            <CardHeader
              title="Dernières sessions"
              subtitle="Votre activité récente"
              icon={<Clock size={18} />}
              action={
                <Link to="/quiz">
                  <Button variant="ghost" size="sm">
                    Nouvelle session
                  </Button>
                </Link>
              }
            />
            <SessionList />
          </Card>
        </Reveal>
      </div>

      {/* Rangée 5 : recommandations */}
      <Reveal>
        <Card className="p-6">
          <CardHeader
            title="Recommandations personnalisées"
            subtitle="Vos prochaines étapes pour progresser"
            icon={<Sparkles size={18} />}
          />
          <Recommendations />
        </Card>
      </Reveal>
    </div>
  );
}
