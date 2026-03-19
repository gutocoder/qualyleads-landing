import { useState, useEffect, useRef } from "react";
import logoSrc from "../logo.png";

const ACCENT  = "#16a34a";
const BG      = "#ffffff";
const SURFACE = "#f9fafb";
const SURFACE2= "#f3f4f6";
const BORDER  = "#e5e7eb";
const TEXT    = "#111827";
const MUTED   = "#6b7280";
const MUTED2  = "#9ca3af";

const GYM_CONVERSATION = [
  { role:"ai",   text:"Hey Sarah 👋 It's Jordan from PeakFit. What's the main goal that brought you in today?", delay:400 },
  { role:"lead", text:"Hi! I want to lose weight and actually stick to it this time", delay:1800 },
  { role:"ai",   text:"Love that — consistency is exactly what we're built for. Most members hit their first milestone in 6 weeks. Want to see the gym first?", delay:3200 },
  { role:"lead", text:"Yeah that sounds good!", delay:5000 },
  { role:"ai",   text:"Free 45-min tour — zero commitment. Tuesday 6pm or Saturday 10am?", delay:6400 },
  { role:"lead", text:"Saturday morning works!", delay:8200 },
  { role:"ai",   text:"Saturday 10am is yours ✅ See you then Sarah!", delay:9600 },
];

const ROI_DATA = [
  { time:"10 sec",   rate:"391%", bookings:"+100%", highlight:true },
  { time:"1 min",    rate:"160%", bookings:"+36%",  highlight:false },
  { time:"5 min",    rate:"80%",  bookings:"+17%",  highlight:false },
  { time:"30 min",   rate:"62%",  bookings:"+8%",   highlight:false },
  { time:"1 hour",   rate:"36%",  bookings:"-12%",  highlight:false },
  { time:"24 hours", rate:"11%",  bookings:"-64%",  highlight:false },
];

const FEATURES = [
  { icon:"⚡", title:"10-second response",   body:"Qualy texts every lead the moment they submit. No delays, no missed windows." },
  { icon:"🧠", title:"Industry blueprints",  body:"Gyms, plumbers, coaches — each gets a tailored conversation designed to convert." },
  { icon:"📅", title:"Books appointments",   body:"Qualy doesn't just chat. It pushes toward a booking, tour, or call — every time." },
  { icon:"🔁", title:"Full memory",          body:"Every reply is saved. Qualy picks up exactly where the conversation left off." },
  { icon:"📊", title:"Live dashboard",       body:"See every lead, every message, every status in real time. No spreadsheets." },
  { icon:"🔌", title:"Plug-in ready",        body:"Connect your CRM, Zapier, or form tool in minutes. No code required." },
];

function PhoneDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning]       = useState(false);
  const [isTyping, setIsTyping]         = useState(false);
  const chatRef     = useRef(null);
  const timeoutsRef = useRef([]);

  function clearAll() { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = []; }

  function runDemo() {
    clearAll(); setVisibleCount(0); setIsRunning(true); setIsTyping(false);
    GYM_CONVERSATION.forEach((msg, i) => {
      const t1 = setTimeout(() => setIsTyping(true), msg.delay - 300);
      const t2 = setTimeout(() => {
        setIsTyping(false); setVisibleCount(i + 1);
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
        if (i === GYM_CONVERSATION.length - 1) setIsRunning(false);
      }, msg.delay);
      timeoutsRef.current.push(t1, t2);
    });
  }

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && visibleCount === 0) runDemo(); }, { threshold: 0.3 });
    const el = document.getElementById("phone-demo");
    if (el) obs.observe(el);
    return () => { obs.disconnect(); clearAll(); };
  }, []);

  return (
    <div id="phone-demo" style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ width:"min(300px, 90vw)", borderRadius:40, background:"#fff", border:"1.5px solid #e5e7eb", boxShadow:"0 24px 60px rgba(0,0,0,0.10)", overflow:"hidden" }}>
        <div style={{ background:"#fff", padding:"14px 24px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:TEXT, fontWeight:600 }}>9:41</span>
          <div style={{ width:80, height:24, borderRadius:20, background:"#111" }} />
          <div style={{ width:14, height:10, borderRadius:2, border:`1.5px solid ${MUTED2}`, position:"relative" }}>
            <div style={{ position:"absolute", inset:2, background:ACCENT, borderRadius:1 }} />
          </div>
        </div>
        <div style={{ background:SURFACE, padding:"10px 20px 12px", borderBottom:`1px solid ${BORDER}`, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>Q</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:TEXT }}>Qualy · PeakFit</div>
            <div style={{ fontSize:11, color:ACCENT, display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:ACCENT, display:"inline-block" }} /> Active now
            </div>
          </div>
        </div>
        <div ref={chatRef} style={{ height:320, overflowY:"auto", padding:"16px 12px", background:"#fff", display:"flex", flexDirection:"column", gap:8, scrollbarWidth:"none" }}>
          <div style={{ alignSelf:"center", fontSize:10, color:MUTED2, background:SURFACE2, border:`1px solid ${BORDER}`, padding:"4px 12px", borderRadius:20, marginBottom:4 }}>
            Sarah M. · Gym lead · just now
          </div>
          {GYM_CONVERSATION.slice(0, visibleCount).map((msg, i) => (
            <div key={i} style={{ display:"flex", justifyContent:msg.role==="ai"?"flex-start":"flex-end", animation:"fadeSlideUp 0.3s ease" }}>
              <div style={{ maxWidth:"82%", padding:"8px 12px", borderRadius:msg.role==="ai"?"4px 16px 16px 16px":"16px 4px 16px 16px", background:msg.role==="ai"?SURFACE2:ACCENT, color:msg.role==="ai"?TEXT:"#fff", fontSize:12, lineHeight:1.5, border:msg.role==="ai"?`1px solid ${BORDER}`:"none" }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display:"flex" }}>
              <div style={{ padding:"10px 14px", borderRadius:"4px 16px 16px 16px", background:SURFACE2, border:`1px solid ${BORDER}`, display:"flex", gap:4, alignItems:"center" }}>
                {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:MUTED2, animation:`typingDot 1.2s ${i*0.2}s infinite` }} />)}
              </div>
            </div>
          )}
          {!isRunning && visibleCount===GYM_CONVERSATION.length && (
            <div style={{ alignSelf:"center", fontSize:11, color:ACCENT, background:"rgba(22,163,74,0.08)", border:`1px solid rgba(22,163,74,0.2)`, padding:"4px 12px", borderRadius:20 }}>✓ Tour booked · 0:58 elapsed</div>
          )}
        </div>
        <div style={{ background:SURFACE, padding:"10px 12px 20px", borderTop:`1px solid ${BORDER}` }}>
          <div style={{ height:34, borderRadius:20, background:"#fff", border:`1px solid ${BORDER}`, display:"flex", alignItems:"center", padding:"0 12px" }}>
            <span style={{ fontSize:11, color:MUTED2 }}>Qualy is handling this…</span>
          </div>
        </div>
      </div>
      <button onClick={runDemo} disabled={isRunning} style={{ marginTop:20, padding:"10px 24px", borderRadius:24, border:`1px solid ${isRunning?BORDER:ACCENT}`, background:"transparent", color:isRunning?MUTED:ACCENT, fontSize:13, cursor:isRunning?"default":"pointer", fontFamily:"inherit" }}>
        {isRunning ? "Playing…" : "↺ Replay demo"}
      </button>
      <style>{`
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typingDot{0%,60%,100%{opacity:0.3;transform:scale(1)}30%{opacity:1;transform:scale(1.3)}}
      `}</style>
    </div>
  );
}

