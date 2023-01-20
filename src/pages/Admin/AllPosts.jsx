import axios from "axios"
// import {  } from "react"
import { useContext,useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { NavBar } from "./HomeDash"
import LoginUser from "./Login"
// import logo from "../../../public/img/"


export default function AllPostShowEdite(){
    const { currentUser } = useContext(AuthContext)
    return(<>

    {currentUser? 
        <>
        <NavBar />
        {ShowIma()}
        </>
    :<LoginUser/>}

    </>)
}

function ShowIma(){
    // const image = [1,2,3,4,5,6,7,8,9]   
    //  const location = useLocation()
    //  const postId = location.pathname.split("/")[3]
    //  console.log(postId)
    const { currentUser } = useContext(AuthContext)
    // show all posts
    const [ post,setPost ] = useState([])
    useState(async()=>{
        try{
           const res = await axios.get("http://localhost:4000/posts")
            setPost(res.data)
            // console.log(res.data)
        }catch(error){
            console.log(error)
        }
    })
 
    // console.log(post)
    return( 
        <div className="container-fluid">
            All Post From Every Users
        <div class="row p-xl-3 w-100">
            {post.map((show)=>(
            <div className="col-md-6 col-lg-4">
                    <div className="row w-100 p-md-3"> 
                        <div class="col-6 product-item bg-light mb-4 ">
                            
                        {/* <img class="img-fluid" style={{width:"100px"}} src={`/img/product-${show}.jpg`} alt="product"/> */}
                        <img class="img-fluid" style={{objectFit:'cover',width:"350px",height:"150px"}} src={"../.././upload/"+show.post_image} alt="product"/>
                        {/* <img class="img-fluid" style={{width:"100px"}} src={"https://images.pexels.com/photos/51415/pexels-photo-51415.jpeg?auto=compress&cs=tinysrgb&w=400"} alt={show.name}/> */}
                        
                        <div class="product-action">
                            {currentUser.user_id===show.user_id || currentUser.user_id === 1? 
                            <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepost/${show.post_id}`}>edite</Link>:
                            <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepost/${show.post_id}`}>show</Link>
                            }
                        </div>
                        </div>
                        <div class="col-6 text-center py-4 w-50">
                            <Link class="h6 text-decoration-none text-truncate" to={`/singlepost/${show.post_id}`}>{show.post_title}</Link>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>{show.post_price}</h5><h6 class="text-muted ml-2"><del>{show.post_h_price}</del></h6>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mb-1">
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
            </div>
            ))}
        </div>
        </div>

)}