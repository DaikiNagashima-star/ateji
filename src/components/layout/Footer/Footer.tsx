import React from 'react';
import { About } from './About';
import { Contact } from './Contact';
import { Copyright } from './Copyright';

export function Footer() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <About />
        <Contact />
        <Copyright />
      </div>
    </footer>
  );
}