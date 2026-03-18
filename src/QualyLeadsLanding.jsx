import { useState, useEffect, useRef } from "react";

// ─── Light mode tokens ────────────────────────────────────────────────────────
const ACCENT    = "#16a34a";      // green-700 — readable on white
const ACCENT_L  = "#22c55e";      // green-500 — for highlights
const BG        = "#ffffff";
const SURFACE   = "#f9fafb";
const SURFACE2  = "#f3f4f6";
const BORDER    = "#e5e7eb";
const TEXT      = "#111827";
const MUTED     = "#6b7280";
const MUTED2    = "#9ca3af";

const GYM_CONVERSATION = [
  { role: "ai",   text: "Hey Sarah 👋 It's Jordan from PeakFit. Quick question — what's the main goal that brought you in today?", delay: 400 },
  { role: "lead", text: "Hi! I want to lose weight and actually stick to it this time", delay: 1800 },
  { role: "ai",   text: "Love that — weight loss with consistency is exactly what we're built for. Most members hit their first milestone in 6 weeks with our coached classes. Want to see the gym first?", delay: 3200 },
  { role: "lead", text: "Yeah that sounds good, what does that look like?", delay: 5000 },
  { role: "ai",   text: "Free 45-min tour + a session with a coach — zero commitment. We have Tuesday 6pm or Saturday 10am. Which works better for you?", delay: 6400 },
  { role: "lead", text: "Saturday morning works!", delay: 8200 },
  { role: "ai",   text: "Saturday 10am is yours ✅ You'll get a reminder Friday evening. Can't wait to show you around, Sarah!", delay: 9600 },
];

const ROI_DATA = [
  { time: "10 sec",   rate: "391%", bookings: "+100%", highlight: true },
  { time: "1 min",    rate: "160%", bookings: "+36%",  highlight: false },
  { time: "5 min",    rate: "80%",  bookings: "+17%",  highlight: false },
  { time: "30 min",   rate: "62%",  bookings: "+8%",   highlight: false },
  { time: "1 hour",   rate: "36%",  bookings: "-12%",  highlight: false },
  { time: "24 hours", rate: "11%",  bookings: "-64%",  highlight: false },
];

const FEATURES = [
  { icon: "⚡", title: "10-second response", body: "Qualy texts every lead the moment they submit. No delays, no missed windows." },
  { icon: "🧠", title: "Industry blueprints", body: "Gyms, plumbers, agencies — each gets a tailored conversation designed to convert." },
  { icon: "📅", title: "Books appointments", body: "Qualy doesn't just chat. It pushes toward a booking, a tour, or a call — every time." },
  { icon: "🔁", title: "Full memory", body: "Every reply is saved. Qualy picks up exactly where the conversation left off." },
  { icon: "📊", title: "Live dashboard", body: "See every lead, every message, every status in real time. No spreadsheets needed." },
  { icon: "🔌", title: "Plug-in ready", body: "Connect your CRM, Zapier, or form tool in minutes. No code required." },
];

