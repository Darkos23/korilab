import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleClick = () => {
    setClicking(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setClicking(false), 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          exit   ={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          aria-label="Retour en haut"
          className="fixed bottom-6 left-6 z-50 group"
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          {/* Conteneur principal */}
          <div className="relative w-[44px] h-[44px] flex items-center justify-center">

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-sm border border-[#00a8ff]/30"
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Fond */}
            <motion.div
              className="absolute inset-0 rounded-sm"
              style={{
                background: "linear-gradient(135deg, rgba(0,168,255,0.12) 0%, rgba(0,168,255,0.05) 100%)",
                border: "1px solid rgba(0,168,255,0.35)",
                boxShadow: "0 0 16px rgba(0,168,255,0.15), inset 0 0 8px rgba(0,168,255,0.05)",
              }}
              whileHover={{ boxShadow: "0 0 28px rgba(0,168,255,0.35), inset 0 0 12px rgba(0,168,255,0.1)" }}
            />

            {/* Brackets coins SL */}
            <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-[#00a8ff]/60" />
            <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-[#00a8ff]/60" />
            <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-[#00a8ff]/60" />
            <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-[#00a8ff]/60" />

            {/* Flèche */}
            <motion.svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              animate={clicking
                ? { y: [-2, -14], opacity: [1, 0], transition: { duration: 0.35, ease: "easeIn" } }
                : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
              }
              style={{
                filter: "drop-shadow(0 0 4px rgba(0,168,255,0.8))",
                position: "relative", zIndex: 1,
              }}
            >
              <path d="M8 13 L8 3" stroke="#00a8ff" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M3.5 7.5 L8 3 L12.5 7.5" stroke="#00a8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </motion.svg>

            {/* Flash au clic */}
            <AnimatePresence>
              {clicking && (
                <motion.div
                  className="absolute inset-0 rounded-sm bg-[#00a8ff]/20"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            <div className="relative">
              <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-[#00a8ff]/50" />
              <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-[#00a8ff]/50" />
              <div className="bg-[#020810]/95 border border-[#00a8ff]/20 rounded px-2.5 py-1 text-[10px] font-mono text-[#00a8ff]/80 tracking-[0.15em] uppercase">
                Retour au sommet
              </div>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
