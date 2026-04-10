import { useState, useEffect, useRef } from "react";
import logoSrc from "../logo.png";
const ACCENT = "#16a34a";
const BG = "#ffffff";
const SURFACE = "#f9fafb";
const SURFACE2= "#f3f4f6";
const BORDER = "#e5e7eb";
const TEXT = "#111827";
const MUTED = "#6b7280";
const MUTED2 = "#9ca3af";
const GYM_CONVERSATION = [
  { role:"ai", text:"Hey Sarah 👋 It's Jordan from PeakFit. What's the main goal that brought you in today?", delay:400 },
  { role:"lead", text:"Hi! I want to lose weight and actually stick to it this time", delay:1800 },
  { role:"ai", text:"Love that — consistency is exactly what we're built for. Most members hit their first milestone in 6 weeks. Want to see the gym first?", delay:3200 },
  { role:"lead", text:"Yeah that sounds good!", delay:5000 },
  { role:"ai", text:"Free 45-min tour — zero commitment. Tuesday 6pm or Saturday 10am?", delay:6400 },
  { role:"lead", text:"Saturday morning works!", delay:8200 },
  { role:"ai", text:"Saturday 10am is yours ✅ See you then Sarah!", delay:9600 },
];
const ROI_DATA = [
  { time:"10 sec", rate:"391%", bookings:"+100%", highlight:true },
  { time:"1 min", rate:"160%", bookings:"+36%", highlight:false },
  { time:"5 min", rate:"80%", bookings:"+17%", highlight:false },
  { time:"30 min", rate:"62%", bookings:"+8%", highlight:false },
  { time:"1 hour", rate:"36%", bookings:"-12%", highlight:false },
  { time:"24 hours", rate:"11%", bookings:"-64%", highlight:false },
];
const FEATURES = [
  { icon:"⚡", title:"10-second response", body:"Qualy texts every lead the moment they submit. No delays, no missed windows." },
  { icon:"🧠", title:"Industry blueprints", body:"Gyms, plumbers, coaches — each gets a tailored conversation designed to convert." },
  { icon:"📅", title:"Calendly auto-booking", body:"Qualy sends your Calendly link at the perfect moment and books calls automatically." },
  { icon:"🔁", title:"Full memory", body:"Every reply is saved. Qualy picks up exactly where the conversation left off." },
  { icon:"📊", title:"Live dashboard", body:"See every lead, every message, every status in real time. No spreadsheets." },
  { icon:"🔌", title:"Plug-in ready", body:"Connect your CRM, Zapier, or form tool in minutes. No code required." },
];
function PhoneDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
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
export default function QualyLeadsLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  const prices = {
    USD: { starter:"$49", starterFirst:"$24.50", growth:"$99", growthFirst:"$49.50", pro:"$249", proFirst:"$124.50" },
    EUR: { starter:"€49", starterFirst:"€24.50", growth:"€99", growthFirst:"€49.50", pro:"€249", proFirst:"€124.50" },
  };
  const p = prices[currency];

  async function startCheckout(plan) {
    setCheckoutLoading(plan);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stripe/create-checkout`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { console.error("Checkout error:", err); }
    finally { setCheckoutLoading(null); }
  }
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  async function joinWaitlist() {
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/waitlist/join`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (err) { alert("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  }
  return (
    <div style={{ background:BG, color:TEXT, minHeight:"100vh", fontFamily:"'DM Sans',system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;}
        .nav-link{color:${MUTED};font-size:14px;text-
