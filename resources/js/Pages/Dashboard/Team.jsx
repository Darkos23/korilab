import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, Trash2, ChevronDown, ChevronUp, Save, CheckCircle } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import TopBar from '@/Components/dashboard/TopBar';
import { SLSystemBG, SysWin, SysInput, SysTextarea, SysSelect, SysBtn, SysDivider, StatusBar } from '@/Components/dashboard/SystemLayout';

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

const THEMES = [
    { value: 'shadow',        label: 'Violet sombre'      },
    { value: 'constellation', label: 'Indigo constellation'},
    { value: 'real-madrid',   label: 'Or & Marine'        },
    { value: 'gojo',          label: 'Bleu infini'        },
    { value: 'dune',          label: 'Sable — Dakar'      },
    { value: 'itachi',        label: 'Cramoisi'           },
    { value: 'beast',         label: 'Ambre'              },
    { value: 'antares',       label: 'Rouge stellaire'    },
];
const RANKS = ['S','A','B','C'];

const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ background: INK3 }} />
        <span style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 9, color: INK2, textTransform: 'uppercase', letterSpacing: '0.25em' }}>
            {children}
        </span>
        <div className="flex-1 h-px" style={{ background: INK3 }} />
    </div>
);

/* ─── Skills editor ────────────────────────────────────────── */
function SkillsEditor({ skills, onChange }) {
    const update = (i, field, val) => { const n=[...skills]; n[i]={...n[i],[field]:field==='level'?Number(val):val}; onChange(n); };
    const add    = () => onChange([...skills,{name:'',level:80,category:''}]);
    const remove = (i) => onChange(skills.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {skills.map((sk,i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input value={sk.name} onChange={e=>update(i,'name',e.target.value)} placeholder="Compétence"
                        style={{ ...inputStyle, flex: 1 }} />
                    <input value={sk.category} onChange={e=>update(i,'category',e.target.value)} placeholder="Catégorie"
                        style={{ ...inputStyle, width: 110 }} />
                    <input type="number" min={0} max={100} value={sk.level} onChange={e=>update(i,'level',e.target.value)}
                        style={{ ...inputStyle, width: 64, textAlign: 'center' }} />
                    <span style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 9, color: INK2, width: 28 }}>{sk.level}%</span>
                    <button onClick={()=>remove(i)} style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash2 className="w-3.5 h-3.5"/>
                    </button>
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 mt-1 transition-colors"
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Plus className="w-3 h-3"/> Ajouter
            </button>
        </div>
    );
}

/* ─── Experience editor ───────────────────────────────────── */
function ExperienceEditor({ experience, onChange }) {
    const [open, setOpen] = useState([]);
    const toggle = i => setOpen(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i]);
    const update  = (i,f,v) => { const n=[...experience]; n[i]={...n[i],[f]:v}; onChange(n); };
    const updM    = (i,j,v) => { const n=[...experience]; const ms=[...n[i].missions]; ms[j]=v; n[i]={...n[i],missions:ms}; onChange(n); };
    const addM    = i  => { const n=[...experience]; n[i].missions=[...(n[i].missions??[]),'']; onChange(n); };
    const removeM = (i,j) => { const n=[...experience]; n[i].missions=n[i].missions.filter((_,k)=>k!==j); onChange(n); };
    const add     = () => { onChange([...experience,{period:'',company:'',title:'',missions:['']}]); setOpen(p=>[...p,experience.length]); };
    const remove  = i  => onChange(experience.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {experience.map((exp,i) => (
                <div key={i} style={{ border: `1px solid ${INK3}`, borderRadius: 8, overflow: 'hidden' }}>
                    <div className="flex items-center gap-2 px-3 py-2.5 cursor-pointer"
                        style={{ background: 'rgba(0,0,0,0.02)' }}
                        onClick={()=>toggle(i)}>
                        <span className="flex-1 truncate" style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 13, color: INK }}>
                            {exp.title || `Expérience ${i+1}`}
                        </span>
                        <span style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 10, color: INK2 }}>{exp.period}</span>
                        <button onClick={e=>{e.stopPropagation();remove(i);}}
                            style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                        {open.includes(i)
                            ? <ChevronUp className="w-3.5 h-3.5" style={{ color: INK2 }}/>
                            : <ChevronDown className="w-3.5 h-3.5" style={{ color: INK2 }}/>
                        }
                    </div>
                    {open.includes(i) && (
                        <div className="p-3 space-y-2" style={{ borderTop: `1px solid ${INK3}` }}>
                            <div className="grid grid-cols-2 gap-2">
                                <input placeholder="Période" value={exp.period} onChange={e=>update(i,'period',e.target.value)} style={inputStyle} />
                                <input placeholder="Entreprise" value={exp.company} onChange={e=>update(i,'company',e.target.value)} style={inputStyle} />
                            </div>
                            <input placeholder="Poste / Titre" value={exp.title} onChange={e=>update(i,'title',e.target.value)} style={inputStyle} />
                            <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 9, color: INK2, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 8 }}>Missions :</p>
                            <div className="space-y-1.5">
                                {(exp.missions??[]).map((m,j) => (
                                    <div key={j} className="flex gap-2">
                                        <input value={m} onChange={e=>updM(i,j,e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                                        <button onClick={()=>removeM(i,j)} style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <Trash2 className="w-3.5 h-3.5"/>
                                        </button>
                                    </div>
                                ))}
                                <button onClick={()=>addM(i)}
                                    style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                    className="flex items-center gap-1">
                                    <Plus className="w-3 h-3"/> Mission
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <button onClick={add}
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                className="flex items-center gap-1 mt-1">
                <Plus className="w-3 h-3"/> Ajouter une expérience
            </button>
        </div>
    );
}

/* ─── Education editor ────────────────────────────────────── */
function EducationEditor({ education, onChange }) {
    const update = (i,f,v) => { const n=[...education]; n[i]={...n[i],[f]:v}; onChange(n); };
    const add    = () => onChange([...education,{year:'',school:'',degree:''}]);
    const remove = i  => onChange(education.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {education.map((edu,i) => (
                <div key={i} className="grid grid-cols-[80px_1fr_1fr_auto] gap-2 items-center">
                    <input value={edu.year}   onChange={e=>update(i,'year',e.target.value)}   placeholder="Année"   style={inputStyle} />
                    <input value={edu.school} onChange={e=>update(i,'school',e.target.value)} placeholder="École"   style={inputStyle} />
                    <input value={edu.degree} onChange={e=>update(i,'degree',e.target.value)} placeholder="Diplôme" style={inputStyle} />
                    <button onClick={()=>remove(i)} style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash2 className="w-3.5 h-3.5"/>
                    </button>
                </div>
            ))}
            <button onClick={add}
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                className="flex items-center gap-1 mt-1">
                <Plus className="w-3 h-3"/> Ajouter
            </button>
        </div>
    );
}

/* ─── Languages editor ────────────────────────────────────── */
function LanguagesEditor({ languages, onChange }) {
    const update = (i,f,v) => { const n=[...languages]; n[i]={...n[i],[f]:f==='percent'?Number(v):v}; onChange(n); };
    const add    = () => onChange([...languages,{name:'',level:'',percent:80}]);
    const remove = i  => onChange(languages.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {languages.map((lang,i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input value={lang.name}  onChange={e=>update(i,'name',e.target.value)}  placeholder="Langue"         style={{ ...inputStyle, flex: 1 }} />
                    <input value={lang.level} onChange={e=>update(i,'level',e.target.value)} placeholder="Natif / Courant" style={{ ...inputStyle, flex: 1 }} />
                    <input type="number" min={0} max={100} value={lang.percent} onChange={e=>update(i,'percent',e.target.value)}
                        style={{ ...inputStyle, width: 64, textAlign: 'center' }} />
                    <button onClick={()=>remove(i)} style={{ color: TERRA, background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash2 className="w-3.5 h-3.5"/>
                    </button>
                </div>
            ))}
            <button onClick={add}
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 10, color: TERRA, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                className="flex items-center gap-1 mt-1">
                <Plus className="w-3 h-3"/> Ajouter
            </button>
        </div>
    );
}

/* ─── Member editor ─────────────────────────────────────────── */
function MemberEditor({ member }) {
    const [form, setForm] = useState({
        ...member,
        soft_skills: Array.isArray(member.soft_skills) ? member.soft_skills.join(', ') : '',
        interests:   Array.isArray(member.interests)   ? member.interests.join(', ')   : '',
        skills:      member.skills     ?? [],
        experience:  member.experience ?? [],
        education:   member.education  ?? [],
        languages:   member.languages  ?? [],
    });
    const [saving, setSaving] = useState(false);
    const [saved,  setSaved]  = useState(false);
    const [tab,    setTab]    = useState('info');

    const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));
    const handleChange = e => set(e.target.name, e.target.value);

    const save = () => {
        setSaving(true);
        const data = {
            ...form,
            soft_skills: typeof form.soft_skills === 'string'
                ? form.soft_skills.split(',').map(s=>s.trim()).filter(Boolean)
                : form.soft_skills,
            interests: typeof form.interests === 'string'
                ? form.interests.split(',').map(s=>s.trim()).filter(Boolean)
                : form.interests,
        };
        router.patch(`/dashboard/team/${member.id}`, data, {
            onSuccess: () => { setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2500); },
            onError:   () => setSaving(false),
        });
    };

    const tabs = [
        { id:'info',       label:'Infos'        },
        { id:'skills',     label:'Compétences'  },
        { id:'experience', label:'Expériences'  },
        { id:'education',  label:'Formations'   },
        { id:'languages',  label:'Langues'      },
    ];

    return (
        <div className="paper-card" style={{ background: CARD, borderRadius: 12, border: `1px solid ${INK3}`, borderLeft: `4px solid ${TERRA}`, boxShadow: '0 2px 12px rgba(30,14,4,0.08)', overflow: 'hidden' }}>
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 border-b" style={{ borderColor: INK3 }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: TERRA, color: '#FBF5E6', fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 14 }}>
                    {member.initials}
                </div>
                <div className="flex-1">
                    <h2 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 14, color: INK }}>
                        {member.name}
                    </h2>
                    <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 11, color: INK2, marginTop: 2 }}>
                        {member.role}
                    </p>
                </div>

                <button onClick={save} disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all duration-300 disabled:opacity-50"
                    style={saved
                        ? { fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, color: '#16a34a', border: '1px solid rgba(22,163,74,0.3)', background: 'rgba(22,163,74,0.06)' }
                        : { fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, color: '#FFFFFF', border: 'none', background: TERRA, cursor: 'pointer' }
                    }>
                    {saved ? <><CheckCircle className="w-4 h-4"/> Sauvegardé</> : <><Save className="w-4 h-4"/> Enregistrer</>}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b overflow-x-auto" style={{ borderColor: INK3 }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className="px-4 py-2.5 whitespace-nowrap transition-colors"
                        style={tab === t.id
                            ? { fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 11, color: TERRA, borderBottom: `2px solid ${TERRA}`, textTransform: 'uppercase', letterSpacing: '0.1em' }
                            : { fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 11, color: INK2, textTransform: 'uppercase', letterSpacing: '0.1em' }
                        }>{t.label}</button>
                ))}
            </div>

            {/* Content */}
            <div className="p-6">
                {tab === 'info' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div><label style={labelStyle}>Nom complet</label><input name="name" value={form.name} onChange={handleChange} style={inputStyle} /></div>
                        <div><label style={labelStyle}>Poste / Rôle</label><input name="role" value={form.role} onChange={handleChange} style={inputStyle} /></div>
                        <div><label style={labelStyle}>Initiales</label><input name="initials" value={form.initials} onChange={handleChange} style={inputStyle} /></div>
                        <div><label style={labelStyle}>Localisation</label><input name="location" value={form.location ?? ''} onChange={handleChange} style={inputStyle} /></div>
                        <div><label style={labelStyle}>Téléphone</label><input name="phone" value={form.phone ?? ''} onChange={handleChange} style={inputStyle} /></div>
                        <div><label style={labelStyle}>Email</label><input name="email" value={form.email ?? ''} onChange={handleChange} style={inputStyle} /></div>
                        <div>
                            <label style={labelStyle}>Thème</label>
                            <select name="theme" value={form.theme} onChange={handleChange} style={inputStyle}>
                                {THEMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label style={labelStyle}>Titre spécial</label>
                            <input name="shadow_title" value={form.shadow_title ?? ''} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div className="col-span-2">
                            <label style={labelStyle}>Résumé / À propos</label>
                            <textarea name="summary" rows={4} value={form.summary ?? ''} onChange={handleChange}
                                style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>
                        <div className="col-span-2">
                            <label style={labelStyle}>Soft skills (virgules)</label>
                            <input name="soft_skills" value={form.soft_skills} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div className="col-span-2">
                            <label style={labelStyle}>Centres d'intérêt (virgules)</label>
                            <input name="interests" value={form.interests} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>
                )}

                {tab === 'skills' && (
                    <>
                        <SectionTitle>Compétences — Nom · Catégorie · Niveau %</SectionTitle>
                        <SkillsEditor skills={form.skills} onChange={val=>set('skills',val)} />
                    </>
                )}

                {tab === 'experience' && (
                    <>
                        <SectionTitle>Expériences professionnelles</SectionTitle>
                        <ExperienceEditor experience={form.experience} onChange={val=>set('experience',val)} />
                    </>
                )}

                {tab === 'education' && (
                    <>
                        <SectionTitle>Formations — Année · École · Diplôme</SectionTitle>
                        <EducationEditor education={form.education} onChange={val=>set('education',val)} />
                    </>
                )}

                {tab === 'languages' && (
                    <>
                        <SectionTitle>Langues — Langue · Niveau · %</SectionTitle>
                        <LanguagesEditor languages={form.languages} onChange={val=>set('languages',val)} />
                    </>
                )}
            </div>
        </div>
    );
}

