import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens — NieR: Automata ────────────────────── */
const BG       = '#080808';
const SURFACE  = 'rgba(255,255,255,0.025)';
const BORDER   = 'rgba(255,255,255,0.08)';
const BORDER_H = 'rgba(255,255,255,0.22)';
const TEXT     = '#e8e0d0';
const DIM      = 'rgba(232,224,208,0.35)';
const MUTED    = 'rgba(232,224,208,0.15)';
const RED      = '#cc2222';
const GOLD     = '#c8a951';

/* ─── NieR Background ────────────────────────────────────── */
function Scanline() {
  return (
    <motion.div
      className="fixed left-0 right-0 pointer-events-none z-0"
      style={{ height: 1, background: 'rgba(255,255,255,0.04)' }}
      initial={{ top: '-1%' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
    />
  );
}

export function SLSystemBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: BG }} />

      {/* Grain */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        mixBlendMode: 'overlay',
      }} />

      {/* Grille fine */}
      <div className="absolute inset-0" style={{
        backgroundImage:
          `linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),` +
          `linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Scanline animée */}
      <Scanline />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Coins */}
      {[
        { top: 16, left: 16,     borderTop: true,    borderLeft: true  },
        { top: 16, right: 16,    borderTop: true,    borderRight: true },
        { bottom: 16, left: 16,  borderBottom: true, borderLeft: true  },
        { bottom: 16, right: 16, borderBottom: true, borderRight: true },
      ].map((c, i) => (
        <div key={i} className="absolute" style={{
          top: c.top, right: c.right, bottom: c.bottom, left: c.left,
          width: 20, height: 20,
          borderTopWidth:    c.borderTop    ? 1 : 0,
          borderBottomWidth: c.borderBottom ? 1 : 0,
          borderLeftWidth:   c.borderLeft   ? 1 : 0,
          borderRightWidth:  c.borderRight  ? 1 : 0,
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.12)',
        }} />
      ))}

      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.5em] whitespace-nowrap"
        style={{ color: MUTED }}>
        — KoriLab System v2.0 —
      </div>
    </div>
  );
}

/* ── Aliases (backward compat) ── */
export function ParticleNetwork() { return null; }
export function SystemGrid()      { return null; }
export function SystemOrbs()      { return null; }
export function SLPortal()        { return null; }

/* ─── Scanlines (card interne) ──────────────────────────── */
export function Scanlines() { return null; }

/* ─── System Window ─────────────────────────────────────── */
export function SysWin({ title, subtitle, children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative ${className}`}
      style={{
        background: 'rgba(10,10,10,0.92)',
        border: `1px solid ${BORDER}`,
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b" style={{ borderColor: BORDER }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
          [
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: DIM }}>
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-[9px]" style={{ color: MUTED }}>
            / {subtitle}
          </span>
        )}
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
          ]
        </span>
        <div className="ml-auto flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-4 h-px" style={{ background: BORDER }} />
          ))}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
}

/* ─── Stat Badge ─────────────────────────────────────────── */
export function StatBadge({ label, value, icon: Icon, sub }) {
  return (
    <motion.div
      whileHover={{ borderColor: BORDER_H }}
      className="relative p-5 transition-all duration-300"
      style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 2 }}
    >
      <div className="flex items-start justify-between mb-4">
        {Icon && <Icon className="w-3.5 h-3.5" style={{ color: MUTED }} />}
        <div className="w-1 h-1" style={{ background: TEXT }} />
      </div>
      <div className="font-mono text-3xl font-black mb-1" style={{ color: TEXT }}>{value}</div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: DIM }}>{label}</div>
      {sub && <div className="font-mono text-[9px] mt-1" style={{ color: MUTED }}>{sub}</div>}
    </motion.div>
  );
}

/* ─── Notif ──────────────────────────────────────────────── */
export function SysNotif({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="px-4 py-3 flex items-start gap-3"
      style={{ border: `1px solid ${BORDER}`, borderRadius: 2 }}
    >
      <span className="font-mono text-[9px] mt-0.5" style={{ color: MUTED }}>›</span>
      <p className="font-mono text-[11px] leading-relaxed italic" style={{ color: DIM }}>{children}</p>
    </motion.div>
  );
}

