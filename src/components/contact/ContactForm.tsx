import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';
import { ContactFormField } from './ContactFormField';
import { ContactFormStatus } from './ContactFormStatus';

export function ContactForm() {
  const { formData, formState, fieldErrors, handleSubmit, handleChange } = useContactForm();
  const { status } = formState;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ContactFormField
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={fieldErrors.name}
      />

      <ContactFormField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={fieldErrors.email}
      />

      <ContactFormField
        id="message"
        name="message"
        label="Message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        error={fieldErrors.message}
      />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 
                 bg-red-500 hover:bg-red-600 rounded-lg transition-colors 
                 text-white font-medium disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      <ContactFormStatus {...formState} />
    </form>
  );
}