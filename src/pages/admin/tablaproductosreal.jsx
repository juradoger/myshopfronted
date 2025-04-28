import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const productos = [
  {
    id: 1,
    name: 'Camiseta Oversize',
    description: 'Camiseta de algodón orgánico, corte suelto y cómodo.',
    category: 'Ropa',
    brand: 'EcoWear',
    sku: 'ECO-001',
    stock: 45,
    regularPrice: 29.99,
    salePrice: 24.99,
    tags: ['algodón', 'oversize', 'ecológico'],
    colors: ['#000000', '#FFFFFF', '#808080'],
    images: [
      'https://loremflickr.com/320/240/t-shirt',
      'https://loremflickr.com/320/240/oversize',
      'https://loremflickr.com/320/240/white-shirt',
    ],
  },
  {
    id: 2,
    name: 'Zapatillas Urbanas',
    description: 'Zapatillas estilo urbano con suela antideslizante.',
    category: 'Calzado',
    brand: 'StreetRun',
    sku: 'SR-205',
    stock: 20,
    regularPrice: 89.99,
    salePrice: 69.99,
    tags: ['urbano', 'casual', 'confort'],
    colors: ['#1e3a8a', '#e11d48'],
    images: [
      'https://loremflickr.com/320/240/sneakers',
      'https://loremflickr.com/320/240/urban-shoes',
    ],
  },
  {
    id: 3,
    name: 'Mochila Antirrobo',
    description: 'Mochila con cierre oculto, ideal para viajes.',
    category: 'Accesorios',
    brand: 'SafeCarry',
    sku: 'SC-990',
    stock: 75,
    regularPrice: 59.99,
    salePrice: 49.99,
    tags: ['viajes', 'seguridad', 'resistente al agua'],
    colors: ['#4b5563', '#111827'],
    images: [
      'https://loremflickr.com/320/240/backpack',
      'https://loremflickr.com/320/240/anti-theft-bag',
    ],
  },
  {
    id: 4,
    name: 'Gafas de Sol Polarizadas',
    description: 'Protección UV400, ideales para actividades al aire libre.',
    category: 'Accesorios',
    brand: 'SunPro',
    sku: 'SUN-777',
    stock: 100,
    regularPrice: 39.99,
    salePrice: 29.99,
    tags: ['verano', 'polarizadas', 'protección solar'],
    colors: ['#000000', '#facc15'],
    images: [
      'https://loremflickr.com/320/240/sunglasses',
      'https://loremflickr.com/320/240/polarized-glasses',
    ],
  },
];

