import { db } from '../../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc,
  getDocs, 
  query, 
  orderBy, 
  limit,
  serverTimestamp
} from 'firebase/firestore';

const HISTORY_COLLECTION = 'searchHistory';

export async function addToHistory(userId: string, searchTerm: string) {
  try {
    const historyRef = doc(collection(db, `users/${userId}/${HISTORY_COLLECTION}`));
    await setDoc(historyRef, {
      id: historyRef.id,
      searchTerm,
      searchedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding to history:', error);
    throw new Error('Failed to add to history');
  }
}

export async function deleteFromHistory(userId: string, historyId: string) {
  try {
    await deleteDoc(doc(db, `users/${userId}/${HISTORY_COLLECTION}`, historyId));
  } catch (error) {
    console.error('Error deleting from history:', error);
    throw new Error('Failed to delete from history');
  }
}

export async function getSearchHistory(userId: string, maxResults = 20) {
  try {
    const historyQuery = query(
      collection(db, `users/${userId}/${HISTORY_COLLECTION}`),
      orderBy('searchedAt', 'desc'),
      limit(maxResults)
    );
    
    const snapshot = await getDocs(historyQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting search history:', error);
    throw new Error('Failed to get search history');
  }
}