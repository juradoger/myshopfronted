import { useState, useEffect } from "react"
import { fetchClothingProducts } from "../../services/api"
import { useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import { ChevronRight } from "lucide-react"

// Importante: No importes el AdminLayout aquí si estás usando rutas anidadas
export default function Productos() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchClothingProducts()
        // Dividir los productos en páginas (9 por página)
        const itemsPerPage = 9
        const totalItems = data.length
        setTotalPages(Math.ceil(totalItems / itemsPerPage))

        // Obtener productos para la página actual
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        setProducts(data.slice(startIndex, endIndex))
      } catch (error) {
        console.error("Error al cargar productos:", error)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className=" px-10 py-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-">
          <h1>PRODUCTOS</h1>
          <p className="flex text-start text-sm font-light text-gray-500">Inicio <ChevronRight size={14} className=" flex-wrap mx-2 my-1 text-gray-400" /> Productos</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => navigate("/admin/insertarproducto")}>
          <FaPlus size={14} />
          <span>AÑADIR NUEVO PRODUCTO</span>
          
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-medium">{product.title}</h2>
                    <span className="text-sm font-bold">BS. {product.price.toFixed(2)}</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-bold mb-1">Descripcion:</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Salida</span>
                    <span className="text-sm">{product.sales}</span>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${product.salesPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cantidad restante</span>
                    <span className="text-sm">{product.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-2 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight size={16} className="transform rotate-180" />
              </button>

              {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                const pageNumber = index + 1
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === pageNumber
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}

              {totalPages > 5 && (
                <>
                  <span className="px-2">...</span>
                  <button
                    onClick={() => handlePageClick(totalPages)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-2 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
              >
             <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
// Removed duplicate export statement