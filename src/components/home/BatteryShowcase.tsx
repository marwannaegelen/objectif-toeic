import { useState } from "react";
import { motion } from "framer-motion";
import { Battery, Target, Repeat, CheckCircle2 } from "lucide-react";
import { ProgressBattery } from "@/components/ui/ProgressBattery";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { batteryTier } from "@/lib/scoring";
import { cn } from "@/lib/utils";

const LEVELS = [0, 25, 50, 75, 100];

const inputs = [
  { icon: Target, label: "Performance réelle", desc: "Précision sur vos réponses récentes", weight: "40 %" },
  { icon: Repeat, label: "Régularité", desc: "Assiduité et séries de jours actifs", weight: "20 %" },
  { icon: Battery, label: "Compétences maîtrisées", desc: "Couverture des 7 parties du TOEIC", weight: "20 %" },
  { icon: CheckCircle2, label: "Tests blancs", desc: "Résultats en conditions réelles", weight: "20 %" },
];

export function BatteryShowcase() {
  const [level, setLevel] = useState(75);
  const tier = batteryTier(level);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="L'élément signature"
        title={
          <>
            Votre batterie de <span className="gradient-text">préparation</span>
          </>
        }
        description="Un indicateur unique qui reflète votre niveau de préparation réel — distinct de votre score estimé. Elle se recharge au fil de vos performances, de votre régularité et de vos résultats."
      />

      <div className="mt-14 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
        {/* Démo interactive */}
        <Reveal className="order-2 lg:order-1">
          <div className="card p-8 sm:p-10 flex flex-col items-center">
            <motion.div key={level} className="mb-8">
              <ProgressBattery value={level} size="xl" showTier />
            </motion.div>

            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-ink-faint uppercase tracking-wider">
                  Faites glisser le niveau
                </span>
                <span className="text-sm font-semibold text-ink">{level} %</span>
              </div>
              <div className="flex gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border",
                      level === l
                        ? "bg-brand-gradient text-white border-transparent shadow-glow"
                        : "bg-white/5 text-ink-muted border-line hover:text-ink hover:border-line-strong",
                    )}
                  >
                    {l}%
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-muted text-center">
                <span className="font-semibold text-ink">{tier.label}</span> — {tier.message}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Ce qui alimente la jauge */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <h3 className="text-xl font-display font-semibold mb-2">
              Alimentée par vos vraies données
            </h3>
            <p className="text-ink-muted mb-6 leading-relaxed">
              Une batterie à 80 % ne signifie pas automatiquement 800/990. Elle mesure votre
              préparation globale selon quatre facteurs pondérés.
            </p>
          </Reveal>
          <div className="space-y-3">
            {inputs.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.06}>
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-line bg-surface/50 hover:border-electric-soft/30 transition-colors">
                  <span className="grid place-items-center size-10 rounded-xl bg-brand-gradient-soft border border-line text-electric-soft shrink-0">
                    <it.icon size={18} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-ink">{it.label}</p>
                      <span className="text-xs font-semibold text-electric-soft tabular-nums">
                        {it.weight}
                      </span>
                    </div>
                    <p className="text-sm text-ink-muted mt-0.5">{it.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
