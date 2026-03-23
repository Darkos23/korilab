import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "../lib/utils";

const categories = ["Tous", "Web", "Mobile", "Branding", "Desktop"];
const RUNES = ["ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ"];

function ComingSoonOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/70 via-[#050814]/80 to-[#050814]/95" />
      {RUNES.slice(0, 8).map((r, i) => (
        <motion.span key={i} className="absolute font-mono text-blue-500/20 select-none pointer-events-none"
          style={{ fontSize: `${10 + (i % 3) * 4}px`, left: `${8 + (i * 11) % 80}%`, top: `${10 + (i * 13) % 75}%` }}
          animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -6, 0] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
          {r}
        </motion.span>
      ))}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 rounded-full border border-blue-500/30 flex items-center justify-center"
          style={{ boxShadow: "0 0 20px rgba(59,130,246,0.15)" }}>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full border border-violet-500/40 flex items-center justify-center">
            <span className="text-xl">⬡</span>
          </motion.div>
        </motion.div>
        <div className="flex flex-col items-center gap-1">
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-[10px] tracking-[0.3em] text-red-400/80 uppercase">Rang ???</motion.span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-blue-300/90 uppercase font-semibold">Quête verrouillée</span>
        </div>
      </div>
    </div>
  );
}

export default function Missions({ projects = [] }) {
  const [active, setActive] = useState("Tous");
  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-[#050814]">
      {/* Header */}
      <div className="section-padding pt-24 pb-12 border-b border-blue-500/[0.08]">
        <div className="mx-auto max-w-7xl">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <div className="inline-flex items-center gap-1.5 mb-4">
            <span className="text-blue-500/50 font-mono text-sm">[</span>
            <span className="sys-label">Journal des quêtes</span>
            <span className="text-blue-500/50 font-mono text-sm">]</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Toutes les <span className="gradient-text">missions</span>
          </h1>
          <p className="text-slate-500 max-w-xl mb-8">
            L'intégralité de notre journal de quêtes — des batailles gagnées et des horizons à conquérir.
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                  active === cat ? "bg-blue-600 text-white border-blue-500 glow-blue-sm" : "bg-blue-500/[0.05] text-slate-400 border-blue-500/[0.1] hover:bg-blue-500/[0.1] hover:text-white hover:border-blue-400/30")}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="section-padding py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }} whileHover={project.comingSoon ? {} : { y: -6 }}
                  className={cn("group card-sl overflow-hidden transition-all duration-300 relative", project.comingSoon ? "cursor-default" : "cursor-pointer hover:border-blue-400/25")}
                  style={project.comingSoon ? { borderColor: "rgba(139,92,246,0.25)", boxShadow: "0 0 24px rgba(139,92,246,0.08)" } : {}}
                  onClick={() => !project.comingSoon && project.link && window.open(project.link, "_blank")}>

                  {project.comingSoon && (
                    <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
                      animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
                      style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.3)" }} />
                  )}

                  <div className={`relative h-48 overflow-hidden ${project.image ? "bg-slate-900" : `bg-gradient-to-br ${project.gradient}`} flex items-center justify-center`}>
                    <div className={project.comingSoon ? "blur-md w-full h-full flex items-center justify-center" : "w-full h-full flex items-center justify-center"}>
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <span className="text-6xl filter drop-shadow-lg z-10">{project.emoji}</span>
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "16px 16px" }} />
                        </>
                      )}
                    </div>
                    {project.comingSoon ? <ComingSoonOverlay /> : (
                      <div className="absolute inset-0 bg-[#050814]/0 group-hover:bg-[#050814]/50 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11 rounded-xl glass flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={cn("p-5", project.comingSoon && "opacity-40 blur-[1.5px] select-none")}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white">{project.title}</h3>
                      {project.comingSoon ? (
                        <span className="text-xs font-mono px-2 py-1 rounded-md bg-red-500/[0.1] text-red-400 border border-red-500/[0.2] ml-2 flex-shrink-0">[CLASSIFIÉ]</span>
                      ) : (
                        <span className="text-xs font-mono px-2 py-1 rounded-md bg-blue-500/[0.08] text-blue-400 border border-blue-500/[0.12] ml-2 flex-shrink-0">{project.category}</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{project.desc}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-blue-500/[0.06] text-blue-400 rounded-md font-medium border border-blue-500/[0.1]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
