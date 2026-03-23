import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { cn } from "../lib/utils";

const categories = ["Tous", "Web", "Mobile", "Branding", "Desktop"];
const RUNES = ["ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ"];

function IMacCard({ project }) {
  const images = project.images?.length ? project.images : [project.image];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="w-full flex flex-col items-center pt-6 pb-2">
      <motion.div
        whileHover={{ scale: 1.04, y: -6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full"
        style={{ maxWidth: "288px" }}
      >
        <div className="relative rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #2d2d35, #1a1a22)",
            padding: "6px 6px 10px 6px",
            boxShadow: "0 0 40px rgba(59,130,246,0.12), 0 12px 32px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.07)"
          }}>
          <div className="relative overflow-hidden rounded-lg bg-black" style={{ aspectRatio: "16/10" }}>
            <AnimatePresence mode="crossfade">
              <motion.img
                key={idx}
                src={images[idx]}
                alt={`${project.title} ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,1) 2px,rgba(0,0,0,1) 4px)" }} />
            <div className="absolute inset-0 pointer-events-none z-10"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }} />
            <motion.div
              initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 flex flex-col justify-between p-3"
              style={{ background: "linear-gradient(180deg, rgba(5,8,20,0.88) 0%, transparent 45%, rgba(5,8,20,0.92) 100%)" }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-mono text-[8px] text-blue-400 tracking-[0.25em] uppercase">[ Système — Desktop ]</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-mono text-[8px] text-slate-500">Stack</span>
                  <span className="font-mono text-[8px] text-blue-300">{project.tags.slice(0, 2).join(" · ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[8px] text-slate-500">Plateforme</span>
                  <span className="font-mono text-[8px] text-violet-300">Windows</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[8px] text-slate-500">Statut</span>
                  <span className="font-mono text-[8px] text-emerald-400">Livré ✓</span>
                </div>
              </div>
            </motion.div>
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-30">
                {images.map((_, i) => (
                  <motion.div key={i} animate={{ opacity: i === idx ? 1 : 0.3, scale: i === idx ? 1.3 : 1 }}
                    className="w-1 h-1 rounded-full bg-blue-400" />
                ))}
              </div>
            )}
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#333]" style={{ boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.1)" }} />
        </div>
        <div className="mx-auto bg-gradient-to-b from-[#252530] to-[#1e1e28]"
          style={{ width: "32px", height: "20px", clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }} />
        <div className="mx-auto rounded-full"
          style={{ width: "90px", height: "6px", background: "linear-gradient(90deg, #1a1a22, #2d2d38, #1a1a22)", boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }} />
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto rounded-full blur-md mt-1"
          style={{ width: "60px", height: "8px", background: "rgba(59,130,246,0.4)" }} />
      </motion.div>
    </div>
  );
}

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div key={project.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }} whileHover={project.comingSoon ? {} : { y: -6 }}
                  className={cn(
                    "group card-sl overflow-hidden transition-all duration-300 relative",
                    project.comingSoon ? "cursor-default" : "cursor-pointer hover:border-blue-400/25"
                  )}
                  style={project.comingSoon ? { borderColor: "rgba(139,92,246,0.25)", boxShadow: "0 0 24px rgba(139,92,246,0.08)" } : {}}
                  onClick={() => !project.comingSoon && project.link && window.open(project.link, "_blank")}>

                  {project.comingSoon && (
                    <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
                      animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
                      style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.3)" }} />
                  )}

                  {project.category === "Desktop" ? (
                    <>
                      <div className="bg-[#06080f] flex justify-center px-4 pt-4 pb-1">
                        <IMacCard project={project} />
                      </div>
                      <div className={cn("p-5 text-center", project.comingSoon && "opacity-40 blur-[1.5px] select-none")}>
                        <div className="flex flex-col items-center gap-1 mb-2">
                          <h3 className="font-bold text-white">{project.title}</h3>
                          <span className="text-xs font-mono px-2 py-1 rounded-md bg-blue-500/[0.08] text-blue-400 border border-blue-500/[0.12]">{project.category}</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{project.desc}</p>
                        <div className="flex gap-1.5 flex-wrap justify-center">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 bg-blue-500/[0.06] text-blue-400 rounded-md font-medium border border-blue-500/[0.1]">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
