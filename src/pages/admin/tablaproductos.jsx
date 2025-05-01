import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pedidos as pedidosDB } from '../../data/pedidos';
import pedidosService from '../../services/pedidos-service';

const TablaProductos = () => {
  const [pedidos, setPedidos] = useState([]);
  console.log('🚀 ~ TablaProductos ~ pedidos:', pedidos);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const startDate = 'Abril 8, 2025';
  const endDate = 'Mayo 10, 2025';

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await pedidosService.getAll();
        console.log('🚀 ~ getProducts ~ data:', data);
        setPedidos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className='bg-gray-100'>
      <div className='bg-white'>
        {/* Header */}
        <div className='p-4'>
          <h1 className='text-base font-medium mb-1'>TODOS LOS PEDIDOS</h1>
          <div className='flex justify-between items-center'>
            <div className='flex text-start text-xs text-gray-500'>
              <span>Inicio</span>
              <ChevronRight
                size={14}
                className=' flex-wrap mx-2 my-1 text-gray-400'
              />
              <span>Lista de Pedidos</span>
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
                  <th className='py-3 px-4 text-left'>Pedido</th>
                  <th className='py-3 px-4 text-left'>ID</th>
                  <th className='py-3 px-4 text-left'>Fecha</th>
                  <th className='py-3 px-4 text-left'>Cliente</th>
                  <th className='py-3 px-4 text-left'>Estado</th>
                  <th className='py-3 px-4 text-left'>Total</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido, index) => (
                  <tr key={index} className='text-xs'>
                    <td className='py-3 px-4'>
                      {pedido.productos.map((p) => p.name).join(', ')}
                    </td>
                    <td
                      className='py-3 px-4'
                      onClick={() => navigate(`/admin/detalle/${pedido.id}`)}
                    >
                      #{pedido.id}
                    </td>
                    <td className='py-3 px-4'>
                      {pedido.fecha.toDate().toLocaleDateString()}
                    </td>
                    <td className='py-3 px-4'>
                      <div className='flex items-center gap-2'>
                        <img
                          src={pedido.cliente.avatar || '/placeholder.svg'}
                          alt={pedido.cliente.nombre}
                          className='w-5 h-5 rounded-full bg-gray-200'
                        />
                        <span>{pedido.cliente.nombre}</span>
                      </div>
                    </td>
                    <td className='py-3 px-4'>
                      <div className='flex items-center'>
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            pedido.estado === 'Entregado'
                              ? 'bg-blue-500'
                              : 'bg-orange-500'
                          }`}
                        ></span>
                        <span>{pedido.estado}</span>
                      </div>
                    </td>
                    <td className='py-3 px-4'>{pedido?.cantidad ?? 1}</td>
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

export default TablaProductos;
