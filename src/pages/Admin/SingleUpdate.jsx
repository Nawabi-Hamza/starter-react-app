import { useLocation,useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext,useState } from "react"
import axios from "axios"
import { NavBar } from "./HomeDash"
// import { useEffect } from "react"
function HomeDashboardUpdate(){
    return(<>
    <NavBar/>
    <div className="container-fluid">
     <div className="container-md">
        <div className="row">
          {/* {WriteAPost()} */}
          {UpdateSinglePost()}
        </div>
     </div>
    </div>
    </>)
}
export default HomeDashboardUpdate;

function UpdateSinglePost(){
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
 
// ===============Edite Post====================
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
    const state = useLocation().state
    const [ file ,setFile ] = useState(null)
    const [ title,setTitle ] = useState(state?.post_title || '')
    // console.log(title)
    const [ description,setDescription ] = useState(state?.post_description || '')
    const [ price,setPrice ] = useState(state?.post_price || '')
    const [ catgories,setCatgories ] = useState()
   

      const handleUpdatePost = async(e)=>{
        e.preventDefault()
    try{
        const imgUrl =  await upload()
        const dataUser = {
          post_image:file? imgUrl:"",
          post_title:title,    
          post_description:description,
          post_price:price,
          user_id:currentUser.user_id,
          posts_catgories:catgories
        }
        const res = await axios.patch(`http://localhost:4000/posts/single/${state.post_id}`,dataUser)
        console.log(res)
        alert("post updated...")
        navigate('/dashboard')
  }catch(error){
    console.log(error)
  }
}
  // console.log(dataUser)
// =================show cates for dropdown
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
        // console.log(catgories) 
    return( 
      <>
    
    <>
    <div className="container-md">
      <div className="row">            
  <div className="col-md-6">
            <span id="show"></span>
        Create Posts
        <form action="">
        <input type="file" name="post_image" className="form-control"   onChange={(e)=>setFile(e.target.files[0])}/>
        
        <input type="text" name="post_title" className="form-control" value={title}   onChange={(e)=>setTitle(e.target.value)} />
        <textarea type="text" name="post_description" className="form-control" rows={4} value={description}   onChange={(e)=>setDescription(e.target.value)}></textarea>
        <div className="row">
            <div className="col-6">
            {/* <input type="text" name="product_catgories" className="form-control" placeholder={post.product_catgories} onChange={(e)=>setFile(e.target.value)} /> */}
            <select className="form-select form-control" name="posts_catgories" onChange={(e)=>setCatgories(e.target.value)} >
                    <option   className="form-control" placeholder="Categories" >Categories</option>
                    {cates.map((item)=>(
                      <option   className="form-control" value={item.cat_id}>{item.cat_name}</option> 
                    ))}
                </select>
            </div>
            <div className="col-6">         
            <input type="text" name="post_price" className="form-control" value={price}  onChange={(e)=>setPrice(e.target.value)} />
            </div>
        </div>
        <button className="btn btn-warning form-control" onClick={handleUpdatePost}>update</button>
        </form>
    </div>
    <div className="col-md-6">
    <div id="tempImg">{file && <img src={URL.createObjectURL(file)} style={{marginLeft:"20px",height:"170px",width:"200px"}} alt={file}/>}</div>
    </div>

      </div>
  </div>
    </>
      </>
)}
