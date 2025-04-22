import React from "react";
import NavbarAdmin from "../components/nav/navbar_admin";
import FooterAdmin from "../components/footer/footeradmin";
const AdminLayout = ({ children }) => {
    return (
        <>
        <NavbarAdmin />
            <main>
                {children}
            </main>
        <FooterAdmin />
        </>
    )
}
export default AdminLayout;