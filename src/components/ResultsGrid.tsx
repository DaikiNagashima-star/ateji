import React from 'react';
import { KanjiCard } from './KanjiCard';
import type { KanjiResult } from '../types';

interface ResultsGridProps {
  results: KanjiResult[];
  onKanjiSelect: (kanji: KanjiResult) => void;
}

export function ResultsGrid({ results, onKanjiSelect }: ResultsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {results.map((result, index) => (
        <div 
          key={index}
          className={`opacity-0 float-in float-in-delay-${index + 1} cursor-pointer`}
          onClick={() => onKanjiSelect(result)}
        >
          <KanjiCard {...result} index={index} />
        </div>
      ))}
    </div>
  );
}