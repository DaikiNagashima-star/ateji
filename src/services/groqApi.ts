import Groq from 'groq-sdk';
import type { KanjiResult } from '../types';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateKanjiNames(name: string): Promise<KanjiResult[]> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a Japanese language expert specializing in name translations and kanji character meanings. Generate exactly 10 kanji variations for each name without any other symbols, following the format precisely. Use English (romaji) for readings instead of hiragana."
        },
        {
          role: "user",
          content: `Create 10 kanji name variations for "${name}" in Japanese. Only showing up kanji for the kanji part. Each variation must follow this exact format with no deviations, using English (romaji) for readings:

[kanji] (romaji)
Meaning: [meaning]
Explanation: [detailed explanation]

Example:
美紀 (miki)
Meaning: Beautiful Chronicles
Explanation: "美" (mi) means "beauty" and "紀" (ki) means "chronicles" or "records." This name represents the idea of recording or preserving beauty in some way, such as through art or writing.`
        }
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      stream: false
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('Empty response from Groq API');
    }

    return parseResponse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate kanji names');
  }
}

function parseResponse(text: string): KanjiResult[] {
  try {
    const results: KanjiResult[] = [];
    const entries = text.trim().split(/\n\s*\n/);

    for (const entry of entries) {
      if (!entry.trim()) continue;

      const lines = entry.trim().split('\n');
      const firstLine = lines[0].trim();
      const nameMatch = firstLine.match(/^(.+?)\s+\((.+?)\)$/);

      if (nameMatch) {
        const [, kanji, reading] = nameMatch;
        const meaning = lines.find(line => line.startsWith('Meaning:'))
          ?.replace('Meaning:', '')
          .trim();
        const explanation = lines.find(line => line.startsWith('Explanation:'))
          ?.replace('Explanation:', '')
          .trim();

        if (kanji && reading && meaning && explanation) {
          results.push({ kanji, reading, meaning, explanation });
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