import React, { useState, useEffect } from 'react';
import Seo from '@/components/ayesmaj/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, Mail, MapPin, Clock, Phone } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { COLORS, FONTS } from '@/components/ayesmaj/theme';

const GOLD = '#FFB000';
const GOLD_RGB = '255,176,0';

const getContactEndpoint = () => (
  ['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? 'https://ayesmajstudios.com/api/project-intake'
    : '/api/project-intake'
);

const CONTACT_INFO = [
  { icon: Mail,   label: 'Email',    value: 'ayesmajstudios@gmail.com' },
  { icon: Phone,  label: 'Phone',    value: '+1 (509) 319-7999' },
  { icon: MapPin, label: 'Location', value: 'Phoenix, Arizona' },
  { icon: Clock,  label: 'Response', value: 'Within 24 hours' },
];

const SERVICES = ['Brand strategy', 'Website', 'AI content', '3D & CGI', 'Full brand world'];
const BUDGETS = ['Under $2k', '$2k - $5k', '$5k - $15k', '$15k+'];
const TIMELINES = ['ASAP', '1-2 months', '3-6 months', 'Exploring'];
const PROJECT_TYPES = ['New launch', 'Rebrand', 'Campaign', 'Ongoing partner'];

const emptyContactForm = (subject = '', message = '') => ({
  name: '', email: '', company: '', website: '', phone: '', subject,
  service: '', budget: '', timeline: '', projectType: '', message, honeypot: '',
});

export default function Contact() {
  useEffect(() => { document.title = 'Contact — AYESMAJ Studios'; }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const prefillMessage = urlParams.get('message') || '';
  const prefillSubject = urlParams.get('subject') || '';

  const [form, setForm] = useState(() => emptyContactForm(prefillSubject, prefillMessage));
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateForm = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (form.website.trim() && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}/i.test(form.website)) e.website = 'Enter a valid website';
    if (!form.service.trim()) e.service = 'Primary service is required';
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
      const res = await fetch(getContactEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          website: form.website,
          phone: form.phone,
          service: form.service,
          budget: form.budget,
          timeline: form.timeline,
          projectType: form.projectType,
          subject: form.subject || 'New project inquiry – AYESMAJ Studios',
          message: form.message,
          honeypot: form.honeypot,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // WhatsApp notification via Callmebot (no-cors to bypass browser CORS block)
        try {
          const waExtra = `\nCompany: ${form.company || 'Not provided'}\nWebsite: ${form.website || 'Not provided'}\nService: ${form.service}\nBudget: ${form.budget || 'Not provided'}\nTimeline: ${form.timeline || 'Not provided'}\nProject type: ${form.projectType || 'Not provided'}`;
          const waText = encodeURIComponent(
            `🔔 New inquiry!\nFrom: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}\nSubject: ${form.subject || 'No subject'}\nMessage: ${form.message.slice(0, 300)}${form.message.length > 300 ? '…' : ''}`
            + waExtra
          );
          await fetch(`https://api.callmebot.com/whatsapp.php?phone=15093197999&text=${waText}&apikey=8010280`, { mode: 'no-cors' });
        } catch (_) { /* silent — email already delivered */ }

        setStatus('success');
        setForm(emptyContactForm());
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
    <div style={{ background: COLORS.black, minHeight: '100vh', overflowX: 'clip', color: COLORS.white }}>
      <Seo
        title="Contact — AYESMAJ Studios"
        description="Start a project with AYESMAJ Studios. Based in Phoenix, Arizona and working worldwide — we respond within 24 hours."
        path="/Contact"
      />
      <AyesmajNav />

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at 50% 0%, rgba(${GOLD_RGB},0.10), transparent 55%)`,
      }} />

      <main style={{ position: 'relative', zIndex: 10, padding: '160px clamp(24px,5vw,80px) 120px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}
          >
            <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 18 }}>
              Get In Touch
            </p>
            <h1 style={{
              fontFamily: FONTS.display, fontSize: 'clamp(40px,7vw,104px)', fontWeight: 800,
              lineHeight: 0.92, letterSpacing: '-0.01em', textTransform: 'uppercase', color: COLORS.white, margin: 0,
            }}>
              Let's Build Something<br />
              <span style={{
                background: `linear-gradient(125deg, #FFD36A 0%, ${GOLD} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Remarkable.</span>
            </h1>
            <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.3vw,18px)', color: COLORS.gray, maxWidth: 580, margin: '24px auto 0', lineHeight: 1.6 }}>
              Whether you have a project in mind or just want to explore what's possible — we're here.
            </p>
          </motion.div>

          {/* Grid: info + form */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 'clamp(28px,4vw,56px)', alignItems: 'start' }} className="ayes-contact-grid">

            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(24px,2.6vw,38px)', fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: '0 0 14px' }}>
                Start Your Project
              </h2>
              <p style={{ fontFamily: FONTS.ui, fontSize: 15.5, lineHeight: 1.7, color: COLORS.gray, marginBottom: 36 }}>
                Tell us about your vision. Whether it's a product launch, brand campaign, or cinematic showpiece — we craft visuals that make an impact.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px',
                    borderRadius: 14, background: COLORS.glass, border: `1px solid rgba(${GOLD_RGB},0.16)`,
                  }}>
                    <div style={{
                      width: 42, height: 42, flexShrink: 0, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `rgba(${GOLD_RGB},0.10)`, border: `1px solid rgba(${GOLD_RGB},0.25)`,
                    }}>
                      <Icon size={18} color={GOLD} />
                    </div>
                    <div>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 3 }}>{label}</div>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 15, color: COLORS.white }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                borderRadius: 20, padding: 'clamp(24px,3vw,40px)',
                background: COLORS.glass, border: `1px solid ${COLORS.border}`,
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18, padding: '40px 0' }}
                  >
                    <CheckCircle size={48} style={{ color: GOLD }} />
                    <h3 style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>Message Sent.</h3>
                    <p style={{ fontFamily: FONTS.ui, color: COLORS.gray, fontSize: 15, margin: 0 }}>We'll reply within 24 hours.</p>
                    <button
                      onClick={() => { setStatus('idle'); setForm(emptyContactForm()); setErrors({}); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONTS.ui, fontSize: 13, color: GOLD, textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                  >
                    {errors.submit && (
                      <div style={{ padding: 12, borderRadius: 12, fontSize: 12.5, fontFamily: FONTS.ui, background: 'rgba(224,90,90,0.1)', border: '1px solid rgba(224,90,90,0.25)', color: '#f87171' }}>
                        {errors.submit}
                      </div>
                    )}

                    <div className="ayes-contact-fields">
                    <Field id="contact-name" label="Your Name *" type="text" placeholder="Alex Johnson" value={form.name} onChange={v => set('name', v)} error={errors.name} autoComplete="name" />
                    <Field id="contact-email" label="Email Address *" type="email" placeholder="alex@brand.com" value={form.email} onChange={v => set('email', v)} error={errors.email} autoComplete="email" />
                    <Field id="contact-company" label="Company" type="text" placeholder="Brand or company" value={form.company} onChange={v => set('company', v)} autoComplete="organization" />
                    <Field id="contact-website" label="Website (optional)" type="url" placeholder="company.com" value={form.website} onChange={v => set('website', v)} error={errors.website} autoComplete="url" />
                    <Field id="contact-phone" label="Phone" type="tel" placeholder="+1 (555) 123-4567" value={form.phone} onChange={v => set('phone', v)} autoComplete="tel" />
                    <Field label="Subject"         type="text"  placeholder="Project inquiry…"  value={form.subject} onChange={v => set('subject', v)} />

                    <SelectField id="contact-service" label="Primary Service *" value={form.service} onChange={v => set('service', v)} options={SERVICES} error={errors.service} />
                    <SelectField id="contact-budget" label="Budget" value={form.budget} onChange={v => set('budget', v)} options={BUDGETS} />
                    <SelectField id="contact-timeline" label="Timeline" value={form.timeline} onChange={v => set('timeline', v)} options={TIMELINES} />
                    <SelectField id="contact-project-type" label="Project Type" value={form.projectType} onChange={v => set('projectType', v)} options={PROJECT_TYPES} />

                    <div className="ayes-contact-full" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <label htmlFor="contact-message" style={labelStyle}>The Brief *</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        placeholder="Tell us about your project, timeline, and goals…"
                        rows={4}
                        style={{ ...inputStyle, resize: 'none', borderColor: errors.message ? 'rgba(224,90,90,0.5)' : COLORS.border }}
                        onFocus={e => e.target.style.borderColor = `rgba(${GOLD_RGB},0.5)`}
                        onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(224,90,90,0.5)' : COLORS.border}
                      />
                      {errors.message && <span id="contact-message-error" role="alert" style={{ fontSize: 12, color: '#f87171', fontFamily: FONTS.ui }}>{errors.message}</span>}
                    </div>
                    </div>

                    {/* Honeypot */}
                    <input type="text" name="contact_company_url" value={form.honeypot} onChange={e => set('honeypot', e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    <button
                      type="submit"
                      disabled={status === 'loading' || !form.name.trim() || !form.email.trim() || !form.service.trim() || !form.message.trim()}
                      style={{
                        marginTop: 4, height: 56, borderRadius: 999, border: 'none',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                        background: GOLD, color: '#030303',
                        opacity: (!form.name.trim() || !form.email.trim() || !form.service.trim() || !form.message.trim()) ? 0.5 : 1,
                        boxShadow: `0 0 32px rgba(${GOLD_RGB},0.3)`,
                        transition: 'opacity 0.2s, box-shadow 0.3s',
                      }}
                    >
                      {status === 'loading' ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : (<>Send Message <ArrowRight size={15} /></>)}
                    </button>
                    <p className="ayes-contact-required">Required fields: name, email, primary service, and brief. Website is optional.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      <AyesmajFooter />

      <style>{`
        .ayes-contact-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .ayes-contact-full { grid-column: 1 / -1; }
        .ayes-contact-required {
          margin: -2px 0 0;
          color: rgba(245,245,240,0.48);
          font-family: ${FONTS.ui};
          font-size: 11px;
          line-height: 1.5;
          text-align: center;
        }
        .ayes-contact-select option { background: #111411; color: #f5f5f0; }
        @media (max-width: 820px) {
          .ayes-contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .ayes-contact-fields { grid-template-columns: 1fr; }
          .ayes-contact-full { grid-column: auto; }
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  fontFamily: FONTS.ui, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'rgba(255,176,0,0.75)',
};
const inputStyle = {
  background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.border}`,
  borderRadius: 12, padding: '13px 16px', color: COLORS.white, fontSize: 14,
  fontFamily: FONTS.ui, outline: 'none', width: '100%', minHeight: 48,
  boxSizing: 'border-box', transition: 'border-color 0.2s',
};

function Field({ id, label, type, placeholder, value, onChange, error, autoComplete }) {
  const fieldId = id || `contact-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const errorId = `${fieldId}-error`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label htmlFor={fieldId} style={labelStyle}>{label}</label>
      <input
        id={fieldId}
        name={fieldId}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        style={{ ...inputStyle, borderColor: error ? 'rgba(224,90,90,0.5)' : COLORS.border }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,176,0,0.5)'}
        onBlur={e => e.target.style.borderColor = error ? 'rgba(224,90,90,0.5)' : COLORS.border}
      />
      {error && <span id={errorId} role="alert" style={{ fontSize: 12, color: '#f87171', fontFamily: FONTS.ui }}>{error}</span>}
    </div>
  );
}

function SelectField({ id, label, value, onChange, options, error }) {
  const errorId = `${id}-error`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="ayes-contact-select"
        style={{ ...inputStyle, cursor: 'pointer', color: value ? COLORS.white : COLORS.gray, borderColor: error ? 'rgba(224,90,90,0.5)' : COLORS.border }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,176,0,0.5)'}
        onBlur={e => e.target.style.borderColor = error ? 'rgba(224,90,90,0.5)' : COLORS.border}
      >
        <option value="">Select an option</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <span id={errorId} role="alert" style={{ fontSize: 12, color: '#f87171', fontFamily: FONTS.ui }}>{error}</span>}
    </div>
  );
}
