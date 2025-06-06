import { useState, useEffect } from "react"
import { Search, User, LogOut, ShoppingBag, Heart, Menu, X, ChevronDown, CircleUserRoundIcon } from 'lucide-react'
import Carrito from "../../pages/cliente/carrito"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../store/app-store"
import authService from "../../services/auth-service"
import { FirebaseAuth } from "../../firebase/config"
import userService from "../../services/user-service"

const NavbarCliente = ({ children }) => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isCartOpen, setIsCartOpen } = useAppStore()
  const [activeCategory, setActiveCategory] = useState(null)
  const store = useAppStore()
  const [currentUser, setCurrentUser] = useState(null)

  const [isFilterOpen, setIsFilterOpen] = useState({
    categories: false,
    color: false,
    size: false,
    price: false,
  })
  // Función para abrir/cerrar el carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  // Función para cerrar el carrito
  const closeCart = () => {
    setIsCartOpen(false)
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
  const mainCategories = [
    {
      title: "Acerca de",
      path: "/nosotros",
    },
    {
      title: "Catalogo",
      path: "/catalogo",
    },
    {
      title: "Inicio",
      path: "/",
    },
  ]
  const subCategories = ["Inicio", "Catalogo"]

  const filterCategories = {
    categories: [
      { name: "Hombre", checked: false },
      { name: "Mujer", checked: false },
      { name: "Niño", checked: false },
      { name: "Niña", checked: false },
      { name: "Unisex", checked: false },
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

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = FirebaseAuth.currentUser
        if (user) {
          const userData = await userService.getById(user.uid)
          setCurrentUser(userData)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    checkUser()

    // Listen for auth state changes
    const unsubscribe = FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await userService.getById(user.uid)
        setCurrentUser(userData)
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full">
        <div className="px-4 md:px-10 border-b border-gray-200 sticky top-0 z-30 bg-white py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 md:space-x-6">
          <button className="md:hidden" onClick={toggleSidebar}>
            <Menu size={20} className="mx-2 md:mx-6" />
          </button>
          {mainCategories.map((category, index) => (
            <button
              key={index}
              className="text-sm hover:underline"
              onClick={() => navigate(category.path)}
            >
              {category.title}
            </button>
          ))}
            </div>

            <div className="flex items-center space-x-2">
          <Heart size={20} className="text-black" />
          <h1 className="text-lg md:text-xl font-bold">MYSHOP</h1>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
          <button className="hover:text-gray-600">
            <Search size={20} />
          </button>

          {currentUser && (
            <button
              className="hover:text-gray-600"
              onClick={() => {
                  authService.signOut()
                  setCurrentUser(null)
                }}
              >
                <LogOut size={20} />
              </button>
            )}

            <button className="hover:text-gray-600" onClick={() => navigate("/login")}>
              <User size={20} />
            </button>
            <button className="hover:text-gray-600" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
            </button>

            {currentUser && (
              <div className="flex items-center space-x-2 px-3.5 py-1 rounded-4xl border-2">
                <span className="text-2sm font-stretch-semi-expanded text-black ml-2 flex items-center space-x-2 gap-2"><CircleUserRoundIcon className="justify-between text-start" />{currentUser.nombre}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-b border-gray-200 hidden md:block sticky top-0 z-20 bg-white py-2">
        <div className="px-6">
          <div className="flex text-center justify-center space-x-6 md:space-x-9 py-2">
            {subCategories.map((category, index) => (
              <button
                key={index}
                className="text-sm hover:underline"
                onClick={() => navigate(`/${category.toLowerCase()}`)}
              >
                {category}
              </button>
            ))}
            {currentUser && (
              <button
                className="text-sm hover:underline"
                onClick={() => navigate("/historial")}
              >
                Historial de Compras
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-red-500" />
            <h1 className="text-lg md:text-xl font-bold">MYSHOP</h1>
          </div>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="px-20 mx-40 ">
          <div className="space-y-4 space-x-20">
            <div>
              <button
                className="text-lg font-medium w-full text-left py-2"
                onClick={() => navigate("/")}
              >
                Inicio
              </button>
            </div>
            <div>
              <button
                className="text-lg font-medium w-full text-left py-2"
                onClick={() => navigate("/catalogo")}
              >
                Catalogo
              </button>
            </div>
            {currentUser && (
              <div>
                <button
                  className="text-lg font-medium w-full text-left py-2"
                  onClick={() => navigate("/historial")}
                >
                  Historial de Compras
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Filters - Sidebar */}
      <div className="flex flex-col md:flex-row p-0 flex-1">
        <div className="w-full md:w-1/4 p-2 md:p-6">
          {/* Categorías */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-base md:text-lg">Categorías</h3>
              <button className="ml-4" onClick={() => toggleFilter("categories")}>
                <ChevronDown size={16} className={`transform ${isFilterOpen.categories ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isFilterOpen.categories && (
              <div className="space-y-2">
                {filterCategories.categories.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      className="mr-2 mt-1 h-4 w-4 shrink-0"
                      checked={store.filtros.categoria.includes(item.name)}
                      onChange={() => store.setCategoria(item.name)}
                    />
                    <label
                      htmlFor={`category-${index}`}
                      className="mb-1 py-1.5 text-xs leading-tight text-left break-words max-w-full"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
                <button className="text-sm text-gray-500 mt-2">Ver más +</button>
              </div>
            )}
          </div>

          {/* Color */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-base md:text-lg">Color</h3>
              <button className="ml-4" onClick={() => toggleFilter("color")}>
                <ChevronDown size={16} className={`transform ${isFilterOpen.color ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isFilterOpen.color && (
              <div>
                <div className="grid grid-cols-4 md:grid-cols-3 gap-2 mb-2">
                  {filterCategories.colors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <button
                        className={`${color.color} w-6 h-6 md:w-8 md:h-8 rounded-full mb-1 border ${store.filtros.color.includes(color.name) ? "border-black" : "border-gray-300"
                          }`}
                        onClick={() => store.setColor(color.name)}
                      ></button>
                      <span className="text-xs">{color.name}</span>
                    </div>
                  ))}
                </div>
                <button className="text-sm text-gray-500 mt-2">Ver más +</button>
              </div>
            )}
          </div>

          {/* Talla */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-base md:text-lg">Talla</h3>
              <button className="ml-4" onClick={() => toggleFilter("size")}>
                <ChevronDown size={16} className={`transform ${isFilterOpen.size ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isFilterOpen.size && (
              <div>
                <div className="grid grid-cols-4 gap-2">
                  {filterCategories.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`border rounded py-1 px-2 text-xs md:text-sm ${store.filtros.talla.includes(size.name) ? "border-black" : "border-gray-300"
                        }`}
                      onClick={() => store.setTalla(size.name)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-0 md:p-0 ml-2">{children}</div>
      </div>
      <Carrito isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default NavbarCliente
