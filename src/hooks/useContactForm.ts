import { useState } from 'react';
import { contactFormSchema, type ContactFormData, type ContactFormState } from '../types/contact';
import { sendContactEmail } from '../services/email/sendgrid';

interface FormErrors {
  [key: string]: string | undefined;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [formState, setFormState] = useState<ContactFormState>({
    status: 'idle',
    error: null
  });

  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string) => {
    try {
      const field = contactFormSchema.shape[name as keyof ContactFormData];
      field.parse(value);
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof Error) {
        setFieldErrors(prev => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    
    try {
      setFormState({ status: 'submitting', error: null });
      
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);
      
      // Send email
      await sendContactEmail(validatedData);
      
      // Reset form on success
      setFormData({ name: '', email: '', message: '' });
      setFormState({ status: 'success', error: null });
    } catch (error) {
      console.error('Contact form error:', error);
      
      if (error instanceof Error && 'issues' in error) {
        // Handle Zod validation errors
        const zodError = error as { issues: Array<{ path: string[]; message: string }> };
        const errors: FormErrors = {};
        
        zodError.issues.forEach(issue => {
          const field = issue.path[0];
          errors[field.toString()] = issue.message;
        });
        
        setFieldErrors(errors);
        setFormState({
          status: 'error',
          error: 'Please fix the form errors and try again.'
        });
      } else {
        // Handle API errors
        setFormState({
          status: 'error',
          error: error instanceof Error ? error.message : 'An unexpected error occurred'
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return {
    formData,
    formState,
    fieldErrors,
    handleSubmit,
    handleChange
  };
}