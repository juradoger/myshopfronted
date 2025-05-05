import { useAppStore } from '../../../store/app-store';

const PopupBusquedaProducto = ({ isOpen, onClose }) => {
  const store = useAppStore();

  if (!isOpen) return null;

  const products = [
    { name: 'Calvin Klein', image: '/placeholder.svg?height=40&width=40' },
    { name: 'Place', image: '/placeholder.svg?height=40&width=40' },
    { name: 'Gioberti', image: '/placeholder.svg?height=40&width=40' },
  ];

  return (
    <div className='absolute right-0 top-full mt-2 w-64 bg-white rounded shadow-lg z-50 overflow-hidden'>
      <div className='p-4'>
        <h3 className='text-lg font-medium mb-3'>Producto</h3>
        <div className='space-y-3'>
          {products.map((product, index) => (
            <div
              key={index}
              className='flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded'
              onClick={() => {
                store.resetFilters();

                store.setMarca(product.name);
              }}
            >
              <div className='w-10 h-10 bg-gray-200 rounded'></div>
              <span>{product.name}</span>
            </div>
          ))}
        </div>
        <div className='mt-4 text-center'>
          <a href='#' className='text-blue-800 text-sm font-medium'>
            Ver todos los productos
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopupBusquedaProducto;
