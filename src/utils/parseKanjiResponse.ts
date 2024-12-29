import type { KanjiResult } from '../types';

export function parseKanjiResponse(text: string): KanjiResult[] {
  try {
    const results: KanjiResult[] = [];
    const entries = text.trim().split(/\n\s*\n/);

    for (const entry of entries) {
      if (!entry.trim()) continue;

      const lines = entry.trim().split('\n');
      const headerMatch = lines[0].match(/^\d+\.\s+(.+?)\s+\((.+?)\)\s+\(Meaning:\s+(.+?)\)$/);
      
      if (headerMatch) {
        const [, kanji, reading, meaning] = headerMatch;
        const explanationLines = lines.slice(2);
        const explanation = explanationLines
          .find(line => line.startsWith('Explanation:'))
          ?.replace('Explanation:', '')
          .trim();

        if (kanji && reading && meaning && explanation) {
          results.push({
            kanji,
            reading,
            meaning,
            explanation
          });
        }
      }
    }

    if (results.length === 0) {
      throw new Error('No valid kanji entries found in the response');
    }

    return results;
  } catch (error) {
    console.error('Parse Error:', error);
    throw new Error('Failed to parse kanji names from response');
  }
}