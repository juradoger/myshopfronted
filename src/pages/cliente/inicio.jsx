import { useState, useEffect } from "react";
import { getCustomImagesForHome } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [homeImages, setHomeImages] = useState({
    hero: "",
    categorias: [],
    popular: []
  });

  // Estados para los carruseles
  const [categoriesIndex, setCategoriesIndex] = useState(0);
  const [subCategoriesIndex, setSubCategoriesIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsToShow, setItemsToShow] = useState({
    categories: 2,
    subCategories: 2
  });

  // Estilos para la animación, carrusel elegante, fondos degradados y efectos de texto
  const enhancedStyles = `
    @keyframes fadeIn {
      0% { opacity: 0.4; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes textGlow {
      0%, 100% { text-shadow: 0 0 4px rgba(255,255,255,0.1); }
      50% { text-shadow: 0 0 15px rgba(255,255,255,0.5); }
    }
    
    @keyframes buttonPulse {
      0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.7); }
      70% { box-shadow: 0 0 0 10px rgba(0,0,0,0); }
      100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
    }
    
    .hero-button {
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease;
      z-index: 1;
      animation: buttonPulse 2s infinite;
    }
    
    .hero-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 7px 14px rgba(0,0,0,0.2);
    }
    
    .hero-button:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: all 0.5s;
      z-index: -1;
    }
    
    .hero-button:hover:before {
      left: 100%;
      transition: 0.7s;
    }
    
    .carousel-item {
      transition: all 0.5s ease;
    }
    
    .carousel-item:hover img {
      transform: scale(1.05);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    
    .carousel-item img {
      transition: all 0.5s ease;
    }
    
    .animate-fade {
      animation: fadeIn 0.7s ease-out forwards;
    }
    
    .carousel-container {
      padding: 40px 0;
      position: relative;
      z-index: 1;
    }
    
    .gradient-bg-1 {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .gradient-bg-2 {
      background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
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
    
    .category-title {
      font-weight: 600;
      background: linear-gradient(90deg, #333 0%, #666 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.5px;
    }
    
    .section-title {
      position: relative;
      display: inline-block;
      font-weight: 600;
      letter-spacing: 1px;
      animation: textGlow 3s ease-in-out infinite;
    }
    
    .section-title:after {
      content: '';
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -8px;
      left: 25%;
      background: linear-gradient(90deg, transparent, #333, transparent);
    }
    
    .category-name {
      transition: all 0.3s ease;
    }
    
    .carousel-item:hover .category-name {
      transform: translateY(-2px);
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `;

  useEffect(() => {
    // Cargar imágenes personalizadas
    const images = getCustomImagesForHome();
    setHomeImages(images);
    setLoading(false);
  }, []);

  // Efecto para determinar cuántos items mostrar según el tamaño de pantalla
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setItemsToShow({
          categories: 2,
          subCategories: 2
        });
      } else if (window.innerWidth >= 640) {
        setItemsToShow({
          categories: 2,
          subCategories: 2
        });
      } else {
        setItemsToShow({
          categories: 1,
          subCategories: 1
        });
      }
    }
    
    handleResize(); // Establecer valor inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay para categorías
  useEffect(() => {
    if (!homeImages.categorias || homeImages.categorias.length === 0) return;
    
    const interval = setInterval(() => {
      setCategoriesIndex(prev => 
        prev >= homeImages.categorias.length - itemsToShow.categories ? 0 : prev + 1
      );
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    }, 6000); // Cambia cada 6 segundos
    
    return () => clearInterval(interval);
  }, [categoriesIndex, homeImages.categorias, itemsToShow.categories]);

  // Autoplay para subcategorías
  useEffect(() => {
    if (!homeImages.popular || homeImages.popular.length === 0) return;
    
    const interval = setInterval(() => {
      setSubCategoriesIndex(prev => 
        prev >= homeImages.popular.length - itemsToShow.subCategories ? 0 : prev + 1
      );
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    }, 7000); // Cambia cada 7 segundos
    
    return () => clearInterval(interval);
  }, [subCategoriesIndex, homeImages.popular, itemsToShow.subCategories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <style>{enhancedStyles}</style>
      
      <div className="relative w-full h-[450px]">
        <img
          src={homeImages.hero || "/placeholder.svg"}
          alt="Era cómoda"
          className="w-full h-full object-cover"
        />
        <div className="w-full absolute inset-0 flex flex-col justify-center items-start md:px-16 text-white" 
             style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)'}}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 section-title">El Comfort</h1>
          <p className="text-lg md:text-xl mb-8">
            Consigue el máximo confort y elegancia en MyShop.
          </p>
          <button 
            className="hero-button bg-black text-white border-2 px-8 py-3 font-medium hover:bg-gray-900 transition rounded-md cursor-pointer"
            onClick={() => navigate('/catalogo')}
          >
            COMENZAR
          </button>
        </div>
      </div>

      {/* Comprar por categoría - CARRUSEL ELEGANTE */}
      <div className="py-12 px-4 mb-12 carousel-container">
        <h2 className="text-2xl font-medium mb-8 text-center">Categorías</h2>
        
        {homeImages.categorias && homeImages.categorias.length > 0 ? (
          <div className="relative max-w-5xl mx-auto">
            {/* Controles de navegación */}
            <div className="absolute inset-y-0 -left-5 md:-left-10 flex items-center z-10">
              <button 
                className="carousel-nav-button"
                onClick={() => {
                  setIsAnimating(true);
                  setCategoriesIndex(prev => prev <= 0 ? Math.max(0, homeImages.categorias.length - itemsToShow.categories) : prev - 1);
                  setTimeout(() => setIsAnimating(false), 700);
                }}
              >
                <span>←</span>
              </button>
            </div>

            <div className="absolute inset-y-0 -right-5 md:-right-10 flex items-center z-10">
              <button 
                className="carousel-nav-button"
                onClick={() => {
                  setIsAnimating(true);
                  setCategoriesIndex(prev => 
                    prev >= homeImages.categorias.length - itemsToShow.categories ? 0 : prev + 1
                  );
                  setTimeout(() => setIsAnimating(false), 10000);
                }}
              >
                <span>→</span>
              </button>
            </div>

            {/* Contenedor del carrusel */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${categoriesIndex * (100 / itemsToShow.categories)}%)`,
                  width: `${(homeImages.categorias.length / itemsToShow.categories) * 100}%`,
                }}
              >
                {homeImages.categorias.map((category, index) => (
                  <div
                    key={index}
                    className={`carousel-item flex flex-col items-center justify-center px-4 ${
                      isAnimating && index >= categoriesIndex && 
                      index < categoriesIndex + itemsToShow.categories ? 'animate-fade' : ''
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
                ))}
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.max(1, homeImages.categorias.length - itemsToShow.categories + 1) }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator transition-all ${
                    categoriesIndex === index ? "bg-black active" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setIsAnimating(true);
                    setCategoriesIndex(index);
                    setTimeout(() => setIsAnimating(false), 10000);
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

      {/* Categorías Populares - CARRUSEL ELEGANTE */}
      <div className="py-12 px-4 mb-12 bg-gr">
        <h2 className="text-2xl font-medium mb-8 text-center">Subcategorias</h2>
        
        {homeImages.subcategorias && homeImages.subcategorias.length > 0 ? (
          <div className="relative max-w-5xl mx-auto">
            {/* Controles de navegación */}
            <div className="absolute inset-y-0 -left-5 md:-left-10 flex items-center z-10">
              <button 
                className="carousel-nav-button bg-black"
                onClick={() => {
                  setIsAnimating(true);
                  setSubCategoriesIndex(prev => prev <= 0 ? Math.max(0, homeImages.subcategorias.length - itemsToShow.subCategories) : prev - 1);
                  setTimeout(() => setIsAnimating(false), 10000);
                }}
              >
                <span>←</span>
              </button>
            </div>
            <div className="absolute inset-y-0 -right-5 md:-right-10 flex items-center z-10">
              <button 
                className="carousel-nav-button"
                onClick={() => {
                  setIsAnimating(true);
                  setCategoriesIndex(prev => 
                    prev >= homeImages.categorias.length - itemsToShow.categories ? 0 : prev + 1
                  );
                  setTimeout(() => setIsAnimating(false), 10000);
                }}
              >
                <span>→</span>
              </button>
            </div>
            {/* Contenedor del carrusel */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${subCategoriesIndex * (100 / itemsToShow.subCategories)}%)`,
                  width: `${(homeImages.subcategorias.length / itemsToShow.subCategories) * 100}%`,
                }}
              >
                {homeImages.subcategorias.map((category, index) => (
                  <div
                    key={index}
                    className={`carousel-item relative px-4 ${
                      isAnimating && index >= subCategoriesIndex && 
                      index < subCategoriesIndex + itemsToShow.subCategories ? 'animate-fade' : ''
                    }`}
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
                ))}
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.max(1, homeImages.subcategorias.length - itemsToShow.subCategories + 1) }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator transition-all ${
                    subCategoriesIndex === index ? "bg-black active" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setIsAnimating(true);
                    setSubCategoriesIndex(index);
                    setTimeout(() => setIsAnimating(false), 1000);
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
  );
}