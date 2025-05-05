import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseDB } from '@/firebase/config';
import { sanitizeData } from '@/lib/sanitize-data';
import productosService from './productos-service';
import userService from './user-service';

const FIREBASE_KEY = 'pedido';

const getAll = async () => {
  try {
    const dataRef = collection(FirebaseDB, FIREBASE_KEY);
    const snapshot = await getDocs(dataRef);
    const data = snapshot.docs.map(async (doc) => {
      const data = doc.data();

      // Obtener información de productos
      const products = await Promise.all(
        data.productos.map(async (productData) => {
          try {
            // Si el producto es un objeto (con id y cantidad)
            if (typeof productData === 'object' && productData.id) {
              const product = await productosService.getById(productData.id);
              return {
                ...product,
                cantidad: productData.cantidad || 1
              };
            } 
            // Si es solo el ID (formato antiguo)
            else {
              const product = await productosService.getById(productData);
              return {
                ...product,
                cantidad: 1
              };
            }
          } catch (error) {
            console.error('Error cargando producto:', productData, error);
            return {
              id: typeof productData === 'object' ? productData.id : productData,
              nombre: `Producto (ID: ${(typeof productData === 'object' ? productData.id : productData).slice(0, 6)}...)`,
              precio: 0,
              cantidad: typeof productData === 'object' ? (productData.cantidad || 1) : 1
            };
          }
        })
      );

      // Obtener información del usuario
      let usuario = null;
      try {
        usuario = await userService.getById(data.idUsuario);
      } catch (error) {
        console.error('Error cargando usuario:', data.idUsuario, error);
        usuario = {
          id: data.idUsuario,
          nombre: `Usuario (ID: ${data.idUsuario.slice(0, 6)}...)`,
          avatar: '/placeholder.svg'
        };
      }

      // Calcular total si no existe
      const total = data.total || products.reduce((sum, product) => {
        return sum + (product.precio * product.cantidad);
      }, 0);

      return {
        id: doc.id,
        ...data,
        productos: products.filter(p => p !== null),
        cliente: usuario,
        fecha: data.fecha?.toDate?.() || data.fecha || new Date(),
        total: total
      };
    });

    const realData = await Promise.all(data);
    return realData.sort((a, b) => b.fecha - a.fecha); // Ordenar por fecha más reciente
  } catch (e) {
    console.error('Error in getAll:', e);
    throw e;
  }
};

const getById = async (id) => {
  const dataRef = doc(FirebaseDB, FIREBASE_KEY, id);
  const snapshot = await getDoc(dataRef);

  if (!snapshot.exists()) throw new Error('Document not found');

  const data = snapshot.data();

  // Convertir la fecha de Firebase Timestamp a Date si es necesario
  const fechaPedido = data.fecha?.toDate ? data.fecha.toDate() : data.fecha;

  // Obtener información completa de cada producto
  const products = await Promise.all(
    data.productos.map(async (productData) => {
      try {
        // Si el producto es un objeto (con id y cantidad)
        if (typeof productData === 'object' && productData.id) {
          const producto = await productosService.getById(productData.id);
          return {
            ...producto,
            cantidad: productData.cantidad || 1
          };
        } 
        // Si es solo el ID (formato antiguo)
        else {
          const producto = await productosService.getById(productData);
          return {
            ...producto,
            cantidad: 1
          };
        }
      } catch (error) {
        console.error("Error cargando producto:", productData, error);
        return {
          id: typeof productData === 'object' ? productData.id : productData,
          nombre: `Producto (ID: ${(typeof productData === 'object' ? productData.id : productData).slice(0, 6)}...)`,
          precio: 0,
          cantidad: typeof productData === 'object' ? (productData.cantidad || 1) : 1
        };
      }
    })
  );

  // Obtener información del usuario
  let usuario = null;
  try {
    usuario = await userService.getById(data.idUsuario);
  } catch (error) {
    console.error("Error cargando usuario:", data.idUsuario, error);
    usuario = {
      id: data.idUsuario,
      nombre: `Usuario (ID: ${data.idUsuario.slice(0, 6)}...)`,
      avatar: '/placeholder.svg'
    };
  }

  // Calcular total si no existe
  const total = data.total || products.reduce((sum, product) => {
    return sum + (product.precio * product.cantidad);
  }, 0);

  return {
    id: snapshot.id,
    ...data,
    productos: products.filter(p => p !== null),
    cliente: usuario,
    fecha: fechaPedido,
    total: total
  };
};

const create = async (data) => {
  try {
    // Asegurar que los productos tengan la estructura correcta
    const productos = data.productos.map(p => {
      if (typeof p === 'string') {
        return { id: p, cantidad: 1 };
      }
      return p;
    });

    const pedidoData = {
      ...data,
      productos,
      fecha: new Date(),
      estado: data.estado || 'Pendiente'
    };

    const document = await addDoc(
      collection(FirebaseDB, FIREBASE_KEY),
      sanitizeData(pedidoData)
    );
    return document.id;
  } catch (e) {
    console.error('Error in create:', e);
    throw e;
  }
};

const update = async (data) => {
  if (!data.id) return;

  try {
    await updateDoc(doc(FirebaseDB, FIREBASE_KEY, data.id), data);
    return data.id;
  } catch (e) {
    console.error('Error in update:', e);
    throw e;
  }
};

const remove = async (id) => {
  try {
    const docRef = doc(FirebaseDB, FIREBASE_KEY, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error in remove:', error);
    throw new Error('No se pudo eliminar');
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};