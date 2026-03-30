import { useState } from "react";
import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderKanban, Plus, X, Pencil, Trash2, ChevronDown, Calendar, DollarSign } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import TopBar from "@/Components/dashboard/TopBar";
import { SLSystemBG, StatusBar } from "@/Components/dashboard/SystemLayout";

const INK    = '#1C1A16';
const INK2   = '#5A5448';
const INK3   = 'rgba(0,0,0,0.07)';
const TERRA  = '#B43028';
const GOLD   = '#8A5A18';
const CARD   = '#FDFBF7';
const FONT   = "'Century Gothic', 'Trebuchet MS', sans-serif";

const STATUSES = [
  { key: 'en_attente',  label: 'En attente',  color: '#8A8478',  bg: 'rgba(138,132,120,0.1)'  },
  { key: 'en_cours',    label: 'En cours',    color: '#2563eb',  bg: 'rgba(37,99,235,0.1)'    },
  { key: 'en_revision', label: 'En révision', color: '#d97706',  bg: 'rgba(217,119,6,0.1)'   },
  { key: 'livre',       label: 'Livré',       color: '#16a34a',  bg: 'rgba(22,163,74,0.1)'   },
  { key: 'pause',       label: 'Pause',       color: '#dc2626',  bg: 'rgba(220,38,38,0.1)'   },
];

const FORMULES = ['Starter', 'Business', 'Premium'];
const TYPES = ['Site vitrine', 'Application web', 'E-commerce', 'Branding', 'Design UI/UX', 'Autre'];

