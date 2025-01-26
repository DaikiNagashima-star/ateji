import React, { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { KanjiResult } from '../../types';

interface SavedNamesProps {
  favorites: KanjiResult[];
  onDelete: (kanji: KanjiResult) => void;
  onSelect: (kanji: KanjiResult) => void;
}

export function SavedNames({ favorites, onDelete, onSelect }: SavedNamesProps) {
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (kanji: KanjiResult, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!kanji.id) return;
    
    setDeletingIds(prev => new Set([...prev, kanji.id!]));
    await onDelete(kanji);
    
    setTimeout(() => {
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(kanji.id!);
        return next;
      });
    }, 300); // Match animation duration
  };

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
      <AnimatePresence>
        {favorites.map((kanji) => !deletingIds.has(kanji.id!) && (
          <motion.div
            key={kanji.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-white/5 rounded-lg border border-white/10 relative group 
                     hover:bg-white/10 transition-all duration-300 cursor-pointer"
            onClick={() => onSelect(kanji)}
          >
            <div className="text-lg font-japanese mb-1">
              {kanji.kanji} ({kanji.reading})
            </div>
            <div className="text-sm text-gray-400">{kanji.meaning}</div>
            {kanji.savedAt && (
              <div className="mt-2 text-xs text-gray-500">
                Saved {new Date(kanji.savedAt.seconds * 1000).toLocaleDateString()}
              </div>
            )}
            <button
              onClick={(e) => handleDelete(kanji, e)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/5 
                       hover:bg-red-500/20 text-gray-400 hover:text-red-500 
                       transition-colors opacity-0 group-hover:opacity-100"
              title="Remove from favorites"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}