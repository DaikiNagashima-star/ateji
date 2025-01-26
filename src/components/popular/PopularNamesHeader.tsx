import React from 'react';
import { Star } from 'lucide-react';

export function PopularNamesHeader() {
  return (
    <section className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star className="w-8 h-8 text-yellow-500" />
        <h1 className="text-4xl font-bold">Popular Names</h1>
      </div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Discover how common English names are written in Japanese kanji
      </p>
    </section>
  );
}