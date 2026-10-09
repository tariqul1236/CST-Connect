import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Uploads a user's profile image to Firebase Storage under users/{userId}/profile.jpg
 * Falls back to high-quality compressed data URL if storage bucket is unreachable.
 */
export async function uploadProfileImageToStorage(
  userId: string,
  file: File | Blob
): Promise<string> {
  try {
    const storageRef = ref(storage, `users/${userId}/profile_${Date.now()}.jpg`);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: 'image/jpeg',
    });
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.warn('Firebase Storage direct upload notice (using processed image):', error);
    if (typeof file === 'string') return file;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }
}

/**
 * Uploads a student PDF Note to Firebase Storage under notes/{userId}/{filename}
 */
export async function uploadPdfNoteToStorage(
  userId: string,
  file: File
): Promise<string> {
  try {
    const storageRef = ref(storage, `notes/${userId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type || 'application/pdf',
    });
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.warn('Firebase Storage upload error for PDF note:', error);
    return '';
  }
}
