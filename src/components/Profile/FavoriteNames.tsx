import React from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import type { KanjiResult } from '../../types';

interface FavoriteNamesProps {
  onKanjiSelect?: (kanji: KanjiResult) => void;
}

export function FavoriteNames({ onKanjiSelect }: FavoriteNamesProps) {
  const { favorites, loading, error } = useFavorites();

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

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
      {favorites.map((kanji) => (
        <div
          key={kanji.id}
          onClick={() => onKanjiSelect?.(kanji)}
          className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 
                   transition-colors cursor-pointer group"
        >
          <div className="text-lg font-japanese mb-1 group-hover:text-white">
            {kanji.kanji} ({kanji.reading})
          </div>
          <div className="text-sm text-gray-400 group-hover:text-gray-300">
            {kanji.meaning}
          </div>
          {kanji.savedAt && (
            <div className="mt-2 text-xs text-gray-500">
              Saved {new Date(kanji.savedAt.seconds * 1000).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}