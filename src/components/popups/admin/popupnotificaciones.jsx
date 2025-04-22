"use client"
import { X } from "lucide-react"

const PopupNotificaciones = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const notifications = [
    { id: 1, title: "Lorem Ipsum", price: "Bs. 140", date: "Nov 15,2024", status: "Vendido" },
    { id: 2, title: "Lorem Ipsum", price: "Bs. 140", date: "Nov 15,2024", status: "Vendido" },
    { id: 3, title: "Lorem Ipsum", price: "Bs. 140", date: "Nov 15,2024", status: "Vendido" },
    { id: 4, title: "Lorem Ipsum", price: "Bs. 140", date: "Nov 15,2024", status: "Vendido" },
  ]

return (
    <div className="absolute right-0 top-full mt-2 w-90 bg-white rounded shadow-lg z-50 overflow-hidden">
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium">Notificaciones</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-3">
                {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0"></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <span className="font-medium text-sm">{notification.title}</span>
                                <span className="text-xs text-white bg-blue-800 px-2 py-0.5 rounded">{notification.status}</span>
                            </div>
                            <div className="text-xs">{notification.price}</div>
                            <div className="text-xs text-gray-500">{notification.date}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 flex justify-between items-center gap-2">
                <button className="text-[10px] flex items-center gap-0.5 text-gray-600">
                    <span className="w-4 h-3.5 inline-flex items-center justify-center">
                        <span className="text-[10px]">✓</span>
                    </span>
                    MARCAR TODO COMO LEÍDO
                </button>
                <button className="bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">VER TODAS LAS NOTIFICACIONES</button>
            </div>
        </div>
    </div>
)
}

export default PopupNotificaciones
