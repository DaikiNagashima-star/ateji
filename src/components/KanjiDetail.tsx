import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ShareButtons } from './ShareButtons';
import type { KanjiResult } from '../types';

interface KanjiDetailProps {
  kanji: KanjiResult;
  onBack: () => void;
}

export function KanjiDetail({ kanji, onBack }: KanjiDetailProps) {
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to results
      </button>

      <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-japanese mb-4">
            {kanji.kanji}
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Reading: {kanji.reading}
          </p>
          <p className="text-2xl font-semibold mb-6">
            {kanji.meaning}
          </p>
          
          <ShareButtons kanji={kanji} />
        </div>

        <div className="space-y-6 mt-8">
          <section>
            <h3 className="text-xl font-semibold mb-3">Detailed Explanation</h3>
            <p className="text-gray-300 leading-relaxed">
              {kanji.explanation}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}