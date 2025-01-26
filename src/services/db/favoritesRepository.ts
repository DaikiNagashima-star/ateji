import { db } from '../../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import type { KanjiResult } from '../../types';

const FAVORITES_COLLECTION = 'favorites';

export async function addFavorite(userId: string, kanji: KanjiResult): Promise<string> {
  try {
    const favoriteRef = doc(collection(db, `users/${userId}/${FAVORITES_COLLECTION}`));
    const favoriteData = {
      ...kanji,
      id: favoriteRef.id,
      userId,
      savedAt: serverTimestamp()
    };

    await setDoc(favoriteRef, favoriteData);
    return favoriteRef.id;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw new Error('Failed to add favorite');
  }
}

export async function removeFavorite(userId: string, favoriteId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, `users/${userId}/${FAVORITES_COLLECTION}`, favoriteId));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw new Error('Failed to remove favorite');
  }
}

export async function getFavorites(userId: string): Promise<KanjiResult[]> {
  try {
    const favoritesQuery = query(
      collection(db, `users/${userId}/${FAVORITES_COLLECTION}`),
      orderBy('savedAt', 'desc')
    );

    const snapshot = await getDocs(favoritesQuery);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as KanjiResult));
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw new Error('Failed to get favorites');
  }
}

export async function isFavorite(userId: string, kanjiId: string): Promise<boolean> {
  if (!userId || !kanjiId) return false;
  
  try {
    const favoriteDoc = await getDoc(doc(db, `users/${userId}/${FAVORITES_COLLECTION}`, kanjiId));
    return favoriteDoc.exists();
  } catch (error) {
    console.error('Error checking favorite status:', error);
    throw new Error('Failed to check favorite status');
  }
}