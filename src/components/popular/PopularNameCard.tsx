import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import type { PopularName } from '../../types/names';

interface PopularNameCardProps extends PopularName {
  onSelect: (name: PopularName) => void;
}

export function PopularNameCard({ english, gender, variations, onSelect }: PopularNameCardProps) {
  return (
    <div 
      onClick={() => onSelect({ english, gender, variations })}
      className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 
                hover:bg-white/10 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-400" />
          <h3 className="text-xl font-semibold">{english}</h3>
          <span className={`text-sm px-2 py-1 rounded-full ${
            gender === 'male' ? 'bg-blue-500/20 text-blue-300' : 
            gender === 'female' ? 'bg-pink-500/20 text-pink-300' :
            'bg-purple-500/20 text-purple-300'
          }`}>
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>

      <div className="space-y-3">
        {variations.slice(0, 2).map((variation, index) => (
          <div key={index} className="p-3 bg-white/5 rounded-lg">
            <div className="text-lg font-japanese mb-1">
              {variation.kanji} ({variation.romaji})
            </div>
            <div className="text-sm text-gray-400">
              {variation.meaning}
            </div>
          </div>
        ))}
        {variations.length > 2 && (
          <div className="text-sm text-gray-400 text-center pt-2">
            +{variations.length - 2} more variations...
          </div>
        )}
      </div>
    </div>
  );
}