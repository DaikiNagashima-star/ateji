import React from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="flex flex-col items-center text-center p-6">
        <Mail className="w-8 h-8 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">Email Us</h3>
        <a 
          href="mailto:contact@ateji.com"
          className="text-gray-400 hover:text-white transition-colors"
        >
          contact@ateji.com
        </a>
      </div>

      <div className="flex flex-col items-center text-center p-6">
        <MessageCircle className="w-8 h-8 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
        <p className="text-gray-400">
          Available Monday to Friday
          <br />
          9:00 AM - 5:00 PM JST
        </p>
      </div>

      <div className="flex flex-col items-center text-center p-6">
        <MapPin className="w-8 h-8 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <p className="text-gray-400">
          Tokyo, Japan
          <br />
          〒100-0005
        </p>
      </div>
    </div>
  );
}