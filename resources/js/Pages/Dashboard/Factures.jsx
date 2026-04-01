import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import TopBar from '@/Components/dashboard/TopBar';
import { SLSystemBG, SysWin, StatusBar } from '@/Components/dashboard/SystemLayout';

/* ── Palette ── */
const BG    = '#F8F5EF';
const CARD  = '#FDFBF7';
const INK   = '#1C1A16';
const INK2  = '#5A5448';
const INK3  = 'rgba(0,0,0,0.06)';
const TERRA = '#B43028';
const TERRA2= '#C84030';
const GOLD  = '#8A5A18';
const FONT  = "'Century Gothic', 'Trebuchet MS', sans-serif";

const STATUSES = [
  { key: 'en_attente', label: 'En attente', color: '#8A8478', bg: 'rgba(138,132,120,0.12)' },
  { key: 'payée',      label: 'Payée',      color: '#16a34a', bg: 'rgba(22,163,74,0.1)'    },
  { key: 'en_retard',  label: 'En retard',  color: '#B43028', bg: 'rgba(180,48,40,0.1)'    },
  { key: 'partielle',  label: 'Partielle',  color: '#d97706', bg: 'rgba(217,119,6,0.1)'    },
];

const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n ?? 0) + ' F';

const EMPTY = {
  client_name: '', client_email: '', description: '',
  amount: '', status: 'en_attente', issued_date: '', due_date: '',
};

const inputStyle = {
  fontFamily: FONT, fontWeight: 400, fontSize: 13, color: INK,
  backgroundColor: CARD, border: `1px solid ${INK3}`, borderRadius: 8,
  padding: '8px 12px', width: '100%', outline: 'none',
};

const labelStyle = {
  fontFamily: FONT, fontWeight: 600, fontSize: 10, color: INK2,
  textTransform: 'uppercase', letterSpacing: '0.12em',
  display: 'block', marginBottom: 6,
};

