"use client"

import { useState } from "react"
import { ChevronRight, Upload, X } from "lucide-react"

export default function ActualizarProducto() {
  const [formData, setFormData] = useState({
    nombre: "Nombre",
    descripcion: "",
    categoria: "Camisa",
    marca: "Dior",
    sku: "A73A53",
    existencias: "251",
    precioRegular: "Rs. 150.40",
    precioVenta: "Rs. 450",
    etiquetas: ["Nuevo", "Oferta"],
  })

  const [imagenes, setImagenes] = useState([
    { id: 1, nombre: "Product-thumbnail.png", progreso: 100, completado: true },
    { id: 2, nombre: "Product-thumbnail.png", progreso: 100, completado: true },
    { id: 3, nombre: "Product-thumbnail.png", progreso: 100, completado: true },
    { id: 4, nombre: "Product-thumbnail.png", progreso: 100, completado: true },
  ])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleEtiquetaToggle = (etiqueta) => {
    if (formData.etiquetas.includes(etiqueta)) {
      setFormData({
        ...formData,
        etiquetas: formData.etiquetas.filter((e) => e !== etiqueta),
      })
    } else {
      setFormData({
        ...formData,
        etiquetas: [...formData.etiquetas, etiqueta],
      })
    }
  }

  const handleImagenDrop = (e) => {
    e.preventDefault()
    // Simulación de carga de imagen
    const nuevoId = imagenes.length + 1
    setImagenes([...imagenes, { id: nuevoId, nombre: "Nueva-imagen.png", progreso: 100, completado: true }])
  }

  const handleImagenEliminar = (id) => {
    setImagenes(imagenes.filter((img) => img.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el producto
    console.log("Producto actualizado:", formData)
    console.log("Imágenes:", imagenes)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-100 p-4 mb-6">
        <h1 className="text-xl font-medium mb-1">Detalles del producto</h1>
        <div className="text-xs text-gray-500 flex items-center">
          <span>Inicio</span>
          <ChevronRight className="h-3 w-3 mx-1" />
          <span>Datos del producto</span>
          <ChevronRight className="h-3 w-3 mx-1" />
          <span className="text-gray-700">Detalles del producto</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Columna izquierda - Datos del producto */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del producto
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Escribe..."
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la marca
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="existencias" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de existencias
                </label>
                <input
                  type="text"
                  id="existencias"
                  name="existencias"
                  value={formData.existencias}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label htmlFor="precioRegular" className="block text-sm font-medium text-gray-700 mb-1">
                  Precio Regular
                </label>
                <input
                  type="text"
                  id="precioRegular"
                  name="precioRegular"
                  value={formData.precioRegular}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-700 mb-1">
                  Precio de venta
                </label>
                <input
                  type="text"
                  id="precioVenta"
                  name="precioVenta"
                  value={formData.precioVenta}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Etiqueta</label>
              <div className="border border-gray-300 rounded p-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEtiquetaToggle("Nuevo")}
                    className={`px-3 py-1 rounded-full text-xs ${
                      formData.etiquetas.includes("Nuevo") ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Nuevo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEtiquetaToggle("Oferta")}
                    className={`px-3 py-1 rounded-full text-xs ${
                      formData.etiquetas.includes("Oferta") ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Oferta
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Galería de productos */}
          <div className="md:w-1/3">
            <div className="bg-gray-200 p-4 mb-6 h-40 flex items-center justify-center">
              {/* Placeholder para imagen principal */}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Galería de productos</h3>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImagenDrop}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">Drag your images here, or browse</p>
                  <p className="text-xs text-gray-400">(png, jpg are allowed)</p>
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg"
                  multiple
                />
              </div>
            </div>

            <div className="space-y-4">
              {imagenes.map((imagen) => (
                <div key={imagen.id} className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 mr-3 flex-shrink-0"></div>
                  <div className="flex-grow">
                    <div className="text-xs mb-1">{imagen.nombre}</div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${imagen.progreso}%` }}></div>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleImagenEliminar(imagen.id)} className="ml-2 text-blue-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
            ACTUALIZAR
          </button>
          <button
            type="button"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            ELIMINAR
          </button>
          <button
            type="button"
            className="bg-white text-black border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  )
}
