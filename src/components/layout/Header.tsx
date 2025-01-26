import React from 'react';
import { ProfileButton } from '../ProfileButton';
import { Navigation } from '../Navigation';
import { Brush } from 'lucide-react';
import type { View } from '../../types';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="relative bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center">
          <div className="absolute right-6 top-6">
            <ProfileButton onProfileClick={() => onViewChange('profile')} />
          </div>
          
          <div className="text-center py-12">
            <Brush className="w-16 h-16 mx-auto mb-8 text-red-500 transform hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-6xl font-bold mb-6 text-white">
              Ateji
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your name into beautiful Japanese kanji characters
            </p>
          </div>

          <div className="mt-8 w-full max-w-3xl mx-auto">
            <Navigation currentView={currentView} onViewChange={onViewChange} />
          </div>
        </div>
      </div>
    </header>
  );
}