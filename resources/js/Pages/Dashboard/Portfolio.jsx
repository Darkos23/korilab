import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import WhatsAppFloat from '@/Components/WhatsAppFloat';
import { SLSystemBG, SysWin, SysInput, SysBtn, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

/* ─── Cauri Project Card ─────────────────────────────────── */
function CauriCard({ project, deleting, onEdit, onDelete }) {
    const [hovered, setHovered] = useState(false);
    const GOLD  = '#e8b84b';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative overflow-hidden flex flex-col"
            style={{
                background: 'linear-gradient(160deg, #221a0a 0%, #140e04 100%)',
                borderRadius: 12,
                border: `1px solid ${hovered ? GOLD + '55' : 'rgba(232,184,75,0.12)'}`,
                borderLeft: `3px solid ${hovered ? GOLD : GOLD + '50'}`,
                boxShadow: hovered
                    ? `0 8px 32px rgba(196,90,42,0.2), 0 2px 8px rgba(0,0,0,0.4)`
                    : `0 2px 12px rgba(0,0,0,0.3)`,
                transition: 'all 0.3s',
            }}
        >
            {/* Image */}
            <div className={`relative h-40 overflow-hidden flex-shrink-0 ${!project.image ? `bg-gradient-to-br ${project.gradient}` : 'bg-[#120d04]'}`}>
                {project.image ? (
                    <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl drop-shadow-lg">{project.emoji}</span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span className="text-[9px] font-mono px-2 py-1 rounded"
                        style={{ background: 'rgba(20,14,4,0.88)', color: GOLD, border: `1px solid ${GOLD}40` }}>
                        {project.category.toUpperCase()}
                    </span>
                </div>
                {project.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(14,10,3,0.82)' }}>
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] px-4 py-2 rounded"
                            style={{ color: GOLD, border: `1px solid ${GOLD}50`, background: 'rgba(232,184,75,0.08)' }}>
                            En cours...
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1">
                <h3 className="font-black text-sm uppercase tracking-wide mb-2" style={{ color: '#f5ecd0' }}>
                    {project.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(245,236,208,0.45)' }}>
                    {project.desc || '—'}
                </p>
                <div className="flex flex-wrap gap-1">
                    {(project.tags ?? []).slice(0, 4).map(tag => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                            style={{ color: GOLD + '90', background: 'rgba(232,184,75,0.08)', border: `1px solid rgba(232,184,75,0.2)` }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex gap-2 border-t pt-3" style={{ borderColor: 'rgba(232,184,75,0.12)' }}>
                <button onClick={onEdit}
                    className="flex-1 py-2 text-[10px] font-mono uppercase tracking-widest rounded transition-all duration-200"
                    style={{
                        color: GOLD,
                        border: `1px solid ${GOLD}40`,
                        background: hovered ? `rgba(232,184,75,0.08)` : 'transparent',
                    }}>
                    Modifier
                </button>
                <button onClick={onDelete}
                    className="flex-1 py-2 text-[10px] font-mono uppercase tracking-widest rounded transition-all duration-200"
                    style={{
                        color: deleting ? '#f87171' : 'rgba(245,236,208,0.3)',
                        border: `1px solid ${deleting ? 'rgba(248,113,113,0.4)' : 'rgba(245,236,208,0.1)'}`,
                        background: deleting ? 'rgba(248,113,113,0.08)' : 'transparent',
                    }}>
                    {deleting ? '⚠ Confirmer' : 'Supprimer'}
                </button>
            </div>
        </motion.div>
    );
}

const GRADIENTS = [
    'from-blue-600 to-violet-600',
    'from-violet-600 to-pink-600',
    'from-emerald-500 to-cyan-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
];

const EMOJIS = ['🚀','💻','📱','🎨','⚡','🌐','🔥','💎','🎯','🛸'];
const CATEGORIES = ['Web', 'Mobile', 'Design', 'Backend', 'Fullstack'];

const defaultForm = {
    title: '',
    desc: '',
    category: 'Web',
    tags: '',
    emoji: '🚀',
    gradient: 'from-blue-600 to-violet-600',
    image: '',
    link: '',
    comingSoon: false,
};

export default function DashboardPortfolio({ admin, projects }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(defaultForm);
    const [deleting, setDeleting] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...form,
            tags: typeof form.tags === 'string'
                ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
                : form.tags,
        };
        if (editingId) {
            router.patch(`/dashboard/portfolio/${editingId}`, data, {
                onSuccess: () => { setEditingId(null); setForm(defaultForm); setShowForm(false); },
            });
        } else {
            router.post('/dashboard/portfolio', data, {
                onSuccess: () => { setForm(defaultForm); setShowForm(false); },
            });
        }
    };

    const handleEdit = (project) => {
        setForm({
            ...project,
            tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags ?? '',
        });
        setEditingId(project.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (deleting === id) {
            router.delete(`/dashboard/portfolio/${id}`, {
                onSuccess: () => setDeleting(null),
            });
        } else {
            setDeleting(id);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setForm(defaultForm);
    };

    return (
        <div className="min-h-screen bg-transparent flex relative overflow-hidden">
            <SLSystemBG />
            
            
      
            <Sidebar admin={admin} />

            <main className="relative z-10 flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)]" />
                            <span className="text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">Projets</span>
                        </div>
                        <h1 className="text-2xl font-black text-white" style={{ textShadow:'0 0 20px rgba(0,168,255,0.2)' }}>Portfolio</h1>
                        <p className="text-[#00a8ff]/30 text-xs font-mono mt-1">{projects.length} projet(s) enregistré(s)</p>
                    </div>
                    {!showForm && (
                        <SysBtn variant="primary" onClick={() => setShowForm(true)}>
                            <Plus className="w-4 h-4" /> Nouveau projet
                        </SysBtn>
                    )}
                </div>

                {/* Form */}
                {showForm && (
                    <SysWin title={editingId ? 'MODIFIER LE PROJET' : 'NOUVEAU PROJET'} glow className="mb-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <SysInput
                                    label="Titre *"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nom du projet"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">Catégorie</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.04] border border-white/15 rounded-sm px-3 py-2 text-white text-sm font-mono focus:border-white/40 outline-none"
                                >
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-1.5">Description</label>
                                <textarea
                                    name="desc"
                                    value={form.desc}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-violet-500 outline-none resize-none"
                                    placeholder="Description du projet"
                                />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm text-gray-400 mb-1">Tags (virgules)</label>
                                <input
                                    name="tags"
                                    value={form.tags}
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.04] border border-white/15 rounded-sm px-3 py-2 text-white text-sm font-mono focus:border-white/40 outline-none"
                                    placeholder="React, Laravel, MySQL"
                                />
                            </div>

                            <div>
                                <SysInput label="Lien" name="link" value={form.link} onChange={handleChange} placeholder="https://..." />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <SysInput label="Image (chemin /portfolio/...)" name="image" value={form.image} onChange={handleChange} placeholder="/portfolio/project.png" />
                            </div>

                            <div>
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-2">Emoji</label>
                                <div className="flex flex-wrap gap-2">
                                    {EMOJIS.map(e => (
                                        <button key={e} type="button" onClick={() => setForm(prev => ({ ...prev, emoji: e }))}
                                            className={`text-xl p-1.5 rounded-lg border transition-all ${form.emoji === e ? 'border-[#00a8ff]/50 bg-[#00a8ff]/10' : 'border-white/5 bg-white/[0.02] hover:border-[#00a8ff]/20'}`}>
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-widest mb-2">Gradient</label>
                                <div className="flex flex-wrap gap-2">
                                    {GRADIENTS.map(g => (
                                        <button key={g} type="button" onClick={() => setForm(prev => ({ ...prev, gradient: g }))}
                                            className={`w-12 h-8 rounded bg-gradient-to-r ${g} transition-all ${form.gradient === g ? 'ring-2 ring-[#00a8ff] ring-offset-1 ring-offset-[#0d2235]' : 'opacity-50 hover:opacity-80'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 flex items-center gap-3">
                                <input type="checkbox" name="comingSoon" id="comingSoon" checked={form.comingSoon} onChange={handleChange}
                                    className="w-4 h-4 accent-[#00a8ff]" />
                                <label htmlFor="comingSoon" className="text-xs font-mono text-white/40">Bientôt disponible</label>
                            </div>

                            <div className="col-span-2 flex gap-3 pt-2">
                                <SysBtn type="submit" variant="primary">{editingId ? '[ ENREGISTRER ]' : '[ CRÉER ]'}</SysBtn>
                                <SysBtn type="button" variant="ghost" onClick={handleCancel}>[ ANNULER ]</SysBtn>
                            </div>
                        </form>
                    </SysWin>
                )}

                <SysDivider label="Réalisations" />

                {/* Solo Leveling Notification Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <CauriCard
                            key={project.id}
                            project={project}
                            deleting={deleting === project.id}
                            onEdit={() => handleEdit(project)}
                            onDelete={() => handleDelete(project.id)}
                        />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-24 font-mono text-[#1b45d7]/40">
                        <div className="text-4xl mb-4">📁</div>
                        <p className="text-sm uppercase tracking-[0.3em]">Aucun projet enregistré</p>
                    </div>
                )}
            </main>
        <WhatsAppFloat />
        <StatusBar admin={admin} />
        </div>
    );
}
