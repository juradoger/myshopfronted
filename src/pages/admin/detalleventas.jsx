import { useState, useEffect } from 'react';
import { MapPin, Download, ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import pedidosService from '../../services/pedidos-service';

export default function DetallesPedido() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPedido = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await pedidosService.getById(id);
        
        // Transformar los datos para asegurar la estructura esperada
        const pedidoTransformado = transformarPedido(data);
        
        setPedido(pedidoTransformado);
      } catch (error) {
        console.error('Error al cargar el pedido:', error);
        setError(error.message || 'No se pudo cargar el pedido');
      } finally {
        setIsLoading(false);
      }
    };

    loadPedido();
  }, [id]);

  // Función para transformar los datos del pedido
  const transformarPedido = (data) => {
    // Asegurar que productos tenga la estructura correcta
    const productos = (data.productos || []).map(producto => {
      return {
        id: producto.id || 'N/A',
        nombre: producto.nombre || `Producto ${producto.id?.slice(0, 4) || ''}`,
        precio: producto.precio || 0,
        cantidad: producto.cantidad || 1
      };
    });

    // Asegurar que el cliente tenga la estructura correcta
    const cliente = data.cliente || {
      nombre: `Cliente ${data.idUsuario?.slice(0, 4) || ''}`,
      email: '',
      telefono: '',
      avatar: '/placeholder.svg'
    };

    // Calcular el total si no viene en los datos
    const total = data.total || productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);

    return {
      id: data.id,
      estado: data.estado || 'Pendiente',
      fecha: data.fecha,
      productos,
      cliente,
      direccion: data.direccion || { city: '', details: '' },
      tipo_venta: data.tipo_venta || 'No especificado',
      total
    };
  };

  const formatDate = (date) => {
    if (!date) return 'Fecha no disponible';
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      return dateObj.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Error formateando fecha:', e);
      return 'Fecha inválida';
    }
  };

  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await pedidosService.update({
        id: pedido.id,
        estado: newStatus
      });
      setPedido(prev => ({ ...prev, estado: newStatus }));
    } catch (error) {
      console.error('Error actualizando estado:', error);
      setError('No se pudo actualizar el estado');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !pedido) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 text-lg text-center mb-6">{error || 'El pedido no existe o no se pudo cargar'}</p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Volver atrás
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-600 mb-2">
            <button onClick={() => navigate('/')} className="hover:text-gray-800">
              Inicio
            </button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/pedidos')} className="hover:text-gray-800">
              Lista de pedidos
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Detalles del Pedido</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            DETALLES DEL PEDIDO <span className="text-orange-500"></span>
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cabecera del pedido */}
          <div className="p-4 md:p-6 border-b flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-gray-500 text-sm">Estado:</p>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' :
                  pedido.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  pedido.estado === 'Cancelado' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {pedido.estado || 'Sin estado'}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Fecha:</p>
                <span className="text-gray-800">{formatDate(pedido.fecha)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={pedido.estado || ''}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="border border-gray-300 rounded pl-3 pr-8 py-1 text-sm bg-white appearance-none"
                >
                  <option value="">Cambiar estado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
              <button 
                className="p-2 border border-gray-300 rounded hover:bg-gray-100"
                title="Descargar"
              >
                <Download size={16} />
              </button>
            </div>
          </div>

          {/* Información del cliente, pedido y entrega */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6">
            {/* Cliente */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Cliente</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Nombre:</span>{' '}
                  <span className="font-medium">{pedido.cliente?.nombre || 'No disponible'}</span>
                </p>
                <p>
                  <span className="text-gray-500">Email:</span>{' '}
                  {pedido.cliente?.email || 'No disponible'}
                </p>
                <p>
                  <span className="text-gray-500">Teléfono:</span>{' '}
                  {pedido.cliente?.telefono || 'No disponible'}
                </p>
              </div>
            </div>

            {/* Información del pedido */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">Información del Pedido</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Método de pago:</span>{' '}
                  {pedido.tipo_venta || 'No especificado'}
                </p>
                <p>
                  <span className="text-gray-500">ID Pedido:</span>{' '}
                  <span className="font-mono">{pedido.id}</span>
                </p>
              </div>
            </div>

            {/* Entrega */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold">Entrega</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Dirección:</span>{' '}
                  {pedido.direccion?.city || pedido.direccion || 'No especificada'}
                </p>
                {pedido.direccion?.details && (
                  <p className="text-gray-700">{pedido.direccion.details}</p>
                )}
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="px-4 md:px-6 pb-4">
            <h3 className="font-semibold mb-3">Productos ({pedido.productos?.length || 0})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Unitario
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!pedido.productos || pedido.productos.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                        No hay productos en este pedido
                      </td>
                    </tr>
                  ) : (
                    pedido.productos.map((producto, index) => (
                      <tr key={`${producto.id}-${index}`}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {producto.nombre}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-mono">
                            {producto.id}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="text-sm text-gray-900">
                            {producto.cantidad}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">
                            Bs. {formatPrice(producto.precio)}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-green-600">
                            Bs. {formatPrice(producto.precio * producto.cantidad)}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="px-4 md:px-6 py-4 bg-gray-50 border-t">
            <div className="flex justify-end">
              <div className="w-full md:w-64">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">Bs. {formatPrice(pedido.total)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="font-bold text-lg">Bs. {formatPrice(pedido.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}