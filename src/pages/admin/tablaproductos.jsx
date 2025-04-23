import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pedidos as pedidosDB } from "../../data/pedidos";

const TablaProductos = () => {
  const [pedidos, setPedidos] = useState(pedidosDB);

  const navigate = useNavigate();

  const startDate = "Feb 16, 2022";
  const endDate = "Feb 20, 2022";

  return (
    <div className="bg-gray-100">
      <div className="bg-white">
        {/* Header */}
        <div className="p-4">
          <h1 className="text-base font-medium mb-1">Lista de pedidos</h1>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span>Inicio</span>
              <span> &gt; </span>
              <span>Lista de pedidos</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-600 flex items-center">
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
                    className="mr-1"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {startDate} - {endDate}
                </div>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 text-xs border border-gray-300 rounded px-3 py-1.5">
                  <span>Cambiar estado</span>
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
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-sm">Compras recientes</h2>
            <button className="text-gray-500">
              <MoreVertical size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-600">
                  <th className="py-3 pr-4 text-left w-12">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="py-3 px-4 text-left">Producto</th>
                  <th className="py-3 px-4 text-left">ID de pedido</th>
                  <th className="py-3 px-4 text-left">Fecha</th>
                  <th className="py-3 px-4 text-left">Nombre del cliente</th>
                  <th className="py-3 px-4 text-left">Estado</th>
                  <th className="py-3 px-4 text-left">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido, index) => (
                  <tr key={index} className="text-xs">
                    <td className="py-3 pr-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3 px-4">{pedido.producto}</td>
                    <td
                      className="py-3 px-4"
                      onClick={() => navigate(`/admin/detalle/${pedido.id}`)}
                    >
                      #{pedido.id}
                    </td>
                    <td className="py-3 px-4">{pedido.fecha}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={pedido.cliente.avatar || "/placeholder.svg"}
                          alt={pedido.cliente.nombre}
                          className="w-5 h-5 rounded-full bg-gray-200"
                        />
                        <span>{pedido.cliente.nombre}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            pedido.estado === "Entregado"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                          }`}
                        ></span>
                        <span>{pedido.estado}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{pedido.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-start items-center">
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded bg-black text-white text-xs">
                1
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs">
                2
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs">
                3
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs">
                4
              </button>
              <span className="w-6 h-6 flex items-center justify-center text-xs">
                ...
              </span>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-xs">
                10
              </button>
              <button className="px-2 h-6 flex items-center justify-center rounded border border-gray-200 text-xs ml-1">
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaProductos;
