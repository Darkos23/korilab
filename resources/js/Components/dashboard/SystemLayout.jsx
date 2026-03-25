import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Particle Network ──────────────────────────────────── */
export function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const COUNT   = 55;
    const MAX_DIST = 140;
    const COLOR   = '0,168,255';

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    class Dot {
      constructor() {
        this.x  = rand(0, canvas.width);
        this.y  = rand(0, canvas.height);
        this.vx = rand(-0.3, 0.3);
        this.vy = rand(-0.3, 0.3);
        this.r  = rand(0.8, 2);
        this.op = rand(0.25, 0.6);
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
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
            ctx.lineWidth   = 0.6;
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
      style={{ opacity: 0.7 }}
    />
  );
}

/* ─── Scanlines ─────────────────────────────────────────── */
export function Scanlines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
      style={{ backgroundImage: "repeating-linear-gradient(0deg,#00cfff,#00cfff 1px,transparent 1px,transparent 4px)" }} />
  );
}

/* ─── Grid background ───────────────────────────────────── */
export function SystemGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(0,168,255,0.10) 1px, transparent 1px),
          linear-gradient(-45deg, rgba(0,168,255,0.10) 1px, transparent 1px)
        `,
        backgroundSize: "36px 36px",
      }}
    />
  );
}

/* ─── Floating orbs ─────────────────────────────────────── */
const ORBS = [
  { w:400, h:400, x:"5%",  y:"10%", dur:10, delay:0,   op:0.04 },
  { w:250, h:250, x:"70%", y:"5%",  dur:14, delay:2,   op:0.03 },
  { w:300, h:300, x:"60%", y:"60%", dur:11, delay:1,   op:0.035},
  { w:180, h:180, x:"15%", y:"75%", dur:16, delay:3,   op:0.025},
];

export function SystemOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: o.w, height: o.h, left: o.x, top: o.y,
            background: "radial-gradient(circle, rgba(0,168,255,1) 0%, transparent 70%)",
            opacity: o.op, filter: "blur(50px)",
          }}
          animate={{ y:[0,-25,0,18,0], x:[0,12,-8,4,0], scale:[1,1.08,0.96,1.04,1] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── System Window ─────────────────────────────────────── */
export function SysWin({ title, subtitle, children, className = "", glow = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative border border-[#00a8ff]/20 rounded-xl overflow-hidden
        bg-[#0d2a42]/70 backdrop-blur-sm
        ${glow ? "shadow-[0_0_30px_rgba(0,168,255,0.08),0_0_0_1px_rgba(0,168,255,0.05),inset_0_0_30px_rgba(0,168,255,0.02)]" : ""}
        ${className}`}
      style={{ outline: "1px solid rgba(0,168,255,0.06)", outlineOffset: "3px" }}
    >
      <Scanlines />
      {/* Top bar */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-2.5 border-b border-[#00a8ff]/10 bg-[#00a8ff]/[0.04]">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff]/15" />
        </div>
        <span className="text-[10px] font-mono text-[#00a8ff]/60 uppercase tracking-[0.25em]">{title}</span>
        {subtitle && <span className="text-[10px] font-mono text-[#00a8ff]/30 ml-1">— {subtitle}</span>}
        <div className="ml-auto flex gap-1">
          {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-px bg-[#00a8ff]/20" />)}
        </div>
      </div>
      <div className="relative z-10 p-5">{children}</div>
    </motion.div>
  );
}

/* ─── Stat badge ────────────────────────────────────────── */
export function StatBadge({ label, value, icon: Icon, sub }) {
  return (
    <div className="relative border border-[#00a8ff]/15 rounded-xl bg-[#0d2a42]/70 p-5 overflow-hidden group hover:border-[#00a8ff]/35 transition-all duration-300">
      <Scanlines />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          {Icon && <Icon className="w-4 h-4 text-[#00a8ff]/60" />}
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)] animate-pulse" />
        </div>
        <div className="text-3xl font-black text-white mb-1"
          style={{ textShadow: "0 0 20px rgba(0,168,255,0.4)" }}>{value}</div>
        <div className="text-[10px] font-mono text-[#00a8ff]/50 uppercase tracking-[0.2em]">{label}</div>
        {sub && <div className="text-[10px] text-white/20 mt-1">{sub}</div>}
      </div>
      {/* Corner glow */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-[#00a8ff]/5 blur-xl group-hover:bg-[#00a8ff]/10 transition-all" />
    </div>
  );
}

/* ─── System notification ───────────────────────────────── */
export function SysNotif({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="border border-[#00a8ff]/15 rounded-lg px-4 py-3 bg-[#00a8ff]/[0.04] flex items-center gap-3"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)] animate-pulse flex-shrink-0" />
      <p className="text-xs font-mono text-[#00a8ff]/40 italic">{children}</p>
    </motion.div>
  );
}

