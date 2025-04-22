import { useState, useEffect } from "react"
import { MapPin, Download, ExternalLink } from "lucide-react"

export default function DetallesPedido() {
  const [productos, setProductos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pedido, setPedido] = useState({
    id: "42743",
    fecha: "Feb 10, 2022 - Feb 25, 2022",
    estado: "Enviado",
    cliente: {
      nombre: "Juan Pérez",
      email: "juanperez@gmail.com",
      telefono: "+51 992 231 1212",
    },
    envio: {
      metodo: "Pedidos express",
      pago: "PayPal",
      direccion: "Clorinda Matto, Pardo Viejo, Surquillo, Lima, Perú",
    },
    pago: {
      tarjeta: "** ** ** 6342",
      titular: "Juana Pérez",
      telefono: "+51 992 231 1212",
    },
    resumen: {
      subtotal: 3201.6,
      impuesto: 640.32,
      descuento: 0,
      envio: 0,
      total: 3841.92,
    },
  })

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    setIsLoading(true)
    try {
      // Usando la API de FakeStore como ejemplo
      const response = await fetch("https://fakestoreapi.com/products?limit=4")
      const data = await response.json()

      // Adaptando los datos al formato que necesitamos
      const productosFormateados = data.map((item) => ({
        id: `#${item.id}421`,
        nombre: item.title,
        cantidad: 2,
        precio: (item.price * 40).toFixed(2), // Multiplicando para que coincida con los valores del diseño
      }));
      
      setProductos(productosFormateados);
      
    } catch (error) {
      console.error("Error al obtener productos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <a href="#" className="hover:text-gray-700">
              Inicio
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-gray-700">
              Lista de pedidos
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Detalles del pedido</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Detalles de pedidos</h1>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Cabecera del pedido */}
          <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div>
                <p className="text-gray-500 text-sm">ID de pedido:</p>
                <p className="font-semibold text-gray-800">{pedido.id}</p>
              </div>
              <span className="ml-3 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                {pedido.estado}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>{pedido.fecha}</span>
              <div className="ml-4 flex space-x-2">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm bg-white">
                  <option>Cambiar estado</option>
                  <option>Pendiente</option>
                  <option>Enviado</option>
                  <option>Entregado</option>
                  <option>Cancelado</option>
                </select>
                <button className="p-1 border border-gray-300 rounded">
                  <ExternalLink size={16} />
                </button>
                <button className="p-1 border border-gray-300 rounded">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Información del cliente, pedido y entrega */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <div className="space-y-1 text-sm">
                <p className="font-medium">Nombre completo: {pedido.cliente.nombre}</p>
                <p>Email: {pedido.cliente.email}</p>
                <p>Teléfono: {pedido.cliente.telefono}</p>
              </div>
              <button className="mt-4 w-full py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition">
                Ver perfil
              </button>
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
                <h3 className="font-semibold">Información del pedido</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p>Envío: {pedido.envio.metodo}</p>
                <p>Método de pago: {pedido.envio.pago}</p>
              </div>
              <button className="mt-4 w-full py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition">
                Descargar información
              </button>
            </div>

            {/* Entregar a */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold">Entregar a</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p>Dirección: {pedido.envio.direccion}</p>
              </div>
              <button className="mt-4 w-full py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition">
                Ver mapa
              </button>
            </div>
          </div>

          {/* Información de pago y notas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Información de pago */}
            <div>
              <h3 className="font-semibold mb-3">Información de pago</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-8 h-5 bg-red-500 rounded mr-2"></div>
                  <p>Método: Tarjeta {pedido.pago.tarjeta}</p>
                </div>
                <p>Titular de la tarjeta: {pedido.pago.titular}</p>
                <p>Teléfono: {pedido.pago.telefono}</p>
              </div>
            </div>

            {/* Nota */}
            <div>
              <h3 className="font-semibold mb-3">Nota</h3>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                rows="3"
                placeholder="Escribe alguna nota..."
              ></textarea>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Productos</h3>
              <span className="text-gray-500">{productos.length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="py-3 pl-4 pr-3 w-12">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="py-3 px-3">Nombre del producto</th>
                    <th className="py-3 px-3">ID de pedido</th>
                    <th className="py-3 px-3 text-center">Cantidad</th>
                    <th className="py-3 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center">
                        Cargando productos...
                      </td>
                    </tr>
                  ) : (
                    productos.map((producto, index) => (
                      <tr key={index} className="text-sm">
                        <td className="py-4 pl-4 pr-3">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="py-4 px-3 font-medium">{producto.nombre}</td>
                        <td className="py-4 px-3 text-gray-500">{producto.id}</td>
                        <td className="py-4 px-3 text-center">{producto.cantidad}</td>
                        <td className="py-4 px-3 text-right">Bs. {producto.precio}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="border-t border-gray-200 pt-4">
            <div className="w-full md:w-64 ml-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Bs. {pedido.resumen.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (20%)</span>
                  <span>Bs. {pedido.resumen.impuesto.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Descuento</span>
                  <span>Bs. {pedido.resumen.descuento.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tasa de envío</span>
                  <span>Bs. {pedido.resumen.envio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>Bs. {pedido.resumen.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}