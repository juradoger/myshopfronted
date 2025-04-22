import { useState } from "react"
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react"
import LoginPopup from "../popups/cliente/login_popup"

const NavbarCliente = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState({
    categories: false,
    color: false,
    size: false,
    price: false,
  })
  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen)
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleFilter = (filter) => {
    setIsFilterOpen({
      ...isFilterOpen,
      [filter]: !isFilterOpen[filter],
    })
  }

  const mainCategories = ["Mujer", "Hombre", "Acerca de", "Tiendas"]
  const subCategories = [
    "Sobre",
    "Fábricas",
    "Iniciativas ambientales",
    "Nuestro compromiso",
    "Reporte de Impacto",
    "Moda",
  ]

  const filterCategories = {
    categories: [
      { name: "Ropa - Para todos los géneros", checked: false },
      { name: "Artículos, Weekenders & Complementos", checked: false },
      { name: "Camisas de vestir y camisas planchadas", checked: false },
      { name: "Lino colorido y estampado", checked: false },
    ],
    colors: [
      { name: "Negro", color: "bg-black", checked: false },
      { name: "Azul", color: "bg-blue-600", checked: false },
      { name: "Café", color: "bg-amber-800", checked: false },
      { name: "Verde", color: "bg-green-700", checked: false },
      { name: "Púrpura", color: "bg-purple-700", checked: false },
      { name: "Naranja", color: "bg-orange-500", checked: false },
      { name: "Rosa", color: "bg-pink-300", checked: false },
      { name: "Rojo", color: "bg-red-600", checked: false },
      { name: "Beige", color: "bg-amber-200", checked: false },
    ],
    sizes: [
      { name: "36", checked: false },
      { name: "38", checked: false },
      { name: "40", checked: false },
      { name: "42", checked: false },
      { name: "44", checked: false },
      { name: "46", checked: false },
      { name: "48", checked: false },
      { name: "50", checked: false },
      { name: "XXS", checked: false },
      { name: "XS", checked: false },
      { name: "S", checked: false },
      { name: "M", checked: false },
      { name: "L", checked: false },
      { name: "XL", checked: false },
      { name: "XXL", checked: false },
    ],
  }

  return (
    <div className="w-full">
      {/* Top Navigation */}
      <div className="border-b border-gray-200 sticky top-0 z-30 bg-white py-4">
        <div className=" px-10 flex justify-between items-center py-2">
          <div className="flex items-center space-x-6">
            <button className="md:hidden" onClick={toggleSidebar}>
              <Menu size={20} className="mx-6"/>
            </button>
            <div className="hidden md:flex space-x-6">
              {mainCategories.map((category, index) => (
                <button
                  key={index}
                  className={`text-sm font-medium hover:underline ${activeCategory === category ? "border-b-2 border-black" : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-black" />
            <h1 className="text-xl font-bold">MYSHOP</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-600">
              <Search size={20} />
            </button>
            <button className="hover:text-gray-600" onClick={toggleLoginPopup}>
              <User size={20} />
            </button>
            <button className="hover:text-gray-600">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-b border-gray-200 hidden md:block sticky top-0 z-20 bg-white py-2">    
        <div className=" px-4">
          <div className="flex justify-center space-x-6 py-2">
            {subCategories.map((category, index) => (
              <button key={index} className="text-sm hover:underline">
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-red-500" />
            <h1 className="text-xl font-bold">MYSHOP</h1>
          </div>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {mainCategories.map((category, index) => (
              <div key={index}>
                <button className="text-lg font-medium w-full text-left py-2">{category}</button>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4">
              {subCategories.map((category, index) => (
                <button key={index} className="text-sm block w-full text-left py-2">
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Filters - Sidebar */}
      <div className="px-10 flex flex-col md:flex-row p-4">
        <div className="w-full md:w-1/4 p-6">
          {/* Categorías */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">Categorías</h3>
              <button onClick={() => toggleFilter("categories")}>
                <ChevronDown size={16} className={`transform ${isFilterOpen.categories ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isFilterOpen.categories && (
              <div className="space-y-2">
                {filterCategories.categories.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <input type="checkbox" id={`category-${index}`} className="mr-2 mt-1 h-4 w-4 shrink-0" />
                    <label htmlFor={`category-${index}`} className="mb-1 py-1.5 text-xs leading-tight text-left break-words max-w-[90%]">
                      {item.name}
                    </label>
                  </div>
                ))}
                <button className="text-sm text-gray-500 mt-2">Ver más +</button>
              </div>
            )}
          </div>

          {/* Color */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">Color</h3>
              <button onClick={() => toggleFilter("color")}>
                <ChevronDown size={16} className={`transform ${isFilterOpen.color ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isFilterOpen.color && (
              <div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {filterCategories.colors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <button className={`${color.color} w-8 h-8 rounded-full mb-1 border border-gray-300`}></button>
                      <span className="text-xs">{color.name}</span>
                    </div>
                  ))}
                </div>
                <button className="text-sm text-gray-500 mt-2">Ver más +</button>
              </div>
            )}
          </div>

          {/* Talla */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">Talla</h3>
              <button onClick={() => toggleFilter("size")}>
                <ChevronDown size={16} className={`transform ${isFilterOpen.size ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isFilterOpen.size && (
              <div>
                <div className="grid grid-cols-4 gap-2">
                  {filterCategories.sizes.map((size, index) => (
                    <button key={index} className="border border-gray-300 rounded py-1 px-2 text-sm hover:border-black">
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {children}
      </div>
       {/* Login Popup */}
       <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}

export default NavbarCliente
