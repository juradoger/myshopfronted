"use client"
import { useState } from "react"
import { X, Heart, Eye, EyeOff, ChevronRight } from "lucide-react"

const LoginPopup = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (!isOpen) return null

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", { email, password })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <Heart className="w-5 h-5 mr-2" />
            <span className="font-bold text-lg">MYSHOP</span>
          </div>
          <h2 className="text-sm text-gray-600">INICIAR SESIÓN</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Correo
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm text-gray-600">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-300"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-xs text-gray-500 hover:underline">
              Olvidaste tu contraseña?
            </a>
          </div>

          {/* Login button */}
          <button type="submit" className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
            Iniciar Sesión
          </button>
        </form>

        {/* Social login */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-4">O iniciar sesion con</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex justify-center py-2 px-4 border border-gray-300 rounded bg-[#3b5998] text-white text-sm">
              Facebook
            </button>
            <button className="flex justify-center py-2 px-4 border border-gray-300 rounded bg-[#4285F4] text-white text-sm">
              Google
            </button>
          </div>
        </div>

        {/* Register link */}
        <div className="mt-6 text-center">
          <a href="#" className="inline-flex items-center text-sm hover:underline">
            Registrarse
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup
