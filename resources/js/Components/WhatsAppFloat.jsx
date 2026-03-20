import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePage } from "@inertiajs/react";

function WhatsAppIcon({ size = 26, color = "#00a8ff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function WhatsAppFloat() {
  const { props } = usePage();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const number  = props.site?.contactInfo?.phone ?? props.site?.header?.whatsapp ?? "221700000000";
  const name    = props.site?.header?.logoName ?? "KoriLab";
  const message = encodeURIComponent(`Bonjour ${name}, j'aimerais démarrer une quête avec vous !`);
  const waLink  = `https://wa.me/${number.replace(/\D/g, "")}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">

      {/* ── Tooltip Système ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            exit   ={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="relative mr-1"
          >
            {/* Brackets SL */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#00a8ff]/50" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#00a8ff]/50" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#00a8ff]/50" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#00a8ff]/50" />

            <div className="bg-[#020810]/95 backdrop-blur-sm border border-[#00a8ff]/18 rounded-lg px-4 py-2.5 whitespace-nowrap">
              <div className="text-[9px] font-mono text-[#00a8ff]/50 uppercase tracking-[0.25em] mb-0.5">
                ⬡ Nouvelle quête disponible
              </div>
              <div className="text-sm font-semibold text-white">Contacter la Guilde</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton principal ── */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTapStart   ={() => setClicked(true)}
        onTap        ={() => setTimeout(() => setClicked(false), 600)}
        whileHover={{ scale: 1.08 }}
        whileTap  ={{ scale: 0.94 }}
        className="relative w-[52px] h-[52px] flex items-center justify-center rounded-full"
        style={{
          background:  "linear-gradient(135deg, rgba(0,168,255,0.12) 0%, rgba(0,168,255,0.05) 100%)",
          border:      "1px solid rgba(0,168,255,0.35)",
          boxShadow:   "0 0 20px rgba(0,168,255,0.15), inset 0 0 12px rgba(0,168,255,0.05)",
        }}
      >
        {/* Anneau pulse externe */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#00a8ff]/25"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Anneau pulse interne décalé */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#00a8ff]/15"
          animate={{ scale: [1, 2.1], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Glow central */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,168,255,0.12) 0%, transparent 70%)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Flash on click */}
        <AnimatePresence>
          {clicked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#00a8ff]/20"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* Icône WhatsApp */}
        <motion.div
          animate={{
            filter: [
              "drop-shadow(0 0 4px rgba(0,168,255,0.5))",
              "drop-shadow(0 0 12px rgba(0,168,255,0.9))",
              "drop-shadow(0 0 4px rgba(0,168,255,0.5))",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <WhatsAppIcon size={24} color="#00a8ff" />
        </motion.div>

        {/* Badge PING */}
        <motion.div
          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00a8ff]"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 8px rgba(0,168,255,0.9)" }}
        />
      </motion.a>
    </div>
  );
}
