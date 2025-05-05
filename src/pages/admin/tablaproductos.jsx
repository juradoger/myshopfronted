import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import pedidosService from '../../services/pedidos-service';

const TablaProductos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterEstado, setFilterEstado] = useState('');
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const endDate = new Date();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await pedidosService.getAll();
        setPedidos(data);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredPedidos = filterEstado 
    ? pedidos.filter(p => p.estado === filterEstado)
    : pedidos;

  const paginatedPedidos = filteredPedidos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);

  const formatDate = (date) => {
    if (!date) return 'Fecha no disponible';
    const d = date instanceof Date ? date : date.toDate();
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='bg-white rounded-lg shadow'>
        <div className='p-4 border-b'>
          <h1 className='text-base font-medium mb-1'>TODOS LOS PEDIDOS</h1>
          <div className='flex justify-between items-center'>
            <div className='flex text-start text-xs text-gray-500'>
              <span>Inicio</span>
              <ChevronRight size={14} className='flex-wrap mx-2 my-1 text-gray-400' />
              <span>Lista de Pedidos</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='text-xs text-gray-600 flex items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='mr-1'>
                  <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                  <line x1='16' y1='2' x2='16' y2='6'></line>
                  <line x1='8' y1='2' x2='8' y2='6'></line>
                  <line x1='3' y1='10' x2='21' y2='10'></line>
                </svg>
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className='px-4 pb-4 mt-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex gap-2'>
              <div className='relative inline-block'>
                <MoreVertical size={16} className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
                <select 
                  className='border border-gray-300 rounded px-3 py-1 pr-8 text-sm bg-white appearance-none pl-8'
                  onChange={(e) => setFilterEstado(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="Pendiente">Pendientes</option>
                  <option value="Entregado">Entregados</option>
                  <option value="Cancelado">Cancelados</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='text-gray-500'>
                    <polyline points='6 9 12 15 18 9'></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='text-xs text-gray-600 bg-gray-50'>
                  <th className='py-3 px-4 text-left'>Productos Comprados</th>
                  <th className='py-3 px-4 text-left'>ID Pedido</th>
                  <th className='py-3 px-4 text-left'>Fecha</th>
                  <th className='py-3 px-4 text-left'>Cliente</th>
                  <th className='py-3 px-4 text-left'>Estado</th>
                  <th className='py-3 px-4 text-left'>Total</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                      </div>
                    </td>
                  </tr>
                ) : paginatedPedidos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      {filterEstado ? `No hay pedidos ${filterEstado.toLowerCase()}` : 'No se encontraron pedidos'}
                    </td>
                  </tr>
                ) : (
                  paginatedPedidos.map((pedido) => (
                    <tr 
                      key={pedido.id} 
                      className='text-xs border-b border-gray-100 hover:bg-gray-50 cursor-pointer'
                      onClick={() => navigate(`/admin/detalle/${pedido.id}`)}
                    >
                      <td className='py-3 px-4'>
                        <div className="flex flex-col gap-1">
                          {pedido.productos?.map((producto, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-800">
                                {producto.nombre || `Producto ${i + 1}`}
                              </span>
                              <span className="text-xs text-gray-500">(x{producto.cantidad})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className='py-3 px-4 text-blue-500 hover:underline'>
                        #{pedido.id.slice(0, 8)}...
                      </td>
                      <td className='py-3 px-4'>
                        {formatDate(pedido.fecha)}
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center gap-2'>
                          <img
                            src={pedido.cliente?.avatar || '/placeholder.svg'}
                            alt={pedido.cliente?.nombre || 'Cliente'}
                            className='w-5 h-5 rounded-full bg-gray-200'
                          />
                          <span>{pedido.cliente?.nombre || `Usuario (ID: ${pedido.idUsuario?.slice(0, 6)}...)`}</span>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              pedido.estado === 'Entregado' ? 'bg-green-500' :
                              pedido.estado === 'Pendiente' ? 'bg-yellow-500' :
                              pedido.estado === 'Cancelado' ? 'bg-red-500' : 'bg-gray-500'
                            }`}
                          ></span>
                          <span>{pedido.estado || 'Sin estado'}</span>
                        </div>
                      </td>
                      <td className='py-3 px-4 font-medium text-green-600'>
                        Bs. {pedido.total?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredPedidos.length > 0 && (
            <div className='mt-4 flex justify-between items-center'>
              <div className='text-xs text-gray-500'>
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filteredPedidos.length)} de{' '}
                {filteredPedidos.length} pedidos
              </div>
              <div className='flex gap-1'>
                <button 
                  className={`w-6 h-6 flex items-center justify-center rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`w-6 h-6 flex items-center justify-center rounded text-xs ${
                        currentPage === pageNum 
                          ? 'bg-black text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className='w-6 h-6 flex items-center justify-center text-xs'>...</span>
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <button
                    className={`w-6 h-6 flex items-center justify-center rounded text-xs ${
                      currentPage === totalPages 
                        ? 'bg-black text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}

                <button 
                  className={`w-6 h-6 flex items-center justify-center rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablaProductos;