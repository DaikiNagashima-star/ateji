export interface KanjiResult {
  id?: string;
  kanji: string;
  reading: string;
  meaning: string;
  explanation: string;
}

export interface SavedKanji extends KanjiResult {
  savedAt: Date;
}

export interface RouteState {
  view: 'list' | 'detail' | 'profile';
  selectedKanji: KanjiResult | null;
}