function StatusBadge({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const s = STATUSES.find(x => x.key === status) ?? STATUSES[0];
  return (
    <div className="relative">
      <button
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all"
        style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}30` }}
      >
        {s.label} <ChevronDown size={10} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.1 }}
            className="absolute left-0 top-full mt-1 z-50 rounded-xl overflow-hidden"
            style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 130 }}
          >
            {STATUSES.map(st => (
              <button key={st.key}
                onClick={e => { e.stopPropagation(); onChange(st.key); setOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs transition-all"
                style={{ fontFamily: FONT, color: st.color, background: status === st.key ? st.bg : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = st.bg}
                onMouseLeave={e => e.currentTarget.style.background = status === st.key ? st.bg : 'transparent'}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: st.color }} />
                {st.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-mono text-[9px] uppercase tracking-widest mb-1.5" style={{ color: '#8A8478' }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input className="w-full px-3 py-2 font-mono text-sm outline-none transition-all duration-200 rounded-md"
      style={{ background: 'rgba(253,251,247,0.92)', border: `1px solid ${INK3}`, color: INK }}
      {...props} />
  );
}

function Select({ options, ...props }) {
  return (
    <select className="w-full px-3 py-2 font-mono text-sm outline-none rounded-md"
      style={{ background: 'rgba(253,251,247,0.92)', border: `1px solid ${INK3}`, color: INK }}
      {...props}>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  );
}

const EMPTY = { client_name: '', client_email: '', project_type: '', formule: '', status: 'en_attente', start_date: '', deadline: '', amount: '', notes: '' };

function ProjectModal({ project, onClose }) {
  const editing = !!project?.id;
  const [form, setForm] = useState(editing ? {
    ...project,
    start_date: project.start_date ?? '',
    deadline: project.deadline ?? '',
    amount: project.amount ?? '',
    notes: project.notes ?? '',
  } : { ...EMPTY });

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    if (editing) {
      router.put(`/dashboard/projets/${project.id}`, form, { onSuccess: onClose });
    } else {
      router.post('/dashboard/projets', form, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(28,26,22,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 24px 64px rgba(0,0,0,0.15)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: INK3 }}>
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: INK }}>
              {editing ? 'Modifier le projet' : 'Nouveau projet'}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest mt-0.5" style={{ color: '#8A8478' }}>
              {editing ? `ID #${project.id}` : 'Suivi KoriLab'}
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ border: `1px solid ${INK3}`, color: INK2 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(180,48,40,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = INK3}>
            <X size={13} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Client / Entreprise *">
              <Input name="client_name" value={form.client_name} onChange={handle} placeholder="Saly Immobilier" required />
            </Field>
            <Field label="Email client">
              <Input name="client_email" type="email" value={form.client_email} onChange={handle} placeholder="contact@exemple.sn" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Type de projet *">
              <Select name="project_type" value={form.project_type} onChange={handle} required
                options={[{ value: '', label: '— Choisir —' }, ...TYPES]} />
            </Field>
            <Field label="Formule">
              <Select name="formule" value={form.formule} onChange={handle}
                options={[{ value: '', label: '— Aucune —' }, ...FORMULES]} />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Statut">
              <Select name="status" value={form.status} onChange={handle}
                options={STATUSES.map(s => ({ value: s.key, label: s.label }))} />
            </Field>
            <Field label="Date début">
              <Input name="start_date" type="date" value={form.start_date} onChange={handle} />
            </Field>
            <Field label="Deadline">
              <Input name="deadline" type="date" value={form.deadline} onChange={handle} />
            </Field>
          </div>
          <Field label="Montant (FCFA)">
            <Input name="amount" type="number" value={form.amount} onChange={handle} placeholder="35000" />
          </Field>
          <Field label="Notes">
            <textarea name="notes" value={form.notes} onChange={handle} rows={2}
              className="w-full px-3 py-2 font-mono text-sm outline-none resize-none rounded-md"
              style={{ background: 'rgba(253,251,247,0.92)', border: `1px solid ${INK3}`, color: INK }}
              placeholder="Informations complémentaires..." />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-all"
              style={{ border: `1px solid ${INK3}`, color: INK2, background: 'transparent' }}>
              Annuler
            </button>
            <button type="submit"
              className="px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-all"
              style={{ background: TERRA, color: 'white', border: 'none' }}>
              {editing ? 'Enregistrer' : 'Créer le projet'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, onEdit }) {
  const s = STATUSES.find(x => x.key === project.status) ?? STATUSES[0];
  const deadline = project.deadline ? new Date(project.deadline) : null;
  const today = new Date();
  const isLate = deadline && deadline < today && project.status !== 'livre';
  const daysLeft = deadline ? Math.ceil((deadline - today) / 86400000) : null;

  const changeStatus = (status) => {
    router.patch(`/dashboard/projets/${project.id}/status`, { status });
  };

  const del = () => {
    if (confirm(`Supprimer le projet "${project.client_name}" ?`)) {
      router.delete(`/dashboard/projets/${project.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4"
      style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 8px rgba(0,0,0,0.04)', borderLeft: `3px solid ${s.color}` }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="truncate" style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: INK }}>{project.client_name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-[10px]" style={{ color: INK2 }}>{project.project_type}</span>
            {project.formule && (
              <>
                <span style={{ color: '#D0C8BE' }}>·</span>
                <span className="font-mono text-[10px]" style={{ color: GOLD }}>{project.formule}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={() => onEdit(project)}
            className="w-6 h-6 rounded flex items-center justify-center transition-all"
            style={{ color: INK2, border: `1px solid ${INK3}` }}
            onMouseEnter={e => { e.currentTarget.style.color = TERRA; e.currentTarget.style.borderColor = 'rgba(180,48,40,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = INK2; e.currentTarget.style.borderColor = INK3; }}>
            <Pencil size={11} />
          </button>
          <button onClick={del}
            className="w-6 h-6 rounded flex items-center justify-center transition-all"
            style={{ color: INK2, border: `1px solid ${INK3}` }}
            onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = INK2; e.currentTarget.style.borderColor = INK3; }}>
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={project.status} onChange={changeStatus} />
        <div className="flex items-center gap-3">
          {project.amount && (
            <div className="flex items-center gap-1">
              <DollarSign size={10} style={{ color: GOLD }} />
              <span className="font-mono text-[10px]" style={{ color: GOLD }}>{Number(project.amount).toLocaleString('fr-FR')} F</span>
            </div>
          )}
          {deadline && (
            <div className="flex items-center gap-1">
              <Calendar size={10} style={{ color: isLate ? '#dc2626' : INK2 }} />
              <span className="font-mono text-[10px]" style={{ color: isLate ? '#dc2626' : INK2 }}>
                {isLate ? `+${Math.abs(daysLeft)}j` : daysLeft === 0 ? "Aujourd'hui" : `${daysLeft}j`}
              </span>
            </div>
          )}
        </div>
      </div>

      {project.notes && (
        <div className="mt-2 pt-2 border-t font-mono text-[10px] italic line-clamp-1" style={{ borderColor: INK3, color: '#8A8478' }}>
          {project.notes}
        </div>
      )}
    </motion.div>
  );
}

export default function Projets({ admin, projects = [] }) {
  const [filter, setFilter] = useState('tous');
  const [modal, setModal] = useState(null); // null | 'new' | project object

  const filtered = filter === 'tous' ? projects : projects.filter(p => p.status === filter);

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.key] = projects.filter(p => p.status === s.key).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#F8F5EF' }}>
      <SLSystemBG />
      <Sidebar admin={admin} />

      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        <TopBar admin={admin} />

        <main className="flex-1 p-6 md:p-8 pb-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(180,48,40,0.08)', border: '1px solid rgba(180,48,40,0.15)' }}>
                  <FolderKanban size={16} style={{ color: TERRA }} />
                </div>
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20, color: INK }}>Projets</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: '#8A8478' }}>
                    {projects.length} projet{projects.length !== 1 ? 's' : ''} au total
                  </div>
                </div>
              </div>
              <button
                onClick={() => setModal('new')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-widest transition-all"
                style={{ background: TERRA, color: 'white', border: 'none', boxShadow: '0 2px 10px rgba(180,48,40,0.25)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Plus size={13} /> Nouveau projet
              </button>
            </div>

            {/* Stat bar */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {STATUSES.map(s => (
                <div key={s.key} className="rounded-xl px-4 py-3"
                  style={{ background: CARD, border: `1px solid ${INK3}`, borderTop: `3px solid ${s.color}` }}>
                  <div className="font-mono text-2xl font-black" style={{ color: s.color }}>{counts[s.key] ?? 0}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color: INK2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 mb-5 flex-wrap">
              {[{ key: 'tous', label: `Tous (${projects.length})` }, ...STATUSES.map(s => ({ key: s.key, label: `${s.label} (${counts[s.key] ?? 0})` }))].map(f => (
                <button key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all"
                  style={{
                    background: filter === f.key ? TERRA : 'transparent',
                    color: filter === f.key ? 'white' : INK2,
                    border: `1px solid ${filter === f.key ? TERRA : INK3}`,
                  }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Projects grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <FolderKanban size={32} style={{ color: '#D0C8BE', margin: '0 auto 12px' }} />
                <div style={{ fontFamily: FONT, fontSize: 14, color: INK2 }}>Aucun projet</div>
                <div className="font-mono text-xs mt-1" style={{ color: '#8A8478' }}>
                  {filter === 'tous' ? 'Créez votre premier projet' : 'Aucun projet avec ce statut'}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(p => (
                  <ProjectCard key={p.id} project={p} onEdit={setModal} />
                ))}
              </div>
            )}

          </motion.div>
        </main>
      </div>

      <StatusBar admin={admin} />

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <ProjectModal
            project={modal === 'new' ? null : modal}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
