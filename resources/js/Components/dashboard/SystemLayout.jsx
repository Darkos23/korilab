import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens — Palette MelanoGeek / KoriLab Dakar ── */
const BG        = '#F5EDD6';
const SURFACE   = 'rgba(200,72,24,0.05)';
const BORDER    = 'rgba(30,14,4,0.14)';
const BORDER_H  = 'rgba(200,72,24,0.45)';
const TEXT      = '#1E0E04';
const DIM       = 'rgba(30,14,4,0.52)';
const MUTED     = 'rgba(30,14,4,0.35)';
const RED       = '#C84818';
const TERRA     = '#C84818';
const GOLD      = '#B87820';

/* ─── Soft UI shadows ────────────────────────────────────── */
const SHADOW_RAISED  = '8px 8px 16px rgba(180,130,60,0.28), -8px -8px 16px rgba(255,255,255,0.85)';
const SHADOW_INSET   = 'inset 4px 4px 8px rgba(180,130,60,0.22), inset -4px -4px 8px rgba(255,255,255,0.75)';
const SHADOW_RAISED_SM = '4px 4px 10px rgba(180,130,60,0.22), -4px -4px 10px rgba(255,255,255,0.8)';

/* ─── Background Kente / Dakar ───────────────────────────── */
export function SLSystemBG() { return null; }

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
        background: BG,
        borderRadius: 16,
        boxShadow: SHADOW_RAISED,
        transition: 'all 0.2s ease',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(180,130,60,0.12)' }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: DIM }}>
          {title}
        </span>
        {subtitle && (
          <span className="font-mono text-[9px]" style={{ color: MUTED }}>
            / {subtitle}
          </span>
        )}
        <div className="ml-auto flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(30,14,4,0.15)' }} />
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
      whileHover={{ boxShadow: '10px 10px 20px rgba(180,130,60,0.32), -10px -10px 20px rgba(255,255,255,0.9)' }}
      className="relative p-5 transition-all duration-200"
      style={{
        background: BG,
        borderRadius: 16,
        boxShadow: SHADOW_RAISED,
      }}
    >
      {/* Point terracotta en badge haut-droite */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: TERRA }} />
      <div className="flex items-start justify-between mb-4">
        {Icon && <Icon className="w-3.5 h-3.5" style={{ color: MUTED }} />}
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
      style={{
        background: BG,
        borderRadius: 12,
        boxShadow: SHADOW_RAISED_SM,
      }}
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
          background: BG,
          boxShadow: f ? 'inset 5px 5px 10px rgba(180,130,60,0.25), inset -5px -5px 10px rgba(255,255,255,0.8)' : SHADOW_INSET,
          borderRadius: 12,
          border: 'none',
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
          background: BG,
          boxShadow: f ? 'inset 5px 5px 10px rgba(180,130,60,0.25), inset -5px -5px 10px rgba(255,255,255,0.8)' : SHADOW_INSET,
          borderRadius: 12,
          border: 'none',
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
        style={{ background: BG, border: 'none', boxShadow: SHADOW_INSET, borderRadius: 12, color: TEXT }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o} style={{ background: BG }}>
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

  const getStyle = (v) => {
    if (v === 'danger') return {
      background: BG,
      boxShadow: SHADOW_RAISED,
      borderRadius: 12,
      border: 'none',
      color: RED,
    };
    if (v === 'ghost') return {
      background: BG,
      boxShadow: SHADOW_RAISED_SM,
      borderRadius: 12,
      border: 'none',
      color: DIM,
    };
    // primary
    return {
      background: BG,
      boxShadow: SHADOW_RAISED,
      borderRadius: 12,
      border: 'none',
      color: TEXT,
    };
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = SHADOW_INSET;
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = SHADOW_RAISED;
  };

  return (
    <button
      className={`${base} ${className}`}
      style={getStyle(variant)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─── Rank Badge ─────────────────────────────────────────── */
const RC = { S: GOLD, A: '#8b6010', B: RED, C: '#5a3a9a', D: '#2a7a6a', E: '#6b7280' };
export function RankBadge({ rank }) {
  const c = RC[rank] ?? TEXT;
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 font-mono text-[10px] font-black uppercase"
      style={{ color: c, background: `${c}10`, borderRadius: 4, boxShadow: SHADOW_RAISED_SM }}
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
        height: 24,
        background: 'rgba(245,237,214,0.98)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 -2px 12px rgba(180,130,60,0.12)',
      }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: GOLD }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[7px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>En ligne</span>
      </div>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: DIM }}>{admin?.name ?? '—'}</span>
      <span className="font-mono text-[7px]" style={{ color: MUTED }}>·</span>
      <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: rc }}>{admin?.rank ?? '—'}</span>
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
      <div className="flex-1 h-px" style={{ background: 'rgba(180,130,60,0.18)' }} />
      <span className="font-mono text-[8px] uppercase tracking-[0.35em]" style={{ color: MUTED }}>
        ◆ {label} ◆
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(180,130,60,0.18)' }} />
    </div>
  );
}
