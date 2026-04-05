import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Plus, X, Check,
  User, Briefcase, GraduationCap, Palette, CreditCard,
  Download, Eye,
} from "lucide-react";
import Navbar from "../../Components/Navbar";

/* ─── Constantes ─────────────────────────────────────── */
const THEMES = [
  {
    id: "classic",
    label: "Classic",
    desc: "Colonne latérale navy, style corporate",
    accent: "#1e3a5f",
    bg: "#ffffff",
    text: "#1e293b",
    sidebar: "#1e3a5f",
  },
  {
    id: "modern",
    label: "Modern",
    desc: "Header pleine largeur, deux colonnes",
    accent: "#0ea5e9",
    bg: "#f8fafc",
    text: "#0f172a",
  },
  {
    id: "dark",
    label: "Dark",
    desc: "Sidebar sombre, timeline tech",
    accent: "#38bdf8",
    bg: "#0d1117",
    text: "#e2e8f0",
    sidebar: "#161b22",
  },
  {
    id: "minimal",
    label: "Minimal",
    desc: "Typographie pure, une seule colonne",
    accent: "#6366f1",
    bg: "#ffffff",
    text: "#111827",
  },
];

const LANGUAGE_LEVELS = ["Débutant", "Intermédiaire", "Courant", "Bilingue/Natif"];

const STEPS = [
  { id: 1, label: "Profil",     icon: User },
  { id: 2, label: "Parcours",   icon: Briefcase },
  { id: 3, label: "Compétences",icon: GraduationCap },
  { id: 4, label: "Thème",      icon: Palette },
  { id: 5, label: "Paiement",   icon: CreditCard },
];

/* ─── Initial state ──────────────────────────────────── */
const INIT = {
  prenom: "", nom: "", titre: "",
  email: "", telephone: "", localisation: "",
  portfolio: "", resume: "",
  experiences: [{ poste: "", entreprise: "", periode: "", description: "" }],
  formations: [{ diplome: "", etablissement: "", annee: "" }],
  competences: [],
  langues: [{ langue: "", niveau: "Courant" }],
  theme: "modern",
};

/* ─── Helpers UI ─────────────────────────────────────── */
function Label({ children }) {
  return (
    <span className="block font-mono text-[10px] tracking-widest mb-1.5"
      style={{ color: "rgba(56,189,248,0.7)" }}>
      {children}
    </span>
  );
}

function Input({ value, onChange, placeholder, type = "text", textarea, rows = 3 }) {
  const base = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(56,189,248,0.12)",
    borderRadius: "0.625rem",
    color: "white",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };
  if (textarea) {
    return (
      <textarea
        value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className="px-3.5 py-2.5 resize-none placeholder:text-slate-600 focus:border-sky-500/50"
        style={base}
      />
    );
  }
  return (
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="px-3.5 py-2.5 placeholder:text-slate-600 focus:border-sky-500/50"
      style={base}
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange}
      className="px-3.5 py-2.5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(56,189,248,0.12)",
        borderRadius: "0.625rem",
        color: "white",
        fontSize: "0.875rem",
        width: "100%",
        outline: "none",
      }}>
      {options.map(o => <option key={o} value={o} style={{ background: "#040d1a" }}>{o}</option>)}
    </select>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
      <span className="font-mono text-sky-400/40 text-xs">—</span>
      {children}
    </h3>
  );
}

function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} type="button"
      className="flex items-center gap-2 text-xs font-semibold mt-3 px-3 py-2 rounded-lg transition-all"
      style={{ color: "#38bdf8", background: "rgba(56,189,248,0.07)", border: "1px dashed rgba(56,189,248,0.2)" }}>
      <Plus className="w-3.5 h-3.5" /> {label}
    </button>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick} type="button"
      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all hover:bg-red-500/10"
      style={{ border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)" }}>
      <X className="w-3.5 h-3.5" />
    </button>
  );
}

/* ─── CV Layouts ─────────────────────────────────────── */

