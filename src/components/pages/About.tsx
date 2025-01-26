import React from 'react';

export function About() {
  return (
    <div className="animate-fade-in space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Ateji</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Bridging cultures through the art of Japanese name translation
        </p>
      </section>

      <section className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed">
            Ateji was born from a simple idea: to help people discover the beauty of their
            names expressed through Japanese kanji characters. What started as a passion
            project has grown into a platform that connects people across cultures through
            the art of name translation.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            We combine traditional Japanese calligraphy principles with modern technology
            to create meaningful and authentic kanji representations of names. Our team
            works tirelessly to ensure each translation captures not just the sound, but
            the essence and meaning behind every name.
          </p>
        </div>
      </section>

      <section className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Our mission is to make Japanese culture more accessible and meaningful to people
          around the world. Through careful name translations and detailed explanations,
          we help create personal connections to Japanese writing and culture.
        </p>
      </section>
    </div>
  );
}