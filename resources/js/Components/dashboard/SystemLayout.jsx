import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens — Cauri / KoriLab Dakar (mode sable) ── */
const BG        = '#f7edd8';          /* sable chaud        */
const SURFACE   = 'rgba(160,110,30,0.06)';
const BORDER    = 'rgba(140,95,25,0.18)';
const BORDER_H  = 'rgba(140,95,25,0.45)';
const TEXT      = '#1e1408';          /* brun nuit          */
const DIM       = 'rgba(30,20,8,0.65)';
const MUTED     = 'rgba(30,20,8,0.38)';
const RED       = '#c44030';
const GOLD      = '#a8720a';          /* or sombre (lisible sur clair) */

/* ─── Runes Tifinagh flottantes ──────────────────────────── */
const TIFINAGH = ['ⵀ','ⵃ','ⵅ','ⵇ','ⵉ','ⵌ','ⵎ','ⵏ','ⵓ','ⵔ','ⵖ','ⵙ','ⵛ','ⵜ','ⵟ','ⵢ','ⵣ','ⵥ','ⵯ'];

function FloatingRunes() {
  const runes = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    char: TIFINAGH[i % TIFINAGH.length],
    x: (i * 37 + 5) % 95,
    y: (i * 53 + 8) % 90,
    size: 14 + (i % 3) * 6,
    duration: 18 + (i % 7) * 4,
    delay: -(i * 2.3),
    drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 5),
  }));

  return (
    <>
      {runes.map(r => (
        <motion.div
          key={r.id}
          className="absolute select-none"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            fontSize: r.size,
            color: 'rgba(140,95,25,0.12)',
            fontFamily: 'serif',
          }}
          animate={{
            y: [0, r.drift, 0],
            opacity: [0.08, 0.16, 0.08],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {r.char}
        </motion.div>
      ))}
    </>
  );
}

/* ─── Background désert Dakar ────────────────────────────── */
export function SLSystemBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base — sable */}
      <div className="absolute inset-0" style={{ background: BG }} />

      {/* Grain sable fin */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.045'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 300px',
        mixBlendMode: 'multiply',
      }} />

      {/* Runes Tifinagh flottantes */}
      <FloatingRunes />

      {/* Halo soleil — haut centre */}
      <div className="absolute inset-x-0 top-0" style={{
        height: '60vh',
        background: 'radial-gradient(ellipse 80% 70% at 50% -10%, rgba(220,160,40,0.18) 0%, transparent 70%)',
      }} />

      {/* Orbe terracotta — bas gauche */}
      <div className="absolute rounded-full" style={{
        width: 600, height: 500, bottom: '-10%', left: '-5%',
        background: 'radial-gradient(ellipse, rgba(196,87,58,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Orbe ocre — haut droite */}
      <div className="absolute rounded-full" style={{
        width: 500, height: 400, top: '-5%', right: '-5%',
        background: 'radial-gradient(ellipse, rgba(200,150,40,0.14) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Coins décoratifs */}
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
          borderColor: 'rgba(140,95,25,0.22)',
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
        background: 'rgba(255,252,244,0.92)',
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        boxShadow: '0 2px 16px rgba(140,95,25,0.08)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: BORDER }}>
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
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: BORDER }} />
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
      style={{
        background: 'rgba(255,252,244,0.85)',
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        borderLeft: `3px solid ${GOLD}`,
        boxShadow: '0 2px 12px rgba(140,95,25,0.07)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        {Icon && <Icon className="w-3.5 h-3.5" style={{ color: MUTED }} />}
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
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
        background: 'rgba(255,252,244,0.7)',
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
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
          background: 'rgba(255,252,244,0.9)',
          border: `1px solid ${f ? BORDER_H : BORDER}`,
          borderRadius: 6,
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
          background: 'rgba(255,252,244,0.9)',
          border: `1px solid ${f ? BORDER_H : BORDER}`,
          borderRadius: 6,
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
        style={{ background: '#fffcf4', border: `1px solid ${BORDER}`, borderRadius: 6, color: TEXT }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o} className="bg-[#fffcf4]">
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
    primary: { border: `1px solid ${BORDER_H}`, background: SURFACE, color: TEXT, borderRadius: 6 },
    danger:  { border: `1px solid rgba(196,64,48,0.4)`, background: 'transparent', color: RED, borderRadius: 6 },
    ghost:   { border: `1px solid ${BORDER}`, background: 'transparent', color: DIM, borderRadius: 6 },
  };
  return (
    <button className={`${base} ${className}`} style={styles[variant] ?? styles.primary} {...props}>
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
      style={{ color: c, border: `1px solid ${c}50`, background: `${c}10`, borderRadius: 4 }}
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
      style={{ height: 24, borderTop: `1px solid ${BORDER}`, background: 'rgba(247,237,216,0.98)', backdropFilter: 'blur(8px)' }}
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
