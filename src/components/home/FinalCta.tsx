import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProgressBattery } from "@/components/ui/ProgressBattery";

export function FinalCta() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong px-6 sm:px-14 py-14 sm:py-20 text-center">
          {/* Fond dégradé maîtrisé */}
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.14]" />
          <div className="absolute inset-0 bg-grid bg-grid opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 size-[420px] rounded-full bg-violet/25 blur-[130px]" />

          <div className="relative">
            <div className="flex justify-center mb-7">
              <ProgressBattery value={100} size="lg" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight">
              Prêt à recharger votre <span className="gradient-text">objectif&nbsp;?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-muted max-w-xl mx-auto">
              Rejoignez une préparation TOEIC premium, entièrement gratuite. Votre première
              session vous attend.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/dashboard">
                <Button size="lg">
                  Créer mon compte gratuit <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline">
                  Tester sans inscription
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
