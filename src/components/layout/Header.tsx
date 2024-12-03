import React from 'react';
import { ProfileButton } from '../ProfileButton';
import { Brush } from 'lucide-react';

export function Header() {
  return (
    <header className="relative bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <ProfileButton />
        <div className="text-center py-12">
          <Brush className="w-16 h-16 mx-auto mb-6 text-red-500" />
          <h1 className="text-5xl font-bold mb-4">Ateji</h1>
          <p className="text-xl text-gray-300">
            Transform your name into beautiful Japanese kanji characters
          </p>
        </div>
      </div>
    </header>
  );
}