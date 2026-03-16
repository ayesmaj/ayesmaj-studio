import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');

    const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?q=subject:project&maxResults=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const { messages = [] } = await response.json();

    const emails = await Promise.all(
      messages.map(async (msg) => {
        const msgResponse = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        return msgResponse.json();
      })
    );

    const parsed = emails.map((email) => {
      const headers = email.payload.headers;
      let body = 'No content';
      
      if (email.payload.parts?.[0]?.body?.data) {
        body = atob(email.payload.parts[0].body.data);
      } else if (email.payload.body?.data) {
        body = atob(email.payload.body.data);
      }
      
      return {
        id: email.id,
        from: headers.find(h => h.name === 'From')?.value || 'Unknown',
        subject: headers.find(h => h.name === 'Subject')?.value || 'No Subject',
        date: headers.find(h => h.name === 'Date')?.value || '',
        body: body.replace(/\r\n/g, '\n').substring(0, 500),
      };
    });

    return Response.json({ emails: parsed });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});