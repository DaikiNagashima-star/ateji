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

export type View = 'home' | 'about' | 'contact' | 'detail' | 'profile' | 'popular';

export interface RouteState {
  view: View;
  selectedKanji: KanjiResult | null;
}