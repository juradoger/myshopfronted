import { HeartCrack, HeartIcon } from "lucide-react"
import { useState } from "react"
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa"


const LoginRegistrar = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [mantenerConectado, setMantenerConectado] = useState(false)
  const [aceptarTerminos, setAceptarTerminos] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Función para cambiar entre modales
  const toggleModal = () => {
    setShowLogin(!showLogin)
  }

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault()
    console.log("Login con:", { email, password, mantenerConectado })
    // Simulamos login exitoso
    setIsLoggedIn(true)
  }

  // Función para manejar el registro
  const handleRegistro = (e) => {
    e.preventDefault()
    console.log("Registro con:", { nombre, apellido, email, password, aceptarTerminos })
    // Simulamos registro exitoso
    setIsLoggedIn(true)
  }

  // Si el usuario está logueado, mostrar productos
  if (isLoggedIn) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extralight">♥MYSHOP - Catálogo</h1>
          <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 bg-black text-white rounded">
            Cerrar Sesión
          </button>
        </div>
        <ShopStyleProducts />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="w-full h-full flex">
        {/* Imagen de fondo (lado izquierdo) */}
        <div className="hidden md:block w-1/2 h-full relative">
          <img
            src="src/assets/img/portada.png"
            alt="Modelo MYSHOP"
            className="w-full h-full"
          />
        </div>

        {/* Formulario (lado derecho) */}
        <div className="w-full md:w-1/2 h-full bg-white p-8 flex flex-col justify-center items-center">
          {showLogin ? (
            /* Modal de Login */
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <div className="flex justify-center items-center mb-2">
                  <span className="text-sm"><HeartIcon size={20} /></span>
                  <span className="font-extralight text-lg">MYSHOP</span>
                </div>
                <h2 className="text-2xl font-bold">Acceso</h2>
                <p className="text-sm text-gray-500">
                  ¿Todavía no tienes cuenta?{" "}
                  <button onClick={toggleModal} className="text-blue-500 underline">
                    Regístrate
                  </button>
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mantenerme"
                    checked={mantenerConectado}
                    onChange={(e) => setMantenerConectado(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="mantenerme" className="text-sm">
                    Mantenerme conectado
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded flex items-center justify-center"
                >
                  INICIAR SESIÓN
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>

              <div className="mt-6">
                <div className="flex justify-between gap-4 mt-4">
                  <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center items-center">
                    <FaGoogle className="text-red-500" />
                  </button>
                  <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center items-center">
                    <FaApple className="text-black" />
                  </button>
                  <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center items-center">
                    <FaFacebook className="text-blue-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Al hacer clic en "iniciar sesión", aceptas los Términos y condiciones de nuestro sitio web.
                </p>
              </div>
            </div>
          ) : (
            /* Modal de Registro */
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <div className="flex justify-center items-center mb-2">
                  <span className="text-sm">♥</span>
                  <span className="font-bold text-sm">MYSHOP</span>
                </div>
                <h2 className="text-2xl font-bold">Registrarse</h2>
                <p className="text-sm">Regístrese con</p>
              </div>

              <div className="flex justify-between gap-4 mb-4">
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center items-center">
                  <FaGoogle className="text-red-500" />
                </button>
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center items-center">
                  <FaApple className="text-black" />
                </button>
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center items-center">
                  <FaFacebook className="text-blue-600" />
                </button>
              </div>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">O</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <form onSubmit={handleRegistro} className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Su nombre</h3>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Apellido"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Detalles de inicio de sesión</h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Mínimo 8 caracteres que incluyan letras mayúsculas, minúsculas, un número y un carácter especial.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terminos"
                    checked={aceptarTerminos}
                    onChange={(e) => setAceptarTerminos(e.target.checked)}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="terminos" className="text-xs text-gray-500">
                    Al hacer clic en "iniciar sesión", aceptas los Términos y condiciones de nuestro sitio web.
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mantenerme-registro"
                    checked={mantenerConectado}
                    onChange={(e) => setMantenerConectado(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="mantenerme-registro" className="text-sm">
                    Mantenerme conectado
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded flex items-center justify-center"
                >
                  REGISTRARSE
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="text-sm text-center">
                  ¿Ya tienes una cuenta?{" "}
                  <button onClick={toggleModal} className="text-blue-500 underline">
                    Iniciar sesión
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginRegistrar
