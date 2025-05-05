import { useState } from "react"
import { CheckCheck, ChevronRight, ImageIcon, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { uploadFileToFirebase } from "../../services/storage-service"
import productService from "../../services/productos-service"

const colors = [
  { color: "Negro", codigohx: "#000000" },
  { color: "Azul", codigohx: "#2563EB" },
  { color: "Café", codigohx: "#78350F" },
  { color: "Verde", codigohx: "#047857" },
  { color: "Púrpura", codigohx: "#6B21A8" },
  { color: "Naranja", codigohx: "#F97316" },
  { color: "Rosa", codigohx: "#F9A8D4" },
  { color: "Rojo", codigohx: "#DC2626" },
  { color: "Beige", codigohx: "#F5F5DC" },
]

export default function Insertar({ initialData }) {
  const isEdit = initialData && initialData?.id
  const navigate = useNavigate()
  const editProduct = null

  // Estados
  const [product, setProduct] = useState(
    initialData
      ? initialData
      : {
          category: "",
          colors: [],
          description: "",
          details: ["", "", ""],
          images: [],
          brand: "",
          name: "",
          package_price: 0,
          price: 0,
          provider: "",
          sku: "",
          subcategory: "",
          tags: [],
          units_package: 0,
          stock: 0,
        }
  )
  const [newTag, setNewTag] = useState("")
  const [newDetail, setNewDetail] = useState("")
  const [images, setImages] = useState([])
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Manejadores de eventos
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value,
    })
    if (name === "name" || name === "sku") {
      setError("")
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setProduct({
        ...product,
        tags: [...product.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setProduct({
      ...product,
      tags: product.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleAddDetail = () => {
    if (product.details.length >= 3) {
      alert("No puedes añadir más de 5 details")
      return
    }

    if (newTag.trim() !== "") {
      setProduct({
        ...product,
        details: [...product.details, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveDetail = (detailToRemove) => {
    setProduct({
      ...product,
      details: product.details.filter((detail) => detail !== detailToRemove),
    })
  }

  const handleKeyDownDetail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddDetail()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const checkForDuplicates = async () => {
    try {
      if (product.name.trim() === "") {
        setError("El nombre del producto es obligatorio")
        return true
      }

      const nameExists = await productService.checkNameExists(product.name)
      let skuExists = false
      
      if (product.sku && product.sku.trim() !== "") {
        skuExists = await productService.checkSkuExists(product.sku)
      }

      if (isEdit) {
        if (nameExists && nameExists !== initialData.id) {
          setError("Ya existe un producto con este nombre")
          return true
        }
        if (skuExists && skuExists !== initialData.id) {
          setError("Ya existe un producto con este código")
          return true
        }
      } else {
        if (nameExists) {
          setError("Ya existe un producto con este nombre")
          return true
        }
        if (skuExists) {
          setError("Ya existe un producto con este código")
          return true
        }
      }

      return false
    } catch (error) {
      console.error("Error al verificar duplicados:", error)
      setError("Error al verificar duplicados. Intente nuevamente.")
      return true
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const hasDuplicates = await checkForDuplicates()
      if (hasDuplicates) {
        setIsSubmitting(false)
        return
      }

      if (initialData) {
        await productService.update(product)
      } else {
        await productService.create(product)
      }

      navigate("/admin/productos")
    } catch (error) {
      console.error("Error al guardar el producto:", error)
      setError("Error al guardar el producto. Intente nuevamente.")
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = async (e) => {
    if (product.images.length >= 4) {
      alert("No puedes añadir más de 4 images")
      return
    }

    const files = Array.from(e.target.files)
    for (const file of files) {
      try {
        const url = await uploadFileToFirebase(file, `productos/${file.name}`)
        setImages((prevImages) => [...prevImages, { name: file.name, url }])
        setProduct((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, url],
        }))
      } catch (error) {
        console.error("Error al subir el archivo:", error)
      }
    }
  }

  return (
    <div className="mx-10 bg-gray-100 min-h-screen p-6">
      <h2 className="text-xl font-medium mb-2">{editProduct ? "EDITAR PRODUCTO" : "AÑADIR NUEVO PRODUCTO"}</h2>
      <p className="flex text-sm text-gray-600 mb-6 ">
        Inicio <ChevronRight size={16} className="mx-2 my-0.5" /> Productos{" "}
        <ChevronRight size={16} className="mx-2 my-0.5" /> {editProduct ? "Editar producto" : "Añadir nuevo producto"}
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-3 gap-8" onSubmit={handleSave}>
        {/* Columna izquierda - Campos del formulario */}
        <div className="md:col-span-2 space-y-6">
          {/* Nombre del Producto */}
          <div>
            <label className="block text-sm font-medium mb-2">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Escriba el name aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Escriba descripción aquí"
              rows="5"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            ></textarea>
          </div>

          {/* Detalles */}
          <div>
            <label className="block text-sm font-medium mb-2">Dimensiones</label>
            <input
              type="text"
              value={product.details[0] || ""}
              onChange={(e) => {
                const newDetalles = [...product.details]
                newDetalles[0] = e.target.value
                setProduct({ ...product, details: newDetalles })
              }}
              placeholder="Ejemplo: 10x20x30 cm"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Envío</label>
            <div className="relative">
              <select
                value={product.details[1] || ""}
                onChange={(e) => {
                  const newDetalles = [...product.details]
                  newDetalles[1] = e.target.value
                  setProduct({ ...product, details: newDetalles })
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none appearance-none"
              >
                <option value="">Seleccione tipo de envío</option>
                <option value="Envío estándar">Envío estándar</option>
                <option value="Envío express">Envío express</option>
                <option value="Recogida en tienda">Recogida en tienda</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tiempo de Devolución</label>
            <input
              type="text"
              value={product.details[2] || ""}
              onChange={(e) => {
                const newDetalles = [...product.details]
                newDetalles[2] = e.target.value
                setProduct({ ...product, details: newDetalles })
              }}
              placeholder="Ejemplo: 30 días"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Categoría y Subcategoría */}
          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none text-sm font-extralight"
            >
              <option value="" disabled>Seleccione una categoría</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño">Niño</option>
              <option value="Niña">Niña</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subcategoría</label>
            <select
              name="subcategory"
              value={product.subcategory}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none text-sm font-extralight"
            >
              <option value="" disabled>Seleccione una subcategoría</option>
              <option value="electronics">Blusa</option>
              <option value="Pantalon">Pantalon</option>
              <option value="home">Chaquetas</option>
              <option value="camisa">Camisa</option>
              <option value="conjunto">Conjunto</option>
              <option value="saco">Saco</option>
              <option value="camiseta">Camiseta</option>
            </select>
          </div>

          {/* Marca y Proveedor */}
          <div>
            <label className="block text-sm font-medium mb-2">Marca</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              placeholder="Escriba el name de la brand aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Proveedor</label>
            <input
              type="text"
              name="provider"
              value={product.provider}
              onChange={handleInputChange}
              placeholder="Escriba el name del provider aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Código, Unidades y Paquetes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Código (opcional)</label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleInputChange}
                placeholder="Fox-3983"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unidades</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                placeholder="1258"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unidades Por Paq.</label>
              <input
                type="number"
                name="units_package"
                value={product.units_package}
                onChange={handleInputChange}
                placeholder="1258"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Precios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Precio por Unidad</label>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Bs. 1000"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Precio por Paquete</label>
              <input
                type="text"
                name="package_price"
                value={product.package_price}
                onChange={handleInputChange}
                placeholder="Bs. 450"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Colores */}
          <div>
            <label className="block text-sm font-medium mb-2">Colores</label>
            <div className="flex flex-wrap gap-2 p-2 border-gray-300 min-h-16">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex flex-col items-center"
                  onClick={() => {
                    const isChecked = product.colors.some((c) => c.color === color.color)
                    if (isChecked) {
                      setProduct({
                        ...product,
                        colors: product.colors.filter((c) => c.color !== color.color),
                      })
                    } else {
                      setProduct({
                        ...product,
                        colors: [...product.colors, color],
                      })
                    }
                  }}
                >
                  <span
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full mb-1 border-[3px] ${
                      product.colors.some((c) => c.color === color.color) ? "border-blue-800" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.codigohx }}
                  ></span>
                  <span className="text-xs">{color.color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tallas */}
          <div>
            <label className="block text-sm font-medium mb-2">Tallas</label>
            <div className="flex flex-wrap gap-2 p-2 border-gray-300 min-h-16">
              {product.tags.map((tag, index) => (
                <span key={index} className="bg-black text-white px-3 py-1 rounded-sm text-sm flex items-center">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-2 focus:outline-none">
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Añadir etiqueta"
                className="flex-grow outline-none px-2 py-1 min-w-20"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha - Imágenes */}
        <div>
          {/* Área de carga de imágenes */}
          <div className="bg-gray-200 rounded-lg p-6 text-center flex flex-col items-center justify-center h-52 mb-6 relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <ImageIcon className="w-12 h-12 text-blue-800 mb-2" />
            <p className="text-gray-600">Suelta tu imagen aquí o haz click</p>
            <p className="text-gray-500 text-sm">Formatos: jpeg, png</p>
          </div>

          {/* Galería de productos */}
          <div>
            <h3 className="text-sm font-medium mb-4">Galería de productos</h3>
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="flex items-center relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <p className="text-sm">{image.name}</p>
                    <div className="h-1 bg-blue-800 w-1/3 rounded-full mt-1"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-white">
                      <CheckCheck className="w-3 h-3" />
                    </div>
                    <button
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index))
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          images: prevProduct.images.filter((_, i) => i !== index),
                        }))
                      }}
                      className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {initialData &&
                product.images.map((image, index) => (
                  <div key={index} className="flex items-center relative">
                    <img src={image || "/placeholder.svg"} alt={image} className="w-12 h-12 object-cover rounded-md" />
                    <div className="ml-4 flex-grow">
                      <p className="text-sm">Imagen {index + 1}</p>
                      <div className="h-1 bg-blue-800 w-1/3 rounded-full mt-1"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-white">
                        <CheckCheck className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-6 flex space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/productos")}
              className="border border-black px-6 py-2 rounded w-full"
            >
              CANCELAR
            </button>
          </div>
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-black text-white px-6 py-2 rounded w-full ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "GUARDANDO..." : isEdit ? "ACTUALIZAR" : "CREAR"}
        </button>
      </form>
    </div>
  )
}