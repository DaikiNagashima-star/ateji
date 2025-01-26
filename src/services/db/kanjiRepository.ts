import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import type { KanjiResult } from '../../types';

export async function saveKanji(userId: string, kanji: KanjiResult) {
  try {
    const kanjiRef = doc(collection(db, `users/${userId}/savedKanji`));
    await setDoc(kanjiRef, {
      ...kanji,
      savedAt: new Date().toISOString()
    });
    return kanjiRef.id;
  } catch (error) {
    console.error('Error saving kanji:', error);
    throw new Error('Failed to save kanji');
  }
}

export async function removeKanji(userId: string, kanjiId: string) {
  try {
    await deleteDoc(doc(db, `users/${userId}/savedKanji`, kanjiId));
  } catch (error) {
    console.error('Error removing kanji:', error);
    throw new Error('Failed to remove kanji');
  }
}

export async function getSavedKanji(userId: string): Promise<KanjiResult[]> {
  try {
    const kanjiQuery = query(
      collection(db, `users/${userId}/savedKanji`),
      orderBy('savedAt', 'desc')
    );
    const snapshot = await getDocs(kanjiQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as KanjiResult));
  } catch (error) {
    console.error('Error getting saved kanji:', error);
    throw new Error('Failed to get saved kanji');
  }
}