import React from 'react';
import { History } from 'lucide-react';

interface SearchHistoryProps {
  searches: string[];
}

export function SearchHistory({ searches }: SearchHistoryProps) {
  if (searches.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg">
        <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">No search history</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {searches.map((search, index) => (
        <div
          key={index}
          className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
        >
          {search}
        </div>
      ))}
    </div>
  );
}