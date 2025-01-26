import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { ShareButtons } from './ShareButtons';
import { useAuth } from '../contexts/AuthContext';
import { saveKanji, removeKanji } from '../services/userService';
import type { KanjiResult } from '../types';

interface KanjiDetailProps {
  kanji: KanjiResult;
  onBack: () => void;
}

export function KanjiDetail({ kanji, onBack }: KanjiDetailProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveToggle = async () => {
    if (!user) return;

    try {
      setSaving(true);
      if (isSaved) {
        await removeKanji(user.uid, kanji.id!);
        setIsSaved(false);
      } else {
        await saveKanji(user.uid, kanji);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to results
      </button>

      <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-japanese mb-4">
            {kanji.kanji}
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Reading: {kanji.reading}
          </p>
          <p className="text-2xl font-semibold mb-6">
            {kanji.meaning}
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            {user && (
              <button
                onClick={handleSaveToggle}
                disabled={saving}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isSaved
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            )}
            <ShareButtons kanji={kanji} />
          </div>
        </div>

        <div className="space-y-6 mt-8">
          <section>
            <h3 className="text-xl font-semibold mb-3">Detailed Explanation</h3>
            <p className="text-gray-300 leading-relaxed">
              {kanji.explanation}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}