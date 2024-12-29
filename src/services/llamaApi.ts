import axios from 'axios';
import type { KanjiResult } from '../types';

const LLAMA_API_URL = import.meta.env.VITE_LLAMA_API_URL;
const LLAMA_API_KEY = import.meta.env.VITE_LLAMA_API_KEY;

if (!LLAMA_API_URL || !LLAMA_API_KEY) {
  console.error('Llama API configuration is missing. Please check your environment variables.');
}

const llamaClient = axios.create({
  baseURL: LLAMA_API_URL,
  headers: {
    'Authorization': `Bearer ${LLAMA_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function generateKanjiNames(name: string): Promise<KanjiResult[]> {
  try {
    const prompt = `Generate 4 different kanji name variations for "${name}" in Japanese. 
    For each variation, provide:
    1. The kanji characters
    2. The reading in hiragana
    3. The meaning in English
    4. A detailed explanation of each kanji character used
    Format each result exactly as in this example:
    舞剣流
    (まいける)
    
    Meaning: Dance of the Sword's Flow
    
    Explanation: "舞" (mai) means "dance," "剣" (ken) means "sword," and "流" (ryu) means "flow" or "style." This gives an image of a graceful and skillful warrior, embodying elegance and strength.`;

    const response = await llamaClient.post('', {
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false
    });

    if (!response.data || !response.data.text) {
      throw new Error('Invalid response from Llama API');
    }

    return parseKanjiResponse(response.data.text);
  } catch (error) {
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
    console.error('Error parsing Llama API response:', error);
    throw new Error('Failed to parse kanji names from API response');
  }
}