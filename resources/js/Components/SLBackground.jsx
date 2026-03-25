import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];

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

    const pts = Array.from({ length: 65 }, () => ({
      x:   Math.random() * window.innerWidth,
      y:   Math.random() * window.innerHeight,
      r:   0.3 + Math.random() * 1.5,
      vx:  (Math.random() - 0.5) * 0.18,
      vy:  -(0.04 + Math.random() * 0.2),
      a:   0.06 + Math.random() * 0.32,
      hue: Math.random() > 0.58 ? 262 : 200,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6)                  { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
        if (p.x < -6)                  p.x = canvas.width + 6;
        if (p.x > canvas.width  + 6)   p.x = -6;

        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = `hsl(${p.hue},100%,70%)`;
        ctx.fillStyle   = `hsl(${p.hue},100%,75%)`;
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

/* ── Main background ─────────────────────────────────────── */
export default function SLBackground() {
  const runes = useMemo(() =>
    RUNES.slice(0, 22).map((char, i) => ({
      char,
      left:  `${3  + (i * 4.3)  % 88}%`,
      top:   `${3  + (i * 8.1)  % 87}%`,
      size:  9 + (i % 5) * 3,
      delay: i * 0.26,
      dur:   3.8 + (i % 5) * 0.9,
      color: i % 3 === 0 ? "rgba(129,140,248,0.22)" : "rgba(56,189,248,0.18)",
    })),
  []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* ── Base ── */}
      <div className="absolute inset-0" style={{ background: "#020b18" }} />

      {/* ── Halo supérieur ── */}
      <div className="absolute inset-x-0 top-0" style={{
        height: "65vh",
        background: "radial-gradient(ellipse 90% 110% at 50% -8%, rgba(56,189,248,0.09) 0%, transparent 65%)",
      }} />

      {/* ── Grille fine ── */}
      <div className="absolute inset-0" style={{
        backgroundImage:
          "linear-gradient(rgba(56,189,248,0.02) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(56,189,248,0.02) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      {/* ── Portail central — glow ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(400px,65vw,880px)", height: "clamp(400px,65vw,880px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, rgba(99,102,241,0.05) 35%, transparent 65%)",
          filter: "blur(72px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Anneau externe — rotation lente ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(320px,55vw,680px)", height: "clamp(320px,55vw,680px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          border: "1px solid rgba(56,189,248,0.07)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
      >
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sky-400"
            style={{
              width: 4, height: 4,
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(calc(-50% - clamp(160px,27.5vw,340px))) translate(-50%,-50%)`,
              boxShadow: "0 0 10px 3px rgba(56,189,248,0.9)",
            }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.55 }}
          />
        ))}
      </motion.div>

      {/* ── Anneau intermédiaire — contre-rotation ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(210px,35vw,460px)", height: "clamp(210px,35vw,460px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          border: "1px solid rgba(99,102,241,0.07)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[55, 235].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5, height: 5,
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(calc(-50% - clamp(105px,17.5vw,230px))) translate(-50%,-50%)`,
              background: "radial-gradient(circle, #818cf8, #38bdf8)",
              boxShadow: "0 0 12px 4px rgba(129,140,248,0.85)",
            }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.9 }}
          />
        ))}
      </motion.div>

      {/* ── Anneau interne — pulse ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "clamp(110px,16vw,240px)", height: "clamp(110px,16vw,240px)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          border: "1px solid rgba(56,189,248,0.13)",
          boxShadow: "0 0 40px rgba(56,189,248,0.04) inset",
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Orbes d'énergie driftants ── */}
      <motion.div className="absolute rounded-full" style={{
        width: 360, height: 360, top: "6%", left: "2%",
        background: "radial-gradient(circle, rgba(56,189,248,0.055) 0%, transparent 70%)",
        filter: "blur(90px)",
      }}
        animate={{ x: [0, 45, 0], y: [0, 28, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute rounded-full" style={{
        width: 480, height: 480, bottom: "4%", right: "2%",
        background: "radial-gradient(circle, rgba(99,102,241,0.065) 0%, transparent 70%)",
        filter: "blur(100px)",
      }}
        animate={{ x: [0, -55, 0], y: [0, -38, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute rounded-full" style={{
        width: 300, height: 300, top: "38%", right: "6%",
        background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
        filter: "blur(75px)",
      }}
        animate={{ x: [0, 22, 0], y: [0, -45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute rounded-full" style={{
        width: 250, height: 250, top: "55%", left: "10%",
        background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
        filter: "blur(65px)",
      }}
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Runes flottantes ── */}
      {runes.map(({ char, left, top, size, delay, dur, color }, i) => (
        <motion.span
          key={i}
          className="absolute font-mono select-none"
          style={{ left, top, fontSize: size, color }}
          animate={{ opacity: [0.04, 0.28, 0.04], y: [0, -20, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {char}
        </motion.span>
      ))}

      {/* ── Particules canvas ── */}
      <Particles />

      {/* ── Scanlines ── */}
      <div className="absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)",
      }} />

      {/* ── Vignette ── */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 88% 88% at 50% 50%, transparent 40%, rgba(2,11,24,0.88) 100%)",
      }} />

      {/* ── Coins UI système ── */}
      {[
        { top: 18, left: 18,  borderTop: true,    borderLeft:  true  },
        { top: 18, right: 18, borderTop: true,    borderRight: true  },
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
            borderColor: "rgba(56,189,248,0.28)",
          }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.55 }}
        />
      ))}

      {/* ── Étiquette système ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-sky-500/20 uppercase tracking-[0.45em] whitespace-nowrap"
        animate={{ opacity: [0.15, 0.55, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ◆ Solo Leveling System — v2.0 ◆
      </motion.div>
    </div>
  );
}