function PricingCard({ name, price, desc, who, features, missing, featured, onCta }) {
  return (
    <div style={{ background:"#fff", border:featured?`2px solid ${ACCENT}`:`1px solid ${BORDER}`, borderRadius:16, padding:28, position:"relative", boxShadow:featured?"0 8px 32px rgba(22,163,74,0.1)":"none" }}>
      {featured && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:ACCENT, color:"#fff", fontSize:11, fontWeight:600, padding:"3px 14px", borderRadius:20, whiteSpace:"nowrap" }}>MOST POPULAR</div>}
      <div style={{ fontSize:12, fontWeight:600, color:featured?ACCENT:MUTED, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>{name}</div>
      <div style={{ fontSize:38, fontWeight:700, color:TEXT, letterSpacing:"-0.03em", lineHeight:1, marginBottom:4 }}>{price}<span style={{ fontSize:15, fontWeight:400, color:MUTED }}>/mo</span></div>
      <div style={{ fontSize:13, color:MUTED, marginBottom:6 }}>{desc}</div>
      <div style={{ fontSize:12, color:MUTED2, marginBottom:20, fontStyle:"italic" }}>{who}</div>
      <button onClick={onCta} style={{ width:"100%", padding:"11px", marginBottom:24, fontSize:14, borderRadius:8, cursor:"pointer", fontFamily:"inherit", background:featured?ACCENT:"transparent", color:featured?"#fff":TEXT, border:featured?"none":`1px solid ${BORDER}`, fontWeight:featured?600:500 }}>
        {featured?"Start free trial →":"Start free trial"}
      </button>
      {features.map(f => (
        <div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, fontSize:13, color:TEXT }}>
          <span style={{ width:17, height:17, borderRadius:"50%", background:"rgba(22,163,74,0.1)", color:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>✓</span>{f}
        </div>
      ))}
      {(missing||[]).map(f => (
        <div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, fontSize:13, color:MUTED2 }}>
          <span style={{ width:17, height:17, borderRadius:"50%", background:SURFACE2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>–</span>{f}
        </div>
      ))}
    </div>
  );
}

