import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { Popular } from './components/pages/Popular';
import { KanjiDetail } from './components/KanjiDetail';
import { Profile } from './components/Profile';
import { useAuth } from './contexts/AuthContext';
import { generateKanjiNames } from './services/groqApi';
import { addToHistory } from './services/db/searchHistoryRepository';
import type { KanjiResult, RouteState, View } from './types';

export default function App() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [results, setResults] = useState<KanjiResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<RouteState>({
    view: 'home',
    selectedKanji: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);
    
    try {
      const kanjiResults = await generateKanjiNames(name.trim());
      setResults(kanjiResults);
      
      if (user) {
        await addToHistory(user.uid, name.trim());
      }
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

  const handleViewChange = (view: View) => {
    setRoute({
      view,
      selectedKanji: null,
    });
  };

  const renderContent = () => {
    switch (route.view) {
      case 'home':
        return (
          <Home
            name={name}
            isLoading={isLoading}
            error={error}
            results={results}
            onNameChange={setName}
            onSubmit={handleSubmit}
            onKanjiSelect={handleKanjiSelect}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'popular':
        return <Popular />;
      case 'detail':
        return route.selectedKanji ? (
          <KanjiDetail
            kanji={route.selectedKanji}
            onBack={() => handleViewChange('home')}
          />
        ) : null;
      case 'profile':
        return <Profile onBack={() => handleViewChange('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header currentView={route.view} onViewChange={handleViewChange} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-16">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}