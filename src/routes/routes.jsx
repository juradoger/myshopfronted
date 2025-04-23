import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminlayout";
import Productos from "../pages/admin/productos";
import ClientLayout from "../layouts/clientlayout";
import LoginRegistrar from "../pages/admin/loginregistrar";
import Checkout from "../pages/cliente/checkout";
import Insertar from "../pages/admin/insertarproducto";
import ActualizarProducto from "../pages/admin/actualizarproducto";
import DetalleProducto from "../pages/cliente/productosdetalle";
import Dashboard from "../pages/admin/dashboard";
import TablaProductos from "../pages/admin/tablaproductos";
import Catalogo from "../pages/cliente/catalogo";
import DetallesPedido from "../pages/admin/detalleventas";
import Inicio from "../pages/cliente/inicio";

export function MisRutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="checkout" element={<Checkout />} />
          {/* Rutas anidadas dentro del ClientLayout */}
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/detalleproducto" element={<DetalleProducto />} />
        </Route>

        <Route path="/login" element={<LoginRegistrar />} />

        <Route path="/admin" element={<AdminLayout />}>
          {/* Rutas anidadas dentro del AdminLayout */}
          <Route path="" element={<Dashboard />} />
          <Route path="productos" element={<Productos />} />
          <Route
            path="actualizarproducto"
            element={<ActualizarProducto />}
          />
          <Route path="insertarproducto" element={<Insertar />} />
          <Route path="detalle/:id" element={<DetallesPedido />} />
          <Route path="tabla" element={<TablaProductos />} />
          {/* Otras rutas de admin */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MisRutas;
