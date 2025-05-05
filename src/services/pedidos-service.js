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
    
    const data = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data();

      // Obtener información de productos con manejo robusto
      const products = await Promise.all(
        data.productos.map(async (productData) => {
          try {
            const productId = typeof productData === 'object' ? productData.id : productData;
            const cantidad = typeof productData === 'object' ? (productData.cantidad || 1) : 1;
            
            const producto = await productosService.getById(productId);
            
            return {
              id: productId,
              nombre: producto.nombre || producto.name || `Producto ${productId.slice(0, 4)}`,
              precio: producto.precio || producto.price || 0,
              cantidad: cantidad
            };
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
          email: '',
          telefono: '',
          avatar: '/placeholder.svg'
        };
      }

      // Calcular total
      const total = data.total || products.reduce((sum, product) => {
        return sum + (product.precio * product.cantidad);
      }, 0);

      return {
        id: doc.id,
        ...data,
        productos: products,
        cliente: usuario,
        fecha: data.fecha?.toDate?.() || data.fecha || new Date(),
        total: total
      };
    }));

    return data.sort((a, b) => b.fecha - a.fecha);
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
        const productId = typeof productData === 'object' ? productData.id : productData;
        const cantidad = typeof productData === 'object' ? (productData.cantidad || 1) : 1;
        
        const producto = await productosService.getById(productId);
        
        return {
          id: productId,
          nombre: producto.nombre || producto.name || `Producto ${productId.slice(0, 4)}`,
          precio: producto.precio || producto.price || 0,
          cantidad: cantidad
        };
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
      email: '',
      telefono: '',
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
    productos: products,
    cliente: usuario,
    fecha: fechaPedido,
    total: total
  };
};

const create = async (data) => {
  try {
    // Normalizar estructura de productos
    const productos = data.productos.map(p => {
      if (typeof p === 'string') {
        return { id: p, cantidad: 1 };
      }
      return {
        id: p.id,
        cantidad: p.cantidad || 1
      };
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