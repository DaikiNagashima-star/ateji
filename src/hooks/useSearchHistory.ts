import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { deleteFromHistory } from '../services/db/searchHistoryRepository';
import type { SearchHistoryItem } from '../types/search';

export function useSearchHistory(initialHistory: SearchHistoryItem[]) {
  const { user } = useAuth();
  const [history, setHistory] = useState(initialHistory);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (id: string) => {
    if (!user) return;

    setDeletingIds(prev => new Set([...prev, id]));
    try {
      await deleteFromHistory(user.uid, id);
      setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting history item:', err);
    } finally {
      setTimeout(() => {
        setDeletingIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 300);
    }
  };

  return {
    history,
    deletingIds,
    handleDelete
  };
}