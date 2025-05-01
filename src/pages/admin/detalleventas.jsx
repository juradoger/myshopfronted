import { useState, useEffect } from 'react';
import { MapPin, Download, ExternalLink } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { pedidos } from '../../data/pedidos';
import pedidosService from '../../services/pedidos-service';

export default function DetallesPedido() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [pedido, setPedido] = useState(pedidos.find((p) => p.id === params.id));
  console.log(pedido);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await pedidosService.getById(params.id);
        setPedido(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setIsLoading(false);
      }
    };

    getProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Cargando pedido...</p>
      </div>
    );
  }

  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Breadcrumb */}
        <div className='mb-4'>
          <div className='flex items-center text-sm text-gray-500 mb-2'>
            <a href='#' className='hover:text-gray-700'>
              Inicio
            </a>
            <span className='mx-2'>/</span>
            <a href='#' className='hover:text-gray-700'>
              Lista de pedidos
            </a>
            <span className='mx-2'>/</span>
            <span className='text-gray-700'>Detalles del Pedido</span>
          </div>
          <h1 className='text-2xl font-bold text-gray-800'>
            DETALLES DEL PEDIDO {`#${pedido.id}`}
          </h1>
        </div>

        {/* Contenido principal */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          {/* Cabecera del pedido */}
          <div className='flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-gray-200'>
            <div className='flex items-center'>
              <div className='flex justify-between'>
                <p className='text-gray-500 text-sm'>Estado:</p>
                <span className='ml-3 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full'>
                  {pedido.estado}
                </span>
              </div>
            </div>
            <div className='flex items-center text-sm text-gray-500'>
              <span>{pedido.fecha.toDate().toLocaleDateString()}</span>
              <div className='ml-4 flex space-x-1 gap-1 px-4'>
                <div className='relative inline-block'>
                  <select
                    defaultValue={pedido.estado}
                    className='border border-gray-300 rounded px-3 py-1 pr-8 text-sm bg-white appearance-none'
                    onChange={(e) => {
                      pedidosService.update({
                        id: pedido.id,
                        estado: e.target.value,
                      });
                    }}
                  >
                    <option>Cambiar estado</option>
                    <option value={'Pendiente'}>Pendiente</option>
                    <option value={'Enviado'}>Enviado</option>
                    <option value={'Entregado'}>Entregado</option>
                    <option value={'Cancelado'}>Cancelado</option>
                  </select>

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
                <button className='p-2 border border-gray-300 rounded'>
                  <ExternalLink size={16} />
                </button>
                <button className='p-2 border border-gray-300 rounded'>
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
          {/* Información del cliente, pedido y entrega */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {/* Cliente */}
            <div className='bg-gray-50 rounded-lg p-4 flex flex-col justify-between'>
              <div>
                <div className='flex items-center mb-3'>
                  <div className='w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <h3 className='font-semibold'>Cliente</h3>
                </div>
                <div className='space-y-1 text-sm'>
                  <p className='font-normal'>
                    Nombre completo: {pedido.cliente.nombre}
                  </p>
                  <p>Email: {pedido.cliente.email}</p>
                  <p>Teléfono: {pedido.cliente.telefono}</p>
                </div>
              </div>
              <button className='mt-4 w-full py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition'>
                Ver perfil
              </button>
            </div>

            {/* Información del pedido */}
            <div className='bg-gray-50 rounded-lg p-4 flex flex-col justify-between'>
              <div>
                <div className='flex items-center mb-3'>
                  <div className='w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      />
                    </svg>
                  </div>
                  <h3 className='font-semibold'>Información del Pedido</h3>
                </div>
                <div className='space-y-1 text-sm'>
                  <p>Método de pago: {pedido.tipo_venta}</p>
                </div>
              </div>
              <button className='mt-4 w-full py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition'>
                Descargar información
              </button>
            </div>

            {/* Entregar a */}
            <div className='bg-gray-50 rounded-lg p-4 flex flex-col justify-between'>
              <div>
                <div className='flex items-center mb-3'>
                  <div className='w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2'>
                    <MapPin className='h-4 w-4 text-white' />
                  </div>
                  <h3 className='font-semibold'>Ubicación</h3>
                </div>
                <div className='space-y-1 text-sm'>
                  <p>Dirección: {pedido.direccion.city}</p>
                </div>
              </div>
              <button className='mt-4 w-full py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition'>
                Ver mapa
              </button>
            </div>
          </div>
          {/* Información de pago y notas */}
          <div className='max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            {/* Información de pago */}
            <div className='flex flex-col justify-between p-4 border rounded-lg bg-gray-50'>
              <div>
                <h3 className='font-semibold mb-3'>Información de pago</h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center'>
                    <p>Método: {pedido.tipo_venta}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota */}
            <div className='flex flex-col justify-between p-4 border rounded-lg bg-gray-50'>
              <div>
                <h3 className='font-semibold mb-3'>Nota</h3>
                <textarea
                  className='w-full h-[150px] p-3 border border-gray-300 rounded-md text-sm resize-none'
                  placeholder='Escribe alguna nota...'
                  defaultValue={pedido.descripcion}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className='mb-8'>
            <div className='flex flex-col mb-4 text-center'>
              <h3 className='font-semibold'>Productos</h3>

              <div className='flex items-center gap-1 mt-1 text-center'>
                <h6 className='font-extralight text-sm'>Cantidad:</h6>
                <span className='text-gray-500 text-sm'>
                  {pedido.productos.length}
                </span>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr className='text-left text-sm text-gray-500'>
                    <th className='py-3 px-3 font-medium'>Producto</th>
                    <th className='py-3 px-3 font-medium'>Código</th>
                    <th className='py-3 px-3 text-center font-medium'>
                      Cantidad
                    </th>
                    <th className='py-3 px-3 text-right font-medium'>Total</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className='py-4 text-center'>
                        Cargando productos...
                      </td>
                    </tr>
                  ) : (
                    pedido.productos.map((producto, index) => (
                      <tr key={index} className='text-sm'>
                        <td className='py-4 px-3 font-medium'>
                          {producto.name}
                        </td>
                        <td className='py-4 px-3 text-gray-500'>
                          {producto.id}
                        </td>
                        <td className='py-4 px-3 text-center'>
                          {producto?.cantidad ?? 1}
                        </td>
                        <td className='py-4 px-3 text-right'>
                          Bs. {producto.price}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className='border-t border-gray-200 pt-4'>
            <div className='w-full md:w-64 ml-auto'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal </span>
                  <span>Bs. {pedido.total.toFixed(2)}</span>
                </div>

                <div className='flex justify-between font-semibold pt-2 border-t border-gray-200'>
                  <span>Total</span>
                  <span>Bs. {pedido.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
