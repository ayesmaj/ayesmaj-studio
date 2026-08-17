import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Sparkles, Loader2, Copy, Check, ChevronDown, ChevronUp, Lock, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CircuitBackground from '@/components/home/CircuitBackground';
import { base44 } from '@/api/base44Client';

const LOGO_URL = '/logo.png';
const GOLD = '#FFB000';
const GOLD_LIGHT = '#FFD36A';
const GREEN = '#B3E65A';

const LINKS = [
  { label: 'Home', page: 'Home' },
  { label: 'System', page: 'System' },
  { label: 'Services', page: 'Services' },
  { label: 'Pricing', page: 'Pricing' },
  { label: 'Contact', page: 'Contact' },
];

const INDUSTRIES = ['Beauty', 'Food & Beverage', 'Tech', 'Real Estate', 'Health', 'Automotive', 'Retail', 'Services'];

// ── Shared sub-components ──────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 10, color: copied ? GREEN : 'rgba(255,255,255,0.3)',
        background: 'none', border: 'none', cursor: 'pointer',
        transition: 'color 0.2s', fontFamily: "'DM Sans', system-ui, sans-serif",
        letterSpacing: '0.08em',
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'COPIED' : 'COPY'}
    </button>
  );
}

function OutputBlock({ label, content }) {
  return (
    <div style={{
      marginTop: 12,
      border: `1px solid rgba(255,176,0,0.12)`,
      borderRadius: 12,
      padding: '14px 16px',
      background: 'rgba(255,176,0,0.03)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{
          fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
        }}>{label}</span>
        <CopyBtn text={content} />
      </div>
      <p style={{
        fontSize: 13, color: 'rgba(248,250,252,0.75)', lineHeight: 1.7,
        fontFamily: "'DM Sans', system-ui, sans-serif", whiteSpace: 'pre-wrap',
      }}>{content}</p>
    </div>
  );
}

function SysField({ label, placeholder, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(255,176,0,0.5)', fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
      }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10, padding: '10px 14px',
          color: '#F8FAFC', fontSize: 13,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          outline: 'none', transition: 'border-color 0.2s',
          width: '100%', boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,176,0,0.3)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
      />
    </div>
  );
}

function SysTextarea({ label, placeholder, value, onChange, rows = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(255,176,0,0.5)', fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
      }}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10, padding: '10px 14px',
          color: '#F8FAFC', fontSize: 13,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          outline: 'none', resize: 'none', transition: 'border-color 0.2s',
          width: '100%', boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(255,176,0,0.3)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
      />
    </div>
  );
}

function RunButton({ loading, onClick, disabled, label = 'EXECUTE' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 22px', borderRadius: 100,
        background: loading || disabled ? 'rgba(255,176,0,0.04)' : 'rgba(255,176,0,0.1)',
        border: `1px solid ${loading || disabled ? 'rgba(255,176,0,0.12)' : 'rgba(255,176,0,0.35)'}`,
        color: loading || disabled ? 'rgba(255,176,0,0.35)' : GOLD,
        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.25s',
      }}
    >
      {loading ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Zap size={12} />}
      {loading ? 'PROCESSING…' : label}
    </button>
  );
}

function Module({ title, tag, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: '1px solid rgba(255,176,0,0.1)',
      borderRadius: 16,
      overflow: 'hidden',
      background: 'rgba(11,15,12,0.6)',
      backdropFilter: 'blur(12px)',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '18px 22px',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: GOLD, fontWeight: 700, fontFamily: "'DM Sans', system-ui, sans-serif",
            background: 'rgba(255,176,0,0.1)', border: '1px solid rgba(255,176,0,0.2)',
            borderRadius: 100, padding: '3px 10px',
          }}>{tag}</span>
          <span style={{
            fontSize: 14, fontWeight: 700, color: '#F8FAFC',
            fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '-0.01em',
          }}>{title}</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 22px 22px',
              borderTop: '1px solid rgba(255,176,0,0.07)',
            }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Module 1: Brand Identity Generator ────────────────────────────────────
