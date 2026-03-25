import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens — J.A.R.V.I.S ───────────────────────── */
const BG       = '#010a14';
const SURFACE  = 'rgba(0,168,255,0.04)';
const BORDER   = 'rgba(0,168,255,0.18)';
const BORDER_H = 'rgba(0,180,255,0.6)';
const TEXT     = '#b8d8f8';
const DIM      = 'rgba(0,180,255,0.6)';
const MUTED    = 'rgba(0,168,255,0.35)';
const ACCENT   = '#00b4ff';
const ORANGE   = '#ff6600';
const RED      = '#ff3322';

/* ─── Arc Reactor Rings ──────────────────────────────────── */
function ArcReactor() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer glow orb */}
      <div className="absolute" style={{
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,140,255,0.06) 0%, transparent 70%)',
      }} />
      {/* Ring 1 — slow outer */}
      <motion.div className="absolute" style={{
        width: 480, height: 480, borderRadius: '50%',
        border: '1px solid rgba(0,168,255,0.08)',
      }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
      </motion.div>
      {/* Ring 2 — medium */}
      <motion.div className="absolute" style={{
        width: 340, height: 340, borderRadius: '50%',
        border: '1px solid rgba(0,168,255,0.12)',
      }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: ORANGE, boxShadow: `0 0 6px ${ORANGE}` }} />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
      </motion.div>
      {/* Ring 3 — inner fast */}
      <motion.div className="absolute" style={{
        width: 200, height: 200, borderRadius: '50%',
        border: '1px solid rgba(0,168,255,0.18)',
      }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
          style={{ background: '#fff', boxShadow: `0 0 4px ${ACCENT}, 0 0 10px ${ACCENT}` }} />
      </motion.div>
      {/* Core */}
      <motion.div className="absolute w-12 h-12 rounded-full" style={{
        background: `radial-gradient(circle, rgba(0,200,255,0.5) 0%, rgba(0,100,200,0.2) 50%, transparent 70%)`,
        border: '1px solid rgba(0,200,255,0.3)',
        boxShadow: `0 0 20px rgba(0,168,255,0.4), inset 0 0 10px rgba(0,200,255,0.2)`,
      }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── Scanning beam ──────────────────────────────────────── */
function ScanBeam() {
  return (
    <motion.div
      className="fixed left-0 right-0 pointer-events-none z-0"
      style={{
        height: 2,
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,168,255,0.06) 20%, rgba(0,200,255,0.18) 50%, rgba(0,168,255,0.06) 80%, transparent 100%)',
        boxShadow: '0 0 8px rgba(0,168,255,0.12)',
      }}
      initial={{ top: '-2%' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
    />
  );
}

/* ─── Hex grid SVG pattern ───────────────────────────────── */
function HexGrid() {
  return (
    <div className="absolute inset-0" style={{ opacity: 0.4 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon points="14,2 42,2 56,24 42,46 14,46 0,24"
              fill="none" stroke="rgba(0,140,255,0.06)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
    </div>
  );
}

/* ─── Jarvis Background ──────────────────────────────────── */
export function SLSystemBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: BG }} />

      {/* Radial ambient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,80,180,0.08) 0%, transparent 70%)',
      }} />

      {/* Hex grid */}
      <HexGrid />

      {/* Arc reactor rings — centered */}
      <ArcReactor />

      {/* Horizontal data lines */}
      {[15, 30, 50, 70, 85].map((pct, i) => (
        <div key={i} className="absolute left-0 right-0" style={{
          top: `${pct}%`, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,168,255,0.05) 30%, rgba(0,168,255,0.05) 70%, transparent 100%)',
        }} />
      ))}

      {/* Scan beam */}
      <ScanBeam />

      {/* Top-left data block */}
      <div className="absolute top-4 left-4 font-mono space-y-1" style={{ opacity: 0.18 }}>
        {['SYS_STATUS: ONLINE', 'PROC: 94.2%', 'MEM: 16.4 GB', 'NET: SECURE'].map((l, i) => (
          <div key={i} className="text-[7px] tracking-widest uppercase" style={{ color: ACCENT }}>{l}</div>
        ))}
      </div>

      {/* Top-right data block */}
      <div className="absolute top-4 right-4 font-mono space-y-1 text-right" style={{ opacity: 0.18 }}>
        {['SHIELD: ACTIVE', 'PROTOCOLS: 847', 'THREAT LEVEL: 0', 'JARVIS v3.0'].map((l, i) => (
          <div key={i} className="text-[7px] tracking-widest uppercase" style={{ color: ACCENT }}>{l}</div>
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 95% 95% at 50% 50%, transparent 40%, rgba(1,5,12,0.85) 100%)',
      }} />

      {/* HUD Corners */}
      {[
        { top: 12, left: 12, rotate: 0 },
        { top: 12, right: 12, rotate: 90 },
        { bottom: 12, right: 12, rotate: 180 },
        { bottom: 12, left: 12, rotate: 270 },
      ].map((c, i) => (
        <div key={i} className="absolute" style={{
          top: c.top, right: c.right, bottom: c.bottom, left: c.left,
          width: 28, height: 28,
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            style={{ transform: `rotate(${c.rotate}deg)` }}>
            <path d="M0 10 L0 0 L10 0" stroke={ACCENT} strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
            <path d="M0 0 L5 0" stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
            <path d="M0 0 L0 5" stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
          </svg>
        </div>
      ))}

      {/* Bottom label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.6em] whitespace-nowrap"
        style={{ color: 'rgba(0,168,255,0.25)' }}>
        — J.A.R.V.I.S INTERFACE v3.0 —
      </div>
    </div>
  );
}

/* ── Aliases ── */
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
        background: 'rgba(1,12,28,0.92)',
        border: `1px solid ${BORDER}`,
        borderRadius: 2,
        boxShadow: `0 0 0 1px rgba(0,100,200,0.06), inset 0 1px 0 rgba(0,168,255,0.05)`,
      }}
    >
      {/* Angled top-left cut */}
      <div className="absolute top-0 left-0 w-0 h-0" style={{
        borderLeft: '12px solid rgba(1,12,28,0.92)',
        borderBottom: '12px solid transparent',
        zIndex: 1,
      }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b" style={{ borderColor: BORDER }}>
        <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: DIM }}>
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-[9px]" style={{ color: MUTED }}>
            / {subtitle}
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${BORDER})` }} />
          <div className="w-1 h-1 rotate-45" style={{ background: MUTED }} />
        </div>
      </div>
      <div className="p-5">{children}</div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-4 right-4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${BORDER}, transparent)` }} />
    </motion.div>
  );
}

