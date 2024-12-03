import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, History } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { FavoriteNames } from './FavoriteNames';
import { SearchHistory } from './SearchHistory';
import { useAuth } from '../../contexts/AuthContext';
import type { KanjiResult } from '../../types';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<KanjiResult[]>([]);
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.uid}`) || '[]');
      const savedSearches = JSON.parse(localStorage.getItem(`searches_${user.uid}`) || '[]');
      setFavorites(savedFavorites);
      setSearches(savedSearches);
    }
  }, [user]);

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to converter
      </button>

      <div className="space-y-8">
        <ProfileHeader />

        <section className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-semibold">Favorite Names</h3>
          </div>
          <FavoriteNames favorites={favorites} />
        </section>

        <section className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Search History</h3>
          </div>
          <SearchHistory searches={searches} />
        </section>
      </div>
    </div>
  );
}