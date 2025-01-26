export interface SearchHistoryItem {
  id: string;
  searchTerm: string;
  searchedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onHistoryChange?: () => void;
}