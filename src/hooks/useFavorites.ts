import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addFavorite, removeFavorite, getFavorites } from '../services/db/favoritesRepository';
import type { KanjiResult } from '../types';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<KanjiResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userFavorites = await getFavorites(user.uid);
      setFavorites(userFavorites);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = async (kanji: KanjiResult) => {
    if (!user) return;

    try {
      setError(null);
      const existingFavorite = favorites.find(f => f.kanji === kanji.kanji);
      
      if (existingFavorite) {
        await removeFavorite(user.uid, existingFavorite.id!);
        setFavorites(prev => prev.filter(k => k.id !== existingFavorite.id));
      } else {
        const newId = await addFavorite(user.uid, kanji);
        const newFavorite = { ...kanji, id: newId };
        setFavorites(prev => [newFavorite, ...prev]);
      }
    } catch (err) {
      setError('Failed to update favorite');
      console.error('Error updating favorite:', err);
    }
  };

  const isFavorite = useCallback((kanji: KanjiResult): boolean => {
    return favorites.some(f => f.kanji === kanji.kanji);
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    refresh: loadFavorites
  };
}