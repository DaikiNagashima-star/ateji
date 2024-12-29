export interface KanjiResult {
  kanji: string;
  reading: string;
  meaning: string;
  explanation: string;
}

// Mock data for development and testing
export const mockResults: KanjiResult[] = [
  {
    kanji: '舞剣流',
    reading: 'まいける',
    meaning: "Dance of the Sword's Flow",
    explanation: '"舞" (mai) means "dance," "剣" (ken) means "sword," and "流" (ryu) means "flow" or "style." This gives an image of a graceful and skillful warrior, embodying elegance and strength.'
  },
  {
    kanji: '満夢気流',
    reading: 'まいける',
    meaning: 'Full of Dreams, Rising in the Air',
    explanation: '"満" (man) means "full," "夢" (yume) means "dream," "気" (ki) means "spirit," and "流" (ryu) means "flow." Together, it evokes the sense of someone who dreams big and moves freely through life.'
  }
];