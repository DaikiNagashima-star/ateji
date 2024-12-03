import React from 'react';
import { Github } from 'lucide-react';

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-white/10 pt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-400">
          © {currentYear} Ateji. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/yourusername/ateji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          
          <nav className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}