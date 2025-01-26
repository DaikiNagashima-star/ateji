import type { ContactFormData } from '../../types/contact';
import type { EmailResponse } from '../email/types';

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: EmailResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message');
    }

    if (!result.success) {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Contact API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to send message');
  }
}