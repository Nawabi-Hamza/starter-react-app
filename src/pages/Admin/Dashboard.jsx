import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import HomeDashboard from "./HomeDash"
import LoginUser from "./Login"


export default function DashboardPage(){
    const { currentUser } = useContext(AuthContext)
    return(<>
    {currentUser?
    <>
    <HomeDashboard/>
    </>: <LoginUser/>}
    </>)
}
