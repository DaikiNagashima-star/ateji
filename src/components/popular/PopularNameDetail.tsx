import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import type { PopularName } from '../../types/names';
import { ShareButtons } from '../ShareButtons';

interface PopularNameDetailProps {
  name: PopularName;
  onBack: () => void;
}

export function PopularNameDetail({ name, onBack }: PopularNameDetailProps) {
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to popular names
      </button>

      <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <User className="w-8 h-8 text-gray-400" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{name.english}</h1>
            <span className={`text-sm px-3 py-1 rounded-full ${
              name.gender === 'male' ? 'bg-blue-500/20 text-blue-300' : 
              name.gender === 'female' ? 'bg-pink-500/20 text-pink-300' :
              'bg-purple-500/20 text-purple-300'
            }`}>
              {name.gender.charAt(0).toUpperCase() + name.gender.slice(1)}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Kanji Variations</h2>
          {name.variations.map((variation, index) => (
            <div 
              key={index}
              className="p-6 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-japanese mb-2">
                    {variation.kanji}
                  </div>
                  <div className="text-lg text-gray-300">
                    Reading: {variation.romaji}
                  </div>
                </div>
                <ShareButtons 
                  kanji={{
                    kanji: variation.kanji,
                    reading: variation.romaji,
                    meaning: variation.meaning,
                    explanation: `A kanji variation for the name ${name.english}`
                  }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Meaning</h3>
                <p className="text-gray-300">{variation.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}