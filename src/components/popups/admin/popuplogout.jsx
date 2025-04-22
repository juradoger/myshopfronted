import { ChevronRight, LogOut } from "lucide-react"

const PopupLogout = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded shadow-lg z-50 overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3">Administrador</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
            <span className="text-sm font-medium">CAMBIAR CONTRASEÑA</span>
            <ChevronRight size={16} />
          </div>

          <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
            <span className="text-sm font-medium">CERRAR SESIÓN</span>
            <LogOut size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupLogout
