import React from 'react';

interface KanjiCardProps {
  index: number;
  kanji: string;
  reading: string;
  meaning: string;
  explanation: string;
}

export function KanjiCard({ kanji, reading, meaning, explanation }: KanjiCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 
                    hover:bg-white/10 transition-all duration-300">
      <div className="mb-6">
        <div className="text-2xl font-japanese mb-2">
          {kanji} ({reading})
        </div>
        <div className="text-lg text-gray-200">
          Meaning: {meaning}
        </div>
      </div>
      
      <div className="text-gray-300">
        <p className="leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
}