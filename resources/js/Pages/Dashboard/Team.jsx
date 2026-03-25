import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, Trash2, ChevronDown, ChevronUp, Save, CheckCircle } from 'lucide-react';
import Sidebar from '@/Components/dashboard/Sidebar';
import WhatsAppFloat from '@/Components/WhatsAppFloat';
import { SystemGrid, SystemOrbs, ParticleNetwork, SysWin, SysInput, SysTextarea, SysSelect, SysBtn, SysDivider, Scanlines, StatusBar } from '@/Components/dashboard/SystemLayout';

// ─── helpers ───────────────────────────────────────────────
const THEMES  = [
    { value:'shadow',        label:'Shadow Monarch (violet)'         },
    { value:'constellation', label:'Constellation du Monarque (indigo)' },
    { value:'real-madrid', label:'Real Madrid (or/marine)'   },
    { value:'gojo',        label:'Gojo Satoru (bleu infini)' },
    { value:'dune',        label:'Dune — Arrakis (sable)'    },
    { value:'itachi',      label:'Itachi Uchiha (cramoisi)'  },
    { value:'beast',       label:'Beast Monarch (ambre)'     },
    { value:'antares',     label:'Antares (rouge stellaire)' },
];
const RANKS   = ['S','A','B','C'];

const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#00a8ff]/10" />
        <span className="text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">◈ {children} ◈</span>
        <div className="flex-1 h-px bg-[#00a8ff]/10" />
    </div>
);

