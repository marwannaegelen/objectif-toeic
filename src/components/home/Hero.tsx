import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBattery } from "@/components/ui/ProgressBattery";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { SkillBar } from "@/components/ui/SkillBar";
import { staggerContainer, staggerItem, EASE_OUT } from "@/lib/motion";
import { estimate, preparation, user } from "@/lib/mockData";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-0 h-[560px] bg-radial-spot -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
          {/* Colonne texte */}
          <motion.div
            variants={reduce ? undefined : staggerContainer(0.09)}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            <motion.div variants={reduce ? undefined : staggerItem}>
              <Badge tone="violet">
                <Sparkles size={13} /> Plateforme EdTech · 100 % gratuite
              </Badge>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : staggerItem}
              className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight leading-[1.05]"
            >
              Visez le score parfait.
              <br />
              <span className="gradient-text">990 au TOEIC.</span>
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : staggerItem}
              className="mt-5 text-lg text-ink-muted max-w-xl leading-relaxed"
            >
              Un entraînement intelligent qui mesure votre vraie préparation — pas juste
              votre score. Quiz ciblés, tests blancs en conditions réelles et une batterie
              de progression qui vous dit exactement où vous en êtes.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : staggerItem}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to="/dashboard">
                <Button size="lg">
                  Commencer gratuitement <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline">
                  <Play size={16} /> Essayer un quiz
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={reduce ? undefined : staggerItem}
              className="mt-8 flex items-center gap-6 text-sm text-ink-muted"
            >
              <span className="flex items-center gap-2">
                <TrendingUp size={16} className="text-success" /> +180 pts en moyenne
              </span>
              <span className="h-4 w-px bg-line" />
              <span>7 parties · 2 000+ questions</span>
            </motion.div>
          </motion.div>

          {/* Colonne démo — composants RÉELS du produit */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            className="relative"
          >
            {/* Carte flottante principale */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card glass className="p-6 sm:p-7 pb-16">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-ink-faint uppercase tracking-wider">Score estimé</p>
                    <p className="text-sm text-ink-muted mt-0.5">Mis à jour en continu</p>
                  </div>
                  <Badge tone="success">Live</Badge>
                </div>

                <div className="flex items-center justify-center py-2">
                  <ScoreGauge score={estimate.total} goal={user.goalScore} size={200} />
                </div>

                <div className="mt-5 space-y-3.5">
                  <SkillBar label="Compréhension orale" value={69} tone="listening" />
                  <SkillBar label="Compréhension écrite" value={66} tone="reading" delay={0.1} />
                </div>
              </Card>
            </motion.div>

            {/* Carte batterie flottante superposée */}
            <motion.div
              className="absolute -bottom-12 -left-4 sm:-left-8"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
            >
              <Card className="p-4 pr-5 bg-surface/95 backdrop-blur">
                <p className="text-2xs uppercase tracking-wider text-ink-faint mb-2">
                  Préparation
                </p>
                <ProgressBattery value={preparation} size="sm" />
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
