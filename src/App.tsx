import React, { useState } from 'react';
import { Footer } from './components/layout';
import { NameInput } from './components/NameInput';
import { ResultsGrid } from './components/ResultsGrid';
import { Features } from './components/Features';
import { SlidingKanji } from './components/SlidingKanji';
import { KanjiDetail } from './components/KanjiDetail';
import { Profile } from './components/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileButton } from './components/ProfileButton';
import { Brush } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <header className="relative bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <ProfileButton onProfileClick={handleProfileClick} />
            <div className="text-center py-12">
              <Brush className="w-16 h-16 mx-auto mb-6 text-red-500" />
              <h1 className="text-5xl font-bold mb-4">Ateji</h1>
              <p className="text-xl text-gray-300">
                Transform your name into beautiful Japanese kanji characters
              </p>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
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

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;