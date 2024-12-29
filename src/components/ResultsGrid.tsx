import React from 'react';
import { KanjiCard } from './KanjiCard';
import type { KanjiResult } from '../types';

interface ResultsGridProps {
  results: KanjiResult[];
}

export function ResultsGrid({ results }: ResultsGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {results.map((result, index) => (
        <KanjiCard key={index} {...result} />
      ))}
    </div>
  );
}