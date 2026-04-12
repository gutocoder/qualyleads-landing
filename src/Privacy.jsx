const ACCENT = "#16a34a";
const TEXT = "#111827";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";

export default function Privacy() {
  return (
    <div style={{ minHeight:"100vh", background:"#fff", fontFamily:"'DM Sans',system-ui,sans-serif", color:TEXT }}>
      <nav style={{ borderBottom:`1px solid ${BORDER}`, padding:"20px 40px", display:"flex", alignItems:"center", gap:12 }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", color:TEXT }}>
          <div style={{ width:28, height:28, borderRadius:6, background:ACCENT, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff" }}>Q</div>
          <span style={{ fontSize:15, fontWeight:600 }}>QualyLeads</span>
        </a>
        <span style={{ color:MUTED }}>/ Privacy Policy</span>
      </nav>
      <div style={{ maxWidth:760, margin:"60px auto", padding:"0 40px 80px" }}>
        <h1 style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.02em", marginBottom:8 }}>Privacy Policy</h1>
        <p style={{ color:MUTED, marginBottom:48 }}>Last updated: April 2026</p>

        {[
          { title:"1. Who we are", body:`QualyLeads is operated by Gustavo Muller Adade, based in the Netherlands. We provide an AI-powered SMS lead qualification service for small and medium-sized businesses.\n\nContact: gustavo@qualyleads.com` },
          { title:"2. What data we collect", body:`We collect and process the following data:\n\n• Business owner information: name, email address, phone number, business name, industry\n• Lead data: name and phone number of your leads (provided by you via webhook)\n• Conversation data: SMS messages between Qualy and your leads\n• Usage data: login activity, dashboard usage\n• Payment data: processed by Stripe — we do not store card details` },
          { title:"3. How we use your data", body:`We use your data to:\n\n• Provide the QualyLeads service (sending and receiving SMS messages)\n• Process payments via Stripe\n• Send you transactional emails (welcome, invoices)\n• Improve our AI blueprints and service quality\n\nWe do not sell your data to third parties. We do not use your data for advertising.` },
          { title:"4. Where your data is stored", body:`All data is stored in the European Union:\n\n• Database: Supabase (EU region)\n• SMS: Twilio (EU data processing agreement in place)\n• Payments: Stripe (EU)\n\nWe are compliant with the General Data Protection Regulation (GDPR).` },
          { title:"5. Your lead data (your responsibility)", body:`When you use QualyLeads, you send your customers' phone numbers to our system. You are the data controller for your leads' personal data. You are responsible for:\n\n• Having a lawful basis to contact your leads via SMS\n• Informing your leads that they may receive automated SMS messages\n• Responding to any data subject requests from your leads` },
          { title:"6. Your rights", body:`Under GDPR, you have the right to:\n\n• Access your personal data\n• Correct inaccurate data\n• Delete your data ("right to be forgotten")\n• Export your data in a portable format\n• Object to processing\n\nTo exercise any of these rights, contact us at gustavo@qualyleads.com. We will respond within 30 days.` },
          { title:"7. Data retention", body:`We retain your data for as long as your account is active. When you cancel your subscription:\n\n• Your account data is retained for 30 days then deleted\n• Lead and conversation data is deleted upon request\n• Payment records are retained for 7 years as required by law (Stripe)` },
          { title:"8. Cookies", body:`QualyLeads uses only essential cookies required for authentication (Supabase session token). We do not use tracking cookies or advertising cookies.` },
          { title:"9. Third-party services", body:`We use the following third-party services:\n\n• Supabase — database and authentication (supabase.com)\n• Twilio — SMS delivery (twilio.com)\n• Stripe — payment processing (stripe.com)\n• OpenAI — AI message generation (openai.com)\n• Netlify — website hosting (netlify.com)\n• Railway — backend hosting (railway.app)\n\nEach provider has their own privacy policy and GDPR compliance measures.` },
          { title:"10. Changes to this policy", body:`We may update this policy from time to time. We will notify active clients of any significant changes via email. The latest version is always available at qualyleads.com/privacy.` },
          { title:"11. Contact", body:`For any privacy-related questions or requests:\n\nGustavo Muller Adade\ngustavo@qualyleads.com\nQualyLeads — Netherlands` },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:18, fontWeight:600, marginBottom:12, color:TEXT }}>{section.title}</h2>
            <div style={{ fontSize:15, color:MUTED, lineHeight:1.8, whiteSpace:"pre-line" }}>{section.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
