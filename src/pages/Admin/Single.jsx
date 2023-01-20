import { Link,useLocation,useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext,useState,useEffect } from "react"
import axios from "axios"
import { NavBar } from "./HomeDash"
// import { useEffect } from "react"
function HomeDashboard(){
    return(<>
    <NavBar/>
    <div className="container-fluid">
     <div className="container-md">
        <div className="row">
          {/* {WriteAPost()} */}
          {ShowSinglePost()}
        </div>
     </div>
    </div>
    </>)
}
export default HomeDashboard;
// show all posts
function ShowSinglePost(){
  // console.log(state)
    const navigate = useNavigate()
    const [ post,setPost ] = useState([])
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    // const postId = state.post_id
    const { currentUser } = useContext(AuthContext)
    // var res = axios.get(`http://localhost:4000/posts/single/${postId}`)

    useEffect(() => {
      const fetchPost = async()=>{
        try{
          const res = await axios.get(`http://localhost:4000/posts/single/${postId}`)
        setPost(res.data)
        // console.log(res.data)
        }catch(error){
          console.log(error)
        }
      }
      fetchPost()
    })
//   ============Handle Delete Post ==============
    const handleDelete = async()=>{
      try{
         await axios.delete(`http://localhost:4000/posts/single/${postId}`)
         alert("Post Deleted Successfuly")
         navigate("/allposts")
      }catch(error){
        console.log(error)
      }
    }
 return( 
      <>
    <div className=" w-100 my-3">
        Post Id : {postId}
        
        <div class="w-100">
            <div className="row">
                <div class="col-md-6 product-item bg-light mb-4" style={{height:"400px",width:"100%"}}>
                        <img  src={`../.././upload/${post.post_image}`} alt={post.post_title} style={{height:"100%",width:"100%",objectFit:"cover"}}/>
                        {post.user_id===currentUser.user_id && (
                        <div class="product-action">
                            <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepostupdate/${post.post_id}`} state={post} >edite</Link>
                            <Link class="btn btn-outline-dark btn-square p-4" onClick={handleDelete}>delete</Link>
                        </div>
                        )}
                         { currentUser.user_id === 1 && (
                        <div class="product-action">
                            <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepostupdate/${post.post_id}`} state={post} >edite</Link>
                            <Link class="btn btn-outline-dark btn-square p-4" onClick={handleDelete}>delete</Link>
                        </div>
                        )}
                  </div> 
                    <div class="col-md-6 py-4">
                       <h1>{post.post_title}</h1>
                        <div class="mt-2">
                            <h5>{post.post_name}</h5>
                            <h5>{post.post_description}</h5>
                            <h5>categories :{post.cat_name}</h5>
                            <h5>User Name: {post.user_name}</h5>
                            <div className="d-flex">
                            <h5>Low Price: {post.post_price}</h5><h6 class="text-muted ml-2"><del>Height Price: {post.post_h_price}</del></h6>
                            </div>
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
    </div>
      </>
)}
