import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { SearchHistoryEmpty } from './SearchHistoryEmpty';
import { SearchHistoryItem } from './SearchHistoryItem';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import type { SearchHistoryProps } from '../../types/search';

export function SearchHistory({ history: initialHistory }: SearchHistoryProps) {
  const { history, deletingIds, handleDelete } = useSearchHistory(initialHistory);

  if (history.length === 0) {
    return <SearchHistoryEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      <AnimatePresence>
        {history.map(item => 
          !deletingIds.has(item.id) && (
            <SearchHistoryItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}