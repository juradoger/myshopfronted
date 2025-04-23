"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown, Heart } from "lucide-react"
import PopupBusquedaProducto from "../popups/admin/popupbusquedaproducto"
import PopupNotificaciones from "../popups/admin/popupnotificaciones"
import PopupLogout from "../popups/admin/popuplogout"
import { useNavigate } from "react-router-dom"

//const rutas = ["PANEL", "TODOS LOS PRODUCTOS", "LISTA DE PEDIDOS"]
const rutas = [
  {
    title: "PANEL",
    path: "/admin",
  },
  {
    title: "TODOS LOS PRODUCTOS",
    path: "/admin/productos",
  },
  {
    title: "LISTA DE PEDIDOS",
    path: "/admin/tabla",
  },
]
const NavbarAdmin = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const navigate= useNavigate()

  const categories = [
    { name: "Blusas", count: "21" },
    { name: "Lorem Ipsum", count: "32" },
    { name: "Lorem Ipsum", count: "13" },
    { name: "Lorem Ipsum", count: "14" },
    { name: "Lorem Ipsum", count: "06" },
    { name: "Lorem Ipsum", count: "11" },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close all popups except the one being opened
  const handlePopupToggle = (popup) => {
    if (popup === "search") {
      setIsSearchOpen(!isSearchOpen)
      setIsNotificationsOpen(false)
      setIsAdminOpen(false)
    } else if (popup === "notifications") {
      setIsNotificationsOpen(!isNotificationsOpen)
      setIsSearchOpen(false)
      setIsAdminOpen(false)
    } else if (popup === "admin") {
      setIsAdminOpen(!isAdminOpen)
      setIsSearchOpen(false)
      setIsNotificationsOpen(false)
    }
  }

  // Close all popups when clicking outside
  const handleClickOutside = () => {
    setIsSearchOpen(false)
    setIsNotificationsOpen(false)
    setIsAdminOpen(false)
  }

  const navigateTo = (path) => {
    navigate(path)
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`bg-white text-black w-64 min-h-screen fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center border-b border-gray-200">
          <Heart className="w-4 h-4 mr-1" />
          <span className="font-semibold">MYSHOP</span>
        </div>

        {/* Menú principal */}
        <div className="p-6 space-y-1">
          {rutas.map((item, idx) => (
            <div
              key={idx}
              className="py-2 px-3 text-black hover:bg-black hover:text-white rounded cursor-pointer transition-colors"
              onClick={() => navigateTo(item.path)}
            >
              <span className="font-medium text-sm">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Separador */}
        <div className="mx-4 border-t border-gray-300 my-2"></div>

        {/* Categorías */}
        <div className="p-4">
          <div className="flex items-center justify-between py-2 px-3 hover:bg-black hover:text-white text-black rounded cursor-pointer mb-2 transition-colors">
            <span className="font-medium text-sm">Categorías</span>
            <ChevronDown size={16} />
          </div>

          <div className="space-y-1 pl-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1.5 px-3 hover:bg-black hover:text-white text-black rounded cursor-pointer transition-colors"
              >
                <span className="text-sm">{category.name}</span>
                <span className="bg-black text-white px-2 py-0.5 rounded-md text-xs">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`${isSidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300 min-h-screen bg-gray-100`}
        onClick={handleClickOutside}
      >
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm p-3.5 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger menu */}
            <button onClick={toggleSidebar} className="lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Right side navbar */}
          <div className="flex items-center gap-6">
            <div className="cursor-pointer relative">
              <Search
                className="w-5 h-5 text-gray-500"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePopupToggle("search")
                }}
              />
              <PopupBusquedaProducto isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </div>
            <div className="cursor-pointer relative">
              <Bell
                className="w-5 h-5 text-gray-500"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePopupToggle("notifications")
                }}
              />
              <PopupNotificaciones isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            </div>
            <div
              className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded text-sm cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation()
                handlePopupToggle("admin")
              }}
            >
              <span className="font-medium">ADMIN</span>
              <ChevronDown size={16} />
              <PopupLogout isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
            </div>
          </div>
        </nav>

        {children}
      </div>
    </>
  )
}

export default NavbarAdmin
