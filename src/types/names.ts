export interface KanjiVariation {
  kanji: string;
  romaji: string;
  meaning: string;
}

export interface PopularName {
  english: string;
  gender: 'male' | 'female' | 'unisex';
  variations: KanjiVariation[];
}