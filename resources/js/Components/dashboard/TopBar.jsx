import { router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FONT   = "'Century Gothic', 'Trebuchet MS', sans-serif";
const TERRA  = '#B43028';
const GOLD   = '#8A5A18';
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const BORDER = 'rgba(0,0,0,0.07)';
const BG     = '#F5EAD5';

export default function TopBar({ admin, collapsed, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const logout = () => router.post('/logout');

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-5 border-b"
      style={{ height: 44, background: BG, borderColor: BORDER, backdropFilter: 'blur(8px)' }}>

      {/* Toggle sidebar */}
      <button onClick={onToggle}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150"
        style={{ color: INK2, border: `1px solid ${BORDER}` }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(180,48,40,0.25)'; e.currentTarget.style.color = TERRA; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = INK2; }}>
        {collapsed
          ? <PanelLeftOpen size={14} />
          : <PanelLeftClose size={14} />}
      </button>

      {/* Profile dropdown */}
      <div className="relative" ref={ref}>
        <button onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{ border: `1px solid ${open ? 'rgba(180,48,40,0.3)' : BORDER}`, background: 'transparent', cursor: 'pointer' }}>

          {/* Avatar */}
          <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0"
            style={{ background: 'rgba(180,48,40,0.09)', color: TERRA, border: '1px solid rgba(180,48,40,0.22)' }}>
            {(admin?.name ?? 'A').charAt(0).toUpperCase()}
          </div>

          <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: INK }}>
            {admin?.name ?? '—'}
          </span>

          {/* Rank badge */}
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(138,90,24,0.08)', color: GOLD, border: '1px solid rgba(138,90,24,0.2)' }}>
            {admin?.rank}
          </span>

          <ChevronDown size={12} style={{ color: INK2, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50"
              style={{ background: BG, border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}>

              {/* User info */}
              <div className="px-4 py-3 border-b" style={{ borderColor: BORDER }}>
                <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: INK }}>{admin?.name}</div>
                <div style={{ fontFamily: FONT, fontSize: 10, color: INK2, marginTop: 2 }}>
                  Rang {admin?.rank} · Admin KoriLab
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#3A6840' }} />
                  <span className="font-mono text-[9px]" style={{ color: '#3A6840' }}>En ligne</span>
                </div>
              </div>

              {/* Links */}
              <div className="p-1.5 flex flex-col gap-0.5">
                <a href="/dashboard/site"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100"
                  style={{ fontFamily: FONT, fontSize: 12, color: INK2, textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = INK; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK2; }}>
                  <Settings size={13} />
                  Paramètres du site
                </a>
                <button onClick={logout}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100"
                  style={{ fontFamily: FONT, fontSize: 12, color: TERRA, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,48,40,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  <LogOut size={13} />
                  Déconnexion
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