function BrandIdentityModule() {
  const [form, setForm] = useState({ brandName: '', industry: '', keywords: '', context: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const run = async () => {
    if (!form.brandName) return;
    setLoading(true); setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a senior brand strategist for AYESMAJ Studios — a premium international creative technology studio. Generate cinematic, high-end brand copy. No corporate clichés. Language should be confident, minimal, and internationally resonant.

Brand Name: ${form.brandName}
Industry: ${form.industry || 'Not specified'}
Keywords / Tone: ${form.keywords || 'Not specified'}
Context: ${form.context || 'None'}

Generate:
1. tagline: A 4–8 word brand tagline. Poetic. Ownable. No verbs like "empowering" or "transforming".
2. short_description: 1–2 punchy sentences (max 160 chars). What the brand is and why it matters.
3. brand_voice: 3 adjectives describing the brand's communication style.
4. positioning: A 1-sentence positioning statement for the brand's unique market position.`,
      response_json_schema: {
        type: 'object',
        properties: {
          tagline: { type: 'string' },
          short_description: { type: 'string' },
          brand_voice: { type: 'array', items: { type: 'string' } },
          positioning: { type: 'string' },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SysField label="Brand Name *" placeholder="e.g. Lumière" value={form.brandName} onChange={v => set('brandName', v)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{
            fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,176,0,0.5)', fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
          }}>Industry</label>
          <select
            value={form.industry}
            onChange={e => set('industry', e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10, padding: '10px 14px', color: form.industry ? '#F8FAFC' : 'rgba(255,255,255,0.25)',
              fontSize: 13, fontFamily: "'DM Sans', system-ui, sans-serif",
              outline: 'none', width: '100%', boxSizing: 'border-box',
            }}
          >
            <option value="" style={{ background: '#111' }}>Select…</option>
            {INDUSTRIES.map(i => <option key={i} value={i} style={{ background: '#111' }}>{i}</option>)}
          </select>
        </div>
      </div>
      <SysField label="Keywords / Tone" placeholder="e.g. minimal, luxury, bold, organic…" value={form.keywords} onChange={v => set('keywords', v)} />
      <SysField label="Context" placeholder="Any specific goals or direction for this brand…" value={form.context} onChange={v => set('context', v)} />
      <RunButton loading={loading} onClick={run} disabled={!form.brandName} label="GENERATE IDENTITY" />
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OutputBlock label="Tagline" content={result.tagline} />
          <OutputBlock label="Brand Description" content={result.short_description} />
          <OutputBlock label="Positioning" content={result.positioning} />
          {result.brand_voice?.length > 0 && (
            <div style={{
              marginTop: 4, border: '1px solid rgba(255,176,0,0.12)',
              borderRadius: 12, padding: '14px 16px', background: 'rgba(255,176,0,0.03)',
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
                display: 'block', marginBottom: 10,
              }}>Brand Voice</span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {result.brand_voice.map(v => (
                  <span key={v} style={{
                    padding: '5px 14px', borderRadius: 100,
                    border: '1px solid rgba(255,176,0,0.25)',
                    background: 'rgba(255,176,0,0.08)',
                    color: GOLD_LIGHT, fontSize: 11, fontWeight: 600,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    letterSpacing: '0.05em',
                  }}>{v}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Module 2: Campaign Concept Generator ──────────────────────────────────
function CampaignModule() {
  const [form, setForm] = useState({ brandName: '', product: '', audience: '', goal: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const run = async () => {
    if (!form.brandName) return;
    setLoading(true); setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a creative director at AYESMAJ Studios — a premium international creative technology studio. Generate a cinematic, high-impact campaign concept. Think like a luxury agency creative: visual-first, emotionally resonant, globally minded.

Brand: ${form.brandName}
Product / Service: ${form.product || 'Not specified'}
Target Audience: ${form.audience || 'Not specified'}
Campaign Goal: ${form.goal || 'Not specified'}

Generate:
1. campaign_title: A striking campaign name (3–6 words). No clichés.
2. concept: 2–3 sentences describing the campaign idea and emotional hook.
3. visual_direction: 1–2 sentences on the visual language, color mood, and cinematography style.
4. channels: An array of 3–4 recommended distribution channels (e.g. "Instagram Reels", "OOH", "Brand Film", "Influencer").
5. hook: A single punchy campaign hook line (different from the title). Max 12 words.`,
      response_json_schema: {
        type: 'object',
        properties: {
          campaign_title: { type: 'string' },
          concept: { type: 'string' },
          visual_direction: { type: 'string' },
          channels: { type: 'array', items: { type: 'string' } },
          hook: { type: 'string' },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SysField label="Brand *" placeholder="e.g. Nova Spirits" value={form.brandName} onChange={v => set('brandName', v)} />
        <SysField label="Product / Service" placeholder="e.g. Premium Rum, Mobile App…" value={form.product} onChange={v => set('product', v)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SysField label="Target Audience" placeholder="e.g. Urban 25–35, luxury consumers…" value={form.audience} onChange={v => set('audience', v)} />
        <SysField label="Campaign Goal" placeholder="e.g. Product launch, brand awareness…" value={form.goal} onChange={v => set('goal', v)} />
      </div>
      <RunButton loading={loading} onClick={run} disabled={!form.brandName} label="GENERATE CAMPAIGN" />
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            border: '1px solid rgba(255,176,0,0.12)', borderRadius: 12,
            padding: '14px 16px', background: 'rgba(255,176,0,0.03)',
          }}>
            <span style={{
              fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
              color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
              display: 'block', marginBottom: 6,
            }}>Campaign Title</span>
            <p style={{
              fontSize: 20, fontWeight: 800, color: '#F8FAFC',
              fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '-0.02em',
            }}>{result.campaign_title}</p>
            {result.hook && (
              <p style={{
                fontSize: 12, color: GOLD, marginTop: 4, fontStyle: 'italic',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>"{result.hook}"</p>
            )}
          </div>
          <OutputBlock label="Concept" content={result.concept} />
          <OutputBlock label="Visual Direction" content={result.visual_direction} />
          {result.channels?.length > 0 && (
            <div style={{
              border: '1px solid rgba(255,176,0,0.12)', borderRadius: 12,
              padding: '14px 16px', background: 'rgba(255,176,0,0.03)',
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
                display: 'block', marginBottom: 10,
              }}>Distribution Channels</span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {result.channels.map(ch => (
                  <span key={ch} style={{
                    padding: '5px 14px', borderRadius: 100,
                    border: '1px solid rgba(179,230,90,0.2)',
                    background: 'rgba(179,230,90,0.06)',
                    color: GREEN, fontSize: 11, fontWeight: 600,
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}>{ch}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Module 3: Visual Identity Brief ───────────────────────────────────────
function VisualBriefModule() {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    if (!desc.trim()) return;
    setLoading(true); setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are the visual strategy lead at AYESMAJ Studios. Based on the brand description below, generate a complete visual identity brief. Be specific, cinematic, and internationally minded. Reference real design references where appropriate (art movements, directors, photographers, designers).

Brand Description: "${desc}"

Generate:
1. color_palette: An array of 4 color descriptions (e.g. "Deep Obsidian #0A0A0A", "Burnished Gold #FFB000"). Include hex codes.
2. typography_direction: 1–2 sentences on font personality, type pairing approach, and weight usage.
3. mood: 3 evocative mood words that define the visual feeling.
4. references: An array of 2–3 creative references (e.g. directors, photographers, design movements, brands).
5. photography_style: 1 sentence on lighting, composition, and subject approach.`,
      response_json_schema: {
        type: 'object',
        properties: {
          color_palette: { type: 'array', items: { type: 'string' } },
          typography_direction: { type: 'string' },
          mood: { type: 'array', items: { type: 'string' } },
          references: { type: 'array', items: { type: 'string' } },
          photography_style: { type: 'string' },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SysTextarea
        label="Brand Description *"
        placeholder="Describe the brand — what it sells, who it's for, the feeling it should evoke…"
        value={desc}
        onChange={setDesc}
        rows={4}
      />
      <RunButton loading={loading} onClick={run} disabled={!desc.trim()} label="GENERATE BRIEF" />
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {result.color_palette?.length > 0 && (
            <div style={{
              border: '1px solid rgba(255,176,0,0.12)', borderRadius: 12,
              padding: '14px 16px', background: 'rgba(255,176,0,0.03)',
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
                display: 'block', marginBottom: 10,
              }}>Color Palette</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {result.color_palette.map((c, i) => {
                  const hex = c.match(/#[0-9A-Fa-f]{3,6}/)?.[0];
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {hex && (
                        <div style={{
                          width: 28, height: 28, borderRadius: 6,
                          background: hex, border: '1px solid rgba(255,255,255,0.1)',
                          flexShrink: 0,
                        }} />
                      )}
                      <span style={{
                        fontSize: 12, color: 'rgba(248,250,252,0.7)',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}>{c}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <OutputBlock label="Typography Direction" content={result.typography_direction} />
          <OutputBlock label="Photography Style" content={result.photography_style} />
          {result.mood?.length > 0 && (
            <div style={{
              border: '1px solid rgba(255,176,0,0.12)', borderRadius: 12,
              padding: '14px 16px', background: 'rgba(255,176,0,0.03)',
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
                display: 'block', marginBottom: 10,
              }}>Mood</span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {result.mood.map(m => (
                  <span key={m} style={{
                    padding: '5px 14px', borderRadius: 100,
                    border: '1px solid rgba(255,176,0,0.2)',
                    background: 'rgba(255,176,0,0.06)',
                    color: GOLD_LIGHT, fontSize: 11, fontWeight: 600,
                    fontFamily: "'DM Sans', system-ui, sans-serif", fontStyle: 'italic',
                  }}>{m}</span>
                ))}
              </div>
            </div>
          )}
          {result.references?.length > 0 && (
            <div style={{
              border: '1px solid rgba(255,176,0,0.12)', borderRadius: 12,
              padding: '14px 16px', background: 'rgba(255,176,0,0.03)',
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700,
                display: 'block', marginBottom: 10,
              }}>Creative References</span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {result.references.map((r, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    fontSize: 12, color: 'rgba(248,250,252,0.7)',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}>
                    <span style={{ color: GOLD, marginTop: 1, flexShrink: 0 }}>→</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function System() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#030303' }}>
      <CircuitBackground />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: 'rgba(11,15,12,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,176,0,0.08)',
        }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">
          <Link to={createPageUrl('Home')} className="flex items-center group">
            <img src={LOGO_URL} alt="AYESMAJ" className="h-8 w-auto hover:opacity-80 transition-opacity" />
          </Link>
          <div className="hidden lg:flex items-center gap-4">
            <Link to={createPageUrl('Home')} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Go to Home">
              <Home size={18} className="text-[#FFB000]" />
            </Link>
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              {LINKS.slice(1).map(l => (
                <Link key={l.label} to={createPageUrl(l.page)}
                  className="text-[11px] tracking-widest uppercase font-bold text-gray-500 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-1">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 flex flex-col px-8 pt-28 pb-10"
            style={{ background: 'rgba(11,15,12,0.97)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,176,0,0.08)' }}>
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,176,0,0.3), transparent)' }} />
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <Link key={l.label} to={createPageUrl(l.page)} onClick={() => setMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-left py-4 text-2xl font-black transition-colors border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.04)', color: l.page === 'System' ? '#FFB000' : 'white' }}>
                    {l.label}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 10, paddingTop: 'clamp(120px,14vw,160px)', paddingBottom: 'clamp(60px,7vw,90px)', textAlign: 'center' }}>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,176,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(24px,5vw,60px)' }}>

          {/* System badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: `1px solid rgba(255,176,0,0.25)`,
              borderRadius: 100, padding: '6px 16px',
              background: 'rgba(255,176,0,0.06)',
              marginBottom: 28,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: GOLD, fontWeight: 700, fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>SYSTEM ACTIVE · PRIVATE ACCESS</span>
            <Lock size={10} style={{ color: GOLD, opacity: 0.6 }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(36px,6vw,76px)', fontWeight: 800,
              lineHeight: 0.95, letterSpacing: '-0.04em',
              color: '#F8FAFC', marginBottom: 24,
            }}
          >
            Private{' '}
            <span style={{
              fontStyle: 'italic',
              background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Generation</span>
            <br />System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(14px,1.5vw,17px)', color: 'rgba(248,250,252,0.45)',
              maxWidth: 520, margin: '0 auto', lineHeight: 1.65,
            }}
          >
            Proprietary AI infrastructure built for AYESMAJ clients. Generate brand identities, campaign concepts, and visual direction — in seconds.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', justifyContent: 'center', gap: 'clamp(24px,5vw,56px)',
              marginTop: 44, flexWrap: 'wrap',
            }}
          >
            {[
              { icon: <Zap size={14} />, label: 'Generation Modules', value: '3' },
              { icon: <Activity size={14} />, label: 'Avg Response Time', value: '< 4s' },
              { icon: <Sparkles size={14} />, label: 'Powered By', value: 'Replicate AI' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: GOLD, opacity: 0.7 }}>{stat.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 17, fontWeight: 800, color: '#F8FAFC',
                    letterSpacing: '-0.02em', lineHeight: 1,
                  }}>{stat.value}</p>
                  <p style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 10, color: 'rgba(248,250,252,0.35)',
                    letterSpacing: '0.06em', marginTop: 2,
                  }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 900, margin: '0 auto', padding: '0 clamp(24px,5vw,60px)',
        position: 'relative', zIndex: 10,
      }}>
        <div style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,176,0,0.2), transparent)',
        }} />
      </div>

      {/* ── Generation Modules ───────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: 900, margin: '0 auto',
          padding: 'clamp(48px,6vw,72px) clamp(24px,5vw,60px)',
        }}
      >
        {/* Section label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 28,
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,176,0,0.12)' }} />
          <span style={{
            fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: GOLD, fontWeight: 700, fontFamily: "'DM Sans', system-ui, sans-serif",
            whiteSpace: 'nowrap',
          }}>GENERATION MODULES</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,176,0,0.12)' }} />
        </div>

        {/* Notice */}
        <div style={{
          marginBottom: 24,
          border: '1px solid rgba(179,230,90,0.12)',
          borderRadius: 10, padding: '10px 16px',
          background: 'rgba(179,230,90,0.04)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
          <p style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 11, color: 'rgba(179,230,90,0.6)', letterSpacing: '0.04em',
          }}>
            All outputs are AI-generated drafts. Review before use in production assets.
          </p>
        </div>

        {/* Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Module title="Brand Identity Generator" tag="MODULE 01" defaultOpen={true}>
            <BrandIdentityModule />
          </Module>
          <Module title="Campaign Concept Generator" tag="MODULE 02">
            <CampaignModule />
          </Module>
          <Module title="Visual Identity Brief" tag="MODULE 03">
            <VisualBriefModule />
          </Module>
        </div>
      </motion.section>

      {/* ── Bottom accent ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(24px,5vw,60px) clamp(48px,6vw,80px)', position: 'relative', zIndex: 10 }}>
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,176,0,0.15), transparent)', marginBottom: 32 }} />
        <p style={{
          textAlign: 'center', fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,176,0,0.3)',
          textTransform: 'uppercase',
        }}>
          AYESMAJ STUDIOS · PRIVATE GENERATION SYSTEM · AUTHORIZED ACCESS ONLY
        </p>
      </div>

      <AyesmajFooter />
    </div>
  );
}
