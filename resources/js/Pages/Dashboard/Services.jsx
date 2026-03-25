import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import WhatsAppFloat from '@/Components/WhatsAppFloat';
import { SystemGrid, SystemOrbs, ParticleNetwork, SysWin, SysInput, SysBtn, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

const ACCENTS = [
    'from-blue-500 to-violet-500',
    'from-violet-500 to-pink-500',
    'from-emerald-500 to-cyan-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
];
const ICONS  = ['Globe','Code','Smartphone','Palette','Zap','Shield','Database','Cloud','Star','Cpu','Wrench','Megaphone','BarChart3','Paintbrush','Code2'];
const RANKS  = ['S','A','B','C'];

const RANK_COLORS = {
    S: { text: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', glow: 'rgba(251,191,36,0.4)' },
    A: { text: 'text-[#00a8ff]',  bg: 'bg-[#00a8ff]/10 border-[#00a8ff]/30',  glow: 'rgba(0,168,255,0.4)'  },
    B: { text: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30', glow: 'rgba(52,211,153,0.4)' },
    C: { text: 'text-gray-400',    bg: 'bg-gray-400/10 border-gray-400/30',    glow: 'rgba(156,163,175,0.4)' },
};

const defaultForm = { icon:'Globe', rank:'A', title:'', desc:'', tags:'', accent:'from-blue-500 to-violet-500' };

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

    return (
        <div className="min-h-screen bg-[#0e2f4a] flex relative overflow-hidden">
            <SystemGrid />
            <SystemOrbs />
            <ParticleNetwork />
            <Sidebar admin={admin} />

            <main className="relative z-10 flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)]" />
                            <span className="text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">Capacités de la guilde</span>
                        </div>
                        <h1 className="text-2xl font-black text-white" style={{ textShadow:'0 0 20px rgba(0,168,255,0.2)' }}>Services</h1>
                        <p className="text-[#00a8ff]/30 text-xs font-mono mt-1">{services.length} capacité(s) enregistrée(s)</p>
                    </div>
                    {!showForm && (
                        <SysBtn variant="primary" onClick={() => setShowForm(true)}>
                            <Plus className="w-4 h-4" /> Nouveau service
                        </SysBtn>
                    )}
                </div>

                {/* Form */}
                {showForm && (
                    <SysWin title={editingId ? 'MODIFIER LA CAPACITÉ' : 'NOUVELLE CAPACITÉ'} glow className="mb-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <SysInput label="Titre *" name="title" value={form.title} onChange={handleChange} required placeholder="Nom du service" />

                            <div>
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-2">Rang</label>
                                <div className="flex gap-2">
                                    {RANKS.map(r => (
                                        <button key={r} type="button" onClick={() => setForm(p => ({ ...p, rank: r }))}
                                            className={`flex-1 py-2 rounded-lg text-sm font-black border transition-all
                                                ${form.rank === r
                                                    ? `${RANK_COLORS[r].text} ${RANK_COLORS[r].bg}`
                                                    : 'text-white/20 border-white/5 hover:border-white/15'}`}
                                            style={form.rank === r ? { boxShadow:`0 0 10px ${RANK_COLORS[r].glow}` } : {}}
                                        >{r}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">Description</label>
                                <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
                                    className="w-full bg-white/[0.04] border border-[#00a8ff]/15 rounded-lg px-3 py-2 text-white text-sm font-mono
                                        focus:border-[#00a8ff]/40 outline-none resize-none transition-all placeholder-white/10"
                                    placeholder="Description du service" />
                            </div>

                            <SysInput label="Tags (virgules)" name="tags" value={form.tags} onChange={handleChange} placeholder="React, Laravel, MySQL" />

                            <div>
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">Icône</label>
                                <select name="icon" value={form.icon} onChange={handleChange}
                                    className="w-full bg-white/[0.04] border border-[#00a8ff]/15 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-[#00a8ff]/40 outline-none">
                                    {ICONS.map(i => <option key={i}>{i}</option>)}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-2">Gradient accent</label>
                                <div className="flex flex-wrap gap-2">
                                    {ACCENTS.map(g => (
                                        <button key={g} type="button" onClick={() => setForm(p => ({ ...p, accent: g }))}
                                            className={`w-12 h-8 rounded bg-gradient-to-r ${g} transition-all ${form.accent === g ? 'ring-2 ring-[#00a8ff] ring-offset-1 ring-offset-[#0d2235]' : 'opacity-50 hover:opacity-80'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 flex gap-3 pt-2">
                                <SysBtn type="submit" variant="primary">{editingId ? '[ ENREGISTRER ]' : '[ CRÉER ]'}</SysBtn>
                                <SysBtn type="button" variant="ghost" onClick={handleCancel}>[ ANNULER ]</SysBtn>
                            </div>
                        </form>
                    </SysWin>
                )}

                <SysDivider label="Capacités actives" />

                {/* List */}
                <div className="space-y-2">
                    {services.map(s => {
                        const rc = RANK_COLORS[s.rank] ?? RANK_COLORS.C;
                        return (
                            <div key={s.id}
                                className="relative flex items-center gap-4 px-5 py-4 border border-[#00a8ff]/10 rounded-xl
                                    bg-[#0d2540]/80 hover:border-[#00a8ff]/25 transition-all group overflow-hidden">
                                {/* Accent line */}
                                <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${s.accent} flex-shrink-0`} />

                                {/* Rank */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border flex-shrink-0 ${rc.bg} ${rc.text}`}
                                    style={{ boxShadow:`0 0 10px ${rc.glow}` }}>
                                    {s.rank}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="font-bold text-white text-sm">{s.title}</span>
                                        <span className="text-[9px] font-mono text-[#00a8ff]/25 border border-[#00a8ff]/10 px-1.5 py-0.5 rounded">{s.icon}</span>
                                    </div>
                                    <p className="text-white/30 text-xs truncate mb-1.5">{s.desc}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {(s.tags ?? []).slice(0, 4).map(tag => (
                                            <span key={tag} className="text-[9px] font-mono bg-[#00a8ff]/5 text-[#00a8ff]/40 border border-[#00a8ff]/10 px-1.5 py-0.5 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 flex-shrink-0">
                                    <SysBtn variant="ghost" onClick={() => handleEdit(s)}>Modifier</SysBtn>
                                    <SysBtn variant="danger" onClick={() => handleDelete(s.id)}>
                                        {deleting === s.id ? '⚠ Confirmer' : 'Supprimer'}
                                    </SysBtn>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-24 font-mono text-[#00a8ff]/20">
                        <div className="text-4xl mb-4">⚡</div>
                        <p className="text-sm uppercase tracking-widest">Aucune capacité enregistrée</p>
                    </div>
                )}
            </main>
            <WhatsAppFloat />
            <StatusBar admin={admin} />
        </div>
    );
}
