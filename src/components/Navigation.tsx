import React from 'react';
import type { View } from '../types';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="flex items-center justify-center w-full">
      {['home', 'popular', 'about', 'contact'].map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view as View)}
          className={`relative px-8 py-3 text-lg tracking-wide transition-all duration-300
            ${currentView === view 
              ? 'text-white font-medium' 
              : 'text-gray-400 hover:text-white'
            }
            before:content-[""] before:absolute before:bottom-0 before:left-1/2 
            before:w-0 before:h-[2px] before:bg-red-500 
            before:transition-all before:duration-300 before:-translate-x-1/2
            ${currentView === view ? 'before:w-1/2' : 'hover:before:w-1/4'}
          `}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </nav>
  );
}