import React from 'react';
import { Info, Users, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="flex flex-col items-center text-center p-6">
        <Info className="w-8 h-8 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
        <p className="text-gray-400">
          Bridging cultures through the art of Japanese names, making kanji accessible and meaningful for everyone.
        </p>
      </div>

      <div className="flex flex-col items-center text-center p-6">
        <Users className="w-8 h-8 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">Who We Are</h3>
        <p className="text-gray-400">
          A passionate team of language enthusiasts and developers dedicated to cultural exchange.
        </p>
      </div>

      <div className="flex flex-col items-center text-center p-6">
        <Globe className="w-8 h-8 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">Global Community</h3>
        <p className="text-gray-400">
          Join thousands of users worldwide discovering their names in Japanese kanji.
        </p>
      </div>
    </div>
  );
}