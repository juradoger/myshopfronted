import { useState, useEffect } from 'react';
import { fetchClothingProductById } from '../../services/api'; // Importamos la función correcta
import { ChevronRight, Truck, RotateCcw, Package } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Carrito from './carrito';
import { useAppStore } from '../../store/app-store';
import productService from '../../services/productos-service';

export default function DetalleProducto() {
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [mainImage, setMainImage] = useState(0);
  const navigate = useNavigate();
  const { setIsCartOpen, addToCart } = useAppStore();

  const productId = params?.id;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await productService.getById(productId);
        console.log('🚀 ~ getProduct ~ data:', data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Producto no encontrado</p>
      </div>
    );
  }

  const originalPrice = (product.price * 100) / (100 - product.salesPercentage);

  const productImages = product.images || [];

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='text-sm text-gray-500 mb-4 flex items-center'>
        <span>Inicio</span>
        <ChevronRight className='h-3 w-3 mx-1' />
        <span>Catalogo</span>
        <ChevronRight className='h-3 w-3 mx-1' />
        <span>{product.name}</span>
        <ChevronRight className='h-3 w-3 mx-1' />
        <span className='text-black'></span>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-2/3'>
          <div className='grid grid-cols-2 gap-2'>
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`${
                  mainImage === index ? 'col-span-2 row-span-2' : ''
                } cursor-pointer`}
                onClick={() => setMainImage(index)}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`${product.title} - Vista ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='lg:w-1/3'>
          <div className='sticky top-8'>
            <div className='text-sm text-gray-500 mb-1'>
              Edición limitada • Hecho en Bolivia
            </div>
            <h1 className='text-xl font-medium mb-1'>{product.title}</h1>
            <div className='flex items-center mb-4'>
              <span className='text-lg font-medium mr-2'>
                Bs. {product.price}
              </span>
              <span className='text-gray-500 line-through'>
                Bs. {originalPrice.toFixed(2)}
              </span>
            </div>

            <div className='flex mb-1'></div>

            <div className='flex mb-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
                    star <= 4 ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
              <span className='text-xs text-gray-500 ml-1'>(12 reseñas)</span>
            </div>

            <div className='mb-4'>
              <div className='text-sm font-medium mb-2'>
                Color: <span className='font-normal'>{selectedColor}</span>
              </div>
              <div className='flex gap-2'>
                {product.colors?.map((color) => (
                  <button
                    className={`h-8 w-8 rounded-full  ${
                      selectedColor === color.name
                        ? 'ring-2 ring-black ring-offset-1'
                        : ''
                    }`}
                    style={{
                      backgroundColor: color.codigohx,
                    }}
                    onClick={() => setSelectedColor(color.color)}
                  ></button>
                ))}
              </div>
            </div>

            <div className='mb-6'>
              <div className='text-sm font-medium mb-2'>Talla</div>
              <div className='grid grid-cols-5 gap-2 rounded-sm'>
                {product.tags?.map((size) => (
                  <button
                    key={size}
                    className={`py-2 border ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              className='w-full bg-black text-white py-3 mb-4 hover:bg-gray-800 transition-colors'
              onClick={() =>
                addToCart({
                  ...product,
                  color: selectedColor,
                  size: selectedSize,
                })
              }
            >
              AÑADIR AL CARRITO
            </button>

            <div className='border-t border-b py-4 space-y-4'>
              <div className='flex items-start'>
                <Truck className='h-5 w-5 mr-3 flex-shrink-0' />
                <div>
                  <div className='text-sm font-medium'>
                    Envío - {product.details[1]}
                  </div>
                </div>
              </div>

              <div className='flex items-start'>
                <RotateCcw className='h-5 w-5 mr-3 flex-shrink-0' />
                <div>
                  <div className='text-sm font-medium'>
                    Tiempo devolución - {product.details[2]}
                  </div>
                </div>
              </div>

              {/*   <div className='flex items-start'>
                <Package className='h-5 w-5 mr-3 flex-shrink-0' />
                <div>
                  <div className='text-sm font-medium'>Tiempo entrega </div>
                  <div className='text-xs text-gray-500'>
                    Recibe en casa normalmente en {product.details[0]}
                  </div>
                </div>
              </div> */}
            </div>

            <div className='py-6'>
              <h2 className='text-lg font-medium mb-4'>{product.name}</h2>
              <p className='text-sm text-gray-700 mb-4'>
                {product.description}
              </p>
            </div>

            <div className='border-t py-4'>
              <div className='mb-4'>
                <div className='text-sm font-medium'>Dimensiones</div>
                <div className='text-sm text-gray-700'>
                  {product.details[0]}
                </div>
              </div>

              <div className='mb-4'>
                <div className='text-sm font-medium'>Proveedor</div>
                <div className='text-sm text-gray-700'>
                  <div>{product.provider}</div>
                </div>
              </div>

              {/*   <div>
                <div className='text-sm font-medium mb-2'>Sostenibilidad</div>
                <div className='flex gap-6'>
                  <div className='flex flex-col items-center'>
                    <div className='h-10 w-10 flex items-center justify-center border border-gray-300 rounded-full mb-1'>
                      <svg
                        className='h-6 w-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
                        />
                      </svg>
                    </div>
                    <span className='text-xs text-gray-500'>
                      MATERIALES ORGÁNICOS
                    </span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className='h-10 w-10 flex items-center justify-center border border-gray-300 rounded-full mb-1'>
                      <svg
                        className='h-6 w-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        />
                      </svg>
                    </div>
                    <span className='text-xs text-gray-500'>
                      CADENA SOSTENIBLE
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/*<div className='mt-16'>
        <h2 className='text-lg font-medium mb-6'>Productos recomendados</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='group cursor-pointer'>
            <div className='mb-2'>
              <img
                src='https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80'
                alt='The ReNew Fleece Crew'
                className='w-full h-auto aspect-[3/4] object-cover'
              />
            </div>
            <h3 className='text-xs text-gray-700'>The ReNew Fleece Crew</h3>
            <p className='text-xs font-medium mt-1'>Bs. 69</p>
          </div>

          <div className='group cursor-pointer'>
            <div className='mb-2'>
              <img
                src='https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                alt='The Utility Cargo Jacket'
                className='w-full h-auto aspect-[3/4] object-cover'
              />
            </div>
            <h3 className='text-xs text-gray-700'>The Utility Cargo Jacket</h3>
            <p className='text-xs font-medium mt-1'>Bs. 98</p>
          </div>

          <div className='group cursor-pointer'>
            <div className='mb-2'>
              <img
                src='https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
                alt='The ReNew Long Sleeve Crew'
                className='w-full h-auto aspect-[3/4] object-cover'
              />
            </div>
            <h3 className='text-xs text-gray-700'>
              The ReNew Long Sleeve Crew
            </h3>
            <p className='text-xs font-medium mt-1'>Bs. 65</p>
          </div>

          <div className='group cursor-pointer'>
            <div className='mb-2'>
              <img
                src='https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
                alt='The ReNew Half-Zip Fleece'
                className='w-full h-auto aspect-[3/4] object-cover'
              />
            </div>
            <h3 className='text-xs text-gray-700'>The ReNew Half-Zip Fleece</h3>
            <p className='text-xs font-medium mt-1'>Bs. 85</p>
          </div>
        </div>
      </div>*/}

      <div className='mt-16'>
        <h2 className='text-lg font-medium mb-6'>Reseñas</h2>

        <div className='bg-gray-50 p-6 rounded-lg mb-8'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='md:w-1/3'>
              <div className='text-sm font-medium mb-2'>5.0 Rating</div>
              <div className='flex items-center mb-4'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className='w-4 h-4 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
            </div>

            <div className='md:w-1/3'>
              <div className='space-y-2'>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className='flex items-center'>
                    <span className='text-xs w-3'>{rating}</span>
                    <div className='w-full bg-gray-200 h-2 mx-2 rounded-full overflow-hidden'>
                      <div
                        className='bg-gray-700 h-full rounded-full'
                        style={{
                          width:
                            rating === 5
                              ? '80%'
                              : rating === 4
                              ? '15%'
                              : rating === 3
                              ? '5%'
                              : '0%',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='md:w-1/3'>
              <div className='text-sm font-medium mb-2'>
                Runs slightly large pantalones
              </div>
              <div className='flex items-center justify-between text-xs text-gray-500'>
                <span>Cortos</span>
                <span>Largos</span>
              </div>
              <div className='w-full bg-gray-200 h-2 my-1 rounded-full overflow-hidden'>
                <div
                  className='bg-gray-700 h-full rounded-full'
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <div className='text-sm font-medium'>Filtros</div>
          <div className='flex items-center'>
            <span className='text-sm mr-2'>Ordenar por:</span>
            <select className='text-sm border-b border-gray-300 pb-1 pr-6 focus:outline-none'>
              <option>Más recientes</option>
              <option>Mejor valorados</option>
              <option>Peor valorados</option>
            </select>
          </div>
        </div>

        <div className='space-y-8'>
          <div className='border-t pt-6'>
            <div className='flex justify-between items-start mb-2'>
              <div>
                <div className='font-medium'>Elizabeth Ortega</div>
                <div className='flex items-center'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className='w-3 h-3 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </div>
              <div className='text-xs text-gray-500'>Hace 14 dias</div>
            </div>
            <p className='text-sm mb-4'>Muy comodo y bueno</p>
          </div>

          <div className='border-t pt-6'>
            <div className='flex justify-between items-start mb-2'>
              <div>
                <div className='font-medium'>Anónimo</div>
                <div className='flex items-center'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className='w-3 h-3 text-yellow-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </div>
              <div className='text-xs text-gray-500'>Hace 14 dias</div>
            </div>
            <p className='text-sm mb-4'>
              Me queda perfecto y es muy comodo, lo recomiendo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
