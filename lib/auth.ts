//  lib/auth.ts
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getUserWithUsername = async (username: string) => {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as any;
};
