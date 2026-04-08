import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import TopBar from '@/Components/dashboard/TopBar';
import { SLSystemBG, SysWin, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

/* ─── Palette Washi soft ─────────────────────────────────── */
const BG     = '#F8F5EF';
const CARD   = '#FDFBF7';
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const INK3   = 'rgba(0,0,0,0.06)';
const TERRA  = '#B43028';
const TERRA2 = '#C84030';
const GOLD   = '#8A5A18';

const inputStyle = {
    fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 13,
    color: INK, backgroundColor: CARD, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.70' numOctaves='5' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px',
    border: `1px solid ${INK3}`, borderRadius: 8,
    padding: '8px 12px', width: '100%', outline: 'none',
};

const labelStyle = {
    fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10,
    color: INK2, textTransform: 'uppercase', letterSpacing: '0.12em',
    display: 'block', marginBottom: 6,
};

const defaultTestimonial = { name: '', role: '', company: '', quote: '', stars: 5, initials: '', avatar: '' };

function TestimonialsEditor({ items, onChange }) {
    const update = (i, field, val) => { const n = [...items]; n[i] = { ...n[i], [field]: val }; onChange(n); };
    const add    = () => onChange([...items, { ...defaultTestimonial }]);
    const remove = i  => onChange(items.filter((_, j) => j !== i));
    return (
        <div className="space-y-4">
            {items.map((t, i) => (
                <div key={i} className="p-4 rounded-xl space-y-3" style={{ border: `1px solid ${INK3}`, background: 'rgba(0,0,0,0.02)' }}>
                    <div className="flex justify-between items-center">
                        <span style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 11, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Témoignage {i + 1}
                        </span>
                        <button onClick={() => remove(i)} style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label style={labelStyle}>Nom</label>
                            <input value={t.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Mary Katy Diagne" style={inputStyle} /></div>
                        <div><label style={labelStyle}>Initiales</label>
                            <input value={t.initials} onChange={e => update(i, 'initials', e.target.value)} placeholder="MKD" style={inputStyle} /></div>
                        <div><label style={labelStyle}>Rôle</label>
                            <input value={t.role} onChange={e => update(i, 'role', e.target.value)} placeholder="Fondatrice" style={inputStyle} /></div>
                        <div><label style={labelStyle}>Entreprise</label>
                            <input value={t.company} onChange={e => update(i, 'company', e.target.value)} placeholder="Rosmie Premium" style={inputStyle} /></div>
                    </div>
                    <div><label style={labelStyle}>Témoignage</label>
                        <textarea value={t.quote} onChange={e => update(i, 'quote', e.target.value)} rows={3}
                            placeholder="Ce que le client dit du studio..." style={{ ...inputStyle, resize: 'vertical' }} /></div>
                    <div className="flex gap-3 items-center">
                        <div style={{ flex: 1 }}><label style={labelStyle}>Avatar (chemin)</label>
                            <input value={t.avatar} onChange={e => update(i, 'avatar', e.target.value)} placeholder="/testimonials/nom.jpg" style={inputStyle} /></div>
                        <div style={{ width: 80 }}><label style={labelStyle}>Étoiles</label>
                            <select value={t.stars} onChange={e => update(i, 'stars', Number(e.target.value))} style={inputStyle}>
                                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
                            </select></div>
                    </div>
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 mt-1"
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Plus className="w-3 h-3" /> Ajouter un témoignage
            </button>
        </div>
    );
}

function StatsEditor({ stats, onChange }) {
    const update = (i, field, val) => { const n = [...stats]; n[i] = { ...n[i], [field]: val }; onChange(n); };
    const add    = () => onChange([...stats, { value: '', label: '' }]);
    const remove = i  => onChange(stats.filter((_, j) => j !== i));
    return (
        <div className="space-y-2">
            {stats.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input value={s.value} onChange={e => update(i, 'value', e.target.value)} placeholder="100%"
                        style={{ ...inputStyle, width: 110 }} />
                    <input value={s.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Projets livrés"
                        style={{ ...inputStyle, flex: 1 }} />
                    <button onClick={() => remove(i)}
                        style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
            <button onClick={add}
                className="flex items-center gap-1 mt-1"
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Plus className="w-3 h-3" /> Ajouter une stat
            </button>
        </div>
    );
}

export default function DashboardSite({ admin, site }) {
    const [collapsed, setCollapsed] = useState(false);
    const [saved, setSaved] = useState(false);

    const [testimonials, setTestimonials] = useState(
        Array.isArray(site?.testimonials) && site.testimonials.length ? site.testimonials : []
    );

    const [heroStats, setHeroStats] = useState(
        site?.heroStats?.length ? site.heroStats : [
            { value: '100%',    label: 'Clients satisfaits' },
            { value: '24h',    label: 'Temps de réponse'  },
            { value: 'Premium',label: 'Qualité'           },
            { value: 'Dakar',  label: 'Basés à'           },
        ]
    );

    const [form, setForm] = useState({
        availabilityMessage: site?.availabilityMessage          ?? 'Disponible pour de nouveaux projets',
        availabilitySlots:   site?.availabilitySlots            ?? '2 créneaux disponibles ce mois-ci',
        heroBadge:           site?.hero?.badge                  ?? 'Studio Créatif — Dakar',
        heroTitleStart:      site?.hero?.titleStart             ?? 'Nous créons des',
        heroTitleHighlight:  site?.hero?.titleHighlight         ?? 'expériences',
        heroTitleEnd:        site?.hero?.titleEnd               ?? 'mémorables',
        heroSubtitle:        site?.hero?.subtitle               ?? 'Design, développement et stratégie — nous construisons des produits digitaux de haute qualité.',
        heroCta1:            site?.hero?.cta1                   ?? 'Voir nos projets',
        heroCta2:            site?.hero?.cta2                   ?? 'Nous contacter',
        aboutTitleStart:     site?.about?.titleStart     ?? 'Forgés par la passion du',
        aboutTitleHighlight: site?.about?.titleHighlight ?? 'digital',
        aboutPara1:          site?.about?.para1          ?? "KoriLab est née d'une conviction simple : le design et la technologie, maîtrisés à la perfection, transforment une startup en marque légendaire.",
        aboutPara2:          site?.about?.para2          ?? "Notre équipe allie créativité audacieuse et rigueur technique pour livrer des produits qui repoussent toutes les limites.",
        aboutSkills:         Array.isArray(site?.about?.skills) ? site.about.skills.join(', ') : 'Design UI/UX, React / Next.js, Branding, Motion Design, SEO, Mobile First',
        aboutQuestCount:     site?.about?.questCount     ?? '100%',
        contactEmail:        site?.contactInfo?.email           ?? '',
        contactPhone:        site?.contactInfo?.phone           ?? '',
        contactLocation:     site?.contactInfo?.location        ?? '',
        footerCopyright:     site?.footer?.copyright            ?? '',
    });

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = e => {
        e.preventDefault();
        router.patch('/dashboard/site', {
            availabilityMessage: form.availabilityMessage,
            availabilitySlots:   form.availabilitySlots,
            heroStats,
            hero: {
                badge:          form.heroBadge,
                titleStart:     form.heroTitleStart,
                titleHighlight: form.heroTitleHighlight,
                titleEnd:       form.heroTitleEnd,
                subtitle:       form.heroSubtitle,
                cta1:           form.heroCta1,
                cta2:           form.heroCta2,
            },
            about: {
                titleStart:     form.aboutTitleStart,
                titleHighlight: form.aboutTitleHighlight,
                para1:          form.aboutPara1,
                para2:          form.aboutPara2,
                skills:         form.aboutSkills.split(',').map(s => s.trim()).filter(Boolean),
                questCount:     form.aboutQuestCount,
            },
            contactInfo: { email: form.contactEmail, phone: form.contactPhone, location: form.contactLocation },
            testimonials,
            footer:      { copyright: form.footerCopyright },
        }, {
            onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2500); },
        });
    };

    const sections = [
        {
            title: 'Disponibilité',
            sub: "Statut affiché sur la page d'accueil",
            fields: [
                { label: 'Message de disponibilité', name: 'availabilityMessage', placeholder: 'Disponible pour de nouveaux projets' },
                { label: 'Créneaux',                 name: 'availabilitySlots',   placeholder: '2 créneaux disponibles ce mois-ci' },
            ],
        },
        {
            title: 'Section Hero — Titre',
            sub: 'Titre principal de la bannière (3 parties + badge)',
            fields: [
                { label: 'Badge / Label',               name: 'heroBadge',          placeholder: 'Studio Créatif — Dakar' },
                { label: 'Titre — Partie 1',            name: 'heroTitleStart',     placeholder: 'Nous créons des' },
                { label: 'Titre — Mot mis en avant',    name: 'heroTitleHighlight', placeholder: 'expériences' },
                { label: 'Titre — Partie 3',            name: 'heroTitleEnd',       placeholder: 'mémorables' },
                { label: 'Sous-titre (description)',    name: 'heroSubtitle',       placeholder: 'Design, développement...', multiline: true },
            ],
        },
        {
            title: 'Section Hero — Boutons',
            sub: "Textes des boutons d'appel à l'action",
            fields: [
                { label: 'Bouton principal (CTA 1)',  name: 'heroCta1', placeholder: 'Voir nos projets' },
                { label: 'Bouton secondaire (CTA 2)', name: 'heroCta2', placeholder: 'Nous contacter' },
            ],
        },
        {
            title: 'Stats Hero',
            sub:   'Chiffres clés affichés sous le titre',
            stats: true,
        },
        {
            title: 'Notre Histoire',
            sub: "Textes de la section À propos",
            fields: [
                { label: 'Titre — Partie 1',         name: 'aboutTitleStart',     placeholder: 'Forgés par la passion du' },
                { label: 'Titre — Mot mis en avant',  name: 'aboutTitleHighlight', placeholder: 'digital' },
                { label: 'Compteur projets',          name: 'aboutQuestCount',     placeholder: '+20' },
                { label: 'Paragraphe 1',              name: 'aboutPara1',          placeholder: 'Fondée en...', multiline: true },
                { label: 'Paragraphe 2',              name: 'aboutPara2',          placeholder: 'Notre équipe...', multiline: true },
                { label: 'Compétences (virgules)',    name: 'aboutSkills',         placeholder: 'Design UI/UX, React, Branding...' },
            ],
        },
        {
            title: 'Témoignages',
            sub: 'Avis clients affichés sur le site',
            testimonials: true,
        },
        {
            title: 'Contact',
            sub: 'Informations de contact publiques',
            fields: [
                { label: 'Email',        name: 'contactEmail',    placeholder: 'contact@korilab.dev' },
                { label: 'Téléphone',    name: 'contactPhone',    placeholder: '+221 77 000 00 00' },
                { label: 'Localisation', name: 'contactLocation', placeholder: 'Dakar, Sénégal' },
            ],
        },
        {
            title: 'Footer',
            sub: 'Pied de page du site',
            fields: [
                { label: 'Copyright', name: 'footerCopyright', placeholder: '© 2025 KoriLab. Tous droits réservés.' },
            ],
        },
    ];

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
                            Configuration
                        </div>
                        <h1 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 24, color: INK }}>
                            Paramètres du site
                        </h1>
                        <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2, marginTop: 4 }}>
                            Contenu affiché sur la page publique
                        </p>
                    </div>

                    <button onClick={handleSubmit}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300"
                        style={saved
                            ? { fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 13, color: '#16a34a', border: '1px solid rgba(22,163,74,0.3)', background: 'rgba(22,163,74,0.06)', cursor: 'pointer' }
                            : { fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 13, color: '#FFFFFF', background: TERRA, border: 'none', cursor: 'pointer' }
                        }
                        onMouseEnter={e => { if (!saved) e.currentTarget.style.background = TERRA2; }}
                        onMouseLeave={e => { if (!saved) e.currentTarget.style.background = TERRA; }}>
                        {saved
                            ? <><CheckCircle className="w-4 h-4" /> Sauvegardé</>
                            : <><Save className="w-4 h-4" /> Enregistrer</>
                        }
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
                    {sections.map((sec, si) => (
                        <div key={sec.title}>
                            <SysWin title={sec.title} subtitle={sec.sub} delay={si * 0.08}>
                                {sec.testimonials
                                    ? <TestimonialsEditor items={testimonials} onChange={setTestimonials} />
                                    : sec.stats
                                    ? <StatsEditor stats={heroStats} onChange={setHeroStats} />
                                    : <div className="grid gap-4">
                                        {sec.fields.map(f => (
                                            <div key={f.name}>
                                                <label style={labelStyle}>{f.label}</label>
                                                {f.multiline
                                                    ? <textarea name={f.name} value={form[f.name]} onChange={handleChange}
                                                        placeholder={f.placeholder} rows={3}
                                                        style={{ ...inputStyle, resize: 'vertical' }} />
                                                    : <input name={f.name} value={form[f.name]} onChange={handleChange}
                                                        placeholder={f.placeholder} style={inputStyle} />
                                                }
                                            </div>
                                        ))}
                                    </div>
                                }
                            </SysWin>
                        </div>
                    ))}

                    <SysDivider label="Actions" />

                    <div className="flex items-center gap-4 pb-8">
                        <button type="submit"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200"
                            style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 13, color: '#FFFFFF', background: TERRA, border: 'none', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.background = TERRA2; }}
                            onMouseLeave={e => { e.currentTarget.style.background = TERRA; }}>
                            <Save className="w-4 h-4" />
                            {saved ? 'Sauvegardé ✓' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
                </div>
            </main>
            <StatusBar admin={admin} />
        </div>
    );
}
