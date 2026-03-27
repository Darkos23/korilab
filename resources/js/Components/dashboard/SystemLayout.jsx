import { useEffect, useState } from "react";

/* ─── Design tokens — Washi / Nunito ─────────────────────── */
export const T = {
  bg:   '#F8F5EF',
  card: '#FFFFFF',
  sb:   '#FDFBF7',
  s2:   '#F2EDE5',
  s3:   '#E8E2D8',
  tx:   '#1C1A16',
  tx2:  '#5A5448',
  tx3:  '#8A8478',
  tx4:  '#B4AEA4',
  tx5:  '#D0CAC0',
  sep:  'rgba(0,0,0,0.06)',
  acc:  '#B43028',
  acc2: 'rgba(180,48,40,0.09)',
  acc3: 'rgba(180,48,40,0.2)',
  ok:   '#3A6840',
  ok2:  'rgba(58,104,64,0.1)',
  warn: '#8A5A18',
  warn2:'rgba(138,90,24,0.1)',
};

/* ─── Clean flat background — no decorations ─────────────── */
export function SLSystemBG() { return null; }

/* ── Aliases (backward compat) ── */
export function ParticleNetwork() { return null; }
export function SystemGrid()      { return null; }
export function SystemOrbs()      { return null; }
export function SLPortal()        { return null; }
export function Scanlines()       { return null; }

/* ─── Stat Card ──────────────────────────────────────────── */
export function StatBadge({ label, value, icon: Icon, sub }) {
  return (
    <div
      style={{
        background: T.card,
        borderRadius: 14,
        padding: '16px 18px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 0.5px 2px rgba(0,0,0,0.05)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: T.tx4, letterSpacing: '0.4px', marginBottom: 8, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: T.tx, letterSpacing: '-1.2px', lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, fontWeight: 500, color: T.tx4, marginTop: 6 }}>{sub}</div>
      )}
    </div>
  );
}

/* ─── Panel shell ────────────────────────────────────────── */
export function SysWin({ title, subtitle, children, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: T.card,
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 0.5px 2px rgba(0,0,0,0.05)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${T.sep}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: T.tx2 }}>{title}</span>
        {subtitle && <span style={{ fontSize: 11.5, fontWeight: 600, color: T.tx4 }}>{subtitle}</span>}
      </div>
      <div style={{ padding: '13px 16px' }}>{children}</div>
    </div>
  );
}

/* ─── Badge ──────────────────────────────────────────────── */
export function SysNotif({ children }) {
  return (
    <div style={{
      padding: '6px 10px',
      background: T.s2,
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 500,
      color: T.tx3,
      fontFamily: "'Nunito', sans-serif",
    }}>
      {children}
    </div>
  );
}

/* ─── Inputs ─────────────────────────────────────────────── */
export function SysInput({ label, ...props }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.tx4, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%',
          padding: '8px 12px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: T.tx,
          background: T.card,
          border: `1px solid ${T.sep}`,
          borderRadius: 10,
          outline: 'none',
        }}
        {...props}
      />
    </div>
  );
}

export function SysTextarea({ label, rows = 3, ...props }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.tx4, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        style={{
          width: '100%',
          padding: '8px 12px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: T.tx,
          background: T.card,
          border: `1px solid ${T.sep}`,
          borderRadius: 10,
          outline: 'none',
          resize: 'none',
        }}
        {...props}
      />
    </div>
  );
}

export function SysSelect({ label, options, ...props }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.tx4, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>
          {label}
        </label>
      )}
      <select
        style={{
          width: '100%',
          padding: '8px 12px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13,
          color: T.tx,
          background: T.card,
          border: `1px solid ${T.sep}`,
          borderRadius: 10,
          outline: 'none',
        }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─── Button ─────────────────────────────────────────────── */
export function SysBtn({ children, variant = 'primary', className = '', ...props }) {
  const style = variant === 'danger'
    ? { background: T.acc, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }
    : variant === 'ghost'
    ? { background: 'transparent', color: T.tx3, border: `1.5px solid ${T.sep}`, borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }
    : { background: T.tx, color: T.card, border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" };

  return (
    <button className={`flex items-center gap-2 ${className}`} style={style} {...props}>
      {children}
    </button>
  );
}

/* ─── Rank Badge (kept for compat, neutral style) ────────── */
export function RankBadge({ rank }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, color: T.tx3, background: T.s2, borderRadius: 6 }}>
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

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: 26,
      background: T.sb,
      borderTop: `1px solid ${T.sep}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 18px',
      fontFamily: "'DM Mono', monospace",
    }}>
      <span style={{ fontSize: 10, color: T.tx5 }}>korilab.dev · workspace-prod · Dakar, SN</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.ok }} />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ok, fontFamily: "'Nunito', sans-serif" }}>Tous les services nominaux</span>
      </div>
    </div>
  );
}

/* ─── Divider ────────────────────────────────────────────── */
export function SysDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: T.sep }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: T.tx5, letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: T.sep }} />
    </div>
  );
}
