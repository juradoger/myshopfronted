import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminlayout";
import Productos from "../pages/admin/productos";
import ClientLayout from "../layouts/clientlayout";

export function MisRutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout/>} />
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
