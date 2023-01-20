import FooterSection from "./Footer";
import NavbarSection from "./NavBar";
import { Outlet } from "react-router-dom"




export default function NavFooterPage(){
    return(<>
    <NavbarSection/>
    <Outlet/>
    <FooterSection/>
    </>)
}