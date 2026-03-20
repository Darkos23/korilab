import { Link, Head } from "@inertiajs/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

/* ─────────────────────────────────────────────────────────────
   SHADOW BACKGROUND ANIMATIONS
───────────────────────────────────────────────────────────── */

// Floating shadow orbs
const ORBS = [
  { w: 320, h: 320, x: "10%",  y: "15%", dur: 8,  delay: 0,   opacity: 0.06 },
  { w: 200, h: 200, x: "75%",  y: "8%",  dur: 12, delay: 2,   opacity: 0.04 },
  { w: 260, h: 260, x: "60%",  y: "55%", dur: 10, delay: 1,   opacity: 0.05 },
  { w: 180, h: 180, x: "20%",  y: "70%", dur: 14, delay: 3,   opacity: 0.04 },
  { w: 140, h: 140, x: "85%",  y: "75%", dur: 9,  delay: 1.5, opacity: 0.03 },
];

function ShadowOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            left: orb.x,
            top: orb.y,
            background: "radial-gradient(circle, rgba(139,92,246,1) 0%, transparent 70%)",
            opacity: orb.opacity,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating rune particles
const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];

function RuneParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    rune: RUNES[i % RUNES.length],
    x: Math.random() * 100,
    dur: 12 + Math.random() * 10,
    delay: Math.random() * 8,
    size: 10 + Math.random() * 8,
    opacity: 0.04 + Math.random() * 0.08,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono text-purple-400 select-none"
          style={{
            left: `${p.x}%`,
            bottom: "-2rem",
            fontSize: p.size,
            opacity: 0,
          }}
          animate={{
            y: [0, -window.innerHeight - 60],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 15, -10, 5, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.rune}
        </motion.span>
      ))}
    </div>
  );
}

// Animated grid lines
function ShadowGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   ITACHI UCHIHA — AMATERASU / SHARINGAN BACKGROUND
───────────────────────────────────────────────────────────── */

// Crow feathers — moins nombreuses, plus lentes, teinte bordeaux douce
const FEATHER_SHAPES = ["⌒","∫","⌣","∾","⌢","∿","⌇","⌁"];
function CrowFeathers() {
  const feathers = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    char: FEATHER_SHAPES[i % FEATHER_SHAPES.length],
    x: (i * 7 + Math.cos(i * 0.9) * 5) % 97,
    dur: 14 + (i % 7) * 2,
    delay: (i * 0.9) % 14,
    size: 9 + (i % 5) * 3,
    opacity: 0.04 + (i % 3) * 0.02,   // max 0.08 — très discret
    rotate: -25 + (i % 5) * 14,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {feathers.map((f) => (
        <motion.span key={f.id}
          className="absolute select-none"
          style={{ left: `${f.x}%`, top: "-2rem", fontSize: f.size, color: "#9f1239", opacity: 0, display: "inline-block" }}
          animate={{
            y: [(typeof window !== "undefined" ? window.innerHeight : 900) + 60],
            opacity: [0, f.opacity, f.opacity, 0],
            rotate: [f.rotate, f.rotate + 20, f.rotate - 8, f.rotate + 3],
          }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "linear" }}
        >{f.char}</motion.span>
      ))}
    </div>
  );
}

// Amaterasu — flammes très douces, presque une braise lointaine
const FLAME_COLS = [
  { x: "3%",  w: 40, h: 90,  delay: 0    },
  { x: "12%", w: 30, h: 70,  delay: 0.4  },
  { x: "24%", w: 50, h: 110, delay: 0.8  },
  { x: "38%", w: 35, h: 80,  delay: 0.2  },
  { x: "52%", w: 45, h: 100, delay: 0.6  },
  { x: "65%", w: 30, h: 75,  delay: 0.35 },
  { x: "76%", w: 42, h: 95,  delay: 0.9  },
  { x: "88%", w: 35, h: 85,  delay: 0.15 },
];

