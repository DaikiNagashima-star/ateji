export function createContactEmailTemplate(name: string, email: string, message: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="margin-top: 20px;"><strong>Message:</strong></p>
        <div style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  `;