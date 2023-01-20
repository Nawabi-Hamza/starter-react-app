import { useState } from "react"
// import { useLocation } from "react-router-dom"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import Liker from "./Linker"



export default function ShopDetailsPage(){
    return(<>
    
    {SectionOneBreadcrumbs()}
    {SectionTwoShopDetails()}
    {/* {SectionTreeYouMayLike()} */}
    
    </>)
}

// <!-- Breadcrumb Start -->
function SectionOneBreadcrumbs(){
    return(<>
    <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <Link class="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link class="breadcrumb-item text-dark" to="/shop">Shop</Link>
                    <span class="breadcrumb-item active">Shop Detail</span>
                </nav>
            </div>
        </div>
    </div>
    </>)
}
// <!-- Breadcrumb End -->
var cateId 
// <!-- Shop Detail Start -->
function SectionTwoShopDetails(){
    // ============show single all about single post ==============
    const [ post,setPost ] = useState([])
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    // const { currentUser } = useContext(AuthContext)
    // var res = axios.get(`http://localhost:4000/posts/single/${postId}`)
    // console.log(postId)
    // useEffect(() => {
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
    // })
    // console.log(post.post_id)
    // =================show that post Categories==========================
    const [showByCategories,setShowByCategories] =  useState([])
    const Show = async(e)=>{
        try{
            const res = await axios.get("http://localhost:4000/mycate/showBycate/"+cateId)
            setShowByCategories(res.data)
        }catch(error){
            console.log(error)
        } 
    }
    Show()
//    const posts = [1,2,3,4,5]
    return(<>
    <div class="container-fluid pb-5">
        <div class="row px-xl-5">
            <div class="col-lg-5 mb-30">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner bg-light">
                        <div class="carousel-item active">
                            <img class="w-100" style={{height:"450px",objectFit:"cover",filter:"brightness(40%)"}}  src={"../.././upload/"+post.post_image} alt={post.post_image}/>
                        </div>
                        <div class="carousel-item">
                            <img class="w-100" style={{height:"450px",objectFit:"cover"}}  src={"../.././upload/"+post.post_image} alt={post.post_image}/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i class="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                        <i class="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
                 
            </div>

            <div class="col-lg-7 h-auto mb-30">
                <div class="h-100 bg-light p-30">
                    <h3>{post.post_title}</h3>
                    <div class="d-flex mb-3">
                        <div class="text-primary mr-2">
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star-half-alt"></small>
                            <small class="far fa-star"></small>
                        </div>
                        <small class="pt-1">(919 Reviews)</small>
                    </div>
                    {/* <h3 class="font-weight-semi-bold mb-4">Price: {post.post_price}</h3> */}
                    <p class="mb-4">Desciption: {post.post_description}</p>
                    <p class="mb-4" onLoad={cateId = post.posts_catgories}>Categories: {post.cat_name}</p>
                    <p class="mb-4">USER EMAIL: {post.user_email}</p>
                    <div class="d-flex pt-2">
                        <strong class="text-dark mr-2">Share on:</strong>
                        <div class="d-inline-flex">
                            <a class="text-dark px-2" href="https://www.facebook.com">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="text-dark px-2" href="https://www.twiter.com">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="text-dark px-2" href="https://www.linkedin.com">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a class="text-dark px-2" href="https://www.piterest.com">
                                <i class="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* show single post user may like */}
    <div class="container-fluid py-5">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">You May Also Like</span></h2>
        <div class="row px-xl-5">
                    {showByCategories.map((item)=>(
            <div class="col-12 col-md-6 col-lg-3">
                    <div class="product-item bg-light">
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" style={{height:"220px",objectFit:"cover"}} src={`..//upload/${item.post_image}`} alt=""/>
                            <div class="product-action">
                            <Link class="btn btn-outline-dark btn-square" to={`/shopdetails/${item.post_id}`}><i class="fa fa-sharp fa-solid fa-eye"></i></Link>
                                <Liker/>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <Link class="h6 text-decoration-none text-truncate" to={`/shopdetails/${item.post_id}`}>{item.post_title}</Link>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                            </div>
                        </div>
                    </div>
            </div>
                    ))}
        </div>
    </div>
    </>)

}
// <!-- Shop Detail End --> 