// Shared section heading styles per theme
function SecHead({ theme, children, s = "7.5px" }) {
  const styles = {
    classic: { fontWeight: 700, fontSize: s, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.15em", borderBottom: `1.5px solid ${theme.accent}`, paddingBottom: 2, marginBottom: 5 },
    modern:  { fontWeight: 800, fontSize: s, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderLeft: `2.5px solid ${theme.accent}`, paddingLeft: 5, marginBottom: 5 },
    dark:    { fontWeight: 700, fontSize: s, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: `1px solid ${theme.accent}30`, paddingBottom: 2, marginBottom: 5 },
    minimal: { fontWeight: 400, fontSize: s, color: theme.accent, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 6 },
  };
  return <div style={styles[theme.id] || styles.modern}>{children}</div>;
}

function CvClassic({ data, s, theme }) {
  const fullName = [data.prenom, data.nom].filter(Boolean).join(" ") || "Ton Nom";
  const muted = "#94a3b8";
  return (
    <div style={{ display: "flex", minHeight: "100%", fontFamily: "'Segoe UI', sans-serif", fontSize: s, background: theme.bg, color: theme.text }}>
      {/* Sidebar */}
      <div style={{ width: "32%", background: theme.sidebar, padding: "14px 10px", flexShrink: 0 }}>
        {/* Avatar placeholder */}
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.2)", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: 700 }}>{(data.prenom || "T").charAt(0)}</span>
        </div>
        {/* Contact */}
        <div style={{ marginBottom: 10 }}>
          {[data.email, data.telephone, data.localisation, data.portfolio].filter(Boolean).map((v, i) => (
            <div key={i} style={{ color: "rgba(255,255,255,0.65)", fontSize: s === "7.5px" ? "6px" : "4px", marginBottom: 2, wordBreak: "break-all" }}>{v}</div>
          ))}
        </div>
        {/* Compétences */}
        {data.competences.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.5)", fontSize: s === "7.5px" ? "6px" : "4px", textTransform: "uppercase", letterSpacing: "0.15em", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2, marginBottom: 5 }}>Compétences</div>
            {data.competences.map((c, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.8)", fontSize: s === "7.5px" ? "6px" : "4px", marginBottom: 2, paddingLeft: 6, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "rgba(255,255,255,0.3)" }}>›</span>{c}
              </div>
            ))}
          </div>
        )}
        {/* Langues */}
        {data.langues.some(l => l.langue) && (
          <div>
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.5)", fontSize: s === "7.5px" ? "6px" : "4px", textTransform: "uppercase", letterSpacing: "0.15em", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2, marginBottom: 5 }}>Langues</div>
            {data.langues.filter(l => l.langue).map((l, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.75)", fontSize: s === "7.5px" ? "6px" : "4px", marginBottom: 2 }}>{l.langue} <span style={{ color: "rgba(255,255,255,0.35)" }}>· {l.niveau}</span></div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: "14px 12px" }}>
        <div style={{ marginBottom: 10, borderBottom: `3px solid ${theme.accent}`, paddingBottom: 8 }}>
          <div style={{ fontWeight: 900, fontSize: s === "7.5px" ? "15px" : "10px", color: theme.text, letterSpacing: "-0.5px" }}>{fullName}</div>
          {data.titre && <div style={{ fontSize: s === "7.5px" ? "7px" : "4.5px", color: theme.accent, fontWeight: 600, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.1em" }}>{data.titre}</div>}
        </div>
        {data.resume && (
          <div style={{ marginBottom: 10 }}>
            <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Profil</SecHead>
            <p style={{ color: "#475569", fontSize: s === "7.5px" ? "6.5px" : "4px" }}>{data.resume}</p>
          </div>
        )}
        {data.experiences.some(e => e.poste || e.entreprise) && (
          <div style={{ marginBottom: 10 }}>
            <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Expériences</SecHead>
            {data.experiences.filter(e => e.poste || e.entreprise).map((e, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "7px" : "4.5px", color: theme.text }}>{e.poste}</div>
                <div style={{ fontSize: s === "7.5px" ? "6.5px" : "4px", color: theme.accent, fontWeight: 600 }}>{e.entreprise}{e.periode ? ` · ${e.periode}` : ""}</div>
                {e.description && <p style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: muted, marginTop: 1 }}>{e.description}</p>}
              </div>
            ))}
          </div>
        )}
        {data.formations.some(f => f.diplome || f.etablissement) && (
          <div>
            <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Formation</SecHead>
            {data.formations.filter(f => f.diplome || f.etablissement).map((f, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "7px" : "4.5px", color: theme.text }}>{f.diplome}</div>
                <div style={{ fontSize: s === "7.5px" ? "6.5px" : "4px", color: theme.accent }}>{f.etablissement}{f.annee ? ` · ${f.annee}` : ""}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CvModern({ data, s, theme }) {
  const fullName = [data.prenom, data.nom].filter(Boolean).join(" ") || "Ton Nom";
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: s, background: theme.bg, color: theme.text }}>
      {/* Full-width accent header */}
      <div style={{ background: `linear-gradient(135deg, ${theme.accent}, #0369a1)`, padding: s === "7.5px" ? "16px 16px 12px" : "10px 10px 8px" }}>
        <div style={{ fontWeight: 900, fontSize: s === "7.5px" ? "18px" : "12px", color: "#fff", letterSpacing: "-0.5px" }}>{fullName}</div>
        {data.titre && <div style={{ fontSize: s === "7.5px" ? "7.5px" : "5px", color: "rgba(255,255,255,0.85)", fontWeight: 500, marginTop: 2, letterSpacing: "0.08em" }}>{data.titre}</div>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
          {[data.email, data.telephone, data.localisation].filter(Boolean).map((v, i) => (
            <span key={i} style={{ background: "rgba(255,255,255,0.18)", color: "#fff", padding: s === "7.5px" ? "1.5px 6px" : "1px 4px", borderRadius: 20, fontSize: s === "7.5px" ? "5.5px" : "3.5px" }}>{v}</span>
          ))}
        </div>
      </div>
      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr", gap: 0 }}>
        {/* Left */}
        <div style={{ padding: s === "7.5px" ? "10px 12px" : "6px 8px", borderRight: "1px solid #e2e8f0" }}>
          {data.resume && (
            <div style={{ marginBottom: 8 }}>
              <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>À propos</SecHead>
              <p style={{ color: "#475569", fontSize: s === "7.5px" ? "6.5px" : "4px" }}>{data.resume}</p>
            </div>
          )}
          {data.experiences.some(e => e.poste || e.entreprise) && (
            <div style={{ marginBottom: 8 }}>
              <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Expériences</SecHead>
              {data.experiences.filter(e => e.poste || e.entreprise).map((e, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontWeight: 800, fontSize: s === "7.5px" ? "7px" : "4.5px", color: theme.text }}>{e.poste}</div>
                  <div style={{ fontSize: s === "7.5px" ? "6px" : "4px", color: theme.accent, fontWeight: 600 }}>{e.entreprise}{e.periode ? ` · ${e.periode}` : ""}</div>
                  {e.description && <p style={{ fontSize: s === "7.5px" ? "5.5px" : "3.5px", color: "#64748b", marginTop: 1 }}>{e.description}</p>}
                </div>
              ))}
            </div>
          )}
          {data.formations.some(f => f.diplome || f.etablissement) && (
            <div>
              <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Formation</SecHead>
              {data.formations.filter(f => f.diplome || f.etablissement).map((f, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "7px" : "4.5px", color: theme.text }}>{f.diplome}</div>
                  <div style={{ fontSize: s === "7.5px" ? "6px" : "4px", color: theme.accent }}>{f.etablissement}{f.annee ? ` · ${f.annee}` : ""}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right */}
        <div style={{ padding: s === "7.5px" ? "10px 10px" : "6px 7px" }}>
          {data.competences.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Compétences</SecHead>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {data.competences.map((c, i) => (
                  <span key={i} style={{ background: `${theme.accent}15`, color: theme.accent, padding: s === "7.5px" ? "2px 5px" : "1px 3px", borderRadius: 4, fontSize: s === "7.5px" ? "6px" : "3.5px", fontWeight: 600 }}>{c}</span>
                ))}
              </div>
            </div>
          )}
          {data.langues.some(l => l.langue) && (
            <div>
              <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Langues</SecHead>
              {data.langues.filter(l => l.langue).map((l, i) => (
                <div key={i} style={{ marginBottom: 3 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: s === "7.5px" ? "6px" : "4px" }}>
                    <span style={{ fontWeight: 600, color: theme.text }}>{l.langue}</span>
                    <span style={{ color: "#94a3b8" }}>{l.niveau}</span>
                  </div>
                  <div style={{ height: 2, background: "#e2e8f0", borderRadius: 1, marginTop: 1 }}>
                    <div style={{ height: "100%", background: theme.accent, borderRadius: 1, width: l.niveau === "Bilingue/Natif" ? "100%" : l.niveau === "Courant" ? "80%" : l.niveau === "Intermédiaire" ? "55%" : "30%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CvDark({ data, s, theme }) {
  const fullName = [data.prenom, data.nom].filter(Boolean).join(" ") || "Ton Nom";
  return (
    <div style={{ display: "flex", fontFamily: "'Segoe UI', sans-serif", fontSize: s, background: theme.bg, color: theme.text, minHeight: "100%" }}>
      {/* Dark sidebar */}
      <div style={{ width: "35%", background: theme.sidebar, padding: s === "7.5px" ? "14px 10px" : "8px 7px", flexShrink: 0 }}>
        <div style={{ fontWeight: 900, fontSize: s === "7.5px" ? "12px" : "8px", color: theme.accent, letterSpacing: "-0.3px", marginBottom: 2 }}>{fullName}</div>
        {data.titre && <div style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: "rgba(226,232,240,0.5)", fontWeight: 500, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>{data.titre}</div>}
        <div style={{ borderTop: `1px solid ${theme.accent}30`, paddingTop: 8, marginBottom: 10 }}>
          {[data.email, data.telephone, data.localisation, data.portfolio].filter(Boolean).map((v, i) => (
            <div key={i} style={{ color: "rgba(226,232,240,0.55)", fontSize: s === "7.5px" ? "5.5px" : "3.5px", marginBottom: 2, wordBreak: "break-all" }}>{v}</div>
          ))}
        </div>
        {data.competences.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, color: theme.accent, fontSize: s === "7.5px" ? "6px" : "4px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 5 }}>Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {data.competences.map((c, i) => (
                <span key={i} style={{ background: `${theme.accent}18`, color: theme.accent, padding: s === "7.5px" ? "1.5px 4px" : "1px 3px", borderRadius: 3, fontSize: s === "7.5px" ? "5.5px" : "3.5px", fontWeight: 600, border: `1px solid ${theme.accent}30` }}>{c}</span>
              ))}
            </div>
          </div>
        )}
        {data.langues.some(l => l.langue) && (
          <div>
            <div style={{ fontWeight: 700, color: theme.accent, fontSize: s === "7.5px" ? "6px" : "4px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 5 }}>Langues</div>
            {data.langues.filter(l => l.langue).map((l, i) => (
              <div key={i} style={{ color: "rgba(226,232,240,0.65)", fontSize: s === "7.5px" ? "5.5px" : "3.5px", marginBottom: 2 }}>{l.langue} <span style={{ color: theme.accent, opacity: 0.6 }}>/ {l.niveau}</span></div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: s === "7.5px" ? "14px 12px" : "8px 8px" }}>
        {data.resume && (
          <div style={{ marginBottom: 10, padding: s === "7.5px" ? "6px 8px" : "4px 5px", background: `${theme.accent}08`, borderLeft: `2px solid ${theme.accent}`, borderRadius: "0 4px 4px 0" }}>
            <p style={{ color: "rgba(226,232,240,0.7)", fontSize: s === "7.5px" ? "6px" : "3.5px" }}>{data.resume}</p>
          </div>
        )}
        {data.experiences.some(e => e.poste || e.entreprise) && (
          <div style={{ marginBottom: 10 }}>
            <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Expériences</SecHead>
            {data.experiences.filter(e => e.poste || e.entreprise).map((e, i) => (
              <div key={i} style={{ marginBottom: 7, paddingLeft: 10, position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 2, width: 5, height: 5, borderRadius: "50%", background: theme.accent, border: `1px solid ${theme.bg}` }} />
                {i < data.experiences.filter(x => x.poste || x.entreprise).length - 1 && (
                  <div style={{ position: "absolute", left: 2, top: 7, width: 1, bottom: -5, background: `${theme.accent}25` }} />
                )}
                <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "7px" : "4.5px", color: "#e2e8f0" }}>{e.poste}</div>
                <div style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: theme.accent, fontWeight: 600, marginBottom: 1 }}>{e.entreprise}{e.periode ? ` · ${e.periode}` : ""}</div>
                {e.description && <p style={{ fontSize: s === "7.5px" ? "5.5px" : "3.5px", color: "rgba(226,232,240,0.5)" }}>{e.description}</p>}
              </div>
            ))}
          </div>
        )}
        {data.formations.some(f => f.diplome || f.etablissement) && (
          <div>
            <SecHead theme={theme} s={s === "7.5px" ? "7px" : "4.5px"}>Formation</SecHead>
            {data.formations.filter(f => f.diplome || f.etablissement).map((f, i) => (
              <div key={i} style={{ marginBottom: 5 }}>
                <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "7px" : "4.5px", color: "#e2e8f0" }}>{f.diplome}</div>
                <div style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: theme.accent }}>{f.etablissement}{f.annee ? ` · ${f.annee}` : ""}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CvMinimal({ data, s, theme }) {
  const fullName = [data.prenom, data.nom].filter(Boolean).join(" ") || "Ton Nom";
  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: s, background: theme.bg, color: theme.text, padding: s === "7.5px" ? "18px 20px" : "10px 12px" }}>
      {/* Header — typographic only */}
      <div style={{ marginBottom: s === "7.5px" ? 12 : 7 }}>
        <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "20px" : "13px", color: "#111", letterSpacing: "-0.5px", fontFamily: "Georgia, serif" }}>{fullName}</div>
        {data.titre && <div style={{ fontSize: s === "7.5px" ? "7.5px" : "5px", color: theme.accent, fontWeight: 400, marginTop: 2, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Segoe UI', sans-serif" }}>{data.titre}</div>}
        <div style={{ marginTop: 5, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[data.email, data.telephone, data.localisation, data.portfolio].filter(Boolean).map((v, i) => (
            <span key={i} style={{ color: "#6b7280", fontSize: s === "7.5px" ? "6px" : "4px" }}>{v}</span>
          ))}
        </div>
        <div style={{ height: 1, background: "#111", marginTop: 8 }} />
      </div>
      {/* Single column, generous spacing */}
      {data.resume && (
        <div style={{ marginBottom: 10 }}>
          <SecHead theme={theme} s={s === "7.5px" ? "6.5px" : "4px"}>Profil</SecHead>
          <p style={{ color: "#374151", fontSize: s === "7.5px" ? "6.5px" : "4px", fontFamily: "Georgia, serif", lineHeight: 1.6 }}>{data.resume}</p>
        </div>
      )}
      {data.experiences.some(e => e.poste || e.entreprise) && (
        <div style={{ marginBottom: 10 }}>
          <SecHead theme={theme} s={s === "7.5px" ? "6.5px" : "4px"}>Expériences</SecHead>
          {data.experiences.filter(e => e.poste || e.entreprise).map((e, i) => (
            <div key={i} style={{ marginBottom: 7, display: "grid", gridTemplateColumns: "1fr auto" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "7px" : "4.5px", color: "#111", fontFamily: "Georgia, serif" }}>{e.poste}</div>
                <div style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: theme.accent, fontStyle: "italic", fontFamily: "Georgia, serif" }}>{e.entreprise}</div>
                {e.description && <p style={{ fontSize: s === "7.5px" ? "5.5px" : "3.5px", color: "#6b7280", marginTop: 1, lineHeight: 1.5 }}>{e.description}</p>}
              </div>
              {e.periode && <div style={{ fontSize: s === "7.5px" ? "5.5px" : "3.5px", color: "#9ca3af", whiteSpace: "nowrap", marginLeft: 6, marginTop: 1 }}>{e.periode}</div>}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {data.competences.length > 0 && (
          <div>
            <SecHead theme={theme} s={s === "7.5px" ? "6.5px" : "4px"}>Compétences</SecHead>
            <p style={{ color: "#374151", fontSize: s === "7.5px" ? "6px" : "3.5px", lineHeight: 1.8 }}>
              {data.competences.join(" · ")}
            </p>
          </div>
        )}
        <div>
          {data.formations.some(f => f.diplome || f.etablissement) && (
            <div style={{ marginBottom: 6 }}>
              <SecHead theme={theme} s={s === "7.5px" ? "6.5px" : "4px"}>Formation</SecHead>
              {data.formations.filter(f => f.diplome || f.etablissement).map((f, i) => (
                <div key={i} style={{ marginBottom: 3 }}>
                  <div style={{ fontWeight: 700, fontSize: s === "7.5px" ? "6.5px" : "4px", color: "#111", fontFamily: "Georgia, serif" }}>{f.diplome}</div>
                  <div style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: theme.accent, fontStyle: "italic" }}>{f.etablissement}{f.annee ? `, ${f.annee}` : ""}</div>
                </div>
              ))}
            </div>
          )}
          {data.langues.some(l => l.langue) && (
            <div>
              <SecHead theme={theme} s={s === "7.5px" ? "6.5px" : "4px"}>Langues</SecHead>
              {data.langues.filter(l => l.langue).map((l, i) => (
                <div key={i} style={{ fontSize: s === "7.5px" ? "6px" : "3.5px", color: "#374151", marginBottom: 1 }}>{l.langue} <span style={{ color: "#9ca3af" }}>— {l.niveau}</span></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── CV Preview (panel droit) ───────────────────────── */
function CvPreview({ data }) {
  const theme = THEMES.find(t => t.id === data.theme) || THEMES[1];
  const props = { data, s: "7.5px", theme };
  return (
    <div className="w-full overflow-hidden rounded-xl shadow-2xl" style={{ border: `1px solid ${theme.accent}20` }}>
      {data.theme === "classic"  && <CvClassic  {...props} />}
      {data.theme === "modern"   && <CvModern   {...props} />}
      {data.theme === "dark"     && <CvDark     {...props} />}
      {data.theme === "minimal"  && <CvMinimal  {...props} />}
    </div>
  );
}

/* ─── Steps ──────────────────────────────────────────── */
function StepProfil({ data, set }) {
  const u = (field) => (e) => set({ ...data, [field]: e.target.value });
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Informations personnelles</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>PRÉNOM</Label><Input value={data.prenom} onChange={u("prenom")} placeholder="Ibrahima" /></div>
        <div><Label>NOM</Label><Input value={data.nom} onChange={u("nom")} placeholder="Sarr" /></div>
      </div>
      <div><Label>TITRE PROFESSIONNEL</Label><Input value={data.titre} onChange={u("titre")} placeholder="Développeur Full Stack" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>EMAIL</Label><Input value={data.email} onChange={u("email")} placeholder="ibrahima@email.com" type="email" /></div>
        <div><Label>TÉLÉPHONE</Label><Input value={data.telephone} onChange={u("telephone")} placeholder="+221 77 000 00 00" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>LOCALISATION</Label><Input value={data.localisation} onChange={u("localisation")} placeholder="Dakar, Sénégal" /></div>
        <div><Label>LINKEDIN / PORTFOLIO</Label><Input value={data.portfolio} onChange={u("portfolio")} placeholder="linkedin.com/in/ibrahima" /></div>
      </div>
      <div><Label>RÉSUMÉ / À PROPOS</Label><Input value={data.resume} onChange={u("resume")} placeholder="Développeur passionné avec 3 ans d'expérience..." textarea rows={4} /></div>
    </div>
  );
}

function StepParcours({ data, set }) {
  const addExp = () => set({ ...data, experiences: [...data.experiences, { poste: "", entreprise: "", periode: "", description: "" }] });
  const removeExp = (i) => set({ ...data, experiences: data.experiences.filter((_, idx) => idx !== i) });
  const updateExp = (i, field, val) => {
    const exps = [...data.experiences];
    exps[i] = { ...exps[i], [field]: val };
    set({ ...data, experiences: exps });
  };

  const addForm = () => set({ ...data, formations: [...data.formations, { diplome: "", etablissement: "", annee: "" }] });
  const removeForm = (i) => set({ ...data, formations: data.formations.filter((_, idx) => idx !== i) });
  const updateForm = (i, field, val) => {
    const forms = [...data.formations];
    forms[i] = { ...forms[i], [field]: val };
    set({ ...data, formations: forms });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Expériences professionnelles</SectionTitle>
        <div className="flex flex-col gap-4">
          {data.experiences.map((exp, i) => (
            <div key={i} className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-sky-400/50 tracking-widest">EXPÉRIENCE {i + 1}</span>
                {data.experiences.length > 1 && <RemoveBtn onClick={() => removeExp(i)} />}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>POSTE</Label><Input value={exp.poste} onChange={e => updateExp(i, "poste", e.target.value)} placeholder="Développeur Web" /></div>
                <div><Label>ENTREPRISE</Label><Input value={exp.entreprise} onChange={e => updateExp(i, "entreprise", e.target.value)} placeholder="KoriLab" /></div>
              </div>
              <div><Label>PÉRIODE</Label><Input value={exp.periode} onChange={e => updateExp(i, "periode", e.target.value)} placeholder="Jan 2023 – Présent" /></div>
              <div><Label>DESCRIPTION</Label><Input value={exp.description} onChange={e => updateExp(i, "description", e.target.value)} placeholder="Développement et maintenance d'applications web..." textarea rows={2} /></div>
            </div>
          ))}
        </div>
        <AddBtn onClick={addExp} label="Ajouter une expérience" />
      </div>

      <div>
        <SectionTitle>Formations</SectionTitle>
        <div className="flex flex-col gap-4">
          {data.formations.map((form, i) => (
            <div key={i} className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-sky-400/50 tracking-widest">FORMATION {i + 1}</span>
                {data.formations.length > 1 && <RemoveBtn onClick={() => removeForm(i)} />}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>DIPLÔME</Label><Input value={form.diplome} onChange={e => updateForm(i, "diplome", e.target.value)} placeholder="Licence Informatique" /></div>
                <div><Label>ÉTABLISSEMENT</Label><Input value={form.etablissement} onChange={e => updateForm(i, "etablissement", e.target.value)} placeholder="UCAD" /></div>
              </div>
              <div><Label>ANNÉE</Label><Input value={form.annee} onChange={e => updateForm(i, "annee", e.target.value)} placeholder="2021" /></div>
            </div>
          ))}
        </div>
        <AddBtn onClick={addForm} label="Ajouter une formation" />
      </div>
    </div>
  );
}

function StepCompetences({ data, set }) {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const s = skill.trim();
    if (s && !data.competences.includes(s)) {
      set({ ...data, competences: [...data.competences, s] });
    }
    setSkill("");
  };

  const removeSkill = (s) => set({ ...data, competences: data.competences.filter(c => c !== s) });

  const addLang = () => set({ ...data, langues: [...data.langues, { langue: "", niveau: "Courant" }] });
  const removeLang = (i) => set({ ...data, langues: data.langues.filter((_, idx) => idx !== i) });
  const updateLang = (i, field, val) => {
    const langs = [...data.langues];
    langs[i] = { ...langs[i], [field]: val };
    set({ ...data, langues: langs });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Compétences techniques</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Input value={skill} onChange={e => setSkill(e.target.value)}
            placeholder="React, Laravel, Figma..."
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} />
          <button onClick={addSkill} type="button"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
            style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}>
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {data.competences.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}>
              {c}
              <button onClick={() => removeSkill(c)} type="button" className="hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {data.competences.length === 0 && (
            <span className="text-xs text-slate-600 italic">Appuie sur Entrée pour ajouter...</span>
          )}
        </div>
      </div>

      <div>
        <SectionTitle>Langues</SectionTitle>
        <div className="flex flex-col gap-3">
          {data.langues.map((l, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1"><Input value={l.langue} onChange={e => updateLang(i, "langue", e.target.value)} placeholder="Français" /></div>
              <div className="w-40"><Select value={l.niveau} onChange={e => updateLang(i, "niveau", e.target.value)} options={LANGUAGE_LEVELS} /></div>
              {data.langues.length > 1 && <RemoveBtn onClick={() => removeLang(i)} />}
            </div>
          ))}
        </div>
        <AddBtn onClick={addLang} label="Ajouter une langue" />
      </div>
    </div>
  );
}

function MiniCvPreview({ theme, name, titre }) {
  const demoData = {
    prenom: name?.split(" ")[0] || "Ibrahima",
    nom: name?.split(" ").slice(1).join(" ") || "Sarr",
    titre: titre || "Développeur Full Stack",
    email: "ibrahima@email.com",
    telephone: "+221 77 000 00 00",
    localisation: "Dakar",
    portfolio: "",
    resume: "Développeur passionné, spécialisé en web et mobile.",
    experiences: [
      { poste: "Développeur Web", entreprise: "KoriLab", periode: "2023–Présent", description: "" },
      { poste: "Stagiaire Dev", entreprise: "Startup Dakar", periode: "2022", description: "" },
    ],
    formations: [{ diplome: "Licence Informatique", etablissement: "UCAD", annee: "2022" }],
    competences: ["React", "Laravel", "Figma", "SQL"],
    langues: [{ langue: "Français", niveau: "Bilingue/Natif" }, { langue: "Anglais", niveau: "Courant" }],
    theme: theme.id,
  };
  const props = { data: demoData, s: "5px", theme };
  return (
    <div style={{ overflow: "hidden", borderRadius: 5, border: `1px solid ${theme.accent}22`, pointerEvents: "none", userSelect: "none" }}>
      {theme.id === "classic"  && <CvClassic  {...props} />}
      {theme.id === "modern"   && <CvModern   {...props} />}
      {theme.id === "dark"     && <CvDark     {...props} />}
      {theme.id === "minimal"  && <CvMinimal  {...props} />}
    </div>
  );
}

function StepTheme({ data, set }) {
  const name = [data.prenom, data.nom].filter(Boolean).join(" ");
  return (
    <div>
      <SectionTitle>Choisis ton thème</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        {THEMES.map(theme => (
          <button key={theme.id} type="button"
            onClick={() => set({ ...data, theme: theme.id })}
            className="relative rounded-xl p-3 text-left transition-all"
            style={{
              background: data.theme === theme.id ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${data.theme === theme.id ? "rgba(56,189,248,0.35)" : "rgba(255,255,255,0.06)"}`,
              boxShadow: data.theme === theme.id ? "0 0 20px rgba(56,189,248,0.08)" : "none",
            }}>
            {data.theme === theme.id && (
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center z-10"
                style={{ background: "#38bdf8" }}>
                <Check className="w-3 h-3 text-white" />
              </span>
            )}
            {/* Mini CV preview */}
            <div className="mb-3 overflow-hidden rounded-md" style={{ maxHeight: 90 }}>
              <MiniCvPreview theme={theme} name={name} titre={data.titre} />
            </div>
            <div className="font-bold text-white text-sm">{theme.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{theme.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPaiement({ data, onPaid, paid }) {
  const [ref, setRef] = useState("");
  const [method, setMethod] = useState("wave");

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Finaliser et payer</SectionTitle>

      {/* Récap */}
      <div className="rounded-xl p-4 flex items-center justify-between"
        style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}>
        <div>
          <div className="text-sm text-slate-400">Générateur de CV</div>
          <div className="text-xs text-slate-500 mt-0.5">
            Thème {THEMES.find(t => t.id === data.theme)?.label} · Téléchargement PDF
          </div>
        </div>
        <div className="font-extrabold text-white text-xl">
          2 000 <span className="text-sm font-normal text-slate-500">FCFA</span>
        </div>
      </div>

      {/* Méthode */}
      <div>
        <Label>MÉTHODE DE PAIEMENT</Label>
        <div className="flex gap-3 mt-1.5">
          {[{ id: "wave", label: "Wave", color: "#2563eb" }, { id: "om", label: "Orange Money", color: "#f97316" }].map(m => (
            <button key={m.id} type="button" onClick={() => setMethod(m.id)}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: method === m.id ? `${m.color}18` : "rgba(255,255,255,0.02)",
                border: `1px solid ${method === m.id ? `${m.color}50` : "rgba(255,255,255,0.06)"}`,
                color: method === m.id ? m.color : "rgba(255,255,255,0.3)",
              }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-xl p-4 flex flex-col gap-2"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {method === "wave" ? (
          <>
            <div className="text-xs text-slate-400 font-semibold">Envoie <span className="text-white font-bold">3 000 FCFA</span> via Wave au :</div>
            <div className="font-mono text-lg font-bold tracking-widest text-sky-400">+221 XX XXX XX XX</div>
            <div className="text-xs text-slate-500">Motif : <span className="text-slate-300">CV — {[data.prenom, data.nom].filter(Boolean).join(" ") || "Ton nom"}</span></div>
          </>
        ) : (
          <>
            <div className="text-xs text-slate-400 font-semibold">Envoie <span className="text-white font-bold">3 000 FCFA</span> via Orange Money au :</div>
            <div className="font-mono text-lg font-bold tracking-widest" style={{ color: "#f97316" }}>+221 XX XXX XX XX</div>
            <div className="text-xs text-slate-500">Motif : <span className="text-slate-300">CV — {[data.prenom, data.nom].filter(Boolean).join(" ") || "Ton nom"}</span></div>
          </>
        )}
      </div>

      {/* Référence */}
      {!paid && (
        <div>
          <Label>RÉFÉRENCE DE TRANSACTION</Label>
          <div className="flex gap-2">
            <Input value={ref} onChange={e => setRef(e.target.value)} placeholder="Ex: 7F4K2..." />
            <button onClick={() => ref.trim() && onPaid(ref.trim())} type="button"
              disabled={!ref.trim()}
              className="px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 transition-all disabled:opacity-30"
              style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(56,189,248,0.08))", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8" }}>
              Confirmer
            </button>
          </div>
        </div>
      )}

      {paid && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(52,211,153,0.15)" }}>
            <Check className="w-4 h-4" style={{ color: "#34d399" }} />
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: "#34d399" }}>Paiement confirmé</div>
            <div className="text-xs text-slate-500 mt-0.5">Réf : {paid} · Ton CV est prêt</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────── */
export default function CvGenerator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INIT);
  const [paid, setPaid] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const canNext = () => {
    if (step === 1) return data.prenom.trim() && data.nom.trim() && data.titre.trim();
    return true;
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const res = await fetch('/services/cv/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token || '',
          'Accept': 'application/pdf',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV-${data.prenom}-${data.nom}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Erreur lors de la génération du PDF. Réessaie.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Head title="Générateur de CV — KoriLab" />
      <Navbar />

      <main className="min-h-screen pt-24 pb-16" style={{ background: "#040d1a" }}>
        <div className="section-padding mx-auto max-w-7xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/services" className="font-mono text-[11px] tracking-widest text-sky-400/40 hover:text-sky-400/70 transition-colors" style={{ textDecoration: "none" }}>
              SERVICES
            </Link>
            <ChevronRight className="w-3 h-3 text-sky-400/20" />
            <span className="font-mono text-[11px] tracking-widest text-sky-400/70">GÉNÉRATEUR DE CV</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => done && setStep(s.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
                    style={{
                      cursor: done ? "pointer" : "default",
                      background: active ? "rgba(56,189,248,0.1)" : "transparent",
                      border: active ? "1px solid rgba(56,189,248,0.2)" : "1px solid transparent",
                    }}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: done ? "rgba(52,211,153,0.15)" : active ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.04)",
                        border: done ? "1px solid rgba(52,211,153,0.3)" : active ? "1px solid rgba(56,189,248,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      }}>
                      {done
                        ? <Check className="w-3 h-3" style={{ color: "#34d399" }} />
                        : <Icon className="w-3 h-3" style={{ color: active ? "#38bdf8" : "rgba(255,255,255,0.2)" }} />
                      }
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap"
                      style={{ color: active ? "white" : done ? "rgba(52,211,153,0.8)" : "rgba(255,255,255,0.2)" }}>
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="w-6 h-px mx-1" style={{ background: step > s.id ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.04)" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* Form card */}
            <div className="rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(4,13,26,0.95), rgba(5,8,20,0.98))",
                border: "1px solid rgba(56,189,248,0.1)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {step === 1 && <StepProfil data={data} set={setData} />}
                  {step === 2 && <StepParcours data={data} set={setData} />}
                  {step === 3 && <StepCompetences data={data} set={setData} />}
                  {step === 4 && <StepTheme data={data} set={setData} />}
                  {step === 5 && <StepPaiement data={data} onPaid={setPaid} paid={paid} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(56,189,248,0.07)" }}>
                <button
                  onClick={() => setStep(s => s - 1)}
                  disabled={step === 1}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-0"
                  style={{ color: "rgba(148,163,184,0.7)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <ChevronLeft className="w-4 h-4" /> Retour
                </button>

                {step < 5 ? (
                  <button
                    onClick={() => canNext() && setStep(s => s + 1)}
                    type="button"
                    disabled={!canNext()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                    style={{
                      background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(56,189,248,0.08))",
                      border: "1px solid rgba(56,189,248,0.3)",
                      color: "#38bdf8",
                    }}>
                    Continuer <ChevronRight className="w-4 h-4" />
                  </button>
                ) : paid ? (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    type="button"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
                    style={{
                      background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.08))",
                      border: "1px solid rgba(52,211,153,0.35)",
                      color: "#34d399",
                    }}>
                    <Download className="w-4 h-4" />
                    {downloading ? "Génération..." : "Télécharger PDF"}
                  </button>
                ) : null}
              </div>
            </div>

            {/* Live preview */}
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-widest text-sky-400/50">APERÇU EN DIRECT</span>
                <button onClick={() => setShowPreview(v => !v)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors lg:hidden">
                  <Eye className="w-3.5 h-3.5" />
                  {showPreview ? "Masquer" : "Afficher"}
                </button>
              </div>
              <div className={showPreview ? "block" : "hidden lg:block"}>
                <CvPreview data={data} />
                <p className="text-center font-mono text-[9px] text-slate-600 mt-3 tracking-wider">
                  Aperçu réduit — le PDF sera en A4
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
