import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import Liker from "./Linker"


export default function HomePage(){
    return(<>
    {SlideShow()}
    {SectionTwo()}
    {SectionCategories()}
    {SectionFutureProduct()}
    {SectionOffers()}
    {SectionFutureProduct()}
    {SectionVender()}
    </>)
}
//  Carousel Start 
function SlideShow(){
    const [ post,setPost ] = useState([])
    const ShowSlide = async()=>{
        // e.preventDefault()
        try{
           const res = await axios.get("http://localhost:4000/mycate/showslide")
            setPost(res.data)
        }catch(error){
            console.log(error)
        }
    }
    ShowSlide()
    // const [num,setNum] = useState(parseInt(1))
    // console.log(post[0].slide_image)
    return(<>
    <div class="container-fluid mb-3">
        <div class="row px-xl-5">
            <div class="col-lg-8 h-75" >
                <div id="header-carousel" class="carousel slide carousel-fade mb-30 mb-lg-0" style={{height:"450px"}} data-ride="carousel">
                <div id="product-carousel" class="carousel slide" style={{height:"450px"}} data-ride="carousel" >
                    <div class="carousel-inner bg-light" style={{height:"450px"}}>
                        <div class="carousel-item active" style={{height:"450px"}}>
                            <img class="w-100" src="https://images.pexels.com/photos/7430733/pexels-photo-7430733.jpeg?auto=compress&cs=tinysrgb&w=1600" style={{height:"450px",objectFit:'cover'}} alt="ImageOffers"/>
                            

                        </div>
                        {post.map((item)=>(
                        <div class="carousel-item" style={{height:"450px"}}>
                            <img class="w-100 " style={{height:"450px",objectFit:"cover",filter:"brightness(60%)"}} src={"../.././upload/"+item.slide_image} alt={item.slide_image}/>
                            <div class="carousel-caption d-none d-md-block " style={{position:"absolute",top:"70%"}}>
                                <h2 className="text-white">{item.slide_title}</h2>
                                <p className="text-light">{item.slide_description}</p>
                            </div>
                        </div>
                        ))}
                    
                    </div>
                    <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                        <i class="fa fa-2x fa-angle-left text-dark"></i>
                    </a>
                    <a class="carousel-control-next " href="#product-carousel" data-slide="next">
                        <i class="fa fa-2x fa-angle-right text-dark"></i>
                    </a>
                </div>
        
                </div>
            </div>
            <div class="col-lg-4">
                <div class="product-offer mb-30" style={{height:" 200px"}}>
                    <img class="img-fluid" src="https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        {/* <a href="" class="btn btn-primary">Shop Now</a> */}
                    </div>
                </div>
                <div class="product-offer mb-30 mt-5" style={{height:" 200px"}}>
                    <img class="img-fluid" src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        {/* <a href="" class="btn btn-primary">Shop Now</a> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}
// Carousel End 
    
//  Featured Start 
function SectionTwo(){
    return(<>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding:" 30px"}}>
                    <h1 class="fa fa-check text-primary m-0 mr-3"> </h1>
                    <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding:" 30px"}}>
                    <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"> </h1>
                    <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding:" 30px"}}>
                    <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"> </h1>
                    <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding:" 30px"}}>
                    <h1 class="fa fa-phone-volume text-primary m-0 mr-3"> </h1>
                    <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
    </div>
    </>)
}
// Featured End 

//   Categories Start 
function SectionCategories(){
    // const a = [1,4,3,2,4,1,3,4,1,3,2,4]
    const [ post,setPost ] = useState([])
    useState(async()=>{
        try{
           const res = await axios.get("http://localhost:4000/posts/allcatgories/3")
            setPost(res.data)
            // console.log(res.data)
        }catch(error){
            console.log(error)
        }
    })
    return(<>
        <div class="container-fluid pt-5">
            <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Categories</span></h2>
            <div class="row px-xl-5 pb-3">
                {post.map((item)=>(
                <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <Link class="text-decoration-none" to={"/shop/"+item.cat_id}>
                        <div class="cat-item d-flex align-items-center mb-4">
                            <div class="overflow-hidden" style={{width: "150px" ,height: "150px"}}>
                                <img class="img-fluid" style={{width: "150px" ,height: "150px",objectFit:"cover"}} src={"../.././upload/"+item.cat_image} alt=""/>
                            </div>
                            <div class="flex-fill pl-3">
                                <h6>{item.cat_name}</h6>
                                <small class="text-body">{item.cat_number}</small>
                            </div>
                        </div>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    </>)
}
//  Categories End 
      
//  Products Start 
function SectionFutureProduct(){
    // const images = [1,2,3,4,5,6,7,8]
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

    return(<>
    <div class="container-fluid pt-5 pb-3">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Featured Products</span></h2>
        <div class="row px-xl-5">
            {post.map((items)=>(
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <img class="img-fluid" style={{height:"300px",width:"100%",objectFit:"cover"}} src={"../.././upload/"+items.post_image} alt=""/>
                        <div class="product-action">
                            <Link class="btn btn-outline-dark btn-square" to={'/shopdetails/'+items.post_id}><i class="fa fa-sharp fa-solid fa-eye"></i></Link>
                          <Liker/>
                            {/* {Love()} */}
                            {/* <Link class="btn btn-outline-dark btn-square" to=""><i class="fa fa-sync-alt"></i></Link>
                            <Link class="btn btn-outline-dark btn-square" to=""><i class="fa fa-search"></i></Link> */}
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <Link class="h3 text-decoration-none text-truncate" to={'/shopdetails/'+items.post_id}>{items.post_title}</Link>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>{items.post_price}</h5><h6 class="text-muted ml-2"><del>{items.post_h_price}</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small>({items.post_id})</small>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    </>)
}
//  Products End 
// function Love(){
//     const [love,setLove] = useState(true)
//     return(<>
//  <Link class="btn btn-outline-dark btn-square" to="" onClick={()=>{setLove(!love)}}>{love? <i class="far fa-heart"></i>:<i class=" fa fa-solid fa-heart"></i>}</Link>

//     </>)
// }
// {/* <!-- Offer Start --> */}
function SectionOffers(){
    return(<>
    <div class="container-fluid pt-5 pb-3">
        <div class="row px-xl-5">
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height:" 300px"}}>
                    <img class="img-fluid" src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        {/* <a href="" class="btn btn-primary">Shop Now</a> */}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height:" 300px"}}>
                    <img class="img-fluid" src="https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=1600" alt=""/>
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">Special Offer</h3>
                        {/* <a href="" class="btn btn-primary">Shop Now</a> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>)
}
// {/* <!-- Offer End --> */}

// <!-- Vendor Start -->
function SectionVender(){
    const number = [1,2,3,4,5,6,7,8]
    return(<>
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col">
                <div class="owl-carousel vendor-carousel">
                {number.map((item)=>(
                    <div class="bg-light p-4">
                        <img src={`img/vendor-${item}.jpg`} alt={item}/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
    </>)
}
// {/* <!-- Vendor End --> */}