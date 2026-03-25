import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens ─────────────────────────────────────── */
const C  = '#00cfff';               // accent cyan
const CG = 'rgba(0,207,255,0.6)';  // glow
const CS = 'rgba(0,207,255,0.12)'; // soft fill

const glass = {
  background: 'rgba(8,20,50,0.75)',
  backdropFilter: 'blur(20px)',
  border: `1px solid rgba(0,207,255,0.14)`,
  boxShadow: `0 0 40px rgba(0,207,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)`,
};

/* ─── Particle Network ──────────────────────────────────── */
export function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const rand = (a, b) => Math.random() * (b - a) + a;
    class Dot {
      constructor() { this.reset(); }
      reset() { this.x=rand(0,canvas.width); this.y=rand(0,canvas.height); this.vx=rand(-0.2,0.2); this.vy=rand(-0.2,0.2); this.r=rand(0.6,1.4); this.op=rand(0.1,0.3); }
      move() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width)this.vx*=-1; if(this.y<0||this.y>canvas.height)this.vy*=-1; }
      draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(0,207,255,${this.op})`; ctx.fill(); }
    }
    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({length:35}, ()=>new Dot());
    const loop = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<dots.length;i++){
        dots[i].move(); dots[i].draw();
        for(let j=i+1;j<dots.length;j++){
          const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y, d=Math.sqrt(dx*dx+dy*dy);
          if(d<130){ctx.beginPath();ctx.moveTo(dots[i].x,dots[i].y);ctx.lineTo(dots[j].x,dots[j].y);ctx.strokeStyle=`rgba(0,207,255,${(1-d/130)*0.06})`;ctx.lineWidth=0.5;ctx.stroke();}
        }
      }
      animId=requestAnimationFrame(loop);
    };
    loop();
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize);};
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{opacity:0.5}} />;
}

/* ─── Grid ──────────────────────────────────────────────── */
export function SystemGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{
      backgroundImage: `linear-gradient(45deg,rgba(0,207,255,0.05) 1px,transparent 1px),linear-gradient(-45deg,rgba(0,207,255,0.05) 1px,transparent 1px)`,
      backgroundSize: '40px 40px',
    }}/>
  );
}

/* ─── Orbs ──────────────────────────────────────────────── */
export function SystemOrbs() {
  const orbs = [{w:400,h:400,x:'5%',y:'8%',dur:12,d:0,op:0.035},{w:250,h:250,x:'72%',y:'5%',dur:15,d:2,op:0.025},{w:300,h:300,x:'58%',y:'62%',dur:11,d:1,op:0.028}];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((o,i)=>(
        <motion.div key={i} className="absolute rounded-full"
          style={{width:o.w,height:o.h,left:o.x,top:o.y,background:`radial-gradient(circle,${C} 0%,transparent 70%)`,opacity:o.op,filter:'blur(70px)'}}
          animate={{y:[0,-20,0,15,0],x:[0,10,-6,3,0]}}
          transition={{duration:o.dur,delay:o.d,repeat:Infinity,ease:'easeInOut'}}
        />
      ))}
    </div>
  );
}

/* ─── Scanlines ─────────────────────────────────────────── */
export function Scanlines() {
  return <div className="pointer-events-none absolute inset-0 z-0" style={{backgroundImage:'repeating-linear-gradient(0deg,rgba(0,207,255,0.02),rgba(0,207,255,0.02) 1px,transparent 1px,transparent 4px)',opacity:1}}/>;
}

/* ─── System Window ─────────────────────────────────────── */
export function SysWin({ title, subtitle, children, className='', delay=0 }) {
  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay}}
      className={`relative rounded-lg overflow-hidden ${className}`} style={glass}>
      <Scanlines/>
      <div className="relative z-10 flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.05]" style={{background:'rgba(0,207,255,0.04)'}}>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{background:C,boxShadow:`0 0 6px 2px ${CG}`}}/>
          <div className="w-1.5 h-1.5 rounded-full bg-white/10"/>
          <div className="w-1.5 h-1.5 rounded-full bg-white/5"/>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/50">{title}</span>
        {subtitle&&<span className="text-[10px] font-mono text-white/20 ml-1">— {subtitle}</span>}
        <div className="ml-auto flex gap-1">{[...Array(3)].map((_,i)=><div key={i} className="w-3 h-px bg-white/10"/>)}</div>
      </div>
      <div className="relative z-10 p-5">{children}</div>
    </motion.div>
  );
}

/* ─── Stat Badge ────────────────────────────────────────── */
export function StatBadge({ label, value, icon:Icon, sub }) {
  return (
    <motion.div whileHover={{borderColor:'rgba(0,207,255,0.35)',boxShadow:'0 0 30px rgba(0,207,255,0.08)'}}
      className="relative rounded-lg p-5 overflow-hidden transition-all duration-300" style={glass}>
      <Scanlines/>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {Icon&&<Icon className="w-4 h-4 text-white/20"/>}
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:C,boxShadow:`0 0 6px 2px ${CG}`}}/>
        </div>
        <div className="text-3xl font-black text-white mb-1" style={{textShadow:'0 0 30px rgba(0,207,255,0.3)'}}>{value}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{label}</div>
        {sub&&<div className="text-[10px] text-white/15 mt-1">{sub}</div>}
      </div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-2xl" style={{background:CS}}/>
    </motion.div>
  );
}

/* ─── Notif ─────────────────────────────────────────────── */
export function SysNotif({ children }) {
  return (
    <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.2,duration:0.5}}
      className="rounded-lg px-4 py-3 flex items-center gap-3" style={{background:'rgba(0,207,255,0.05)',border:'1px solid rgba(0,207,255,0.12)'}}>
      <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{background:C,boxShadow:`0 0 6px 2px ${CG}`}}/>
      <p className="text-xs font-mono text-white/30 italic">{children}</p>
    </motion.div>
  );
}

/* ─── Inputs ────────────────────────────────────────────── */
const inputClass = "w-full rounded-md px-3 py-2 text-white text-sm outline-none transition-all font-mono placeholder-white/10";
const inputStyle = { background:'rgba(0,207,255,0.04)', border:'1px solid rgba(0,207,255,0.15)' };

export function SysInput({ label, ...props }) {
  const [f,setF]=useState(false);
  return (
    <div>
      {label&&<label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5 text-white/35">{label}</label>}
      <input className={inputClass} style={{...inputStyle,borderColor:f?`rgba(0,207,255,0.45)`:'rgba(0,207,255,0.15)',boxShadow:f?`0 0 12px rgba(0,207,255,0.08)`:undefined}}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)} {...props}/>
    </div>
  );
}

export function SysTextarea({ label, rows=3, ...props }) {
  const [f,setF]=useState(false);
  return (
    <div>
      {label&&<label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5 text-white/35">{label}</label>}
      <textarea rows={rows} className={`${inputClass} resize-none`} style={{...inputStyle,borderColor:f?'rgba(0,207,255,0.45)':'rgba(0,207,255,0.15)',boxShadow:f?'0 0 12px rgba(0,207,255,0.08)':undefined}}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)} {...props}/>
    </div>
  );
}

export function SysSelect({ label, options, ...props }) {
  return (
    <div>
      {label&&<label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5 text-white/35">{label}</label>}
      <select className={inputClass} style={{...inputStyle,background:'rgba(5,14,40,0.9)'}} {...props}>
        {options.map(o=><option key={o.value??o} value={o.value??o} className="bg-[#050e28]">{o.label??o}</option>)}
      </select>
    </div>
  );
}

/* ─── Button ────────────────────────────────────────────── */
export function SysBtn({ children, variant='primary', className='', ...props }) {
  const base = "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono transition-all duration-200 disabled:opacity-40 uppercase tracking-wider";
  const v = {
    primary: { style:{ border:`1px solid rgba(0,207,255,0.35)`, background:'rgba(0,207,255,0.08)', color:C, textShadow:`0 0 10px ${CG}` } },
    danger:  { style:{ border:'1px solid rgba(248,113,113,0.3)', background:'rgba(248,113,113,0.05)', color:'#fca5a5' } },
    ghost:   { style:{ border:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.02)', color:'rgba(255,255,255,0.35)' } },
  };
  return <button className={`${base} ${className}`} style={v[variant]?.style??{}} {...props}>{children}</button>;
}

/* ─── Rank Badge ────────────────────────────────────────── */
const RC = { S:'#D4AF37', A:'#00cfff', B:'#a855f7', C:'#22c55e', D:'#f59e0b', E:'#6b7280' };
export function RankBadge({ rank }) {
  const c = RC[rank]??C;
  return (
    <motion.span animate={{boxShadow:[`0 0 6px ${c}50`,`0 0 14px ${c}bb`,`0 0 6px ${c}50`]}}
      transition={{duration:2,repeat:Infinity,ease:'easeInOut'}}
      className="inline-flex items-center justify-center w-7 h-7 text-xs font-black rounded border uppercase"
      style={{color:c,borderColor:c+'50',background:c+'10',letterSpacing:'0.05em',textShadow:`0 0 10px ${c}`}}>
      {rank}
    </motion.span>
  );
}

/* ─── Status Bar ────────────────────────────────────────── */
export function StatusBar({ admin }) {
  const [t,setT]=useState(()=>new Date().toLocaleTimeString('fr-FR'));
  useEffect(()=>{ const i=setInterval(()=>setT(new Date().toLocaleTimeString('fr-FR')),1000); return()=>clearInterval(i); },[]);
  const rc = RC[admin?.rank]??C;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-5 gap-4"
      style={{height:26,borderTop:'1px solid rgba(0,207,255,0.08)',background:'rgba(3,7,22,0.95)',backdropFilter:'blur(12px)'}}>
      <div className="flex items-center gap-2">
        <motion.div className="w-1.5 h-1.5 rounded-full" style={{background:C}}
          animate={{opacity:[1,0.3,1],boxShadow:[`0 0 4px ${C}`,`0 0 8px ${C}`,`0 0 4px ${C}`]}}
          transition={{duration:1.8,repeat:Infinity}}/>
        <span className="text-[8px] font-mono uppercase tracking-[0.3em]" style={{color:`${C}70`}}>Online</span>
      </div>
      <span className="text-[8px] text-white/10">·</span>
      <span className="text-[8px] font-mono text-white/25 uppercase tracking-widest">{admin?.name??'—'}</span>
      <span className="text-[8px] text-white/10">·</span>
      <span className="text-[8px] font-mono uppercase tracking-widest" style={{color:rc+'cc',textShadow:`0 0 8px ${rc}60`}}>Rang {admin?.rank??'—'}</span>
      <div className="ml-auto">
        <span className="text-[8px] font-mono text-white/20 tabular-nums">{t}</span>
      </div>
    </div>
  );
}

/* ─── Divider ───────────────────────────────────────────── */
export function SysDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{background:`linear-gradient(to right,transparent,rgba(0,207,255,0.3))`}}/>
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/25">◆ {label} ◆</span>
      <div className="flex-1 h-px" style={{background:`linear-gradient(to left,transparent,rgba(0,207,255,0.3))`}}/>
    </div>
  );
}
