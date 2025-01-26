import React from 'react';
import { PopularNameCard } from './PopularNameCard';
import { popularNames } from '../../data/popularNames';
import type { PopularName } from '../../types/names';

interface PopularNamesListProps {
  onNameSelect: (name: PopularName) => void;
}

export function PopularNamesList({ onNameSelect }: PopularNamesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {popularNames.map((name) => (
        <PopularNameCard 
          key={name.english} 
          {...name} 
          onSelect={onNameSelect}
        />
      ))}
    </div>
  );
}