import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function NavbarSection(){
    return(<>
    {TopBar()}
    {NavBar()}
    </>)
}

function TopBar(){
    return(<>
    <div class="container-fluid">
        <div class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <div class="col-lg-4">
                <Link to="/" class="text-decoration-none">
                    <span class="h1 text-uppercase text-primary bg-dark px-2">AmanAyubi</span>
                    <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Logistics</span>
                </Link>
            </div>
            <div class="col-lg-4 col-6 text-left">
                
            </div>
            <div class="col-lg-4 col-6 text-right">
                <p class="m-0">Customer Service</p>
                <h5 class="m-0">+93786306600</h5>
            </div>
        </div>
    </div>
    
    </>)
}

function NavBar(){
    const location = useLocation()
    // show all posts
    // const [ post,setPost ] = useState([])
    const [cates,setCates] = useState([])
    // useEffect(()=>{
        const ShowCate = async()=>{
            try{
              const res =  await axios.get("http://localhost:4000/posts/allcatgories/1")
                setCates(res.data)
            }catch(error){
                console.log(error)
            }
        }
        ShowCate()
    return(<>
    <div class="container-fluid bg-dark mb-30 " style={{position:"sticky",top:"0",zIndex:99}}>
        <div class="row px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: "65px", padding:" 0 30px"}}>
                    <h6 class="text-dark m-0"><i class="fa fa-bars mr-2"></i>Categories</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{width:" calc(100% - 30px)", zIndex: "999"}}>
                    <div class="navbar-nav w-100">
                        {cates.map((item)=>(
                        <div class="nav-item dropdown dropright">
                            <Link to={`/shop/${item.cat_id}`} class="nav-link dropdown-toggle" data-toggle="dropdown">{item.cat_name}
                            {/* <i class="fa fa-angle-right float-right mt-1"></i> */}
                            </Link>
                        </div>
                   ))}  
                        
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <Link to="/" class="text-decoration-none d-block d-lg-none">
                        <span class="h4 text-uppercase text-dark bg-light p-2">AmanAyubi</span>
                       <span class="h4 text-uppercase text-light bg-primary p-2" >Logistics</span>
                    </Link>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <Link to="/" class={location.pathname==="/" ?"nav-item nav-link active":"nav-item nav-link"}>Home</Link>
                            <Link to="/shop" class={location.pathname==="/shop" ? "nav-item nav-link active":"nav-item nav-link"}>Shop</Link>
                            
                            <Link to="/contact" class={location.pathname==="/contact" ?"nav-item nav-link active":"nav-item nav-link"}>Contact</Link>
                            <Link to="/About" class={location.pathname==="/About" ?"nav-item nav-link active":"nav-item nav-link"}>About</Link>
                        </div>
                        
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>)
}