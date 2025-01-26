import React, { useState } from 'react';
import { History, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { deleteFromHistory } from '../../services/db/searchHistoryRepository';

interface SearchHistoryItem {
  id: string;
  searchTerm: string;
  searchedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onHistoryChange?: () => void; // Optional if not needed for this scenario
}

export function SearchHistory({
  history: initialHistory,
  onHistoryChange,
}: SearchHistoryProps) {
  const { user } = useAuth();
  const [history, setHistory] = useState(initialHistory);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (id: string) => {
    if (!user) return;

    setDeletingIds((prev) => new Set([...prev, id]));
    try {
      await deleteFromHistory(user.uid, id);
      // Locally update history to remove the deleted item
      setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting history item:', err);
    } finally {
      setTimeout(() => {
        setDeletingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 300); // Match animation duration
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg">
        <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">No search history</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      <AnimatePresence>
        {history.map((item) =>
          !deletingIds.has(item.id) ? (
            <motion.div
              key={item.id}
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
                  {new Date(
                    item.searchedAt.seconds * 1000
                  ).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 
                         text-gray-400 hover:text-red-500 transition-colors 
                         opacity-0 group-hover:opacity-100"
                title="Remove from history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
