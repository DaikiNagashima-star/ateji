import React from 'react';
import { ContactForm } from '../contact/ContactForm';

export function Contact() {
  return (
    <div className="animate-fade-in space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </section>

      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}