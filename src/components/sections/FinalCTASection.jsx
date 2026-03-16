import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, Sparkles, Clock, Users, Mail } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const SERVICE_OPTIONS = [
  '3D Animation', 'Product Visualization', 'CGI Commercial', 'Motion Graphics', 'Brand Identity', 'AI-Enhanced Creative', 'Other'
];

const ROUTING_MAP = {
  '3D Animation':          { team: '3D Production Team',      color: '#D4A853', eta: '4–6 hours' },
  'Product Visualization': { team: 'Visualization Team',      color: '#D4A853', eta: '4–6 hours' },
  'CGI Commercial':        { team: 'Commercial Division',     color: '#2d8a4e', eta: '2–4 hours' },
  'Motion Graphics':       { team: 'Motion Design Team',      color: '#D4A853', eta: '4–6 hours' },
  'Brand Identity':        { team: 'Brand Strategy Team',     color: '#2d8a4e', eta: '6–8 hours' },
  'AI-Enhanced Creative':  { team: 'AI & Innovation Lab',     color: '#2d8a4e', eta: '2–4 hours' },
  'Other':                 { team: 'General Inquiries Team',  color: '#888',    eta: '24 hours'  },
};

export default function FinalCTASection() {
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', description: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) return;
    setStatus('loading');

    const aiResult = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an intake assistant for AYESMAJ Studios, a premium 3D animation studio.

A potential client has submitted this inquiry:
- Name: ${form.name}
- Service interested in: ${form.service || 'Not specified'}
- Budget range: ${form.budget || 'Not specified'}
- Project description: "${form.description}"

Your task:
1. Categorize the inquiry into one of these service categories: 3D Animation, Product Visualization, CGI Commercial, Motion Graphics, Brand Identity, AI-Enhanced Creative, Other
2. Assess the project complexity: Simple, Standard, or Complex
3. Write a personalized, warm, professional follow-up email from AYESMAJ Studios to the client. The email should:
   - Address them by first name
   - Acknowledge their specific project request
   - Set clear expectations on next steps (a senior producer will review their brief and contact them within the response time)
   - Feel premium and human, not robotic
   - Be concise (3-4 short paragraphs max)
   - Sign off as "The AYESMAJ Studios Team"
4. Provide a short internal routing note (1 sentence) explaining why you routed to this category.

Return JSON only.`,
      response_json_schema: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          complexity: { type: 'string' },
          email_subject: { type: 'string' },
          email_body: { type: 'string' },
          routing_note: { type: 'string' },
        }
      }
    });

    const routing = ROUTING_MAP[aiResult.category] || ROUTING_MAP['Other'];
    setResult({ ...aiResult, routing });
    setStatus('success');
  };

  return (
    <section id="contact" className="relative py-36 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, #D4A853 0%, #2d8a4e 40%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
            className="w-20 h-[1.5px] mx-auto mb-10 origin-left"
            style={{ background: 'linear-gradient(to right, #D4A853, #2d8a4e)' }}
          />
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-4">Let's Create</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            Ready to make your<br />
            <span className="bg-gradient-to-r from-[#D4A853] via-[#E8C975] to-[#2d8a4e] bg-clip-text text-transparent">brand cinematic?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            Tell us about your project and our AI will instantly route you to the right team.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {/* FORM */}
          {status !== 'success' && (
            <motion.form key="form" onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 space-y-6"
            >
              {/* Glass top accent */}
              <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-3xl"
                style={{ background: 'linear-gradient(to right, transparent, #D4A85330, transparent)' }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Your Name *" type="text" placeholder="Alex Johnson"
                  value={form.name} onChange={v => set('name', v)} />
                <Field label="Email Address *" type="email" placeholder="alex@brand.com"
                  value={form.email} onChange={v => set('email', v)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 font-medium tracking-wider uppercase">Service</label>
                  <select value={form.service} onChange={e => set('service', e.target.value)}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#111]">Select a service…</option>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
                  </select>
                </div>
                <Field label="Estimated Budget" type="text" placeholder="e.g. $10,000–$20,000"
                  value={form.budget} onChange={v => set('budget', v)} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 font-medium tracking-wider uppercase">Project Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Tell us about your project — what you're making, for what brand, timeline, and any references you love…"
                  rows={5}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-colors resize-none placeholder:text-gray-600"
                />
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Sparkles size={12} className="text-[#D4A853]" />
                  AI will analyze & route your inquiry instantly
                </div>
                <button type="submit" disabled={status === 'loading' || !form.name || !form.email || !form.description}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#B8860B] text-black font-bold text-sm transition-all duration-300 hover:shadow-[0_0_36px_rgba(212,168,83,0.45)] hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Analyzing…</>
                  ) : (
                    <>Send Inquiry <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* SUCCESS */}
          {status === 'success' && result && (
            <motion.div key="success"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Top status card */}
              <div className="rounded-3xl border border-[#2d8a4e]/30 bg-[#2d8a4e]/8 p-7 flex items-start gap-4">
                <CheckCircle size={24} className="text-[#2d8a4e] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Inquiry received — you're all set.</h3>
                  <p className="text-gray-400 text-sm">Our AI has analyzed your project and routed it to the right team. Check below for your personalized next steps.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Routing card */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#D4A853] tracking-widest uppercase font-medium">
                    <Users size={13} /> Routed To
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl mb-1">{result.routing.team}</div>
                    <div className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border"
                      style={{ borderColor: result.routing.color + '40', color: result.routing.color, background: result.routing.color + '10' }}>
                      {result.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 pt-1 border-t border-white/[0.05]">
                    <Clock size={14} className="text-gray-600" />
                    Expected response: <span className="text-white font-medium">{result.routing.eta}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1 uppercase tracking-wider">Complexity</p>
                    <span className={`text-sm font-semibold ${result.complexity === 'Complex' ? 'text-[#D4A853]' : result.complexity === 'Standard' ? 'text-blue-400' : 'text-[#2d8a4e]'}`}>
                      {result.complexity}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs italic border-t border-white/[0.05] pt-3">
                    {result.routing_note}
                  </p>
                </div>

                {/* Email draft card */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-[#D4A853] tracking-widest uppercase font-medium">
                    <Mail size={13} /> Your Follow-Up Email
                  </div>
                  <div className="text-xs text-gray-500">Subject: <span className="text-gray-300">{result.email_subject}</span></div>
                  <div className="flex-1 overflow-y-auto max-h-52 text-sm text-gray-400 leading-relaxed whitespace-pre-wrap border-t border-white/[0.05] pt-3 scrollbar-thin">
                    {result.email_body}
                  </div>
                  <button
                    onClick={() => {
                      const mailto = `mailto:${form.email}?subject=${encodeURIComponent(result.email_subject)}&body=${encodeURIComponent(result.email_body)}`;
                      window.open(mailto, '_blank');
                    }}
                    className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-[#D4A853] hover:text-[#E8C975] transition-colors pt-2"
                  >
                    <Mail size={12} /> Open in email client
                  </button>
                </div>
              </div>

              {/* Reset */}
              <div className="text-center pt-2">
                <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',service:'',budget:'',description:'' }); setResult(null); }}
                  className="text-sm text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2"
                >
                  Submit another inquiry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          Or email directly:{' '}
          <a href="mailto:hello@ayesmaj.com" className="text-[#D4A853] hover:text-[#E8C975] transition-colors">hello@ayesmaj.com</a>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-500 font-medium tracking-wider uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-colors placeholder:text-gray-600"
      />
    </div>
  );
}