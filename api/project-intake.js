const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const STUDIO_EMAIL = 'ayesmajstudios@gmail.com';
const FROM_EMAIL = 'AYESMAJ Studios <projects@mail.ayesmajstudios.com>';

const LIMITS = {
  name: 100, email: 254, phone: 50, subject: 160, company: 120, website: 300, service: 100,
  budget: 100, timeline: 100, projectType: 100, message: 5000,
};

function clean(value, limit = 500) {
  return String(value || '').trim().slice(0, limit);
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function safeFields(body = {}) {
  return Object.fromEntries(Object.entries(LIMITS).map(([key, limit]) => [key, clean(body[key], limit)]));
}

function fieldRow(label, value) {
  return `<tr><td style="padding:8px 0;color:#9b968c;width:145px;vertical-align:top">${label}</td><td style="padding:8px 0;color:#f4efe5;vertical-align:top">${escapeHtml(value || 'Not provided')}</td></tr>`;
}

async function sendEmail(apiKey, payload) {
  const result = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await result.json().catch(() => ({}));
  if (!result.ok) throw new Error(data.message || 'Email delivery failed.');
  return data;
}

function confirmationHtml(data) {
  const firstName = escapeHtml(data.name.split(/\s+/)[0] || data.name);
  const company = data.company ? escapeHtml(data.company) : 'your brand';
  const service = escapeHtml(data.service);
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4efe7;color:#1d1b1a;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#f4efe7"><tr><td align="center" style="padding:36px 16px">
    <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;background:#fffdf9;border:1px solid #ded4c6;border-radius:22px;overflow:hidden;box-shadow:0 18px 55px rgba(74,56,34,.12)">
      <tr><td style="height:6px;background:#e4b74f;background-image:linear-gradient(90deg,#e4b74f,#e99973,#a879ea)"></td></tr>
      <tr><td align="center" style="padding:26px 24px 22px;background:#0b0d0c">
        <a href="https://ayesmajstudios.com" style="text-decoration:none"><img src="https://ayesmajstudios.com/assets/ayesmaj/logo-full.png" width="116" height="116" alt="AYESMAJ Studios" style="display:block;width:116px;height:116px;border:0;border-radius:14px"></a>
        <p style="margin:14px 0 0;color:#f5d47a;font-size:11px;line-height:1.4;letter-spacing:4px;font-weight:700">BRAND · WEB · AI · MOTION · 3D</p>
      </td></tr>
      <tr><td style="padding:42px 42px 10px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="padding:8px 13px;background:#f5ebd2;border:1px solid #ead5a2;border-radius:999px;color:#795d18;font-size:11px;line-height:1;letter-spacing:2px;font-weight:800">PROJECT RECEIVED</td></tr></table>
        <h1 style="margin:24px 0 14px;color:#171513;font-size:38px;line-height:1.08;letter-spacing:-1px">Welcome, ${firstName}.</h1>
        <p style="margin:0;color:#5d5750;font-size:17px;line-height:1.7">Your brief for <strong style="color:#241f1a">${company}</strong> is officially on our radar. We’re getting ready to help you with <strong style="color:#241f1a">${service}</strong>, and we’re excited to see what we can build together.</p>
      </td></tr>
      <tr><td style="padding:24px 42px 8px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#fbf5e9;border:1px solid #ead9b8;border-radius:16px">
          <tr><td width="8" style="width:8px;background:#e4b74f;border-radius:16px 0 0 16px"></td><td style="padding:22px 22px 22px 20px">
            <p style="margin:0 0 8px;color:#8a6412;font-size:11px;line-height:1.4;letter-spacing:2px;font-weight:800">WHAT HAPPENS NEXT</p>
            <p style="margin:0;color:#4e4943;font-size:15px;line-height:1.65">We’ll review your goals, scope, and timing, then reply with the strongest next step—normally within 24 hours.</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:26px 42px 42px">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="background:#171513;border-radius:999px"><a href="https://ayesmajstudios.com/Work" style="display:inline-block;padding:16px 25px;color:#fffaf0;text-decoration:none;font-size:13px;line-height:1;font-weight:800;letter-spacing:1px">EXPLORE OUR WORK&nbsp;&nbsp;→</a></td></tr></table>
        <p style="margin:28px 0 0;padding-top:22px;border-top:1px solid #eee6db;color:#7c746b;font-size:13px;line-height:1.65">Have something to add? Just reply to this email.<br><strong style="color:#2a2622">AYESMAJ Studios</strong> · We build brands that feel like worlds.</p>
      </td></tr>
    </table>
    <p style="max-width:560px;margin:18px 0 0;color:#8d857c;font-size:11px;line-height:1.6;text-align:center">You received this message because you submitted the project form at <a href="https://ayesmajstudios.com" style="color:#725c24">ayesmajstudios.com</a>.</p>
  </td></tr></table></body></html>`;
}

function studioHtml(data) {
  return `<!doctype html><html><body style="margin:0;background:#0a0d0b;color:#f4efe5;font-family:Arial,Helvetica,sans-serif"><div style="max-width:680px;margin:0 auto;padding:36px 20px"><div style="border-top:4px solid #e4b74f;background:#111612;padding:30px;border-radius:12px">
  <p style="margin:0 0 10px;color:#8dd31e;font-size:12px;letter-spacing:3px;font-weight:bold">NEW PROJECT INQUIRY</p><h1 style="margin:0 0 24px;color:#fff;font-size:30px">${escapeHtml(data.name)} — ${escapeHtml(data.service)}</h1>
  <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.5">${fieldRow('Email', data.email)}${fieldRow('Phone', data.phone)}${fieldRow('Subject', data.subject)}${fieldRow('Company', data.company)}${fieldRow('Website', data.website)}${fieldRow('Service', data.service)}${fieldRow('Project type', data.projectType)}${fieldRow('Budget', data.budget)}${fieldRow('Timeline', data.timeline)}</table>
  <div style="margin-top:22px;padding:20px;background:#080b09;border:1px solid #2e352b;border-radius:10px"><p style="margin:0 0 10px;color:#e4b74f;font-size:11px;letter-spacing:2px;font-weight:bold">PROJECT BRIEF</p><p style="margin:0;color:#f4efe5;white-space:pre-wrap;line-height:1.7">${escapeHtml(data.message)}</p></div>
  </div></div></body></html>`;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const origin = request.headers.origin;
  const allowedOrigin = !origin || origin === 'https://ayesmajstudios.com'
    || origin === 'https://www.ayesmajstudios.com' || origin === 'http://127.0.0.1:4174'
    || origin === 'http://localhost:4174' || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
  if (!allowedOrigin) return response.status(403).json({ success: false, message: 'Request origin is not allowed.' });
  if (clean(request.body?.honeypot, 100)) return response.status(200).json({ success: true });

  const data = safeFields(request.body);
  if (!data.name || !data.email || !data.service || !data.message) {
    return response.status(400).json({ success: false, message: 'Name, email, service, and project brief are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return response.status(400).json({ success: false, message: 'Enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return response.status(503).json({ success: false, message: 'Email service is not configured.' });

  try {
    await Promise.all([
      sendEmail(apiKey, {
        from: FROM_EMAIL, to: [STUDIO_EMAIL], reply_to: data.email,
        subject: `New ${data.subject || data.service} inquiry from ${data.name}`, html: studioHtml(data),
        text: `New project inquiry\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nSubject: ${data.subject || 'Not provided'}\nCompany: ${data.company || 'Not provided'}\nWebsite: ${data.website || 'Not provided'}\nService: ${data.service}\nProject type: ${data.projectType || 'Not provided'}\nBudget: ${data.budget || 'Not provided'}\nTimeline: ${data.timeline || 'Not provided'}\n\nProject brief:\n${data.message}`,
      }),
      sendEmail(apiKey, {
        from: FROM_EMAIL, to: [data.email], reply_to: STUDIO_EMAIL,
        subject: `${data.name.split(/\s+/)[0]}, we received your AYESMAJ project brief`,
        html: confirmationHtml(data),
        text: `Welcome, ${data.name.split(/\s+/)[0] || data.name}.\n\nWe received the brief for ${data.company || 'your brand'}. We’re getting ready to help you with ${data.service}, and a real person from AYESMAJ Studios will respond shortly, normally within 24 hours.\n\nExplore our work: https://ayesmajstudios.com/Work\n\nAYESMAJ Studios`,
      }),
    ]);
    // WhatsApp heads-up via CallMeBot - server-side so the key never ships to browsers.
    // Set CALLMEBOT_PHONE / CALLMEBOT_APIKEY in Vercel env to rotate without a deploy.
    try {
      const waPhone = process.env.CALLMEBOT_PHONE || '15093197999';
      const waKey = process.env.CALLMEBOT_APIKEY || '8010280';
      const waText = encodeURIComponent(
        `New inquiry!\nFrom: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}\nSubject: ${data.subject || 'No subject'}\nCompany: ${data.company || 'Not provided'}\nService: ${data.service}\nBudget: ${data.budget || 'Not provided'}`,
      );
      await fetch(`https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${waText}&apikey=${waKey}`);
    } catch (_) { /* silent - the emails already went out */ }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Project intake email failed:', error.message);
    return response.status(502).json({ success: false, message: 'We could not send your project request right now.' });
  }
}
