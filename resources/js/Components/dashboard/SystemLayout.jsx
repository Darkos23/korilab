import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CYAN = '#00cfff';
const CYAN_GLOW = 'rgba(0,207,255,0.5)';
const CYAN_SOFT = 'rgba(0,207,255,0.15)';

/* ─── Particle Network ──────────────────────────────────── */
export function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const COUNT   = 40;
    const MAX_DIST = 120;
    const COLOR   = '0,207,255';

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    class Dot {
      constructor() {
        this.x  = rand(0, canvas.width);
        this.y  = rand(0, canvas.height);
        this.vx = rand(-0.2, 0.2);
        this.vy = rand(-0.2, 0.2);
        this.r  = rand(0.8, 1.5);
        this.op = rand(0.15, 0.4);
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${this.op})`;
        ctx.fill();
      }
    }

    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({ length: COUNT }, () => new Dot());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        dots[i].move();
        dots[i].draw();
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(loop);
    };

    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Scanlines ─────────────────────────────────────────── */
export function Scanlines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
      style={{ backgroundImage: "repeating-linear-gradient(0deg,#00cfff,#00cfff 1px,transparent 1px,transparent 5px)" }} />
  );
}

/* ─── Grid background ───────────────────────────────────── */
export function SystemGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(0,207,255,0.07) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(0,207,255,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "36px 36px",
      }}
    />
  );
}

/* ─── Corner ornaments ──────────────────────────────────── */
export function Corners({ color = CYAN }) {
  const style = { color };
  const cls = "absolute text-[18px] leading-none pointer-events-none select-none";
  return (
    <>
      <span className={`${cls} top-1 left-1`}   style={style}>✦</span>
      <span className={`${cls} top-1 right-1`}  style={style}>✦</span>
      <span className={`${cls} bottom-1 left-1`}  style={style}>✦</span>
      <span className={`${cls} bottom-1 right-1`} style={style}>✦</span>
    </>
  );
}

/* ─── Floating orbs ─────────────────────────────────────── */
const ORBS = [
  { w:350, h:350, x:"5%",  y:"10%", dur:10, delay:0,   op:0.04 },
  { w:200, h:200, x:"70%", y:"5%",  dur:14, delay:2,   op:0.03 },
  { w:250, h:250, x:"60%", y:"60%", dur:11, delay:1,   op:0.03 },
  { w:150, h:150, x:"15%", y:"75%", dur:16, delay:3,   op:0.02 },
];

export function SystemOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: o.w, height: o.h, left: o.x, top: o.y,
            background: `radial-gradient(circle, ${CYAN} 0%, transparent 70%)`,
            opacity: o.op, filter: "blur(60px)",
          }}
          animate={{ y:[0,-20,0,15,0], x:[0,10,-6,4,0] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Panel border style ────────────────────────────────── */
const panelStyle = (accent = CYAN) => ({
  border: `1px solid ${accent}60`,
  boxShadow: `0 0 20px ${accent}20, inset 0 0 20px ${accent}05`,
  background: 'linear-gradient(135deg, #0d2455cc 0%, #081530cc 100%)',
});

/* ─── System Window ─────────────────────────────────────── */
export function SysWin({ title, subtitle, children, className = "", glow = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-sm overflow-hidden backdrop-blur-sm ${className}`}
      style={panelStyle()}
    >
      <Scanlines />
      <Corners />
      {/* Top bar */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-2.5 border-b"
        style={{ borderColor: `${CYAN}20`, background: `${CYAN}08` }}>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: CYAN, boxShadow: `0 0 6px 2px ${CYAN_GLOW}` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${CYAN}40` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${CYAN}20` }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]"
          style={{ color: `${CYAN}cc`, textShadow: `0 0 8px ${CYAN_GLOW}` }}>{title}</span>
        {subtitle && <span className="text-[10px] font-mono ml-1" style={{ color: `${CYAN}50` }}>— {subtitle}</span>}
        <div className="ml-auto flex gap-1">
          {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-px" style={{ background: `${CYAN}25` }} />)}
        </div>
      </div>
      <div className="relative z-10 p-5">{children}</div>
    </motion.div>
  );
}

