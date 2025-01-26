import React, { useState } from 'react';
import { Header } from './components/Header';
import { NameInput } from './components/NameInput';
import { ResultsGrid } from './components/ResultsGrid';
import { Features } from './components/Features';
import { SlidingKanji } from './components/SlidingKanji';
import { KanjiDetail } from './components/KanjiDetail';
import { Profile } from './components/Profile';
import { ProfileButton } from './components/ProfileButton';
import { AuthProvider } from './contexts/AuthContext';
import { KanjiResult } from './types';
import { generateKanjiNames } from './services/groqApi';

type View = 'list' | 'detail' | 'profile';

interface RouteState {
  view: View;
  selectedKanji: KanjiResult | null;
}

function App() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<KanjiResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<RouteState>({
    view: 'list',
    selectedKanji: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);
    setRoute({ view: 'list', selectedKanji: null });
    
    try {
      const kanjiResults = await generateKanjiNames(name.trim());
      setResults(kanjiResults);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to generate kanji names. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKanjiSelect = (kanji: KanjiResult) => {
    setRoute({
      view: 'detail',
      selectedKanji: kanji,
    });
  };

  const handleBack = () => {
    setRoute({
      view: 'list',
      selectedKanji: null,
    });
  };

  const handleProfileClick = () => {
    setRoute({
      view: 'profile',
      selectedKanji: null,
    });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <ProfileButton />
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mb-16">
            <SlidingKanji />
            
            {route.view === 'list' && (
              <>
                <NameInput
                  name={name}
                  isLoading={isLoading}
                  onChange={setName}
                  onSubmit={handleSubmit}
                />

                {error && (
                  <div className="text-red-400 text-center mb-8 p-4 bg-red-500/10 rounded-lg">
                    {error}
                  </div>
                )}

                {results.length > 0 && (
                  <div className="animate-fade-in">
                    <ResultsGrid results={results} onKanjiSelect={handleKanjiSelect} />
                  </div>
                )}
              </>
            )}

            {route.view === 'detail' && route.selectedKanji && (
              <KanjiDetail
                kanji={route.selectedKanji}
                onBack={handleBack}
              />
            )}

            {route.view === 'profile' && (
              <Profile onBack={handleBack} />
            )}
          </div>

          <Features />
        </main>

        <footer className="container mx-auto px-4 py-8 mt-16 text-center text-gray-400">
          <p>© 2024 Ateji. All rights reserved.</p>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;