function AmatsuFlames() {
  return (
    <div className="fixed bottom-0 inset-x-0 pointer-events-none overflow-hidden z-0" style={{ height: 180 }}>
      {FLAME_COLS.map((fl, i) => (
        <motion.div key={i}
          className="absolute bottom-0 rounded-t-full"
          style={{
            left: fl.x, width: fl.w, height: fl.h,
            // Bordeaux très sombre — pas de rouge vif
            background: "linear-gradient(to top, rgba(120,10,30,0.18) 0%, rgba(60,5,15,0.08) 50%, transparent 100%)",
            filter: "blur(14px)",
          }}
          animate={{
            scaleY:  [1, 1.12, 0.9, 1.06, 0.97, 1],
            opacity: [0.6, 0.9, 0.65, 0.85, 0.6],
          }}
          transition={{ duration: 2.2 + (i % 4) * 0.4, delay: fl.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Braise au sol — très subtile */}
      <div className="absolute bottom-0 inset-x-0 h-6"
        style={{ background: "linear-gradient(to top, rgba(80,10,20,0.12), transparent)", filter: "blur(6px)" }} />
    </div>
  );
}

// Sharingan orbs — couleur bordeaux/lie-de-vin, moins saturée, plus douce
const SHARINGAN_ORBS = [
  { w: 400, h: 400, x: "5%",  y: "8%",  dur: 14, delay: 0,   opacity: 0.04  },
  { w: 280, h: 280, x: "68%", y: "3%",  dur: 11, delay: 2,   opacity: 0.03  },
  { w: 220, h: 220, x: "58%", y: "50%", dur: 16, delay: 1,   opacity: 0.03  },
  { w: 170, h: 170, x: "10%", y: "58%", dur: 13, delay: 3,   opacity: 0.025 },
];

function SharinganOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {SHARINGAN_ORBS.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y,
            background: "radial-gradient(circle, rgba(110,10,40,1) 0%, rgba(55,5,20,0.35) 55%, transparent 80%)",
            opacity: orb.opacity, filter: "blur(50px)" }}
          animate={{ y: [0, -18, 0, 12, 0], x: [0, 9, -7, 4, 0], scale: [1, 1.08, 0.95, 1.04, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ItachiGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.012]"
      style={{ backgroundImage: `linear-gradient(rgba(185,28,28,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(185,28,28,0.7) 1px, transparent 1px)`, backgroundSize: "55px 55px" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   GOJO SATORU — INFINITE VOID BACKGROUND
───────────────────────────────────────────────────────────── */

// V5 — Hexagones imbriqués qui tournent (Géométrie Sacrée / Limitless)
const HEX_CONFIGS = [
  // Cluster central — imbriqués, tournent en sens alternés
  { size: 420, cx: "50%", cy: "32%", dur: 60, dir:  1, opacity: 0.055 },
  { size: 290, cx: "50%", cy: "32%", dur: 40, dir: -1, opacity: 0.08  },
  { size: 175, cx: "50%", cy: "32%", dur: 26, dir:  1, opacity: 0.10  },
  { size:  90, cx: "50%", cy: "32%", dur: 16, dir: -1, opacity: 0.13  },
  // Hexagones dispersés en arrière-plan
  { size: 320, cx: "12%", cy: "68%", dur: 55, dir: -1, opacity: 0.035 },
  { size: 240, cx: "82%", cy: "18%", dur: 44, dir:  1, opacity: 0.04  },
  { size: 200, cx: "88%", cy: "72%", dur: 50, dir: -1, opacity: 0.035 },
  { size: 140, cx: "22%", cy: "20%", dur: 32, dir:  1, opacity: 0.045 },
];

function RotatingHexagons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {HEX_CONFIGS.map((h, i) => (
        <motion.div key={i}
          className="absolute"
          style={{ width: h.size, height: h.size, left: h.cx, top: h.cy,
            translateX: "-50%", translateY: "-50%", opacity: h.opacity }}
          animate={{ rotate: h.dir > 0 ? [0, 360] : [360, 0] }}
          transition={{ duration: h.dur, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <polygon points="50,2 98,26 98,74 50,98 2,74 2,26"
              fill="none" stroke="rgba(56,189,248,0.9)" strokeWidth="0.7" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// Six Eyes glow — pair of aqua eyes that blink from random positions
const SIX_EYES_POSITIONS = [
  { x: "8%",  y: "22%" }, { x: "74%", y: "12%" },
  { x: "82%", y: "58%" }, { x: "18%", y: "68%" }, { x: "48%", y: "40%" },
];

function SixEyes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {SIX_EYES_POSITIONS.map((pos, i) => (
        <motion.div key={i}
          className="absolute flex gap-2.5 items-center"
          style={{ left: pos.x, top: pos.y }}
          animate={{ opacity: [0, 0.22, 0.35, 0.22, 0] }}
          transition={{ duration: 3.5, delay: i * 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-4 h-2.5 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(125,211,252,1) 0%, rgba(14,165,233,0.5) 50%, transparent 100%)", filter: "blur(2px)" }} />
          <div className="w-4 h-2.5 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(125,211,252,1) 0%, rgba(14,165,233,0.5) 50%, transparent 100%)", filter: "blur(2px)" }} />
        </motion.div>
      ))}
    </div>
  );
}

// Particules géométriques sacrées — montent en tournant
const GEO_SYMBOLS = ["⬡","⬢","△","▽","◇","⋄","⊕","⊗","◎","⬟","⌖","✦","⊞","⟁"];

function GeoParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    char: GEO_SYMBOLS[i % GEO_SYMBOLS.length],
    x: (i * 5 + Math.sin(i * 1.3) * 4) % 98,
    dur: 16 + (i % 6) * 2,
    delay: (i * 0.6) % 10,
    size: 9 + (i % 5) * 3,
    opacity: 0.07 + (i % 4) * 0.035,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.span key={p.id}
          className="absolute select-none font-mono"
          style={{ left: `${p.x}%`, bottom: "-1.5rem", fontSize: p.size, color: "#7dd3fc", opacity: 0 }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight : 900) - 50],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 180],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >{p.char}</motion.span>
      ))}
    </div>
  );
}

// Blue & Hollow Purple ambient orbs
const GOJO_ORBS = [
  { w: 450, h: 450, x: "20%", y: "-5%", dur: 14, delay: 0,   opacity: 0.06, color: "14,165,233"  }, // Blue technique
  { w: 280, h: 280, x: "68%", y: "10%", dur: 11, delay: 2,   opacity: 0.05, color: "99,102,241"  }, // Hollow Purple
  { w: 220, h: 220, x: "5%",  y: "55%", dur: 13, delay: 1,   opacity: 0.04, color: "56,189,248"  },
  { w: 180, h: 180, x: "75%", y: "60%", dur: 16, delay: 3,   opacity: 0.04, color: "139,92,246"  },
  { w: 130, h: 130, x: "45%", y: "75%", dur: 9,  delay: 1.5, opacity: 0.03, color: "186,230,253" }, // white-blue sparkle
];

function GojoOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {GOJO_ORBS.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y,
            background: `radial-gradient(circle, rgba(${orb.color},1) 0%, transparent 70%)`,
            opacity: orb.opacity, filter: "blur(55px)" }}
          animate={{ y: [0, -22, 0, 16, 0], x: [0, 12, -9, 5, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function GojoGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.018]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px),
          linear-gradient(60deg, rgba(56,189,248,0.25) 1px, transparent 1px),
          linear-gradient(-60deg, rgba(56,189,248,0.25) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px, 60px 60px, 60px 60px, 60px 60px",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   ANTARES BACKGROUND ANIMATIONS
───────────────────────────────────────────────────────────── */
const ANTARES_ORBS = [
  { w: 420, h: 420, x: "5%",  y: "5%",  dur: 10, delay: 0,   opacity: 0.07, color: "220,38,38"   },
  { w: 260, h: 260, x: "72%", y: "3%",  dur: 14, delay: 2.5, opacity: 0.05, color: "239,68,68"   },
  { w: 200, h: 200, x: "58%", y: "55%", dur: 11, delay: 1,   opacity: 0.04, color: "249,115,22"  },
  { w: 160, h: 160, x: "15%", y: "65%", dur: 16, delay: 3,   opacity: 0.04, color: "185,28,28"   },
  { w: 120, h: 120, x: "88%", y: "70%", dur: 8,  delay: 1.5, opacity: 0.03, color: "253,186,116" },
];

const STAR_CHARS = ["✦","✧","⋆","·","✴","✵","✸","✹","✺","⊹"];

function AntaresStars() {
  const stars = Array.from({ length: 22 }, (_, i) => ({
    id: i, char: STAR_CHARS[i % STAR_CHARS.length],
    x: (i * 4.5 + Math.sin(i) * 3) % 100,
    dur: 14 + (i % 7) * 2, delay: (i * 0.4) % 9,
    size: 8 + (i % 5) * 3, opacity: 0.05 + (i % 4) * 0.03,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s) => (
        <motion.span key={s.id} className="absolute font-mono select-none"
          style={{ left: `${s.x}%`, bottom: "-1.5rem", fontSize: s.size, color: "#ef4444", opacity: 0 }}
          animate={{ y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 40], opacity: [0, s.opacity, s.opacity, 0] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "linear" }}
        >{s.char}</motion.span>
      ))}
    </div>
  );
}

function AntaresOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {ANTARES_ORBS.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y,
            background: `radial-gradient(circle, rgba(${orb.color},1) 0%, transparent 70%)`,
            opacity: orb.opacity, filter: "blur(50px)" }}
          animate={{ y: [0, -20, 0, 15, 0], x: [0, 10, -8, 4, 0], scale: [1, 1.12, 0.94, 1.06, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AntaresGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.018]"
      style={{ backgroundImage: `linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)`, backgroundSize: "65px 65px" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   BEAST MONARCH BACKGROUND ANIMATIONS
───────────────────────────────────────────────────────────── */

// Pairs of "predator eyes" — two side-by-side amber orbs that pulse together
const EYE_PAIRS = [
  { x: "12%", y: "18%", dur: 4,  delay: 0   },
  { x: "68%", y: "8%",  dur: 5,  delay: 1.5 },
  { x: "80%", y: "55%", dur: 3.5,delay: 0.8 },
  { x: "30%", y: "72%", dur: 4.5,delay: 2.2 },
  { x: "52%", y: "35%", dur: 3,  delay: 1   },
];

function BeastEyes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {EYE_PAIRS.map((e, i) => (
        <motion.div key={i} className="absolute flex gap-3 items-center"
          style={{ left: e.x, top: e.y }}
          animate={{ opacity: [0, 0.18, 0.28, 0.18, 0], scale: [0.8, 1, 1.05, 1, 0.8] }}
          transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* left eye */}
          <div className="w-5 h-3 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(251,191,36,1) 0%, rgba(217,119,6,0.6) 50%, transparent 100%)", filter: "blur(3px)" }} />
          {/* right eye */}
          <div className="w-5 h-3 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(251,191,36,1) 0%, rgba(217,119,6,0.6) 50%, transparent 100%)", filter: "blur(3px)" }} />
        </motion.div>
      ))}
    </div>
  );
}

// Large ambient orbs — jungle depths glow
const BEAST_ORBS = [
  { w: 380, h: 220, x: "0%",   y: "0%",  dur: 12, delay: 0,   opacity: 0.06, rx: "50% 50% 60% 40%" },
  { w: 300, h: 180, x: "65%",  y: "5%",  dur: 15, delay: 3,   opacity: 0.04, rx: "40% 60% 50% 50%" },
  { w: 240, h: 240, x: "50%",  y: "58%", dur: 10, delay: 1.5, opacity: 0.05, rx: "50%"              },
  { w: 180, h: 180, x: "10%",  y: "60%", dur: 13, delay: 2,   opacity: 0.04, rx: "50%"              },
];

function BeastOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {BEAST_ORBS.map((orb, i) => (
        <motion.div key={i} className="absolute"
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y, borderRadius: orb.rx,
            background: "radial-gradient(ellipse, rgba(180,83,9,1) 0%, rgba(120,53,15,0.5) 50%, transparent 80%)",
            opacity: orb.opacity, filter: "blur(55px)" }}
          animate={{ y: [0, -18, 0, 12, 0], x: [0, 8, -6, 4, 0], scale: [1, 1.07, 0.96, 1.04, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Claw-mark particles rising from bottom
const CLAW_MARKS = ["⌇","⌇","⌇","ꓸ","ꓹ","∕","∖","⟋","⟍","/","\\"];

function ClawParticles() {
  const claws = Array.from({ length: 16 }, (_, i) => {
    // Group into sets of 3 (a claw swipe)
    const group = Math.floor(i / 3);
    const pos   = i % 3;
    const baseX = (group * 22 + 5) % 95;
    return {
      id: i,
      char: pos === 1 ? "⌇" : pos === 0 ? "∕" : "∖",
      x: baseX + pos * 1.2,
      dur: 10 + (i % 5) * 1.5,
      delay: (group * 2.5 + pos * 0.15) % 12,
      size: 12 + (i % 4) * 4,
      opacity: 0.06 + (i % 3) * 0.03,
      rotate: pos === 0 ? -20 : pos === 2 ? 20 : 0,
    };
  });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {claws.map((c) => (
        <motion.span key={c.id} className="absolute font-mono select-none"
          style={{ left: `${c.x}%`, bottom: "-2rem", fontSize: c.size, color: "#d97706", opacity: 0, rotate: c.rotate }}
          animate={{ y: [0, -(typeof window !== "undefined" ? window.innerHeight : 900) - 60], opacity: [0, c.opacity, c.opacity, 0] }}
          transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "linear" }}
        >{c.char}</motion.span>
      ))}
    </div>
  );
}

function BeastGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
      style={{ backgroundImage: `linear-gradient(rgba(180,83,9,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(180,83,9,0.7) 1px, transparent 1px)`, backgroundSize: "55px 55px" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   DUNE — SABLES D'ARRAKIS
───────────────────────────────────────────────────────────── */

// Grands orbes chauds — chaleur du désert / épice
const SPICE_ORBS = [
  { w: 520, h: 520, x: "8%",   y: "-12%", dur: 24, delay: 0,   opacity: 0.10, color: "201,131,74"  },
  { w: 340, h: 340, x: "62%",  y: "4%",   dur: 19, delay: 5,   opacity: 0.08, color: "212,149,106" },
  { w: 260, h: 260, x: "48%",  y: "54%",  dur: 26, delay: 2,   opacity: 0.07, color: "160,100,40"  },
  { w: 210, h: 210, x: "4%",   y: "58%",  dur: 21, delay: 7,   opacity: 0.07, color: "190,120,50"  },
  { w: 160, h: 160, x: "79%",  y: "68%",  dur: 17, delay: 3,   opacity: 0.05, color: "30,95,138"   }, // touche de bleu Fremen
];

function SpiceOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {SPICE_ORBS.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y,
            background: `radial-gradient(circle, rgba(${orb.color},1) 0%, transparent 70%)`,
            opacity: orb.opacity, filter: "blur(72px)" }}
          animate={{ y: [0, -14, 0, 9, 0], x: [0, 7, -5, 3, 0], scale: [1, 1.06, 0.97, 1.03, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Grains de sable portés par le vent — dérivent en diagonale
function SandGrains() {
  const grains = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    char: ["·","·","•","·","∙","⋅","·","•"][i % 8],
    x: (i * 3.8 + Math.sin(i * 0.8) * 4) % 100,
    y: (i * 3.9) % 100,
    dur: 10 + (i % 7) * 1.5,
    delay: (i * 0.38) % 10,
    size: 4 + (i % 4) * 2,
    opacity: 0.18 + (i % 4) * 0.08,
    driftX: -35 - (i % 5) * 8,   // vent venant de la droite
    driftY: -(40 + (i % 4) * 18),
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {grains.map((g) => (
        <motion.span key={g.id} className="absolute select-none font-mono"
          style={{ left: `${g.x}%`, top: `${g.y}%`, fontSize: g.size, color: "#c9834a", opacity: 0 }}
          animate={{ x: [0, g.driftX], y: [0, g.driftY], opacity: [0, g.opacity, g.opacity, 0] }}
          transition={{ duration: g.dur, delay: g.delay, repeat: Infinity, ease: "linear" }}
        >{g.char}</motion.span>
      ))}
    </div>
  );
}

// Vapeur d'épice — wisps qui montent du sol
function SpiceVapor() {
  return (
    <div className="fixed bottom-0 inset-x-0 pointer-events-none z-0" style={{ height: 140 }}>
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(160,80,10,0.25) 0%, rgba(190,105,20,0.10) 40%, transparent 100%)", filter: "blur(10px)" }} />
      {[0,1,2,3,4].map(i => (
        <motion.div key={i}
          className="absolute bottom-0 rounded-full"
          style={{ left: `${12 + i * 18}%`, width: 55 + i * 18, height: 75 + i * 12,
            background: "radial-gradient(ellipse, rgba(210,120,30,0.18) 0%, transparent 70%)",
            filter: "blur(18px)" }}
          animate={{ y: [0, -25, -55], opacity: [0, 0.75, 0], scaleX: [1, 1.4, 1.9] }}
          transition={{ duration: 5 + i * 0.8, delay: i * 0.9, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// Grille topographique du désert
function DuneGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.018]"
      style={{ backgroundImage: `linear-gradient(rgba(201,131,74,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,131,74,0.5) 1px, transparent 1px)`, backgroundSize: "72px 72px" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   MONARCH'S CONSTELLATION BACKGROUND
───────────────────────────────────────────────────────────── */

const CONSTELLATION_STARS = [
  { x: 15, y: 12 }, { x: 28, y: 8  }, { x: 42, y: 15 }, { x: 55, y: 6  },
  { x: 68, y: 18 }, { x: 82, y: 10 }, { x: 20, y: 35 }, { x: 35, y: 45 },
  { x: 50, y: 38 }, { x: 65, y: 42 }, { x: 78, y: 35 }, { x: 10, y: 62 },
  { x: 25, y: 70 }, { x: 40, y: 65 }, { x: 58, y: 72 }, { x: 72, y: 60 },
  { x: 88, y: 68 }, { x: 18, y: 82 }, { x: 45, y: 88 }, { x: 70, y: 85 },
  { x: 90, y: 25 }, { x: 8,  y: 48 },
];
const CONSTELLATION_LINES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,6],[6,7],[7,8],[8,9],[9,10],
  [1,6],[2,7],[3,8],[4,9],[5,10],
  [6,11],[11,12],[12,13],[13,14],[14,15],[15,16],
  [7,12],[8,13],[9,14],[10,15],
  [11,17],[13,18],[15,19],
  [5,20],[4,20],[0,21],[6,21],
];

function ConstellationLines() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.14 }}>
        {CONSTELLATION_LINES.map(([a, b], i) => {
          const sa = CONSTELLATION_STARS[a], sb = CONSTELLATION_STARS[b];
          return (
            <motion.line key={i}
              x1={`${sa.x}%`} y1={`${sa.y}%`}
              x2={`${sb.x}%`} y2={`${sb.y}%`}
              stroke="#818cf8" strokeWidth="0.5"
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 3 + (i % 5), delay: (i * 0.25) % 7, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
        {CONSTELLATION_STARS.map((s, i) => (
          <motion.circle key={i}
            cx={`${s.x}%`} cy={`${s.y}%`}
            r={i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.2}
            fill="white"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + (i % 4), delay: (i * 0.35) % 6, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

const COSMIC_ORBS_C = [
  { w: 420, h: 420, x: "4%",  y: "4%",  dur: 20, delay: 0,   opacity: 0.07 },
  { w: 280, h: 280, x: "64%", y: "2%",  dur: 17, delay: 3,   opacity: 0.05 },
  { w: 220, h: 220, x: "54%", y: "52%", dur: 24, delay: 1,   opacity: 0.04 },
  { w: 160, h: 160, x: "10%", y: "60%", dur: 19, delay: 4,   opacity: 0.04 },
  { w: 110, h: 110, x: "84%", y: "68%", dur: 13, delay: 2,   opacity: 0.03 },
];

function CosmicOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {COSMIC_ORBS_C.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y,
            background: "radial-gradient(circle, rgba(67,56,202,1) 0%, rgba(49,46,129,0.35) 55%, transparent 80%)",
            opacity: orb.opacity, filter: "blur(52px)" }}
          animate={{ y: [0, -18, 0, 12, 0], x: [0, 10, -8, 4, 0], scale: [1, 1.08, 0.96, 1.04, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ShootingStars() {
  const stars = Array.from({ length: 6 }, (_, i) => ({
    id: i, startX: 8 + i * 16, startY: 3 + i * 10,
    dur: 4 + i * 1.5, delay: i * 2.8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s) => (
        <motion.div key={s.id}
          className="absolute"
          style={{ left: `${s.startX}%`, top: `${s.startY}%`,
            width: 2, height: 2, background: "white", borderRadius: "50%",
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.5)" }}
          animate={{ x: [0, 180], y: [0, 110], opacity: [0, 0.9, 0], scaleX: [1, 10, 1] }}
          transition={{ duration: 1, delay: s.delay, repeat: Infinity, repeatDelay: s.dur, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function ConstellationGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.016]"
      style={{ backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`, backgroundSize: "65px 65px" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME CONFIG
───────────────────────────────────────────────────────────── */
const THEMES = {
  shadow: {
    bg:           "#04000f",
    pageBg:       "bg-[#04000f]",
    glow:         "bg-purple-900/10",
    glow2:        "bg-violet-900/8",
    border:       "border-purple-500/20",
    barBorder:    "border-purple-500/10",
    barBg:        "bg-purple-950/60",
    panelBg:      "bg-[#07001a]/80",
    panelTop:     "bg-purple-950/40",
    topDot:       "bg-purple-400 shadow-[0_0_6px_2px_rgba(168,85,247,0.8)]",
    topText:      "text-purple-300/70",
    topDashes:    "bg-purple-500/30",
    dot:          "bg-purple-500 shadow-[0_0_6px_2px_rgba(168,85,247,0.8)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(168,85,247,0.4)]",
    rankBg:       "bg-purple-950/80",
    rankBorder:   "border-purple-400/60",
    rankText:     "text-purple-300",
    rankLabel:    "text-purple-400/60",
    avatarGlow:   "bg-purple-600/30",
    avatarBorder: "border-purple-400/50",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(168,85,247,0.35),inset_0_0_20px_rgba(168,85,247,0.1)]",
    avatarInner:  "border-purple-500/20",
    initialsGlow: "rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.4)",
    accentDots:   "bg-purple-500 shadow-[0_0_6px_2px_rgba(168,85,247,0.8)]",
    titleGlow:    "rgba(168,85,247,0.4)",
    roleText:     "text-purple-400",
    contactText:  "text-purple-300/60",
    contactHover: "hover:text-purple-300",
    summaryBorder:"border-purple-500/30",
    summaryText:  "text-purple-200/50",
    backText:     "text-purple-400/60 hover:text-purple-300",
    bracketText:  "text-purple-500/40",
    labelText:    "text-purple-400/50",
    skillCat:     "bg-purple-900/50 text-purple-400 border-purple-500/20",
    skillVal:     "text-purple-300",
    skillBar:     "linear-gradient(90deg, #6d28d9, #a855f7, #c084fc)",
    langBar:      "linear-gradient(90deg, #4c1d95, #7c3aed)",
    langVal:      "text-purple-400/60",
    badge:        "bg-purple-900/40 text-purple-300 border-purple-500/20",
    interest:     "bg-violet-950/60 text-violet-300/70 border-violet-500/15",
    timelineLine: "border-purple-500/20",
    timelineDot:  "bg-purple-900 border-purple-400/60 shadow-[0_0_8px_2px_rgba(168,85,247,0.5)]",
    periodBadge:  "bg-purple-900/40 text-purple-400/60 border-purple-500/20",
    companyText:  "text-purple-300/50",
    missionDot:   "text-purple-500/50",
    missionText:  "text-purple-200/50",
    eduYear:      "bg-purple-900/50 border-purple-500/20 text-purple-400",
    eduLine:      "border-purple-500/15",
    eduSchool:    "text-purple-300/50",
    sysMsg:       "border-purple-500/10 bg-[#07001a]/60",
    sysMsgLabel:  "text-purple-400/30",
    sysMsgText:   "text-purple-300/40",
    dividerLine:  "bg-purple-500",
    dividerDot:   "text-purple-400",
    decorRune:    "text-purple-500/20",
    sectionLabel: "Fiche du Chasseur",
    expLabel:     "Quêtes accomplies",
    eduLabel:     "Progression — Formations",
    skillLabel:   "Capacités",
    langLabel:    "Langues",
    softLabel:    "Attributs spéciaux",
    sysMsgQ:      "\"Le Chasseur a prouvé sa valeur lors de nombreuses quêtes. Son potentiel dépasse les limites du rang S.\"",
    backLabel:    "[ RETOUR À LA GUILDE ]",
    decorator:    "◈",
    bullet:       "▸",
    cardInitBorder: "border-purple-400/50 bg-black/60",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(168,85,247,0.35)]",
    cardInitInner:  "border-purple-500/20",
    cardInitGlow:   "rgba(168,85,247,0.9)",
  },
  itachi: {
    bg:           "#0a0508",
    pageBg:       "bg-[#0a0508]",
    glow:         "bg-rose-950/8",
    glow2:        "bg-red-950/6",
    border:       "border-rose-900/20",
    barBorder:    "border-rose-900/10",
    barBg:        "bg-rose-950/40",
    panelBg:      "bg-[#110810]/80",
    panelTop:     "bg-rose-950/30",
    topDot:       "bg-rose-700 shadow-[0_0_5px_2px_rgba(159,18,57,0.6)]",
    topText:      "text-rose-300/50",
    topDashes:    "bg-rose-900/25",
    dot:          "bg-rose-700 shadow-[0_0_5px_2px_rgba(159,18,57,0.6)]",
    rankGlow:     "shadow-[0_0_16px_4px_rgba(136,19,55,0.45)]",
    rankBg:       "bg-rose-950/80",
    rankBorder:   "border-rose-700/45",
    rankText:     "text-rose-300",
    rankLabel:    "text-rose-400/45",
    avatarGlow:   "bg-rose-900/20",
    avatarBorder: "border-rose-700/45",
    avatarShadow: "shadow-[0_0_35px_8px_rgba(136,19,55,0.35),inset_0_0_16px_rgba(159,18,57,0.08)]",
    avatarInner:  "border-rose-900/20",
    initialsGlow: "rgba(190,18,60,0.8), 0 0 35px rgba(136,19,55,0.45)",
    accentDots:   "bg-rose-700 shadow-[0_0_5px_2px_rgba(159,18,57,0.6)]",
    titleGlow:    "rgba(136,19,55,0.4)",
    roleText:     "text-rose-400",
    contactText:  "text-rose-300/50",
    contactHover: "hover:text-rose-200",
    summaryBorder:"border-rose-900/25",
    summaryText:  "text-rose-100/40",
    backText:     "text-rose-400/50 hover:text-rose-300",
    bracketText:  "text-rose-800/35",
    labelText:    "text-rose-400/40",
    skillCat:     "bg-rose-950/50 text-rose-400 border-rose-900/20",
    skillVal:     "text-rose-300",
    skillBar:     "linear-gradient(90deg, #4c0519, #881337, #be123c)",
    langBar:      "linear-gradient(90deg, #27040f, #6b1230)",
    langVal:      "text-rose-400/50",
    badge:        "bg-rose-950/40 text-rose-300 border-rose-900/20",
    interest:     "bg-rose-950/30 text-rose-300/55 border-rose-900/12",
    timelineLine: "border-rose-900/20",
    timelineDot:  "bg-rose-950 border-rose-700/45 shadow-[0_0_7px_2px_rgba(136,19,55,0.4)]",
    periodBadge:  "bg-rose-950/40 text-rose-400/55 border-rose-900/20",
    companyText:  "text-rose-300/40",
    missionDot:   "text-rose-800/45",
    missionText:  "text-rose-100/40",
    eduYear:      "bg-rose-950/45 border-rose-900/20 text-rose-400",
    eduLine:      "border-rose-900/15",
    eduSchool:    "text-rose-300/40",
    sysMsg:       "border-rose-900/10 bg-[#110810]/50",
    sysMsgLabel:  "text-rose-500/22",
    sysMsgText:   "text-rose-300/30",
    dividerLine:  "bg-rose-800",
    dividerDot:   "text-rose-700",
    decorRune:    "text-rose-900/18",
    sectionLabel: "Dossier de l'Ombre",
    expLabel:     "Missions Accomplies",
    eduLabel:     "Formations",
    skillLabel:   "Techniques",
    langLabel:    "Langues",
    softLabel:    "Attributs",
    sysMsgQ:      "\"Je ne te demande pas de me comprendre. Pardonne-moi, Sasuke. C'est la dernière fois.\"",
    backLabel:    "← RETOUR AU CLAN",
    decorator:    "卍",
    bullet:       "▸",
    cardInitBorder: "border-rose-700/45 bg-rose-950/60",
    cardInitShadow: "shadow-[0_0_20px_5px_rgba(136,19,55,0.35)]",
    cardInitInner:  "border-rose-900/18",
    cardInitGlow:   "rgba(190,18,60,0.8)",
  },
  gojo: {
    bg:           "#000814",
    pageBg:       "bg-[#000814]",
    glow:         "bg-sky-900/10",
    glow2:        "bg-indigo-900/8",
    border:       "border-sky-500/20",
    barBorder:    "border-sky-500/10",
    barBg:        "bg-sky-950/60",
    panelBg:      "bg-[#000d1f]/85",
    panelTop:     "bg-sky-950/50",
    topDot:       "bg-sky-400 shadow-[0_0_6px_2px_rgba(56,189,248,0.9)]",
    topText:      "text-sky-300/70",
    topDashes:    "bg-sky-600/30",
    dot:          "bg-sky-400 shadow-[0_0_6px_2px_rgba(56,189,248,0.9)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(14,165,233,0.55)]",
    rankBg:       "bg-sky-950/90",
    rankBorder:   "border-sky-400/70",
    rankText:     "text-sky-200",
    rankLabel:    "text-sky-400/60",
    avatarGlow:   "bg-sky-600/25",
    avatarBorder: "border-sky-300/60",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(14,165,233,0.5),inset_0_0_20px_rgba(56,189,248,0.12)]",
    avatarInner:  "border-sky-500/20",
    initialsGlow: "rgba(125,211,252,1), 0 0 40px rgba(14,165,233,0.6)",
    accentDots:   "bg-sky-400 shadow-[0_0_6px_2px_rgba(56,189,248,0.9)]",
    titleGlow:    "rgba(14,165,233,0.5)",
    roleText:     "text-sky-400",
    contactText:  "text-sky-300/60",
    contactHover: "hover:text-sky-200",
    summaryBorder:"border-sky-500/25",
    summaryText:  "text-sky-100/50",
    backText:     "text-sky-400/60 hover:text-sky-300",
    bracketText:  "text-sky-500/40",
    labelText:    "text-sky-400/50",
    skillCat:     "bg-sky-950/60 text-sky-400 border-sky-600/20",
    skillVal:     "text-sky-300",
    skillBar:     "linear-gradient(90deg, #0c4a6e, #0ea5e9, #7dd3fc)",
    langBar:      "linear-gradient(90deg, #082f49, #0369a1)",
    langVal:      "text-sky-400/60",
    badge:        "bg-sky-950/50 text-sky-300 border-sky-600/20",
    interest:     "bg-indigo-950/50 text-indigo-300/70 border-indigo-600/15",
    timelineLine: "border-sky-600/20",
    timelineDot:  "bg-sky-950 border-sky-400/70 shadow-[0_0_8px_2px_rgba(14,165,233,0.55)]",
    periodBadge:  "bg-sky-950/60 text-sky-400/70 border-sky-600/20",
    companyText:  "text-sky-300/50",
    missionDot:   "text-sky-500/50",
    missionText:  "text-sky-100/50",
    eduYear:      "bg-sky-950/60 border-sky-600/20 text-sky-400",
    eduLine:      "border-sky-700/15",
    eduSchool:    "text-sky-300/50",
    sysMsg:       "border-sky-600/10 bg-[#000d1f]/60",
    sysMsgLabel:  "text-sky-400/30",
    sysMsgText:   "text-sky-300/40",
    dividerLine:  "bg-sky-500",
    dividerDot:   "text-sky-400",
    decorRune:    "text-sky-500/20",
    sectionLabel: "Dossier — Le Plus Fort",
    expLabel:     "Techniques Manifestées",
    eduLabel:     "Formations",
    skillLabel:   "Techniques Maudites",
    langLabel:    "Langues",
    softLabel:    "Attributs Spéciaux",
    sysMsgQ:      "\"Désolé... c'est parce que je suis le plus fort. Partout sous les cieux, moi seul suis l'honoré.\"",
    backLabel:    "← RETOUR AU DOJO",
    decorator:    "◎",
    bullet:       "▸",
    cardInitBorder: "border-sky-400/55 bg-sky-950/70",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(14,165,233,0.45)]",
    cardInitInner:  "border-sky-500/20",
    cardInitGlow:   "rgba(125,211,252,1)",
  },
  beast: {
    bg:           "#020800",
    pageBg:       "bg-[#020800]",
    glow:         "bg-amber-900/10",
    glow2:        "bg-yellow-900/8",
    border:       "border-amber-700/25",
    barBorder:    "border-amber-700/15",
    barBg:        "bg-amber-950/60",
    panelBg:      "bg-[#0a0500]/85",
    panelTop:     "bg-amber-950/60",
    topDot:       "bg-amber-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.9)]",
    topText:      "text-amber-300/70",
    topDashes:    "bg-amber-600/30",
    dot:          "bg-amber-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.9)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(217,119,6,0.6)]",
    rankBg:       "bg-amber-950/90",
    rankBorder:   "border-amber-400/70",
    rankText:     "text-amber-300",
    rankLabel:    "text-amber-400/60",
    avatarGlow:   "bg-amber-700/30",
    avatarBorder: "border-amber-400/60",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(217,119,6,0.5),inset_0_0_20px_rgba(217,119,6,0.12)]",
    avatarInner:  "border-amber-600/20",
    initialsGlow: "rgba(251,191,36,0.95), 0 0 40px rgba(217,119,6,0.6)",
    accentDots:   "bg-amber-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.9)]",
    titleGlow:    "rgba(217,119,6,0.55)",
    roleText:     "text-amber-400",
    contactText:  "text-amber-300/60",
    contactHover: "hover:text-amber-300",
    summaryBorder:"border-amber-600/30",
    summaryText:  "text-amber-100/50",
    backText:     "text-amber-400/60 hover:text-amber-300",
    bracketText:  "text-amber-600/40",
    labelText:    "text-amber-400/50",
    skillCat:     "bg-amber-950/60 text-amber-400 border-amber-700/25",
    skillVal:     "text-amber-300",
    skillBar:     "linear-gradient(90deg, #78350f, #d97706, #fbbf24)",
    langBar:      "linear-gradient(90deg, #451a03, #b45309)",
    langVal:      "text-amber-400/60",
    badge:        "bg-amber-950/50 text-amber-300 border-amber-700/25",
    interest:     "bg-yellow-950/50 text-yellow-300/70 border-yellow-800/15",
    timelineLine: "border-amber-700/25",
    timelineDot:  "bg-amber-950 border-amber-400/70 shadow-[0_0_8px_2px_rgba(217,119,6,0.6)]",
    periodBadge:  "bg-amber-950/60 text-amber-400/70 border-amber-700/25",
    companyText:  "text-amber-300/50",
    missionDot:   "text-amber-600/50",
    missionText:  "text-amber-100/50",
    eduYear:      "bg-amber-950/60 border-amber-700/25 text-amber-400",
    eduLine:      "border-amber-800/20",
    eduSchool:    "text-amber-300/50",
    sysMsg:       "border-amber-700/12 bg-[#0a0500]/60",
    sysMsgLabel:  "text-amber-400/30",
    sysMsgText:   "text-amber-300/40",
    dividerLine:  "bg-amber-600",
    dividerDot:   "text-amber-500",
    decorRune:    "text-amber-700/25",
    sectionLabel: "Dossier du Monarque",
    expLabel:     "Conquêtes",
    eduLabel:     "Formations",
    skillLabel:   "Compétences",
    langLabel:    "Langues",
    softLabel:    "Attributs",
    sysMsgQ:      "\"Dans les profondeurs de la nuit, le Monarque des Bêtes veille. Sa puissance n'est pas dans la force brute — elle est dans l'instinct aiguisé.\"",
    backLabel:    "← RETOUR À LA MEUTE",
    decorator:    "⌇",
    bullet:       "▸",
    cardInitBorder: "border-amber-400/55 bg-amber-950/70",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(217,119,6,0.4)]",
    cardInitInner:  "border-amber-600/20",
    cardInitGlow:   "rgba(251,191,36,0.95)",
  },
  antares: {
    bg:           "#0a0000",
    pageBg:       "bg-[#0a0000]",
    glow:         "bg-red-900/10",
    glow2:        "bg-orange-900/8",
    border:       "border-red-700/25",
    barBorder:    "border-red-700/15",
    barBg:        "bg-red-950/60",
    panelBg:      "bg-[#1a0000]/80",
    panelTop:     "bg-red-950/50",
    topDot:       "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.9)]",
    topText:      "text-red-300/70",
    topDashes:    "bg-red-600/30",
    dot:          "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.9)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(220,38,38,0.5)]",
    rankBg:       "bg-red-950/90",
    rankBorder:   "border-red-500/70",
    rankText:     "text-red-300",
    rankLabel:    "text-red-400/60",
    avatarGlow:   "bg-red-700/30",
    avatarBorder: "border-red-500/60",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(220,38,38,0.45),inset_0_0_20px_rgba(220,38,38,0.12)]",
    avatarInner:  "border-red-600/20",
    initialsGlow: "rgba(239,68,68,0.9), 0 0 40px rgba(220,38,38,0.5)",
    accentDots:   "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.9)]",
    titleGlow:    "rgba(220,38,38,0.5)",
    roleText:     "text-red-400",
    contactText:  "text-red-300/60",
    contactHover: "hover:text-red-300",
    summaryBorder:"border-red-600/30",
    summaryText:  "text-red-200/50",
    backText:     "text-red-400/60 hover:text-red-300",
    bracketText:  "text-red-600/40",
    labelText:    "text-red-400/50",
    skillCat:     "bg-red-950/60 text-red-400 border-red-600/20",
    skillVal:     "text-red-300",
    skillBar:     "linear-gradient(90deg, #7f1d1d, #dc2626, #f87171)",
    langBar:      "linear-gradient(90deg, #450a0a, #b91c1c)",
    langVal:      "text-red-400/60",
    badge:        "bg-red-950/50 text-red-300 border-red-600/20",
    interest:     "bg-orange-950/50 text-orange-300/70 border-orange-700/15",
    timelineLine: "border-red-700/25",
    timelineDot:  "bg-red-950 border-red-500/70 shadow-[0_0_8px_2px_rgba(220,38,38,0.55)]",
    periodBadge:  "bg-red-950/60 text-red-400/70 border-red-600/25",
    companyText:  "text-red-300/50",
    missionDot:   "text-red-600/50",
    missionText:  "text-red-200/50",
    eduYear:      "bg-red-950/60 border-red-600/25 text-red-400",
    eduLine:      "border-red-700/15",
    eduSchool:    "text-red-300/50",
    sysMsg:       "border-red-700/12 bg-[#1a0000]/60",
    sysMsgLabel:  "text-red-400/30",
    sysMsgText:   "text-red-300/40",
    dividerLine:  "bg-red-600",
    dividerDot:   "text-red-500",
    decorRune:    "text-red-600/20",
    sectionLabel: "Dossier de l'Étoile",
    expLabel:     "Trajectoire",
    eduLabel:     "Formations",
    skillLabel:   "Compétences",
    langLabel:    "Langues",
    softLabel:    "Attributs",
    sysMsgQ:      "\"Comme Antares brûle dans la nuit, certains destins illuminent leur époque par leur intensité et leur chaleur.\"",
    backLabel:    "← RETOUR À L'ÉQUIPE",
    decorator:    "✦",
    bullet:       "▸",
    cardInitBorder: "border-red-500/50 bg-red-950/60",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(220,38,38,0.35)]",
    cardInitInner:  "border-red-600/20",
    cardInitGlow:   "rgba(220,38,38,0.9)",
  },
  "real-madrid": {
    bg:           "#00091a",
    pageBg:       "bg-[#00091a]",
    glow:         "bg-yellow-400/5",
    glow2:        "bg-blue-900/8",
    border:       "border-yellow-400/20",
    barBorder:    "border-yellow-400/10",
    barBg:        "bg-blue-950/60",
    panelBg:      "bg-[#00091a]/90",
    panelTop:     "bg-[#041E42]/80",
    topDot:       "bg-yellow-400 shadow-[0_0_6px_2px_rgba(212,175,55,0.8)]",
    topText:      "text-yellow-300/60",
    topDashes:    "bg-yellow-500/20",
    dot:          "bg-yellow-400 shadow-[0_0_6px_2px_rgba(212,175,55,0.8)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(212,175,55,0.4)]",
    rankBg:       "bg-[#041E42]/90",
    rankBorder:   "border-yellow-400/60",
    rankText:     "text-yellow-300",
    rankLabel:    "text-yellow-400/60",
    avatarGlow:   "bg-yellow-400/15",
    avatarBorder: "border-yellow-400/60",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(212,175,55,0.3),inset_0_0_20px_rgba(212,175,55,0.08)]",
    avatarInner:  "border-yellow-400/20",
    initialsGlow: "rgba(212,175,55,0.9), 0 0 40px rgba(212,175,55,0.4)",
    accentDots:   "bg-yellow-400 shadow-[0_0_6px_2px_rgba(212,175,55,0.8)]",
    titleGlow:    "rgba(212,175,55,0.3)",
    roleText:     "text-yellow-400",
    contactText:  "text-yellow-300/50",
    contactHover: "hover:text-yellow-300",
    summaryBorder:"border-yellow-400/25",
    summaryText:  "text-white/40",
    backText:     "text-yellow-400/60 hover:text-yellow-300",
    bracketText:  "text-yellow-400/30",
    labelText:    "text-yellow-300/50",
    skillCat:     "bg-[#041E42]/80 text-yellow-400 border-yellow-500/20",
    skillVal:     "text-yellow-300",
    skillBar:     "linear-gradient(90deg, #b8860b, #D4AF37, #f5e06e)",
    langBar:      "linear-gradient(90deg, #041E42, #1a4080)",
    langVal:      "text-yellow-400/50",
    badge:        "bg-yellow-400/8 text-yellow-300 border-yellow-400/20",
    interest:     "bg-[#041E42]/60 text-blue-300/70 border-blue-500/15",
    timelineLine: "border-yellow-400/15",
    timelineDot:  "bg-[#041E42] border-yellow-400/60 shadow-[0_0_8px_2px_rgba(212,175,55,0.4)]",
    periodBadge:  "bg-[#041E42]/80 text-yellow-400/70 border-yellow-400/20",
    companyText:  "text-yellow-300/40",
    missionDot:   "text-yellow-400/40",
    missionText:  "text-white/40",
    eduYear:      "bg-[#041E42]/80 border-yellow-400/20 text-yellow-400",
    eduLine:      "border-yellow-400/10",
    eduSchool:    "text-yellow-300/40",
    sysMsg:       "border-yellow-400/8 bg-[#041E42]/30",
    sysMsgLabel:  "text-yellow-400/25",
    sysMsgText:   "text-white/30",
    dividerLine:  "bg-yellow-400",
    dividerDot:   "text-yellow-400",
    decorRune:    "text-yellow-400/15",
    sectionLabel: "Dossier du Joueur",
    expLabel:     "Palmarès & Expériences",
    eduLabel:     "Formations",
    skillLabel:   "Compétences Techniques",
    langLabel:    "Langues",
    softLabel:    "Qualités",
    sysMsgQ:      "\"Hala Madrid. Un professionnel rigoureux, prêt à défendre les couleurs de n'importe quelle équipe.\"",
    backLabel:    "← RETOUR À L'ÉQUIPE",
    decorator:    "★",
    bullet:       "▶",
    cardInitBorder: "border-yellow-400/50 bg-[#041E42]/60",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(212,175,55,0.3)]",
    cardInitInner:  "border-yellow-400/15",
    cardInitGlow:   "rgba(212,175,55,0.9)",
  },
  dune: {
    bg:           "#150d02",
    pageBg:       "bg-[#150d02]",
    glow:         "bg-amber-800/12",
    glow2:        "bg-orange-800/10",
    border:       "border-amber-600/30",
    barBorder:    "border-amber-600/18",
    barBg:        "bg-amber-900/40",
    panelBg:      "bg-[#1e1002]/80",
    panelTop:     "bg-amber-900/40",
    topDot:       "bg-amber-500 shadow-[0_0_6px_2px_rgba(201,131,74,0.8)]",
    topText:      "text-amber-200/60",
    topDashes:    "bg-amber-700/25",
    dot:          "bg-amber-500 shadow-[0_0_6px_2px_rgba(201,131,74,0.8)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(201,131,74,0.45)]",
    rankBg:       "bg-amber-950/85",
    rankBorder:   "border-amber-500/65",
    rankText:     "text-amber-200",
    rankLabel:    "text-amber-400/55",
    avatarGlow:   "bg-amber-700/20",
    avatarBorder: "border-amber-500/55",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(201,131,74,0.4),inset_0_0_20px_rgba(201,131,74,0.1)]",
    avatarInner:  "border-amber-600/18",
    initialsGlow: "rgba(212,149,106,0.9), 0 0 40px rgba(201,131,74,0.5)",
    accentDots:   "bg-amber-500 shadow-[0_0_6px_2px_rgba(201,131,74,0.8)]",
    titleGlow:    "rgba(201,131,74,0.45)",
    roleText:     "text-amber-400",
    contactText:  "text-amber-300/55",
    contactHover: "hover:text-amber-200",
    summaryBorder:"border-amber-700/25",
    summaryText:  "text-amber-100/45",
    backText:     "text-amber-400/55 hover:text-amber-300",
    bracketText:  "text-amber-600/35",
    labelText:    "text-amber-400/45",
    skillCat:     "bg-amber-950/55 text-amber-400 border-amber-700/22",
    skillVal:     "text-amber-300",
    skillBar:     "linear-gradient(90deg, #6b2a04, #c9834a, #e8c878)",
    langBar:      "linear-gradient(90deg, #3d1a02, #8b5a2b)",
    langVal:      "text-amber-400/55",
    badge:        "bg-amber-950/45 text-amber-300 border-amber-700/20",
    interest:     "bg-orange-950/40 text-orange-300/65 border-orange-800/12",
    timelineLine: "border-amber-700/20",
    timelineDot:  "bg-amber-950 border-amber-500/65 shadow-[0_0_8px_2px_rgba(201,131,74,0.5)]",
    periodBadge:  "bg-amber-950/55 text-amber-400/65 border-amber-700/20",
    companyText:  "text-amber-300/45",
    missionDot:   "text-amber-600/45",
    missionText:  "text-amber-100/45",
    eduYear:      "bg-amber-950/55 border-amber-700/22 text-amber-400",
    eduLine:      "border-amber-800/18",
    eduSchool:    "text-amber-300/45",
    sysMsg:       "border-amber-600/18 bg-[#1e1002]/55",
    sysMsgLabel:  "text-amber-400/28",
    sysMsgText:   "text-amber-300/38",
    dividerLine:  "bg-amber-600",
    dividerDot:   "text-amber-500",
    decorRune:    "text-amber-700/22",
    sectionLabel: "Chroniques d'Arrakis",
    expLabel:     "Épreuves du Désert",
    eduLabel:     "Formations",
    skillLabel:   "Dons du Kwisatz Haderach",
    langLabel:    "Langues",
    softLabel:    "Vertus Fremen",
    sysMsgQ:      "\"Je dois ne pas avoir peur. La peur tue l'esprit. La peur est la petite mort qui entraîne l'oblitération totale.\"",
    backLabel:    "← RETOUR AU SIETCH",
    decorator:    "⊕",
    bullet:       "▸",
    cardInitBorder: "border-amber-500/50 bg-amber-950/60",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(201,131,74,0.35)]",
    cardInitInner:  "border-amber-600/18",
    cardInitGlow:   "rgba(212,149,106,0.9)",
  },
  constellation: {
    bg:           "#02000d",
    pageBg:       "bg-[#02000d]",
    glow:         "bg-indigo-900/10",
    glow2:        "bg-violet-900/8",
    border:       "border-indigo-500/20",
    barBorder:    "border-indigo-500/10",
    barBg:        "bg-indigo-950/60",
    panelBg:      "bg-[#080218]/85",
    panelTop:     "bg-indigo-950/50",
    topDot:       "bg-indigo-400 shadow-[0_0_6px_2px_rgba(99,102,241,0.8)]",
    topText:      "text-indigo-300/70",
    topDashes:    "bg-indigo-500/30",
    dot:          "bg-indigo-400 shadow-[0_0_6px_2px_rgba(99,102,241,0.8)]",
    rankGlow:     "shadow-[0_0_20px_4px_rgba(99,102,241,0.45)]",
    rankBg:       "bg-indigo-950/80",
    rankBorder:   "border-indigo-400/60",
    rankText:     "text-indigo-200",
    rankLabel:    "text-indigo-400/60",
    avatarGlow:   "bg-indigo-700/25",
    avatarBorder: "border-indigo-400/50",
    avatarShadow: "shadow-[0_0_40px_8px_rgba(99,102,241,0.35),inset_0_0_20px_rgba(99,102,241,0.1)]",
    avatarInner:  "border-indigo-500/20",
    initialsGlow: "rgba(99,102,241,0.9), 0 0 40px rgba(99,102,241,0.4)",
    accentDots:   "bg-indigo-400 shadow-[0_0_6px_2px_rgba(99,102,241,0.8)]",
    titleGlow:    "rgba(99,102,241,0.4)",
    roleText:     "text-indigo-400",
    contactText:  "text-indigo-300/60",
    contactHover: "hover:text-indigo-200",
    summaryBorder:"border-indigo-500/25",
    summaryText:  "text-indigo-100/45",
    backText:     "text-indigo-400/60 hover:text-indigo-300",
    bracketText:  "text-indigo-500/40",
    labelText:    "text-indigo-400/50",
    skillCat:     "bg-indigo-950/60 text-indigo-400 border-indigo-500/20",
    skillVal:     "text-indigo-300",
    skillBar:     "linear-gradient(90deg, #312e81, #4338ca, #818cf8)",
    langBar:      "linear-gradient(90deg, #1e1b4b, #3730a3)",
    langVal:      "text-indigo-400/60",
    badge:        "bg-indigo-950/50 text-indigo-300 border-indigo-500/20",
    interest:     "bg-indigo-950/40 text-indigo-300/70 border-indigo-500/15",
    timelineLine: "border-indigo-500/20",
    timelineDot:  "bg-indigo-950 border-indigo-400/60 shadow-[0_0_8px_2px_rgba(99,102,241,0.5)]",
    periodBadge:  "bg-indigo-950/50 text-indigo-400/60 border-indigo-500/20",
    companyText:  "text-indigo-300/50",
    missionDot:   "text-indigo-500/50",
    missionText:  "text-indigo-200/50",
    eduYear:      "bg-indigo-950/60 border-indigo-500/20 text-indigo-400",
    eduLine:      "border-indigo-500/15",
    eduSchool:    "text-indigo-300/50",
    sysMsg:       "border-indigo-500/10 bg-[#080218]/60",
    sysMsgLabel:  "text-indigo-400/30",
    sysMsgText:   "text-indigo-300/40",
    dividerLine:  "bg-indigo-500",
    dividerDot:   "text-indigo-400",
    decorRune:    "text-indigo-500/20",
    sectionLabel: "Carte Stellaire du Monarque",
    expLabel:     "Conquêtes Célestes",
    eduLabel:     "Formations",
    skillLabel:   "Capacités",
    langLabel:    "Langues",
    softLabel:    "Attributs",
    sysMsgQ:      "\"Dans l'immensité du cosmos, le Monarque trace son chemin entre les étoiles. Son pouvoir transcende les constellations elles-mêmes.\"",
    backLabel:    "[ RETOUR AUX ÉTOILES ]",
    decorator:    "✦",
    bullet:       "✦",
    cardInitBorder: "border-indigo-400/50 bg-black/70",
    cardInitShadow: "shadow-[0_0_24px_6px_rgba(99,102,241,0.35)]",
    cardInitInner:  "border-indigo-500/20",
    cardInitGlow:   "rgba(99,102,241,0.9)",
  },
};

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────── */
const Scanlines = ({ opacity = "opacity-[0.03]" }) => (
  <div className={`pointer-events-none absolute inset-0 z-0 ${opacity}`}
    style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 4px)" }} />
);

function SysWindow({ title, children, delay = 0, className = "", t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className={`relative border ${t.border} rounded-xl ${t.panelBg} backdrop-blur-sm overflow-hidden ${className}`}
    >
      <Scanlines />
      <div className={`relative z-10 flex items-center gap-2 px-4 py-2.5 border-b ${t.border} ${t.panelTop}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${t.topDot}`} />
        <span className={`text-[10px] font-mono ${t.topText} uppercase tracking-[0.2em]`}>{title}</span>
        <div className="ml-auto flex gap-1">
          {[...Array(3)].map((_, i) => <div key={i} className={`w-4 h-px ${t.topDashes}`} />)}
        </div>
      </div>
      <div className="relative z-10 p-5">{children}</div>
    </motion.div>
  );
}

function SkillBar({ name, level, category, delay = 0, t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/90 font-medium">{name}</span>
          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${t.skillCat}`}>{category}</span>
        </div>
        <span className={`text-xs font-mono ${t.skillVal}`}>{level}%</span>
      </div>
      <div className={`h-1.5 rounded-full ${t.barBg} border ${t.barBorder} overflow-hidden`}>
        <motion.div className="h-full rounded-full"
          style={{ background: t.skillBar }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Divider({ t }) {
  return (
    <div className="flex items-center gap-3 my-5 opacity-30">
      <div className={`flex-1 h-px bg-gradient-to-r from-transparent to-${t.dividerLine}`} style={{ background: `linear-gradient(to right, transparent, currentColor)` }} />
      <span className={`${t.dividerDot} text-xs font-mono`}>{t.decorator}</span>
      <div style={{ background: `linear-gradient(to left, transparent, currentColor)` }} className={`flex-1 h-px ${t.dividerDot}`} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function TeamShow({ member }) {
  // Normalize camelCase fields from DB snake_case aliases
  if (member) {
    member.rankBg      = member.rankBg      ?? member.rank_bg;
    member.rankText    = member.rankText    ?? member.rank_text;
    member.rankBorder  = member.rankBorder  ?? member.rank_border;
    member.shadowTitle = member.shadowTitle ?? member.shadow_title;
    member.softSkills  = member.softSkills  ?? member.soft_skills ?? [];
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#04000f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 font-mono mb-4">[ DOSSIER INTROUVABLE ]</p>
          <Link href="/" className="text-white/50 hover:text-white underline">← Retour</Link>
        </div>
      </div>
    );
  }

  const t               = THEMES[member.theme] ?? THEMES.shadow;
  const isRM            = member.theme === "real-madrid";
  const isAntares       = member.theme === "antares";
  const isBeast         = member.theme === "beast";
  const isGojo          = member.theme === "gojo";
  const isItachi        = member.theme === "itachi";
  const isDune          = member.theme === "dune";
  const isConstellation = member.theme === "constellation";

  return (
    <div className={`min-h-screen ${t.pageBg} relative overflow-x-hidden`}>
      <Head title={`${member.name} — ${member.role} · KoriLab`} />

      {/* ── Shadow Monarch background animations ── */}
      {!isRM && !isAntares && !isBeast && !isGojo && !isItachi && !isDune && !isConstellation && (
        <>
          <ShadowGrid />
          <ShadowOrbs />
          <RuneParticles />
        </>
      )}

      {/* ── Monarch's Constellation background ── */}
      {isConstellation && (
        <>
          <ConstellationGrid />
          <CosmicOrbs />
          <ConstellationLines />
          <ShootingStars />
          {/* Indigo top line */}
          <div className="fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* ── Itachi Uchiha — Amaterasu background ── */}
      {isItachi && (
        <>
          <ItachiGrid />
          <SharinganOrbs />
          <CrowFeathers />
          <AmatsuFlames />
          {/* Sharingan red top line */}
          <div className="fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* ── Gojo Satoru — Géométrie Sacrée / Limitless V5 ── */}
      {isGojo && (
        <>
          <GojoGrid />
          <GojoOrbs />
          <RotatingHexagons />
          <SixEyes />
          <GeoParticles />
          {/* Electric blue top line */}
          <div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* ── Beast Monarch background ── */}
      {isBeast && (
        <>
          <BeastGrid />
          <BeastOrbs />
          <BeastEyes />
          <ClawParticles />
          {/* Amber top line */}
          <div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/45 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* ── Antares background ── */}
      {isAntares && (
        <>
          <AntaresGrid />
          <AntaresOrbs />
          <AntaresStars />
          <div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* ── Dune — Sables d'Arrakis background ── */}
      {isDune && (
        <>
          <DuneGrid />
          <SpiceOrbs />
          <SandGrains />
          <SpiceVapor />
          {/* Ligne de chaleur en haut — or sable */}
          <div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent pointer-events-none z-0" />
        </>
      )}

      {/* ── Real Madrid background ── */}
      {isRM && (
        <>
          {/* Gold top line */}
          <div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent pointer-events-none z-0" />
          {/* Subtle grid */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(rgba(212,175,55,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.6) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          {/* Navy glow orbs */}
          <div className="fixed top-0 left-1/4 w-[500px] h-[300px] bg-[#041E42]/30 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="fixed bottom-0 right-1/4 w-[400px] h-[300px] bg-yellow-400/3 rounded-full blur-[120px] pointer-events-none z-0" />
        </>
      )}

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/#team" className={`inline-flex items-center gap-2 text-sm font-mono ${t.backText} transition-colors mb-10 group`}>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t.backLabel}
          </Link>
        </motion.div>

        {/* ── HERO BANNER ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className={`relative rounded-2xl overflow-hidden mb-8 border ${t.border}`}>

          <div className={`h-64 bg-gradient-to-br ${member.gradient} relative`}>
            <Scanlines opacity={isRM ? "opacity-[0.025]" : "opacity-[0.04]"} />

            {/* Real Madrid: gold top line */}
            {isRM && <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />}

            {/* Corner decorators */}
            {["top-3 left-4","top-3 right-20","bottom-3 left-4","bottom-3 right-4"].map((pos, i) => (
              <span key={i} className={`absolute ${pos} ${t.decorRune} font-mono text-sm select-none`}>{t.decorator}</span>
            ))}

            {/* Rank badge */}
            <div className="absolute top-5 right-5 flex flex-col items-center gap-1">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full ${t.rankBg} border-2 ${t.rankBorder} flex items-center justify-center ${t.rankGlow}`}>
                  <span className={`text-xl font-black ${t.rankText}`}>{member.rank}</span>
                </div>
                <div className={`absolute inset-0 rounded-full border ${t.rankBorder} scale-110 opacity-30`} />
              </div>
              <span className={`text-[9px] font-mono ${t.rankLabel} uppercase tracking-widest`}>RANK</span>
            </div>

            {/* Avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full ${t.avatarGlow} blur-3xl scale-[2]`} />
                {member.emoji ? (
                  <span className="relative text-8xl drop-shadow-2xl">{member.emoji}</span>
                ) : (
                  <div className={`relative flex flex-col items-center justify-center w-28 h-28 rounded-full
                    ${t.rankBg} border-2 ${t.avatarBorder} ${t.avatarShadow}`}>
                    <div className={`absolute inset-2 rounded-full border ${t.avatarInner}`} />
                    <span className="relative text-3xl font-black tracking-widest text-white/90"
                      style={{ textShadow: `0 0 20px ${t.initialsGlow}` }}>
                      {member.initials}
                    </span>
                    {["-top-1 left-1/2 -translate-x-1/2", "-bottom-1 left-1/2 -translate-x-1/2", "top-1/2 -translate-y-1/2 -left-1", "top-1/2 -translate-y-1/2 -right-1"].map((p, i) => (
                      <div key={i} className={`absolute ${p} w-2 h-2 rounded-full ${t.accentDots}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Title at bottom */}
            {member.shadowTitle && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 py-3 text-center">
                <span className={`text-xs font-mono ${t.rankLabel} tracking-[0.3em] uppercase`}>
                  {t.decorator} {member.shadowTitle} {t.decorator}
                </span>
              </div>
            )}
          </div>

          {/* Info strip */}
          <div className={`${t.panelBg} border-t ${t.border} px-8 py-6`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`${t.bracketText} font-mono text-xs`}>[</span>
                  <span className={`text-[10px] font-mono ${t.labelText} uppercase tracking-[0.2em]`}>{t.sectionLabel}</span>
                  <span className={`${t.bracketText} font-mono text-xs`}>]</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1"
                  style={{ textShadow: `0 0 30px ${t.titleGlow}` }}>
                  {member.name}
                </h1>
                <p className={`text-sm font-mono font-semibold ${t.roleText} uppercase tracking-widest`}>{member.role}</p>
              </div>

              <div className="space-y-2 md:text-right">
                {member.email && (
                  <a href={`mailto:${member.email}`}
                    className={`flex md:justify-end items-center gap-2 text-sm ${t.contactText} ${t.contactHover} transition-colors`}>
                    <Mail className="w-3.5 h-3.5" />
                    {member.email}
                  </a>
                )}
                {member.phone && (
                  <div className={`flex md:justify-end items-center gap-2 text-sm ${t.contactText}`}>
                    <Phone className="w-3.5 h-3.5" />
                    {member.phone}
                  </div>
                )}
                {member.location && (
                  <div className={`flex md:justify-end items-center gap-2 text-sm ${t.contactText}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {member.location}
                  </div>
                )}
              </div>
            </div>

            {member.summary && (
              <div className={`mt-5 pl-4 border-l-2 ${t.summaryBorder}`}>
                <p className={`text-sm ${t.summaryText} leading-relaxed italic`}>{member.summary}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── GRID ── */}
        <div className="grid md:grid-cols-3 gap-5">

          {/* LEFT */}
          <div className="space-y-5">

            {member.skills?.length > 0 && (
              <SysWindow title={t.skillLabel} delay={0.1} t={t}>
                {member.skills.map((sk, i) => (
                  <SkillBar key={sk.name} {...sk} delay={0.1 + i * 0.07} t={t} />
                ))}
              </SysWindow>
            )}

            {member.languages?.length > 0 && (
              <SysWindow title={t.langLabel} delay={0.2} t={t}>
                {member.languages.map((lang, i) => (
                  <div key={lang.name} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white/80">{lang.name}</span>
                      <span className={`text-xs font-mono ${t.langVal}`}>{lang.level}</span>
                    </div>
                    <div className={`h-1 rounded-full ${t.barBg} border ${t.barBorder} overflow-hidden`}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: t.langBar }}
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percent}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </SysWindow>
            )}

            {member.softSkills?.length > 0 && (
              <SysWindow title={t.softLabel} delay={0.25} t={t}>
                <div className="flex flex-wrap gap-2">
                  {member.softSkills.map(s => (
                    <span key={s} className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${t.badge}`}>
                      {t.decorator} {s}
                    </span>
                  ))}
                </div>
                {member.interests?.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 my-4 opacity-25">
                      <div className="flex-1 h-px bg-current" />
                      <span className="text-xs">{t.decorator}</span>
                      <div className="flex-1 h-px bg-current" />
                    </div>
                    <p className={`text-[10px] font-mono ${t.labelText} uppercase tracking-widest mb-2`}>Intérêts</p>
                    <div className="flex flex-wrap gap-2">
                      {member.interests.map(interest => (
                        <span key={interest} className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${t.interest}`}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </SysWindow>
            )}
          </div>

          {/* RIGHT (2 cols) */}
          <div className="md:col-span-2 space-y-5">

            {member.experience?.length > 0 && (
              <SysWindow title={t.expLabel} delay={0.15} t={t}>
                <div className="space-y-6">
                  {member.experience.map((exp, i) => (
                    <div key={i} className={`relative pl-5 border-l ${t.timelineLine}`}>
                      <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 ${t.timelineDot}`} />
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${t.periodBadge}`}>
                          {exp.period}
                        </span>
                        <span className={`text-xs font-mono ${t.companyText}`}>{exp.company}</span>
                      </div>
                      <p className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{exp.title}</p>
                      <ul className="space-y-1">
                        {exp.missions.map((m, j) => (
                          <li key={j} className={`flex items-start gap-2 text-xs ${t.missionText} leading-relaxed`}>
                            <span className={`${t.missionDot} mt-0.5 flex-shrink-0`}>{t.bullet}</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                      {i < member.experience.length - 1 && (
                        <div className="flex items-center gap-3 my-5 opacity-20">
                          <div className="flex-1 h-px bg-current" />
                          <span className="text-xs">{t.decorator}</span>
                          <div className="flex-1 h-px bg-current" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SysWindow>
            )}

            {member.education?.length > 0 && (
              <SysWindow title={t.eduLabel} delay={0.2} t={t}>
                <div className="space-y-4">
                  {member.education.map((edu, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 text-center">
                        <span className={`text-xs font-mono font-bold border px-2 py-1 rounded block ${t.eduYear}`}>
                          {edu.year}
                        </span>
                      </div>
                      <div className={`flex-1 border-l ${t.eduLine} pl-4`}>
                        <p className={`text-xs font-mono mb-0.5 ${t.eduSchool}`}>{edu.school}</p>
                        <p className="text-sm font-bold text-white uppercase tracking-wide">{edu.degree}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SysWindow>
            )}

            {/* System / Club message */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className={`relative border ${t.sysMsg} rounded-xl p-5 overflow-hidden`}
            >
              <Scanlines opacity="opacity-[0.02]" />
              <div className="relative z-10 text-center">
                <p className={`text-[10px] font-mono ${t.sysMsgLabel} uppercase tracking-[0.3em] mb-2`}>
                  {isRM ? "[ Communiqué du Club ]" : isAntares ? "[ Signal Stellaire ]" : isBeast ? "[ Rugissement du Monarque ]" : isGojo ? "[ Domaine Infini ]" : isItachi ? "[ Tsukuyomi ]" : "[ Message du Système ]"}
                </p>
                <p className={`text-sm font-mono ${t.sysMsgText} italic`}>{t.sysMsgQ}</p>
                {isRM && (
                  <p className="mt-3 text-xs font-black tracking-[0.4em] text-yellow-400/20 uppercase">
                    HALA MADRID
                  </p>
                )}
                {isAntares && (
                  <p className="mt-3 text-xs font-black tracking-[0.4em] text-red-600/20 uppercase">
                    ✦ ANTARES ✦ α SCORPII ✦
                  </p>
                )}
                {isBeast && (
                  <p className="mt-3 text-xs font-black tracking-[0.4em] text-amber-600/20 uppercase">
                    ⌇ MONARQUE DES BÊTES ⌇
                  </p>
                )}
                {isGojo && (
                  <p className="mt-3 text-xs font-black tracking-[0.4em] text-sky-500/20 uppercase">
                    ◎ EXPANSION DU DOMAINE : VIDE INFINI ◎
                  </p>
                )}
                {isItachi && (
                  <p className="mt-3 text-xs font-black tracking-[0.4em] text-red-800/25 uppercase">
                    卍 AMATERASU — FLAMMES ÉTERNELLES 卍
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
