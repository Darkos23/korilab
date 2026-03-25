import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Design tokens ─────────────────────────────────────── */
const C  = '#00cfff';               // accent cyan
const CG = 'rgba(0,207,255,0.6)';  // glow
const CS = 'rgba(0,207,255,0.12)'; // soft fill

const glass = {
  background: 'rgba(10,30,70,0.85)',
  backdropFilter: 'blur(20px)',
  border: `1px solid rgba(0,207,255,0.28)`,
  boxShadow: `0 0 30px rgba(0,207,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)`,
};

/* ─── SL System Background (full immersive) ─────────────── */
const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];
const RUNE_POS = RUNES.map((r,i)=>({
  char: r,
  left: `${2+(i*4.1)%90}%`,
  top:  `${2+(i*7.7)%88}%`,
  size: 12+(i%6)*4,
  delay: i*0.22,
  dur:   3+(i%6),
  color: i%3===0 ? 'rgba(129,140,248,0.35)' : i%3===1 ? 'rgba(0,207,255,0.3)' : 'rgba(167,139,250,0.28)',
}));

function SLParticles() {
  const ref = useRef(null);
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext('2d'); let raf;
    const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;};
    resize(); window.addEventListener('resize',resize);
    const pts = Array.from({length:80},()=>({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: 0.4+Math.random()*1.8,
      vx:(Math.random()-.5)*.18,
      vy:-(0.06+Math.random()*.22),
      a: 0.07+Math.random()*.38,
      hue: Math.random()>.55 ? 260 : 190,
    }));
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.y<-6){p.y=canvas.height+6;p.x=Math.random()*canvas.width;}
        if(p.x<-6) p.x=canvas.width+6;
        if(p.x>canvas.width+6) p.x=-6;
        ctx.save();
        ctx.globalAlpha=p.a;
        ctx.shadowBlur=12; ctx.shadowColor=`hsl(${p.hue},100%,70%)`;
        ctx.fillStyle=`hsl(${p.hue},100%,75%)`;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" style={{width:'100%',height:'100%'}}/>;
}

