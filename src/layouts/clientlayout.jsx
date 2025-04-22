import { Outlet } from "react-router-dom";
import FooterCliente from "../components/footer/footercliente";
import NavbarCliente from "../components/nav/navbar_cliente";

const ClientLayout = () => {
  return (
    <>
      <NavbarCliente>
        <main>
          <Outlet />
        </main>
      </NavbarCliente>

      <FooterCliente />
    </>
  );
};
export default ClientLayout;
