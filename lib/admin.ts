import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export async function getAllUsers() {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateUser(id: string, data: { role?: string; name?: string }) {
  const userRef = doc(db, 'users', id);
  await updateDoc(userRef, data);
}
