import { useState, useEffect } from 'react';
import { fetchClothingProducts } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchClothingProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const calculateDiscount = (price) => {
    const discountPercent = Math.floor(Math.random() * 40) + 10; // Entre 10% y 50%
    const originalPrice = (price * 100) / (100 - discountPercent);
    return {
      discountPercent,
      originalPrice: originalPrice.toFixed(2),
    };
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-1'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-xl font-medium'>ROPA: NOVEDADES</h1>
            <span className='text-sm text-gray-500'>
              {products.length} Productos
            </span>
          </div>

          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <p>Cargando productos...</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {products.map((product) => {
                const { discountPercent, originalPrice } = calculateDiscount(
                  product.price
                );
                return (
                  <div key={product.id} className='group'>
                  <div className='relative mb-2'>
                    <div className='absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium text-red-600'>
                    {product.salesPercentage}% off
                    </div>
                    <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title}
                    className='w-full h-[400px] object-cover bg-gray-100'
                    onClick={() =>
                      navigate(`/detalleproducto/${product.id}`) // Aquí se está pasando el id
                    }
                    />
                  </div>
                  <h3 className='text-sm font-medium'>{product.title}</h3>
                  <div className='mt-1 flex items-center justify-between'>
                    <p className='text-sm font-medium'>
                    Ahora Bs. {product.price}
                    </p>
                    <p className='text-sm text-gray-500 line-through'>
                    Bs. {originalPrice}
                    </p>
                  </div>
                  <div className='mt-2 flex gap-1'>
                    <button className='h-4 w-4 rounded-full bg-black'></button>
                    {product.color === 'black' && (
                    <button className='h-4 w-4 rounded-full bg-black'></button>
                    )}
                    {product.color === 'blue' && (
                    <button className='h-4 w-4 rounded-full bg-blue-600'></button>
                    )}
                    {product.color === 'red' && (
                    <button className='h-4 w-4 rounded-full bg-red-600'></button>
                    )}
                    <button className='h-4 w-4 rounded-full bg-amber-700'></button>
                    <button className='h-4 w-4 rounded-full bg-gray-700'></button>
                  </div>
                  {product.category === "men's clothing" ? (
                    <p className='mt-1 text-xs text-gray-500'>
                    Categoría: {product.category}
                    </p>
                  ) : (
                    <p className='mt-1 text-xs text-gray-500'>
                    Categoría: {product.category}
                    </p>
                  )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
