import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useRef } from "react";

/* ── Cauri traditionnel — logo hero ─────────────────────── */
function CauriHero() {
  const C = "rgba(255,255,255,0.9)";
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: 80, height: 112 }}>
      <motion.div className="absolute inset-0"
        animate={{ opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)", filter: "blur(12px)" }}
      />
      <motion.svg width="80" height="112" viewBox="0 0 60 84" fill="none"
        animate={{ filter: ["drop-shadow(0 0 4px rgba(255,255,255,0.3))", "drop-shadow(0 0 12px rgba(255,255,255,0.8))", "drop-shadow(0 0 4px rgba(255,255,255,0.3))"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.ellipse cx="30" cy="42" rx="21" ry="30"
          fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
          animate={{ strokeOpacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
          stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <line x1="17" y1="24" x2="24" y2="24" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="29" x2="23" y2="29" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M13,35 L20,40 L13,45" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M17,35 L24,40 L17,45" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="11" cy="42" r="2" fill="white" opacity="0.8"/>
        <path d="M13,47 L20,52 L13,57" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M17,47 L24,52 L17,57" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="16" y1="60" x2="23" y2="60" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="17" y1="64" x2="23" y2="64" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="18" y1="68" x2="23" y2="68" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="43" y1="24" x2="36" y2="24" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="44" y1="29" x2="37" y2="29" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M47,35 L40,40 L47,45" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M43,35 L36,40 L43,45" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="49" cy="42" r="2" fill="white" opacity="0.8"/>
        <path d="M47,47 L40,52 L47,57" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M43,47 L36,52 L43,57" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="44" y1="60" x2="37" y2="60" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="43" y1="64" x2="37" y2="64" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="42" y1="68" x2="37" y2="68" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
      </motion.svg>
    </motion.div>
  );
}

const STAT_COLORS = ["text-blue-400", "text-violet-400", "text-amber-400", "text-blue-300"];
const runes = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];
const floatingCards = [
  { icon: "⚔️",  label: "Design System",    delay: 0,   top: "12%",    right: "-4%"  },
  { icon: "🔮",  label: "Performance",      delay: 0.5, top: "45%",    left: "-8%"   },
  { icon: "🌀",  label: "Lancement rapide", delay: 1.0, bottom: "14%", right: "2%"   },
];

export default function Hero({ hero, heroStats }) {
  const badge          = hero?.badge          ?? "Système Activé — Studio Créatif";
  const titleStart     = hero?.titleStart     ?? "Nous forjons des";
  const titleHighlight = hero?.titleHighlight ?? "expériences";
  const titleEnd       = hero?.titleEnd       ?? "légendaires";
  const subtitle       = hero?.subtitle       ?? "Design, développement et stratégie — nous franchissons les portes de la médiocrité pour construire des produits digitaux de haut niveau.";
  const cta1           = hero?.cta1           ?? "Voir nos projets";
  const cta2           = hero?.cta2           ?? "Démarrer un projet";
  const stats          = heroStats?.length
    ? heroStats.map((s, i) => ({ ...s, color: STAT_COLORS[i % STAT_COLORS.length] }))
    : [
        { value: "20+",    label: "Projets livrés",    color: "text-blue-400" },
        { value: "98%",    label: "Clients satisfaits", color: "text-violet-400" },
        { value: "Elite",  label: "Qualité",             color: "text-amber-400" },
        { value: "5 ans",  label: "Expertise",          color: "text-blue-300" },
      ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#050814]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.06] rounded-full blur-3xl animate-gate" />
        <div className="absolute top-1/4 -left-64 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-64 w-[360px] h-[360px] bg-violet-700/10 rounded-full blur-2xl" />
        {runes.slice(0, 12).map((r, i) => (
          <span key={i} className="absolute text-blue-400 font-mono animate-rune select-none"
            style={{ left: `${5 + (i * 8.5) % 90}%`, top: `${10 + (i * 13) % 80}%`, animationDelay: `${i * 0.4}s`, fontSize: `${12 + (i % 3) * 4}px` }}>
            {r}
          </span>
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="section-padding mx-auto max-w-7xl w-full pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 mb-6">
              <span className="font-mono text-blue-500/60 text-sm">[</span>
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span className="sys-label">{badge}</span>
              <span className="font-mono text-blue-500/60 text-sm">]</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl xl:text-[3.5rem] font-extrabold leading-[1.1] text-white mb-6">
              {titleStart}{" "}
              <span className="gradient-text">{titleHighlight}</span>{" "}
              {titleEnd}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed">
              {subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap gap-4 mb-14">
              <a href="#portfolio" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold glow-blue-sm hover:glow-blue hover:scale-[1.03] transition-all duration-200">
                {cta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-500/[0.08] border border-blue-500/20 text-white font-semibold hover:bg-blue-500/[0.15] hover:border-blue-400/40 transition-all duration-200">
                {cta2}
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-blue-500/[0.1]">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.08 }}>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[420px] mx-auto">
              <div className="absolute inset-0 rounded-full bg-blue-500/[0.06] blur-2xl animate-gate" />
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-spin-30s" />
              <div className="absolute inset-10 rounded-full border border-blue-400/15 animate-spin-20s" />
              <div className="absolute inset-20 rounded-full border border-violet-500/20 animate-spin-12s" />
              <div className="absolute inset-10 animate-spin-6s">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 glow-blue-sm" />
              </div>
              {/* ── Portail SL autour du cauri ── */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">

                  {/* Anneau externe — tourne lentement */}
                  <motion.div className="absolute rounded-full border border-blue-400/30"
                    style={{ width: 200, height: 200 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Marqueurs sur l'anneau */}
                    {[0, 90, 180, 270].map((deg, i) => (
                      <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
                        style={{
                          top: "50%", left: "50%",
                          transform: `rotate(${deg}deg) translateY(-100px) translate(-50%,-50%)`,
                          boxShadow: "0 0 8px 2px rgba(96,165,250,0.8)",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Anneau intermédiaire — tourne inverse */}
                  <motion.div className="absolute rounded-full"
                    style={{
                      width: 155, height: 155,
                      border: "1px solid transparent",
                      background: "linear-gradient(#0a1628,#0a1628) padding-box, linear-gradient(to right, rgba(96,165,250,0.4), rgba(139,92,246,0.4), rgba(96,165,250,0.4)) border-box",
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Segment brillant */}
                    {[45, 225].map((deg, i) => (
                      <div key={i} className="absolute w-2 h-2 rounded-full"
                        style={{
                          top: "50%", left: "50%",
                          transform: `rotate(${deg}deg) translateY(-77px) translate(-50%,-50%)`,
                          background: "radial-gradient(circle, #a78bfa, #60a5fa)",
                          boxShadow: "0 0 10px 3px rgba(139,92,246,0.7)",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Anneau interne — pulse */}
                  <motion.div className="absolute rounded-full border border-violet-500/25"
                    style={{ width: 118, height: 118 }}
                    animate={{ scale: [1, 1.04, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Glow central */}
                  <motion.div className="absolute rounded-full"
                    style={{ width: 90, height: 90, background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)", filter: "blur(8px)" }}
                    animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Particules orbitales */}
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.div key={i}
                      className="absolute"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8 + i * 1.2, repeat: Infinity, ease: "linear" }}
                      style={{ width: 130 + i * 4, height: 130 + i * 4, position: "absolute" }}
                    >
                      <div className="absolute w-1 h-1 rounded-full bg-blue-300"
                        style={{
                          top: 0, left: "50%", transform: "translate(-50%,-50%)",
                          opacity: 0.4 + (i % 3) * 0.2,
                          boxShadow: "0 0 6px rgba(147,197,253,0.8)",
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Cauri logo */}
                  <CauriHero />
                </div>
              </div>
              {floatingCards.map((card) => (
                <motion.div key={card.label} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                  style={{ top: card.top, right: card.right, left: card.left, bottom: card.bottom, position: "absolute" }}
                  className="glass rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-xl">
                  <span className="text-lg">{card.icon}</span>
                  <span className="text-xs font-semibold text-white whitespace-nowrap">{card.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[10px] text-blue-500/50 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}
