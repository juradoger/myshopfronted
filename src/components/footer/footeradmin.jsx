import React from 'react';

const FooterAdmin = () => {
  return (
    <footer className="bg-white px-6 py-4 flex justify-between items-center text-sm text-gray-600">
      <div>
        © 2025 - Panel de control
      </div>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Acerca de</a>
        <a href="#" className="hover:underline">Dashboard</a>
        <a href="#" className="hover:underline">Ventas</a>
        <a href="#" className="hover:underline">Contacto</a>
      </div>
    </footer>
  );
};

export default FooterAdmin;