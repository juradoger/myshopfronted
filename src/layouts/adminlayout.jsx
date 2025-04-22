import React from "react";
import NavbarAdmin from "../components/nav/navbar_admin";
import FooterAdmin from "../components/footer/footeradmin";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
    return (
        <>
        <NavbarAdmin>
            <main>
              <Outlet/>
            </main>
        </NavbarAdmin>
        <FooterAdmin />
        </>
    )
}
export default AdminLayout;