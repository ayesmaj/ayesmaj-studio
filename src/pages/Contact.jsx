import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, Mail, MapPin, Clock, Phone } from 'lucide-react';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';
import CircuitBackground from '@/components/home/CircuitBackground';
import { ContactCard } from '@/components/ui/contact-card';

const CONTACT_INFO = [
  { icon: Mail,   label: 'Email',    value: 'ayesmajstudios@gmail.com' },
  { icon: Phone,  label: 'Phone',    value: '+1 (509) 319-7999' },
  { icon: MapPin, label: 'Location', value: 'Phoenix, Arizona' },
  { icon: Clock,  label: 'Response', value: 'Within 24 hours' },
];

export default function Contact() {
  const urlParams = new URLSearchParams(window.location.search);
  const prefillMessage = urlParams.get('message') || '';
  const prefillSubject = urlParams.get('subject') || '';

  const [form, setForm]   = useState({ name: '', email: '', phone: '', subject: prefillSubject, message: prefillMessage, honeypot: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateForm = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'a968ab33-a419-42db-9206-f3bddf198e7e', // ← replace after setup
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject || 'New project inquiry – AYESMAJ Studios',
          message: form.message,
          // also notify via SMS gateway email
          cc: '5093197999@vtext.com', // ← change to your carrier gateway if needed
          from_name: 'AYESMAJ Studios Contact Form',
          botcheck: form.honeypot,
        }),
      });
      const data = await res.json();
      if (data.success) {
        // WhatsApp notification via Callmebot (no-cors to bypass browser CORS block)
        try {
          const waText = encodeURIComponent(
            `🔔 New inquiry!\nFrom: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}\nSubject: ${form.subject || 'No subject'}\nMessage: ${form.message.slice(0, 300)}${form.message.length > 300 ? '…' : ''}`
          );
          await fetch(`https://api.callmebot.com/whatsapp.php?phone=15093197999&text=${waText}&apikey=8010280`, { mode: 'no-cors' });
        } catch (_) { /* silent — email already delivered */ }

        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setErrors({ submit: data.message || 'Failed to send. Please try again.' });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ submit: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-clip" style={{ background: '#07100A' }}>
      <CircuitBackground />
      <HomeNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E', fontFamily: 'Satoshi, sans-serif' }}>
              GET IN TOUCH
            </p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6" style={{ color: '#F2EDE4', fontFamily: 'Satoshi, sans-serif', letterSpacing: '-0.04em' }}>
              Let's build something<br />
              <span style={{
                backgroundImage: 'linear-gradient(125deg, #E8C96D 0%, #C8A44E 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>remarkable.</span>
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(242,237,228,0.45)', fontFamily: 'Satoshi, sans-serif' }}>
              Whether you have a project in mind or just want to explore what's possible — we're here.
            </p>
          </motion.div>

          {/* ContactCard */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
          >
            <ContactCard
              title="Start Your Project"
              description="Tell us about your vision. Whether it's a product launch, brand campaign, or cinematic showpiece — we craft visuals that make an impact."
              contactInfo={CONTACT_INFO}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="w-full flex flex-col items-center justify-center text-center gap-5 py-8"
                  >
                    <CheckCircle size={44} style={{ color: '#C8A44E' }} />
                    <h3 className="font-bold text-2xl" style={{ color: '#F2EDE4', fontFamily: 'Satoshi, sans-serif' }}>Message sent.</h3>
                    <p style={{ color: 'rgba(242,237,228,0.5)', fontFamily: 'Satoshi, sans-serif', fontSize: 14 }}>We'll reply within 24 hours.</p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',subject:'',message:'',honeypot:'' }); setErrors({}); }}
                      className="text-sm underline underline-offset-2 transition-colors"
                      style={{ color: 'rgba(200,164,78,0.6)', fontFamily: 'Satoshi, sans-serif' }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="w-full space-y-4"
                  >
                    {errors.submit && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl text-xs"
                        style={{ background: 'rgba(200,50,50,0.1)', border: '1px solid rgba(200,50,50,0.2)', color: '#f87171' }}
                      >
                        {errors.submit}
                      </motion.div>
                    )}

                    <Field label="Your Name *"     type="text"  placeholder="Alex Johnson"       value={form.name}    onChange={v => set('name', v)}    error={errors.name} />
                    <Field label="Email Address *" type="email" placeholder="alex@brand.com"     value={form.email}   onChange={v => set('email', v)}   error={errors.email} />
                    <Field label="Phone"           type="tel"   placeholder="+1 (555) 123-4567"  value={form.phone}   onChange={v => set('phone', v)} />
                    <Field label="Subject"         type="text"  placeholder="Project inquiry…"   value={form.subject} onChange={v => set('subject', v)} />

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(200,164,78,0.7)', fontFamily: 'Satoshi, sans-serif' }}>
                        Message *
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        placeholder="Tell us about your project, timeline, and goals…"
                        rows={4}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: errors.message ? '1px solid rgba(200,50,50,0.5)' : '1px solid rgba(200,164,78,0.15)',
                          borderRadius: 12, padding: '10px 14px',
                          color: '#F2EDE4', fontSize: 13,
                          fontFamily: 'Satoshi, sans-serif',
                          outline: 'none', resize: 'none', width: '100%',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(200,164,78,0.4)'}
                        onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(200,50,50,0.5)' : 'rgba(200,164,78,0.15)'}
                      />
                      {errors.message && <span className="text-xs" style={{ color: '#f87171' }}>{errors.message}</span>}
                    </div>

                    {/* Honeypot */}
                    <input type="text" name="website" value={form.honeypot} onChange={e => set('honeypot', e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <button
                      type="submit"
                      disabled={status === 'loading' || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #C8A44E 0%, #9A7B3A 100%)',
                        color: '#07100A', fontFamily: 'Satoshi, sans-serif',
                        boxShadow: '0 0 32px rgba(200,164,78,0.25)',
                      }}
                    >
                      {status === 'loading' ? (
                        <><Loader2 size={15} className="animate-spin" /> Sending…</>
                      ) : (
                        <>Send Message <ArrowRight size={14} /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </ContactCard>
          </motion.div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(200,164,78,0.7)', fontFamily: 'Satoshi, sans-serif' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: error ? '1px solid rgba(200,50,50,0.5)' : '1px solid rgba(200,164,78,0.15)',
          borderRadius: 12, padding: '10px 14px',
          color: '#F2EDE4', fontSize: 13,
          fontFamily: 'Satoshi, sans-serif',
          outline: 'none', width: '100%',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(200,164,78,0.4)'}
        onBlur={e => e.target.style.borderColor = error ? 'rgba(200,50,50,0.5)' : 'rgba(200,164,78,0.15)'}
      />
      {error && <span className="text-xs" style={{ color: '#f87171' }}>{error}</span>}
    </div>
  );
}
