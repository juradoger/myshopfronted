import { useState, useEffect } from "react"
import { getCustomImagesForHome } from "../../services/api"
import { useNavigate } from "react-router-dom"

export default function Inicio() {
  const [loading, setLoading] = useState(true)
  const [homeImages, setHomeImages] = useState({
    hero: "",
    categorias: [],
    subcategorias: [],
  })

  // Estados para los carruseles - siempre mostrando 3 imágenes
  const [categoriesIndex, setCategoriesIndex] = useState(0)
  const [subCategoriesIndex, setSubCategoriesIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  // Número fijo de elementos a mostrar: 3
  const itemsToShow = 3

  // Estilos para la animación y carrusel
  const enhancedStyles = `
    @keyframes fadeIn {
      0% { opacity: 0.4; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 4px rgba(255,255,255,0.1); }
      50% { text-shadow: 0 0 15px rgba(255,255,255,0.5); }
    }
    
    .carousel-item {
      transition: all 0.5s ease;
    }
    
    .carousel-item:hover img {
      transform: scale(1.05);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    
    .animate-fade {
      animation: fadeIn 0.7s ease-out forwards;
    }
    
    .carousel-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .carousel-indicator.active {
      width: 24px;
      border-radius: 4px;
    }
    
    .carousel-nav-button {
      background-color: white;
      color: #333;
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 20px;
      opacity: 0.9;
    }
    
    .carousel-nav-button:hover {
      background-color: #f8f8f8;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 16px rgba(0,0,0,0.2);
      opacity: 1;
    }
  `

  useEffect(() => {
    // Cargar imágenes personalizadas
    const images = getCustomImagesForHome()
    setHomeImages(images)
    setLoading(false)
  }, [])

  // Función para navegar al siguiente grupo de imágenes
  const nextSlide = (currentIndex, setIndex, items) => {
    setIsAnimating(true)
    // Calcular el máximo índice posible para mostrar siempre 3 elementos
    const maxIndex = Math.max(0, items.length - itemsToShow)
    // Si estamos en el último grupo, volver al principio
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 700)
  }

  // Función para navegar al grupo anterior de imágenes
  const prevSlide = (currentIndex, setIndex, items) => {
    setIsAnimating(true)
    // Calcular el máximo índice posible para mostrar siempre 3 elementos
    const maxIndex = Math.max(0, items.length - itemsToShow)
    // Si estamos en el primer grupo, ir al último
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    setTimeout(() => setIsAnimating(false), 700)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <style>{enhancedStyles}</style>

      <div className="relative w-full h-[450px]">
        <img src={homeImages.hero || "/placeholder.svg"} alt="Era cómoda" className="w-full h-full object-cover" />
        <div
          className="w-full absolute inset-0 flex flex-col justify-center items-start md:px-16 text-white"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">El Comfort</h1>
          <p className="text-lg md:text-xl mb-8">Consigue el máximo confort y elegancia en MyShop.</p>
          <button className="bg-black text-white border-2 px-8 py-3 font-medium hover:bg-gray-900 transition rounded-md cursor-pointer" onClick={() => navigate("/catalogo")}>
            COMENZAR
          </button>
        </div>
      </div>

      {/* Comprar por categoría - CARRUSEL FIJO DE 3 ELEMENTOS */}
      <div className="py-12 px-4 mb-12">
        <h2 className="text-2xl font-medium mb-8 text-center">Categorías</h2>

        {homeImages.categorias && homeImages.categorias.length > 0 ? (
          <div className="relative max-w-6xl mx-auto">
            {/* Controles de navegación */}
            <div className="absolute inset-y-0 -left-5 md:-left-10 flex items-center z-10">
              <button
                className="carousel-nav-button cursor-pointer"
                onClick={() => prevSlide(categoriesIndex, setCategoriesIndex, homeImages.categorias)}
              >
                <span>←</span>
              </button>
            </div>

            <div className="absolute inset-y-0 -right-5 md:-right-10 flex items-center z-10">
              <button
                className="carousel-nav-button cursor-pointer border-2"
                onClick={() => nextSlide(categoriesIndex, setCategoriesIndex, homeImages.categorias)}
              >
                <span>→</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${(categoriesIndex * 100) / itemsToShow}%)`,
                  width: `${(homeImages.categorias.length * 100) / itemsToShow}%`,
                }}
              >
                {homeImages.categorias.map((category, index) => {
                  // Solo renderizar los elementos que están dentro del rango visible o cercanos
                  const isVisible = index >= categoriesIndex && index < categoriesIndex + itemsToShow
                  const isNearby =
                    (index >= categoriesIndex - itemsToShow && index < categoriesIndex) ||
                    (index >= categoriesIndex + itemsToShow && index < categoriesIndex + itemsToShow * 2)

                  if (!isVisible && !isNearby) return null

                  return (
                    <div
                      key={index}
                      className={`carousel-item flex flex-col items-center justify-center px-4 ${
                        isAnimating && isVisible ? "animate-fade" : ""
                      }`}
                      style={{ width: `${100 / homeImages.categorias.length}%` }}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-lg shadow-md">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform"
                        />
                      </div>
                      <span className="text-xl font-extralight mt-4">{category.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(homeImages.categorias.length / itemsToShow) }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator transition-all cursor-pointer ${
                    Math.floor(categoriesIndex / itemsToShow) === index ? "bg-black active" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setIsAnimating(true)
                    setCategoriesIndex(index * itemsToShow)
                    setTimeout(() => setIsAnimating(false), 700)
                  }}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">No hay categorías disponibles</div>
        )}
      </div>

      {/* Subcategorias - CARRUSEL FIJO DE 3 ELEMENTOS */}
      <div className="py-12 px-4 mb-12 bg-gray-50">
        <h2 className="text-2xl font-medium mb-8 text-center">Subcategorías</h2>

        {homeImages.subcategorias && homeImages.subcategorias.length > 0 ? (
          <div className="relative max-w-6xl mx-auto">
            {/* Controles de navegación */}
            <div className="absolute inset-y-0 -left-5 md:-left-10 flex items-center z-10">
              <button
                className="carousel-nav-button cursor-pointer"
                onClick={() => prevSlide(subCategoriesIndex, setSubCategoriesIndex, homeImages.subcategorias)}
              >
                <span>←</span>
              </button>
            </div>

            <div className="absolute inset-y-0 -right-5 md:-right-10 flex items-center z-10">
              <button
                className="carousel-nav-button cursor-pointer"
                onClick={() => nextSlide(subCategoriesIndex, setSubCategoriesIndex, homeImages.subcategorias)}
              >
                <span>→</span>
              </button>
            </div>

            {/* Contenedor del carrusel */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${(subCategoriesIndex * 100) / itemsToShow}%)`,
                  width: `${(homeImages.subcategorias.length * 100) / itemsToShow}%`,
                }}
              >
                {homeImages.subcategorias.map((category, index) => {
                  // Solo renderizar los elementos que están dentro del rango visible o cercanos
                  const isVisible = index >= subCategoriesIndex && index < subCategoriesIndex + itemsToShow
                  const isNearby =
                    (index >= subCategoriesIndex - itemsToShow && index < subCategoriesIndex) ||
                    (index >= subCategoriesIndex + itemsToShow && index < subCategoriesIndex + itemsToShow * 2)

                  if (!isVisible && !isNearby) return null

                  return (
                    <div
                      key={index}
                      className={`carousel-item relative px-4 ${isAnimating && isVisible ? "animate-fade" : ""}`}
                      style={{ width: `${100 / homeImages.subcategorias.length}%` }}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform"
                        />
                      </div>
                      <div className="absolute bottom-0 left-4 right-4 bg-white bg-opacity-90 p-3 text-center rounded-b-lg">
                        <span className="text-xl font-light">{category.name}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(homeImages.subcategorias.length / itemsToShow) }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator transition-all cursor-pointer ${
                    Math.floor(subCategoriesIndex / itemsToShow) === index ? "bg-black active" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setIsAnimating(true)
                    setSubCategoriesIndex(index * itemsToShow)
                    setTimeout(() => setIsAnimating(false), 700)
                  }}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">No hay subcategorías disponibles</div>
        )}
      </div>
    </div>
  )
}
