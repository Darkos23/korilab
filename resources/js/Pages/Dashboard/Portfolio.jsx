import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import TopBar from '@/Components/dashboard/TopBar';
import { SLSystemBG, SysWin, SysInput, SysBtn, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

/* ─── Palette Washi soft ─────────────────────────────────── */
const BG     = '#F8F5EF';
const CARD   = '#F5EAD5';
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const INK3   = 'rgba(0,0,0,0.06)';
const TERRA  = '#B43028';
const TERRA2 = '#C84030';
const GOLD   = '#8A5A18';

/* ─── Project Card ───────────────────────────────────────── */
function ProjectCard({ project, deleting, onEdit, onDelete }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative flex flex-col paper-card"
            style={{
                background: CARD,
                borderRadius: 12,
                border: `1px solid ${hovered ? 'rgba(180,48,40,0.25)' : INK3}`,
                borderLeft: `4px solid ${hovered ? TERRA2 : TERRA}`,
                boxShadow: hovered
                    ? '0 8px 32px rgba(30,14,4,0.12)'
                    : '0 2px 12px rgba(30,14,4,0.08)',
                transition: 'all 0.25s',
            }}
        >
            {/* Image */}
            <div className={`relative h-40 overflow-hidden rounded-tl-none rounded-tr-lg flex-shrink-0 ${!project.image ? `bg-gradient-to-br ${project.gradient}` : ''}`}
                style={{ borderRadius: '0 8px 0 0', background: !project.image ? undefined : '#1E0E04' }}>
                {project.image ? (
                    <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl">{project.emoji}</span>
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <span style={{
                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 9,
                        background: 'rgba(0,0,0,0.72)', color: GOLD,
                        border: `1px solid rgba(184,120,32,0.4)`,
                        padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                        {project.category}
                    </span>
                </div>
                {project.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.65)' }}>
                        <span style={{
                            fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 11,
                            color: GOLD, border: `1px solid rgba(184,120,32,0.5)`,
                            background: 'rgba(184,120,32,0.1)', padding: '6px 16px', borderRadius: 6,
                            textTransform: 'uppercase', letterSpacing: '0.2em',
                        }}>
                            En cours...
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1">
                <h3 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 13, color: INK, marginBottom: 8 }}>
                    {project.title}
                </h3>
                <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2, lineHeight: 1.6, marginBottom: 12 }}>
                    {project.desc || '—'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {(project.tags ?? []).slice(0, 4).map(tag => (
                        <span key={tag} style={{
                            fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 10,
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
            <div className="px-4 pb-4 pt-3 flex gap-2 border-t" style={{ borderColor: INK3 }}>
                <button onClick={onEdit}
                    className="flex-1 py-2 transition-all duration-200"
                    style={{
                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 11,
                        color: '#FFFFFF', background: TERRA,
                        border: 'none', borderRadius: 8, cursor: 'pointer',
                        letterSpacing: '0.05em',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = TERRA2; }}
                    onMouseLeave={e => { e.currentTarget.style.background = TERRA; }}
                >
                    Modifier
                </button>
                <button onClick={onDelete}
                    className="flex-1 py-2 transition-all duration-200"
                    style={{
                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 11,
                        color: deleting ? TERRA : INK2,
                        background: 'transparent',
                        border: `1px solid ${deleting ? TERRA : INK3}`,
                        borderRadius: 8, cursor: 'pointer',
                    }}
                >
                    {deleting ? 'Confirmer ?' : 'Supprimer'}
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

/* ─── Shared input style ──────────────────────────────────── */
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

export default function DashboardPortfolio({ admin, projects }) {
    const [collapsed, setCollapsed] = useState(false);
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
                            Portfolio
                        </div>
                        <h1 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 24, color: INK }}>
                            Réalisations
                        </h1>
                        <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2, marginTop: 4 }}>
                            {projects.length} projet{projects.length !== 1 ? 's' : ''} enregistré{projects.length !== 1 ? 's' : ''}
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
                            <Plus className="w-4 h-4" /> Nouveau projet
                        </button>
                    )}
                </div>

                {/* Form */}
                {showForm && (
                    <SysWin title={editingId ? 'Modifier le projet' : 'Nouveau projet'} className="mb-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label style={labelStyle}>Titre *</label>
                                <input name="title" value={form.title} onChange={handleChange} required
                                    placeholder="Nom du projet" style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Catégorie</label>
                                <select name="category" value={form.category} onChange={handleChange}
                                    style={{ ...inputStyle }}>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label style={labelStyle}>Description</label>
                                <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
                                    placeholder="Description du projet"
                                    style={{ ...inputStyle, resize: 'none' }} />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label style={labelStyle}>Tags (virgules)</label>
                                <input name="tags" value={form.tags} onChange={handleChange}
                                    placeholder="React, Laravel, MySQL" style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Lien</label>
                                <input name="link" value={form.link} onChange={handleChange}
                                    placeholder="https://..." style={inputStyle} />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label style={labelStyle}>Image (chemin /portfolio/...)</label>
                                <input name="image" value={form.image} onChange={handleChange}
                                    placeholder="/portfolio/project.png" style={inputStyle} />
                            </div>

                            <div>
                                <label style={labelStyle}>Emoji</label>
                                <div className="flex flex-wrap gap-2">
                                    {EMOJIS.map(e => (
                                        <button key={e} type="button" onClick={() => setForm(prev => ({ ...prev, emoji: e }))}
                                            className="text-xl p-1.5 rounded-lg transition-all"
                                            style={{
                                                border: `1px solid ${form.emoji === e ? TERRA : INK3}`,
                                                background: form.emoji === e ? 'rgba(180,48,40,0.07)' : 'transparent',
                                            }}>
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label style={labelStyle}>Gradient de fond</label>
                                <div className="flex flex-wrap gap-2">
                                    {GRADIENTS.map(g => (
                                        <button key={g} type="button" onClick={() => setForm(prev => ({ ...prev, gradient: g }))}
                                            className={`w-12 h-8 rounded bg-gradient-to-r ${g} transition-all`}
                                            style={{ opacity: form.gradient === g ? 1 : 0.45, outline: form.gradient === g ? `2px solid ${TERRA}` : 'none', outlineOffset: 2 }} />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 flex items-center gap-3">
                                <input type="checkbox" name="comingSoon" id="comingSoon"
                                    checked={form.comingSoon} onChange={handleChange}
                                    className="w-4 h-4" style={{ accentColor: TERRA }} />
                                <label htmlFor="comingSoon" style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 12, color: INK2 }}>
                                    Bientôt disponible
                                </label>
                            </div>

                            <div className="col-span-2 flex gap-3 pt-2">
                                <button type="submit"
                                    style={{
                                        fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 12,
                                        color: '#FFFFFF', background: TERRA,
                                        border: 'none', borderRadius: 8, padding: '9px 20px', cursor: 'pointer',
                                    }}>
                                    {editingId ? 'Enregistrer' : 'Créer le projet'}
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

                <SysDivider label="Réalisations" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            deleting={deleting === project.id}
                            onEdit={() => handleEdit(project)}
                            onDelete={() => handleDelete(project.id)}
                        />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-24">
                        <div className="text-4xl mb-4">📁</div>
                        <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 13, color: INK2, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            Aucun projet enregistré
                        </p>
                    </div>
                )}
                </div>
            </main>
            <StatusBar admin={admin} />
        </div>
    );
}
