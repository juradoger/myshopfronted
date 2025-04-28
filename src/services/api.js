/**
 * Servicio para obtener productos de ropa de alta calidad
 */

// Usamos una combinación de APIs para obtener datos de ropa de calidad
const CLOTHING_API = 'https://fakestoreapi.com/products/category/clothing';

// Datos de ropa manualmente curados para complementar la API
const CLOTHING_DATA = [
  {
    id: 1,
    title: 'Chaqueta Elegante',
    price: 110.4,
    description:
      'Esta chaqueta elegante es perfecta para ocasiones formales y eventos de negocios. Combina estilo y confort en un solo artículo.',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
    category: "men's clothing",
    stock: 129,
    sales: 1309,
    salesPercentage: 75,
  },
  {
    id: 2,
    title: 'Saco de Vestir',
    price: 110.4,
    description:
      'Este saco de vestir combina elegancia y estilo. Perfecto para ocasiones formales o cuando necesitas verte impecable.',
    image:
      'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    category: "men's clothing",
    stock: 125,
    sales: 1309,
    salesPercentage: 80,
  },
  {
    id: 3,
    title: 'Pantalón Elegante',
    price: 110.4,
    description:
      'Pantalón elegante de corte recto para ocasiones formales y eventos sociales. Confeccionado con los mejores materiales.',
    image:
      'https://images.unsplash.com/photo-1604176424472-37e8bb659d46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    category: "men's clothing",
    stock: 120,
    sales: 1309,
    salesPercentage: 65,
  },
  {
    id: 4,
    title: 'Pantalón de Mujer Elegante',
    price: 119.4,
    description:
      'Este pantalón de mujer es cómodo y elegante, ideal para combinar en outfits formales o casuales de oficina.',
    image:
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    category: "women's clothing",
    stock: 143,
    sales: 1430,
    salesPercentage: 60,
  },
  {
    id: 5,
    title: 'Camisa de Seda',
    price: 95.4,
    description:
      'Esta camisa de seda es elegante y suave, perfecta para ocasiones formales y eventos especiales.',
    image:
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=825&q=80',
    category: "women's clothing",
    stock: 132,
    sales: 1289,
    salesPercentage: 85,
  },
  {
    id: 6,
    title: 'Chaqueta Elegante',
    price: 110.4,
    description:
      'Esta chaqueta elegante es perfecta para ocasiones formales y eventos de negocios. Con corte slim y botones dorados.',
    image:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    category: "women's clothing",
    stock: 92,
    sales: 1421,
    salesPercentage: 70,
  },
  {
    id: 7,
    title: 'Lorem Ipsum',
    price: 99.4,
    description:
      'Lorem ipsum es placeholder text comúnmente usado en la industria gráfica y diseño para probar layouts y diseños visuales.',
    image:
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
    category: "men's clothing",
    stock: 87,
    sales: 1361,
    salesPercentage: 75,
  },
  {
    id: 8,
    title: 'Chaleco Elegante',
    price: 78.4,
    description:
      'Este chaleco elegante es ideal para complementar un traje formal o para usar con camisa en eventos semi-formales.',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    category: "men's clothing",
    stock: 110,
    sales: 957,
    salesPercentage: 55,
  },
  {
    id: 9,
    title: 'Saco de Vestir',
    price: 110.4,
    description:
      'Este saco de vestir combina elegancia y estilo. Confeccionado con telas importadas y un corte moderno ajustado.',
    image:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    category: "men's clothing",
    stock: 120,
    sales: 1178,
    salesPercentage: 65,
  },
  {
    id: 10,
    title: 'Pantalón de Mujer Elegante',
    price: 119.4,
    description:
      'Este pantalón de mujer es cómodo y elegante, ideal para cualquier evento formal o día a día en la oficina.',
    image:
      'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    category: "women's clothing",
    stock: 135,
    sales: 1390,
    salesPercentage: 90,
  },
  {
    id: 11,
    title: 'Chaqueta Elegante',
    price: 110.4,
    description:
      'Esta chaqueta elegante es perfecta para complementar un conjunto casual o formal. Confeccionada con los mejores materiales.',
    image:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: "men's clothing",
    stock: 129,
    sales: 1309,
    salesPercentage: 75,
  },
  {
    id: 12,
    title: 'Camisa de Seda',
    price: 95.4,
    description:
      'Esta camisa de seda es elegante y suave, perfecta para eventos formales y ocasiones especiales.',
    image:
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    category: "women's clothing",
    stock: 132,
    sales: 1289,
    salesPercentage: 45,
  },
];

//INICIOOOOO

// Definir imágenes personalizadas para cada categoría
const CUSTOM_IMAGES = {
  // Imagen para el hero/banner principal
  hero: 'https://images.unsplash.com/photo-1511746315387-c4a76990fdce',

  // Imágenes para categorías
  categories: {
    camisas: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    vaqueros: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    camisetas: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    pantalones: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
    sueteres: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
    ropa_calle: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234',
  },

  // Imágenes para categorías populares
  popular: {
    sueteres_mujeres:
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    parte_inferior_mujeres:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
    botas_mujeres: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    mejores_ventas_hombres:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22',
  },

  // Imágenes para productos por categoría (para reemplazar las de la API)
  products: {
    "men's clothing": [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22',
      'https://images.unsplash.com/photo-1516826957135-700dedea698c',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc',
    ],
    "women's clothing": [
      'https://images.unsplash.com/photo-1576763788886-0a6c68e2c3a3',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    ],
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
    categories: [
      { name: 'CAMISAS', image: CUSTOM_IMAGES.categories.camisas },
      { name: 'VAQUEROS', image: CUSTOM_IMAGES.categories.vaqueros },
      { name: 'CAMISETAS', image: CUSTOM_IMAGES.categories.camisetas },
      { name: 'PANTALONES', image: CUSTOM_IMAGES.categories.pantalones },
      { name: 'SUÉTERES', image: CUSTOM_IMAGES.categories.sueteres },
      { name: 'ROPA DE CALLE', image: CUSTOM_IMAGES.categories.ropa_calle },
    ],
    popular: [
      {
        name: 'Suéteres de mujeres',
        image: CUSTOM_IMAGES.popular.sueteres_mujeres,
      },
      {
        name: 'Parte inferior de mujeres',
        image: CUSTOM_IMAGES.popular.parte_inferior_mujeres,
      },
      { name: 'Botas de mujeres', image: CUSTOM_IMAGES.popular.botas_mujeres },
      {
        name: 'Mejores ventas - hombres',
        image: CUSTOM_IMAGES.popular.mejores_ventas_hombres,
      },
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
