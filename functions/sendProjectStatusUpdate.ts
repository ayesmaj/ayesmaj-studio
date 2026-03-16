import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const createEmailBody = (project) => {
  return `
Project Status Update

Title: ${project.title}
Status: ${project.status || 'N/A'}
Category: ${project.category}

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
    const oldProject = payload.old_data;

    if (!project || !project.client) {
      return Response.json({ success: true, message: 'No client email or project data' });
    }

    // Only send if status changed
    if (!oldProject || oldProject.status === project.status) {
      return Response.json({ success: true, message: 'Status unchanged' });
    }

    const emailBody = createEmailBody(project);
    const subject = `Project Status Update: ${project.title}`;

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
          raw: btoa(`From: ${user.email}\nTo: ${project.client}\nSubject: ${subject}\n\n${emailBody}`)
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
            to: project.client,
            subject: subject,
            text: emailBody
          })
        });
      }
    } catch (resendError) {
      console.warn('Resend error:', resendError.message);
    }

    return Response.json({ success: true, message: 'Status update sent to client' });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});