export function SLSystemBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ── Base sombre ── */}
      <div className="absolute inset-0" style={{background:'#010812'}}/>

      {/* ── Grille diamant ── */}
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(45deg,rgba(0,207,255,0.07) 1px,transparent 1px),linear-gradient(-45deg,rgba(0,207,255,0.07) 1px,transparent 1px)`,
        backgroundSize:'52px 52px',
      }}/>
      <div className="absolute inset-0" style={{
        backgroundImage:`linear-gradient(45deg,rgba(0,207,255,0.03) 1px,transparent 1px),linear-gradient(-45deg,rgba(0,207,255,0.03) 1px,transparent 1px)`,
        backgroundSize:'16px 16px',
      }}/>

      {/* ── Portail central — mega glow ── */}
      <motion.div className="absolute rounded-full" style={{
        width:'clamp(500px,70vw,1000px)', height:'clamp(500px,70vw,1000px)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        background:'radial-gradient(circle,rgba(0,207,255,0.1) 0%,rgba(99,102,241,0.07) 30%,rgba(129,140,248,0.03) 55%,transparent 70%)',
        filter:'blur(80px)',
      }}
        animate={{scale:[1,1.15,1],opacity:[0.6,1,0.6]}}
        transition={{duration:10,repeat:Infinity,ease:'easeInOut'}}
      />

      {/* ── Ondes d'énergie ── */}
      {[0,1,2].map(i=>(
        <motion.div key={i} className="absolute rounded-full" style={{
          width:'clamp(200px,35vw,450px)', height:'clamp(200px,35vw,450px)',
          top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          border:`1px solid rgba(0,207,255,${0.15-i*0.04})`,
        }}
          animate={{scale:[1,2.5],opacity:[0.6,0]}}
          transition={{duration:4,repeat:Infinity,ease:'easeOut',delay:i*1.33}}
        />
      ))}

      {/* ── Anneau externe CW ── */}
      <motion.div className="absolute rounded-full" style={{
        width:'clamp(340px,56vw,680px)', height:'clamp(340px,56vw,680px)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        border:'1.5px solid rgba(0,207,255,0.12)',
        boxShadow:'0 0 20px rgba(0,207,255,0.05) inset',
      }}
        animate={{rotate:360}}
        transition={{duration:50,repeat:Infinity,ease:'linear'}}
      >
        {[0,60,120,180,240,300].map((deg,i)=>(
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width:i%2===0?5:3, height:i%2===0?5:3,
              top:'50%', left:'50%',
              transform:`rotate(${deg}deg) translateY(calc(-50% - clamp(170px,28vw,340px))) translate(-50%,-50%)`,
              background:i%2===0?C:'rgba(129,140,248,0.9)',
              boxShadow:i%2===0?`0 0 12px 4px ${CG}`:'0 0 10px 3px rgba(129,140,248,0.7)',
            }}
            animate={{opacity:[0.3,1,0.3]}}
            transition={{duration:2.2,repeat:Infinity,delay:i*0.36}}
          />
        ))}
      </motion.div>

      {/* ── Anneau intermédiaire CCW ── */}
      <motion.div className="absolute rounded-full" style={{
        width:'clamp(220px,36vw,460px)', height:'clamp(220px,36vw,460px)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        border:'1.5px solid rgba(129,140,248,0.1)',
      }}
        animate={{rotate:-360}}
        transition={{duration:35,repeat:Infinity,ease:'linear'}}
      >
        {[40,130,220,310].map((deg,i)=>(
          <motion.div key={i} className="absolute rounded-full"
            style={{
              width:4, height:4, top:'50%', left:'50%',
              transform:`rotate(${deg}deg) translateY(calc(-50% - clamp(110px,18vw,230px))) translate(-50%,-50%)`,
              background:'radial-gradient(circle,#818cf8,#00cfff)',
              boxShadow:'0 0 14px 5px rgba(129,140,248,0.85)',
            }}
            animate={{opacity:[0.2,1,0.2]}}
            transition={{duration:3,repeat:Infinity,delay:i*0.7}}
          />
        ))}
      </motion.div>

      {/* ── Anneau interne pulse ── */}
      <motion.div className="absolute rounded-full" style={{
        width:'clamp(110px,17vw,220px)', height:'clamp(110px,17vw,220px)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        border:'1px solid rgba(0,207,255,0.2)',
        boxShadow:'0 0 30px rgba(0,207,255,0.08) inset',
      }}
        animate={{scale:[1,1.1,1],opacity:[0.5,1,0.5]}}
        transition={{duration:4.5,repeat:Infinity,ease:'easeInOut'}}
      />

      {/* ── Orbes d'énergie driftantes ── */}
      {[
        {w:450,h:450,x:'0%',  y:'0%',  dur:14,dx:40, dy:25, c:C,          op:0.07},
        {w:350,h:350,x:'65%', y:'0%',  dur:17,dx:-30,dy:20, c:'#818cf8',  op:0.06},
        {w:400,h:400,x:'45%', y:'55%', dur:13,dx:25, dy:-35,c:C,          op:0.06},
        {w:250,h:250,x:'10%', y:'60%', dur:20,dx:-20,dy:30, c:'#a78bfa',  op:0.05},
      ].map((o,i)=>(
        <motion.div key={i} className="absolute rounded-full"
          style={{width:o.w,height:o.h,left:o.x,top:o.y,background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,opacity:o.op,filter:'blur(80px)'}}
          animate={{x:[0,o.dx,0],y:[0,o.dy,0],scale:[1,1.2,1]}}
          transition={{duration:o.dur,repeat:Infinity,ease:'easeInOut'}}
        />
      ))}

      {/* ── Runes grandes et visibles ── */}
      {RUNE_POS.map(({char,left,top,size,delay,dur,color},i)=>(
        <motion.span key={i} className="absolute font-mono select-none"
          style={{left,top,fontSize:size,color,textShadow:`0 0 12px ${color}`}}
          animate={{opacity:[0.05,0.45,0.05],y:[0,-22,0]}}
          transition={{duration:dur,repeat:Infinity,ease:'easeInOut',delay}}
        >
          {char}
        </motion.span>
      ))}

      {/* ── Particules canvas ── */}
      <SLParticles/>

      {/* ── Scanlines ── */}
      <div className="absolute inset-0" style={{
        backgroundImage:'repeating-linear-gradient(0deg,rgba(0,207,255,0.015),rgba(0,207,255,0.015) 1px,transparent 1px,transparent 4px)',
      }}/>

      {/* ── Vignette forte ── */}
      <div className="absolute inset-0" style={{
        background:'radial-gradient(ellipse 80% 80% at 50% 50%,transparent 35%,rgba(1,8,18,0.92) 100%)',
      }}/>

      {/* ── Coins UI System ── */}
      {[
        {top:16,left:16,  bT:true, bL:true },
        {top:16,right:16, bT:true, bR:true },
        {bottom:16,left:16,  bB:true, bL:true },
        {bottom:16,right:16, bB:true, bR:true },
      ].map((c,i)=>(
        <motion.div key={i} className="absolute"
          style={{
            top:c.top,right:c.right,bottom:c.bottom,left:c.left,
            width:32,height:32,
            borderTopWidth:   c.bT?2:0, borderBottomWidth:c.bB?2:0,
            borderLeftWidth:  c.bL?2:0, borderRightWidth: c.bR?2:0,
            borderStyle:'solid', borderColor:'rgba(0,207,255,0.4)',
          }}
          animate={{opacity:[0.4,1,0.4]}}
          transition={{duration:3,repeat:Infinity,delay:i*0.6}}
        />
      ))}

      {/* ── Label système ── */}
      <motion.div
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.5em] whitespace-nowrap"
        style={{color:'rgba(0,207,255,0.25)'}}
        animate={{opacity:[0.15,0.6,0.15]}}
        transition={{duration:5,repeat:Infinity}}
      >
        ◆ Solo Leveling System — Interface Active ◆
      </motion.div>
    </div>
  );
}

/* ── Aliases pour compatibilité avec les pages existantes ── */
export function ParticleNetwork() { return null; }
export function SystemGrid()      { return null; }
export function SystemOrbs()      { return null; }
export function SLPortal()        { return null; }

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
