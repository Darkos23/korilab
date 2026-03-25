import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import WhatsAppFloat from '@/Components/WhatsAppFloat';
import { SystemGrid, SystemOrbs, ParticleNetwork, SysWin, SysInput, SysTextarea, SysBtn, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

function StatsEditor({ stats, onChange }) {
    const update = (i, field, val) => { const n = [...stats]; n[i] = { ...n[i], [field]: val }; onChange(n); };
    const add    = () => onChange([...stats, { value: '', label: '' }]);
    const remove = i  => onChange(stats.filter((_, j) => j !== i));
    return (
        <div className="space-y-2">
            {stats.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input value={s.value} onChange={e => update(i, 'value', e.target.value)} placeholder="120+"
                        className="w-28 bg-white/[0.04] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10" />
                    <input value={s.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Projets livrés"
                        className="flex-1 bg-white/[0.04] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10" />
                    <button onClick={() => remove(i)} className="text-red-400/30 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 text-[9px] font-mono text-[#00a8ff]/40 hover:text-[#00a8ff] transition-colors uppercase tracking-widest mt-1">
                <Plus className="w-3 h-3" /> Ajouter une stat
            </button>
        </div>
    );
}

export default function DashboardSite({ admin, site }) {
    const [saved, setSaved] = useState(false);

    const [heroStats, setHeroStats] = useState(
        site?.heroStats?.length ? site.heroStats : [
            { value: '20+',    label: 'Projets livrés'     },
            { value: '98%',    label: 'Clients satisfaits' },
            { value: 'S-Rank', label: 'Qualité'            },
            { value: '5 ans',  label: 'Expertise'          },
        ]
    );

    const [form, setForm] = useState({
        availabilityMessage: site?.availabilityMessage          ?? 'Disponible pour de nouveaux projets',
        availabilitySlots:   site?.availabilitySlots            ?? '2 créneaux disponibles ce mois-ci',
        heroBadge:           site?.hero?.badge                  ?? 'Système Activé — Studio Créatif',
        heroTitleStart:      site?.hero?.titleStart             ?? 'Nous forjons des',
        heroTitleHighlight:  site?.hero?.titleHighlight         ?? 'expériences',
        heroTitleEnd:        site?.hero?.titleEnd               ?? 'légendaires',
        heroSubtitle:        site?.hero?.subtitle               ?? 'Design, développement et stratégie — nous franchissons les portes de la médiocrité pour construire des produits digitaux de rang S.',
        heroCta1:            site?.hero?.cta1                   ?? 'Voir nos quêtes',
        heroCta2:            site?.hero?.cta2                   ?? 'Rejoindre la guilde',
        aboutTitleStart:     site?.about?.titleStart     ?? 'Forgés par la passion du',
        aboutTitleHighlight: site?.about?.titleHighlight ?? 'digital',
        aboutPara1:          site?.about?.para1          ?? "Fondée en 2016, Zyra est née d'une conviction simple : le design et la technologie, maîtrisés au rang S, transforment une startup en marque légendaire.",
        aboutPara2:          site?.about?.para2          ?? "Notre guilde de 15 experts allie créativité audacieuse et rigueur technique pour livrer des produits qui repoussent toutes les limites.",
        aboutSkills:         Array.isArray(site?.about?.skills) ? site.about.skills.join(', ') : 'Design UI/UX, React / Next.js, Branding, Motion Design, SEO, Mobile First',
        aboutQuestCount:     site?.about?.questCount     ?? '+20',
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
            footer:      { copyright: form.footerCopyright },
        }, {
            onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2500); },
        });
    };

    const sections = [
        {
            title: 'DISPONIBILITÉ',
            sub: 'Statut affiché sur la page d\'accueil',
            fields: [
                { label: 'Message de disponibilité', name: 'availabilityMessage', placeholder: 'Disponible pour de nouveaux projets' },
                { label: 'Créneaux',                 name: 'availabilitySlots',   placeholder: '2 créneaux disponibles ce mois-ci' },
            ],
        },
        {
            title: 'SECTION HERO — TITRE',
            sub: 'Titre principal de la bannière (3 parties + badge)',
            fields: [
                { label: 'Badge / Label système',       name: 'heroBadge',          placeholder: 'Système Activé — Studio Créatif' },
                { label: 'Titre — Partie 1',            name: 'heroTitleStart',     placeholder: 'Nous forjons des' },
                { label: 'Titre — Mot mis en avant',    name: 'heroTitleHighlight', placeholder: 'expériences' },
                { label: 'Titre — Partie 3',            name: 'heroTitleEnd',       placeholder: 'légendaires' },
                { label: 'Sous-titre (description)',    name: 'heroSubtitle',       placeholder: 'Design, développement...', multiline: true },
            ],
        },
        {
            title: 'SECTION HERO — BOUTONS',
            sub: 'Textes des boutons d\'appel à l\'action',
            fields: [
                { label: 'Bouton principal (CTA 1)', name: 'heroCta1', placeholder: 'Voir nos quêtes' },
                { label: 'Bouton secondaire (CTA 2)', name: 'heroCta2', placeholder: 'Rejoindre la guilde' },
            ],
        },
        {
            title: 'STATS HERO',
            sub:   'Chiffres clés affichés sous le titre',
            stats: true,
        },
        {
            title: 'SECTION NOTRE HISTOIRE',
            sub: 'Textes de la section À propos',
            fields: [
                { label: 'Titre — Partie 1',         name: 'aboutTitleStart',     placeholder: 'Forgés par la passion du' },
                { label: 'Titre — Mot mis en avant',  name: 'aboutTitleHighlight', placeholder: 'digital' },
                { label: 'Compteur quêtes',           name: 'aboutQuestCount',     placeholder: '+20' },
                { label: 'Paragraphe 1',              name: 'aboutPara1',          placeholder: 'Fondée en...', multiline: true },
                { label: 'Paragraphe 2',              name: 'aboutPara2',          placeholder: 'Notre guilde...', multiline: true },
                { label: 'Compétences (virgules)',    name: 'aboutSkills',         placeholder: 'Design UI/UX, React, Branding...' },
            ],
        },
        {
            title: 'CONTACT',
            sub: 'Informations de contact publiques',
            fields: [
                { label: 'Email',        name: 'contactEmail',    placeholder: 'contact@zyra.dev' },
                { label: 'Téléphone',    name: 'contactPhone',    placeholder: '+221 77 000 00 00' },
                { label: 'Localisation', name: 'contactLocation', placeholder: 'Dakar, Sénégal' },
            ],
        },
        {
            title: 'FOOTER',
            sub: 'Pied de page du site',
            fields: [
                { label: 'Copyright', name: 'footerCopyright', placeholder: '© 2025 Dualcore. All rights reserved.' },
            ],
        },
    ];

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
                            <span className="text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">Configuration du système</span>
                        </div>
                        <h1 className="text-2xl font-black text-white" style={{ textShadow:'0 0 20px rgba(0,168,255,0.2)' }}>Paramètres du site</h1>
                        <p className="text-[#00a8ff]/30 text-xs font-mono mt-1">Contenu affiché sur la page publique</p>
                    </div>

                    <button onClick={handleSubmit}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono border transition-all duration-300
                            ${saved
                                ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                                : 'border-[#00a8ff]/30 bg-[#00a8ff]/10 text-[#00a8ff] hover:bg-[#00a8ff]/20 hover:shadow-[0_0_15px_rgba(0,168,255,0.15)]'
                            }`}>
                        {saved
                            ? <><CheckCircle className="w-4 h-4" /> [ SAUVEGARDÉ ]</>
                            : <><Save className="w-4 h-4" /> [ ENREGISTRER ]</>
                        }
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
                    {sections.map((sec, si) => (
                        <div key={sec.title}>
                            <SysWin title={sec.title} subtitle={sec.sub} delay={si * 0.08} glow={si === 0}>
                                {sec.stats
                                    ? <StatsEditor stats={heroStats} onChange={setHeroStats} />
                                    : <div className="grid gap-4">
                                        {sec.fields.map(f => (
                                            f.multiline
                                                ? <SysTextarea key={f.name} label={f.label} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} rows={3} />
                                                : <SysInput    key={f.name} label={f.label} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
                                        ))}
                                    </div>
                                }
                            </SysWin>
                        </div>
                    ))}

                    <SysDivider label="Actions" />

                    <div className="flex items-center gap-4">
                        <SysBtn type="submit" variant="primary">
                            <Save className="w-4 h-4" />
                            {saved ? '[ SAUVEGARDÉ ✓ ]' : '[ ENREGISTRER LES MODIFICATIONS ]'}
                        </SysBtn>
                    </div>
                </form>
            </main>
            <WhatsAppFloat />
            <StatusBar admin={admin} />
        </div>
    );
}
