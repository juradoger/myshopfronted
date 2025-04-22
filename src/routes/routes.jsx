import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminlayout";
import Productos from "../pages/admin/productos";
import ClientLayout from "../layouts/clientlayout";

export function MisRutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout/>} >
          {/* Rutas anidadas dentro del ClientLayout */}
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/productos" element={<h1>Productos</h1>} />
          <Route path="/contacto" element={<h1>Contacto</h1>} />
          <Route path="/nosotros" element={<h1>Nosotros</h1>} />
          <Route path="/carrito" element={<h1>Carrito</h1>} />
          
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Rutas anidadas dentro del AdminLayout */}
          <Route path="productos" element={<Productos />} />
          {/* Otras rutas de admin */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MisRutas;
