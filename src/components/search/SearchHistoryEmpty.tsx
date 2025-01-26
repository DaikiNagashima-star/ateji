import React from 'react';
import { History } from 'lucide-react';

export function SearchHistoryEmpty() {
  return (
    <div className="text-center py-12 bg-white/5 rounded-lg">
      <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-400">No search history</p>
    </div>
  );
}