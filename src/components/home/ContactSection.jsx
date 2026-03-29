import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Phone } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const PROJECT_TYPES = [
  'Product Animation', 'Brand Film', 'Food Commercial', 'Character Design',
  'Motion Graphics', 'Brand Identity', 'Other',
];

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: '#C8A44E' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: 'rgba(10,20,10,0.06)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '10px',
  padding: '12px 16px',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.3s',
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', project_type: '', message: '' });
  const [status, setStatus] = useState('idle');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    await base44.entities.ContactSubmission.create({
      name: form.name,
      email: form.email,
      subject: form.project_type || 'General Inquiry',
      message: `WhatsApp: ${form.whatsapp || '—'}\n\nProject Type: ${form.project_type || '—'}\n\n${form.message}`,
    });
    base44.analytics.track({
      eventName: 'contact_form_submitted',
      properties: {
        project_type: form.project_type || 'Not specified',
        has_whatsapp: !!form.whatsapp,
      },
    });
    setStatus('success');
    setForm({ name: '', email: '', whatsapp: '', project_type: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" style={{ background: 'transparent', scrollMarginTop: '90px' }}>

      {/* Soft glow background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,20,10,0.08) 0%, transparent 70%)' }} />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.12), transparent)' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div {...fade(0)} className="text-center mb-14">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E' }}>Get Started</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Let's Build Something<br />
            <span style={{ color: '#C8A44E' }}>Cinematic.</span>
          </h2>

          {/* Call Now button */}
          <div className="mt-8 flex justify-center">
            <a
              href="tel:5093197999"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #E8C96D 0%, #C8A44E 100%)',
                color: '#07100A',
                boxShadow: '0 0 32px rgba(200,164,78,0.4), 0 4px 20px rgba(0,0,0,0.4)',
                fontSize: '16px', letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 52px rgba(200,164,78,0.6), 0 4px 28px rgba(0,0,0,0.5)';
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 32px rgba(200,164,78,0.4), 0 4px 20px rgba(0,0,0,0.4)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Phone size={20} />
              Call Now — (509) 319-7999
            </a>
          </div>

          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            — or fill out the form below —
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 flex flex-col items-center gap-4">
            <CheckCircle size={48} style={{ color: '#C8A44E' }} />
            <h3 className="text-white font-bold text-2xl">Message Received.</h3>
            <p className="text-gray-500">We'll get back to you within 24 hours.</p>
            <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',whatsapp:'',project_type:'',message:'' }); }}
              className="text-sm text-gray-600 hover:text-gray-400 transition-colors underline mt-2">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form {...fade(0.1)} onSubmit={handleSubmit}
            className="relative rounded-3xl p-8 md:p-12 space-y-6"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>

            {/* Green top line */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.4), transparent)' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Your Name *">
                <input value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Alex Johnson" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,164,78,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
              </Field>
              <Field label="Email Address *">
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@company.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,164,78,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="WhatsApp">
                <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)}
                  placeholder="+1 234 567 8900" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(200,164,78,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
              </Field>
              <Field label="Project Type">
                <select value={form.project_type} onChange={e => set('project_type', e.target.value)}
                  style={{ ...inputStyle, color: form.project_type ? 'white' : '#555' }}>
                  <option value="">Select type…</option>
                  {PROJECT_TYPES.map(t => <option key={t} value={t} style={{ background: '#0B0F0C' }}>{t}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Message *">
              <textarea value={form.message} onChange={e => set('message', e.target.value)}
                placeholder="Tell us about your project, timeline, goals…"
                rows={5} style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => e.target.style.borderColor = 'rgba(200,164,78,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
            </Field>

            <div className="flex justify-center pt-2">
              <button type="submit"
                disabled={status === 'loading' || !form.name || !form.email || !form.message}
                className="px-12 py-4 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-400 disabled:opacity-40"
                style={{ background: 'rgba(200,164,78,0.08)', border: '1.5px solid rgba(200,164,78,0.6)', color: '#C8A44E' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(200,164,78,0.3)'; e.currentTarget.style.borderColor = 'rgba(200,164,78,0.7)'; e.currentTarget.style.color = '#C8A44E'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(200,164,78,0.6)'; e.currentTarget.style.color = '#C8A44E'; }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Sending…</span>
                ) : 'Send Message'}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}