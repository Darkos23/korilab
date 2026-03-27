import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

/* Alphabet Tifinagh (script berbère d'Afrique du Nord/Ouest) */
const TIFINAGH = ["ⵀ","ⵁ","ⵂ","ⵃ","ⵄ","ⵅ","ⵆ","ⵇ","ⵈ","ⵉ","ⵊ","ⵋ","ⵌ","ⵍ","ⵎ","ⵏ","ⵐ","ⵑ","ⵒ","ⵓ","ⵔ","ⵕ","ⵖ","ⵗ"];

/* ── Canvas particle system ──────────────────────────────── */
function Particles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 60 }, () => ({
      x:   Math.random() * window.innerWidth,
      y:   Math.random() * window.innerHeight,
      r:   0.3 + Math.random() * 1.4,
      vx:  (Math.random() - 0.5) * 0.16,
      vy:  -(0.04 + Math.random() * 0.18),
      a:   0.06 + Math.random() * 0.28,
      /* or ambré (40°) ou terracotta (18°) */
      hue: Math.random() > 0.55 ? 40 : 18,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6)                 { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
        if (p.x < -6)                  p.x = canvas.width + 6;
        if (p.x > canvas.width  + 6)   p.x = -6;

        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = `hsl(${p.hue},85%,60%)`;
        ctx.fillStyle   = `hsl(${p.hue},80%,65%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ── Background principal — thème Cauri ─────────────────── */
export default function SLBackground() {
  const glyphs = useMemo(() =>
    TIFINAGH.slice(0, 22).map((char, i) => ({
      char,
      left:  `${3  + (i * 4.3)  % 88}%`,
      top:   `${3  + (i * 8.1)  % 87}%`,
      size:  10 + (i % 5) * 3,
      delay: i * 0.26,
      dur:   3.8 + (i % 5) * 0.9,
      color: i % 3 === 0 ? "rgba(212,162,56,0.20)" : "rgba(196,87,58,0.16)",
    })),
  []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Base — nuit chaude */}
      <div className="absolute inset-0" style={{ background: "#080604" }} />

      {/* Halo soleil — or en haut */}
      <div className="absolute inset-x-0 top-0" style={{
        height: "65vh",
        background: "radial-gradient(ellipse 90% 110% at 50% -8%, rgba(212,162,56,0.10) 0%, transparent 65%)",
      }} />

      {/* Motif losange bogolan */}
      <div className="absolute inset-0" style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(212,162,56,0.022) 25%, transparent 25%)," +
          "linear-gradient(-45deg, rgba(212,162,56,0.022) 25%, transparent 25%)," +
          "linear-gradient(45deg, transparent 75%, rgba(212,162,56,0.022) 75%)," +
          "linear-gradient(-45deg, transparent 75%, rgba(212,162,56,0.022) 75%)",
        backgroundSize: "56px 56px",
        backgroundPosition: "0 0, 0 28px, 28px -28px, -28px 0px",
      }} />

      {/* Anneau externe — rotation lente, ton or */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(320px,55vw,680px)", height: "clamp(320px,55vw,680px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          border: "1px solid rgba(212,162,56,0.08)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
      >
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4, height: 4,
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(calc(-50% - clamp(160px,27.5vw,340px))) translate(-50%,-50%)`,
              background: "#d4a235",
              boxShadow: "0 0 10px 3px rgba(212,162,56,0.8)",
            }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.55 }}
          />
        ))}
      </motion.div>

      {/* Anneau intermédiaire — contre-rotation, terracotta/or */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(210px,35vw,460px)", height: "clamp(210px,35vw,460px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          border: "1px solid rgba(196,87,58,0.08)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      >
        {[55, 235].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5, height: 5,
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(calc(-50% - clamp(105px,17.5vw,230px))) translate(-50%,-50%)`,
              background: "radial-gradient(circle, #d4a235, #c4573a)",
              boxShadow: "0 0 12px 4px rgba(212,162,56,0.75)",
            }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.9 }}
          />
        ))}
      </motion.div>

      {/* Anneau interne — pulse, or */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(110px,16vw,240px)", height: "clamp(110px,16vw,240px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          border: "1px solid rgba(212,162,56,0.14)",
          boxShadow: "0 0 40px rgba(212,162,56,0.04) inset",
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbes driftants */}
      <motion.div className="absolute rounded-full" style={{
        width: 360, height: 360, top: "6%", left: "2%",
        background: "radial-gradient(circle, rgba(212,162,56,0.06) 0%, transparent 70%)",
        filter: "blur(90px)",
      }}
        animate={{ x: [0, 45, 0], y: [0, 28, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute rounded-full" style={{
        width: 480, height: 480, bottom: "4%", right: "2%",
        background: "radial-gradient(circle, rgba(196,87,58,0.07) 0%, transparent 70%)",
        filter: "blur(100px)",
      }}
        animate={{ x: [0, -55, 0], y: [0, -38, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute rounded-full" style={{
        width: 300, height: 300, top: "38%", right: "6%",
        background: "radial-gradient(circle, rgba(74,45,158,0.06) 0%, transparent 70%)",
        filter: "blur(75px)",
      }}
        animate={{ x: [0, 22, 0], y: [0, -45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glyphes Tifinagh flottants */}
      {glyphs.map(({ char, left, top, size, delay, dur, color }, i) => (
        <motion.span
          key={i}
          className="absolute font-mono select-none"
          style={{ left, top, fontSize: size, color }}
          animate={{ opacity: [0.04, 0.26, 0.04], y: [0, -18, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {char}
        </motion.span>
      ))}

      {/* Particules canvas */}
      <Particles />

      {/* Scanlines */}
      <div className="absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)",
      }} />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 88% 88% at 50% 50%, transparent 40%, rgba(4,3,2,0.88) 100%)",
      }} />

      {/* Coins UI — or tamisé */}
      {[
        { top: 18, left: 18,     borderTop: true,    borderLeft:  true  },
        { top: 18, right: 18,    borderTop: true,    borderRight: true  },
        { bottom: 18, left: 18,  borderBottom: true, borderLeft:  true  },
        { bottom: 18, right: 18, borderBottom: true, borderRight: true  },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: c.top, right: c.right, bottom: c.bottom, left: c.left,
            width: 26, height: 26,
            borderTopWidth:    c.borderTop    ? 1 : 0,
            borderBottomWidth: c.borderBottom ? 1 : 0,
            borderLeftWidth:   c.borderLeft   ? 1 : 0,
            borderRightWidth:  c.borderRight  ? 1 : 0,
            borderStyle: "solid",
            borderColor: "rgba(212,162,56,0.28)",
          }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.55 }}
        />
      ))}

      {/* Étiquette */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.45em] whitespace-nowrap"
        style={{ color: "rgba(240,228,196,0.18)" }}
        animate={{ opacity: [0.15, 0.55, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ◆ KoriLab · Dakar ◆
      </motion.div>
    </div>
  );
}
