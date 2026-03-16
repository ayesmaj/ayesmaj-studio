import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, Loader2, Copy, Check, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const INDUSTRIES = ['Beauty', 'Food & Beverage', 'Tech', 'Real Estate', 'Health', 'Automotive', 'Retail', 'Services'];
const ALL_TAGS = ['Branding', '3D', 'Motion', 'Packaging', 'AI Campaign', 'CGI', 'Photography', 'Video'];

// ── Shared helpers ──────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#00ff77] transition-colors">
      {copied ? <Check size={12} className="text-[#00ff77]" /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function ResultBox({ label, content }) {
  return (
    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] tracking-[0.25em] text-[#00ff77]/60 uppercase font-medium">{label}</span>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

function Panel({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[#00ff77]">{icon}</span>
          <span className="text-sm font-semibold text-white">{title}</span>
        </div>
        {open ? <ChevronUp size={15} className="text-gray-600" /> : <ChevronDown size={15} className="text-gray-600" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/[0.05]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Tool 1: Description & Overview Generator ────────────────────────────────
function DescriptionGenerator() {
  const [form, setForm] = useState({ brandName: '', industry: '', services: '', context: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.brandName) return;
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a senior copywriter for AYESMAJ Studios, a premium international creative technology studio.

Generate content for a new brand case study entry. Keep language minimal, cinematic, and high-end — no fluff, no startup clichés.

Brand Details:
- Brand Name: ${form.brandName}
- Industry: ${form.industry || 'Not specified'}
- Services provided: ${form.services || 'Not specified'}
- Additional context: ${form.context || 'None'}

Generate:
1. short_description: A punchy 1–2 sentence brand description (max 160 chars). Focus on what was built and why it matters.
2. overview: A 2–3 sentence overview paragraph covering the brand, the challenge, and the visual direction taken.

Tone: Luxury agency. Confident. Minimal. International.`,
      response_json_schema: {
        type: 'object',
        properties: {
          short_description: { type: 'string' },
          overview: { type: 'string' },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AIField label="Brand Name *" placeholder="e.g. Lumière Beauty" value={form.brandName} onChange={v => set('brandName', v)} />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-600 uppercase tracking-widest">Industry</label>
          <select value={form.industry} onChange={e => set('industry', e.target.value)}
            className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00ff77]/30 transition-colors appearance-none"
          >
            <option value="" className="bg-[#111]">Select industry…</option>
            {INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#111]">{i}</option>)}
          </select>
        </div>
      </div>
      <AIField label="Services Provided" placeholder="e.g. Brand Identity, 3D Visualization, Motion Design" value={form.services} onChange={v => set('services', v)} />
      <AIField label="Extra Context" placeholder="Anything unique about the project, goal, or client…" value={form.context} onChange={v => set('context', v)} />

      <GenerateButton loading={loading} onClick={generate} disabled={!form.brandName} />

      {result && (
        <>
          <ResultBox label="Short Description" content={result.short_description} />
          <ResultBox label="Overview Paragraph" content={result.overview} />
        </>
      )}
    </div>
  );
}

// ── Tool 2: Tags & Industry Suggester ───────────────────────────────────────
function TagSuggester() {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    if (!desc.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a brand categorization expert for AYESMAJ Studios, a premium creative studio.

Based on the following brand/project description, suggest:
1. The most fitting industry category from this list: Beauty, Food & Beverage, Tech, Real Estate, Health, Automotive, Retail, Services
2. 3–5 relevant service tags from this list: Branding, 3D, Motion, Packaging, AI Campaign, CGI, Photography, Video
3. A brief 1-sentence justification for your choices.

Description: "${desc}"`,
      response_json_schema: {
        type: 'object',
        properties: {
          industry: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          justification: { type: 'string' },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-gray-600 uppercase tracking-widest">Brand / Project Description</label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Paste your brand description or project brief here…"
          rows={4}
          className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00ff77]/30 transition-colors resize-none placeholder:text-gray-600"
        />
      </div>

      <GenerateButton loading={loading} onClick={generate} disabled={!desc.trim()} label="Suggest Tags & Industry" />

      {result && (
        <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.25em] text-[#00ff77]/60 uppercase font-medium">Suggested Industry</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#00ff77]/10 border border-[#00ff77]/20 text-[#00ff77] text-xs font-semibold">
            {result.industry}
          </span>

          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#00ff77]/60 uppercase font-medium">Suggested Tags</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.05]">
            <p className="text-xs text-gray-500 italic">{result.justification}</p>
            <CopyButton text={`Industry: ${result.industry}\nTags: ${result.tags?.join(', ')}`} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tool 3: Results Summary Writer ──────────────────────────────────────────
function ResultsWriter() {
  const [form, setForm] = useState({ brandName: '', deliverables: '', impact: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.brandName) return;
    setLoading(true);
    setResult(null);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a senior copywriter for AYESMAJ Studios, a premium international creative technology studio.

Write compelling case study results for the following brand project. Each result should be a short, punchy statement (8–15 words max). No filler. High-impact. Results-driven language.

Brand: ${form.brandName}
Deliverables completed: ${form.deliverables || 'Not specified'}
Known impact / outcomes: ${form.impact || 'Not specified'}

Generate exactly 3–5 result statements as an array. Be specific and confident. Examples of tone:
- "Elevated brand perception to premium tier across all markets"
- "Tripled social media engagement within 30 days of launch"
- "Secured placement in 4 international retail chains"`,
      response_json_schema: {
        type: 'object',
        properties: {
          results: { type: 'array', items: { type: 'string' } },
        }
      }
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AIField label="Brand Name *" placeholder="e.g. Nova Spirits" value={form.brandName} onChange={v => set('brandName', v)} />
        <AIField label="Deliverables" placeholder="e.g. 3D Viz, Brand Identity, Motion Reel" value={form.deliverables} onChange={v => set('deliverables', v)} />
      </div>
      <AIField label="Known Impact / Outcomes" placeholder="e.g. product launch went viral, secured a retail deal…" value={form.impact} onChange={v => set('impact', v)} />

      <GenerateButton loading={loading} onClick={generate} disabled={!form.brandName} label="Write Results Summary" />

      {result?.results?.length > 0 && (
        <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.25em] text-[#00ff77]/60 uppercase font-medium">Results Statements</span>
            <CopyButton text={result.results.join('\n')} />
          </div>
          <ul className="space-y-2">
            {result.results.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <span className="text-[#00ff77] mt-0.5 shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Shared sub-components ───────────────────────────────────────────────────
function AIField({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] text-gray-600 uppercase tracking-widest">{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00ff77]/30 transition-colors placeholder:text-gray-600"
      />
    </div>
  );
}

function GenerateButton({ loading, onClick, disabled, label = 'Generate with AI' }) {
  return (
    <button onClick={onClick} disabled={loading || disabled}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00ff77]/10 border border-[#00ff77]/20 text-[#00ff77] text-xs font-bold tracking-wide hover:bg-[#00ff77]/20 hover:shadow-[0_0_20px_rgba(0,255,119,0.15)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
      {loading ? 'Generating…' : label}
    </button>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function AIBrandAssistant({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
      className="relative rounded-3xl border border-[#00ff77]/15 bg-[#0B0B0B]/95 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(0,255,119,0.07)]"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,255,119,0.3), transparent)' }} />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <Sparkles size={16} className="text-[#00ff77]" />
          <span className="text-sm font-bold text-white tracking-wide">AI Brand Content Assistant</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors">
            <X size={16} />
          </button>
        )}
      </div>

      <p className="text-xs text-gray-600 mb-5 leading-relaxed">
        Three AI tools to generate copy for the Brands section. Results are drafts — review before publishing.
      </p>

      <div className="space-y-3">
        <Panel title="Generate Description & Overview" icon={<Sparkles size={14} />} defaultOpen={true}>
          <DescriptionGenerator />
        </Panel>
        <Panel title="Suggest Tags & Industry" icon={<Sparkles size={14} />}>
          <TagSuggester />
        </Panel>
        <Panel title="Write Results Summary" icon={<Sparkles size={14} />}>
          <ResultsWriter />
        </Panel>
      </div>
    </motion.div>
  );
}