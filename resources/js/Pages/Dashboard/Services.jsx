import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import TopBar from '@/Components/dashboard/TopBar';
import { SLSystemBG, SysWin, SysInput, SysBtn, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

/* ─── Palette Washi soft ─────────────────────────────────── */
const BG     = '#F8F5EF';
const CARD   = '#F9F5EF';
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const INK3   = 'rgba(0,0,0,0.06)';
const TERRA  = '#B43028';
const TERRA2 = '#C84030';
const GOLD   = '#8A5A18';

const inputStyle = {
    fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 13,
    color: INK, backgroundColor: CARD, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.70' numOctaves='5' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px',
    border: `1px solid ${INK3}`, borderRadius: 8,
    padding: '8px 12px', width: '100%', outline: 'none',
};

const labelStyle = {
    fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10,
    color: INK2, textTransform: 'uppercase', letterSpacing: '0.12em',
    display: 'block', marginBottom: 6,
};

const ICONS  = ['Globe','Code','Smartphone','Palette','Zap','Shield','Database','Cloud','Star','Cpu','Wrench','Megaphone','BarChart3','Paintbrush','Code2'];
const RANKS  = ['S','A','B','C'];

const RANK_STYLES = {
    S: { color: GOLD,                    border: `1px solid rgba(184,120,32,0.4)`, bg: 'rgba(184,120,32,0.1)' },
    A: { color: TERRA,                   border: `1px solid rgba(200,72,24,0.4)`, bg: 'rgba(180,48,40,0.07)' },
    B: { color: '#6B4A1E',               border: `1px solid rgba(107,74,30,0.4)`, bg: 'rgba(107,74,30,0.08)' },
    C: { color: INK2,                    border: `1px solid ${INK3}`,             bg: 'rgba(30,14,4,0.04)'   },
};

const ACCENTS = [
    'from-blue-500 to-violet-500',
    'from-violet-500 to-pink-500',
    'from-emerald-500 to-cyan-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
];

const defaultForm = { icon: 'Globe', rank: 'A', title: '', desc: '', tags: '', accent: 'from-blue-500 to-violet-500' };

export default function DashboardServices({ admin, services }) {
    const [showForm, setShowForm]   = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm]           = useState(defaultForm);
    const [deleting, setDeleting]   = useState(null);

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = e => {
        e.preventDefault();
        const data = { ...form, tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags };
        if (editingId) {
            router.patch(`/dashboard/services/${editingId}`, data, { onSuccess: () => { setEditingId(null); setForm(defaultForm); setShowForm(false); } });
        } else {
            router.post('/dashboard/services', data, { onSuccess: () => { setForm(defaultForm); setShowForm(false); } });
        }
    };

    const handleEdit   = s => { setForm({ ...s, tags: Array.isArray(s.tags) ? s.tags.join(', ') : s.tags ?? '' }); setEditingId(s.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const handleDelete = id => { if (deleting === id) { router.delete(`/dashboard/services/${id}`, { onSuccess: () => setDeleting(null) }); } else { setDeleting(id); } };
    const handleCancel = () => { setShowForm(false); setEditingId(null); setForm(defaultForm); };
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen flex relative overflow-hidden" style={{ background: BG }}>
            <SLSystemBG />
            <Sidebar admin={admin} collapsed={collapsed} />

            <main className="relative z-10 flex-1 overflow-auto flex flex-col">
                <TopBar admin={admin} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
                <div className="p-4 md:p-8 flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 11, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 4 }}>
                            Offres
                        </div>
                        <h1 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 24, color: INK }}>
                            Services
                        </h1>
                        <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2, marginTop: 4 }}>
                            {services.length} service{services.length !== 1 ? 's' : ''} enregistré{services.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {!showForm && (
                        <button onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 transition-all duration-200"
                            style={{
                                fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 12,
                                color: '#FFFFFF', background: TERRA,
                                border: 'none', borderRadius: 10, padding: '10px 18px', cursor: 'pointer',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = TERRA2; }}
                            onMouseLeave={e => { e.currentTarget.style.background = TERRA; }}
                        >
                            <Plus className="w-4 h-4" /> Nouveau service
                        </button>
                    )}
                </div>

                {/* Form */}
                {showForm && (
                    <SysWin title={editingId ? 'Modifier le service' : 'Nouveau service'} className="mb-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div>
                                <label style={labelStyle}>Titre *</label>
                                <input name="title" value={form.title} onChange={handleChange} required
                                    placeholder="Nom du service" style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Niveau</label>
                                <div className="flex gap-2">
                                    {RANKS.map(r => {
                                        const rs = RANK_STYLES[r] ?? RANK_STYLES.C;
                                        return (
                                            <button key={r} type="button" onClick={() => setForm(p => ({ ...p, rank: r }))}
                                                className="flex-1 py-2 rounded-lg text-sm font-black transition-all"
                                                style={form.rank === r
                                                    ? { color: rs.color, border: rs.border, background: rs.bg }
                                                    : { color: INK2, border: `1px solid ${INK3}`, background: 'transparent' }
                                                }>
                                                {r}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label style={labelStyle}>Description</label>
                                <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
                                    placeholder="Description du service"
                                    style={{ ...inputStyle, resize: 'none' }} />
                            </div>

                            <div>
                                <label style={labelStyle}>Tags (virgules)</label>
                                <input name="tags" value={form.tags} onChange={handleChange}
                                    placeholder="React, Laravel, MySQL" style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Icône</label>
                                <select name="icon" value={form.icon} onChange={handleChange} style={inputStyle}>
                                    {ICONS.map(i => <option key={i}>{i}</option>)}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label style={labelStyle}>Gradient accent</label>
                                <div className="flex flex-wrap gap-2">
                                    {ACCENTS.map(g => (
                                        <button key={g} type="button" onClick={() => setForm(p => ({ ...p, accent: g }))}
                                            className={`w-12 h-8 rounded bg-gradient-to-r ${g} transition-all`}
                                            style={{ opacity: form.accent === g ? 1 : 0.45, outline: form.accent === g ? `2px solid ${TERRA}` : 'none', outlineOffset: 2 }} />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 flex gap-3 pt-2">
                                <button type="submit"
                                    style={{
                                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 12,
                                        color: '#FFFFFF', background: TERRA,
                                        border: 'none', borderRadius: 8, padding: '9px 20px', cursor: 'pointer',
                                    }}>
                                    {editingId ? 'Enregistrer' : 'Créer'}
                                </button>
                                <button type="button" onClick={handleCancel}
                                    style={{
                                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 12,
                                        color: INK2, background: 'transparent',
                                        border: `1px solid ${INK3}`, borderRadius: 8, padding: '9px 20px', cursor: 'pointer',
                                    }}>
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </SysWin>
                )}

                <SysDivider label="Services actifs" />

                {/* List */}
                <div className="space-y-3">
                    {services.map(s => {
                        const rs = RANK_STYLES[s.rank] ?? RANK_STYLES.C;
                        return (
                            <div key={s.id}
                                className="flex items-center gap-4 px-5 py-4 transition-all paper-card"
                                style={{
                                    background: CARD, borderRadius: 12,
                                    border: `1px solid ${INK3}`,
                                    borderLeft: `4px solid ${TERRA}`,
                                    boxShadow: '0 2px 12px rgba(30,14,4,0.06)',
                                }}>
                                {/* Accent bar */}
                                <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${s.accent} flex-shrink-0`} />

                                {/* Rank badge */}
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                                    style={{ color: rs.color, border: rs.border, background: rs.bg,
                                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif" }}>
                                    {s.rank}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 13, color: INK }}>
                                            {s.title}
                                        </span>
                                        <span style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 9, color: INK2,
                                            border: `1px solid ${INK3}`, padding: '2px 6px', borderRadius: 4 }}>
                                            {s.icon}
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2 }} className="truncate mb-1.5">
                                        {s.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {(s.tags ?? []).slice(0, 4).map(tag => (
                                            <span key={tag} style={{
                                                fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 10,
                                                color: TERRA, background: 'rgba(180,48,40,0.07)',
                                                border: `1px solid rgba(180,48,40,0.18)`,
                                                padding: '2px 8px', borderRadius: 20,
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 flex-shrink-0">
                                    <button onClick={() => handleEdit(s)}
                                        style={{
                                            fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 11,
                                            color: '#FFFFFF', background: TERRA,
                                            border: 'none', borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
                                        }}>
                                        Modifier
                                    </button>
                                    <button onClick={() => handleDelete(s.id)}
                                        style={{
                                            fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 11,
                                            color: deleting === s.id ? TERRA : INK2,
                                            background: 'transparent',
                                            border: `1px solid ${deleting === s.id ? TERRA : INK3}`,
                                            borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
                                        }}>
                                        {deleting === s.id ? 'Confirmer ?' : 'Supprimer'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-24">
                        <div className="text-4xl mb-4">⚡</div>
                        <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 13, color: INK2, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            Aucun service enregistré
                        </p>
                    </div>
                )}
                </div>
            </main>
            <StatusBar admin={admin} />
        </div>
    );
}