/* ── Status Badge with dropdown ── */
function StatusBadge({ status, factureId }) {
  const [open, setOpen] = useState(false);
  const s = STATUSES.find(x => x.key === status) ?? STATUSES[0];
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ fontFamily: FONT, fontSize: 10, background: s.bg, color: s.color, border: `1px solid ${s.color}30` }}>
        {s.label} <ChevronDown size={10} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-30 rounded-lg overflow-hidden shadow-lg"
          style={{ background: CARD, border: `1px solid ${INK3}`, minWidth: 120 }}>
          {STATUSES.map(st => (
            <button key={st.key}
              className="w-full text-left px-3 py-2 transition-colors"
              style={{ fontFamily: FONT, fontSize: 11, color: st.color }}
              onMouseEnter={e => { e.currentTarget.style.background = st.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              onClick={() => {
                router.put(`/dashboard/factures/${factureId}`, { status: st.key }, { preserveScroll: true });
                setOpen(false);
              }}>
              {st.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Facture Row — OUTSIDE main component ── */
function FactureRow({ f, onEdit, onDelete, deleting }) {
  const dl = f.due_date ? new Date(f.due_date) : null;
  const overdue = dl && dl < new Date() && f.status !== 'payée';
  return (
    <motion.tr initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      style={{ borderBottom: `1px solid ${INK3}` }}>
      <td className="py-3 px-4">
        <span className="font-mono" style={{ fontSize: 11, color: GOLD }}>{f.numero}</span>
      </td>
      <td className="py-3 px-4">
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: INK }}>{f.client_name}</div>
        {f.client_email && <div style={{ fontFamily: FONT, fontSize: 11, color: INK2 }}>{f.client_email}</div>}
      </td>
      <td className="py-3 px-4 max-w-[180px]">
        <div className="truncate" style={{ fontFamily: FONT, fontSize: 12, color: INK2 }}>{f.description || '—'}</div>
      </td>
      <td className="py-3 px-4">
        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: INK }}>{fmt(f.amount)}</span>
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={f.status} factureId={f.id} />
      </td>
      <td className="py-3 px-4">
        {dl ? (
          <span style={{ fontFamily: FONT, fontSize: 12, color: overdue ? TERRA : INK2 }}>
            {dl.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            {overdue && <span style={{ color: TERRA, marginLeft: 4 }}>↑</span>}
          </span>
        ) : <span style={{ color: INK3 }}>—</span>}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button onClick={onEdit}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: INK2 }}
            onMouseEnter={e => { e.currentTarget.style.color = TERRA; e.currentTarget.style.background = 'rgba(180,48,40,0.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = INK2; e.currentTarget.style.background = 'transparent'; }}>
            <Pencil size={13} />
          </button>
          <button onClick={onDelete}
            className="p-1.5 rounded-lg transition-colors text-xs"
            style={{ color: deleting ? TERRA : INK2, fontFamily: FONT, fontSize: 10 }}
            onMouseEnter={e => { e.currentTarget.style.color = TERRA; e.currentTarget.style.background = 'rgba(180,48,40,0.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = deleting ? TERRA : INK2; e.currentTarget.style.background = 'transparent'; }}>
            {deleting ? '✓ Confirmer' : <Trash2 size={13} />}
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ── Page ── */
export default function DashboardFactures({ admin, factures = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleting, setDeleting] = useState(null);
  const [filter, setFilter] = useState('toutes');

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      router.put(`/dashboard/factures/${editingId}`, form, {
        onSuccess: () => { setEditingId(null); setForm(EMPTY); setShowForm(false); },
      });
    } else {
      router.post('/dashboard/factures', form, {
        onSuccess: () => { setForm(EMPTY); setShowForm(false); },
      });
    }
  };

  const handleEdit = (f) => {
    setForm({
      client_name:  f.client_name  ?? '',
      client_email: f.client_email ?? '',
      description:  f.description  ?? '',
      amount:       f.amount       ?? '',
      status:       f.status       ?? 'en_attente',
      issued_date:  f.issued_date  ?? '',
      due_date:     f.due_date     ?? '',
    });
    setEditingId(f.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (deleting === id) {
      router.delete(`/dashboard/factures/${id}`, { onSuccess: () => setDeleting(null) });
    } else {
      setDeleting(id);
    }
  };

  // Stats
  const total        = factures.length;
  const montantTotal = factures.reduce((s, f) => s + (f.amount ?? 0), 0);
  const payees       = factures.filter(f => f.status === 'payée').length;
  const enRetard     = factures.filter(f => f.status === 'en_retard' || (f.due_date && new Date(f.due_date) < new Date() && f.status !== 'payée')).length;

  const filtered = filter === 'toutes' ? factures : factures.filter(f => f.status === filter);

  const tabs = [
    { key: 'toutes',      label: `Toutes (${total})` },
    ...STATUSES.map(s => ({ key: s.key, label: `${s.label} (${factures.filter(f => f.status === s.key).length})` })),
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: BG }}>
      <SLSystemBG />
      <Sidebar admin={admin} />

      <main className="relative z-10 flex-1 overflow-auto flex flex-col">
        <TopBar admin={admin} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        <div className="p-4 md:p-8 flex-1">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 11, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 4 }}>
                Comptabilité
              </div>
              <h1 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: INK }}>Factures</h1>
              <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: 12, color: INK2, marginTop: 4 }}>
                {total} facture{total !== 1 ? 's' : ''} — {fmt(montantTotal)} total
              </p>
            </div>
            {!showForm && (
              <button onClick={() => { setForm(EMPTY); setEditingId(null); setShowForm(true); }}
                className="flex items-center gap-2"
                style={{ fontFamily: FONT, fontWeight: 600, fontSize: 12, color: '#fff', background: TERRA, border: 'none', borderRadius: 10, padding: '10px 18px', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = TERRA2; }}
                onMouseLeave={e => { e.currentTarget.style.background = TERRA; }}>
                <Plus className="w-4 h-4" /> Nouvelle facture
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total',      value: total,         color: TERRA  },
              { label: 'Montant',    value: fmt(montantTotal), color: GOLD },
              { label: 'Payées',     value: payees,        color: '#16a34a' },
              { label: 'En retard',  value: enRetard,      color: enRetard > 0 ? TERRA : INK2 },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4"
                style={{ background: CARD, border: `1px solid ${INK3}`, borderLeft: `3px solid ${s.color}` }}>
                <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 800, color: INK }}>{s.value}</div>
                <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: INK2, textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          {showForm && (
            <SysWin title={editingId ? 'Modifier la facture' : 'Nouvelle facture'} className="mb-6">
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Client *</label>
                  <input name="client_name" value={form.client_name} onChange={handle} required
                    placeholder="Nom du client" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email client</label>
                  <input name="client_email" value={form.client_email} onChange={handle}
                    type="email" placeholder="client@email.com" style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <label style={labelStyle}>Description</label>
                  <input name="description" value={form.description} onChange={handle}
                    placeholder="Développement site vitrine, Design UI..." style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Montant (FCFA) *</label>
                  <input name="amount" value={form.amount} onChange={handle} required
                    type="number" min="0" placeholder="150000" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Statut</label>
                  <select name="status" value={form.status} onChange={handle} style={inputStyle}>
                    {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date d'émission</label>
                  <input name="issued_date" value={form.issued_date} onChange={handle}
                    type="date" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Échéance</label>
                  <input name="due_date" value={form.due_date} onChange={handle}
                    type="date" style={inputStyle} />
                </div>
                <div className="col-span-2 flex gap-3 pt-2">
                  <button type="submit"
                    style={{ fontFamily: FONT, fontWeight: 600, fontSize: 12, color: '#fff', background: TERRA, border: 'none', borderRadius: 8, padding: '9px 20px', cursor: 'pointer' }}>
                    {editingId ? 'Enregistrer' : 'Créer la facture'}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(EMPTY); }}
                    style={{ fontFamily: FONT, fontWeight: 400, fontSize: 12, color: INK2, background: 'transparent', border: `1px solid ${INK3}`, borderRadius: 8, padding: '9px 20px', cursor: 'pointer' }}>
                    Annuler
                  </button>
                </div>
              </form>
            </SysWin>
          )}

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-4">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setFilter(t.key)}
                style={{
                  fontFamily: FONT, fontSize: 11, fontWeight: filter === t.key ? 600 : 400,
                  color: filter === t.key ? '#fff' : INK2,
                  background: filter === t.key ? TERRA : 'transparent',
                  border: `1px solid ${filter === t.key ? TERRA : INK3}`,
                  borderRadius: 20, padding: '5px 14px', cursor: 'pointer',
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="text-center py-16" style={{ color: INK2, fontFamily: FONT, fontSize: 13 }}>
              Aucune facture
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${INK3}` }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${INK3}`, background: 'rgba(0,0,0,0.02)' }}>
                    {['N°', 'Client', 'Description', 'Montant', 'Statut', 'Échéance', ''].map(h => (
                      <th key={h} className="py-3 px-4 text-left"
                        style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: INK2, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(f => (
                    <FactureRow key={f.id} f={f}
                      onEdit={() => handleEdit(f)}
                      onDelete={() => handleDelete(f.id)}
                      deleting={deleting === f.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
      <StatusBar admin={admin} />
    </div>
  );
}
