import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    if (event.type !== 'create') {
      return Response.json({ success: true });
    }

    const { name, email, subject, message } = data;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'ayesmajstudios@gmail.com',
      subject: `New Contact: ${subject || 'General Inquiry'} — from ${name}`,
      body: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Subject:</strong> ${subject || '—'}<br><br><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});