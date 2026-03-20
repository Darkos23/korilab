import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "Initialisation du système...",       delay: 150  },
  { text: "Chargement des modules joueur...",   delay: 600  },
  { text: "Vérification des accréditations...", delay: 1050 },
  { text: "Connexion au serveur KoriLab...",    delay: 1500 },
  { text: "Tous les systèmes opérationnels.",   delay: 1950 },
  { text: "SYSTÈME PRÊT.",                      delay: 2400, highlight: true },
];

const TOTAL = 3000; // durée totale avant exit

function CauriBootLogo() {
  const C = "#00a8ff";
  return (
    <motion.svg width="48" height="67" viewBox="0 0 60 84" fill="none"
      animate={{ filter: [`drop-shadow(0 0 3px ${C}50)`, `drop-shadow(0 0 12px ${C}cc)`, `drop-shadow(0 0 3px ${C}50)`] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.ellipse cx="30" cy="42" rx="21" ry="30"
        fill={C + "15"} stroke={C} strokeWidth="1.5"
        animate={{ strokeOpacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
        stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9"/>
      <line x1="17" y1="24" x2="24" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="16" y1="29" x2="23" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M13,35 L20,40 L13,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <path d="M17,35 L24,40 L17,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <circle cx="11" cy="42" r="2" fill={C} opacity="0.7"/>
      <path d="M13,47 L20,52 L13,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <path d="M17,47 L24,52 L17,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <line x1="16" y1="60" x2="23" y2="60" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="17" y1="64" x2="23" y2="64" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="18" y1="68" x2="23" y2="68" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="43" y1="24" x2="36" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="44" y1="29" x2="37" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M47,35 L40,40 L47,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <path d="M43,35 L36,40 L43,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <circle cx="49" cy="42" r="2" fill={C} opacity="0.7"/>
      <path d="M47,47 L40,52 L47,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <path d="M43,47 L36,52 L43,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      <line x1="44" y1="60" x2="37" y2="60" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="43" y1="64" x2="37" y2="64" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <line x1="42" y1="68" x2="37" y2="68" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </motion.svg>
  );
}

export default function SystemBoot() {
  const alreadySeen = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('korilab_boot');
  const [visible,  setVisible]  = useState(!alreadySeen);
  const [shownLines, setShownLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);

  useEffect(() => {
    if (alreadySeen) return;
    // Afficher les lignes progressivement
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setShownLines(prev => [...prev, line]), line.delay)
    );

    // Barre de progression continue
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / (TOTAL - 400)) * 100, 100));
    }, 16);

    // Début de la sortie
    const exitTimer = setTimeout(() => {
      setExiting(true);
      sessionStorage.setItem('korilab_boot', '1');
    }, TOTAL);
    // Masquer complètement
    const hideTimer = setTimeout(() => setVisible(false), TOTAL + 500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tick);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "#020b18" }}
      >
        {/* Grille de fond */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,168,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(0,168,255,0.03) 0px,rgba(0,168,255,0.03) 1px,transparent 1px,transparent 4px)" }}
        />

        {/* Contenu centré */}
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-6">

          {/* Logo + nom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <CauriBootLogo />
            <div className="text-center">
              <div className="text-lg font-black text-white tracking-wider"
                style={{ textShadow: "0 0 20px rgba(0,168,255,0.5)" }}>
                KoriLab<span style={{ color: "#00a8ff" }}>.</span>
              </div>
              <div className="text-[9px] font-mono text-[#00a8ff]/50 uppercase tracking-[0.35em] mt-0.5">
                System v2.0
              </div>
            </div>
          </motion.div>

          {/* Terminal de boot */}
          <div className="w-full border border-[#00a8ff]/15 rounded bg-[#010a14]/80"
            style={{ boxShadow: "0 0 30px rgba(0,168,255,0.08), inset 0 1px 0 rgba(0,168,255,0.1)" }}
          >
            {/* Barre titre */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#00a8ff]/10 bg-[#00a8ff]/[0.03]">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ boxShadow: "0 0 6px #00a8ff" }}
              />
              <span className="text-[8px] font-mono text-[#00a8ff]/60 uppercase tracking-[0.3em]">
                Initialisation — Séquence de démarrage
              </span>
            </div>

            {/* Lignes de boot */}
            <div className="px-4 py-3 space-y-1.5 min-h-[120px]">
              <AnimatePresence>
                {shownLines.map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2 font-mono text-[11px]"
                  >
                    <span style={{ color: "#00a8ff", opacity: 0.6 }}>›</span>
                    <span style={{
                      color: line.highlight ? "#00a8ff" : "rgba(232,246,255,0.75)",
                      fontWeight: line.highlight ? "700" : "400",
                      letterSpacing: line.highlight ? "0.15em" : "0",
                      textShadow: line.highlight ? "0 0 12px rgba(0,168,255,0.8)" : "none",
                    }}>
                      {line.text}
                    </span>
                    {/* Curseur clignotant sur la dernière ligne */}
                    {i === shownLines.length - 1 && !exiting && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        style={{ color: "#00a8ff" }}
                      >▋</motion.span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Barre de progression */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] font-mono text-[#00a8ff]/30 uppercase tracking-widest">Chargement</span>
                <span className="text-[8px] font-mono text-[#00a8ff]/50">{Math.round(progress)}%</span>
              </div>
              <div className="h-0.5 w-full bg-[#00a8ff]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(to right, #00a8ff, #60a5fa)",
                    boxShadow: "0 0 8px rgba(0,168,255,0.6)",
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Coin bas droit — version */}
        <div className="absolute bottom-6 right-6 text-[8px] font-mono text-[#00a8ff]/20 uppercase tracking-widest">
          KoriLab © 2024
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
