import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import './BrandWorldCTA.css';

const SERVICES = ['Brand strategy', 'Website', 'AI content', '3D & CGI', 'Full brand world'];
const BUDGETS = ['Under $2k', '$2k – $5k', '$5k – $15k', '$15k+'];
const TIMELINES = ['ASAP', '1–2 months', '3–6 months', 'Exploring'];
const PROJECT_TYPES = ['New launch', 'Rebrand', 'Campaign', 'Ongoing partner'];
const EMPTY = {
  name: '', email: '', company: '', website: '', service: '', budget: '',
  timeline: '', projectType: '', message: '', honeypot: '',
};

const REQUIRED = ['name', 'email', 'service', 'message'];

function validateField(name, value) {
  if (REQUIRED.includes(name) && !value.trim()) return 'Required';
  if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
  if (name === 'website' && value && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}/i.test(value)) return 'Enter a valid website';
  return '';
}

function Field({ id, label, value, onChange, onBlur, error, type = 'text', options, placeholder, className = '' }) {
  const shared = {
    id,
    name: id,
    value,
    onChange: (event) => onChange(event.target.value),
    onBlur: () => onBlur(id, value),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  };

  return (
    <div className={`bw-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select {...shared}>
          <option value="">Select an option</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input {...shared} type={type} placeholder={placeholder} autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : id === 'company' ? 'organization' : 'off'} />
      )}
      {error && <span id={`${id}-error`} className="bw-field__error" role="alert">{error}</span>}
    </div>
  );
}

function BrandConsole() {
  const assets = [
    ['/assets/ayesmaj/generated/capabilities/capability-01-brand-strategy.webp', 'Brand identity direction board'],
    ['/assets/ayesmaj/generated/capabilities/capability-03-web-design.webp', 'Premium web experience across devices'],
    ['/assets/ayesmaj/generated/capabilities/capability-04-3d-cgi.webp', '3D product development and rendering'],
    ['/assets/ayesmaj/generated/storyboard/universal-03-hero.webp', 'Cinematic campaign hero frame'],
  ];

  return (
    <div className="bw-console" aria-label="AYESMAJ brand-world production console">
      <div className="bw-console__topline"><span>AYESMAJ / WORLD BUILDER</span><span className="bw-console__live">SYSTEM LIVE</span></div>
      <div className="bw-console__grid">
        <figure className="bw-console__main">
          <img src={assets[0][0]} alt={assets[0][1]} width="768" height="512" />
          <figcaption><span>01 / Identity system</span><strong>Build the visual language</strong></figcaption>
        </figure>
        <div className="bw-console__rail">
          {assets.slice(1).map(([src, alt], index) => (
            <figure key={src}>
              <img src={src} alt={alt} width="300" height="170" loading="lazy" />
              <figcaption>0{index + 2}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="bw-console__footer">
        <span>STRATEGY</span><i /><span>DESIGN</span><i /><span>CONTENT</span><i /><span>LAUNCH</span>
      </div>
    </div>
  );
}

export default function BrandWorldCTA() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const section = document.getElementById('start-a-project');
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('ayes-intake-visible', entry.isIntersecting && entry.intersectionRatio > 0.3);
    }, { threshold: [0, 0.3, 0.6] });
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('ayes-intake-visible', 'ayes-form-active');
    };
  }, []);

  const completed = useMemo(() => REQUIRED.filter((key) => {
    if (!form[key].trim()) return false;
    return key !== 'email' || !validateField('email', form.email);
  }).length, [form]);
  const progress = Math.round((completed / REQUIRED.length) * 100);

  const set = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: '' }));
  };

  const validateOnBlur = (key, value) => {
    const error = validateField(key, value);
    setErrors((current) => ({ ...current, [key]: error }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    [...REQUIRED, 'website'].forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) nextErrors[key] = error;
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setStatus('loading');
    setErrors({});
    try {
      const response = await fetch('/api/project-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'The studio could not receive this request.');
      setStatus('success');
      setForm(EMPTY);
    } catch (error) {
      setStatus('error');
      setErrors({ submit: `${error.message || 'Network error.'} Please try again or email ayesmajstudios@gmail.com.` });
    }
  };

  return (
    <section id="start-a-project" className="bw-section" aria-labelledby="bw-title">
      <div className="bw-section__architecture" aria-hidden="true" />
      <div className="bw-shell">
        <motion.div className="bw-pitch" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="bw-eyebrow"><span>05</span> Start a project</p>
          <h2 id="bw-title">Ready to build<br />a <em>brand world?</em></h2>
          <p className="bw-intro">Bring us the idea, product, or company. We’ll connect strategy, identity, web, AI, motion, and 3D into one unforgettable system.</p>
          <BrandConsole />
        </motion.div>

        <motion.div className="bw-form-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div className="bw-success" key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle2 aria-hidden="true" />
                <p className="bw-kicker">Transmission received</p>
                <h3>Your project is on our radar.</h3>
                <p>A real person from AYESMAJ will reply within 24 hours.</p>
                <button type="button" onClick={() => { setStatus('idle'); setErrors({}); }}>Start another project</button>
              </motion.div>
            ) : (
              <motion.form key="form" className="bw-form" onSubmit={handleSubmit} onFocus={() => document.body.classList.add('ayes-form-active')} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) document.body.classList.remove('ayes-form-active'); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <header className="bw-form__header">
                  <div><p>Project intake</p><h3>Tell us what you’re building.</h3></div>
                  <div className="bw-progress" aria-label={`${progress}% of required fields complete`}><span>{progress}%</span><i><b style={{ width: `${progress}%` }} /></i></div>
                </header>

                {errors.submit && <div className="bw-submit-error" role="alert">{errors.submit}</div>}

                <div className="bw-form__grid">
                  <Field id="name" label="Name *" value={form.name} onChange={(v) => set('name', v)} onBlur={validateOnBlur} error={errors.name} placeholder="Your name" />
                  <Field id="email" label="Email *" type="email" value={form.email} onChange={(v) => set('email', v)} onBlur={validateOnBlur} error={errors.email} placeholder="you@company.com" />
                  <Field id="company" label="Company" value={form.company} onChange={(v) => set('company', v)} onBlur={validateOnBlur} placeholder="Brand or company" />
                  <Field id="website" label="Website (optional)" type="url" value={form.website} onChange={(v) => set('website', v)} onBlur={validateOnBlur} error={errors.website} placeholder="company.com" />
                  <Field id="service" label="Primary service *" options={SERVICES} value={form.service} onChange={(v) => set('service', v)} onBlur={validateOnBlur} error={errors.service} />
                  <Field id="budget" label="Budget" options={BUDGETS} value={form.budget} onChange={(v) => set('budget', v)} onBlur={validateOnBlur} />
                  <Field id="timeline" label="Timeline" options={TIMELINES} value={form.timeline} onChange={(v) => set('timeline', v)} onBlur={validateOnBlur} />
                  <Field id="projectType" label="Project type" options={PROJECT_TYPES} value={form.projectType} onChange={(v) => set('projectType', v)} onBlur={validateOnBlur} />
                  <div className="bw-field bw-field--message">
                    <label htmlFor="message">The brief *</label>
                    <textarea id="message" name="message" value={form.message} onChange={(event) => set('message', event.target.value)} onBlur={() => validateOnBlur('message', form.message)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="The idea, the goal, and what success looks like…" />
                    {errors.message && <span id="message-error" className="bw-field__error" role="alert">{errors.message}</span>}
                  </div>
                </div>

                <input className="bw-honeypot" type="text" name="website_confirm" value={form.honeypot} onChange={(event) => set('honeypot', event.target.value)} tabIndex={-1} autoComplete="off" />

                <div className="bw-form__actions">
                  <button className="bw-submit" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? <><Loader2 className="bw-spinner" aria-hidden="true" /> Sending</> : <>Start the project <ArrowRight aria-hidden="true" /></>}
                  </button>
                  <p><ShieldCheck aria-hidden="true" /> A real response from the studio—not an automated sales sequence.</p>
                </div>
                <p className="bw-required"><Check aria-hidden="true" /> Required fields: name, email, service, and brief.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
