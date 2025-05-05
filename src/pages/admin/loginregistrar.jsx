import { Heart } from "lucide-react"
import { useState } from "react"
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import authService from "../../services/auth-service"

const LoginRegistrar = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [aceptarTerminos, setAceptarTerminos] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Estados para manejar errores
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [generalError, setGeneralError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // Función para validar contraseña
  const validatePassword = (password) => {
    // Al menos 8 caracteres, una mayúscula y un número
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (!minLength) {
      return "La contraseña debe tener al menos 8 caracteres"
    }

    if (!hasUpperCase) {
      return "La contraseña debe incluir al menos una letra mayúscula"
    }

    if (!hasNumber) {
      return "La contraseña debe incluir al menos un número"
    }

    return "" // Sin errores
  }

  // Función para cambiar entre modales
  const toggleModal = () => {
    // Limpiar errores y campos al cambiar de modal
    setEmailError("")
    setPasswordError("")
    setGeneralError("")
    setShowLogin(!showLogin)
  }

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault()
    setEmailError("")
    setPasswordError("")
    setGeneralError("")
    setIsLoading(true)

    try {
      const user = await authService.signIn({
        email,
        password,
      })

      setIsLoggedIn(true)

      if (user.rol === "ADMIN") {
        navigate("/admin")
        return
      }

      navigate("/")
    } catch (error) {
      console.error("Error de inicio de sesión:", error)

      // Manejar errores específicos de Firebase
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setGeneralError("Correo electrónico o contraseña incorrectos")
      } else if (error.code === "auth/too-many-requests") {
        setGeneralError("Demasiados intentos fallidos. Intenta más tarde")
      } else {
        setGeneralError("Error al iniciar sesión. Inténtalo de nuevo")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar el registro
  const handleRegistro = async (e) => {
    e.preventDefault()
    setEmailError("")
    setPasswordError("")
    setGeneralError("")
    setIsLoading(true)

    // Validar contraseña
    const passwordValidationError = validatePassword(password)
    if (passwordValidationError) {
      setPasswordError(passwordValidationError)
      setIsLoading(false)
      return
    }

    try {
      const user = await authService.registerWithEmailPassword({
        email,
        password,
        name: `${nombre} ${apellido}`,
        address,
      })

      console.log("Registro con:", {
        nombre,
        apellido,
        email,
        password,
        aceptarTerminos,
      })

      if (user) {
        setIsLoggedIn(true)
        navigate("/")
      }
    } catch (error) {
      console.error("Error de registro:", error)

      // Manejar errores específicos de Firebase
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Este correo electrónico ya está registrado")
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Formato de correo electrónico inválido")
      } else if (error.code === "auth/weak-password") {
        setPasswordError("La contraseña es demasiado débil")
      } else {
        setGeneralError("Error al registrar. Inténtalo de nuevo")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Si el usuario está logueado, mostrar dashboard
  if (isLoggedIn) {
    return navigate("/admin")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Parte del Formulario */}
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-6">
            <Heart className="w-5 h-5 mr-2 text-gray-700" />
            <span className="text-xl font-light">MYSHOP</span>
          </div>

          {showLogin ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Acceso</h2>
              <p className="text-sm text-gray-500 mb-6">
                ¿Todavía no tienes cuenta?{" "}
                <button onClick={toggleModal} className="text-blue-500 underline">
                  Regístrate
                </button>
              </p>

              {generalError && (
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{generalError}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full p-2 border ${emailError ? "border-red-500" : "border-gray-300"} rounded`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError("")
                    }}
                    required
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className={`w-full p-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError("")
                    }}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-black text-white py-2 rounded flex items-center justify-center hover:bg-gray-800 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "PROCESANDO..." : "INICIAR SESIÓN"}
                  {!isLoading && (
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>

              <div className="flex justify-between gap-4 mt-6 w-full">
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center">
                  <FaGoogle className="text-red-500" />
                </button>
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center">
                  <FaGithub className="text-black" />
                </button>
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center">
                  <FaFacebook className="text-blue-600" />
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Al hacer clic en "Iniciar Sesión", aceptas los Términos y Condiciones de nuestro sitio web.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Registrarse</h2>
              <p className="text-sm text-gray-500 mb-6">
                ¿Ya tienes una cuenta?{" "}
                <button onClick={toggleModal} className="text-blue-500 underline">
                  Iniciar sesión
                </button>
              </p>

              {generalError && (
                <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{generalError}</p>
                </div>
              )}

              <div className="flex justify-between gap-4 mb-4 w-full">
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center">
                  <FaGoogle className="text-red-500" />
                </button>
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center">
                  <FaGithub className="text-black" />
                </button>
                <button className="flex-1 border border-gray-300 rounded p-2 flex justify-center">
                  <FaFacebook className="text-blue-600" />
                </button>
              </div>

              <div className="flex items-center w-full mb-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">O</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <form onSubmit={handleRegistro} className="w-full space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>

                <textarea
                  placeholder="Dirección"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full p-2 border ${emailError ? "border-red-500" : "border-gray-300"} rounded`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError("")
                    }}
                    required
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className={`w-full p-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError("")
                    }}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                </div>

                <p className="text-xs text-gray-500">Mínimo 8 caracteres con mayúsculas, minúsculas y número.</p>

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
                    Acepto los Términos y Condiciones del sitio.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-black text-white py-2 rounded flex items-center justify-center hover:bg-gray-800 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "PROCESANDO..." : "REGISTRARSE"}
                  {!isLoading && (
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginRegistrar
