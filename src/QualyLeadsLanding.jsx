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

const T = {
  en: {
    badge: "AI SALES SETTER FOR SMES & CREATORS",
    hero1: "Stop losing leads",
    hero2: "to your voicemail.",
    heroSub: "Qualy texts every lead within 10 seconds — qualifying, booking, and converting them while you run your business.",
    ctaPrimary: "Start free trial →",
    ctaGhost: "See it in action",
    stat1: "First response", stat2: "More bookings", stat3: "Always on",
    dataTitle: "The data is brutal",
    dataH2a: "Speed is the only variable",
    dataH2b: "that actually matters.",
    dataSub: "A lead who doesn't hear back in 5 minutes is already talking to your competitor.",
    dataCol1: "Response time", dataCol2: "Contact rate", dataCol3: "Booking change",
    dataSource: "Source: MIT Lead Response Management Study · HBR (2011, replicated 2019)",
    qualyAdvTitle: "The Qualy advantage",
    qualyAdvBody: "At 10 seconds, contact rate hits 391% vs. a 30-minute response. Qualy responds in under 10 seconds, every single time.",
    howBadge: "How it works",
    howH2: "Five steps, zero effort from you.",
    steps: [
      { step:"01", title:"Lead submits a form", body:"From your website, Typeform, or CRM — any source triggers Qualy instantly." },
      { step:"02", title:"Blueprint is selected", body:"Qualy detects the industry and loads the right conversation logic — gym, coach, agency." },
      { step:"03", title:"GPT-4o writes the opener", body:"A personalised first message generated in under a second, based on name and context." },
      { step:"04", title:"SMS lands in 10 seconds", body:"Twilio delivers the message. The lead thinks it's you — because it's that natural." },
      { step:"05", title:"Conversation runs on autopilot", body:"Qualy replies, qualifies the lead, and books the appointment or call." },
    ],
    featuresBadge: "Everything included",
    featuresH2: "Built to close, not just chat.",
    features: [
      { icon:"⚡", title:"10-second response", body:"Qualy texts every lead the moment they submit. No delays, no missed windows." },
      { icon:"🧠", title:"Industry blueprints", body:"Gyms, plumbers, coaches — each gets a tailored conversation designed to convert." },
      { icon:"📅", title:"Auto-booking", body:"Qualy sends your booking link at the perfect moment and books calls automatically." },
      { icon:"🔁", title:"Full memory", body:"Every reply is saved. Qualy picks up exactly where the conversation left off." },
      { icon:"📊", title:"Live dashboard", body:"See every lead, every message, every status in real time. No spreadsheets." },
      { icon:"🔌", title:"Plug-in ready", body:"Connect your CRM, Zapier, or form tool in minutes. No code required." },
    ],
    connectBadge: "Integrations",
    connectH2: "Works with the tools you already use.",
    connectSub: "Connect your lead source in minutes. No code required.",
    connectTabs: ["Google Forms", "Typeform", "Zapier", "Facebook Ads"],
    connectSteps: [
      [
        { n:"1", title:"Open your Google Form", body:"Go to Google Forms and open the form your leads use to contact you." },
        { n:"2", title:"Open Apps Script", body:"Click the 3-dot menu → Script editor. This opens Google Apps Script." },
        { n:"3", title:"Paste the trigger code", body:"Delete any existing code and paste this:\n\nfunction onFormSubmit(e) {\n  var name = e.values[1] || 'Lead';\n  var phone = e.values[2];\n  var payload = JSON.stringify({ name: name, phone: phone, industry: 'gym' });\n  var options = { method: 'post', contentType: 'application/json', payload: payload };\n  UrlFetchApp.fetch('YOUR_WEBHOOK_URL', options);\n}" },
        { n:"4", title:"Add your webhook URL", body:"Replace YOUR_WEBHOOK_URL with your unique QualyLeads webhook URL from your dashboard → Clients tab." },
        { n:"5", title:"Set the trigger", body:"Click Triggers (clock icon) → Add trigger → onFormSubmit → On form submit. Save." },
        { n:"6", title:"Test it", body:"Submit a test entry in your Google Form. You should receive an SMS within 10 seconds! ✅" },
      ],
      [
        { n:"1", title:"Open your Typeform", body:"Go to typeform.com and open the form your leads use." },
        { n:"2", title:"Go to Connect → Webhooks", body:"In your form settings, click Connect → Webhooks → Add a webhook." },
        { n:"3", title:"Paste your webhook URL", body:"Paste your QualyLeads webhook URL from your dashboard. Make sure to map: name, phone, and industry fields." },
        { n:"4", title:"Test the webhook", body:"Click Send test request. You should receive an SMS within 10 seconds! ✅" },
      ],
      [
        { n:"1", title:"Create a new Zap", body:"Go to zapier.com → Create Zap. Choose your trigger app — Google Forms, Facebook Lead Ads, HubSpot, or any other tool." },
        { n:"2", title:"Set up the trigger", body:"Select the form or lead source you want to connect. Test it to confirm Zapier receives the data." },
        { n:"3", title:"Add Webhooks by Zapier as action", body:"Search for Webhooks by Zapier → POST. This requires a Zapier Professional plan (~€20/mo)." },
        { n:"4", title:"Configure the webhook", body:"URL: paste your QualyLeads webhook URL. Payload: map name, phone, and industry from your trigger data." },
        { n:"5", title:"Turn on the Zap", body:"Test it, then publish. Every new lead will trigger Qualy within 10 seconds! ✅" },
      ],
      [
        { n:"1", title:"Create a Facebook Lead Ad", body:"In Meta Ads Manager, create a new campaign → Lead generation objective → Instant Form." },
        { n:"2", title:"Add name and phone fields", body:"In your Instant Form, add Full Name and Phone Number as required fields." },
        { n:"3", title:"Connect via Zapier", body:"Go to zapier.com → Create Zap → Trigger: Facebook Lead Ads → Action: Webhooks by Zapier → POST." },
        { n:"4", title:"Map the fields", body:"In Zapier, map: Full Name → name, Phone → phone, and set industry to your vertical (e.g. gym)." },
        { n:"5", title:"Paste your webhook URL", body:"Use your QualyLeads webhook URL from your dashboard. Publish the Zap." },
        { n:"6", title:"Launch your ad", body:"Every lead from your Facebook ad will be texted by Qualy within 10 seconds! ✅" },
      ],
    ],
    faqBadge: "FAQ",
    faqH2: "Good questions. Honest answers.",
    faqs: [
      { q:"Why SMS and not WhatsApp?", a:"SMS has a 98% open rate and works on every phone without an app. WhatsApp is coming — join the waitlist. Most leads still respond to SMS within 90 seconds." },
      { q:"What if the AI says something wrong?", a:"Qualy never makes promises or quotes prices. It only asks questions and books appointments. Every message is visible in your dashboard so you always know exactly what was said." },
      { q:"Do I need Zapier?", a:"No — connecting Google Forms is completely free via our Apps Script integration. Zapier is optional if you use other tools." },
      { q:"What if I get more than 100 leads on Starter?", a:"We never cut off a live conversation. If you're approaching the limit we'll let you know and you can upgrade. Any active conversation is always completed." },
      { q:"Is this GDPR compliant?", a:"Yes. All data is stored in the EU. You can export or delete your data at any time. See our privacy policy for full details." },
      { q:"What if I want to cancel?", a:"No contracts, no hassle. Cancel anytime from your dashboard with one click. Your data stays available until the end of your billing period." },
    ],
    testimonial: "\"We went from booking 3 tours a week to 9. I didn't change anything — just added Qualy to our enquiry form.\"",
    testimonialName: "Mike Hartley",
    testimonialRole: "Owner, PeakFit Gym · Amsterdam",
    waBadge: "COMING SOON",
    waTitle: "WhatsApp integration coming soon — join the waitlist!",
    waSub: "Qualy will qualify leads on WhatsApp too. Same speed, same AI, more reach.",
    pricingBadge: "Simple pricing",
    pricingH2a: "Start converting leads",
    pricingH2b: "today.",
    pricingSub: "No setup fees. Cancel anytime. First 50 clients get 50% off their first month.",
    pricingNote: "✅ Google Forms connection is free — Zapier is optional · ✅ We never cut off a conversation mid-lead",
    pricingBanner: "🎉 Founding member offer — 50% off first month, automatically applied at checkout",
    starterName: "Starter", starterWho: "Gyms · Plumbers · New coaches",
    growthName: "Growth", growthWho: "Agencies · Coaches · Growing gyms",
    proName: "Pro", proWho: "Influencers · High-ticket coaches · Resellers",
    popular: "MOST POPULAR",
    ctaBtn: "Start free trial →",
    loading: "Loading…",
    starterFeatures: ["Up to 100 leads / month","1 industry blueprint","AI SMS replies","Auto-booking","Lead dashboard","Email support"],
    growthFeatures: ["Up to 500 leads / month","All industry blueprints","AI SMS replies","Auto-booking","Follow-up sequences","Full dashboard + analytics","Priority support"],
    proFeatures: ["Unlimited leads","All blueprints + custom","AI SMS replies","Auto-booking","Advanced follow-up flows","White-label (your brand)","Custom AI training on your data","Dedicated onboarding call"],
    missing1: "💬 WhatsApp", comingSoon: "Coming soon",
    missing2: "Follow-up sequences", missing3: "White-label",
    ctaBadge: "Get started today",
    ctaH2a: "Your next lead won't",
    ctaH2b: "wait for you.",
    ctaSub: "Start converting leads in minutes. 50% off your first month — no code required.",
    ctaFooter: "Gyms · Plumbers · Agencies · Coaches · Influencers · Any business with inbound leads",
    footerCopy: "© 2025 QualyLeads. Built to convert.",
    nav: { features: "Features", pricing: "Pricing", demo: "Demo", cta: "Start free trial" },
    privacy: "Privacy", terms: "Terms", contact: "Contact",
  },
  nl: {
    badge: "AI SALES ASSISTENT VOOR MKB & CREATORS",
    hero1: "Stop met leads verliezen",
    hero2: "aan je voicemail.",
    heroSub: "Qualy stuurt elke lead binnen 10 seconden een SMS — kwalificeert, boekt en converteert terwijl jij je bedrijf runt.",
    ctaPrimary: "Start gratis proef →",
    ctaGhost: "Bekijk het in actie",
    stat1: "Eerste reactie", stat2: "Meer boekingen", stat3: "Altijd beschikbaar",
    dataTitle: "De data is hard",
    dataH2a: "Snelheid is de enige variabele",
    dataH2b: "die er echt toe doet.",
    dataSub: "Een lead die na 5 minuten niets hoort, praat al met je concurrent.",
    dataCol1: "Reactietijd", dataCol2: "Contactratio", dataCol3: "Boekingen",
    dataSource: "Bron: MIT Lead Response Management Study · HBR (2011, herhaald in 2019)",
    qualyAdvTitle: "Het Qualy voordeel",
    qualyAdvBody: "Bij 10 seconden ligt het contactratio op 391% vergeleken met 30 minuten. Qualy reageert altijd binnen 10 seconden.",
    howBadge: "Hoe het werkt",
    howH2: "Vijf stappen, nul moeite van jou.",
    steps: [
      { step:"01", title:"Lead vult een formulier in", body:"Via je website, Typeform of CRM — elke bron activeert Qualy direct." },
      { step:"02", title:"Blueprint wordt geselecteerd", body:"Qualy detecteert de branche en laadt de juiste gesprekslogica — sportschool, coach, bureau." },
      { step:"03", title:"GPT-4o schrijft het openingsbericht", body:"Een gepersonaliseerd eerste bericht gegenereerd in minder dan een seconde." },
      { step:"04", title:"SMS komt binnen in 10 seconden", body:"Twilio bezorgt het bericht. De lead denkt dat jij het bent — want het is zo natuurlijk." },
      { step:"05", title:"Gesprek loopt op de automatische piloot", body:"Qualy antwoordt, kwalificeert de lead en boekt de afspraak of het gesprek." },
    ],
    featuresBadge: "Alles inbegrepen",
    featuresH2: "Gebouwd om te sluiten, niet alleen te chatten.",
    features: [
      { icon:"⚡", title:"10 seconden reactie", body:"Qualy stuurt elke lead direct een SMS na het invullen. Geen vertraging, geen gemiste kansen." },
      { icon:"🧠", title:"Branche-blueprints", body:"Sportscholen, loodgieters, coaches — elk krijgt een gesprek op maat dat converteert." },
      { icon:"📅", title:"Automatisch boeken", body:"Qualy stuurt je boekingslink op het perfecte moment en boekt gesprekken automatisch." },
      { icon:"🔁", title:"Volledig geheugen", body:"Elk antwoord wordt opgeslagen. Qualy pakt precies op waar het gesprek gebleven was." },
      { icon:"📊", title:"Live dashboard", body:"Bekijk elke lead, elk bericht, elke status in realtime. Geen spreadsheets meer." },
      { icon:"🔌", title:"Direct te koppelen", body:"Verbind je CRM, Zapier of formuliertool in minuten. Geen code vereist." },
    ],
    connectBadge: "Integraties",
    connectH2: "Werkt met de tools die je al gebruikt.",
    connectSub: "Koppel je leadbron in minuten. Geen code vereist.",
    connectTabs: ["Google Forms", "Typeform", "Zapier", "Facebook Ads"],
    connectSteps: [
      [
        { n:"1", title:"Open je Google Formulier", body:"Ga naar Google Formulieren en open het formulier dat je leads invullen." },
        { n:"2", title:"Open Apps Script", body:"Klik op het 3-puntenmenu → Script editor. Dit opent Google Apps Script." },
        { n:"3", title:"Plak de triggercode", body:"Verwijder bestaande code en plak dit:\n\nfunction onFormSubmit(e) {\n  var name = e.values[1] || 'Lead';\n  var phone = e.values[2];\n  var payload = JSON.stringify({ name: name, phone: phone, industry: 'gym' });\n  var options = { method: 'post', contentType: 'application/json', payload: payload };\n  UrlFetchApp.fetch('JOUW_WEBHOOK_URL', options);\n}" },
        { n:"4", title:"Voeg je webhook URL toe", body:"Vervang JOUW_WEBHOOK_URL door je unieke QualyLeads webhook URL uit je dashboard → Clients tab." },
        { n:"5", title:"Stel de trigger in", body:"Klik op Triggers (klokpictogram) → Trigger toevoegen → onFormSubmit → Bij formulierinzending. Opslaan." },
        { n:"6", title:"Test het", body:"Dien een testinzending in via je Google Formulier. Je ontvangt binnen 10 seconden een SMS! ✅" },
      ],
      [
        { n:"1", title:"Open je Typeform", body:"Ga naar typeform.com en open het formulier dat je leads gebruiken." },
        { n:"2", title:"Ga naar Connect → Webhooks", body:"In je formulierinstellingen, klik Connect → Webhooks → Webhook toevoegen." },
        { n:"3", title:"Plak je webhook URL", body:"Plak je QualyLeads webhook URL uit je dashboard. Zorg dat je name, phone en industry koppelt." },
        { n:"4", title:"Test de webhook", body:"Klik op Testverzoek verzenden. Je ontvangt binnen 10 seconden een SMS! ✅" },
      ],
      [
        { n:"1", title:"Maak een nieuwe Zap", body:"Ga naar zapier.com → Zap maken. Kies je trigger-app — Google Forms, Facebook Lead Ads, HubSpot, of een andere tool." },
        { n:"2", title:"Stel de trigger in", body:"Selecteer het formulier of de leadbron die je wilt koppelen. Test het om te bevestigen dat Zapier de data ontvangt." },
        { n:"3", title:"Voeg Webhooks by Zapier toe als actie", body:"Zoek naar Webhooks by Zapier → POST. Dit vereist een Zapier Professional abonnement (~€20/mnd)." },
        { n:"4", title:"Configureer de webhook", body:"URL: plak je QualyLeads webhook URL. Payload: koppel name, phone en industry." },
        { n:"5", title:"Activeer de Zap", body:"Test het en publiceer. Elke nieuwe lead activeert Qualy binnen 10 seconden! ✅" },
      ],
      [
        { n:"1", title:"Maak een Facebook Lead Ad", body:"In Meta Ads Manager, maak een campagne → Lead generation doelstelling → Instant Form." },
        { n:"2", title:"Voeg naam en telefoonvelden toe", body:"Voeg in je Instant Form Volledige naam en Telefoonnummer toe als verplichte velden." },
        { n:"3", title:"Koppel via Zapier", body:"Ga naar zapier.com → Zap maken → Trigger: Facebook Lead Ads → Actie: Webhooks by Zapier → POST." },
        { n:"4", title:"Koppel de velden", body:"In Zapier: Volledige naam → name, Telefoon → phone, en stel industry in op je branche (bijv. gym)." },
        { n:"5", title:"Plak je webhook URL", body:"Gebruik je QualyLeads webhook URL uit je dashboard. Publiceer de Zap." },
        { n:"6", title:"Start je advertentie", body:"Elke lead vanuit je Facebook-advertentie wordt binnen 10 seconden door Qualy getekst! ✅" },
      ],
    ],
    faqBadge: "Veelgestelde vragen",
    faqH2: "Goede vragen. Eerlijke antwoorden.",
    faqs: [
      { q:"Waarom SMS en niet WhatsApp?", a:"SMS heeft een openingsratio van 98% en werkt op elke telefoon zonder app. WhatsApp komt eraan — schrijf je in voor de wachtlijst. De meeste leads reageren al binnen 90 seconden op SMS." },
      { q:"Wat als de AI iets verkeerds zegt?", a:"Qualy maakt geen beloftes en geeft geen prijzen. Het stelt alleen vragen en boekt afspraken. Elk bericht is zichtbaar in je dashboard — je hebt altijd volledig inzicht." },
      { q:"Kost het Zapier extra?", a:"Nee — Google Forms koppelen is volledig gratis via onze Apps Script integratie. Zapier is optioneel als je andere tools gebruikt." },
      { q:"Wat als ik meer dan 100 leads krijg op Starter?", a:"We onderbreken nooit een lopend gesprek. Als je de limiet nadert, laten we je het weten en kun je upgraden. Een lopend gesprek wordt altijd afgerond." },
      { q:"Is dit GDPR-proof?", a:"Ja. Klantdata wordt opgeslagen in de EU. Je kunt data op elk moment exporteren of verwijderen. Bekijk onze privacyverklaring voor meer details." },
      { q:"Wat als ik wil opzeggen?", a:"Geen contract, geen gedoe. Opzeggen kan met één klik vanuit je dashboard. Je data blijft beschikbaar tot het einde van je betaalperiode." },
    ],
    testimonial: "\"We gingen van 3 rondleidingen per week naar 9. Ik heb niets veranderd — alleen Qualy toegevoegd aan ons contactformulier.\"",
    testimonialName: "Mike Hartley",
    testimonialRole: "Eigenaar, PeakFit Gym · Amsterdam",
    waBadge: "BINNENKORT",
    waTitle: "WhatsApp-integratie komt eraan — schrijf je in voor de wachtlijst!",
    waSub: "Qualy kwalificeert leads binnenkort ook via WhatsApp. Zelfde snelheid, zelfde AI, meer bereik.",
    pricingBadge: "Eenvoudige prijzen",
    pricingH2a: "Begin vandaag nog",
    pricingH2b: "met leads converteren.",
    pricingSub: "Geen installatiekosten. Op elk moment opzeggen. Eerste 50 klanten krijgen 50% korting op de eerste maand.",
    pricingNote: "✅ Google Forms koppeling is gratis — Zapier is optioneel · ✅ We onderbreken nooit een lopend gesprek",
    pricingBanner: "🎉 Founding member aanbieding — 50% korting op de eerste maand, automatisch verrekend bij afrekenen",
    starterName: "Starter", starterWho: "Sportscholen · Loodgieters · Nieuwe coaches",
    growthName: "Groei", growthWho: "Bureaus · Coaches · Groeiende sportscholen",
    proName: "Pro", proWho: "Influencers · High-ticket coaches · Resellers",
    popular: "MEEST POPULAIR",
    ctaBtn: "Start gratis proef →",
    loading: "Laden…",
    starterFeatures: ["Tot 100 leads / maand","1 branche-blueprint","AI SMS-reacties","Automatisch boeken","Lead dashboard","E-mailondersteuning"],
    growthFeatures: ["Tot 500 leads / maand","Alle branche-blueprints","AI SMS-reacties","Automatisch boeken","Opvolgingsreeksen","Volledig dashboard + analyses","Prioriteitsondersteuning"],
    proFeatures: ["Onbeperkt leads","Alle blueprints + op maat","AI SMS-reacties","Automatisch boeken","Geavanceerde opvolgingsflows","White-label (jouw merk)","Aangepaste AI-training op jouw data","Persoonlijk onboardinggesprek"],
    missing1: "💬 WhatsApp", comingSoon: "Binnenkort",
    missing2: "Opvolgingsreeksen", missing3: "White-label",
    ctaBadge: "Begin vandaag",
    ctaH2a: "Je volgende lead wacht",
    ctaH2b: "niet op jou.",
    ctaSub: "Begin in minuten met leads converteren. 50% korting op je eerste maand — geen code vereist.",
    ctaFooter: "Sportscholen · Loodgieters · Bureaus · Coaches · Influencers · Elk bedrijf met inkomende leads",
    footerCopy: "© 2025 QualyLeads. Gebouwd om te converteren.",
    nav: { features: "Functies", pricing: "Prijzen", demo: "Demo", cta: "Start gratis proef" },
    privacy: "Privacy", terms: "Voorwaarden", contact: "Contact",
  },
};

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

