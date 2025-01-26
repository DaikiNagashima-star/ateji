import React from 'react';

interface HeaderProps {
  kanji: string;
  reading: string;
  meaning: string;
}

export function Header({ kanji, reading, meaning }: HeaderProps) {
  return (
    <div className="mb-4">
      <div className="text-xl font-semibold">
        {kanji} ({reading}) - {meaning}
      </div>
    </div>
  );
}