const TablaProductosReal = () => {
  const navigate = useNavigate();

  const startDate = 'Abril 8, 2025';
  const endDate = 'Mayo 10, 2025';

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = [];
        // Dividir los productos en páginas (9 por página)
        const itemsPerPage = 9;
        const totalItems = data.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));

        // Obtener productos para la página actual
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setProducts(data.slice(startIndex, endIndex));
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='bg-gray-100'>
      <div className='bg-white'>
        {/* Header */}
        <div className='p-4'>
          <h1 className='text-base font-medium mb-1'>TODOS LOS PRODUCTOS</h1>
          <div className='flex justify-between items-center'>
            <div className='flex text-start text-xs text-gray-500'>
              <span>Inicio</span>
              <ChevronRight
                size={14}
                className=' flex-wrap mx-2 my-1 text-gray-400'
              />
              <span>Lista de Productos</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='text-xs text-gray-600 flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='mr-1'
                  >
                    <rect
                      x='3'
                      y='4'
                      width='18'
                      height='18'
                      rx='2'
                      ry='2'
                    ></rect>
                    <line x1='16' y1='2' x2='16' y2='6'></line>
                    <line x1='8' y1='2' x2='8' y2='6'></line>
                    <line x1='3' y1='10' x2='21' y2='10'></line>
                  </svg>
                  {startDate} - {endDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='px-4 pb-4 mt-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='relative inline-block'>
              {/* Ícono MoreVertical */}
              <MoreVertical
                size={16}
                className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500'
              />

              {/* Select con la flechita */}
              <select className='border border-gray-300 rounded px-3 py-1 pr-8 text-sm bg-white appearance-none pl-8'>
                <option>Recientes</option>
                <option>Hace un mes</option>
                <option>Hace un año</option>
              </select>

              {/* Flechita al lado derecho del select */}
              <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-gray-500'
                >
                  <polyline points='6 9 12 15 18 9'></polyline>
                </svg>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='text-xs text-gray-600'>
                  <th className='py-3 px-4 text-left'></th>
                  <th className='py-3 px-4 text-left'>Nombre</th>
                  <th className='py-3 px-4 text-left'>Descripción</th>
                  <th className='py-3 px-4 text-left'>Categoría</th>
                  <th className='py-3 px-4 text-left'>Marca</th>
                  <th className='py-3 px-4 text-left'>SKU</th>
                  <th className='py-3 px-4 text-left'>Stock</th>
                  <th className='py-3 px-4 text-left'>Precio Regular</th>
                  <th className='py-3 px-4 text-left'>Precio Oferta</th>
                  <th className='py-3 px-4 text-left'>Tags</th>
                  <th className='py-3 px-4 text-left'>Colores</th>
                  <th className='py-3 px-4 text-left'></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr key={index} className='text-xs'>
                    <td className='py-3 px-4'>
                      {producto.images[0] ? (
                        <img
                          src={producto.images[0]}
                          alt={producto.name}
                          className='w-10 h-10 object-cover rounded'
                        />
                      ) : (
                        <div className='w-10 h-10 bg-gray-200 rounded'></div>
                      )}
                    </td>
                    <td className='py-3 px-4'>{producto.name}</td>
                    <td className='py-3 px-4'>{producto.description}</td>
                    <td className='py-3 px-4'>{producto.category}</td>
                    <td className='py-3 px-4'>{producto.brand}</td>
                    <td className='py-3 px-4'>{producto.sku}</td>
                    <td className='py-3 px-4'>{producto.stock}</td>
                    <td className='py-3 px-4'>${producto.regularPrice}</td>
                    <td className='py-3 px-4'>${producto.salePrice}</td>
                    <td className='py-3 px-4'>
                      <div className='flex flex-wrap gap-1'>
                        {producto.tags.map((tag, i) => (
                          <span
                            key={i}
                            className='bg-gray-200 rounded px-2 py-0.5 text-xs'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className='py-3 px-4'>
                      <div className='flex gap-1'>
                        {producto.colors.map((color, i) => (
                          <div
                            key={i}
                            className='w-4 h-4 rounded-full border'
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                        ))}
                      </div>
                    </td>
                    <td>
                      {/* EDIT BUTTON */}
                      <button
                        className='w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100'
                        onClick={() =>
                          navigate(`/admin/actualizarproducto/${producto.id}`)
                        }
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='text-gray-500'
                        >
                          <path d='M12 20h9'></path>
                          <path d='M16.5 3.5l4 4-1.5 1.5-4-4z'></path>
                          <path d='M3 17.25V21h3.75l11.25-11.25-4-4L3 17.25z'></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-4 flex justify-start items-center'>
            <div className='flex gap-1'>
              <button className='w-6 h-6 flex items-center justify-center rounded bg-black text-white text-xs'>
                1
              </button>
              <button className='w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs'>
                2
              </button>
              <button className='w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs'>
                3
              </button>
              <button className='w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs'>
                4
              </button>
              <span className='w-6 h-6 flex items-center justify-center text-xs'>
                ...
              </span>
              <button className='w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs'>
                10
              </button>
              <button className='px-2 h-6 flex items-center justify-center rounded border border-gray-200 text-xs ml-1'>
                <ChevronLeft size={16} className='transform rotate-180' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaProductosReal;
