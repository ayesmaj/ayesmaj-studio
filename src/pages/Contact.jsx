import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, Mail, MapPin, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';
import CircuitBackground from '@/components/home/CircuitBackground';

export default function Contact() {
  const urlParams = new URLSearchParams(window.location.search);
  const prefillMessage = urlParams.get('message') || '';
  const prefillSubject = urlParams.get('subject') || '';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: prefillSubject, message: prefillMessage, honeypot: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const response = await base44.functions.invoke('submitContact', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        pageUrl: window.location.href,
        honeypot: form.honeypot
      });

      if (response.data.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
        
        // Save to database for internal tracking
        await base44.entities.ContactSubmission.create({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message
        });

        base44.analytics.track({
          eventName: 'quote_request_completed',
          properties: {
            subject: form.subject || 'Not specified',
            has_phone: !!form.phone,
          },
        });
      } else {
        setStatus('error');
        setErrors({ submit: response.data.error || 'Failed to send message' });
      }
    } catch (error) {
      setStatus('error');
      setErrors({ submit: error.message || 'Failed to send message' });
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0B0F0C' }}>
      <CircuitBackground />
      <HomeNav />

      <main className="relative z-10 pt-36 pb-0 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero text */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
           className="mb-20 text-center"
          >
           <p className="text-xs tracking-[0.5em] text-[#00C46A] uppercase mb-4">GET IN TOUCH</p>
           <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
             Let's build something<br />
             <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', color: 'transparent' }}>remarkable.</span>
           </h1>
           <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
             Whether you have a project in mind or just want to explore what's possible — we're here.
           </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 mb-0">

            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="space-y-10">
                <div>
                  <h3 className="text-white font-bold text-sm mb-3 tracking-widest flex items-center gap-2">
                    <Mail size={14} style={{ color: '#00C46A' }} /> EMAIL
                  </h3>
                  <a href="mailto:info@ayesmaj.io" className="text-white hover:text-[#00C46A] transition-colors text-sm">ayesmajstudios@gmail.com</a>
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm mb-3 tracking-widest flex items-center gap-2">
                    <MapPin size={14} style={{ color: '#00C46A' }} /> STUDIO LOCATIONS
                  </h3>
                  <p className="text-gray-400 text-sm">Los Angeles · London · Dubai</p>
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm mb-3 tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00C46A' }} /> SYSTEMS ONLINE
                  </h3>
                  <p className="text-gray-500 text-sm">We typically respond within 24 hours. For urgent projects, mention it in your message.</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {status === 'idle' || status === 'loading' || status === 'error' ? (
                  <motion.form key="form" onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                   >
                    {/* Form title */}
                    <h2 className="text-lg font-bold text-white tracking-wide">MESSAGE</h2>

                    {/* Error message */}
                     {errors.submit && (
                       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                         className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
                       >
                         {errors.submit}
                         {errors.submit.includes('Too many') && (
                           <button
                             type="button"
                             onClick={() => { setStatus('idle'); setErrors({}); }}
                             className="block mt-2 text-red-300 underline hover:text-red-200"
                           >
                             Try again
                           </button>
                         )}
                       </motion.div>
                     )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Your Name *" type="text" placeholder="Alex Johnson" value={form.name} onChange={v => set('name', v)} error={errors.name} />
                      <Field label="Email Address *" type="email" placeholder="alex@brand.com" value={form.email} onChange={v => set('email', v)} error={errors.email} />
                      <Field label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" value={form.phone} onChange={v => set('phone', v)} />
                      <div></div>
                    </div>

                    <Field label="Subject" type="text" placeholder="Project inquiry, collaboration…" value={form.subject} onChange={v => set('subject', v)} />

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500 font-medium tracking-wider uppercase">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        placeholder="Tell us about your project, timeline, and goals…"
                        rows={6}
                        className={`bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors resize-none placeholder:text-gray-600 ${
                          errors.message ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.08] focus:border-[#00ff77]/40'
                        }`}
                      />
                      {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                    </div>

                    {/* Honeypot field (hidden) */}
                    <input type="text" name="website" value={form.honeypot} onChange={e => set('honeypot', e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <div className="flex justify-end pt-6">
                       <button type="submit"
                         disabled={status === 'loading' || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                         className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#00C46A] text-black font-bold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,196,106,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         {status === 'loading' ? (
                           <><Loader2 size={16} className="animate-spin" /> Sending</>
                         ) : (
                           <>Send Message <ArrowRight size={14} /></>
                         )}
                       </button>
                     </div>
                  </motion.form>
                  ) : status === 'success' ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-[#00ff77]/20 bg-[#00ff77]/5 p-10 flex flex-col items-center text-center gap-5"
                  >
                    <CheckCircle size={40} className="text-[#00ff77]" />
                    <h3 className="text-white font-bold text-2xl">Message sent.</h3>
                    <p className="text-gray-400 max-w-sm">We'll reply soon.</p>
                    <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',subject:'',message:'',honeypot:'' }); setErrors({}); }}
                      className="text-sm text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2 mt-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                  ) : (
                  <motion.div key="error"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 flex flex-col items-center text-center gap-5"
                  >
                    <div className="text-4xl">⚠️</div>
                    <h3 className="text-white font-bold text-2xl">Something went wrong.</h3>
                    <p className="text-gray-400 max-w-sm">{errors.submit || 'Please try again or contact us directly.'}</p>
                    <button onClick={() => { setStatus('idle'); setErrors({}); }}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors underline underline-offset-2 mt-2"
                    >
                      Try again
                    </button>
                  </motion.div>
                  )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-gray-500 font-medium tracking-wider uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-gray-600 ${
          error ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/[0.08] focus:border-[#00ff77]/40'
        }`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}