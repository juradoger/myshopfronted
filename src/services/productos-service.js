import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, query, where } from "firebase/firestore"
import { FirebaseDB } from "@/firebase/config"
import { sanitizeData } from "@/lib/sanitize-data"

const FIREBASE_KEY = "productos"

const getAll = async () => {
  try {
    const dataRef = collection(FirebaseDB, FIREBASE_KEY)
    const snapshot = await getDocs(dataRef)
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return data
  } catch (e) {
    console.error("Error in getAll:", e)
    throw e
  }
}

/* const getCount = async () => {
  try {
    const dataRef = collection(FirebaseDB, FIREBASE_KEY);
    const snapshot = await getCountFromServer(dataRef);
    const total = snapshot.data().count;
    return total;
  } catch (e) {
    console.error('Error in getCount:', e);
    throw e;
  }
}; */

const getById = async (id) => {
  console.log("🚀 ~ getById ~ id:", id)
  const dataRef = doc(FirebaseDB, FIREBASE_KEY, id)
  const snapshot = await getDoc(dataRef)

  if (!snapshot.exists()) throw new Error("Document not found")

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

/* const getByIdRealtime = (id, callback) => {
  if (!id) return null;

  const dataRef = doc(FirebaseDB, FIREBASE_KEY, id);

  return onSnapshot(
    dataRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({ id: snapshot.id, ...snapshot.data() });
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error('Error getting real-time document:', error);
    }
  );
};
 */
const create = async (data) => {
  try {
    const document = await addDoc(collection(FirebaseDB, FIREBASE_KEY), sanitizeData(data))
    return document.id
  } catch (e) {
    console.error("Error in create:", e)
    throw e
  }
}

const update = async (data) => {
  if (!data.id) return

  try {
    await updateDoc(doc(FirebaseDB, FIREBASE_KEY, data.id), data)
    return data.id
  } catch (e) {
    console.error("Error in update:", e)
    throw e
  }
}

const remove = async (id) => {
  try {
    const docRef = doc(FirebaseDB, FIREBASE_KEY, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error in remove:", error)
    throw new Error("No se pudo eliminar")
  }
}

/**
 * Verifica si ya existe un producto con el mismo nombre
 * @param {string} name - Nombre del producto a verificar
 * @returns {Promise<string|null>} - Retorna el ID del producto si existe, null si no existe
 */
const checkNameExists = async (name) => {
  try {
    if (!name || name.trim() === "") return null

    const productsRef = collection(FirebaseDB, FIREBASE_KEY)
    const q = query(productsRef, where("name", "==", name))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Retorna el ID del primer producto encontrado con ese nombre
      return querySnapshot.docs[0].id
    }

    return null
  } catch (error) {
    console.error("Error al verificar nombre duplicado:", error)
    throw error
  }
}
const updateStock = async (productId, quantityPurchased) => {
  try {
    const product = await getById(productId);
    const newStock = product.stock - quantityPurchased;

    if (newStock < 0) {
      throw new Error("Stock cannot be negative");
    }

    await update({ id: productId, stock: newStock });
    return productId;
  } catch (error) {
    console.error("Error in updateStock:", error);
    throw error;
  }
};

/**
 * Verifica si ya existe un producto con el mismo código SKU
 * @param {string} sku - Código SKU del producto a verificar
 * @returns {Promise<string|null>} - Retorna el ID del producto si existe, null si no existe
 */
const checkSkuExists = async (sku) => {
  try {
    // Solo verificar si el SKU no está vacío
    if (!sku || sku.trim() === "") {
      return null
    }

    const productsRef = collection(FirebaseDB, FIREBASE_KEY)
    const q = query(productsRef, where("sku", "==", sku))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Retorna el ID del primer producto encontrado con ese SKU
      return querySnapshot.docs[0].id
    }

    return null
  } catch (error) {
    console.error("Error al verificar SKU duplicado:", error)
    throw error
  }
}

export default {
  getAll,
  //getCount,
  getById,
  //getByIdRealtime,
  create,
  update,
  remove,
  // Nuevos métodos para verificar duplicados
  updateStock,
  checkNameExists,
  checkSkuExists,
}