/* ─── Stat badge ────────────────────────────────────────── */
export function StatBadge({ label, value, icon: Icon, sub }) {
  return (
    <div className="relative rounded-sm overflow-hidden p-5 group transition-all duration-300"
      style={{
        ...panelStyle(),
        transition: 'box-shadow 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${CYAN_GLOW}, inset 0 0 20px ${CYAN_SOFT}`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 20px ${CYAN}20, inset 0 0 20px ${CYAN}05`}
    >
      <Scanlines />
      <Corners />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          {Icon && <Icon className="w-4 h-4" style={{ color: `${CYAN}80` }} />}
          <div className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: CYAN, boxShadow: `0 0 6px 2px ${CYAN_GLOW}` }} />
        </div>
        <div className="text-3xl font-black text-white mb-1"
          style={{ textShadow: `0 0 20px ${CYAN_GLOW}` }}>{value}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em]"
          style={{ color: `${CYAN}80` }}>{label}</div>
        {sub && <div className="text-[10px] text-white/20 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

/* ─── System notification ───────────────────────────────── */
export function SysNotif({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="relative rounded-sm px-4 py-3 flex items-center gap-3"
      style={{ border: `1px solid ${CYAN}20`, background: `${CYAN}06` }}
    >
      <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
        style={{ background: CYAN, boxShadow: `0 0 6px 2px ${CYAN_GLOW}` }} />
      <p className="text-xs font-mono italic" style={{ color: `${CYAN}60` }}>{children}</p>
    </motion.div>
  );
}

/* ─── System input / textarea / select ─────────────────── */
export function SysInput({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
        style={{ color: `${CYAN}70`, textShadow: `0 0 6px ${CYAN}40` }}>{label}</label>}
      <input
        className="w-full rounded-sm px-3 py-2 text-white text-sm outline-none transition-all placeholder-white/10 font-mono"
        style={{ background: 'rgba(13,36,85,0.6)', border: `1px solid ${CYAN}25` }}
        onFocus={e => e.target.style.borderColor = `${CYAN}70`}
        onBlur={e => e.target.style.borderColor = `${CYAN}25`}
        {...props}
      />
    </div>
  );
}

export function SysTextarea({ label, rows = 3, ...props }) {
  return (
    <div>
      {label && <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
        style={{ color: `${CYAN}70`, textShadow: `0 0 6px ${CYAN}40` }}>{label}</label>}
      <textarea rows={rows}
        className="w-full rounded-sm px-3 py-2 text-white text-sm outline-none resize-none transition-all placeholder-white/10 font-mono"
        style={{ background: 'rgba(13,36,85,0.6)', border: `1px solid ${CYAN}25` }}
        onFocus={e => e.target.style.borderColor = `${CYAN}70`}
        onBlur={e => e.target.style.borderColor = `${CYAN}25`}
        {...props}
      />
    </div>
  );
}

export function SysSelect({ label, options, ...props }) {
  return (
    <div>
      {label && <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5"
        style={{ color: `${CYAN}70`, textShadow: `0 0 6px ${CYAN}40` }}>{label}</label>}
      <select
        className="w-full rounded-sm px-3 py-2 text-white text-sm outline-none transition-all font-mono"
        style={{ background: '#0d2455', border: `1px solid ${CYAN}25` }}
        {...props}
      >
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o} className="bg-[#0d2455]">{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

/* ─── System button ─────────────────────────────────────── */
export function SysBtn({ children, variant = "primary", className = "", ...props }) {
  const base = "flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-mono transition-all duration-200 disabled:opacity-50 uppercase tracking-widest";
  const variants = {
    primary: { style: { border: `1px solid ${CYAN}50`, background: `${CYAN}12`, color: CYAN, textShadow: `0 0 8px ${CYAN_GLOW}` } },
    danger:  { style: { border: '1px solid rgba(248,113,113,0.4)', background: 'rgba(248,113,113,0.06)', color: '#fca5a5' } },
    ghost:   { style: { border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.4)' } },
  };
  return (
    <button className={`${base} ${className}`} style={variants[variant]?.style ?? {}} {...props}>
      {children}
    </button>
  );
}

/* ─── Rank Badge ────────────────────────────────────────── */
const RANK_COLORS = { S: '#D4AF37', A: '#00cfff', B: '#a855f7', C: '#22c55e', D: '#f59e0b', E: '#6b7280' };
export function RankBadge({ rank }) {
  const color = RANK_COLORS[rank] ?? CYAN;
  return (
    <motion.span
      animate={{ boxShadow: [`0 0 6px ${color}60`, `0 0 14px ${color}cc`, `0 0 6px ${color}60`] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-flex items-center justify-center w-7 h-7 text-xs font-black rounded-sm border uppercase"
      style={{ color, borderColor: color + '60', background: color + '12', letterSpacing: '0.05em', textShadow: `0 0 10px ${color}` }}
    >
      {rank}
    </motion.span>
  );
}

/* ─── Status Bar ─────────────────────────────────────────── */
export function StatusBar({ admin }) {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('fr-FR'));
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString('fr-FR')), 1000);
    return () => clearInterval(t);
  }, []);
  const rankColor = RANK_COLORS[admin?.rank] ?? CYAN;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-5 gap-4"
      style={{ height: 26, borderTop: `1px solid ${CYAN}15`, background: 'rgba(4,10,28,0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="flex items-center gap-2">
        <motion.div className="w-1.5 h-1.5 rounded-full"
          style={{ background: CYAN }}
          animate={{ opacity: [1, 0.3, 1], boxShadow: [`0 0 4px ${CYAN}`, `0 0 8px ${CYAN}`, `0 0 4px ${CYAN}`] }}
          transition={{ duration: 1.8, repeat: Infinity }} />
        <span className="text-[8px] font-mono uppercase tracking-[0.35em]" style={{ color: `${CYAN}80` }}>Système Actif</span>
      </div>
      <span style={{ color: `${CYAN}20` }} className="text-[8px]">·</span>
      <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: `${CYAN}50` }}>Joueur : {admin?.name ?? '—'}</span>
      <span style={{ color: `${CYAN}20` }} className="text-[8px]">·</span>
      <span className="text-[8px] font-mono uppercase tracking-widest"
        style={{ color: rankColor + 'cc', textShadow: `0 0 8px ${rankColor}80` }}>
        Rang {admin?.rank ?? '—'}-Class
      </span>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-[8px] font-mono tabular-nums text-white/25">{time}</span>
        <span className="text-[8px]" style={{ color: `${CYAN}15` }}>·</span>
        <span className="text-[8px] font-mono tracking-widest" style={{ color: `${CYAN}25` }}>KoriLab v1.0</span>
      </div>
    </div>
  );
}

/* ─── Section divider ───────────────────────────────────── */
export function SysDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${CYAN}40)` }} />
      <span className="text-[10px] font-mono uppercase tracking-widest"
        style={{ color: `${CYAN}80`, textShadow: `0 0 8px ${CYAN_GLOW}` }}>◆ {label} ◆</span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${CYAN}40)` }} />
    </div>
  );
}
