import type { ContactFormData } from '../../types/contact';

const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

if (!SENDGRID_API_KEY) {
  throw new Error('SendGrid API key is not configured');
}

if (!CONTACT_EMAIL) {
  throw new Error('Contact email is not configured');
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: CONTACT_EMAIL }]
        }],
        from: { email: CONTACT_EMAIL },
        reply_to: { email: data.email },
        subject: `Contact Form Submission from ${data.name}`,
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
                <p><strong>From:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p style="margin-top: 20px;"><strong>Message:</strong></p>
                <div style="white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          `.trim()
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error('SendGrid API Error:', error);
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('SendGrid Error:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
}