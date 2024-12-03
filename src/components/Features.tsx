import React from 'react';

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-2">Tradition & Modern</h3>
        <p className="text-gray-400">
          Fusion of traditional Japanese calligraphy and AI technology
        </p>
      </div>
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-2">Beautiful Writing</h3>
        <p className="text-gray-400">
          Using professional calligraphy fonts for authentic aesthetics
        </p>
      </div>
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-xl font-bold mb-2">Free to Use</h3>
        <p className="text-gray-400">
          Perfect for social media, profiles, and personal branding
        </p>
      </div>
    </div>
  );
}