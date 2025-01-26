import React from 'react';
import { ArrowLeft, Heart, History, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { getSearchHistory } from '../services/db/searchHistoryRepository';
import { SavedNames } from './Profile/SavedNames';
import { SearchHistory } from './Profile/SearchHistory';
import { KanjiDetail } from './KanjiDetail';
import type { KanjiResult } from '../types';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading, error: favoritesError, toggleFavorite } = useFavorites();
  const [searchHistory, setSearchHistory] = React.useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = React.useState(true);
  const [historyError, setHistoryError] = React.useState<string | null>(null);
  const [selectedKanji, setSelectedKanji] = React.useState<KanjiResult | null>(null);

  const loadSearchHistory = React.useCallback(async () => {
    if (!user) return;
    
    try {
      setHistoryLoading(true);
      const history = await getSearchHistory(user.uid);
      setSearchHistory(history);
    } catch (err) {
      console.error('Error loading search history:', err);
      setHistoryError('Failed to load search history');
    } finally {
      setHistoryLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  const handleDelete = async (kanji: KanjiResult) => {
    if (!user) return;
    try {
      await toggleFavorite(kanji);
    } catch (err) {
      console.error('Error deleting favorite:', err);
    }
  };

  if (!user) return null;

  const loading = favoritesLoading || historyLoading;
  const error = favoritesError || historyError;

  if (selectedKanji) {
    return (
      <KanjiDetail
        kanji={selectedKanji}
        onBack={() => setSelectedKanji(null)}
      />
    );
  }

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
        <div className="flex items-center gap-4 mb-8">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Profile'}
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-red-400 text-center p-4 bg-red-500/10 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <section className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-semibold">Saved Names</h3>
              </div>
              <SavedNames
                favorites={favorites}
                onDelete={handleDelete}
                onSelect={setSelectedKanji}
              />
            </section>

            <section className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-semibold">Search History</h3>
              </div>
              <SearchHistory
                history={searchHistory}
                onHistoryChange={loadSearchHistory}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}