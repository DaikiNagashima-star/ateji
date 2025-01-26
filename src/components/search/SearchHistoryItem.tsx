import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SearchHistoryItem as SearchHistoryItemType } from '../../types/search';

interface SearchHistoryItemProps {
  item: SearchHistoryItemType;
  onDelete: (id: string) => void;
}

export function SearchHistoryItem({ item, onDelete }: SearchHistoryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-white/5 rounded-lg border border-white/10 
                flex items-center justify-between group relative"
    >
      <div>
        <span className="text-gray-300">{item.searchTerm}</span>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(item.searchedAt.seconds * 1000).toLocaleDateString()}
        </div>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 
                text-gray-400 hover:text-red-500 transition-colors 
                opacity-0 group-hover:opacity-100"
        title="Remove from history"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}