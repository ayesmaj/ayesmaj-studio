import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// Simple in-memory rate limiting (IP -> count)
const rateLimitMap = new Map();

const checkRateLimit = (ip) => {
  const now = Date.now();
  const key = ip;
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }
  
  const timestamps = rateLimitMap.get(key);
  const tenMinutesAgo = now - 10 * 60 * 1000;
  
  // Remove old timestamps
  const recentTimestamps = timestamps.filter(t => t > tenMinutesAgo);
  rateLimitMap.set(key, recentTimestamps);
  
  if (recentTimestamps.length >= 3) {
    return false;
  }
  
  recentTimestamps.push(now);
  return true;
};

const countLinks = (text) => {
  if (!text) return 0;
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const matches = text.match(urlRegex);
  return matches ? matches.length : 0;
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, phone, subject, message, pageUrl, honeypot } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Spam protection: honeypot (must be empty)
    if (honeypot && honeypot.trim() !== '') {
      return Response.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return Response.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    // Spam check: reject messages with too many links
    const linkCount = countLinks(message) + countLinks(subject);
    if (linkCount > 3) {
      return Response.json({ error: 'Message contains too many links' }, { status: 400 });
    }

    // Format timestamp
    const timestamp = new Date().toISOString();

    // Create the email body
    const emailBody = `New AYESMAJ Website Lead

---

Name: ${name}
Email: ${email}
Phone: ${phone || '(no phone)'}
Subject: ${subject || '(no subject)'}

Message:
${message}

---

Page URL: ${pageUrl || '(unknown)'}
Time: ${timestamp}
    `;

    // Send via Gmail
    try {
      const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
      
      // Create RFC 2822 formatted message
      const gmailMessage = `From: noreply@ayesmaj.com\nTo: ayesmajstudios@gmail.com\nReply-To: ${email}\nSubject: New AYESMAJ Website Lead: ${subject || 'Inquiry'}\nContent-Type: text/plain; charset="UTF-8"\n\n${emailBody}`;
      
      await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: btoa(gmailMessage)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
        })
      });

      return Response.json({ ok: true });
    } catch (gmailError) {
      console.error('Gmail error:', gmailError.message);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});