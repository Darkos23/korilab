import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Send, ChevronDown } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import TopBar from "@/Components/dashboard/TopBar";
import { SLSystemBG, StatusBar } from "@/Components/dashboard/SystemLayout";

const INK   = '#1C1A16';
const INK2  = '#5A5448';
const INK3  = 'rgba(0,0,0,0.06)';
const TERRA = '#B43028';
const GOLD  = '#8A5A18';
const CARD  = '#FDFBF7';
const FONT  = "'Century Gothic', 'Trebuchet MS', sans-serif";

const FORMULES = [
  { key: 'starter',  label: 'Starter',  price: '35 000 F/mois', desc: 'Site vitrine 5 pages · 2 modif./mois' },
  { key: 'business', label: 'Business', price: '75 000 F/mois', desc: 'Site avancé · 6 modif./mois' },
  { key: 'premium',  label: 'Premium',  price: '250 000 F/mois', desc: 'Application sur-mesure · 12 modif./mois' },
];

function Field({ label, name, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div>
      <label style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: INK2, textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: 6 }}>
        {label} {required && <span style={{ color: TERRA }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%', padding: '10px 14px',
          background: CARD, border: `1px solid rgba(0,0,0,0.12)`,
          borderRadius: 8, fontFamily: FONT, fontSize: 13, color: INK,
          outline: 'none', transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = TERRA}
        onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.12)'}
      />
    </div>
  );
}

export default function Contrats({ admin }) {
  const [form, setForm] = useState({
    client_name: '',
    client_activity: '',
    client_address: '',
    client_email: '',
    client_phone: '',
    formule: 'starter',
    date: new Date().toISOString().slice(0, 10),
    ninea: '',
    ref_number: '',
  });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const generate = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    window.open(`/dashboard/contrats/generer?${params}`, '_blank');
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#F5F2EC', fontFamily: FONT }}>
      <SLSystemBG />
      <Sidebar admin={admin} />

      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        <TopBar admin={admin} />

        <main className="flex-1 p-6 md:p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(180,48,40,0.1)`, border: `1px solid rgba(180,48,40,0.2)` }}>
                <FileText size={16} style={{ color: TERRA }} />
              </div>
              <div>
                <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20, color: INK, letterSpacing: '-0.3px' }}>
                  Générateur de contrat
                </div>
                <div style={{ fontFamily: FONT, fontSize: 11, color: INK2, marginTop: 1 }}>
                  Prestige · Remplis les infos client, génère le PDF
                </div>
              </div>
            </div>

            <form onSubmit={generate}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Colonne gauche — infos client */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-xl p-6" style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 20 }}>
                      Informations client
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Nom / Entreprise" name="client_name" value={form.client_name} onChange={handle} placeholder="Ex : Saly Immobilier" required />
                      <Field label="Activité" name="client_activity" value={form.client_activity} onChange={handle} placeholder="Ex : Agence immobilière" required />
                      <Field label="Email" name="client_email" value={form.client_email} onChange={handle} placeholder="contact@exemple.sn" type="email" required />
                      <Field label="Téléphone" name="client_phone" value={form.client_phone} onChange={handle} placeholder="+221 77 XXX XX XX" required />
                      <div className="sm:col-span-2">
                        <Field label="Adresse" name="client_address" value={form.client_address} onChange={handle} placeholder="Ex : Médina, Dakar, Sénégal" required />
                      </div>
                    </div>
                  </div>

                  {/* Formule */}
                  <div className="rounded-xl p-6" style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16 }}>
                      Formule souscrite
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {FORMULES.map(f => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, formule: f.key }))}
                          className="text-left p-4 rounded-xl transition-all"
                          style={{
                            border: form.formule === f.key ? `2px solid ${TERRA}` : `1px solid rgba(0,0,0,0.1)`,
                            background: form.formule === f.key ? `rgba(180,48,40,0.05)` : 'white',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: INK, marginBottom: 2 }}>
                            {f.label}
                          </div>
                          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: TERRA, marginBottom: 4 }}>
                            {f.price}
                          </div>
                          <div style={{ fontFamily: FONT, fontSize: 10, color: INK2, lineHeight: 1.5 }}>
                            {f.desc}
                          </div>
                          {form.formule === f.key && (
                            <div style={{ fontFamily: FONT, fontSize: 9, fontWeight: 700, color: TERRA, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                              ✓ Sélectionnée
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colonne droite — options */}
                <div className="space-y-4">
                  <div className="rounded-xl p-6" style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 20 }}>
                      Document
                    </div>
                    <div className="space-y-4">
                      <Field label="Date du contrat" name="date" value={form.date} onChange={handle} type="date" required />
                      <Field label="N° de référence" name="ref_number" value={form.ref_number} onChange={handle} placeholder="Ex : 001" />
                      <Field label="NINEA KoriLab" name="ninea" value={form.ninea} onChange={handle} placeholder="Laisser vide si pas encore" />
                    </div>
                  </div>

                  {/* Aperçu */}
                  <div className="rounded-xl p-5" style={{ background: `rgba(180,48,40,0.06)`, border: `1px solid rgba(180,48,40,0.15)` }}>
                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>
                      Aperçu
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: INK2, lineHeight: 1.8 }}>
                      <div><span style={{ color: INK, fontWeight: 600 }}>Client :</span> {form.client_name || '—'}</div>
                      <div><span style={{ color: INK, fontWeight: 600 }}>Formule :</span> {FORMULES.find(f => f.key === form.formule)?.label}</div>
                      <div><span style={{ color: INK, fontWeight: 600 }}>Date :</span> {form.date ? new Date(form.date).toLocaleDateString('fr-FR') : '—'}</div>
                      <div><span style={{ color: INK, fontWeight: 600 }}>Réf. :</span> KL-PREST-{new Date().getFullYear()}-{form.ref_number.padStart ? form.ref_number.padStart(3, '0') : '000'}</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all"
                    style={{
                      background: INK, color: 'white',
                      fontFamily: FONT, fontWeight: 700, fontSize: 13,
                      border: 'none', cursor: 'pointer',
                      letterSpacing: '0.05em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = TERRA}
                    onMouseLeave={e => e.currentTarget.style.background = INK}
                  >
                    <Send size={14} />
                    Générer le contrat
                  </button>
                  <p style={{ fontFamily: FONT, fontSize: 10, color: INK2, textAlign: 'center', lineHeight: 1.6 }}>
                    S'ouvre dans un nouvel onglet.<br />
                    Imprime ou exporte en PDF depuis la page.
                  </p>
                </div>
              </div>
            </form>

          </motion.div>
        </main>
      </div>

      <StatusBar admin={admin} />
    </div>
  );
}
