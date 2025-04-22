import { useState } from 'react';
import { Image } from 'lucide-react';

export default function Insertar() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    sku: '',
    stock: '',
    regularPrice: '',
    salePrice: '',
    tags: ['Lorem', 'Lorem', 'Lorem']
  });
  
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState([
    'Product thumbnail',
    'Product thumbnail',
    'Product thumbnail',
    'Product thumbnail'
  ]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };
  
  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setProduct({
        ...product,
        tags: [...product.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setProduct({
      ...product,
      tags: product.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Title and breadcrumb */}
      <h2 className="text-xl font-bold">Detalles del producto</h2>
      <p className="text-sm text-gray-600 mb-6">
        Inicio &gt; Todos los productos &gt; Añadir nuevo producto
      </p>
      
      {/* Main form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Form Fields */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre del producto
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Escriba el nombre aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Escriba descripción aquí"
              rows="5"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            ></textarea>
          </div>
          
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Categoría
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              placeholder="Escriba categoría aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre de la marca
            </label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              placeholder="Escriba el nombre de la marca aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          
          {/* SKU and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleInputChange}
                placeholder="Fox-3983"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Cantidad de existencias
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                placeholder="1258"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Precio Regular
              </label>
              <input
                type="text"
                name="regularPrice"
                value={product.regularPrice}
                onChange={handleInputChange}
                placeholder="Bs. 1000"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Precio de venta
              </label>
              <input
                type="text"
                name="salePrice"
                value={product.salePrice}
                onChange={handleInputChange}
                placeholder="Bs. 450"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Etiqueta
            </label>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded min-h-16">
              {product.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Añadir etiqueta"
                className="flex-grow outline-none px-2 py-1 min-w-20"
              />
            </div>
          </div>
        </div>
        
        {/* Right Column - Images */}
        <div>
          {/* Image Upload Area */}
          <div className="bg-gray-200 rounded-lg p-6 text-center flex flex-col items-center justify-center h-52 mb-6">
            <Image className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-gray-600">Drop your image here, or browse</p>
            <p className="text-gray-500 text-sm">jpeg, png are allowed</p>
          </div>
          
          {/* Product Gallery */}
          <div>
            <h3 className="text-sm font-medium mb-4">Galería de productos</h3>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                  <div className="ml-4 flex-grow">
                    <p className="text-sm">{image}.png</p>
                    <div className="h-1 bg-blue-800 w-1/3 rounded-full mt-1"></div>
                  </div>
                  <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-white">✓</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-black text-white px-6 py-2 rounded w-full">
              BORRAR
            </button>
            <button className="border border-black px-6 py-2 rounded w-full">
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}