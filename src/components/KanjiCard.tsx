import React from 'react';

interface KanjiCardProps {
  kanji: string;
  reading: string;
  meaning: string;
  explanation: string;
}

export function KanjiCard({ kanji, reading, meaning, explanation }: KanjiCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 
                    hover:bg-white/10 transition-all duration-300 cursor-pointer">
      <div className="text-center mb-4">
        <h3 className="text-4xl font-bold mb-2 font-japanese">{kanji}</h3>
        <p className="text-gray-400 text-sm">({reading})</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-red-400 font-semibold mb-1">Meaning</h4>
          <p className="text-gray-200">{meaning}</p>
        </div>
        
        <div>
          <h4 className="text-red-400 font-semibold mb-1">Explanation</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{explanation}</p>
        </div>
      </div>
    </div>
  );
}