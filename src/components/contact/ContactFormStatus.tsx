import React from 'react';
import type { ContactFormState } from '../../types/contact';

interface ContactFormStatusProps {
  status: ContactFormState['status'];
  error: string | null;
}

export function ContactFormStatus({ status, error }: ContactFormStatusProps) {
  if (status === 'success') {
    return (
      <div className="p-4 bg-green-500/10 rounded-lg text-green-400 text-sm">
        Message sent successfully! We'll get back to you soon.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 rounded-lg text-red-400 text-sm">
        {error}
      </div>
    );
  }

  return null;
}