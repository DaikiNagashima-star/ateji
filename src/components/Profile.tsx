import React from 'react';
import { ArrowLeft, Heart, History } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { KanjiResult } from '../types';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { user } = useAuth();
  const [savedNames, setSavedNames] = React.useState<KanjiResult[]>([]);
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);

  // In a real app, you'd fetch this data from your backend
  React.useEffect(() => {
    // Simulate loading saved names and history
    setSavedNames([]);
    setSearchHistory([]);
  }, [user]);

  if (!user) {
    return null;
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

        <section className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-semibold">Saved Names</h3>
          </div>
          {savedNames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedNames.map((name, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="text-lg font-japanese mb-1">
                    {name.kanji} ({name.reading})
                  </div>
                  <div className="text-sm text-gray-400">{name.meaning}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No saved names yet</p>
          )}
        </section>

        <section className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Search History</h3>
          </div>
          {searchHistory.length > 0 ? (
            <div className="space-y-2">
              {searchHistory.map((search, index) => (
                <div
                  key={index}
                  className="p-2 bg-white/5 rounded-lg border border-white/10"
                >
                  {search}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No search history</p>
          )}
        </section>
      </div>
    </div>
  );
}