import Groq from 'groq-sdk';
import type { KanjiResult } from '../types';

const GROQ_API_KEY = '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';

const client = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateKanjiNames(name: string): Promise<KanjiResult[]> {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a Japanese language expert specializing in name translations and kanji character meanings. Respond only with the exact format requested, no additional text."
        },
        {
          role: "user",
          content: `Generate 4 different kanji name variations for "${name}" in Japanese. 
          Format each result exactly as shown in the example below, with no additional text:
          
          舞剣流
          (まいける)
          
          Meaning: Dance of the Sword's Flow
          
          Explanation: "舞" (mai) means "dance," "剣" (ken) means "sword," and "流" (ryu) means "flow" or "style." This gives an image of a graceful and skillful warrior, embodying elegance and strength.`
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      stream: false
    });

    if (!chatCompletion.choices[0]?.message?.content) {
      throw new Error('Invalid response from Groq API');
    }

    return parseKanjiResponse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error('Groq API Error:', error);
    if (error instanceof Error) {
      throw new Error(`API request failed: ${error.message}`);
    }
    throw new Error('Failed to generate kanji names');
  }
}

function parseKanjiResponse(text: string): KanjiResult[] {
  try {
    const results: KanjiResult[] = [];
    const variations = text.split('\n\n');

    for (let i = 0; i < variations.length; i += 4) {
      if (variations[i] && variations[i + 1] && variations[i + 2] && variations[i + 3]) {
        const kanji = variations[i].trim();
        const reading = variations[i + 1].trim().replace(/[()]/g, '');
        const meaning = variations[i + 2].replace('Meaning:', '').trim();
        const explanation = variations[i + 3].replace('Explanation:', '').trim();

        if (kanji && reading && meaning && explanation) {
          results.push({
            kanji,
            reading,
            meaning,
            explanation,
          });
        }
      }
    }

    if (results.length === 0) {
      throw new Error('No valid results parsed from API response');
    }

    return results;
  } catch (error) {
    console.error('Error parsing Groq API response:', error);
    throw new Error('Failed to parse kanji names from API response');
  }
}