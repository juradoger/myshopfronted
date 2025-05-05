import { HeartIcon } from "lucide-react"
import { useState, useRef, useEffect } from "react"

// Componente principal
const ChatBubble = () => {
  const [chatVisible, setChatVisible] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [currentStep, setCurrentStep] = useState("nombre")
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [conversationContext, setConversationContext] = useState({
    lastTopic: null,
    preferences: {},
    entities: {},
    history: [],
    productQuery: {
      category: null,
      color: null,
      size: null,
      material: null,
      gender: null,
      price: null,
    },
  })
  const messagesEndRef = useRef(null)

  // Catálogo de productos (simulado)
  const productCatalog = {
    camisas: {
      hombre: {
        colores: ["blanco", "negro", "azul", "gris", "rojo"],
        tallas: ["XS", "S", "M", "L", "XL", "XXL"],
        materiales: ["algodón", "lino", "poliéster", "seda"],
        precios: { min: 25, max: 60 },
      },
      mujer: {
        colores: ["blanco", "negro", "azul", "rosa", "rojo", "verde"],
        tallas: ["XS", "S", "M", "L", "XL"],
        materiales: ["algodón", "lino", "poliéster", "seda", "viscosa"],
        precios: { min: 25, max: 65 },
      },
      ninos: {
        colores: ["blanco", "azul", "rojo", "verde", "amarillo"],
        tallas: ["2-3", "4-5", "6-7", "8-9", "10-11"],
        materiales: ["algodón", "poliéster"],
        precios: { min: 15, max: 30 },
      },
    },
    pantalones: {
      hombre: {
        colores: ["negro", "azul", "gris", "beige", "marrón"],
        tallas: ["28", "30", "32", "34", "36", "38", "40", "42"],
        materiales: ["algodón", "denim", "lino", "poliéster"],
        precios: { min: 35, max: 80 },
      },
      mujer: {
        colores: ["negro", "azul", "gris", "beige", "blanco", "rojo"],
        tallas: ["34", "36", "38", "40", "42", "44"],
        materiales: ["algodón", "denim", "lino", "poliéster", "elastano"],
        precios: { min: 30, max: 75 },
      },
      ninos: {
        colores: ["azul", "negro", "gris", "beige"],
        tallas: ["2-3", "4-5", "6-7", "8-9", "10-11"],
        materiales: ["algodón", "denim", "poliéster", "elastano"],
        precios: { min: 20, max: 40 },
      },
    },
    vestidos: {
      mujer: {
        colores: ["negro", "azul", "rojo", "verde", "blanco", "rosa", "morado"],
        tallas: ["XS", "S", "M", "L", "XL"],
        materiales: ["algodón", "seda", "lino", "poliéster", "viscosa", "satén"],
        precios: { min: 40, max: 120 },
      },
      ninos: {
        colores: ["rosa", "azul", "blanco", "rojo", "amarillo", "verde"],
        tallas: ["2-3", "4-5", "6-7", "8-9", "10-11"],
        materiales: ["algodón", "poliéster"],
        precios: { min: 25, max: 50 },
      },
    },
    abrigos: {
      hombre: {
        colores: ["negro", "azul", "gris", "marrón", "verde"],
        tallas: ["S", "M", "L", "XL", "XXL"],
        materiales: ["lana", "poliéster", "algodón", "cuero"],
        precios: { min: 80, max: 200 },
      },
      mujer: {
        colores: ["negro", "azul", "gris", "marrón", "rojo", "beige"],
        tallas: ["XS", "S", "M", "L", "XL"],
        materiales: ["lana", "poliéster", "algodón", "cuero", "sintético"],
        precios: { min: 75, max: 220 },
      },
      ninos: {
        colores: ["azul", "rojo", "verde", "gris", "negro"],
        tallas: ["2-3", "4-5", "6-7", "8-9", "10-11"],
        materiales: ["poliéster", "algodón", "sintético"],
        precios: { min: 40, max: 90 },
      },
    },
    calzado: {
      hombre: {
        colores: ["negro", "marrón", "azul", "gris"],
        tallas: ["39", "40", "41", "42", "43", "44", "45", "46"],
        materiales: ["cuero", "sintético", "tela", "lona"],
        precios: { min: 50, max: 150 },
      },
      mujer: {
        colores: ["negro", "marrón", "azul", "rojo", "beige", "blanco"],
        tallas: ["35", "36", "37", "38", "39", "40", "41"],
        materiales: ["cuero", "sintético", "tela", "lona"],
        precios: { min: 45, max: 160 },
      },
      ninos: {
        colores: ["azul", "rojo", "negro", "blanco", "multicolor"],
        tallas: ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"],
        materiales: ["sintético", "tela", "lona"],
        precios: { min: 30, max: 70 },
      },
    },
  }

  // Datos para las respuestas del chatbot - versión concisa y elegante
  const chatbotData = {
    nombre: {
      message: "Hola. Soy tu asistente de moda. ¿Cómo te llamas?",
    },
    bienvenida_personalizada: {
      message: (name) => `Un placer, ${name}. ¿En qué puedo ayudarte?`,
      options: [
        { value: "productos", label: "Colecciones" },
        { value: "tallas", label: "Tallas" },
        { value: "contacto", label: "Contacto" },
      ],
    },
    productos: {
      message: "¿Qué colección te interesa?",
      options: [
        { value: "hombre", label: "Hombre" },
        { value: "mujer", label: "Mujer" },
        { value: "ninos", label: "Niños" },
        { value: "unisex", label: "Unisex" },
      ],
    },
    tallas: {
      message: "¿Para qué línea necesitas información de tallas?",
      options: [
        { value: "tallas_hombre", label: "Hombre" },
        { value: "tallas_mujer", label: "Mujer" },
        { value: "tallas_ninos", label: "Niños" },
      ],
    },
    tallas_hombre: {
      message: "Tallas para hombre:\n\n• XS: 44-46\n• S: 46-48\n• M: 48-50\n• L: 50-52\n• XL: 52-54",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    tallas_mujer: {
      message: "Tallas para mujer:\n\n• XS: 34-36\n• S: 36-38\n• M: 38-40\n• L: 40-42\n• XL: 42-44",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    tallas_ninos: {
      message:
        "Tallas para niños:\n\n• 2-3 años: 98 cm\n• 4-5 años: 110 cm\n• 6-7 años: 122 cm\n• 8-9 años: 134 cm\n• 10-11 años: 146 cm",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    ninos: {
      message:
        "En nuestra colección infantil encontrarás:\n\n• Ropa casual\n• Ropa deportiva\n• Uniformes escolares\n• Ropa de fiesta",
      options: [
        { value: "tallas_ninos", label: "Ver tallas" },
        { value: "finalizar", label: "Gracias" },
      ],
    },
    hombre: {
      message: "En nuestra colección para hombre tenemos:\n\n• Camisas\n• Pantalones\n• Trajes\n• Accesorios",
      options: [
        { value: "tallas_hombre", label: "Ver tallas" },
        { value: "finalizar", label: "Gracias" },
      ],
    },
    mujer: {
      message: "En nuestra colección para mujer tenemos:\n\n• Blusas\n• Vestidos\n• Pantalones\n• Accesorios",
      options: [
        { value: "tallas_mujer", label: "Ver tallas" },
        { value: "finalizar", label: "Gracias" },
      ],
    },
    contacto: {
      message: "Estamos disponibles:\n\n• Email: moda@ejemplo.com\n• Tel: +34 91 000 00 00\n• Tiendas: L-S 10:00-20:00",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    finalizar: {
      message: (name) => `¿Algo más en que pueda ayudarte, ${name}?`,
      options: [
        { value: "bienvenida_personalizada", label: "Sí" },
        { value: "despedida", label: "No, gracias" },
      ],
    },
    despedida: {
      message: (name) => `Ha sido un placer, ${name}. Hasta pronto.`,
      end: true,
    },
    devoluciones: {
      message:
        "Nuestra política de devoluciones:\n\n• 30 días para devolver\n• Producto sin usar\n• Con etiquetas y embalaje original",
      options: [{ value: "finalizar", label: "Entendido" }],
    },
    envios: {
      message: "Opciones de envío:\n\n• Estándar: 3-5 días (3,95€)\n• Express: 24h (7,95€)\n• Gratis en compras +50€",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    materiales: {
      message:
        "Nuestras prendas utilizan:\n\n• Algodón orgánico\n• Lino sostenible\n• Materiales reciclados\n• Tintes ecológicos",
      options: [{ value: "finalizar", label: "Interesante" }],
    },
    cuidados: {
      message:
        "Recomendaciones de cuidado:\n\n• Lavar a baja temperatura\n• Evitar secadora\n• Planchar a temperatura media\n• Guardar colgadas",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    precios: {
      message: "Nuestros rangos de precios:\n\n• Básicos: 15-30€\n• Premium: 30-60€\n• Colección exclusiva: 60-120€",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    descuentos: {
      message:
        "Promociones actuales:\n\n• 20% en segunda prenda\n• 10% al suscribirte a newsletter\n• Envío gratis +50€",
      options: [{ value: "finalizar", label: "Genial" }],
    },
    tiendas: {
      message: "Nuestras tiendas:\n\n• Madrid: C/Serrano 25\n• Barcelona: Pg. de Gràcia 43\n• Valencia: C/Colón 12",
      options: [{ value: "finalizar", label: "Gracias" }],
    },
    sostenibilidad: {
      message:
        "Compromiso sostenible:\n\n• Materiales orgánicos\n• Producción local\n• Embalaje reciclable\n• Comercio justo",
      options: [{ value: "finalizar", label: "Interesante" }],
    },
  }

  // Mapeo de entidades por categoría
  const entities = {
    // Categorías de productos
    categorias: [
      "camisa",
      "camisas",
      "pantalón",
      "pantalones",
      "vestido",
      "vestidos",
      "falda",
      "faldas",
      "traje",
      "trajes",
      "abrigo",
      "abrigos",
      "chaqueta",
      "chaquetas",
      "jersey",
      "jerséis",
      "sudadera",
      "sudaderas",
      "camiseta",
      "camisetas",
      "polo",
      "polos",
      "vaquero",
      "vaqueros",
      "jeans",
      "calzado",
      "zapatos",
      "zapatillas",
      "botas",
      "sandalias",
      "accesorios",
      "bolso",
      "bolsos",
      "cinturón",
      "cinturones",
      "bufanda",
      "bufandas",
      "gorro",
      "gorros",
      "gafas",
      "reloj",
      "relojes",
      "joya",
      "joyas",
      "pulsera",
      "pulseras",
      "collar",
      "collares",
      "anillo",
      "anillos",
      "pendiente",
      "pendientes",
    ],
    // Colores
    colores: [
      "negro",
      "blanco",
      "azul",
      "rojo",
      "verde",
      "amarillo",
      "naranja",
      "morado",
      "rosa",
      "gris",
      "marrón",
      "beige",
      "dorado",
      "plateado",
      "turquesa",
      "violeta",
      "fucsia",
      "burdeos",
      "marino",
      "celeste",
      "caqui",
      "coral",
      "crema",
      "ocre",
    ],
    // Materiales
    materiales: [
      "algodón",
      "lino",
      "seda",
      "lana",
      "cuero",
      "piel",
      "sintético",
      "poliéster",
      "nylon",
      "viscosa",
      "denim",
      "vaquero",
      "terciopelo",
      "satén",
      "encaje",
      "tejido",
      "tela",
      "elastano",
      "licra",
      "cashmere",
      "ante",
      "gamuza",
      "tweed",
      "franela",
      "punto",
    ],
    // Tallas
    tallas: [
      "xs",
      "s",
      "m",
      "l",
      "xl",
      "xxl",
      "xxxl",
      "pequeña",
      "mediana",
      "grande",
      "extra grande",
      "talla",
      "tamaño",
      "medida",
      "34",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
      "48",
      "50",
      "52",
      "54",
      "28",
      "30",
      "32",
      "2",
      "4",
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
    ],
    // Personas/Género
    personas: [
      "hombre",
      "mujer",
      "niño",
      "niña",
      "bebé",
      "adulto",
      "joven",
      "adolescente",
      "infantil",
      "unisex",
      "masculino",
      "femenino",
      "caballero",
      "dama",
      "señor",
      "señora",
    ],
    // Precios
    precios: [
      "precio",
      "coste",
      "costo",
      "valor",
      "euros",
      "€",
      "barato",
      "económico",
      "caro",
      "premium",
      "lujo",
      "oferta",
      "rebajado",
      "descuento",
    ],
    // Tiempos
    tiempos: [
      "hoy",
      "mañana",
      "semana",
      "mes",
      "temporada",
      "verano",
      "invierno",
      "primavera",
      "otoño",
      "navidad",
      "rebajas",
      "black friday",
    ],
  }

  // Mapeo de categorías normalizadas
  const categoryMapping = {
    camisa: "camisas",
    camisas: "camisas",
    blusa: "camisas",
    blusas: "camisas",
    pantalón: "pantalones",
    pantalones: "pantalones",
    vaquero: "pantalones",
    vaqueros: "pantalones",
    jeans: "pantalones",
    vestido: "vestidos",
    vestidos: "vestidos",
    falda: "faldas",
    faldas: "faldas",
    abrigo: "abrigos",
    abrigos: "abrigos",
    chaqueta: "abrigos",
    chaquetas: "abrigos",
    jersey: "camisas",
    jerséis: "camisas",
    sudadera: "camisas",
    sudaderas: "camisas",
    camiseta: "camisas",
    camisetas: "camisas",
    polo: "camisas",
    polos: "camisas",
    zapato: "calzado",
    zapatos: "calzado",
    zapatilla: "calzado",
    zapatillas: "calzado",
    bota: "calzado",
    botas: "calzado",
    sandalia: "calzado",
    sandalias: "calzado",
    calzado: "calzado",
  }

  // Mapeo de géneros normalizados
  const genderMapping = {
    hombre: "hombre",
    mujer: "mujer",
    niño: "ninos",
    niña: "ninos",
    niños: "ninos",
    niñas: "ninos",
    infantil: "ninos",
    bebé: "ninos",
    bebés: "ninos",
    masculino: "hombre",
    femenino: "mujer",
    caballero: "hombre",
    dama: "mujer",
    señor: "hombre",
    señora: "mujer",
    unisex: "unisex",
  }

  // Mapeo de tallas normalizadas
  const sizeMapping = {
    xs: "XS",
    s: "S",
    m: "M",
    l: "L",
    xl: "XL",
    xxl: "XXL",
    xxxl: "XXXL",
    pequeña: "S",
    mediana: "M",
    grande: "L",
    "extra grande": "XL",
  }

  // Intenciones y sus palabras clave
  const intents = {
    consulta_tallas: {
      keywords: [
        "talla",
        "tallas",
        "medida",
        "medidas",
        "tamaño",
        "tamaños",
        "size",
        "sizes",
        "cuánto mide",
        "qué talla",
      ],
      entities: ["tallas", "personas"],
    },
    consulta_productos: {
      keywords: [
        "producto",
        "productos",
        "colección",
        "colecciones",
        "ropa",
        "prendas",
        "catálogo",
        "tienen",
        "hay",
        "venden",
      ],
      entities: ["categorias", "personas"],
    },
    consulta_devoluciones: {
      keywords: ["devolver", "devolución", "devoluciones", "cambio", "cambios", "reembolso", "política", "garantía"],
    },
    consulta_envios: {
      keywords: [
        "envío",
        "envíos",
        "entrega",
        "entregas",
        "shipping",
        "enviar",
        "mandar",
        "recibir",
        "cuánto tarda",
        "cuándo llega",
      ],
    },
    consulta_materiales: {
      keywords: [
        "material",
        "materiales",
        "tela",
        "telas",
        "tejido",
        "tejidos",
        "composición",
        "algodón",
        "lino",
        "poliéster",
        "de qué está hecho",
      ],
      entities: ["materiales"],
    },
    consulta_cuidados: {
      keywords: [
        "cuidado",
        "cuidados",
        "lavar",
        "lavado",
        "planchar",
        "secar",
        "limpieza",
        "mantenimiento",
        "cómo lavar",
        "cómo cuidar",
      ],
    },
    consulta_contacto: {
      keywords: [
        "contacto",
        "contactar",
        "teléfono",
        "email",
        "correo",
        "tienda",
        "tiendas",
        "ubicación",
        "dirección",
        "dónde están",
      ],
    },
    consulta_precios: {
      keywords: [
        "precio",
        "precios",
        "coste",
        "costo",
        "valor",
        "cuánto cuesta",
        "cuánto vale",
        "económico",
        "barato",
        "caro",
        "oferta",
        "descuento",
      ],
      entities: ["precios", "categorias"],
    },
    consulta_descuentos: {
      keywords: [
        "descuento",
        "descuentos",
        "oferta",
        "ofertas",
        "promoción",
        "promociones",
        "rebaja",
        "rebajas",
        "sale",
        "outlet",
      ],
    },
    consulta_tiendas: {
      keywords: [
        "tienda",
        "tiendas",
        "local",
        "locales",
        "físico",
        "físicos",
        "ubicación",
        "ubicaciones",
        "dirección",
        "direcciones",
        "dónde están",
      ],
    },
    consulta_sostenibilidad: {
      keywords: [
        "sostenible",
        "sostenibilidad",
        "ecológico",
        "ecología",
        "orgánico",
        "natural",
        "medio ambiente",
        "reciclado",
        "reciclable",
      ],
    },
    saludo: {
      keywords: ["hola", "buenos días", "buenas tardes", "buenas noches", "saludos", "hey"],
    },
    despedida: {
      keywords: ["adiós", "hasta luego", "chao", "bye", "nos vemos", "hasta pronto"],
    },
    agradecimiento: {
      keywords: ["gracias", "te lo agradezco", "muchas gracias", "thank you", "genial", "perfecto", "excelente"],
    },
    consulta_producto_especifico: {
      keywords: ["busco", "quiero", "necesito", "me interesa", "me gustaría", "estoy buscando", "tienen", "hay"],
      entities: ["categorias", "colores", "tallas", "materiales", "personas"],
    },
  }

  // Función para extraer entidades del texto
  const extractEntities = (text) => {
    const lowerText = text.toLowerCase()
    const foundEntities = {
      categorias: [],
      colores: [],
      tallas: [],
      materiales: [],
      personas: [],
      precios: [],
      tiempos: [],
    }

    // Buscar entidades en el texto
    for (const [category, entityList] of Object.entries(entities)) {
      for (const entity of entityList) {
        // Buscar la entidad como palabra completa o parte de una palabra
        const regex = new RegExp(`\\b${entity}\\b|\\b${entity}s\\b|\\b${entity}es\\b`, "i")
        if (regex.test(lowerText)) {
          foundEntities[category].push(entity)
        }
      }
    }

    return foundEntities
  }

  // Función para normalizar las entidades encontradas
  const normalizeEntities = (extractedEntities) => {
    const normalized = {
      category: null,
      color: null,
      size: null,
      material: null,
      gender: null,
      price: null,
    }

    // Normalizar categoría
    if (extractedEntities.categorias.length > 0) {
      const category = extractedEntities.categorias[0]
      normalized.category = categoryMapping[category] || category
    }

    // Normalizar color
    if (extractedEntities.colores.length > 0) {
      normalized.color = extractedEntities.colores[0]
    }

    // Normalizar talla
    if (extractedEntities.tallas.length > 0) {
      const size = extractedEntities.tallas[0]
      normalized.size = sizeMapping[size] || size
    }

    // Normalizar material
    if (extractedEntities.materiales.length > 0) {
      normalized.material = extractedEntities.materiales[0]
    }

    // Normalizar género
    if (extractedEntities.personas.length > 0) {
      const gender = extractedEntities.personas[0]
      normalized.gender = genderMapping[gender] || gender
    }

    return normalized
  }

  // Función para detectar la intención del usuario
  const detectIntent = (text, extractedEntities) => {
    const lowerText = text.toLowerCase()
    let highestScore = 0
    let detectedIntent = null

    // Calcular puntuación para cada intención
    for (const [intent, data] of Object.entries(intents)) {
      let score = 0

      // Puntos por palabras clave
      for (const keyword of data.keywords) {
        if (lowerText.includes(keyword)) {
          score += 1
        }
      }

      // Puntos adicionales por entidades relevantes
      if (data.entities) {
        for (const category of data.entities) {
          if (extractedEntities[category] && extractedEntities[category].length > 0) {
            score += 0.5
          }
        }
      }

      // Puntos por contexto de conversación
      if (conversationContext.lastTopic && conversationContext.lastTopic === intent) {
        score += 0.5
      }

      // Actualizar la intención detectada si la puntuación es mayor
      if (score > highestScore) {
        highestScore = score
        detectedIntent = intent
      }
    }

    // Si no se detecta ninguna intención o la puntuación es muy baja
    if (highestScore < 0.5) {
      return null
    }

    return detectedIntent
  }

  // Función para verificar disponibilidad de productos
  const checkProductAvailability = (query) => {
    const { category, color, size, material, gender } = query

    // Si no tenemos categoría o género, no podemos verificar disponibilidad
    if (!category || !gender) {
      return null
    }

    // Verificar si la categoría existe en el catálogo
    if (!productCatalog[category] || !productCatalog[category][gender]) {
      return {
        available: false,
        message: `Lo siento, no tenemos ${category} para ${gender === "ninos" ? "niños" : gender}.`,
      }
    }

    const productInfo = productCatalog[category][gender]
    const unavailableAttributes = []

    // Verificar color
    if (color && !productInfo.colores.includes(color)) {
      unavailableAttributes.push(`color ${color}`)
    }

    // Verificar talla
    if (size && !productInfo.tallas.includes(size)) {
      unavailableAttributes.push(`talla ${size}`)
    }

    // Verificar material
    if (material && !productInfo.materiales.includes(material)) {
      unavailableAttributes.push(`material ${material}`)
    }

    // Si hay atributos no disponibles
    if (unavailableAttributes.length > 0) {
      return {
        available: false,
        message: `Lo siento, no tenemos ${category} para ${gender === "ninos" ? "niños" : gender} en ${unavailableAttributes.join(" y ")}.`,
      }
    }

    // Si todo está disponible
    return {
      available: true,
      message: `¡Buenas noticias! Tenemos ${category} para ${gender === "ninos" ? "niños" : gender
        } ${color ? `en color ${color}` : ""} ${size ? `en talla ${size}` : ""} ${material ? `de ${material}` : ""
        }. El precio está entre ${productInfo.precios.min}€ y ${productInfo.precios.max}€.`,
      productInfo,
    }
  }

  // Función para generar respuesta para consulta de producto específico
  const generateProductResponse = (query) => {
    const availability = checkProductAvailability(query)

    if (!availability) {
      return {
        text: `${userName}, necesito más información para ayudarte. ¿Qué tipo de prenda buscas y para quién?`,
        step: "bienvenida_personalizada",
      }
    }

    if (!availability.available) {
      return {
        text: availability.message,
        step: "bienvenida_personalizada",
      }
    }

    return {
      text: availability.message,
      step: "finalizar",
    }
  }

  // Función para analizar el texto y generar una respuesta inteligente
  const analyzeText = (text) => {
    // Extraer entidades
    const extractedEntities = extractEntities(text)

    // Normalizar entidades
    const normalizedEntities = normalizeEntities(extractedEntities)

    // Actualizar consulta de producto en el contexto
    const updatedProductQuery = {
      ...conversationContext.productQuery,
      ...normalizedEntities,
    }

    // Actualizar contexto de conversación
    setConversationContext((prev) => ({
      ...prev,
      productQuery: updatedProductQuery,
      entities: {
        ...prev.entities,
        ...extractedEntities,
      },
      history: [...prev.history, { text, entities: extractedEntities }],
    }))

    // Detectar intención
    const intent = detectIntent(text, extractedEntities)

    // Si es una consulta de producto específico
    if (
      intent === "consulta_producto_especifico" ||
      (normalizedEntities.category &&
        (normalizedEntities.color || normalizedEntities.size || normalizedEntities.gender))
    ) {
      return generateProductResponse(updatedProductQuery)
    }

    // Respuestas basadas en intenciones específicas
    switch (intent) {
      case "consulta_tallas":
        if (normalizedEntities.gender === "hombre") {
          return { text: chatbotData.tallas_hombre.message, step: "tallas_hombre" }
        } else if (normalizedEntities.gender === "mujer") {
          return { text: chatbotData.tallas_mujer.message, step: "tallas_mujer" }
        } else if (normalizedEntities.gender === "ninos") {
          return { text: chatbotData.tallas_ninos.message, step: "tallas_ninos" }
        } else {
          return { text: chatbotData.tallas.message, step: "tallas" }
        }

      case "consulta_productos":
        if (normalizedEntities.gender === "hombre") {
          return { text: chatbotData.hombre.message, step: "hombre" }
        } else if (normalizedEntities.gender === "mujer") {
          return { text: chatbotData.mujer.message, step: "mujer" }
        } else if (normalizedEntities.gender === "ninos") {
          return { text: chatbotData.ninos.message, step: "ninos" }
        } else {
          return { text: chatbotData.productos.message, step: "productos" }
        }

      case "consulta_devoluciones":
        return { text: chatbotData.devoluciones.message, step: "devoluciones" }

      case "consulta_envios":
        return { text: chatbotData.envios.message, step: "envios" }

      case "consulta_materiales":
        return { text: chatbotData.materiales.message, step: "materiales" }

      case "consulta_cuidados":
        return { text: chatbotData.cuidados.message, step: "cuidados" }

      case "consulta_contacto":
        return { text: chatbotData.contacto.message, step: "contacto" }

      case "consulta_precios":
        return { text: chatbotData.precios.message, step: "precios" }

      case "consulta_descuentos":
        return { text: chatbotData.descuentos.message, step: "descuentos" }

      case "consulta_tiendas":
        return { text: chatbotData.tiendas.message, step: "tiendas" }

      case "consulta_sostenibilidad":
        return { text: chatbotData.sostenibilidad.message, step: "sostenibilidad" }

      case "saludo":
        return {
          text: userName ? `Hola de nuevo, ${userName}. ¿En qué puedo ayudarte?` : "Hola. ¿En qué puedo ayudarte?",
          step: userName ? "bienvenida_personalizada" : "nombre",
        }

      case "despedida":
        return { text: `Hasta pronto, ${userName}. Ha sido un placer atenderte.`, step: "despedida" }

      case "agradecimiento":
        return { text: `De nada, ${userName}. ¿Puedo ayudarte con algo más?`, step: "finalizar" }

      default:
        // Si hay suficientes entidades para inferir una consulta de producto
        if (
          (normalizedEntities.category && normalizedEntities.gender) ||
          (extractedEntities.categorias.length > 0 && extractedEntities.personas.length > 0)
        ) {
          return generateProductResponse(updatedProductQuery)
        }

        // Respuesta por defecto
        return {
          text: `${userName}, no estoy seguro de entender tu consulta. ¿Podrías ser más específico sobre qué producto buscas, talla, color o para quién es?`,
          step: "bienvenida_personalizada",
        }
    }
  }

  // Manejar respuestas basadas en el análisis de texto
  const getAIResponse = (question) => {
    return analyzeText(question)
  }

  useEffect(() => {
    // Iniciar el chatbot con el mensaje de bienvenida cuando se abre
    if (chatVisible && messages.length === 0) {
      handleBotResponse("nombre")
    }
  }, [chatVisible, messages.length])

  useEffect(() => {
    // Scroll automático cuando se añaden nuevos mensajes
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Función para manejar las respuestas del bot
  const handleBotResponse = (stepId, customMessage = null) => {
    setLoading(true)
    const step = chatbotData[stepId]

    // Simular un retraso para que parezca más natural
    setTimeout(() => {
      if (step) {
        const messageText =
          customMessage || (typeof step.message === "function" ? step.message(userName) : step.message)

        setMessages((prevMessages) => [...prevMessages, { type: "bot", text: messageText }])
        setCurrentStep(stepId)
      }
      setLoading(false)
    }, 600)
  }

  // Función para manejar la selección de opciones
  const handleOptionSelect = (option) => {
    // Añadir la opción seleccionada como mensaje del usuario
    const selectedOption = chatbotData[currentStep].options?.find((opt) => opt.value === option)
    if (selectedOption) {
      setMessages((prevMessages) => [...prevMessages, { type: "user", text: selectedOption.label }])
    }

    // Procesar la respuesta del bot
    handleBotResponse(option)
  }

  // Función para manejar el envío de mensajes de texto
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Añadir el mensaje del usuario
    setMessages((prevMessages) => [...prevMessages, { type: "user", text: inputValue }])

    // Si estamos esperando el nombre del usuario
    if (currentStep === "nombre") {
      setUserName(inputValue)
      setInputValue("")
      handleBotResponse("bienvenida_personalizada")
      return
    }

    // Procesar la respuesta del bot para consultas libres
    const userMessage = inputValue
    setInputValue("")

    setTimeout(() => {
      const response = getAIResponse(userMessage)
      setMessages((prevMessages) => [...prevMessages, { type: "bot", text: response.text }])
      setCurrentStep(response.step)
    }, 800)
  }

  const toggleChat = () => {
    setChatVisible(!chatVisible)
    if (!chatVisible) {
      // Reiniciar el chat cuando se abre de nuevo
      setMessages([])
      setCurrentStep("nombre")
      setUserName("")
      setConversationContext({
        lastTopic: null,
        preferences: {},
        entities: {},
        history: [],
        productQuery: {
          category: null,
          color: null,
          size: null,
          material: null,
          gender: null,
          price: null,
        },
      })
    }
  }

  return (
    <div className="relative font-sans">
      {/* Chat completo cuando está visible */}
      {chatVisible && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 flex flex-col h-[500px] border border-gray-100">
          {/* Encabezado elegante */}
          <div className="bg-black text-white p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-800 to-black"></div>
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white border-opacity-5"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <h3 className="font-medium text-sm flex items-center gap-1">
                    <HeartIcon className="w-4 h-4" />
                    MYSHOP
                  </h3>
                  <p className="text-xs text-gray-300 px-8">Asistente de Moda</p>
                </div>

              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Cerrar chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-1 w-16 bg-white bg-opacity-20 rounded-full mt-3"></div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {messages.map((message, index) => (
              <div key={index} className={`flex mb-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                {message.type === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-2 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-lg max-w-[85%] text-sm leading-relaxed shadow-sm ${message.type === "bot"
                      ? "bg-black text-white rounded-bl-none"
                      : "bg-gray-800 text-white rounded-br-none"
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {loading && (
              <div className="flex items-center space-x-1 mt-1 mb-1 ml-8">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-150"></div>
              </div>
            )}

            {/* Opciones de respuesta */}
            {!loading && chatbotData[currentStep]?.options && (
              <div className="flex flex-wrap gap-2 mt-3 mb-1">
                {chatbotData[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option.value)}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-3 py-2 rounded text-xs transition-colors shadow-sm"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input de texto */}
          <div className="border-t border-gray-100 p-3 flex bg-white">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={currentStep === "nombre" ? "Escribe tu nombre..." : "Escribe tu consulta..."}
              className="flex-1 border border-gray-200 rounded-l-md px-4 py-2 focus:outline-none text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-black text-white rounded-r-md px-4 py-2 hover:bg-gray-800 transition-colors"
              aria-label="Enviar mensaje"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Burbuja flotante cuando el chat está oculto */}
      {!chatVisible && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-gray-800 transition-transform hover:scale-105 group"
          aria-label="Abrir chat"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          <span className="absolute inset-0 rounded-full border border-white border-opacity-30 scale-105 animate-pulse"></span>
        </button>
      )}
    </div>
  )
}

export default ChatBubble
