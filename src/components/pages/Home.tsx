import React from 'react';
import { NameInput } from '../NameInput';
import { ResultsGrid } from '../ResultsGrid';
import { Features } from '../Features';
import { SlidingKanji } from '../SlidingKanji';
import type { KanjiResult } from '../../types';

interface HomeProps {
  name: string;
  isLoading: boolean;
  error: string | null;
  results: KanjiResult[];
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKanjiSelect: (kanji: KanjiResult) => void;
}

export function Home({
  name,
  isLoading,
  error,
  results,
  onNameChange,
  onSubmit,
  onKanjiSelect
}: HomeProps) {
  return (
    <div className="animate-fade-in">
      <SlidingKanji />
      
      <NameInput
        name={name}
        isLoading={isLoading}
        onChange={onNameChange}
        onSubmit={onSubmit}
      />

      {error && (
        <div className="text-red-400 text-center mb-8 p-4 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="animate-fade-in">
          <ResultsGrid results={results} onKanjiSelect={onKanjiSelect} />
        </div>
      )}

      <Features />
    </div>
  );
}