/* ─── System input / textarea / select ─────────────────── */
export function SysInput({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-[10px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">{label}</label>}
      <input
        className="w-full bg-white/[0.04] border border-[#00a8ff]/20 rounded-lg px-3 py-2 text-white text-sm
          focus:border-[#00a8ff]/50 focus:shadow-[0_0_10px_rgba(0,168,255,0.1)] outline-none transition-all
          placeholder-white/10 font-mono"
        {...props}
      />
    </div>
  );
}

export function SysTextarea({ label, rows = 3, ...props }) {
  return (
    <div>
      {label && <label className="block text-[10px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">{label}</label>}
      <textarea rows={rows}
        className="w-full bg-white/[0.04] border border-[#00a8ff]/20 rounded-lg px-3 py-2 text-white text-sm
          focus:border-[#00a8ff]/50 focus:shadow-[0_0_10px_rgba(0,168,255,0.1)] outline-none resize-none transition-all
          placeholder-white/10 font-mono"
        {...props}
      />
    </div>
  );
}

export function SysSelect({ label, options, ...props }) {
  return (
    <div>
      {label && <label className="block text-[10px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">{label}</label>}
      <select
        className="w-full bg-white/[0.04] border border-[#00a8ff]/20 rounded-lg px-3 py-2 text-white text-sm
          focus:border-[#00a8ff]/50 outline-none transition-all font-mono"
        {...props}
      >
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

/* ─── System button ─────────────────────────────────────── */
export function SysBtn({ children, variant = "primary", className = "", ...props }) {
  const base = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 disabled:opacity-50";
  const variants = {
    primary: "border border-[#00a8ff]/40 bg-[#00a8ff]/10 text-[#00a8ff] hover:bg-[#00a8ff]/20 hover:border-[#00a8ff]/60 hover:shadow-[0_0_15px_rgba(0,168,255,0.15)]",
    danger:  "border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:border-red-500/50",
    ghost:   "border border-white/5 bg-white/[0.03] text-white/40 hover:bg-white/[0.06] hover:text-white/60",
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

/* ─── Rank Badge ────────────────────────────────────────── */
const RANK_COLORS = { S: '#D4AF37', A: '#00a8ff', B: '#a855f7', C: '#22c55e', D: '#f59e0b', E: '#6b7280' };
export function RankBadge({ rank }) {
  const color = RANK_COLORS[rank] ?? '#00a8ff';
  return (
    <motion.span
      animate={{ boxShadow: [`0 0 6px ${color}60`, `0 0 14px ${color}cc`, `0 0 6px ${color}60`] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-flex items-center justify-center w-7 h-7 text-xs font-black rounded-sm border"
      style={{ color, borderColor: color + '60', background: color + '12', letterSpacing: '0.05em' }}
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
  const rankColor = RANK_COLORS[admin?.rank] ?? '#00a8ff';
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#00a8ff]/10 bg-[#091e30]/95 backdrop-blur-sm flex items-center px-5 gap-4"
      style={{ height: 26 }}>
      <div className="flex items-center gap-2">
        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff]"
          animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 4px #00a8ff', '0 0 8px #00a8ff', '0 0 4px #00a8ff'] }}
          transition={{ duration: 1.8, repeat: Infinity }} />
        <span className="text-[8px] font-mono text-[#00a8ff]/70 uppercase tracking-[0.35em]">Système Actif</span>
      </div>
      <span className="text-[#00a8ff]/20 text-[8px]">·</span>
      <span className="text-[8px] font-mono text-[#00a8ff]/40 uppercase tracking-widest">Joueur : {admin?.name ?? '—'}</span>
      <span className="text-[#00a8ff]/20 text-[8px]">·</span>
      <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: rankColor + 'aa' }}>
        Rang {admin?.rank ?? '—'}-Class
      </span>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-[8px] font-mono text-white/20 tabular-nums">{time}</span>
        <span className="text-[#00a8ff]/15 text-[8px]">·</span>
        <span className="text-[8px] font-mono text-[#00a8ff]/20 tracking-widest">KoriLab v1.0</span>
      </div>
    </div>
  );
}

/* ─── Section divider ───────────────────────────────────── */
export function SysDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-5 opacity-30">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00a8ff]" />
      <span className="text-[10px] font-mono text-[#00a8ff] tracking-widest">◈ {label} ◈</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00a8ff]" />
    </div>
  );
}
