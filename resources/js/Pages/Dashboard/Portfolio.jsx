import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import WhatsAppFloat from '@/Components/WhatsAppFloat';
import { SystemGrid, SystemOrbs, ParticleNetwork, SysWin, SysInput, SysBtn, SysDivider, Scanlines, StatusBar } from '@/Components/dashboard/SystemLayout';

/* ─── Corner brackets (L-shaped, like in the anime) ─────── */
function CornerBrackets({ size = 14, color = '#4fc3f7', glow = true }) {
    const style = (pos) => ({
        position: 'absolute',
        width: size,
        height: size,
        ...pos,
        boxShadow: glow ? `0 0 8px 2px ${color}` : 'none',
    });
    const borderW = '2px';
    return (
        <>
            {/* Top-left */}
            <div style={{ ...style({ top: 0, left: 0 }), borderTop: `${borderW} solid ${color}`, borderLeft: `${borderW} solid ${color}` }} />
            {/* Top-right */}
            <div style={{ ...style({ top: 0, right: 0 }), borderTop: `${borderW} solid ${color}`, borderRight: `${borderW} solid ${color}` }} />
            {/* Bottom-left */}
            <div style={{ ...style({ bottom: 0, left: 0 }), borderBottom: `${borderW} solid ${color}`, borderLeft: `${borderW} solid ${color}` }} />
            {/* Bottom-right */}
            <div style={{ ...style({ bottom: 0, right: 0 }), borderBottom: `${borderW} solid ${color}`, borderRight: `${borderW} solid ${color}` }} />
        </>
    );
}

/* ─── Solo Leveling Notification Card ───────────────────── */
function SLNotifCard({ project, deleting, onEdit, onDelete }) {
    const [hovered, setHovered] = useState(false);

    const BLUE   = '#4fc3f7';
    const BLUE2  = '#1b45d7';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.4 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative"
            style={{
                /* Angled corners — top-right + bottom-left coupés */
                clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
                background: 'linear-gradient(160deg, #0d2235 0%, #020810 100%)',
                border: `1px solid ${hovered ? BLUE + 'aa' : BLUE2 + '60'}`,
                boxShadow: hovered
                    ? `0 0 20px 4px ${BLUE2}50, 0 0 40px 8px ${BLUE2}20, inset 0 0 20px ${BLUE2}08`
                    : `0 0 10px 2px ${BLUE2}30, inset 0 0 10px ${BLUE2}05`,
                transition: 'box-shadow 0.3s, border-color 0.3s',
            }}
        >
            <Scanlines />
            <CornerBrackets color={hovered ? BLUE : BLUE2 + 'cc'} glow={hovered} />

            {/* ── Header "NOTIFICATION" ── */}
            <div className="relative z-10 flex items-center gap-3 px-4 py-3 border-b"
                style={{ borderColor: BLUE2 + '40', background: 'rgba(27,69,215,0.06)' }}>
                {/* Exclamation icon */}
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center border rounded"
                    style={{ borderColor: BLUE + '80', background: 'rgba(79,195,247,0.08)' }}>
                    <span className="text-xs font-black" style={{ color: BLUE, textShadow: `0 0 8px ${BLUE}` }}>!</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[8px] font-mono uppercase tracking-[0.35em] mb-0.5" style={{ color: BLUE + '60' }}>
                        NOTIFICATION
                    </div>
                    <div className="text-xs font-black text-white truncate uppercase tracking-wider">
                        {project.title}
                    </div>
                </div>
                {/* Category badge */}
                <span className="text-[8px] font-mono px-2 py-0.5 flex-shrink-0"
                    style={{ color: BLUE + '90', border: `1px solid ${BLUE2}60`, background: 'rgba(27,69,215,0.1)' }}>
                    {project.category.toUpperCase()}
                </span>
            </div>

            {/* ── Image / gradient band ── */}
            <div className={`relative z-10 h-36 overflow-hidden ${!project.image ? `bg-gradient-to-br ${project.gradient}` : 'bg-[#020810]'} flex items-center justify-center`}>
                {project.image ? (
                    <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover opacity-90"
                        onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                    />
                ) : null}
                {/* Fallback emoji si pas d'image */}
                <div className={`${project.image ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                    <div className="absolute inset-0 opacity-[0.15]"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 3px)' }} />
                    <span className="relative text-5xl drop-shadow-2xl">{project.emoji}</span>
                </div>
                {/* Scanlines overlay sur l'image */}
                {project.image && (
                    <div className="absolute inset-0 opacity-[0.08]"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#000,#000 1px,transparent 1px,transparent 3px)' }} />
                )}
                {/* Blue tint overlay */}
                {project.image && (
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(2,8,16,0.1), rgba(2,8,16,0.5))' }} />
                )}
                {project.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center z-10"
                        style={{ background: 'rgba(4,13,26,0.80)' }}>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] px-3 py-1 border"
                            style={{ color: '#fbbf24', borderColor: '#fbbf2460' }}>
                            EN COURS...
                        </span>
                    </div>
                )}
            </div>

            {/* ── Body ── */}
            <div className="relative z-10 px-4 py-3">
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {project.desc || '—'}
                </p>
                <div className="flex flex-wrap gap-1">
                    {(project.tags ?? []).slice(0, 4).map(tag => (
                        <span key={tag} className="text-[8px] font-mono px-2 py-0.5"
                            style={{ color: BLUE + '70', border: `1px solid ${BLUE2}40`, background: 'rgba(27,69,215,0.07)' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── YES / NO buttons ── */}
            <div className="relative z-10 grid grid-cols-2 border-t" style={{ borderColor: BLUE2 + '30' }}>
                <button onClick={onEdit}
                    className="py-3 text-[10px] font-mono uppercase tracking-widest transition-all duration-200 border-r"
                    style={{
                        color: hovered ? BLUE : BLUE + '70',
                        borderColor: BLUE2 + '30',
                        background: hovered ? 'rgba(79,195,247,0.06)' : 'transparent',
                    }}>
                    [ MODIFIER ]
                </button>
                <button onClick={onDelete}
                    className="py-3 text-[10px] font-mono uppercase tracking-widest transition-all duration-200"
                    style={{
                        color: deleting ? '#f87171' : 'rgba(255,255,255,0.2)',
                        background: deleting ? 'rgba(248,113,113,0.08)' : 'transparent',
                    }}>
                    {deleting ? '⚠ CONFIRMER' : '[ SUPPRIMER ]'}
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
        <div className="min-h-screen bg-[#0d2235] flex relative overflow-hidden">
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
                            <span className="text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">Quêtes accomplies</span>
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
                    <SysWin title={editingId ? 'MODIFIER LA QUÊTE' : 'NOUVELLE QUÊTE'} glow className="mb-6">
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
                                    className="w-full bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-[#00a8ff]/40 outline-none"
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
                                    className="w-full bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-[#00a8ff]/40 outline-none"
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

                <SysDivider label="Quêtes enregistrées" />

                {/* Solo Leveling Notification Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <SLNotifCard
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
                        <p className="text-sm uppercase tracking-[0.3em]">Aucune quête enregistrée</p>
                    </div>
                )}
            </main>
        <WhatsAppFloat />
        <StatusBar admin={admin} />
        </div>
    );
}