/* ─── Inputs ─────────────────────────────────────────────── */
export function SysInput({ label, ...props }) {
  const [f, setF] = useState(false);
  return (
    <div>
      {label && (
        <label className="block font-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: MUTED }}>
          {label}
        </label>
      )}
      <input
        className="w-full px-3 py-2 font-mono text-sm outline-none transition-all duration-200"
        style={{
          background: SURFACE,
          border: `1px solid ${f ? BORDER_H : BORDER}`,
          borderRadius: 2,
          color: TEXT,
        }}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        {...props}
      />
    </div>
  );
}

export function SysTextarea({ label, rows = 3, ...props }) {
  const [f, setF] = useState(false);
  return (
    <div>
      {label && (
        <label className="block font-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: MUTED }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className="w-full px-3 py-2 font-mono text-sm outline-none resize-none transition-all duration-200"
        style={{
          background: SURFACE,
          border: `1px solid ${f ? BORDER_H : BORDER}`,
          borderRadius: 2,
          color: TEXT,
        }}
        onFocus={() => setF(true)}
        onBlur={() => setF(false)}
        {...props}
      />
    </div>
  );
}

export function SysSelect({ label, options, ...props }) {
  return (
    <div>
      {label && (
        <label className="block font-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: MUTED }}>
          {label}
        </label>
      )}
      <select
        className="w-full px-3 py-2 font-mono text-sm outline-none transition-all duration-200"
        style={{ background: '#0d0d0d', border: `1px solid ${BORDER}`, borderRadius: 2, color: TEXT }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o} className="bg-[#0d0d0d]">
            {o.label ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─── Button ─────────────────────────────────────────────── */
export function SysBtn({ children, variant = 'primary', className = '', ...props }) {
  const base = "flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200 disabled:opacity-30";
  const styles = {
    primary: { border: `1px solid ${BORDER_H}`, background: SURFACE,            color: TEXT,         borderRadius: 2 },
    danger:  { border: `1px solid rgba(204,34,34,0.4)`, background: 'transparent', color: '#e87070',  borderRadius: 2 },
    ghost:   { border: `1px solid ${BORDER}`,   background: 'transparent',       color: DIM,          borderRadius: 2 },
  };
  return (
    <button className={`${base} ${className}`} style={styles[variant] ?? styles.primary} {...props}>
      {children}
    </button>
  );
}

/* ─── Rank Badge ─────────────────────────────────────────── */
const RC = { S: GOLD, A: '#e8e0d0', B: '#a78bfa', C: '#6ee7b7', D: '#fbbf24', E: '#6b7280' };
export function RankBadge({ rank }) {
  const c = RC[rank] ?? TEXT;
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 font-mono text-[10px] font-black uppercase"
      style={{ color: c, border: `1px solid ${c}40`, background: `${c}08`, letterSpacing: '0.05em' }}
    >
      {rank}
    </span>
  );
}

/* ─── Status Bar ─────────────────────────────────────────── */
export function StatusBar({ admin }) {
  const [t, setT] = useState(() => new Date().toLocaleTimeString('fr-FR'));
  useEffect(() => {
    const i = setInterval(() => setT(new Date().toLocaleTimeString('fr-FR')), 1000);
    return () => clearInterval(i);
  }, []);
  const rc = RC[admin?.rank] ?? TEXT;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-5 gap-4"
      style={{ height: 24, borderTop: `1px solid ${BORDER}`, background: 'rgba(4,4,4,0.98)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-1 h-1"
          style={{ background: TEXT }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[7px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>Online</span>
      </div>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: DIM }}>{admin?.name ?? '—'}</span>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: rc }}>{admin?.rank ?? '—'}-class</span>
      <div className="ml-auto">
        <span className="font-mono text-[7px] tabular-nums" style={{ color: MUTED }}>{t}</span>
      </div>
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────── */
export function SysDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: BORDER }} />
      <span className="font-mono text-[8px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
        — {label} —
      </span>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  );
}
