import React from 'react';
import { Header } from './Header';
import { Content } from './Content';

interface KanjiCardProps {
  index: number;
  kanji: string;
  reading: string;
  meaning: string;
  explanation: string;
}

export function KanjiCard({ index, kanji, reading, meaning, explanation }: KanjiCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 
                    hover:bg-white/10 transition-all duration-300">
      <Header 
        number={index + 1} 
        kanji={kanji} 
        reading={reading}
        meaning={meaning}
      />
      <Content explanation={explanation} />
    </div>
  );
}