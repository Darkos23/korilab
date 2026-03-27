import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens — Cauri / KoriLab Dakar ─────────────── */
const BG        = '#080604';
const SURFACE   = 'rgba(212,162,56,0.04)';
const BORDER    = 'rgba(212,162,56,0.15)';
const BORDER_H  = 'rgba(212,162,56,0.42)';
const TEXT      = '#f0e4c4';
const DIM       = 'rgba(240,228,196,0.50)';
const MUTED     = 'rgba(240,228,196,0.22)';
const RED       = '#c44030';
const GOLD      = '#d4a235';

/* ─── Scanline ambrée ────────────────────────────────────── */
function Scanline() {
  return (
    <motion.div
      className="fixed left-0 right-0 pointer-events-none z-0"
      style={{ height: 1, background: 'rgba(212,162,56,0.07)' }}
      initial={{ top: '-1%' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
    />
  );
}

/* ─── Background Cauri ───────────────────────────────────── */
export function SLSystemBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base — nuit chaude */}
      <div className="absolute inset-0" style={{ background: BG }} />

      {/* Grain sable */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        mixBlendMode: 'overlay',
      }} />

      {/* Motif losange bogolan */}
      <div className="absolute inset-0" style={{
        backgroundImage:
          'linear-gradient(45deg, rgba(212,162,56,0.028) 25%, transparent 25%),' +
          'linear-gradient(-45deg, rgba(212,162,56,0.028) 25%, transparent 25%),' +
          'linear-gradient(45deg, transparent 75%, rgba(212,162,56,0.028) 75%),' +
          'linear-gradient(-45deg, transparent 75%, rgba(212,162,56,0.028) 75%)',
        backgroundSize: '48px 48px',
        backgroundPosition: '0 0, 0 24px, 24px -24px, -24px 0px',
      }} />

      {/* Halo soleil — or ambré en haut */}
      <div className="absolute inset-x-0 top-0" style={{
        height: '55vh',
        background: 'radial-gradient(ellipse 75% 80% at 50% -5%, rgba(212,162,56,0.09) 0%, transparent 68%)',
      }} />

      {/* Orbe terracotta — bas gauche */}
      <div className="absolute rounded-full" style={{
        width: 520, height: 420, bottom: '-5%', left: '-3%',
        background: 'radial-gradient(ellipse, rgba(196,87,58,0.07) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }} />

      {/* Orbe indigo — bas droite */}
      <div className="absolute rounded-full" style={{
        width: 560, height: 440, bottom: '-5%', right: '-3%',
        background: 'radial-gradient(ellipse, rgba(74,45,158,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Orbe or — milieu droite */}
      <div className="absolute rounded-full" style={{
        width: 300, height: 300, top: '35%', right: '5%',
        background: 'radial-gradient(ellipse, rgba(212,162,56,0.05) 0%, transparent 70%)',
        filter: 'blur(55px)',
      }} />

      {/* Scanline ambrée */}
      <Scanline />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 48%, rgba(4,3,2,0.82) 100%)',
      }} />

      {/* Coins — or tamisé */}
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
          borderColor: 'rgba(212,162,56,0.28)',
        }} />
      ))}

      {/* Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.5em] whitespace-nowrap"
        style={{ color: MUTED }}>
        — KoriLab · Dakar —
      </div>
    </div>
  );
}

/* ── Aliases (backward compat) ── */
export function ParticleNetwork() { return null; }
export function SystemGrid()      { return null; }
export function SystemOrbs()      { return null; }
export function SLPortal()        { return null; }
export function Scanlines()       { return null; }

/* ─── System Window ─────────────────────────────────────── */
export function SysWin({ title, subtitle, children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative ${className}`}
      style={{
        background: 'rgba(10,8,5,0.92)',
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
        <div className="w-1 h-1" style={{ background: GOLD }} />
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
      <span className="font-mono text-[9px] mt-0.5" style={{ color: GOLD }}>◆</span>
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
        style={{ background: '#0d0b08', border: `1px solid ${BORDER}`, borderRadius: 2, color: TEXT }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o} className="bg-[#0d0b08]">
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
    primary: { border: `1px solid ${BORDER_H}`, background: SURFACE,              color: TEXT,        borderRadius: 2 },
    danger:  { border: `1px solid rgba(196,64,48,0.4)`, background: 'transparent', color: '#e87070',  borderRadius: 2 },
    ghost:   { border: `1px solid ${BORDER}`,   background: 'transparent',         color: DIM,         borderRadius: 2 },
  };
  return (
    <button className={`${base} ${className}`} style={styles[variant] ?? styles.primary} {...props}>
      {children}
    </button>
  );
}

/* ─── Rank Badge ─────────────────────────────────────────── */
const RC = { S: GOLD, A: '#f0e4c4', B: '#c4573a', C: '#8b6fcf', D: '#7ab8a0', E: '#6b7280' };
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
      style={{ height: 24, borderTop: `1px solid ${BORDER}`, background: 'rgba(6,4,2,0.98)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-1 h-1"
          style={{ background: GOLD }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[7px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>En ligne</span>
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
        ◆ {label} ◆
      </span>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  );
}
