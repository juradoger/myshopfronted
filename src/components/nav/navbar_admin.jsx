import { useState } from "react"
import { Search, Bell, ChevronDown, ChevronRight, Heart } from "lucide-react"

const NavbarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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
        <div className="p-4 space-y-1">
          {["PANEL", "TODOS LOS PRODUCTOS", "LISTA DE PEDIDOS"].map((item, idx) => (
            <div
              key={idx}
              className="py-2 px-3 text-black hover:bg-black hover:text-white rounded cursor-pointer transition-colors"
            >
              <span className="font-medium text-sm">{item}</span>
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
                <span className="bg-black text-white px-2 py-0.5 rounded-md text-xs">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300 min-h-screen bg-gray-100`}
      >
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger menu */}
            <button onClick={toggleSidebar} className="lg:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center text-sm">
              <span className="text-gray-600">Inicio</span>
              <ChevronRight size={14} className="mx-1 text-gray-400" />
              <span className="text-gray-600">Todos los productos</span>
            </div>
          </div>

          {/* Right side navbar */}
          <div className="flex items-center gap-6">
            <div className="cursor-pointer">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <div className="cursor-pointer">
              <Bell className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer">
              <span className="font-medium">ADMIN</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavbarAdmin
