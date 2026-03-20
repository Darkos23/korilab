import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Solo Leveling Custom Cursor
   • Flèche SVG bleue électrique (#00a8ff)
   • Anneau de tracking qui suit avec délai
   • Traînée de particules lumineuses
   • Effet "glow" au clic
   ───────────────────────────────────────────────────────── */

const TRAIL_LENGTH = 10;

export default function SLCursor() {
  const [pos, setPos]           = useState({ x: -100, y: -100 });
  const [ring, setRing]         = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [trail, setTrail]       = useState(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const [hovering, setHovering] = useState(false);

  const ringRef  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef(null);

  /* ── Suivi souris ── */
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
      setTrail((prev) => {
        const next = [{ x, y }, ...prev.slice(0, TRAIL_LENGTH - 1)];
        return next;
      });

      // Hover sur éléments cliquables
      const el = document.elementFromPoint(x, y);
      const isLink = el?.closest("a, button, [role=button], input, textarea, select, label");
      setHovering(!!isLink);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  /* ── Anneau avec lag (lerp) ── */
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ringRef.current = {
        x: lerp(ringRef.current.x, pos.x, 0.12),
        y: lerp(ringRef.current.y, pos.y, 0.12),
      };
      setRing({ ...ringRef.current });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pos]);

  /* ── Cache le curseur natif ── */
  useEffect(() => {
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, []);

  const C = "#00a8ff";

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden>

      {/* ── Traînée de particules ── */}
      {trail.map((p, i) => {
        const size  = 4 - i * 0.3;
        const alpha = (1 - i / TRAIL_LENGTH) * 0.45;
        return (
          <div
            key={i}
            style={{
              position:    "fixed",
              left:         p.x - size / 2,
              top:          p.y - size / 2,
              width:        Math.max(size, 0.5),
              height:       Math.max(size, 0.5),
              borderRadius: "50%",
              background:   `rgba(0,168,255,${alpha})`,
              boxShadow:    `0 0 ${4 - i * 0.3}px rgba(0,168,255,${alpha * 0.8})`,
              pointerEvents:"none",
              transition:   "none",
            }}
          />
        );
      })}

      {/* ── Anneau extérieur (lag) ── */}
      <div
        style={{
          position:     "fixed",
          left:          ring.x - (hovering ? 20 : 14),
          top:           ring.y - (hovering ? 20 : 14),
          width:         hovering ? 40 : 28,
          height:        hovering ? 40 : 28,
          borderRadius:  "50%",
          border:        `1px solid rgba(0,168,255,${clicking ? 0.9 : 0.45})`,
          boxShadow:     clicking
            ? `0 0 12px rgba(0,168,255,0.8), inset 0 0 6px rgba(0,168,255,0.3)`
            : `0 0 6px rgba(0,168,255,0.3)`,
          background:    clicking ? "rgba(0,168,255,0.08)" : "transparent",
          transition:    "width 0.15s, height 0.15s, left 0.15s, top 0.15s, border-color 0.1s, box-shadow 0.1s",
          pointerEvents: "none",
        }}
      />

      {/* ── Curseur principal — flèche SL ── */}
      <div
        style={{
          position:     "fixed",
          left:          pos.x,
          top:           pos.y,
          pointerEvents: "none",
          transform:     clicking ? "scale(0.85)" : "scale(1)",
          transition:    "transform 0.1s",
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          style={{
            filter: clicking
              ? `drop-shadow(0 0 6px ${C}) drop-shadow(0 0 12px ${C})`
              : `drop-shadow(0 0 3px ${C}80) drop-shadow(0 0 6px ${C}40)`,
            transition: "filter 0.1s",
          }}
        >
          {/* Corps de la flèche */}
          <path
            d="M2 2 L2 20 L8 14 L12 22 L14.5 21 L10.5 13 L18 13 Z"
            fill={`rgba(0,168,255,${clicking ? 0.95 : 0.85})`}
            stroke={C}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Ligne interne décorative */}
          <path
            d="M3.5 4 L3.5 17 L8.5 12"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Flash au clic */}
        {clicking && (
          <div
            style={{
              position:     "absolute",
              top:          -8,
              left:         -8,
              width:         36,
              height:        36,
              borderRadius: "50%",
              background:   "radial-gradient(circle, rgba(0,168,255,0.35) 0%, transparent 70%)",
              pointerEvents:"none",
            }}
          />
        )}
      </div>

      {/* ── Coin d'UI SL au hover sur lien ── */}
      {hovering && (
        <div
          style={{
            position:     "fixed",
            left:          pos.x + 14,
            top:           pos.y + 14,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", width: 6, height: 6 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 5, height: 5, borderTop: `1px solid ${C}`, borderLeft: `1px solid ${C}` }} />
          </div>
        </div>
      )}
    </div>
  );
}
