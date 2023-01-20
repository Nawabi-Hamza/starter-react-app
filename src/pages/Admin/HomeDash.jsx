import { Link,useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext,useState,useEffect } from "react"
import axios from "axios"
// import { useEffect } from "react"
function HomeDashboard(){
    return(<>
    {NavBar()}
    <div className="container-fluid">
     <div className="container-md">
        <div className="row">
          {WriteAPost()}
          {ShowAllPost()}
        </div>
     </div>
    </div>
    </>)
}
export default HomeDashboard;

//  navbar all dashboard page
export function NavBar(){
    const { logout } = useContext(AuthContext)

        // logoutUser 
        const handleLogout = ()=>{
            logout()
        }
    const location = useLocation()
    const AllCateGories = {
        Dresess:["Sportwear","Blazers","Jackets","nawabi"],
        Computer:["Dell","HP","Mac"],
        Names:["Hamza","Elays","Noori"]
    }
    var why = []
    for(var key in AllCateGories){
        why.push([key])
    }
    // const mallForCategories = ['Shirts',"Jeans","sweamwear"]
    return(<>
    <div class="container-fluid bg-dark mb-30 " style={{position:"sticky",top:"0",zIndex:99}}>
        <div class="row px-xl-5">
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <Link to="/dashboard" class="text-decoration-none d-block d-lg-none">
                        <span class="h1 text-uppercase text-dark bg-light px-2">Dashboard</span>
                        {/* <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1">Logistics</span> */}
                    </Link>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <div className=" mt-3 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                            <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                            <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/>
                            </svg> &nbsp;<b style={{textTransform:"uppercase"}}>Dashboard</b> 
                            </div>
                            
                            <Link to="/" class={location.pathname==="/" ?"nav-item nav-link active":"nav-item nav-link"}>
                                Home</Link>
                            <Link to="/dashboard" class={location.pathname==="/dashboard" ?"nav-item nav-link active":"nav-item nav-link"}>Write</Link>
                            <Link to="/allposts" class={location.pathname==="/allposts" ?"nav-item nav-link active":"nav-item nav-link"}>Posts</Link>
                            <Link to="/users" class={location.pathname==="/users" ?"nav-item nav-link active":"nav-item nav-link"}>Users</Link>
                            <Link to="/staffs" class={location.pathname==="/staffs" ?"nav-item nav-link active":"nav-item nav-link"}>Staffs</Link>
                            <Link to="/slideshow" class={location.pathname==="/slideshow" ?"nav-item nav-link active":"nav-item nav-link"}>More..</Link>
                            {/* <Link to="/dashboard/SinglePost" class={location.pathname=="/dashboard/SinglePost" ?"nav-item nav-link active":"nav-item nav-link"}>SinglePost</Link> */}
                            <Link to="/" class="nav-item nav-link text-danger" onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>)
}

// create a post
function WriteAPost(){
    const { currentUser } = useContext(AuthContext)
    const [ file ,setFile ] = useState()
    const [ title,setTitle ] = useState()
    const [ description,setDescription ] = useState()
    const [ price,setPrice ] = useState()
    const [ catgories,setCatgories ] = useState()
    const navigate = useNavigate()
    const upload = async()=>{
        try{
          const formData = new FormData();
          formData.append("file",file)
          const res = await axios.post("http://localhost:4000/upload",formData)
          return res.data;
        }catch(error){
          console.log(error)
        }
      }
  
    
    const handleDataToDataBase = async(e)=>{
        e.preventDefault()
        const imgUrl = await upload()
        // console.log(imgUrl)
        var dataUser = {
          post_image:file? imgUrl:"",
          post_title:title,
          post_description:description,
          post_price:price,
          user_id:currentUser.user_id,
          posts_catgories:catgories
        
        //   post_image:"dkjsfnaksd",
        //   post_title:"sdlkfalsdf",
        //   post_description:"dslfjasdf",
        //   post_price:"lksdjfals",
        //   user_id:currentUser.user_id,
        //   posts_catgories:"lskdfjalksdf"
        }
            try{
                // alert("one")
                const res = await axios.post("http://localhost:4000/posts",dataUser)
                console.log(res.data)
                alert("Post Added")
                navigate('/allposts')
            }catch(error){
                console.log(error)
            }
    }    
    // ===============categories=====================
    const [cates,setCates] = useState([])
    // useEffect(()=>{
        const ShowCate = async()=>{
            // e.preventDefault() 
            try{
              const res =  await axios.get("http://localhost:4000/posts/allcatgories/1")
                setCates(res.data)
            }catch(error){
                console.log(error)
            }
        }  
        ShowCate()
     
    return(
        <div className="col-md-6">
            <span id="show"></span>
        Create Posts
        <form action="">
            <div className="d-flex">
        <input type="file" name="post_image" className="form-control w-50" placeholder="image" onChange={(e)=>setFile(e.target.files[0])}/>
        <div id="tempImg w-50">{file && <img src={URL.createObjectURL(file)} style={{marginLeft:"20px",height:"170px",width:"200px"}} alt={file}/>}</div>
            </div>
        <input type="text" name="post_title" className="form-control" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
        <textarea type="text" name="post_description" className="form-control" rows={4}  placeholder="Description"  onChange={(e)=>setDescription(e.target.value)}></textarea>
        <div className="row">
            <div className="col-6">
                <select className="form-select form-control" name="product_catgories" onChange={(e)=>setCatgories(e.target.value)} >
                    <option   className="form-control" placeholder="Categories" value={1} >Categories</option>
                    {cates.map((item)=>(
                      <option   className="form-control" value={item.cat_id} >{item.cat_name}</option> 
                    ))}
                </select>
            </div>
            <div className="col-6">
            <input type="text" name="post_price" className="form-control" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
            </div>
        </div>
        <button className="btn btn-warning form-control" onClick={handleDataToDataBase}>Post</button>
        </form>
    </div>
    )
}

// show all posts
function ShowAllPost(){
    // const images = [1,2,3,4,5,6,7,8]
     // show all posts
    const { currentUser } = useContext(AuthContext)
    const [ post,setPost ] = useState([])
     useEffect(()=>{
        const get = async()=>{
            try{
               const res = await axios.get("http://localhost:4000/posts")
                setPost(res.data)
                // console.log(res.data)
            }catch(error){
                console.log(error)
            }
        }
        get()
     })
    //  console.log(currentUser.user_id)
     
    return( 
    <div className="col-md-6 w-100 my-3" style={{overflow:"scroll" ,height:"85vh"}}>
        Show Posts
        <div class="p-xl-5 w-100">
            {post.map((items)=>(
            <div className="row">
                <div class="col-md-6 product-item bg-light mb-4">
                        <img  style={{width:"100%",height:"150px",objectFit:'cover'}} src={"../.././upload/"+items.post_image} alt=""/>
                    {currentUser.user_id===items.user_id || currentUser.user_id === 1 ?
                        <div class="product-action">
                            <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepost/${items.post_id}`} >edite</Link>
                           <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepost/${items.post_id}`}>delete</Link>
                        </div>:
                    <div class="product-action">
                    <Link class="btn btn-outline-dark btn-square p-4" to={`/singlepost/${items.post_id}`}>show</Link>
                </div>
                }
                  </div>
                    <div class="col-md-6 text-center py-4">
                        <Link class="h5 text-decoration-none text-truncate" to={`/${items.post_id}`}>{items.post_title}</Link>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>{items.price}</h5><h6 class="text-muted ml-2"><del>{items.post_h_price}</del></h6>
                        </div>
                        {/* <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div> */}
                    </div>
            </div>
            ))}
        </div>
    </div>
)}