export default function QualyLeadsLanding() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  return (
    <div style={{ background:BG, color:TEXT, minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;}
        .nav-link{color:${MUTED};font-size:14px;text-decoration:none;transition:color 0.2s;cursor:pointer;}
        .nav-link:hover{color:${TEXT};}
        .cta-primary{background:${ACCENT};color:#fff;border:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.2s;}
        .cta-primary:hover{background:#15803d;transform:translateY(-1px);}
        .cta-ghost{background:transparent;color:${TEXT};border:1px solid ${BORDER};padding:14px 32px;border-radius:8px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;transition:all 0.2s;}
        .cta-ghost:hover{border-color:#9ca3af;background:${SURFACE};}
        .feature-card{background:#fff;border:1px solid ${BORDER};border-radius:12px;padding:24px;transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s;}
        .feature-card:hover{border-color:#9ca3af;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.06);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.7s ease both;}
        .fade-up-1{animation-delay:0.1s;}.fade-up-2{animation-delay:0.25s;}.fade-up-3{animation-delay:0.4s;}.fade-up-4{animation-delay:0.55s;}
        @keyframes pulse-green{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,0.4)}50%{box-shadow:0 0 0 8px rgba(22,163,74,0)}}
        .pulse{animation:pulse-green 2s infinite;}

        /* ── Responsive ── */
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start;}
        .faq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
        .stats-row{display:flex;gap:32px;padding-top:32px;border-top:1px solid ${BORDER};}
        .industry-strip{display:flex;justify-content:center;gap:40px;flex-wrap:wrap;}
        .nav-desktop{display:flex;gap:32px;align-items:center;}
        .nav-mobile-btn{display:none;background:none;border:none;cursor:pointer;padding:4px;}
        .mobile-menu{display:none;}
        .footer-inner{display:flex;justify-content:space-between;align-items:center;}
        .cta-email-row{display:flex;gap:0;max-width:420px;margin:0 auto;border-radius:10px;overflow:hidden;border:1px solid ${BORDER};box-shadow:0 2px 8px rgba(0,0,0,0.06);}
        .section-pad{padding:100px 40px;}
        .section-pad-sm{padding:80px 40px;}
        .hero-pad{padding:80px 40px 60px;}

        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr;gap:48px;text-align:center;}
          .hero-grid .fade-up-2{order:1;}
          .hero-grid>div:first-child{order:2;}
          .features-grid{grid-template-columns:1fr;}
          .pricing-grid{grid-template-columns:1fr;}
          .faq-grid{grid-template-columns:1fr;}
          .stats-row{justify-content:center;gap:24px;}
          .industry-strip{gap:20px;}
          .nav-desktop{display:none;}
          .nav-mobile-btn{display:block;}
          .mobile-menu{display:flex;flex-direction:column;gap:0;background:#fff;border-top:1px solid ${BORDER};padding:8px 0;}
          .mobile-menu.hidden{display:none;}
          .mobile-menu-item{padding:14px 24px;font-size:15px;color:${TEXT};cursor:pointer;border-bottom:1px solid ${BORDER};}
          .mobile-menu-item:last-child{border-bottom:none;}
          .footer-inner{flex-direction:column;gap:16px;text-align:center;}
          .cta-email-row{flex-direction:column;border-radius:10px;}
          .cta-email-row input{border-radius:10px 10px 0 0!important;}
          .cta-email-row button{border-radius:0 0 10px 10px!important;width:100%;}
          .section-pad{padding:60px 20px;}
          .section-pad-sm{padding:60px 20px;}
          .hero-pad{padding:40px 20px;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ padding:"0 24px", height:88, display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
          <img src={logoSrc} alt="QualyLeads" style={{ height:72, width:"auto" }} />
          <div className="nav-desktop">
            <span className="nav-link" onClick={()=>scrollTo("features")}>Features</span>
            <span className="nav-link" onClick={()=>scrollTo("pricing")}>Pricing</span>
            <span className="nav-link" onClick={()=>scrollTo("phone-demo")}>Demo</span>
            <button className="cta-primary" style={{ padding:"8px 20px", fontSize:13 }} onClick={()=>scrollTo("pricing")}>Get early access</button>
          </div>
          <button className="nav-mobile-btn" onClick={()=>setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen
                ? <><line x1="4" y1="4" x2="18" y2="18" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/></>
                : <><line x1="3" y1="6" x2="19" y2="6" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/></>
              }
            </svg>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen?"":"hidden"}`}>
          <div className="mobile-menu-item" onClick={()=>scrollTo("features")}>Features</div>
          <div className="mobile-menu-item" onClick={()=>scrollTo("pricing")}>Pricing</div>
          <div className="mobile-menu-item" onClick={()=>scrollTo("phone-demo")}>Demo</div>
          <div style={{ padding:"12px 24px" }}>
            <button className="cta-primary" style={{ width:"100%", padding:"12px" }} onClick={()=>scrollTo("pricing")}>Get early access</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth:1200, margin:"0 auto" }} className="hero-pad">
        <div className="hero-grid">
          <div>
            <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:20, padding:"6px 14px", marginBottom:24 }}>
              <span className="pulse" style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, display:"inline-block" }} />
              <span style={{ fontSize:12, color:ACCENT, fontFamily:"'DM Mono',monospace", letterSpacing:"0.04em" }}>AI SALES SETTER FOR SMES & CREATORS</span>
            </div>
            <h1 className="fade-up fade-up-1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,60px)", lineHeight:1.08, letterSpacing:"-0.02em", color:TEXT, marginBottom:16 }}>
              Stop losing leads<br />
              <span style={{ fontStyle:"italic", color:ACCENT }}>to your voicemail.</span>
            </h1>
            <p className="fade-up fade-up-2" style={{ fontSize:17, color:MUTED, lineHeight:1.65, maxWidth:460, marginBottom:32 }}>
              Qualy texts every lead within 10 seconds — qualifying, booking, and converting them while you run your business.
            </p>
            <div className="fade-up fade-up-3" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40, justifyContent:"inherit" }}>
              <button className="cta-primary" onClick={()=>scrollTo("pricing")}>Start free trial →</button>
              <button className="cta-ghost" onClick={()=>scrollTo("phone-demo")}>See it in action</button>
            </div>
            <div className="fade-up fade-up-4 stats-row">
              {[{num:"10s",label:"First response"},{num:"3×",label:"More bookings"},{num:"24/7",label:"Always on"}].map(s=>(
                <div key={s.num}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:ACCENT, lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:12, color:MUTED, marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up fade-up-2" style={{ display:"flex", justifyContent:"center" }}>
            <PhoneDemo />
          </div>
        </div>
      </section>

      {/* INDUSTRY STRIP */}
      <div style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, background:SURFACE, padding:"18px 24px" }}>
        <div className="industry-strip">
          {["🏋️  Gyms","🔧  Plumbers","📈  Agencies","🧑‍💼  Coaches","🎥  Creators","🦷  Dentists"].map(l=>(
            <span key={l} style={{ fontSize:13, color:MUTED }}>{l}</span>
          ))}
        </div>
      </div>

      {/* ROI */}
      <section className="section-pad" style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>The data is brutal</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,4vw,46px)", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:14, color:TEXT }}>
            Speed is the only variable<br /><span style={{ fontStyle:"italic", color:ACCENT }}>that actually matters.</span>
          </h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:500, margin:"0 auto", lineHeight:1.6 }}>A lead who doesn't hear back in 5 minutes is already talking to your competitor.</p>
        </div>
        <div style={{ border:`1px solid ${BORDER}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:SURFACE, padding:"10px 20px", borderBottom:`1px solid ${BORDER}` }}>
            {["Response time","Contact rate","Booking change"].map(h=>(
              <div key={h} style={{ fontSize:10, color:MUTED, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", textTransform:"uppercase" }}>{h}</div>
            ))}
          </div>
          {ROI_DATA.map((row,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"12px 20px", background:row.highlight?"rgba(22,163,74,0.05)":(i%2===0?SURFACE:"#fff"), borderBottom:i<ROI_DATA.length-1?`1px solid ${BORDER}`:"none", borderLeft:row.highlight?`3px solid ${ACCENT}`:"3px solid transparent" }}>
              <div style={{ fontSize:13, fontWeight:row.highlight?700:400, color:row.highlight?ACCENT:TEXT, fontFamily:"'DM Mono',monospace", display:"flex", alignItems:"center", gap:6 }}>
                {row.highlight&&<span style={{ fontSize:9, background:ACCENT, color:"#fff", padding:"2px 7px", borderRadius:20, fontWeight:700 }}>QUALY</span>}
                {row.time}
              </div>
              <div style={{ fontSize:13, fontWeight:row.highlight?700:400, color:row.highlight?ACCENT:MUTED, fontFamily:"'DM Mono',monospace" }}>{row.rate}</div>
              <div style={{ fontSize:13, fontWeight:row.highlight?700:400, color:row.bookings.startsWith("+")?ACCENT:"#ef4444", fontFamily:"'DM Mono',monospace" }}>{row.bookings}</div>
            </div>
          ))}
          <div style={{ padding:"10px 20px", background:SURFACE, borderTop:`1px solid ${BORDER}`, fontSize:10, color:MUTED2 }}>Source: MIT Lead Response Management Study · HBR (2011, replicated 2019)</div>
        </div>
        <div style={{ marginTop:28, padding:20, background:"rgba(22,163,74,0.05)", border:"1px solid rgba(22,163,74,0.15)", borderRadius:12, display:"flex", gap:14, alignItems:"flex-start" }}>
          <span style={{ fontSize:22, flexShrink:0 }}>💡</span>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:ACCENT, marginBottom:4 }}>The Qualy advantage</div>
            <div style={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>At 10 seconds, contact rate hits 391% vs. a 30-minute response. Qualy responds in under 10 seconds, every single time.</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad-sm" style={{ background:SURFACE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>How it works</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>Five steps, zero effort from you.</h2>
          </div>
          {[
            { step:"01", title:"Lead submits a form",         body:"From your website, Typeform, or CRM — any source triggers Qualy instantly." },
            { step:"02", title:"Blueprint is selected",       body:"Qualy detects the industry and loads the right conversation logic — gym, coach, agency." },
            { step:"03", title:"GPT-4o writes the opener",    body:"A personalised first message generated in under a second, based on name and context." },
            { step:"04", title:"SMS lands in 10 seconds",     body:"Twilio delivers the message. The lead thinks it's you — because it's that natural." },
            { step:"05", title:"Conversation runs on autopilot", body:"Qualy replies, qualifies the lead, and books the appointment or call." },
          ].map((item,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"64px 1fr", gap:20, padding:"20px 0", borderBottom:i<4?`1px solid ${BORDER}`:"none", alignItems:"start" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:ACCENT, letterSpacing:"0.06em", paddingTop:2 }}>{item.step}</div>
              <div>
                <div style={{ fontSize:15, fontWeight:600, marginBottom:4, color:TEXT }}>{item.title}</div>
                <div style={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section-pad" style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Everything included</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>Built to close, not just chat.</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f,i)=>(
            <div key={i} className="feature-card">
              <div style={{ fontSize:22, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:6, color:TEXT }}>{f.title}</div>
              <div style={{ fontSize:13, color:MUTED, lineHeight:1.65 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-pad-sm" style={{ background:SURFACE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(18px,3vw,28px)", lineHeight:1.4, fontStyle:"italic", marginBottom:24, color:TEXT }}>
            "We went from booking 3 tours a week to 9. I didn't change anything — just added Qualy to our enquiry form."
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>M</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:14, fontWeight:600, color:TEXT }}>Mike Hartley</div>
              <div style={{ fontSize:12, color:MUTED2 }}>Owner, PeakFit Gym · Amsterdam</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-pad" style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>Pricing</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,3.5vw,48px)", lineHeight:1.1, letterSpacing:"-0.02em", color:TEXT, marginBottom:14 }}>
            Simple pricing.<br /><span style={{ fontStyle:"italic", color:ACCENT }}>No surprises.</span>
          </h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:460, margin:"0 auto" }}>Flat monthly plans — not per-lead. Know exactly what you're paying while you scale.</p>
        </div>

        <div className="pricing-grid">
          <PricingCard name="Starter" price="€49" desc="Perfect for getting started" who="Gyms · Plumbers · New coaches"
            features={["Up to 100 leads / month","1 industry blueprint","AI-powered SMS replies","Lead dashboard","Email support"]}
            missing={["Follow-up sequences","WhatsApp","Custom AI voice","White-label"]}
            onCta={()=>scrollTo("cta-email")} />
          <PricingCard name="Growth" price="€99" desc="For businesses scaling fast" who="Agencies · Coaches · Growing gyms"
            features={["Up to 500 leads / month","All industry blueprints","AI-powered SMS + WhatsApp","Follow-up sequences","Full dashboard + analytics","Custom AI tone & voice","Priority support"]}
            missing={["White-label"]} featured
            onCta={()=>scrollTo("cta-email")} />
          <PricingCard name="Pro" price="€249" desc="At scale, your way" who="Influencers · High-ticket coaches · Resellers"
            features={["Unlimited leads","All blueprints + custom","SMS + WhatsApp + Instagram DM","Advanced follow-up flows","White-label (your brand)","Custom AI training","Calendly auto-booking","Dedicated onboarding call"]}
            onCta={()=>scrollTo("cta-email")} />
        </div>

        <div className="faq-grid">
          {[
            { q:"Can I switch plans?",       a:"Yes — upgrade or downgrade anytime. Changes take effect on your next billing date." },
            { q:"What counts as a lead?",    a:"Any contact that hits your webhook — form submissions, CRM entries, Zapier triggers." },
            { q:"Is there a free trial?",    a:"Yes, 14 days free on any plan. No credit card required to start." },
          ].map((item,i)=>(
            <div key={i} style={{ borderTop:`2px solid ${BORDER}`, paddingTop:18 }}>
              <div style={{ fontSize:14, fontWeight:600, color:TEXT, marginBottom:8 }}>{item.q}</div>
              <div style={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="section-pad" style={{ textAlign:"center", background:SURFACE, borderTop:`1px solid ${BORDER}` }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:20 }}>Get started today</div>
        <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(32px,5vw,60px)", lineHeight:1.05, letterSpacing:"-0.03em", maxWidth:640, margin:"0 auto 16px", color:TEXT }}>
          Your next lead won't<br /><span style={{ fontStyle:"italic", color:ACCENT }}>wait for you.</span>
        </h2>
        <p style={{ fontSize:16, color:MUTED, maxWidth:400, margin:"0 auto 36px" }}>14 days free. No credit card required. Set up in under 10 minutes.</p>
        {!submitted ? (
          <div className="cta-email-row">
            <input id="cta-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
              style={{ flex:1, padding:"14px 20px", background:"#fff", border:"none", color:TEXT, fontSize:15, outline:"none", fontFamily:"inherit" }} />
            <button className="cta-primary" style={{ borderRadius:0, whiteSpace:"nowrap" }} onClick={()=>email&&setSubmitted(true)}>Get early access</button>
          </div>
        ) : (
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.25)", borderRadius:10, padding:"14px 28px", color:ACCENT, fontSize:15 }}>
            ✓ You're on the list — we'll be in touch!
          </div>
        )}
        <p style={{ fontSize:12, color:MUTED2, marginTop:14 }}>Gyms · Plumbers · Agencies · Coaches · Influencers · Any business with inbound leads</p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${BORDER}`, padding:"28px 24px", background:"#fff" }}>
        <div className="footer-inner" style={{ maxWidth:1100, margin:"0 auto" }}>
          <img src={logoSrc} alt="QualyLeads" style={{ height:36, width:"auto" }} />
          <div style={{ fontSize:12, color:MUTED2 }}>© 2025 QualyLeads. Built to convert.</div>
          <div style={{ display:"flex", gap:20 }}>
            {["Privacy","Terms","Contact"].map(l=><span key={l} className="nav-link" style={{ fontSize:12 }}>{l}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
