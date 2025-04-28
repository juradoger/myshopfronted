import { useState } from 'react';
import { Check, CheckCheck, CheckCircle, ChevronRight, Image, Trash2 } from 'lucide-react';


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
  const [images, setImages] = useState([]);

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
    <div className="mx-10 bg-gray-100 min-h-screen p-6">
      {/* Title and breadcrumb */}
      <h2 className="text-xl font-medium mb-2">AÑADIR NUEVO PRODUCTO</h2>
      <p className="flex text-sm text-gray-600 mb-6 ">
        Inicio <ChevronRight size={16} className='mx-2 my-0.5' /> Productos <ChevronRight size={16} className='mx-2 my-0.5' />  Añadir nuevo producto
      </p>

      {/* Main form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Form Fields */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nombre del Producto
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
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none text-sm font-extralight"
            >
              <option value="" disabled>Seleccione una categoría</option>
              <option value="electronics">Hombre</option>
              <option value="fashion">Mujer</option>
              <option value="home">Niño / Niña</option>
            </select>
          </div>
          {/* Subcategoria */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Subcategoría
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none text-sm font-extralight"
            >
              <option value="" disabled>Seleccione una subcategoría</option>
              <option value="electronics">Blusa</option>
              <option value="fashion">Pantalon</option>
              <option value="home">Chaquetas</option>
            </select>
          </div>
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Marca
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

          {/* Código*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Código (opcional)
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
                Unidades
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
                Precio regular
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
              Tallas
            </label>
            <div className="flex flex-wrap gap-2 p-2 border-gray-300 min-h-16">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-black text-white px-3 py-1 rounded-sm text-sm flex items-center"
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
          <div className="bg-gray-200 rounded-lg p-6 text-center flex flex-col items-center justify-center h-52 mb-6 relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const newImages = files.map((file, idx) => ({
                  name: `Imagen ${images.length + idx + 1}`, // aquí generamos el nombre automático
                  url: URL.createObjectURL(file),
                }));
                setImages((prevImages) => [...prevImages, ...newImages]);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Image className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-gray-600">Suelta tu imagen aquí o haz click</p>
            <p className="text-gray-500 text-sm">Formatos: jpeg, png</p>
          </div>

          {/* Product Gallery */}
          <div>
            <h3 className="text-sm font-medium mb-4">Galería de productos</h3>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="flex items-center relative">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <p className="text-sm">{image.name}</p>
                    <div className="h-1 bg-blue-800 w-1/3 rounded-full mt-1"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Check ✓ */}
                    <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-white">
                      <CheckCheck className="w-3 h-3" />
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index));
                      }}
                      className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setImages([])}
              className="bg-black text-white px-6 py-2 rounded w-full"
            >
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