// ─── Skills editor ─────────────────────────────────────────
function SkillsEditor({ skills, onChange }) {
    const update = (i, field, val) => { const n=[...skills]; n[i]={...n[i],[field]:field==='level'?Number(val):val}; onChange(n); };
    const add    = () => onChange([...skills,{name:'',level:80,category:''}]);
    const remove = (i) => onChange(skills.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {skills.map((sk,i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input value={sk.name} onChange={e=>update(i,'name',e.target.value)} placeholder="Compétence"
                        className="flex-1 bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10" />
                    <input value={sk.category} onChange={e=>update(i,'category',e.target.value)} placeholder="Catégorie" style={{width:100}}
                        className="bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10" />
                    <input type="number" min={0} max={100} value={sk.level} onChange={e=>update(i,'level',e.target.value)} style={{width:60}}
                        className="bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-2 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 text-center" />
                    <span className="text-[9px] font-mono text-[#00a8ff]/30 w-6">{sk.level}%</span>
                    <button onClick={()=>remove(i)} className="text-red-400/30 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 text-[9px] font-mono text-[#00a8ff]/40 hover:text-[#00a8ff] transition-colors mt-1 uppercase tracking-widest">
                <Plus className="w-3 h-3"/> Ajouter
            </button>
        </div>
    );
}

// ─── Experience editor ─────────────────────────────────────
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
                <div key={i} className="border border-[#00a8ff]/10 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#00a8ff]/[0.03] cursor-pointer" onClick={()=>toggle(i)}>
                        <span className="flex-1 text-sm font-mono text-white/70 truncate">{exp.title||`Expérience ${i+1}`}</span>
                        <span className="text-[9px] font-mono text-[#00a8ff]/30">{exp.period}</span>
                        <button onClick={e=>{e.stopPropagation();remove(i);}} className="text-red-400/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5"/></button>
                        {open.includes(i)?<ChevronUp className="w-3.5 h-3.5 text-[#00a8ff]/30"/>:<ChevronDown className="w-3.5 h-3.5 text-[#00a8ff]/30"/>}
                    </div>
                    {open.includes(i) && (
                        <div className="p-3 space-y-2 border-t border-[#00a8ff]/10">
                            <div className="grid grid-cols-2 gap-2">
                                <SysInput placeholder="Période" value={exp.period}  onChange={e=>update(i,'period',e.target.value)} />
                                <SysInput placeholder="Entreprise" value={exp.company} onChange={e=>update(i,'company',e.target.value)} />
                            </div>
                            <SysInput placeholder="Poste / Titre" value={exp.title} onChange={e=>update(i,'title',e.target.value)} />
                            <p className="text-[9px] font-mono text-[#00a8ff]/30 uppercase tracking-widest mt-2">Missions :</p>
                            <div className="space-y-1.5">
                                {(exp.missions??[]).map((m,j) => (
                                    <div key={j} className="flex gap-2">
                                        <input value={m} onChange={e=>updM(i,j,e.target.value)}
                                            className="flex-1 bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10" />
                                        <button onClick={()=>removeM(i,j)} className="text-red-400/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5"/></button>
                                    </div>
                                ))}
                                <button onClick={()=>addM(i)} className="flex items-center gap-1 text-[9px] font-mono text-[#00a8ff]/40 hover:text-[#00a8ff] uppercase tracking-widest">
                                    <Plus className="w-3 h-3"/> Mission
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 text-[9px] font-mono text-[#00a8ff]/40 hover:text-[#00a8ff] uppercase tracking-widest mt-1">
                <Plus className="w-3 h-3"/> Ajouter une expérience
            </button>
        </div>
    );
}

// ─── Education editor ──────────────────────────────────────
function EducationEditor({ education, onChange }) {
    const update = (i,f,v) => { const n=[...education]; n[i]={...n[i],[f]:v}; onChange(n); };
    const add    = () => onChange([...education,{year:'',school:'',degree:''}]);
    const remove = i  => onChange(education.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {education.map((edu,i) => (
                <div key={i} className="grid grid-cols-[80px_1fr_1fr_auto] gap-2 items-center">
                    <input value={edu.year}   onChange={e=>update(i,'year',e.target.value)}   placeholder="Année"
                        className="bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10"/>
                    <input value={edu.school} onChange={e=>update(i,'school',e.target.value)} placeholder="École"
                        className="bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10"/>
                    <input value={edu.degree} onChange={e=>update(i,'degree',e.target.value)} placeholder="Diplôme"
                        className="bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10"/>
                    <button onClick={()=>remove(i)} className="text-red-400/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 text-[9px] font-mono text-[#00a8ff]/40 hover:text-[#00a8ff] uppercase tracking-widest mt-1">
                <Plus className="w-3 h-3"/> Ajouter
            </button>
        </div>
    );
}

// ─── Languages editor ──────────────────────────────────────
function LanguagesEditor({ languages, onChange }) {
    const update = (i,f,v) => { const n=[...languages]; n[i]={...n[i],[f]:f==='percent'?Number(v):v}; onChange(n); };
    const add    = () => onChange([...languages,{name:'',level:'',percent:80}]);
    const remove = i  => onChange(languages.filter((_,j)=>j!==i));
    return (
        <div className="space-y-2">
            {languages.map((lang,i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input value={lang.name}  onChange={e=>update(i,'name',e.target.value)}  placeholder="Langue"
                        className="flex-1 bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10"/>
                    <input value={lang.level} onChange={e=>update(i,'level',e.target.value)} placeholder="Natif / Courant..."
                        className="flex-1 bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 placeholder-white/10"/>
                    <input type="number" min={0} max={100} value={lang.percent} onChange={e=>update(i,'percent',e.target.value)} style={{width:60}}
                        className="bg-[#0d2235] border border-[#00a8ff]/15 rounded-lg px-2 py-1.5 text-white text-sm font-mono outline-none focus:border-[#00a8ff]/40 text-center"/>
                    <button onClick={()=>remove(i)} className="text-red-400/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
            ))}
            <button onClick={add} className="flex items-center gap-1 text-[9px] font-mono text-[#00a8ff]/40 hover:text-[#00a8ff] uppercase tracking-widest mt-1">
                <Plus className="w-3 h-3"/> Ajouter
            </button>
        </div>
    );
}

// ─── Member editor ─────────────────────────────────────────
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

    const ACCENT = {
        'real-madrid': '#D4AF37',
        'gojo':        '#38bdf8',
        'dune':        '#c9834a',
        'itachi':      '#be123c',
        'beast':       '#f59e0b',
        'antares':     '#ef4444',
        'shadow':      '#a855f7',
    }[member.theme] ?? '#00a8ff';

    const tabs = [
        { id:'info',       label:'📋 Infos'        },
        { id:'skills',     label:'⚡ Compétences'   },
        { id:'experience', label:'🏆 Expériences'   },
        { id:'education',  label:'🎓 Formations'    },
        { id:'languages',  label:'🌐 Langues'       },
    ];

    return (
        <div className="relative border rounded-xl overflow-hidden bg-[#020b18]/90 backdrop-blur-sm"
            style={{ borderColor: ACCENT + '25', boxShadow:`0 0 30px ${ACCENT}08` }}>
            <Scanlines />

            {/* ── Member header ── */}
            <div className="relative z-10 flex items-center gap-4 px-6 py-4 border-b"
                style={{ borderColor: ACCENT + '15', background: ACCENT + '05' }}>
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-2"
                    style={{
                        borderColor: ACCENT + '60',
                        background: 'rgba(0,0,0,0.6)',
                        boxShadow: `0 0 16px ${ACCENT}30`,
                        color: ACCENT,
                        textShadow: `0 0 10px ${ACCENT}`,
                    }}>
                    {member.initials}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: ACCENT, boxShadow:`0 0 6px 2px ${ACCENT}` }} />
                        <span className="text-[9px] font-mono uppercase tracking-[0.3em]" style={{ color: ACCENT + '50' }}>
                            {member.shadow_title ?? 'Fiche du chasseur'}
                        </span>
                    </div>
                    <h2 className="font-black text-white tracking-wide">{member.name}</h2>
                    <p className="text-[10px] font-mono" style={{ color: ACCENT + '60' }}>
                        {member.shadow_title} — Rang {member.rank}
                    </p>
                </div>

                {/* Save button */}
                <button onClick={save} disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border transition-all duration-300 disabled:opacity-50"
                    style={saved
                        ? { color:'#4ade80', borderColor:'#4ade8040', background:'rgba(74,222,128,0.08)', boxShadow:'0 0 15px rgba(74,222,128,0.1)' }
                        : { color: ACCENT, borderColor: ACCENT+'40', background: ACCENT+'10', boxShadow:`0 0 0px ${ACCENT}00` }
                    }>
                    {saved ? <><CheckCircle className="w-4 h-4"/> [ SAUVEGARDÉ ]</> : <><Save className="w-4 h-4"/> [ ENREGISTRER ]</>}
                </button>
            </div>

            {/* ── Tabs ── */}
            <div className="relative z-10 flex border-b overflow-x-auto" style={{ borderColor: ACCENT + '10' }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className="px-4 py-2.5 text-[9px] font-mono whitespace-nowrap uppercase tracking-widest transition-colors"
                        style={tab === t.id
                            ? { color: ACCENT, borderBottom: `2px solid ${ACCENT}` }
                            : { color: 'rgba(255,255,255,0.2)' }
                        }>{t.label}</button>
                ))}
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 p-6">

                {tab === 'info' && (
                    <div className="grid grid-cols-2 gap-4">
                        <SysInput label="Nom complet"   name="name"         value={form.name}            onChange={handleChange} />
                        <SysInput label="Poste / Rôle"  name="role"         value={form.role}            onChange={handleChange} />
                        <SysInput label="Initiales"     name="initials"     value={form.initials}        onChange={handleChange} />
                        <SysSelect label="Rang" options={RANKS} name="rank" value={form.rank}            onChange={handleChange} />
                        <SysInput label="Localisation"  name="location"     value={form.location ?? ''}  onChange={handleChange} />
                        <SysInput label="Téléphone"     name="phone"        value={form.phone ?? ''}     onChange={handleChange} />
                        <SysInput label="Email"         name="email"        value={form.email ?? ''}     onChange={handleChange} />
                        <SysSelect label="Thème" options={THEMES} name="theme" value={form.theme}        onChange={handleChange} />
                        <div className="col-span-2">
                            <SysInput label="Titre spécial" name="shadow_title" value={form.shadow_title ?? ''} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <SysTextarea label="Résumé / À propos" name="summary" rows={4} value={form.summary ?? ''} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <SysInput label="Soft skills (virgules)" name="soft_skills" value={form.soft_skills} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <SysInput label="Centres d'intérêt (virgules)" name="interests" value={form.interests} onChange={handleChange} />
                        </div>
                    </div>
                )}

                {tab === 'skills' && (
                    <>
                        <SectionTitle>Compétences techniques — Nom · Catégorie · Niveau %</SectionTitle>
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

const THEMES_VALUES = THEMES.map(t => t.value);
const defaultNewMember = { slug:'', name:'', role:'', rank:'A', initials:'', theme:'shadow', shadow_title:'' };

// ─── Add member form ────────────────────────────────────────
function AddMemberForm({ onClose }) {
    const [form, setForm] = useState(defaultNewMember);
    const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const submit = e => {
        e.preventDefault();
        router.post('/dashboard/team', form, { onSuccess: onClose });
    };

    return (
        <div className="relative border border-[#00a8ff]/20 rounded-xl bg-[#020b18]/90 p-6 mb-6">
            <Scanlines />
            <div className="relative z-10">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#00a8ff]" /> Nouveau membre
                </h3>
                <form onSubmit={submit} className="grid grid-cols-2 gap-3">
                    <SysInput label="Slug (identifiant unique)" name="slug" value={form.slug} onChange={set} required />
                    <SysInput label="Nom complet" name="name" value={form.name} onChange={set} required />
                    <SysInput label="Poste / Rôle" name="role" value={form.role} onChange={set} required />
                    <SysInput label="Initiales" name="initials" value={form.initials} onChange={set} />
                    <SysSelect label="Rang" options={RANKS} name="rank" value={form.rank} onChange={set} />
                    <SysSelect label="Thème" options={THEMES} name="theme" value={form.theme} onChange={set} />
                    <div className="col-span-2">
                        <SysInput label="Titre spécial" name="shadow_title" value={form.shadow_title} onChange={set} />
                    </div>
                    <div className="col-span-2 flex gap-3 justify-end mt-2">
                        <button type="button" onClick={onClose}
                            className="px-4 py-2 text-xs font-mono border border-white/10 text-white/30 rounded-lg hover:text-white/60 transition-colors">
                            Annuler
                        </button>
                        <SysBtn type="submit">[ CRÉER ]</SysBtn>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────
export default function DashboardTeam({ admin, members }) {
    const [showAdd, setShowAdd] = useState(false);

    const deleteMember = (id, name) => {
        if (confirm(`Supprimer "${name}" ? Cette action est irréversible.`)) {
            router.delete(`/dashboard/team/${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d2235] flex relative overflow-hidden">
            <SystemGrid />
            <SystemOrbs />
            <ParticleNetwork />
            <Sidebar admin={admin} />

            <main className="relative z-10 flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)]" />
                            <span className="text-[9px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">Dossiers chasseurs</span>
                        </div>
                        <h1 className="text-2xl font-black text-white" style={{ textShadow:'0 0 20px rgba(0,168,255,0.2)' }}>Équipe / CV</h1>
                        <p className="text-[#00a8ff]/30 text-xs font-mono mt-1">{members.length} membre{members.length !== 1 ? 's' : ''} enregistré{members.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={() => setShowAdd(p => !p)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border border-[#00a8ff]/30 text-[#00a8ff] bg-[#00a8ff]/[0.06] hover:bg-[#00a8ff]/[0.12] transition-all">
                        <Plus className="w-3.5 h-3.5" /> Ajouter
                    </button>
                </div>

                {showAdd && <AddMemberForm onClose={() => setShowAdd(false)} />}

                <SysDivider label="Chasseurs enregistrés" />

                <div className="space-y-6">
                    {members.map(member => (
                        <div key={member.id} className="relative">
                            <MemberEditor member={member} />
                            <button
                                onClick={() => deleteMember(member.id, member.name)}
                                className="absolute top-4 right-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono
                                    border border-transparent text-white/20 hover:border-red-500/30 hover:text-red-400/70
                                    hover:bg-red-500/[0.05] transition-all duration-200 z-20">
                                <Trash2 className="w-3 h-3" /> Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <WhatsAppFloat />
            <StatusBar admin={admin} />
        </div>
    );
}
