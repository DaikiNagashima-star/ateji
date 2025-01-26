import React from 'react';

interface ContactFormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

export function ContactFormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error
}: ContactFormFieldProps) {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <Component
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        rows={isTextarea ? 4 : undefined}
        className={`w-full px-4 py-2 bg-white/10 rounded-lg border 
                   ${error ? 'border-red-500' : 'border-white/20'}
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-red-500`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}