import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

const C  = '#00cfff';
const CG = 'rgba(0,207,255,0.6)';

/* ── Cauri logo ─────────────────────────────────────────── */
function CauriLogo() {
  return (
    <motion.div className="relative flex items-center justify-center" style={{width:28,height:40}}>
      <motion.div className="absolute inset-0"
        animate={{opacity:[0.1,0.4,0.1]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
        style={{background:`radial-gradient(ellipse,${C}50 0%,transparent 70%)`,filter:'blur(6px)'}}/>
      <motion.svg width="28" height="40" viewBox="0 0 60 84" fill="none"
        animate={{filter:[`drop-shadow(0 0 3px ${C}40)`,`drop-shadow(0 0 8px ${C}90)`,`drop-shadow(0 0 3px ${C}40)`]}}
        transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}>
        <motion.ellipse cx="30" cy="42" rx="21" ry="30" fill={C+'0a'} stroke={C} strokeWidth="1.5"
          animate={{strokeOpacity:[0.5,0.9,0.5]}} transition={{duration:2.5,repeat:Infinity,ease:'easeInOut'}}/>
        <motion.path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
          stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{opacity:[0.6,1,0.6]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}/>
        <line x1="17" y1="24" x2="24" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        <line x1="16" y1="29" x2="23" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        <path d="M13,35 L20,40 L13,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <path d="M17,35 L24,40 L17,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <circle cx="11" cy="42" r="2" fill={C} opacity="0.7"/>
        <path d="M47,35 L40,40 L47,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <path d="M43,35 L36,40 L43,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <circle cx="49" cy="42" r="2" fill={C} opacity="0.7"/>
        <path d="M47,47 L40,52 L47,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <path d="M43,47 L36,52 L43,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <path d="M13,47 L20,52 L13,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
        <path d="M17,47 L24,52 L17,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
      </motion.svg>
    </motion.div>
  );
}

const nav = [
  { href:'/dashboard',           icon:LayoutDashboard, label:'Vue d\'ensemble', sub:'Tableau central'    },
  { href:'/dashboard/portfolio', icon:Briefcase,       label:'Portfolio',       sub:'Réalisations'       },
  { href:'/dashboard/services',  icon:Wrench,          label:'Services',        sub:'Offres & capacités' },
  { href:'/dashboard/team',      icon:Users,           label:'Équipe / CV',     sub:'Profils chasseurs'  },
  { href:'/dashboard/site',      icon:Globe,           label:'Paramètres',      sub:'Config. système'    },
  { href:'/dashboard/messages',  icon:MessageSquare,   label:'Messages',        sub:'Boîte de réception' },
];

const RANK_C = { S:'#D4AF37', A:'#00cfff', B:'#a855f7', C:'#22c55e' };

export default function Sidebar({ admin }) {
  const { url } = usePage();
  const logout = () => router.post('/logout');
  const rc = RANK_C[admin?.rank] ?? C;
  const [open, setOpen] = useState(false);

  const Content = () => (
    <aside className="w-60 min-h-screen flex flex-col relative"
      style={{ background:'rgba(3,8,24,0.97)', borderRight:'1px solid rgba(0,207,255,0.08)', backdropFilter:'blur(20px)' }}>

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{background:`linear-gradient(to right,transparent,${C}40,transparent)`}}/>

      {/* Logo */}
      <div className="p-5 border-b" style={{borderColor:'rgba(0,207,255,0.07)'}}>
        <div className="flex items-center gap-3 mb-4">
          <CauriLogo />
          <div>
            <motion.div className="text-sm font-black tracking-wider text-white"
              style={{textShadow:`0 0 20px ${CG}`}}
              animate={{textShadow:[`0 0 10px rgba(0,207,255,0.3)`,`0 0 22px rgba(0,207,255,0.65)`,`0 0 10px rgba(0,207,255,0.3)`]}}
              transition={{duration:3.5,repeat:Infinity,ease:'easeInOut'}}>
              KoriLab
            </motion.div>
            <div className="text-[9px] font-mono uppercase tracking-[0.3em]" style={{color:`${C}45`}}>System Panel</div>
          </div>
        </div>

        {/* Hunter card */}
        <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          className="rounded-lg p-3 flex items-center gap-2.5"
          style={{background:'rgba(0,207,255,0.04)',border:'1px solid rgba(0,207,255,0.10)'}}>
          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border"
            style={{borderColor:rc+'60',background:rc+'0d',boxShadow:`0 0 10px ${rc}30`}}>
            <span className="text-sm font-black" style={{color:rc,textShadow:`0 0 10px ${rc}`}}>{admin?.rank}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{admin?.name}</div>
            <div className="text-[8px] font-mono uppercase tracking-widest text-white/25">Authentifié</div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:C,boxShadow:`0 0 6px 2px ${CG}`}}/>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-[8px] font-mono uppercase tracking-[0.35em] px-3 py-2 text-white/15">Navigation</p>
        {nav.map((item,i) => {
          const active = url.startsWith(item.href) && (item.href !== '/dashboard' || url === '/dashboard');
          return (
            <motion.div key={item.href} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.08+i*0.04}}>
              <Link href={item.href}
                className="group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200"
                style={active
                  ? {background:'rgba(0,207,255,0.08)',borderLeft:`2px solid ${C}`,paddingLeft:'10px',color:C,boxShadow:`inset 0 0 20px rgba(0,207,255,0.04)`}
                  : {borderLeft:'2px solid transparent',paddingLeft:'10px',color:'rgba(255,255,255,0.3)'}
                }>
                <item.icon className="w-4 h-4 flex-shrink-0 transition-colors"
                  style={active?{color:C}:{color:'rgba(255,255,255,0.2)'}}/>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium leading-tight" style={active?{color:C,textShadow:`0 0 8px ${CG}`}:{}}>{item.label}</div>
                  <div className="text-[8px] font-mono truncate text-white/15">{item.sub}</div>
                </div>
                {active && <div className="w-1 h-1 rounded-full" style={{background:C,boxShadow:`0 0 4px ${CG}`}}/>}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t" style={{borderColor:'rgba(0,207,255,0.06)'}}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono text-white/20 hover:text-red-400/70 transition-all duration-200"
          style={{border:'1px solid transparent'}}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(248,113,113,0.2)'; e.currentTarget.style.background='rgba(248,113,113,0.04)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor='transparent'; e.currentTarget.style.background='transparent'; }}>
          <LogOut className="w-3.5 h-3.5"/>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:flex"><Content /></div>

      <button onClick={()=>setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg"
        style={{border:`1px solid rgba(0,207,255,0.25)`,background:'rgba(3,8,24,0.95)',color:C}}>
        <Menu size={18}/>
      </button>

      <AnimatePresence>
        {open&&(
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={()=>setOpen(false)} className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"/>
            <motion.div initial={{x:-260}} animate={{x:0}} exit={{x:-260}}
              transition={{type:'spring',stiffness:300,damping:30}}
              className="md:hidden fixed top-0 left-0 z-50 h-full">
              <div className="relative">
                <Content/>
                <button onClick={()=>setOpen(false)}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-md z-20 text-white/40 hover:text-white/70"
                  style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(3,8,24,0.9)'}}>
                  <X size={14}/>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
