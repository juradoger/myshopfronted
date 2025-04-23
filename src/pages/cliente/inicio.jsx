import { useState, useEffect } from "react";
import { getCustomImagesForHome } from "../../services/api";

export default function Inicio() {
  const [loading, setLoading] = useState(true);
  const [homeImages, setHomeImages] = useState({
    hero: "",
    categories: [],
    popular: []
  });

  useEffect(() => {
    // Cargar imágenes personalizadas
    const images = getCustomImagesForHome();
    setHomeImages(images);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[450px]">
        <img
          src={homeImages.hero || "/placeholder.svg"}
          alt="Era cómoda"
          className="w-full h-full object-cover"
        />
        <div className="w-full absolute inset-0 flex flex-col justify-center items-start md:px-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Era cómoda</h1>
          <p className="text-lg md:text-xl mb-6">
            Consigue el máximo confort y elegancia con los nuevos básicos de invierno.
          </p>
          <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition">
            COMPRAR AHORA
          </button>
        </div>
      </div>

      {/* Comprar por categoría */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-medium text-center mb-8">Comprar por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeImages.categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías Populares */}
      <div className="container mx-auto py-8 px-4 mb-12">
        <h2 className="text-xl font-medium mb-6">Categorías Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {homeImages.popular.map((category, index) => (
            <div key={index} className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 text-center">
                <span className="text-sm">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}