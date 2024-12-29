import React from 'react';
import { Brush } from 'lucide-react';

export function Header() {
  return (
    <header className="container mx-auto px-4 py-16 text-center">
      <Brush className="w-16 h-16 mx-auto mb-6 text-red-500" />
      <h1 className="text-5xl font-bold mb-4">Ateji</h1>
      <p className="text-xl text-gray-300 mb-8">
        あなたの名前を美しい漢字に変換します
      </p>
    </header>
  );
}