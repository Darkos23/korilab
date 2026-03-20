import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Typewriter hook ─────────────────────────────────────── */
function useTypewriter(text, speed = 35, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, [text, speed, delay]);

  return { displayed, done };
}

/* ── Scanlines overlay ───────────────────────────────────── */
function Scanlines() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded"
      style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(0,168,255,0.04) 0px,rgba(0,168,255,0.04) 1px,transparent 1px,transparent 4px)" }}
    />
  );
}

/* ── System Alert ────────────────────────────────────────── */
export default function SystemAlert() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase]     = useState(0); // 0=hidden 1=box 2=text 3=cta

  const line1 = useTypewriter("Nouveau joueur détecté.", 40, 600);
  const line2 = useTypewriter("Rang : [ NON ÉVALUÉ ]",   40, 1400);
  const line3 = useTypewriter("Une quête est disponible.", 40, 2300);

  useEffect(() => {
    // Apparaît après 800ms
    const t1 = setTimeout(() => { setVisible(true); setPhase(1); }, 800);
    // CTA apparaît après le typewriter
    const t2 = setTimeout(() => setPhase(3), 4000);
    // Auto-dismiss après 8s
    const t3 = setTimeout(() => setVisible(false), 8500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const C = "#00a8ff";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.3 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] cursor-pointer select-none"
          style={{ minWidth: 300, maxWidth: 380 }}
          onClick={() => setVisible(false)}
        >
          <div className="relative overflow-hidden rounded"
            style={{
              border: `1px solid ${C}55`,
              background: "rgba(1,8,20,0.97)",
              backdropFilter: "blur(16px)",
              boxShadow: `0 0 0 1px ${C}18, 0 0 40px ${C}22, 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 ${C}20`,
            }}
          >
            <Scanlines />

            {/* Coins lumineux */}
            {["absolute top-0 left-0 w-3 h-px","absolute top-0 left-0 w-px h-3",
              "absolute top-0 right-0 w-3 h-px","absolute top-0 right-0 w-px h-3",
              "absolute bottom-0 left-0 w-3 h-px","absolute bottom-0 left-0 w-px h-3",
              "absolute bottom-0 right-0 w-3 h-px","absolute bottom-0 right-0 w-px h-3",
            ].map((cls, i) => (
              <div key={i} className={cls} style={{ background: `${C}90` }} />
            ))}

            {/* Barre titre */}
            <div className="relative z-10 flex items-center gap-2.5 px-4 py-2.5 border-b"
              style={{ borderColor: `${C}15`, background: `${C}06` }}>
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: C, boxShadow: `0 0 8px 2px ${C}cc` }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.38em]"
                style={{ color: `${C}cc` }}>
                Notification — Système
              </span>
              <div className="ml-auto flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-px" style={{ width: i % 2 === 0 ? 10 : 6, background: `${C}30` }} />
                ))}
              </div>
            </div>

            {/* Corps */}
            <div className="relative z-10 px-5 py-4 space-y-1.5">
              {/* Ligne 1 */}
              <p className="font-mono text-[11px] text-white/80 min-h-[16px]">
                {line1.displayed}<span className={line1.done ? "opacity-0" : "animate-pulse"}>▋</span>
              </p>

              {/* Ligne 2 — rang en bleu */}
              {line1.done && (
                <p className="font-mono text-[11px] min-h-[16px]">
                  <span className="text-white/60">Rang : </span>
                  <span style={{ color: C }}>
                    {line2.displayed.replace("Rang : ", "")}
                  </span>
                  {!line2.done && <span className="animate-pulse" style={{ color: C }}>▋</span>}
                </p>
              )}

              {/* Ligne 3 */}
              {line2.done && (
                <p className="font-mono text-[11px] text-white/80 min-h-[16px]">
                  {line3.displayed}
                  {!line3.done && <span className="animate-pulse">▋</span>}
                </p>
              )}

              {/* CTA */}
              <AnimatePresence>
                {phase === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="pt-2 flex items-center justify-between"
                  >
                    <a href="/#services"
                      className="font-mono text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm transition-all duration-200"
                      style={{
                        border: `1px solid ${C}50`,
                        color: C,
                        background: `${C}10`,
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      [ Voir les quêtes ]
                    </a>
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
                      cliquer pour fermer
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
