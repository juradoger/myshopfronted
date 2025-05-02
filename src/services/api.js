/**
 * Servicio para obtener productos de ropa de alta calidad
 */

// Usamos una combinación de APIs para obtener datos de ropa de calidad
const CLOTHING_API = 'https://fakestoreapi.com/products/category/clothing';

//INICIOOOOO

// Definir imágenes personalizadas para cada categoría y subacategoría
const CUSTOM_IMAGES = {
  // Imagen para el hero/banner principal
  hero: '/src/assets/img/portada.gif',

  // Imágenes para categorías
  categorias: {
    mujer: '/src/assets/img/mujer.jpeg',
    hombre: '/src/assets/img/hombre.jpeg',
    nino: '/src/assets/img/nino.jpeg',
    nina: '/src/assets/img/nina.jpeg',
    unisex: '/src/assets/img/oufitunisex.jpeg',
  },

  // Imágenes para subcategorías
  subcategorias: {
    camisas: '/src/assets/img/camisa.jpeg',
    trajes: '/src/assets/img/traje.jpeg',
    saco: '/src/assets/img/saco.jpeg',
    pantalones: '/src/assets/img/pantalob.jpeg',
    blusas: '/src/assets/img/blusa.jpeg',
    vestidos: '/src/assets/img/vestido.jpeg',
  },
};

/**
 * Obtiene productos de ropa con datos completos e imágenes personalizadas
 * @returns {Promise<Array>} - Array de productos de ropa
 */
export const fetchClothingProducts = async () => {
  try {
    // Si tienes CLOTHING_DATA definido, modifícalo para usar imágenes personalizadas
    const productsWithCustomImages = CLOTHING_DATA.map((product, index) => {
      return {
        ...product,
        image: product.image, // Usa imagen personalizada o la original como fallback
      };
    });

    return productsWithCustomImages;

    // Comentado: Código para obtener datos reales de API
    // const response = await fetch(CLOTHING_API);
    // if (!response.ok) {
    //   throw new Error("Error al obtener productos de ropa");
    // }
    // const data = await response.json();
    // return transformClothingDataWithCustomImages(data);
  } catch (error) {
    console.error('Error en fetchClothingProducts:', error);
    // Si falla, devolver los datos locales como fallback con imágenes personalizadas
    return CLOTHING_DATA.map((product, index) => {
      const category = product.category;
      const images = CUSTOM_IMAGES.products[category] || [];
      const imageIndex = index % images.length;

      return {
        ...product,
        image: images[imageIndex] || product.image,
      };
    });
  }
};

/**
 * Transforma los datos de productos añadiendo imágenes personalizadas
 * @param {Array} products - Productos originales de la API
 * @returns {Array} - Productos transformados con imágenes personalizadas
 */
function transformClothingDataWithCustomImages(products) {
  return products.map((product, index) => {
    const transformedProduct = transformSingleClothingItem(product);
    const category = product.category;

    // Asignar imagen personalizada según la categoría
    if (CUSTOM_IMAGES.products[category]) {
      const images = CUSTOM_IMAGES.products[category];
      const imageIndex = index % images.length;
      transformedProduct.image = images[imageIndex];
    }

    return transformedProduct;
  });
}

/**
 * Transforma los datos de un producto individual con imagen personalizada
 * @param {Object} product - Producto original de la API
 * @returns {Object} - Producto transformado
 */
function transformSingleClothingItem(product) {
  const salesValue = Math.floor(Math.random() * 1500) + 500;
  const salesPercentage = Math.floor(Math.random() * 100);
  const stock = Math.floor(Math.random() * 100) + 50;

  // Buscar imagen personalizada para esta categoría
  let customImage = product.image;
  if (CUSTOM_IMAGES.products[product.category]) {
    const images = CUSTOM_IMAGES.products[product.category];
    const imageIndex = product.id % images.length;
    customImage = images[imageIndex];
  }

  return {
    id: product.id,
    title: mapToClothingTitle(product.title, product.category),
    price: product.price,
    description: product.description,
    image: customImage, // Usar imagen personalizada
    category: product.category,
    stock: stock,
    sales: salesValue,
    salesPercentage: salesPercentage,
  };
}

/**
 * Obtiene un producto de ropa por su ID con imagen personalizada
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} - Datos del producto
 */
export const fetchClothingProductById = async (id) => {
  try {
    // Buscar primero en los datos locales
    const localProduct = CLOTHING_DATA.find(
      (product) => product.id === Number(id)
    );
    if (localProduct) {
      // Aplicar imagen personalizada
      const category = localProduct.category;
      if (CUSTOM_IMAGES.products[category]) {
        return {
          ...localProduct,
        };
      }
      return localProduct;
    }

    // Si no se encuentra localmente, intentar obtenerlo de la API
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }

    const product = await response.json();
    if (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    ) {
      return transformSingleClothingItem(product);
    } else {
      throw new Error('El producto no es una prenda de ropa');
    }
  } catch (error) {
    console.error('Error en fetchClothingProductById:', error);
    throw error;
  }
};

/**
 * Obtiene imágenes personalizadas para el componente Inicio
 * @returns {Object} - Objeto con imágenes para hero, categorías y populares
 */
export const getCustomImagesForHome = () => {
  return {
    hero: CUSTOM_IMAGES.hero,
    categorias: [
      { name: 'HOMBRE', image: CUSTOM_IMAGES.categorias.hombre },
      { name: 'MUJER', image: CUSTOM_IMAGES.categorias.mujer },
      { name: 'NIÑO', image: CUSTOM_IMAGES.categorias.nino },
      { name: 'NIÑA', image: CUSTOM_IMAGES.categorias.nina },
      { name: 'UNISEX', image: CUSTOM_IMAGES.categorias.unisex },
    ],
    subcategorias: [
      { name: 'CAMISAS', image: CUSTOM_IMAGES.subcategorias.camisas },
      { name: 'PANTALONES', image: CUSTOM_IMAGES.subcategorias.pantalones },
      { name: 'SACOS', image: CUSTOM_IMAGES.subcategorias.saco },
      { name: 'BLUSAS', image: CUSTOM_IMAGES.subcategorias.blusas },
      { name: 'VESTIDOS', image: CUSTOM_IMAGES.subcategorias.vestidos },
      { name: 'SACOS', image: CUSTOM_IMAGES.subcategorias.saco },
      { name: 'TRAJES', image: CUSTOM_IMAGES.subcategorias.trajes },
    ],
  };
};

// Mantener las funciones originales de la API
export const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      'https://fakestoreapi.com/products/categories'
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Aplicar imágenes personalizadas a los productos por categoría
    if (CUSTOM_IMAGES.products[category]) {
      return data.map((product, index) => {
        const images = CUSTOM_IMAGES.products[category];
        const imageIndex = index % images.length;
        return {
          ...product,
          image: images[imageIndex],
        };
      });
    }

    return data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};
