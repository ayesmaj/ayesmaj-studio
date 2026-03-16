import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const createEmailBody = (project) => {
  return `
Project Update Notification

Title: ${project.title}
Category: ${project.category}
Client: ${project.client || 'N/A'}
Year: ${project.year || 'N/A'}

Description:
${project.full_description || project.short_description || 'No description'}

Services Used:
${project.services_used?.length ? project.services_used.map(s => `• ${s}`).join('\n') : 'None listed'}

Gallery Items: ${project.gallery?.length || 0} items

Testimonial:
${project.testimonial_quote ? `"${project.testimonial_quote}" - ${project.testimonial_author}` : 'No testimonial'}

Featured: ${project.featured ? 'Yes' : 'No'}

---
Project ID: ${project.id}
Updated: ${new Date(project.updated_date).toLocaleString()}
  `;
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();
    const project = payload.data;

    if (!project) {
      return Response.json({ error: 'No project data' }, { status: 400 });
    }

    const emailBody = createEmailBody(project);
    const subject = `Project Update: ${project.title}`;

    // Send via Gmail
    try {
      const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
      
      const gmailResponse = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: btoa(`From: ${user.email}\nTo: ${user.email}\nSubject: ${subject}\n\n${emailBody}`)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
        })
      });

      if (!gmailResponse.ok) {
        console.warn('Gmail send failed:', await gmailResponse.text());
      }
    } catch (gmailError) {
      console.warn('Gmail error:', gmailError.message);
    }

    // Send via Resend as backup
    try {
      const resendKey = Deno.env.get('RESEND_API_KEY');
      if (resendKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'noreply@resend.dev',
            to: user.email,
            subject: subject,
            text: emailBody
          })
        });
      }
    } catch (resendError) {
      console.warn('Resend error:', resendError.message);
    }

    return Response.json({ success: true, message: 'Project update sent' });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});