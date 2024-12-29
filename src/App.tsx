import React, { useState } from 'react';
import { Header } from './components/Header';
import { NameInput } from './components/NameInput';
import { ResultsGrid } from './components/ResultsGrid';
import { Features } from './components/Features';
import { KanjiResult } from './types';
import { generateKanjiNames } from './services/groqApi';

function App() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<KanjiResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-16">
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
              <ResultsGrid results={results} />
            </div>
          )}
        </div>

        <Features />
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 text-center text-gray-400">
        <p>© 2024 Ateji. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;