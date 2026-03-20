import { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

/* ── Hexagones flottants — signature de l'Architecte ── */
function HexGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    /* Hexagone plat */
    const hex = (x, y, r, alpha) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
                : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,210,255,${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    /* Particules flottantes */
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 18 + 8,
      vy: -(Math.random() * 0.25 + 0.08),
      vx: (Math.random() - 0.5) * 0.1,
      op: Math.random() * 0.2 + 0.07,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy; p.x += p.vx;
        if (p.y + p.r < 0) { p.y = canvas.height + p.r; p.x = Math.random() * canvas.width; }
        hex(p.x, p.y, p.r, p.op);
      });
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

/* ── Page principale ── */
export default function Login({ errors }) {
  const [show, setShow] = useState(false);
  const { data, setData, post, processing } = useForm({ username: "", password: "" });
  const submit = (e) => { e.preventDefault(); post("/login"); };

  const C = "#00d4ff"; /* couleur système */

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#060f1c" }}>

      {/* Grille système */}
      <div className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px", opacity: 2,
        }}
      />

      {/* Lueur centrale — source de lumière de l'Architecte */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 65% at 50% 48%, rgba(0,160,230,0.18) 0%, rgba(0,80,140,0.08) 50%, transparent 100%)" }}
      />

      <HexGrid />

      {/* Ligne haut */}
      <div className="fixed top-0 inset-x-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${C}88, transparent)` }} />
      {/* Ligne bas */}
      <div className="fixed bottom-0 inset-x-0 h-px z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${C}44, transparent)` }} />

      {/* ── Contenu ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-20 w-full max-w-[360px] px-4"
      >

        {/* ── En-tête Système ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          {/* Icône ◆ Architecte */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-4"
          >
            <div className="relative">
              <div className="w-12 h-12 border rotate-45 flex items-center justify-center"
                style={{ borderColor: `${C}60`, boxShadow: `0 0 20px ${C}30, inset 0 0 12px ${C}10` }}>
                <div className="w-6 h-6 border rotate-0 flex items-center justify-center"
                  style={{ borderColor: `${C}90`, boxShadow: `0 0 10px ${C}50` }}>
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: C, boxShadow: `0 0 8px 3px ${C}` }} />
                </div>
              </div>
              {/* Coins déco */}
              {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([dx,dy],i)=>(
                <div key={i} className="absolute w-1 h-1"
                  style={{
                    top: dy < 0 ? -2 : "auto", bottom: dy > 0 ? -2 : "auto",
                    left: dx < 0 ? -2 : "auto", right: dx > 0 ? -2 : "auto",
                    background: C, boxShadow: `0 0 4px ${C}`,
                  }}/>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="text-[8px] font-mono uppercase tracking-[0.6em] mb-2"
            style={{ color: `${C}` }}
          >
            System notification
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.15em" }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-2xl font-black uppercase"
            style={{ color: "#e8f6ff", textShadow: `0 0 30px ${C}60, 0 0 60px ${C}25` }}
          >
            Êtes-vous digne ?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="text-[8px] font-mono mt-2 uppercase tracking-[0.3em]"
            style={{ color: `${C}bb` }}
          >
            Identifiez-vous pour accéder au système
          </motion.p>
        </motion.div>

        {/* ── Notification Système — carte ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative"
          style={{
            border: `1px solid ${C}55`,
            borderRadius: "4px",
            background: "linear-gradient(160deg, rgba(0,28,50,0.97) 0%, rgba(0,18,34,0.98) 100%)",
            boxShadow: `0 0 0 1px ${C}18, 0 0 50px ${C}20, 0 0 100px ${C}0e, inset 0 1px 0 ${C}22`,
          }}
        >
          {/* Scanlines très subtiles */}
          <div className="absolute inset-0 rounded pointer-events-none"
            style={{ backgroundImage: `repeating-linear-gradient(0deg,${C}09 0px,${C}09 1px,transparent 1px,transparent 5px)` }} />

          {/* Coins lumineux */}
          {[
            "absolute top-0 left-0 w-3 h-px",
            "absolute top-0 left-0 w-px h-3",
            "absolute top-0 right-0 w-3 h-px",
            "absolute top-0 right-0 w-px h-3",
            "absolute bottom-0 left-0 w-3 h-px",
            "absolute bottom-0 left-0 w-px h-3",
            "absolute bottom-0 right-0 w-3 h-px",
            "absolute bottom-0 right-0 w-px h-3",
          ].map((cls, i) => (
            <div key={i} className={cls} style={{ background: `${C}${i < 4 ? "90" : "50"}` }} />
          ))}

          {/* Titre barre */}
          <div className="relative z-10 flex items-center gap-2.5 px-5 py-3 border-b"
            style={{ borderColor: `${C}12`, background: `${C}06` }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: C, boxShadow: `0 0 6px 2px ${C}cc` }}
            />
            <span className="text-[8px] font-mono uppercase tracking-[0.35em]"
              style={{ color: `${C}ee` }}>
              Vérification d'identité — Niveau S
            </span>
            <div className="ml-auto flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-px"
                  style={{ width: i % 2 === 0 ? 10 : 6, background: `${C}${i === 0 ? "60" : "20"}` }} />
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="relative z-10 p-6 space-y-5">
            <AnimatePresence>
              {errors?.credentials && (
                <motion.div
                  initial={{ opacity: 0, x: -10, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-mono"
                  style={{ border: "1px solid rgba(255,60,60,0.3)", background: "rgba(255,40,40,0.06)", color: "#ff6b6b", borderRadius: 3 }}>
                  <span className="text-base leading-none">⚠</span>
                  {errors.credentials}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Champs ── */}
            {[
              { label: "Nom du joueur", key: "username", type: "text", placeholder: "identifiant", auto: "username" },
              { label: "Code d'accès",  key: "password", type: show ? "text" : "password", placeholder: "••••••••••", auto: "current-password" },
            ].map(({ label, key, type, placeholder, auto }) => (
              <div key={key}>
                <label className="block text-[8px] font-mono uppercase tracking-[0.38em] mb-1.5"
                  style={{ color: `${C}cc` }}>
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={type}
                    value={data[key]}
                    onChange={e => setData(key, e.target.value)}
                    placeholder={placeholder}
                    autoComplete={auto}
                    className="w-full px-4 py-2.5 text-sm font-mono outline-none transition-all duration-200 placeholder-white/10"
                    style={{
                      background: `${C}05`,
                      border: `1px solid ${C}18`,
                      borderRadius: 3,
                      color: "#c8eaf8",
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = `${C}50`;
                      e.target.style.boxShadow = `0 0 12px ${C}15`;
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = `${C}18`;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {key === "password" && (
                    <button type="button" onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: `${C}35` }}>
                      {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* ── Bouton ── */}
            <motion.button
              type="submit"
              disabled={processing}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full py-3 text-sm font-mono font-bold tracking-[0.3em] uppercase
                transition-all duration-300 overflow-hidden group mt-1 disabled:opacity-40"
              style={{
                border: `1px solid ${C}40`,
                borderRadius: 3,
                background: `linear-gradient(90deg, ${C}12 0%, ${C}1a 50%, ${C}12 100%)`,
                color: C,
                boxShadow: `0 0 20px ${C}10`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 0 30px ${C}25, inset 0 0 20px ${C}0a`;
                e.currentTarget.style.borderColor = `${C}70`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 0 20px ${C}10`;
                e.currentTarget.style.borderColor = `${C}40`;
              }}
            >
              <span className="relative z-10">
                {processing ? "[ Vérification... ]" : "[ Entrer dans le système ]"}
              </span>
              {/* Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{ background: `linear-gradient(90deg, transparent, ${C}12, transparent)` }} />
            </motion.button>
          </form>

          {/* Bas de carte — info système */}
          <div className="relative z-10 flex items-center justify-between px-5 py-2.5 border-t"
            style={{ borderColor: `${C}0e`, background: `${C}04` }}>
            <span className="text-[7px] font-mono uppercase tracking-widest"
              style={{ color: `${C}99` }}>
              Architecte v2.0 — Système actif
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div key={i} className="w-1 h-1 rounded-full"
                  style={{ background: `${C}60` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Avertissement bas */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="text-center text-[7px] font-mono uppercase tracking-widest mt-5"
          style={{ color: `${C}70` }}
        >
          Warning · Failure to comply will result in an appropriate penalty
        </motion.p>
      </motion.div>
    </div>
  );
}
