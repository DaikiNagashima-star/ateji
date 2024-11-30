import React from 'react';
import { Heart } from 'lucide-react';
import type { KanjiResult } from '../../types';

interface FavoriteNamesProps {
  favorites: KanjiResult[];
}

export function FavoriteNames({ favorites }: FavoriteNamesProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg">
        <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">No favorite names yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {favorites.map((name) => (
        <div
          key={name.kanji}
          className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
        >
          <div className="text-lg font-japanese mb-1">
            {name.kanji} ({name.reading})
          </div>
          <div className="text-sm text-gray-400">{name.meaning}</div>
        </div>
      ))}
    </div>
  );
}