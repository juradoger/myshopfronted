import { useEffect, useState } from "react"
import { User, ShoppingBag, Package, Tag, Loader2, AlertCircle, ChevronDown, ChevronUp, HeartIcon } from "lucide-react"
import pedidosService from "../../services/pedidos-service"
import productosService from "../../services/productos-service"
import { FirebaseAuth } from "../../firebase/config"

const HistorialCompras = () => {
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedPedidos, setExpandedPedidos] = useState({})
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Verificar si hay un usuario autenticado
    const unsubscribe = FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const cargarHistorial = async () => {
      if (!currentUser) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        // Obtener solo los pedidos del usuario actual
        const pedidos = await pedidosService.getAll()
        const pedidosUsuario = pedidos.filter((pedido) => pedido.idUsuario === currentUser.uid)

        // Cargar información completa de productos para cada pedido
        const pedidosConProductos = await Promise.all(
          pedidosUsuario.map(async (pedido) => {
            try {
              // Si los productos son solo IDs, cargamos la información completa
              if (pedido.productos && Array.isArray(pedido.productos) && typeof pedido.productos[0] === "string") {
                // Contar productos duplicados
                const productosContados = pedido.productos.reduce((acc, productoId) => {
                  acc[productoId] = (acc[productoId] || 0) + 1
                  return acc
                }, {})

                // Obtener IDs únicos
                const productosUnicos = Object.keys(productosContados)

                // Cargar detalles de productos únicos
                const productosCompletos = await Promise.all(
                  productosUnicos.map(async (productoId) => {
                    try {
                      const producto = await productosService.getById(productoId)
                      return {
                        ...producto,
                        id: productoId,
                        nombre: producto.name || producto.nombre || `Producto ${productoId.slice(0, 6)}...`,
                        descripcion: producto.description || producto.descripcion || "Sin descripción",
                        precio: producto.price || producto.precio || "Sin descripción",
                        cantidad: productosContados[productoId], // Asignar cantidad basada en duplicados
                      }
                    } catch (error) {
                      console.error("Error cargando producto:", productoId, error)
                      return {
                        id: productoId,
                        nombre: `Producto ${productoId.slice(0, 6)}...`,
                        descripcion: "Información no disponible",
                        precio: 0,
                        cantidad: productosContados[productoId],
                      }
                    }
                  }),
                )

                return {
                  ...pedido,
                  productos: productosCompletos,
                }
              } else if (
                pedido.productos &&
                Array.isArray(pedido.productos) &&
                typeof pedido.productos[0] === "object"
              ) {
                // Si ya son objetos pero necesitan normalización
                // Primero agrupamos por ID para contar duplicados
                const productosAgrupados = pedido.productos.reduce((acc, producto) => {
                  const id = producto.id || "unknown"
                  if (!acc[id]) {
                    acc[id] = { ...producto, cantidad: 0 }
                  }
                  acc[id].cantidad += producto.cantidad || 1
                  return acc
                }, {})

                const productosNormalizados = await Promise.all(
                  Object.values(productosAgrupados).map(async (producto) => {
                    if (producto.id && !producto.nombre && !producto.name) {
                      try {
                        const productoCompleto = await productosService.getById(producto.id)
                        return {
                          ...producto,
                          ...productoCompleto,
                          nombre:
                            productoCompleto.name ||
                            productoCompleto.nombre ||
                            `Producto ${producto.id.slice(0, 6)}...`,
                          descripcion:
                            productoCompleto.description || productoCompleto.descripcion || "Sin descripción",
                            precio:
                            productoCompleto.price || productoCompleto.precio || "Sin descripción",
                        }
                      } catch (error) {
                        console.error("Error normalizando producto:", producto.id, error)
                        return producto
                      }
                    }
                    return {
                      ...producto,
                      nombre: producto.name || producto.nombre || `Producto ${producto.id?.slice(0, 6) || "N/A"}...`,
                      descripcion: producto.description || producto.descripcion || "Sin descripción",
                      precio: producto.price || producto.precio || "Sin descripción",
                    }
                  }),
                )

                return {
                  ...pedido,
                  productos: productosNormalizados,
                }
              }

              return pedido
            } catch (error) {
              console.error("Error procesando pedido:", pedido.id, error)
              return pedido
            }
          }),
        )

        const historialAgrupado = pedidosConProductos.reduce((acc, pedido) => {
          const userId = pedido.idUsuario || "anonimo"

          if (!acc[userId]) {
            acc[userId] = {
              usuario: {
                id: userId,
                nombre: pedido.cliente?.nombre || pedido.usuario?.nombre || `Usuario ${userId.slice(0, 6)}...`,
                avatar: pedido.cliente?.avatar || pedido.usuario?.avatar,
              },
              pedidos: [],
              totalGastado: 0,
            }
          }

          acc[userId].pedidos.push(pedido)
          acc[userId].totalGastado += Number.parseFloat(pedido.total || 0)

          return acc
        }, {})

        setHistorial(Object.values(historialAgrupado))
      } catch (err) {
        console.error("Error completo:", err)
        setError(err.message || "Error al cargar el historial")
      } finally {
        setLoading(false)
      }
    }

    cargarHistorial()
  }, [currentUser])

  const toggleExpandPedido = (pedidoId) => {
    setExpandedPedidos((prev) => ({
      ...prev,
      [pedidoId]: !prev[pedidoId],
    }))
  }

  const generarNombrePedido = (pedido) => {
    if (!pedido.productos || pedido.productos.length === 0) {
      return `Pedido #${pedido.id?.slice(0, 6) || "N/A"}`
    }

    // Tomar el primer producto con nombre válido
    const primerProductoValido = pedido.productos.find((p) => p?.nombre) || pedido.productos[0]
    const nombreBase = primerProductoValido.nombre || `Producto ${primerProductoValido.id.slice(0, 6)}...`

    if (pedido.productos.length === 1) {
      return nombreBase
    }

    return `${nombreBase} y ${pedido.productos.length - 1} más`
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible"

    try {
      const fechaObj = fecha instanceof Date ? fecha : fecha.toDate()
      return fechaObj.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (error) {
      console.error("Error formateando fecha:", error)
      return "Fecha inválida"
    }
  }

  const formatearPrecio = (precio) => {
    return `Bs. ${Number.parseFloat(precio || 0).toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg">Cargando historial de compras...</p>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-gray-500">
        <User className="w-12 h-12 mb-4" />
        <p className="text-lg">Inicia sesión para ver tu historial de compras</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="text-lg">{error}</p>
      </div>
    )
  }

  if (historial.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-gray-500">
        <ShoppingBag className="w-12 h-12 mb-4" />
        <p className="text-lg">No tienes compras registradas</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <ShoppingBag className="mr-3" /> <HeartIcon className="mr-3"/> Tú historial de compras 
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Total de Pedidos</h3>
          <p className="text-2xl font-bold">{historial.reduce((sum, user) => sum + user.pedidos.length, 0)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Productos Comprados</h3>
          <p className="text-2xl font-bold">
            {historial.reduce(
              (sum, user) =>
                sum +
                user.pedidos.reduce(
                  (pSum, pedido) =>
                    pSum + pedido.productos?.reduce((itemSum, producto) => itemSum + (producto.cantidad || 1), 0) || 0,
                  0,
                ),
              0,
            )}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Total Gastado</h3>
          <p className="text-2xl font-bold text-green-600">
            Bs. {historial.reduce((sum, user) => sum + user.totalGastado, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {historial.map((grupoUsuario) => (
          <div key={grupoUsuario.usuario.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-100">
              {grupoUsuario.pedidos.map((pedido) => {
                // Calcular subtotal basado en los productos
                const subtotalCalculado =
                  pedido.productos?.reduce(
                    (sum, producto) => sum + (producto.precio || 0) * (producto.cantidad || 1),
                    0,
                  ) || 0

                return (
                  <div key={pedido.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div
                      className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 cursor-pointer"
                      onClick={() => toggleExpandPedido(pedido.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Tag className="w-5 h-5 text-blue-500 mr-2" />
                          <h3 className="text-lg font-medium">{generarNombrePedido(pedido)}</h3>
                          {expandedPedidos[pedido.id] ? (
                            <ChevronUp className="ml-2 text-gray-400" />
                          ) : (
                            <ChevronDown className="ml-2 text-gray-400" />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            #{pedido.id?.slice(0, 8) || "N/A"}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {formatearFecha(pedido.fecha)}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              pedido.estado === "Entregado"
                                ? "bg-green-100 text-green-800"
                                : pedido.estado === "Cancelado"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {pedido.estado || "Pendiente"}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total del pedido</p>
                        <p className="text-xl font-bold text-green-600">{formatearPrecio(pedido.total)}</p>
                      </div>
                    </div>

                    {expandedPedidos[pedido.id] && (
                      <div className="ml-2 pl-4 border-l-2 border-gray-200 mt-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Detalles del pedido:</h4>

                        <div className="mb-4">
                          <h5 className="text-xs font-medium text-gray-400 mb-1">Información adicional:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Método de pago:</p>
                              <p className="font-medium">{pedido.tipo_venta || "No especificado"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Dirección de envío:</p>
                              <p className="font-medium">
                                {pedido.direccion?.city || "Ciudad no especificada"},{" "}
                                {pedido.direccion?.country || "País no especificado"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <h5 className="text-sm font-medium text-gray-500 mb-3">Productos:</h5>
                        <ul className="grid gap-3">
                          {pedido.productos?.length > 0 ? (
                            pedido.productos.map((producto, index) => (
                              <li
                                key={`${producto.id}-${index}`}
                                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-200 w-10 h-10 rounded-md flex items-center justify-center overflow-hidden">
                                    {producto.images ? (
                                      <img
                                        src={producto.images || "/placeholder.svg"}
                                        alt={producto.nombre}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <Package className="w-5 h-5 text-gray-400" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {producto.nombre || `Producto ${producto.id.slice(0, 6)}...`}
                                    </p>
                                    <p className="text-xs text-gray-500">{producto.descripcion || "Sin descripción"}</p>
                                    <p className="text-xs text-gray-500">Cantidad: {producto.cantidad || 1}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatearPrecio(producto.precio || 0)}</p>
                                  <p className="text-xs text-gray-500">
                                    Total: {formatearPrecio((producto.precio || 0) * (producto.cantidad || 1))}
                                  </p>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="text-center py-4 text-gray-400">
                              No hay información de productos disponible
                            </li>
                          )}
                        </ul>

                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistorialCompras
