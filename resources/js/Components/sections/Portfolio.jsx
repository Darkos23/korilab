import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "../../lib/utils";

const categories = ["Tous", "Web", "Mobile", "Branding", "UI/UX"];
const RUNES = ["ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];

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
          style={{ boxShadow: "0 0 20px rgba(59,130,246,0.15), inset 0 0 20px rgba(59,130,246,0.05)" }}>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full border border-violet-500/40 flex items-center justify-center">
            <span className="text-xl">⬡</span>
          </motion.div>
        </motion.div>
        <div className="flex flex-col items-center gap-1 text-center w-full">
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-[10px] tracking-[0.3em] text-amber-400/80 uppercase block text-center">
            En cours...
          </motion.span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-blue-300/90 uppercase font-semibold block text-center">
            Bientôt disponible
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ projects }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active);
  const getDefaultVisible = () => {
    const done = filtered.filter((p) => !p.comingSoon);
    const soon = filtered.filter((p) => p.comingSoon);
    if (soon.length > 0) return [...done.slice(0, 2), soon[0]];
    return done.slice(0, 3);
  };
  const visible = getDefaultVisible();

  return (
    <section id="portfolio" ref={ref} className="section-padding py-28 bg-[#050814]">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 mb-5">
            <span className="text-blue-500/50 font-mono text-sm">[</span>
            <span className="sys-label">Nos réalisations</span>
            <span className="text-blue-500/50 font-mono text-sm">]</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Missions <span className="gradient-text">accomplies</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8">
            Chaque projet est une nouvelle porte à franchir, une nouvelle légende à forger.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                  active === cat ? "bg-blue-600 text-white border-blue-500 glow-blue-sm" : "bg-blue-500/[0.05] text-slate-400 border-blue-500/[0.1] hover:bg-blue-500/[0.1] hover:text-white hover:border-blue-400/30")}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }} whileHover={project.comingSoon ? {} : { y: -6 }}
                className={cn(
                  "group transition-all duration-300 relative",
                  project.category === "Mobile" ? "flex flex-col items-center" : "card-sl overflow-hidden",
                  project.comingSoon ? "cursor-default" : "cursor-pointer hover:border-blue-400/25"
                )}
                style={project.comingSoon && project.category !== "Mobile" ? { borderColor: "rgba(139,92,246,0.15)", boxShadow: "0 0 12px rgba(139,92,246,0.04)" } : {}}
                onClick={() => !project.comingSoon && project.link && window.open(project.link, "_blank")}>

                {project.comingSoon && project.category !== "Mobile" && (
                  <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
                    animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.15)" }} />
                )}

                {project.category === "Mobile" ? (
                  /* ── iPhone shape card ── */
                  <div className="w-full flex flex-col items-center py-4">
                    {/* Glow under phone */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-24 h-6 rounded-full blur-xl"
                      style={{ background: "rgba(139,92,246,0.5)", bottom: "80px" }}
                    />
                    {/* iPhone 14 Pro frame — floating + tilt */}
                    <motion.div
                      animate={{ y: [0, -10, 0], rotateZ: [-1, 1, -1] }}
                      whileHover={{ scale: 1.05, rotateZ: 0, y: -14 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-32 h-60 rounded-[28px] border-[2px] border-white/10 bg-black shadow-2xl overflow-hidden"
                      style={{ boxShadow: project.comingSoon ? "0 0 30px rgba(139,92,246,0.2)" : "0 20px 50px rgba(0,0,0,0.6)", background: "linear-gradient(145deg, #2a2a2a, #111)" }}>
                      {/* Screen content */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center ${project.comingSoon ? "blur-sm" : ""}`}>
                        <span className="text-4xl">{project.emoji}</span>
                      </div>
                      {/* Dynamic Island */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-black rounded-full z-30" />
                      {/* Side buttons */}
                      <div className="absolute -right-0.5 top-14 w-0.5 h-8 bg-white/20 rounded-l" />
                      <div className="absolute -left-0.5 top-12 w-0.5 h-5 bg-white/20 rounded-r" />
                      <div className="absolute -left-0.5 top-20 w-0.5 h-8 bg-white/20 rounded-r" />
                      {/* Home bar */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-white/40 z-30" />
                      {/* Coming soon overlay */}
                      {project.comingSoon && <ComingSoonOverlay />}
                      {/* Solo Leveling hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-40 flex flex-col justify-between p-2.5"
                        style={{ background: "linear-gradient(180deg, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.75) 50%, rgba(5,8,20,0.95) 100%)" }}
                      >
                        {/* Scanlines */}
                        <div className="absolute inset-0 pointer-events-none opacity-10"
                          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.3) 2px, rgba(59,130,246,0.3) 3px)" }} />

                        {/* Header */}
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                            <span className="font-mono text-[7px] text-blue-400 tracking-[0.2em] uppercase">[ Système ]</span>
                          </div>
                          <p className="font-mono text-[7px] text-blue-300/70 leading-relaxed">
                            Nouvelle application détectée.
                          </p>
                        </div>

                        {/* Stats RPG */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[7px] text-slate-500">Plateforme</span>
                            <span className="font-mono text-[7px] text-blue-300">iOS / Android</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[7px] text-slate-500">Statut</span>
                            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
                              className="font-mono text-[7px] text-amber-400">En cours...</motion.span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[7px] text-slate-500">Rang</span>
                            <span className="font-mono text-[7px] text-red-400">???</span>
                          </div>
                          {/* Progress bar */}
                          <div className="mt-1.5">
                            <div className="flex justify-between mb-0.5">
                              <span className="font-mono text-[6px] text-slate-600">Progression</span>
                              <span className="font-mono text-[6px] text-blue-400">??%</span>
                            </div>
                            <div className="w-full h-0.5 bg-blue-900/50 rounded-full overflow-hidden">
                              <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center">
                          <span className="font-mono text-[7px] text-violet-400/70 tracking-widest uppercase">Bientôt disponible</span>
                        </div>
                      </motion.div>
                    </motion.div>
                    {/* Subtle pulsing border for coming soon */}
                    {project.comingSoon && (
                      <motion.div className="absolute w-32 h-60 rounded-[28px] pointer-events-none"
                        animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}
                        style={{ boxShadow: "0 0 0 1px rgba(139,92,246,0.25)" }} />
                    )}
                  </div>
                ) : (
                  <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <div className="w-full h-full flex items-center justify-center">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                      ) : (
                        <>
                          <span className="text-6xl filter drop-shadow-lg z-10">{project.emoji}</span>
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "16px 16px" }} />
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-[#050814]/0 group-hover:bg-[#050814]/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11 rounded-xl glass flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                <div className={cn("p-5 w-full", project.category === "Mobile" && "text-center card-sl rounded-2xl mt-3", project.comingSoon && "opacity-40 blur-[1.5px] select-none")}>
                  <div className={cn("flex mb-2", project.category === "Mobile" ? "flex-col items-center gap-1" : "items-start justify-between")}>
                    <h3 className="font-bold text-white">{project.title}</h3>
                    {project.comingSoon ? (
                      <span className="text-xs font-mono px-2 py-1 rounded-md bg-red-500/[0.1] text-red-400 border border-red-500/[0.2] ml-2 flex-shrink-0 tracking-wider">[CLASSIFIÉ]</span>
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

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="text-center mt-10">
          <Link href="/missions" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500/[0.1] hover:border-blue-400/50 transition-all duration-200">
            Voir toutes les missions
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