const INTEGRATIONS = [
  { name:"Google Forms", icon:"📋", color:"#4285f4", free:true },
  { name:"Typeform", icon:"✍️", color:"#262627", free:true },
  { name:"Facebook Ads", icon:"📘", color:"#1877f2", free:false },
  { name:"Zapier", icon:"⚡", color:"#ff4a00", free:false },
  { name:"Calendly", icon:"📅", color:"#006bff", free:true },
  { name:"Google Calendar", icon:"🗓️", color:"#4285f4", free:true },
  { name:"Webflow", icon:"🌊", color:"#4353ff", free:false },
  { name:"WordPress", icon:"🔷", color:"#21759b", free:false },
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
          <div style={{ alignSelf:"center", fontSize:10, color:MUTED2, background:SURFACE2, border:`1px solid ${BORDER}`, padding:"4px 12px", borderRadius:20, marginBottom:4 }}>Sarah M. · Gym lead · just now</div>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [lang, setLang] = useState("en");
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const t = T[lang];
  const prices = {
    USD: { starter:"$49", starterFirst:"$24.50", growth:"$99", growthFirst:"$49.50", pro:"$249", proFirst:"$124.50" },
    EUR: { starter:"€49", starterFirst:"€24.50", growth:"€99", growthFirst:"€49.50", pro:"€249", proFirst:"€124.50" },
  };
  const p = prices[currency];
  async function startCheckout(plan) {
    setCheckoutLoading(plan);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stripe/create-checkout`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ plan, currency }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch(err) { console.error("Checkout error:", err); }
    finally { setCheckoutLoading(null); }
  }
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
        .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .integrations-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start;}
        .stats-row{display:flex;gap:32px;padding-top:32px;border-top:1px solid ${BORDER};}
        .industry-strip{display:flex;justify-content:center;gap:40px;flex-wrap:wrap;}
        .nav-desktop{display:flex;gap:32px;align-items:center;}
        .nav-mobile-btn{display:none;background:none;border:none;cursor:pointer;padding:4px;}
        .mobile-menu{display:none;}
        .footer-inner{display:flex;justify-content:space-between;align-items:center;}
        .section-pad{padding:100px 40px;}
        .section-pad-sm{padding:80px 40px;}
        .hero-pad{padding:80px 40px 60px;}
        .toggle-btn{transition:all 0.2s;}
        .connect-tab{transition:all 0.2s;}
        pre{background:#1e1e2e;color:#cdd6f4;padding:16px;borderRadius:8px;fontSize:12px;overflowX:auto;lineHeight:1.6;margin:8px 0 0;}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr;gap:48px;text-align:center;}
          .hero-grid .fade-up-2{order:1;}.hero-grid>div:first-child{order:2;}
          .features-grid{grid-template-columns:1fr;}
          .integrations-grid{grid-template-columns:repeat(2,1fr);}
          .pricing-grid{grid-template-columns:1fr;}
          .stats-row{justify-content:center;gap:24px;}
          .industry-strip{gap:20px;}
          .nav-desktop{display:none;}
          .nav-mobile-btn{display:block;}
          .mobile-menu{display:flex;flex-direction:column;gap:0;background:#fff;border-top:1px solid ${BORDER};padding:8px 0;}
          .mobile-menu.hidden{display:none;}
          .mobile-menu-item{padding:14px 24px;font-size:15px;color:${TEXT};cursor:pointer;border-bottom:1px solid ${BORDER};}
          .mobile-menu-item:last-child{border-bottom:none;}
          .footer-inner{flex-direction:column;gap:16px;text-align:center;}
          .section-pad{padding:60px 20px;}.section-pad-sm{padding:60px 20px;}.hero-pad{padding:40px 20px;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.95)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ padding:"0 24px", height:104, display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:1200, margin:"0 auto" }}>
          <img src={logoSrc} alt="QualyLeads" style={{ height:90, width:"auto" }} />
          <div className="nav-desktop">
            <span className="nav-link" onClick={()=>scrollTo("features")}>{t.nav.features}</span>
            <span className="nav-link" onClick={()=>scrollTo("pricing")}>{t.nav.pricing}</span>
            <span className="nav-link" onClick={()=>scrollTo("phone-demo")}>{t.nav.demo}</span>
            <div style={{ display:"inline-flex", background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:20, padding:3 }}>
              {["en","nl"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} className="toggle-btn" style={{ padding:"4px 12px", borderRadius:16, border:"none", background:lang===l?ACCENT:"transparent", color:lang===l?"#fff":MUTED, fontSize:12, fontWeight:lang===l?600:400, cursor:"pointer", fontFamily:"inherit" }}>
                  {l==="en"?"🇺🇸 EN":"🇳🇱 NL"}
                </button>
              ))}
            </div>
            <button className="cta-primary" style={{ padding:"8px 20px", fontSize:13 }} onClick={()=>scrollTo("pricing")}>{t.nav.cta}</button>
          </div>
          <button className="nav-mobile-btn" onClick={()=>setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen?<><line x1="4" y1="4" x2="18" y2="18" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/></>:<><line x1="3" y1="6" x2="19" y2="6" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke={TEXT} strokeWidth="2" strokeLinecap="round"/></>}
            </svg>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen?"":"hidden"}`}>
          <div className="mobile-menu-item" onClick={()=>scrollTo("features")}>{t.nav.features}</div>
          <div className="mobile-menu-item" onClick={()=>scrollTo("pricing")}>{t.nav.pricing}</div>
          <div className="mobile-menu-item" onClick={()=>scrollTo("phone-demo")}>{t.nav.demo}</div>
          <div style={{ padding:"8px 24px", display:"flex", gap:8 }}>
            {["en","nl"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${lang===l?ACCENT:BORDER}`, background:lang===l?"#f0fdf4":BG, color:lang===l?ACCENT:TEXT, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                {l==="en"?"🇺🇸 English":"🇳🇱 Nederlands"}
              </button>
            ))}
          </div>
          <div style={{ padding:"12px 24px" }}>
            <button className="cta-primary" style={{ width:"100%", padding:"12px" }} onClick={()=>scrollTo("pricing")}>{t.nav.cta}</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth:1200, margin:"0 auto" }} className="hero-pad">
        <div className="hero-grid">
          <div>
            <div className="fade-up" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:20, padding:"6px 14px", marginBottom:24 }}>
              <span className="pulse" style={{ width:7, height:7, borderRadius:"50%", background:ACCENT, display:"inline-block" }} />
              <span style={{ fontSize:12, color:ACCENT, fontFamily:"'DM Mono',monospace", letterSpacing:"0.04em" }}>{t.badge}</span>
            </div>
            <h1 className="fade-up fade-up-1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(36px,5vw,60px)", lineHeight:1.08, letterSpacing:"-0.02em", color:TEXT, marginBottom:16 }}>
              {t.hero1}<br /><span style={{ fontStyle:"italic", color:ACCENT }}>{t.hero2}</span>
            </h1>
            <p className="fade-up fade-up-2" style={{ fontSize:17, color:MUTED, lineHeight:1.65, maxWidth:460, marginBottom:32 }}>{t.heroSub}</p>
            <div className="fade-up fade-up-3" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40, justifyContent:"inherit" }}>
              <button className="cta-primary" onClick={()=>scrollTo("pricing")}>{t.ctaPrimary}</button>
              <button className="cta-ghost" onClick={()=>scrollTo("phone-demo")}>{t.ctaGhost}</button>
            </div>
            <div className="fade-up fade-up-4 stats-row">
              {[{num:"10s",label:t.stat1},{num:"3×",label:t.stat2},{num:"24/7",label:t.stat3}].map(s=>(
                <div key={s.num}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:ACCENT, lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:12, color:MUTED, marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up fade-up-2" style={{ display:"flex", justifyContent:"center" }}><PhoneDemo /></div>
        </div>
      </section>

      {/* INDUSTRY STRIP */}
      <div style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, background:SURFACE, padding:"18px 24px" }}>
        <div className="industry-strip">
          {["🏋️ Gyms","🔧 Plumbers","📈 Agencies","🧑‍💼 Coaches","🎥 Creators","🦷 Dentists"].map(l=>(
            <span key={l} style={{ fontSize:13, color:MUTED }}>{l}</span>
          ))}
        </div>
      </div>

      {/* ROI */}
      <section className="section-pad" style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.dataTitle}</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,4vw,46px)", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:14, color:TEXT }}>
            {t.dataH2a}<br /><span style={{ fontStyle:"italic", color:ACCENT }}>{t.dataH2b}</span>
          </h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:500, margin:"0 auto", lineHeight:1.6 }}>{t.dataSub}</p>
        </div>
        <div style={{ border:`1px solid ${BORDER}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:SURFACE, padding:"10px 20px", borderBottom:`1px solid ${BORDER}` }}>
            {[t.dataCol1,t.dataCol2,t.dataCol3].map(h=>(<div key={h} style={{ fontSize:10, color:MUTED, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", textTransform:"uppercase" }}>{h}</div>))}
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
          <div style={{ padding:"10px 20px", background:SURFACE, borderTop:`1px solid ${BORDER}`, fontSize:10, color:MUTED2 }}>{t.dataSource}</div>
        </div>
        <div style={{ marginTop:28, padding:20, background:"rgba(22,163,74,0.05)", border:"1px solid rgba(22,163,74,0.15)", borderRadius:12, display:"flex", gap:14, alignItems:"flex-start" }}>
          <span style={{ fontSize:22, flexShrink:0 }}>💡</span>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:ACCENT, marginBottom:4 }}>{t.qualyAdvTitle}</div>
            <div style={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>{t.qualyAdvBody}</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad-sm" style={{ background:SURFACE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.howBadge}</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>{t.howH2}</h2>
          </div>
          {t.steps.map((item,i)=>(
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
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.featuresBadge}</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>{t.featuresH2}</h2>
        </div>
        <div className="features-grid">
          {t.features.map((f,i)=>(
            <div key={i} className="feature-card">
              <div style={{ fontSize:22, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:6, color:TEXT }}>{f.title}</div>
              <div style={{ fontSize:13, color:MUTED, lineHeight:1.65 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTEGRATIONS + TUTORIAL */}
      <section id="connect" className="section-pad" style={{ background:SURFACE, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.connectBadge}</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT, marginBottom:12 }}>{t.connectH2}</h2>
            <p style={{ fontSize:16, color:MUTED }}>{t.connectSub}</p>
          </div>

          {/* Integration logo grid */}
          <div className="integrations-grid" style={{ marginBottom:48 }}>
            {INTEGRATIONS.map((intg,i)=>(
              <div key={i} style={{ background:BG, border:`1px solid ${BORDER}`, borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:24 }}>{intg.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:TEXT }}>{intg.name}</div>
                  <div style={{ fontSize:11, color:intg.free?ACCENT:MUTED, fontWeight:500 }}>{intg.free?"Free":"Via Zapier"}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tutorial tabs */}
          <div style={{ background:BG, border:`1px solid ${BORDER}`, borderRadius:16, overflow:"hidden" }}>
            {/* Tab bar */}
            <div style={{ display:"flex", borderBottom:`1px solid ${BORDER}`, background:SURFACE, overflowX:"auto" }}>
              {t.connectTabs.map((tab,i)=>(
                <button key={i} onClick={()=>setActiveTab(i)} className="connect-tab" style={{
                  padding:"14px 24px", border:"none", borderBottom:`2px solid ${activeTab===i?ACCENT:"transparent"}`,
                  background:"transparent", color:activeTab===i?ACCENT:MUTED, fontSize:13, fontWeight:activeTab===i?600:400,
                  cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap",
                }}>
                  {tab}
                </button>
              ))}
            </div>
            {/* Steps */}
            <div style={{ padding:32 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
                <span style={{ fontSize:11, fontWeight:600, background:activeTab===2||activeTab===3?"#fff7ed":"#f0fdf4", color:activeTab===2||activeTab===3?"#c2410c":ACCENT, border:`1px solid ${activeTab===2||activeTab===3?"#fed7aa":"#bbf7d0"}`, padding:"3px 10px", borderRadius:20 }}>
                  {activeTab===2||activeTab===3?"Requires Zapier Professional (~€20/mo)":"✅ Free"}
                </span>
              </div>
              {t.connectSteps[activeTab].map((step,i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:"36px 1fr", gap:16, marginBottom:24, alignItems:"start" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(22,163,74,0.1)", color:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, flexShrink:0 }}>{step.n}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:TEXT, marginBottom:4 }}>{step.title}</div>
                    {step.body.includes("\n") ? (
                      <>
                        <div style={{ fontSize:13, color:MUTED, lineHeight:1.6, marginBottom:4 }}>{step.body.split("\n")[0]}</div>
                        <pre style={{ background:"#1e1e2e", color:"#cdd6f4", padding:"14px 16px", borderRadius:8, fontSize:12, overflowX:"auto", lineHeight:1.6, margin:0 }}>
                          {step.body.split("\n").slice(1).join("\n").trim()}
                        </pre>
                      </>
                    ) : (
                      <div style={{ fontSize:13, color:MUTED, lineHeight:1.6 }}>{step.body}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-pad-sm" style={{ borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(18px,3vw,28px)", lineHeight:1.4, fontStyle:"italic", marginBottom:24, color:TEXT }}>{t.testimonial}</div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>M</div>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:14, fontWeight:600, color:TEXT }}>{t.testimonialName}</div>
              <div style={{ fontSize:12, color:MUTED2 }}>{t.testimonialRole}</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP BANNER */}
      <section style={{ background:"#f0fdf4", borderTop:`1px solid #bbf7d0`, borderBottom:`1px solid #bbf7d0`, padding:"16px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", gap:12, flexWrap:"wrap" }}>
          <span style={{ fontSize:20 }}>💬</span>
          <span style={{ fontSize:14, fontWeight:600, color:"#15803d" }}>{t.waTitle}</span>
          <span style={{ fontSize:13, color:"#16a34a" }}>{t.waSub}</span>
          <span style={{ fontSize:11, fontWeight:600, background:"#16a34a", color:"#fff", padding:"2px 10px", borderRadius:20 }}>{t.waBadge}</span>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-pad" style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.pricingBadge}</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(28px,3.5vw,48px)", lineHeight:1.1, letterSpacing:"-0.02em", color:TEXT, marginBottom:14 }}>
            {t.pricingH2a}<br /><span style={{ fontStyle:"italic", color:ACCENT }}>{t.pricingH2b}</span>
          </h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:500, margin:"0 auto 8px" }}>{t.pricingSub}</p>
          <p style={{ fontSize:13, color:ACCENT, fontWeight:500, maxWidth:560, margin:"0 auto 16px" }}>{t.pricingNote}</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:20, padding:"6px 16px", fontSize:13, color:ACCENT, fontWeight:600 }}>{t.pricingBanner}</div>
          <div style={{ display:"flex", justifyContent:"center", marginTop:16 }}>
            <div style={{ display:"inline-flex", background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:24, padding:4 }}>
              {["USD","EUR"].map(c=>(
                <button key={c} onClick={()=>setCurrency(c)} className="toggle-btn" style={{ padding:"6px 22px", borderRadius:20, border:"none", background:currency===c?ACCENT:"transparent", color:currency===c?"#fff":MUTED, fontSize:13, fontWeight:currency===c?600:400, cursor:"pointer", fontFamily:"inherit" }}>
                  {c==="USD"?"🇺🇸 USD":"🇪🇺 EUR"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="pricing-grid">
          <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:16, padding:28 }}>
            <div style={{ fontSize:12, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>{t.starterName}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:6 }}>
              <div style={{ fontSize:38, fontWeight:700, color:TEXT, letterSpacing:"-0.03em", lineHeight:1 }}>{p.starter}<span style={{ fontSize:15, fontWeight:400, color:MUTED }}>/mo</span></div>
              <div style={{ fontSize:13, background:"rgba(22,163,74,0.1)", color:ACCENT, padding:"2px 10px", borderRadius:20, fontWeight:600 }}>→ {p.starterFirst} first month</div>
            </div>
            <div style={{ fontSize:12, color:MUTED, fontStyle:"italic", marginBottom:20 }}>{t.starterWho}</div>
            {t.starterFeatures.map(f=>(<div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:13, color:TEXT }}><span style={{ width:16, height:16, borderRadius:"50%", background:"rgba(22,163,74,0.1)", color:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>✓</span>{f}</div>))}
            {[[t.missing1,t.comingSoon],[t.missing2,""],[t.missing3,""]].map(([f,tag])=>(<div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:13, color:MUTED2 }}><span style={{ width:16, height:16, borderRadius:"50%", background:SURFACE2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>–</span>{f}{tag&&<span style={{ fontSize:10, background:"#f0fdf4", color:"#16a34a", padding:"1px 6px", borderRadius:10, fontWeight:600 }}>{tag}</span>}</div>))}
            <button className="cta-primary" style={{ width:"100%", marginTop:20, padding:"12px" }} onClick={()=>startCheckout("starter")}>{checkoutLoading==="starter"?t.loading:t.ctaBtn}</button>
          </div>
          <div style={{ background:"#fff", border:`2px solid ${ACCENT}`, borderRadius:16, padding:28, position:"relative", boxShadow:"0 8px 32px rgba(22,163,74,0.1)" }}>
            <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:ACCENT, color:"#fff", fontSize:11, fontWeight:600, padding:"3px 14px", borderRadius:20, whiteSpace:"nowrap" }}>{t.popular}</div>
            <div style={{ fontSize:12, fontWeight:600, color:ACCENT, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>{t.growthName}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:6 }}>
              <div style={{ fontSize:38, fontWeight:700, color:TEXT, letterSpacing:"-0.03em", lineHeight:1 }}>{p.growth}<span style={{ fontSize:15, fontWeight:400, color:MUTED }}>/mo</span></div>
              <div style={{ fontSize:13, background:"rgba(22,163,74,0.1)", color:ACCENT, padding:"2px 10px", borderRadius:20, fontWeight:600 }}>→ {p.growthFirst} first month</div>
            </div>
            <div style={{ fontSize:12, color:MUTED, fontStyle:"italic", marginBottom:20 }}>{t.growthWho}</div>
            {t.growthFeatures.map(f=>(<div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:13, color:TEXT }}><span style={{ width:16, height:16, borderRadius:"50%", background:"rgba(22,163,74,0.1)", color:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>✓</span>{f}</div>))}
            {[[t.missing1,t.comingSoon],[t.missing3,""]].map(([f,tag])=>(<div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:13, color:MUTED2 }}><span style={{ width:16, height:16, borderRadius:"50%", background:SURFACE2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>–</span>{f}{tag&&<span style={{ fontSize:10, background:"#f0fdf4", color:"#16a34a", padding:"1px 6px", borderRadius:10, fontWeight:600 }}>{tag}</span>}</div>))}
            <button className="cta-primary" style={{ width:"100%", marginTop:20, padding:"12px" }} onClick={()=>startCheckout("growth")}>{checkoutLoading==="growth"?t.loading:t.ctaBtn}</button>
          </div>
          <div style={{ background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:16, padding:28 }}>
            <div style={{ fontSize:12, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>{t.proName}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:6 }}>
              <div style={{ fontSize:38, fontWeight:700, color:TEXT, letterSpacing:"-0.03em", lineHeight:1 }}>{p.pro}<span style={{ fontSize:15, fontWeight:400, color:MUTED }}>/mo</span></div>
              <div style={{ fontSize:13, background:"rgba(22,163,74,0.1)", color:ACCENT, padding:"2px 10px", borderRadius:20, fontWeight:600 }}>→ {p.proFirst} first month</div>
            </div>
            <div style={{ fontSize:12, color:MUTED, fontStyle:"italic", marginBottom:20 }}>{t.proWho}</div>
            {t.proFeatures.map(f=>(<div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:13, color:TEXT }}><span style={{ width:16, height:16, borderRadius:"50%", background:"rgba(22,163,74,0.1)", color:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>✓</span>{f}</div>))}
            {[[t.missing1,t.comingSoon]].map(([f,tag])=>(<div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, fontSize:13, color:MUTED2 }}><span style={{ width:16, height:16, borderRadius:"50%", background:SURFACE2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0 }}>–</span>{f}{tag&&<span style={{ fontSize:10, background:"#f0fdf4", color:"#16a34a", padding:"1px 6px", borderRadius:10, fontWeight:600 }}>{tag}</span>}</div>))}
            <button className="cta-primary" style={{ width:"100%", marginTop:20, padding:"12px" }} onClick={()=>startCheckout("pro")}>{checkoutLoading==="pro"?t.loading:t.ctaBtn}</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.faqBadge}</div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-0.02em", color:TEXT }}>{t.faqH2}</h2>
        </div>
        {t.faqs.map((item,i)=>(
          <div key={i} style={{ padding:"24px 0", borderBottom:i<t.faqs.length-1?`1px solid ${BORDER}`:"none" }}>
            <div style={{ fontSize:15, fontWeight:600, color:TEXT, marginBottom:8 }}>{item.q}</div>
            <div style={{ fontSize:14, color:MUTED, lineHeight:1.7 }}>{item.a}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section id="demo" className="section-pad" style={{ textAlign:"center", background:SURFACE, borderTop:`1px solid ${BORDER}` }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:ACCENT, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:20 }}>{t.ctaBadge}</div>
        <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(32px,5vw,60px)", lineHeight:1.05, letterSpacing:"-0.03em", maxWidth:640, margin:"0 auto 16px", color:TEXT }}>
          {t.ctaH2a}<br /><span style={{ fontStyle:"italic", color:ACCENT }}>{t.ctaH2b}</span>
        </h2>
        <p style={{ fontSize:16, color:MUTED, maxWidth:400, margin:"0 auto 36px" }}>{t.ctaSub}</p>
        <button className="cta-primary" style={{ padding:"16px 40px", fontSize:16 }} onClick={()=>startCheckout("growth")}>
          {checkoutLoading==="growth"?t.loading:t.ctaBtn}
        </button>
        <p style={{ fontSize:12, color:MUTED2, marginTop:14 }}>{t.ctaFooter}</p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${BORDER}`, padding:"28px 24px", background:"#fff" }}>
        <div className="footer-inner" style={{ maxWidth:1100, margin:"0 auto" }}>
          <img src={logoSrc} alt="QualyLeads" style={{ height:36, width:"auto" }} />
          <div style={{ fontSize:12, color:MUTED2 }}>{t.footerCopy}</div>
          <div style={{ display:"flex", gap:20 }}>
            <a href="/privacy" className="nav-link" style={{ fontSize:12 }}>{t.privacy}</a>
            <span className="nav-link" style={{ fontSize:12 }}>{t.terms}</span>
            <span className="nav-link" style={{ fontSize:12 }}>{t.contact}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
