import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminlayout";
import ClientLayout from "../layouts/clientlayout";

export function MisRutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MisRutas;
