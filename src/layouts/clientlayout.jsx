import FooterCliente from "../components/footer/footercliente"
import NavbarCliente from "../components/nav/navbar_cliente"

const ClientLayout = ({ children }) => {
    return (
        <> 
        <NavbarCliente />
            <main>
                {children}
            </main>
        <FooterCliente />  
        </>
    )
}
export default ClientLayout