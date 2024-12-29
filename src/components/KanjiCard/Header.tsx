import React from 'react';

interface HeaderProps {
  number: number;
  kanji: string;
  reading: string;
  meaning: string;
}

export function Header({ number, kanji, reading, meaning }: HeaderProps) {
  return (
    <div className="mb-4">
      <div className="text-xl font-semibold">
        {number}. {kanji} ({reading}) (Meaning: {meaning})
      </div>
    </div>
  );
}