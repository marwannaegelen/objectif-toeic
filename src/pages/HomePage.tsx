import { Hero } from "@/components/home/Hero";
import { BatteryShowcase } from "@/components/home/BatteryShowcase";
import { Modes } from "@/components/home/Modes";
import { Benefits } from "@/components/home/Benefits";
import { FinalCta } from "@/components/home/FinalCta";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";

const metrics = [
  { value: 2000, suffix: "+", label: "Questions", grouped: true },
  { value: 7, suffix: "", label: "Parties TOEIC" },
  { value: 180, prefix: "+", label: "Points en moyenne" },
  { value: 100, suffix: " %", label: "Gratuit" },
];

function MetricsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-line bg-line"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={staggerItem}
            className="bg-surface/70 px-6 py-7 text-center"
          >
            <div className="text-3xl sm:text-4xl font-display font-bold gradient-text tabular-nums">
              <AnimatedCounter
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                grouped={m.grouped}
              />
            </div>
            <p className="text-sm text-ink-muted mt-1.5">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <BatteryShowcase />
      <Modes />
      <Benefits />
      <FinalCta />
    </>
  );
}
