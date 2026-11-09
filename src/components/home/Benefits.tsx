import {
  Gauge,
  BrainCircuit,
  LineChart,
  Target,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  {
    icon: Gauge,
    title: "Préparation mesurée, pas devinée",
    desc: "La batterie combine performance, régularité et résultats pour refléter votre vrai niveau de préparation.",
  },
  {
    icon: BrainCircuit,
    title: "Recommandations personnalisées",
    desc: "On identifie vos points faibles et on vous dit exactement quoi travailler ensuite.",
  },
  {
    icon: LineChart,
    title: "Suivi de progression clair",
    desc: "Graphiques d'évolution, statistiques par compétence et historique de vos sessions.",
  },
  {
    icon: Target,
    title: "Fidèle à l'examen",
    desc: "7 parties officielles, format Listening & Reading, chronométrage réaliste.",
  },
  {
    icon: Sparkles,
    title: "Explications pédagogiques",
    desc: "Chaque réponse est corrigée et expliquée pour comprendre, pas seulement mémoriser.",
  },
  {
    icon: ShieldCheck,
    title: "100 % gratuit",
    desc: "Toutes les fonctionnalités, sans paywall. Aucune carte bancaire requise.",
  },
];

export function Benefits() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeading
        eyebrow="Bénéfices pédagogiques"
        title="Tout ce qu'il faut pour progresser vite"
        description="Une méthode structurée, des retours actionnables et une interface pensée pour la concentration."
      />

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={(i % 3) * 0.06}>
            <div className="group h-full p-6 rounded-2xl border border-line bg-surface/50 transition-all duration-300 hover:-translate-y-1 hover:border-electric-soft/30 hover:bg-surface/80">
              <span className="grid place-items-center size-11 rounded-xl bg-brand-gradient-soft border border-line text-electric-soft mb-4 transition-transform duration-300 group-hover:scale-110">
                <b.icon size={20} />
              </span>
              <h3 className="font-display font-semibold text-lg">{b.title}</h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">{b.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
