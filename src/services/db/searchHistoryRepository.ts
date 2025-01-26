import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function addToHistory(userId: string, searchTerm: string) {
  try {
    const historyRef = doc(collection(db, `users/${userId}/searchHistory`));
    await setDoc(historyRef, {
      searchTerm,
      searchedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error adding to history:', error);
    throw new Error('Failed to add to history');
  }
}

export async function getSearchHistory(userId: string, maxResults = 20): Promise<string[]> {
  try {
    const historyQuery = query(
      collection(db, `users/${userId}/searchHistory`),
      orderBy('searchedAt', 'desc'),
      limit(maxResults)
    );
    const snapshot = await getDocs(historyQuery);
    return snapshot.docs
      .map(doc => doc.data().searchTerm)
      .filter((term): term is string => typeof term === 'string');
  } catch (error) {
    console.error('Error getting search history:', error);
    throw new Error('Failed to get search history');
  }
}