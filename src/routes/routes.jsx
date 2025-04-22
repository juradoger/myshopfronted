import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminlayout";
import Productos from "../pages/admin/productos";
import ClientLayout from "../layouts/clientlayout";
import LoginRegistrar from "../pages/admin/loginregistrar";
import Checkout from "../pages/cliente/checkout";

export function MisRutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout/>} >
          <Route path="checkout" element={<Checkout/>} />
          {/* Rutas anidadas dentro del ClientLayout */}
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/catalogo" element={<Catalogo />}/>
          <Route path="/detalleproducto" element={<DetalleProducto />}/>

          
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Rutas anidadas dentro del AdminLayout */}
          <Route path="productos" element={<Productos />} />
          <Route path="login" element={<LoginRegistrar/>} />
          <Route path="/admin/inicio" element={<Dashboard />} /> 
          <Route path="/admin/actualizarproducto" element={<ActualizarProducto />} />
          <Route path="/admin/detalle" element={<DetallesPedido/>}/>
          <Route path="/admin/tabla" element={<TablaProductos />}/>
          {/* Otras rutas de admin */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MisRutas;
