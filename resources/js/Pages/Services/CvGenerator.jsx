import { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Plus, X, Check,
  User, Briefcase, GraduationCap, Palette, CreditCard,
  Phone, Mail, MapPin, Globe, Download, Eye,
} from "lucide-react";
import Navbar from "../../Components/Navbar";

/* ─── Constantes ─────────────────────────────────────── */
const THEMES = [
  {
    id: "classic",
    label: "Classic",
    desc: "Sobre et élégant, fond blanc",
    accent: "#1e40af",
    bg: "#ffffff",
    text: "#1e293b",
  },
  {
    id: "modern",
    label: "Modern",
    desc: "Bandeau coloré, typographie bold",
    accent: "#0ea5e9",
    bg: "#f8fafc",
    text: "#0f172a",
  },
  {
    id: "dark",
    label: "Dark",
    desc: "Fond sombre, accents bleus",
    accent: "#38bdf8",
    bg: "#0f172a",
    text: "#e2e8f0",
  },
  {
    id: "minimal",
    label: "Minimal",
    desc: "Épuré, beaucoup d'espace blanc",
    accent: "#6366f1",
    bg: "#fafafa",
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

/* ─── CV Preview ─────────────────────────────────────── */
function CvPreview({ data }) {
  const theme = THEMES.find(t => t.id === data.theme) || THEMES[1];
  const fullName = [data.prenom, data.nom].filter(Boolean).join(" ") || "Ton Nom";

  return (
    <div className="w-full overflow-hidden rounded-xl shadow-2xl"
      style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: "7.5px",
        lineHeight: 1.4,
        minHeight: "360px",
        border: `1px solid ${theme.accent}22`,
      }}>

      {/* Header */}
      <div style={{
        background: theme.id === "dark"
          ? `linear-gradient(135deg, ${theme.accent}22, ${theme.accent}08)`
          : theme.id === "minimal" || theme.id === "classic"
          ? "transparent"
          : `linear-gradient(135deg, ${theme.accent}18, transparent)`,
        borderBottom: `2px solid ${theme.accent}`,
        padding: "14px 16px 10px",
      }}>
        <div style={{ fontWeight: 900, fontSize: "14px", color: theme.id === "dark" ? theme.text : theme.accent, letterSpacing: "-0.3px" }}>
          {fullName}
        </div>
        {data.titre && (
          <div style={{ fontSize: "7px", color: theme.id === "dark" ? `${theme.accent}cc` : theme.accent, fontWeight: 600, marginTop: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {data.titre}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
          {data.email     && <span style={{ color: theme.id === "dark" ? "#94a3b8" : "#64748b" }}>{data.email}</span>}
          {data.telephone && <span style={{ color: theme.id === "dark" ? "#94a3b8" : "#64748b" }}>{data.telephone}</span>}
          {data.localisation && <span style={{ color: theme.id === "dark" ? "#94a3b8" : "#64748b" }}>{data.localisation}</span>}
        </div>
      </div>

      <div style={{ padding: "10px 16px", display: "grid", gridTemplateColumns: "1fr 0.55fr", gap: 12 }}>
        {/* Colonne gauche */}
        <div>
          {data.resume && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: "7.5px", color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: `1px solid ${theme.accent}30`, paddingBottom: 2, marginBottom: 5 }}>
                À propos
              </div>
              <p style={{ color: theme.id === "dark" ? "#94a3b8" : "#475569", fontSize: "6.5px" }}>{data.resume}</p>
            </div>
          )}

          {data.experiences.some(e => e.poste || e.entreprise) && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: "7.5px", color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: `1px solid ${theme.accent}30`, paddingBottom: 2, marginBottom: 5 }}>
                Expériences
              </div>
              {data.experiences.filter(e => e.poste || e.entreprise).map((e, i) => (
                <div key={i} style={{ marginBottom: 7 }}>
                  <div style={{ fontWeight: 700, fontSize: "7px", color: theme.text }}>{e.poste || "—"}</div>
                  <div style={{ fontSize: "6.5px", color: theme.accent, fontWeight: 600 }}>{e.entreprise}{e.periode ? ` · ${e.periode}` : ""}</div>
                  {e.description && <p style={{ fontSize: "6px", color: theme.id === "dark" ? "#94a3b8" : "#64748b", marginTop: 2 }}>{e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {data.formations.some(f => f.diplome || f.etablissement) && (
            <div>
              <div style={{ fontWeight: 700, fontSize: "7.5px", color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: `1px solid ${theme.accent}30`, paddingBottom: 2, marginBottom: 5 }}>
                Formation
              </div>
              {data.formations.filter(f => f.diplome || f.etablissement).map((f, i) => (
                <div key={i} style={{ marginBottom: 5 }}>
                  <div style={{ fontWeight: 700, fontSize: "7px", color: theme.text }}>{f.diplome || "—"}</div>
                  <div style={{ fontSize: "6.5px", color: theme.accent }}>{f.etablissement}{f.annee ? ` · ${f.annee}` : ""}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne droite */}
        <div>
          {data.competences.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: "7.5px", color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: `1px solid ${theme.accent}30`, paddingBottom: 2, marginBottom: 5 }}>
                Compétences
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {data.competences.map((c, i) => (
                  <span key={i} style={{ background: `${theme.accent}15`, color: theme.accent, padding: "1.5px 5px", borderRadius: 3, fontSize: "6px", fontWeight: 600 }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          {data.langues.some(l => l.langue) && (
            <div>
              <div style={{ fontWeight: 700, fontSize: "7.5px", color: theme.accent, textTransform: "uppercase", letterSpacing: "0.12em", borderBottom: `1px solid ${theme.accent}30`, paddingBottom: 2, marginBottom: 5 }}>
                Langues
              </div>
              {data.langues.filter(l => l.langue).map((l, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: "6.5px" }}>
                  <span style={{ color: theme.text, fontWeight: 600 }}>{l.langue}</span>
                  <span style={{ color: theme.id === "dark" ? "#94a3b8" : "#64748b" }}>{l.niveau}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
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

function StepTheme({ data, set }) {
  return (
    <div>
      <SectionTitle>Choisis ton thème</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        {THEMES.map(theme => (
          <button key={theme.id} type="button"
            onClick={() => set({ ...data, theme: theme.id })}
            className="relative rounded-xl p-4 text-left transition-all"
            style={{
              background: data.theme === theme.id ? "rgba(56,189,248,0.08)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${data.theme === theme.id ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.06)"}`,
              boxShadow: data.theme === theme.id ? "0 0 20px rgba(56,189,248,0.1)" : "none",
            }}>
            {data.theme === theme.id && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#38bdf8" }}>
                <Check className="w-3 h-3 text-white" />
              </span>
            )}
            {/* Mini palette */}
            <div className="flex gap-1.5 mb-3">
              <div className="w-6 h-6 rounded-md" style={{ background: theme.bg, border: "1px solid rgba(255,255,255,0.1)" }} />
              <div className="w-6 h-6 rounded-md" style={{ background: theme.accent }} />
              <div className="w-6 h-6 rounded-md" style={{ background: theme.text }} />
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
          3 000 <span className="text-sm font-normal text-slate-500">FCFA</span>
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
  const printRef = useRef(null);

  const canNext = () => {
    if (step === 1) return data.prenom.trim() && data.nom.trim() && data.titre.trim();
    return true;
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <Head title="Générateur de CV — KoriLab" />
      <Navbar />

      {/* Print styles */}
      <style>{`
        @media print {
          body > *:not(#cv-print-area) { display: none !important; }
          #cv-print-area { display: block !important; position: fixed; inset: 0; z-index: 9999; }
        }
        #cv-print-area { display: none; }
      `}</style>

      {/* Hidden print area */}
      <div id="cv-print-area">
        <CvPreview data={data} />
      </div>

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
                    type="button"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.08))",
                      border: "1px solid rgba(52,211,153,0.35)",
                      color: "#34d399",
                    }}>
                    <Download className="w-4 h-4" /> Télécharger PDF
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