// ─── Phone Demo ───────────────────────────────────────────────────────────────
function PhoneDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning]       = useState(false);
  const [isTyping, setIsTyping]         = useState(false);
  const chatRef    = useRef(null);
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && visibleCount === 0) runDemo(); }, { threshold: 0.4 });
    const el = document.getElementById("phone-demo");
    if (el) obs.observe(el);
    return () => { obs.disconnect(); clearAll(); };
  }, []);

  return (
    <div id="phone-demo" style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ width:300, borderRadius:40, background:"#fff", border:"1.5px solid #e5e7eb", boxShadow:"0 24px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)", overflow:"hidden", fontFamily:"'DM Sans',system-ui,sans-serif" }}>
        {/* Status bar */}
        <div style={{ background:"#fff", padding:"14px 24px 8px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:TEXT, fontWeight:600 }}>9:41</span>
          <div style={{ width:80, height:24, borderRadius:20, background:"#111", }} />
          <div style={{ width:14, height:10, borderRadius:2, border:`1.5px solid ${MUTED2}`, position:"relative" }}>
            <div style={{ position:"absolute", inset:2, background:ACCENT, borderRadius:1 }} />
          </div>
        </div>

        {/* App header */}
        <div style={{ background:SURFACE, padding:"10px 20px 12px", borderBottom:`1px solid ${BORDER}`, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff" }}>Q</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:TEXT }}>Qualy · PeakFit</div>
            <div style={{ fontSize:11, color:ACCENT, display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:ACCENT, display:"inline-block" }} />
              Active now
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={chatRef} style={{ height:380, overflowY:"auto", padding:"16px 12px", background:"#fff", display:"flex", flexDirection:"column", gap:8, scrollbarWidth:"none" }}>
          <div style={{ alignSelf:"center", fontSize:10, color:MUTED2, background:SURFACE2, border:`1px solid ${BORDER}`, padding:"4px 12px", borderRadius:20, marginBottom:4 }}>
            Sarah M. · Gym lead · just now
          </div>

          {GYM_CONVERSATION.slice(0, visibleCount).map((msg, i) => (
            <div key={i} style={{ display:"flex", justifyContent:msg.role==="ai"?"flex-start":"flex-end", animation:"fadeSlideUp 0.3s ease" }}>
              <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:msg.role==="ai"?"4px 16px 16px 16px":"16px 4px 16px 16px", background:msg.role==="ai"?SURFACE2:ACCENT, color:msg.role==="ai"?TEXT:"#fff", fontSize:12, lineHeight:1.5, fontWeight:msg.role==="lead"?500:400, border:msg.role==="ai"?`1px solid ${BORDER}`:"none" }}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display:"flex", justifyContent:"flex-start" }}>
              <div style={{ padding:"10px 14px", borderRadius:"4px 16px 16px 16px", background:SURFACE2, border:`1px solid ${BORDER}`, display:"flex", gap:4, alignItems:"center" }}>
                {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:MUTED2, animation:`typingDot 1.2s ${i*0.2}s infinite` }} />)}
              </div>
            </div>
          )}

          {!isRunning && visibleCount===GYM_CONVERSATION.length && (
            <div style={{ alignSelf:"center", marginTop:8, fontSize:11, color:ACCENT, background:"rgba(22,163,74,0.08)", border:`1px solid rgba(22,163,74,0.2)`, padding:"4px 12px", borderRadius:20 }}>
              ✓ Tour booked · 0:58 elapsed
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ background:SURFACE, padding:"10px 12px 20px", borderTop:`1px solid ${BORDER}`, display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ flex:1, height:34, borderRadius:20, background:"#fff", border:`1px solid ${BORDER}`, display:"flex", alignItems:"center", padding:"0 12px" }}>
            <span style={{ fontSize:11, color:MUTED2 }}>Qualy is handling this…</span>
          </div>
        </div>
      </div>

      <button onClick={runDemo} disabled={isRunning} style={{ marginTop:20, padding:"10px 24px", borderRadius:24, border:`1px solid ${isRunning?BORDER:ACCENT}`, background:"transparent", color:isRunning?MUTED:ACCENT, fontSize:13, cursor:isRunning?"default":"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
        {isRunning ? "Playing…" : "↺ Replay demo"}
      </button>

      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes typingDot { 0%,60%,100%{opacity:0.3;transform:scale(1)} 30%{opacity:1;transform:scale(1.3)} }
      `}</style>
    </div>
  );
}

// ─── ROI Table ────────────────────────────────────────────────────────────────
function ROITable() {
  return (
    <div style={{ border:`1px solid ${BORDER}`, borderRadius:16, overflow:"hidden" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:SURFACE, padding:"12px 24px", borderBottom:`1px solid ${BORDER}` }}>
        {["Response time","Contact rate","Booking change"].map(h => (
          <div key={h} style={{ fontSize:11, color:MUTED, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", textTransform:"uppercase" }}>{h}</div>
        ))}
      </div>
      {ROI_DATA.map((row, i) => (
        <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"14px 24px", background:row.highlight?"rgba(22,163,74,0.05)":(i%2===0?SURFACE:"#fff"), borderBottom:i<ROI_DATA.length-1?`1px solid ${BORDER}`:"none", borderLeft:row.highlight?`3px solid ${ACCENT}`:"3px solid transparent" }}>
          <div style={{ fontSize:14, fontWeight:row.highlight?700:400, color:row.highlight?ACCENT:TEXT, fontFamily:"'DM Mono',monospace", display:"flex", alignItems:"center", gap:8 }}>
            {row.highlight && <span style={{ fontSize:10, background:ACCENT, color:"#fff", padding:"2px 8px", borderRadius:20, fontWeight:700 }}>QUALY</span>}
            {row.time}
          </div>
          <div style={{ fontSize:14, fontWeight:row.highlight?700:400, color:row.highlight?ACCENT:MUTED, fontFamily:"'DM Mono',monospace" }}>{row.rate}</div>
          <div style={{ fontSize:14, fontWeight:row.highlight?700:400, color:row.bookings.startsWith("+")?ACCENT:"#ef4444", fontFamily:"'DM Mono',monospace" }}>{row.bookings}</div>
        </div>
      ))}
      <div style={{ padding:"12px 24px", background:SURFACE, borderTop:`1px solid ${BORDER}`, fontSize:11, color:MUTED2 }}>
        Source: MIT Lead Response Management Study · Harvard Business Review (2011, replicated 2019)
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function QualyLeadsLanding() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background:BG, color:TEXT, minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing:border-box; }
        .nav-link { color:${MUTED}; font-size:14px; text-decoration:none; transition:color 0.2s; cursor:pointer; }
        .nav-link:hover { color:${TEXT}; }
        .cta-primary { background:${ACCENT}; color:#fff; border:none; padding:14px 32px; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; font-family:inherit; transition:all 0.2s; }
        .cta-primary:hover { background:#15803d; transform:translateY(-1px); box-shadow:0 8px 24px rgba(22,163,74,0.25); }
        .cta-ghost { background:transparent; color:${TEXT}; border:1px solid ${BORDER}; padding:14px 32px; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer; font-family:inherit; transition:all 0.2s; }
        .cta-ghost:hover { border-color:#9ca3af; background:${SURFACE}; }
        .feature-card { background:#fff; border:1px solid ${BORDER}; border-radius:12px; padding:24px; transition:border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
        .feature-card:hover { border-color:#9ca3af; transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.06); }
        .stat-num { font-family:'DM Serif Display',serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation:fadeUp 0.7s ease both; }
        .fade-up-1 { animation-delay:0.1s; }
        .fade-up-2 { animation-delay:0.25s; }
        .fade-up-3 { animation-delay:0.4s; }
        .fade-up-4 { animation-delay:0.55s; }
        @keyframes pulse-green { 0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,0.4)} 50%{box-shadow:0 0 0 8px rgba(22,163,74,0)} }
        .pulse { animation:pulse-green 2s infinite; }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${BORDER}`, padding:"0 40px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:18, fontWeight:700, letterSpacing:"-0.03em", color:TEXT }}>
          Qualy<span style={{ color:ACCENT }}>Leads</span>
        </div>
        <div style={{ display:"flex", gap:32, alignItems:"center" }}>
          <span className="nav-link">Features</span>
          <span className="nav-link">Pricing</span>
          <span className="nav-link">Demo</span>
          <button className="cta-primary" style={{ padding:"8px 20px", fontSize:13 }}>Get early access</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", padding:"100px 40px 80px", maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
        <div style={{ position:"absolute", top:0, left:"40%", width:600, height:400, background:"radial-gradient(ellipse, rgba(22,163,74,0.06) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:20, padding:"6px 14px", marginBottom:28 }}>
            <span className="pulse" style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, display:"inline-block" }} />
            <span style={{ fontSize:12, color:ACCENT, fontFamily:"'DM Mono',monospace", letterSpacing:"0.04em" }}>AI SALES SETTER FOR SMES</span>
          </div>

          <h1 className="fade-up fade-up-1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(42px,5vw,62px)", lineHeight:1.08, letterSpacing:"-0.02em", color:TEXT, marginBottom:12 }}>
            Stop losing leads<br />
            <span style={{ fontStyle:"italic", color:ACCENT }}>to your voicemail.</span>
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize:18, color:MUTED, lineHeight:1.65, maxWidth:460, marginBottom:36 }}>
            Qualy texts every lead within 10 seconds of enquiry — qualifying, booking, and converting them while you're busy running your business.
          </p>

          <div className="fade-up fade-up-3" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:48 }}>
            <button className="cta-primary">Start free trial →</button>
            <button className="cta-ghost">See it in action</button>
          </div>

          <div className="fade-up fade-up-4" style={{ display:"flex", gap:32, paddingTop:32, borderTop:`1px solid ${BORDER}` }}>
            {[{num:"10s",label:"First response time"},{num:"3×",label:"More bookings"},{num:"24/7",label:"Always on"}].map(s => (
              <div key={s.num}>
                <div className="stat-num" style={{ fontSize:28, color:ACCENT, lineHeight:1 }}>{s.num}</div>
                <div style={{ fontSize:12, color:MUTED, marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up fade-up-2" style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"center" }}>
          <PhoneDemo />
        </div>
      </section>

      {/* INDUSTRY STRIP */}
      <div style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, background:SURFACE, padding:"20px 40px", display:"flex", justifyContent:"center", gap:60, flexWrap:"wrap" }}>
        {["🏋️  Gyms","🔧  Plumbers","📈  Agencies","🦷  Dental clinics","🏠  Real estate","🎓  Tutors"].map(label => (
          <span key={label} style={{ fontSize:14, color:MUTED }}>{label}</span>
        ))}
      </div>

      {/* ROI */}
      <section style={{ padding:"100px 40px", maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ display:"inline-block", fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>The data is brutal</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(32px,4vw,48px)", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:16, color:TEXT }}>
            Speed is the only variable<br />
            <span style={{ fontStyle:"italic", color:ACCENT }}>that actually matters.</span>
          </h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:520, margin:"0 auto", lineHeight:1.6 }}>
            A lead who doesn't hear back in 5 minutes is already talking to your competitor.
          </p>
        </div>

        <ROITable />

        <div style={{ marginTop:32, padding:24, background:"rgba(22,163,74,0.05)", border:"1px solid rgba(22,163,74,0.15)", borderRadius:12, display:"flex", gap:16, alignItems:"flex-start" }}>
          <span style={{ fontSize:24 }}>💡</span>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:ACCENT, marginBottom:4 }}>The Qualy advantage</div>
            <div style={{ fontSize:14, color:MUTED, lineHeight:1.6 }}>At 10 seconds, contact rate hits 391% vs. a 30-minute response. That's the difference between a full calendar and an empty one. Qualy responds in under 10 seconds, every single time.</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:"80px 40px", background:SURFACE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>How it works</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,3.5vw,42px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>Five steps, zero effort from you.</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
            {[
              { step:"01", title:"Lead submits a form",       body:"From your website, Typeform, or CRM — any source triggers Qualy instantly." },
              { step:"02", title:"Blueprint is selected",     body:"Qualy detects the industry and loads the right conversation logic — gym, plumber, or agency." },
              { step:"03", title:"GPT-4o writes the opener",  body:"A personalised first message is generated in under a second, based on name and context." },
              { step:"04", title:"SMS lands in 10 seconds",   body:"Twilio delivers the message. The lead thinks it's you — because it's that natural." },
              { step:"05", title:"Conversation runs on autopilot", body:"Qualy replies to every response, qualifies the lead, and books the appointment or call." },
            ].map((item, i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:24, padding:"24px 0", borderBottom:i<4?`1px solid ${BORDER}`:"none", alignItems:"start" }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:ACCENT, letterSpacing:"0.06em", paddingTop:3 }}>{item.step}</div>
                <div>
                  <div style={{ fontSize:16, fontWeight:600, marginBottom:4, color:TEXT }}>{item.title}</div>
                  <div style={{ fontSize:14, color:MUTED, lineHeight:1.6 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"100px 40px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16 }}>Everything included</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,3.5vw,42px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>Built to close, not just chat.</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {FEATURES.map((f,i) => (
            <div key={i} className="feature-card">
              <div style={{ fontSize:24, marginBottom:14 }}>{f.icon}</div>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:6, color:TEXT }}>{f.title}</div>
              <div style={{ fontSize:13, color:MUTED, lineHeight:1.65 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding:"80px 40px", background:SURFACE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(22px,3vw,32px)", lineHeight:1.4, fontStyle:"italic", marginBottom:28, color:TEXT }}>
            "We went from booking 3 tours a week to 9. I didn't change anything — just added Qualy to our enquiry form."
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff" }}>M</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:14, fontWeight:600, color:TEXT }}>Mike Hartley</div>
              <div style={{ fontSize:12, color:MUTED2 }}>Owner, PeakFit Gym · Amsterdam</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"120px 40px", textAlign:"center", position:"relative", overflow:"hidden", background:"#fff" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:400, background:"radial-gradient(ellipse, rgba(22,163,74,0.05) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:20 }}>Get started today</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,64px)", lineHeight:1.05, letterSpacing:"-0.03em", maxWidth:680, margin:"0 auto 20px", color:TEXT }}>
            Your next lead won't<br />
            <span style={{ fontStyle:"italic", color:ACCENT }}>wait for you.</span>
          </h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:420, margin:"0 auto 40px" }}>
            Set up in under 10 minutes. First month free. No credit card required.
          </p>

          {!submitted ? (
            <div style={{ display:"flex", gap:0, maxWidth:420, margin:"0 auto", borderRadius:10, overflow:"hidden", border:`1px solid ${BORDER}`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{ flex:1, padding:"14px 20px", background:"#fff", border:"none", color:TEXT, fontSize:15, outline:"none", fontFamily:"inherit" }} />
              <button className="cta-primary" style={{ borderRadius:0, whiteSpace:"nowrap" }} onClick={()=>email&&setSubmitted(true)}>Get early access</button>
            </div>
          ) : (
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.25)", borderRadius:10, padding:"14px 28px", color:ACCENT, fontSize:15 }}>
              ✓ You're on the list — we'll be in touch!
            </div>
          )}
          <p style={{ fontSize:12, color:MUTED2, marginTop:16 }}>Gyms · Plumbers · Agencies · Any SME with inbound leads</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${BORDER}`, padding:"32px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", background:SURFACE }}>
        <div style={{ fontSize:15, fontWeight:700, letterSpacing:"-0.02em", color:TEXT }}>Qualy<span style={{ color:ACCENT }}>Leads</span></div>
        <div style={{ fontSize:12, color:MUTED2 }}>© 2025 QualyLeads. Built to convert.</div>
        <div style={{ display:"flex", gap:20 }}>
          {["Privacy","Terms","Contact"].map(l=><span key={l} className="nav-link" style={{ fontSize:12 }}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}
