import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Clock, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { staggerContainer, staggerItem } from "@/lib/motion";

const modes = [
  {
    key: "quiz",
    icon: Zap,
    tone: "electric" as const,
    title: "Mode Quiz",
    tagline: "Apprentissage ciblé, feedback immédiat.",
    to: "/quiz",
    cta: "Lancer un quiz",
    points: [
      "Questions par compétence et par partie",
      "Correction expliquée après chaque réponse",
      "Feedback visuel de réussite instantané",
      "Sessions courtes de 5 à 25 questions",
    ],
    gradient: "from-electric/20 to-electric/0",
  },
  {
    key: "test",
    icon: Clock,
    tone: "violet" as const,
    title: "Mode Test blanc",
    tagline: "Conditions réelles, concentration maximale.",
    to: "/test",
    cta: "Démarrer un test",
    points: [
      "Chronomètre et navigation entre questions",
      "Interface immersive sans distraction",
      "Structure fidèle à l'examen officiel",
      "Score estimé et bilan détaillé",
    ],
    gradient: "from-violet/20 to-violet/0",
  },
];

export function Modes() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeading
        eyebrow="Deux façons de progresser"
        title="Un entraînement qui s'adapte à votre objectif"
        description="Travaillez vos points faibles avec le mode Quiz, puis validez vos acquis en conditions réelles avec les tests blancs."
      />

      <motion.div
        className="mt-14 grid md:grid-cols-2 gap-6"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {modes.map((m) => (
          <motion.div key={m.key} variants={staggerItem}>
            <div className="group relative h-full rounded-3xl border border-line bg-surface/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-electric-soft/30 hover:shadow-glow">
              <div
                className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${m.gradient} opacity-70 pointer-events-none`}
              />
              <div className="relative p-7 sm:p-8">
                <span
                  className={`grid place-items-center size-12 rounded-2xl border border-line mb-5 ${
                    m.tone === "electric"
                      ? "bg-electric/15 text-electric-soft"
                      : "bg-violet/15 text-violet-soft"
                  }`}
                >
                  <m.icon size={22} />
                </span>
                <h3 className="text-2xl font-display font-bold">{m.title}</h3>
                <p className="text-ink-muted mt-1.5">{m.tagline}</p>

                <ul className="mt-6 space-y-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-ink/90">
                      <Check
                        size={17}
                        className={m.tone === "electric" ? "text-electric-soft mt-0.5 shrink-0" : "text-violet-soft mt-0.5 shrink-0"}
                      />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link to={m.to} className="inline-block mt-7">
                  <Button variant={m.tone === "electric" ? "primary" : "secondary"}>
                    {m.cta} <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
