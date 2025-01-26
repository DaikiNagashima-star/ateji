import React, { useEffect, useState } from 'react';

interface ExampleName {
  kanji: string;
  romaji: string;
  meaning: string;
  explanation: string;
}

const examples: ExampleName[] = [
  {
    kanji: "美紀",
    romaji: "miki",
    meaning: "Beautiful Chronicles",
    explanation: '"美" (mi) means "beauty" and "紀" (ki) means "chronicles" or "records." This name represents the idea of recording or preserving beauty in some way.'
  },
  {
    kanji: "光輝",
    romaji: "koki",
    meaning: "Radiant Light",
    explanation: '"光" (ko) means "light" and "輝" (ki) means "radiance." Together they create an image of brilliant illumination.'
  },
  {
    kanji: "和心",
    romaji: "washin",
    meaning: "Peaceful Heart",
    explanation: '"和" (wa) means "peace" or "harmony" and "心" (shin) means "heart" or "spirit." This name embodies tranquility and inner peace.'
  }
];

interface ExampleNamesProps {
  onHide?: () => void;
}

export function ExampleNames({ onHide }: ExampleNamesProps) {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (isHiding) {
      const timer = setTimeout(() => {
        onHide?.();
      }, 1000); // Wait for the animation to complete
      return () => clearTimeout(timer);
    }
  }, [isHiding, onHide]);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
        Example Kanji Names
      </h2>
      <div className="flex gap-6 max-w-6xl mx-auto overflow-x-auto pb-4">
        {examples.map((example, index) => (
          <div 
            key={index}
            className={`flex-none w-96 ${
              isHiding ? `slide-out slide-out-delay-${index + 1}` : `slide-in slide-in-delay-${index + 1}`
            } bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300`}
          >
            <div className="mb-4">
              <div className="text-2xl font-japanese mb-2">
                {example.kanji} ({example.romaji})
              </div>
              <div className="text-lg text-gray-200">
                Meaning: {example.meaning}
              </div>
            </div>
            <div className="text-gray-300">
              <p className="leading-relaxed">{example.explanation}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-400 mt-6">
        Enter your name above to see it transformed into beautiful kanji characters
      </p>
    </div>
  );
}