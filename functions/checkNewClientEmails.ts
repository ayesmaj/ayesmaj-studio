import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Get Gmail access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('gmail');
    
    // Fetch recent emails from Gmail
    const response = await fetch(
      'https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread from:(inquiry OR contact OR client OR project) newer_than:1h&maxResults=10',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch Gmail messages' }, { status: 400 });
    }
    
    const data = await response.json();
    const messages = data.messages || [];
    
    if (messages.length === 0) {
      return Response.json({ success: true, newEmails: [] });
    }
    
    // Get full email details for each message
    const emailPromises = messages.map(msg =>
      fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }).then(r => r.json())
    );
    
    const emails = await Promise.all(emailPromises);
    
    // Extract sender and subject info
    const newEmails = emails.map(email => {
      const headers = email.payload.headers;
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No subject';
      const date = headers.find(h => h.name === 'Date')?.value || '';
      
      return { from, subject, date, id: email.id };
    });
    
    // Send notification email if new client emails found
    if (newEmails.length > 0) {
      await base44.integrations.Core.SendEmail({
        to: 'ayesmajstudios@gmail.com',
        subject: `🚀 New Client Inquiry - ${newEmails.length} message(s)`,
        body: `
You have ${newEmails.length} new client inquiry message(s):

${newEmails.map(e => `
From: ${e.from}
Subject: ${e.subject}
Date: ${e.date}
---`).join('\n')}

Check your Gmail for more details.
        `
      });
    }
    
    return Response.json({ success: true, newEmails, count: newEmails.length });
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});