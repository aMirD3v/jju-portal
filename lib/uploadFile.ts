import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadFile = async (file: File, folder: string) => {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