const defaultNewMember = { slug:'', name:'', role:'', rank:'A', initials:'', theme:'dune', shadow_title:'' };

/* ─── Add member form ─────────────────────────────────────── */
function AddMemberForm({ onClose }) {
    const [form, setForm] = useState(defaultNewMember);
    const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const submit = e => {
        e.preventDefault();
        router.post('/dashboard/team', form, { onSuccess: onClose });
    };

    return (
        <div className="paper-card" style={{ background: CARD, borderRadius: 12, border: `1px solid ${INK3}`, borderLeft: `4px solid ${TERRA}`, padding: 24, marginBottom: 24 }}>
            <h3 className="flex items-center gap-2 mb-4"
                style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 14, color: INK }}>
                <Plus className="w-4 h-4" style={{ color: TERRA }} /> Nouveau membre
            </h3>
            <form onSubmit={submit} className="grid grid-cols-2 gap-3">
                <div><label style={labelStyle}>Slug (identifiant unique)</label><input name="slug" value={form.slug} onChange={set} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Nom complet</label><input name="name" value={form.name} onChange={set} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Poste / Rôle</label><input name="role" value={form.role} onChange={set} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Initiales</label><input name="initials" value={form.initials} onChange={set} style={inputStyle} /></div>
                <div>
                    <label style={labelStyle}>Thème</label>
                    <select name="theme" value={form.theme} onChange={set} style={inputStyle}>
                        {THEMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <label style={labelStyle}>Titre / Spécialité</label>
                    <input name="shadow_title" value={form.shadow_title} onChange={set} style={inputStyle} />
                </div>
                <div className="col-span-2 flex gap-3 justify-end mt-2">
                    <button type="button" onClick={onClose}
                        style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 12, color: INK2, background: 'transparent', border: `1px solid ${INK3}`, borderRadius: 8, padding: '8px 18px', cursor: 'pointer' }}>
                        Annuler
                    </button>
                    <button type="submit"
                        style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 600, fontSize: 12, color: '#FFFFFF', background: TERRA, border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer' }}>
                        Créer
                    </button>
                </div>
            </form>
        </div>
    );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function DashboardTeam({ admin, member }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen flex relative overflow-hidden" style={{ background: BG }}>
            <SLSystemBG />
            <Sidebar admin={admin} collapsed={collapsed} />

            <main className="relative z-10 flex-1 overflow-auto flex flex-col">
                <TopBar admin={admin} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
                <div className="p-4 md:p-8 flex-1">
                <div className="mb-8">
                    <div style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 400, fontSize: 11, color: TERRA, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 4 }}>
                        Équipe
                    </div>
                    <h1 style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 700, fontSize: 24, color: INK }}>
                        Mon CV
                    </h1>
                    <p style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: 12, color: INK2, marginTop: 4 }}>
                        Votre profil public sur korilab.dev
                    </p>
                </div>

                <SysDivider label="Profil" />

                {!member ? (
                    <div className="text-center py-16" style={{ fontFamily: "'Century Gothic', 'Trebuchet MS', sans-serif", fontSize: 13, color: INK2 }}>
                        Aucun profil associé à ce compte.
                    </div>
                ) : (
                <div className="space-y-6">
                    <MemberEditor member={member} />
                </div>
                )}
                </div>
            </main>
            <StatusBar admin={admin} />
        </div>
    );
}