/* ─── Stat Badge ─────────────────────────────────────────── */
export function StatBadge({ label, value, icon: Icon, sub }) {
  return (
    <motion.div
      whileHover={{ borderColor: BORDER_H, boxShadow: `0 0 20px rgba(0,168,255,0.1)` }}
      className="relative p-5 transition-all duration-300"
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 2,
        boxShadow: 'inset 0 1px 0 rgba(0,168,255,0.05)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        {Icon && <Icon className="w-3.5 h-3.5" style={{ color: MUTED }} />}
        <motion.div className="w-1 h-1 rounded-full"
          style={{ background: ACCENT }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>
      <div className="font-mono text-3xl font-black mb-1" style={{
        color: TEXT,
        textShadow: `0 0 20px rgba(0,180,255,0.4)`,
      }}>{value}</div>
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
      style={{
        border: `1px solid ${BORDER}`,
        borderRadius: 2,
        background: 'rgba(0,100,200,0.04)',
        borderLeft: `2px solid ${ACCENT}`,
      }}
    >
      <span className="font-mono text-[9px] mt-0.5" style={{ color: ACCENT }}>›</span>
      <p className="font-mono text-[11px] leading-relaxed" style={{ color: DIM }}>{children}</p>
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
          background: 'rgba(0,40,80,0.3)',
          border: `1px solid ${f ? BORDER_H : BORDER}`,
          borderRadius: 2,
          color: TEXT,
          boxShadow: f ? `0 0 12px rgba(0,168,255,0.1), inset 0 0 8px rgba(0,100,200,0.05)` : 'none',
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
          background: 'rgba(0,40,80,0.3)',
          border: `1px solid ${f ? BORDER_H : BORDER}`,
          borderRadius: 2,
          color: TEXT,
          boxShadow: f ? `0 0 12px rgba(0,168,255,0.1), inset 0 0 8px rgba(0,100,200,0.05)` : 'none',
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
        style={{
          background: '#010c1e',
          border: `1px solid ${BORDER}`,
          borderRadius: 2,
          color: TEXT,
        }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o} className="bg-[#010c1e]">
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
    primary: {
      border: `1px solid ${BORDER_H}`,
      background: 'rgba(0,100,200,0.12)',
      color: TEXT,
      borderRadius: 2,
      boxShadow: `0 0 12px rgba(0,168,255,0.15)`,
    },
    danger: {
      border: `1px solid rgba(255,60,30,0.4)`,
      background: 'transparent',
      color: '#ff8070',
      borderRadius: 2,
    },
    ghost: {
      border: `1px solid ${BORDER}`,
      background: 'transparent',
      color: DIM,
      borderRadius: 2,
    },
  };
  return (
    <button className={`${base} ${className}`} style={styles[variant] ?? styles.primary} {...props}>
      {children}
    </button>
  );
}

/* ─── Rank Badge ─────────────────────────────────────────── */
const RC = {
  S: '#ff9900',
  A: '#00d4ff',
  B: '#7c6ff7',
  C: '#00e5a0',
  D: '#ffcc44',
  E: '#6b7280',
};
export function RankBadge({ rank }) {
  const c = RC[rank] ?? TEXT;
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 font-mono text-[10px] font-black uppercase"
      style={{
        color: c,
        border: `1px solid ${c}50`,
        background: `${c}0d`,
        letterSpacing: '0.05em',
        boxShadow: `0 0 6px ${c}30`,
      }}
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
      style={{
        height: 26,
        borderTop: `1px solid ${BORDER}`,
        background: 'rgba(1,5,14,0.98)',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 -1px 0 rgba(0,100,200,0.08), 0 -4px 20px rgba(0,50,120,0.15)`,
      }}
    >
      {/* Glow line top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${ACCENT}30 50%, transparent 100%)` }} />

      <div className="flex items-center gap-2">
        <motion.div className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#00e57a', boxShadow: '0 0 4px #00e57a' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[7px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>Online</span>
      </div>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: DIM }}>{admin?.name ?? '—'}</span>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: rc }}>{admin?.rank ?? '—'}-class</span>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: 'rgba(0,168,255,0.25)' }}>J.A.R.V.I.S ACTIVE</span>
      <div className="ml-auto flex items-center gap-3">
        <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: 'rgba(0,168,255,0.2)' }}>KORILAB SYS</span>
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
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rotate-45" style={{ background: ACCENT, opacity: 0.5 }} />
        <span className="font-mono text-[8px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
          {label}
        </span>
        <div className="w-1 h-1 rotate-45" style={{ background: ACCENT, opacity: 0.5 }} />
      </div>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  );
}
