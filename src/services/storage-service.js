import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FirebaseStorage } from '../firebase/config';

/**
 * Sube un archivo a Firebase Storage y devuelve la URL del archivo.
 * @param {File} file - El archivo que se desea subir.
 * @param {string} path - La ruta en el bucket donde se guardará el archivo.
 * @returns {Promise<string>} - URL del archivo subido.
 */
export const uploadFileToFirebase = async (file, path) => {
  try {
    const storageRef = ref(FirebaseStorage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    throw error;
  }
};
