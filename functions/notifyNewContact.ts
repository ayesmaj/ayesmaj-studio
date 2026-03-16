import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    // Only process new contact submissions
    if (event.type !== 'create') {
      return Response.json({ success: true });
    }

    const htmlBody = `
<h2>New Client Message</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Subject:</strong> ${data.subject}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
<hr>
<p><small>Reply directly to ${data.email} or through your dashboard.</small></p>
    `;

    // Try Gmail first
    try {
      const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
      const textBody = `New Client Message\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;
      
      await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: btoa(`From: noreply@studio.com\nTo: ayesmajstudios@gmail.com\nSubject: 📬 New Client Message from ${data.name}\n\n${textBody}`)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
        })
      });
    } catch (gmailError) {
      console.warn('Gmail send failed, trying Resend:', gmailError.message);
    }

    // Send via Resend as backup
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'ayesmajstudios@gmail.com',
          subject: `📬 New Client Message from ${data.name}`,
          html: htmlBody
        })
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});