import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Paintbrush, Code2, Megaphone, BarChart3, Smartphone, Globe } from "lucide-react";

const iconMap = { Paintbrush, Code2, Megaphone, BarChart3, Smartphone, Globe };
const rankColors = {
  S: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  A: "text-violet-400 border-violet-400/30 bg-violet-400/10",
  B: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};
const rankLabels = { S: "Signature", A: "Avancé", B: "Essentiel" };
const rankBorders = {
  S: "hover:border-blue-400/30",
  A: "hover:border-blue-400/30",
  B: "hover:border-blue-400/30",
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const cardVariant = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Services({ services }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="section-padding py-28 bg-[#060916]">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 mb-5">
            <span className="text-blue-500/50 font-mono text-sm">[</span>
            <span className="sys-label">Ce que nous faisons</span>
            <span className="text-blue-500/50 font-mono text-sm">]</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos expertises <span className="gradient-text">sur mesure</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            De la stratégie à l'exécution, nous mobilisons toutes nos compétences pour dominer votre marché.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"} className="grid sm:grid-cols-2 gap-5">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Globe;
            const border = rankBorders[s.rank] ?? "hover:border-blue-400/30";
            const rankColor = rankColors[s.rank] ?? rankColors.B;
            return (
              <motion.div key={s.id} variants={cardVariant} whileHover={{ y: -6 }}
                className={`group card-sl ${border} p-6 cursor-default transition-all duration-300`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/[0.08] border border-blue-500/[0.12] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded-md border ${rankColor}`}>
                    {rankLabels[s.rank] ?? "Essentiel"}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-blue-500/[0.06] text-blue-400 text-xs font-medium rounded-lg border border-blue-500/[0.1]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`mt-5 h-px rounded-full bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
