import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import productService from "../../services/productos-service";
import { useAppStore } from "../../store/app-store";

const TablaProductosReal = () => {
  const navigate = useNavigate();

  const startDate = "Abril 8, 2025";
  const endDate = "Mayo 10, 2025";

  const [productos, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const store = useAppStore();
  console.log("🚀 ~ TablaProductosReal ~ store:", store.filtros);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();

        const filteredData = data.filter((product) => {
          const { categoria, marca } = store.filtros;

          const matchesCategory = categoria.length === 0 || categoria.includes(product.category);

          const matchesBrand = marca.length === 0 || marca.includes(product.brand);

          return matchesCategory && matchesBrand;
        });

        if (store.filtros.categoria.length > 0 || store.filtros.marca.length > 0) {
          setProducts(filteredData);
          return;
        }

        const itemsPerPage = 10;
        const totalItems = data.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));

        // Obtener productos para la página actual
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setProducts(data.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage, store.filtros]);

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
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold mb-2">TODOS LOS PRODUCTOS</h1>
          <div className="flex justify-between items-center">
            <div className="flex text-start text-xs text-gray-500">
              <span>Inicio</span>
              <ChevronRight size={14} className="flex-wrap mx-2 my-1 text-gray-400" />
              <span>Lista de Productos</span>
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
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {startDate} - {endDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative inline-block">
              {/* Ícono MoreVertical */}
              <MoreVertical size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />

              {/* Select con la flechita */}
              <select
                className="border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm bg-white appearance-none pl-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onChange={(value) => {
                  store.resetFilters();
                  store.setCategoria(value.target.value);
                }}
              >
                <option value={"Hombre"}>Hombre</option>
                <option value={"Mujer"}>Mujer</option>
                <option value={"Niño"}>Niño</option>
                <option value={"Niña"}>Niña</option>
                <option value={"Unisex"}>Unisex</option>
              </select>

              {/* Flechita al lado derecho del select */}
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
          </div>
          <button
            className="bg-black text-white px-5 py-2.5 rounded-md flex justify-between items-center gap-2 mb-6 hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/admin/insertarproducto")}
          >
            <FaPlus size={14} />
            <span className="font-medium">AÑADIR NUEVO PRODUCTO</span>
          </button>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-xs font-light text-gray-600 uppercase tracking-wider">
                    <th className="py-3 px-2 text-center w-20 border-b border-r border-gray-200"></th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Nombre</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Descripción</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Categoría</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Marca</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">SKU</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Stock</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Precio Unitario</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Precio Mayor</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Tallas</th>
                    <th className="py-3 px-4 text-center border-b border-r border-gray-200 font-medium text-sm">Colores</th>
                    <th className="py-3 px-4 text-center border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productos.map((producto, index) => (
                    <tr
                      key={index}
                      className={`text-xs hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="py-2 px-2 border-r border-gray-200">
                        {producto.images?.[0] ? (
                          <img
                            src={producto.images[0] || "/placeholder.svg"}
                            alt={producto.name}
                            className="size-full max-w-45 rounded-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 border-r border-gray-200 font-medium">{producto.name}</td>
                      <td className="py-4 px-4 border-r border-gray-200 max-w-xs truncate">{producto.description}</td>
                      <td className="py-4 px-4 border-r border-gray-200">{producto.category}</td>
                      <td className="py-4 px-4 border-r border-gray-200">{producto.brand}</td>
                      <td className="py-4 px-4 border-r border-gray-200 font-mono text-gray-600">{producto.sku}</td>
                      <td className="py-4 px-4 border-r border-gray-200">
                        <span
                          className={`px-2 py-1 rounded-sm text-xs ${
                            producto.stock > 10
                              ? "bg-green-100 text-green-800"
                              : producto.stock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {producto.stock}
                        </span>
                      </td>
                      <td className="py-4 px-4 border-r border-gray-200 font-medium">Bs. {producto.price}</td>
                      <td className="py-4 px-4 border-r border-gray-200 font-medium">Bs. {producto.package_price}</td>
                      <td className="py-4 px-4 border-r border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {producto?.tags?.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-green-100 border border-gray-200 rounded-sm px-2 py-0.5 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 border-r border-gray-200">
                        <div className="flex gap-1">
                          {producto?.colors?.map((color, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.codigohx }}
                              title={color}
                            ></div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() => navigate(`/admin/actualizarproducto/${producto.id}`)}
                        >
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
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5l4 4-1.5 1.5-4-4z"></path>
                            <path d="M3 17.25V21h3.75l11.25-11.25-4-4L3 17.25z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <div className="flex gap-1">
              <button
                onClick={() => handlePrevPage()}
                disabled={currentPage === 1}
                className="px-2 h-8 flex items-center justify-center rounded border border-gray-200 text-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageClick(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs ${
                    currentPage === i + 1 ? "bg-black text-white" : "hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {totalPages > 5 && (
                <>
                  <span className="w-8 h-8 flex items-center justify-center text-xs">...</span>
                  <button
                    onClick={() => handlePageClick(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-xs border border-gray-200"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => handleNextPage()}
                disabled={currentPage === totalPages}
                className="px-2 h-8 flex items-center justify-center rounded border border-gray-200 text-xs hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="text-xs text-gray-500">
              Mostrando <span className="font-medium">{productos.length}</span> de{" "}
              <span className="font-medium">{totalPages * 10}</span> productos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaProductosReal;