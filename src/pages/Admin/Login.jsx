import "./style.css"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
export default function LoginUser(){
    const { login } = useContext(AuthContext)

    const navigate = useNavigate()
    const [ inputs,setInput ] = useState({
        user_name:"",
        user_password:""
      })

      const handlChange =(e)=>{ 
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
      }
    const handleSubmit = async(e)=>{
        e.preventDefault();
       try{
        await axios.post("http://localhost:4000/auth/login",inputs)
        await login(inputs)
        navigate("/dashboard")
        alert("welcome "+inputs.user_name)
       }catch(error){
        console.log(error)
        alert("Please Check Your Name Or Password")
       }
    }
    return(<>
        <div class="wrapper login-3">
            <div class="container containers">
                <div class="col-left">
                    <div class="login-text">
                    <Link to="/home" class="text-decoration-none">
                    <span class="h4 text-uppercase an px-2">AmanAyubi</span>
                    <span class="h4 text-uppercase bn px-2 ml-n1">Logistics</span>
                    </Link>
                        <p>
                            Welcome To Login Page This page Just For Admin Not For User IF Your Are Admin So Welcome If Your Are Not Welcome
                            Please If Your Not Admin Go To Home Page
                        </p>
                        <Link to="/" class="btn">Go Home</Link>
                    </div>
                </div>
                <div class="col-right">
                    <div class="login-form">
                        <h2>Login</h2>
                        <form>
                            <p>
                                <input type="text" name="user_name" onChange={handlChange} placeholder="Username" required/>
                            </p>
                            <p>
                                <input type="password" name="user_password" onChange={handlChange} placeholder="Password" required/>
                            </p>
                            <p>
                                <input class="btn" type="submit" value="Sing In" onClick={handleSubmit}/>
                            </p>
                            <p>
                                {/* <a href="">Forget password?</a> */}
                                {/* <a href="">Create an account.</a> */}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        
        </div>
    </>)
}
