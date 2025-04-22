const FooterCliente = () => {
    const footerLinks = {
        cuenta: [
            { name: "Iniciar Sesión", url: "#" },
            { name: "Regístrate", url: "#" },
            { name: "Cambiar de región", url: "#" },
        ],
        compania: [
            { name: "Acerca de", url: "#" },
            { name: "Iniciativas ambientales", url: "#" },
            { name: "Fábricas", url: "#" },
            { name: "DEI", url: "#" },
            { name: "Carreras", url: "#" },
            { name: "Internacional", url: "#" },
            { name: "Accesibilidad", url: "#" },
        ],
        ayuda: [
            { name: "Centro de ayuda", url: "#" },
            { name: "Política devolución", url: "#" },
            { name: "Información de compras", url: "#" },
            { name: "Pedidos por mayor", url: "#" },
        ],
        conectate: [
            { name: "Facebook", url: "#" },
            { name: "Instagram", url: "#" },
            { name: "Twitter", url: "#" },
            { name: "Afiliados", url: "#" },
            { name: "Nuestras Tiendas", url: "#" },
        ],
        legal: [
            { name: "Política de privacidad", url: "#" },
            { name: "Términos de servicio", url: "#" },
            { name: "No vender o compartir mi información personal", url: "#" },
            { name: "Transparencia de suministros", url: "#" },
            { name: "Código de conducta del proveedor", url: "#" },
            { name: "Mapa de páginas", url: "#" },
            { name: "Mapa de productos", url: "#" },
        ],
    };

    return (
        <footer className="bg-gray-100 pt-10 pb-0 w-full">
            <div className="w-full px-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    {/* Cuenta */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-4">Cuenta</h3>
                        <ul className="space-y-2">
                            {footerLinks.cuenta.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className="text-sm text-gray-600 hover:text-gray-900">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Compañía */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-4">Compañía</h3>
                        <ul className="space-y-2">
                            {footerLinks.compania.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className="text-sm text-gray-600 hover:text-gray-900">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Obtener Ayuda */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-4">Obtener Ayuda</h3>
                        <ul className="space-y-2">
                            {footerLinks.ayuda.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className="text-sm text-gray-600 hover:text-gray-900">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Conéctate */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-4">Conéctate</h3>
                        <ul className="space-y-2">
                            {footerLinks.conectate.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} className="text-sm text-gray-600 hover:text-gray-900">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-4">Suscríbete</h3>
                        <div className="flex w-full">
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                className="flex-grow px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                            <button className="bg-gray-900 text-white px-4 py-2 hover:bg-gray-800">→</button>
                        </div>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="border-t border-gray-200 pt-6">
                    <p className="text-xs text-gray-500 text-center">©Copyright 2025 Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterCliente;
