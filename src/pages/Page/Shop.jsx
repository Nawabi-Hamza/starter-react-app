import axios from "axios"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Liker from "./Linker"
// import { post } from "../../../../Backend/routes/catgoiesRoutes"


export default function ShopPage(){
    return(<>
    {SectionOneBreadcrumb()}
    {SectionTwoShop()}
    </>)
}

// <!-- Breadcrumb Start -->
function SectionOneBreadcrumb(){
    return(<>
    <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <Link class="breadcrumb-item text-dark" to="/">Home</Link>
                    <Link class="breadcrumb-item text-dark" to="/shop">Shop</Link>
                    <span class="breadcrumb-item active">Shop List</span>
                </nav>
            </div>
        </div>
    </div>
    </>)
}
// <!-- Breadcrumb End -->

//  <!-- Shop Start -->
export function SectionTwoShop(){
    // const Cards = [1,2,3,4,5,6,7,8,9]
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    // console.log(postId)
    const [ Cards ,setCards ] = useState([])
   if(postId){
       const Show = async(e)=>{
            try{
                const res = await axios.get("http://localhost:4000/mycate/showBycate/"+postId)
                setCards(res.data)
            }catch(error){
                console.log(error)
            } 
        }
        Show()
       } 
       else{
            const Show = async(e)=>{
                 try{
                     const res = await axios.get("http://localhost:4000/mycate/showBycate/")
                     setCards(res.data)
                 }catch(error){
                     console.log(error)
                 } 
             }
             Show()
       }
    return(<>
    <div class="container-fluid">
        <div class="row px-xl-5">
            {/* <!-- Shop Product Start --> */}
            <div class="col-lg-12 col-md-12">
                <div class="row pb-3">
                   {/* {TopSection()} */}
                    {Cards.map((item)=>(
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 pb-1">
                        <div class="product-item bg-light mb-4">
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" style={{height:"280px",objectFit:"cover"}} src={`../.././upload/${item.post_image}`} alt=""/>
                                <div class="product-action">
                                    <Link class="btn btn-outline-dark btn-square" to={`/shopdetails/${item.post_id}`}><i class="fa fa-sharp fa-solid fa-eye"></i></Link>
                                           <Liker/>
                                    {/* <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a> */}
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <Link class="h3 text-decoration-none text-truncate" to={`/shopdetails/${item.post_id}`}>{item.post_title}</Link>
                                <div class="d-flex align-items-center justify-content-center mt-2">
                                    {/* <h5>{item.post_price}</h5><h6 class="text-muted ml-2"><del>{item.post_h_price}</del></h6> */}
                                </div>
                                <div class="d-flex align-items-center justify-content-center mb-1">
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            {/* <!-- Shop Product End --> */}
        </div>
    </div>
    </>)
}
 