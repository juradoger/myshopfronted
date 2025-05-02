import { useState, useEffect } from 'react';
import { X, Minus, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/app-store';

const Carrito = ({ isOpen, onClose }) => {
  // Datos de ejemplo para el carrito
  const navigate = useNavigate();
  const { carrito, ...store } = useAppStore();
  console.log('🚀 ~ Carrito ~ carrito:', carrito);

  // Calcular el subtotal
  const subtotal = carrito.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Prevenir scroll cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay oscuro */}
      <div className='fixed inset-0 bg-black/40 z-40' onClick={onClose} />

      {/* Panel del carrito */}
      <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 overflow-y-auto shadow-xl transform transition-transform duration-300 ease-in-out'>
        <div className='p-4 flex flex-col h-full'>
          {/* Encabezado del carrito */}
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold'>Tu carrito</h2>
            <button
              onClick={onClose}
              className='p-1 rounded-full hover:bg-gray-100'
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className='flex-grow'>
            <div className='flex justify-end items-center mt-2 mb-5'>
              <button
                className='bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 rounded-sm'
                onClick={() => navigate('/catalogo')}
              >
                Atrás <ChevronRight size={16} className='inline-block ml-1' />
              </button>
            </div>
            {/* Productos en el carrito */}
            <div className='space-y-4'>
              {carrito.map((item) => (
                <div key={item.id} className='flex gap-3 pb-4 border-b'>
                  <div className='w-20 h-24 bg-gray-100 flex-shrink-0'>
                    <img
                      src={item.images[0] || '/placeholder.svg'}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex justify-between'>
                      <div>
                        <h3 className='font-medium'>{item.name}</h3>
                        <p className='text-sm text-gray-600'>
                          {item.size} | {item.color}
                        </p>
                      </div>
                      <button
                        className='text-gray-400 hover:text-gray-600'
                        onClick={() => store.removeFromCart(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <div>
                        {/*   <span className='line-through text-gray-500 text-sm'>
                          Bs {item.originalPrice}
                        </span>{' '} */}
                        <span className='font-medium'>Bs {item.price}</span>
                      </div>
                      <div className='flex items-center border rounded'>
                        <button
                          className='px-2 py-1 hover:bg-gray-100'
                          onClick={() =>
                            store.updateCartItem(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className='px-2'>{item.quantity}</span>
                        <button
                          className='px-2 py-1 hover:bg-gray-100'
                          onClick={() =>
                            store.updateCartItem(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Pie del carrito */}
          <div className='mt-auto'>
            <div className='flex justify-between items-center mb-4'>
              <div>
                <span className='font-medium'>Subtotal</span>{' '}
                <span className='text-sm text-gray-600'>
                  ({carrito.length} Objetos)
                </span>
              </div>
              <span className='font-bold text-lg'>Bs. {subtotal}</span>
            </div>
            <button
              className='w-full bg-gray-900 text-white py-3 uppercase font-medium hover:bg-gray-800 rounded-sm'
              onClick={() => navigate('/checkout')}
            >
              Continuar con el pago
            </button>
            <p className='text-center text-sm mt-2 text-gray-600'>
              Psst, consíguelo ahora antes de que se agote.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;
