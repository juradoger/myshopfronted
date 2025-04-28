import React from 'react';

const FooterAdmin = () => {
  return (
    <footer className="bg-white px-6 py-4 flex justify-between items-center text-center text-sm text-gray-600">
      <div>
        © 2025 - Panel de control
      </div>
      <div className="space-x-4 text-center flex items-center">
        <a href="#" className="hover:underline">Panel</a>
        <a href="/admin/productos" className="hover:underline">Todos los Productos</a>
        <a href="/admin/tabla" className="hover:underline">Lista de Pedidos</a>
      </div>
    </footer>
  );
};

export default FooterAdmin;