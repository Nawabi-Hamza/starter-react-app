import axios from "axios";
import { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NavBar } from "./HomeDash";
import LoginUser from "./Login";



function SlideShow(){
    const { currentUser } = useContext(AuthContext)
    return(
    currentUser?
    <>
    <NavBar/>
    {CatgoriesSection()}
    <hr/>
    {/* {CompanySection()}
    <hr/> */}
    {SlideShowSection()}
    </>:
    <LoginUser/>
    )
}
export default SlideShow; 

function CatgoriesSection(){
    const navigate = useNavigate()
    //  find All Categories From API
    const [ show,setShow ] = useState([])
    useEffect(()=>{
        const find = async()=>{
            try{
                const res = await axios.get("http://localhost:4000/mycate/showcate")
                setShow(res.data)
            }catch(error){
                console.log(error)
            }
        }
        find()
    })

    //  create categories 
const [ cname,setCname ] = useState("")
const [ cimage,setCimage ] = useState(null)
        const upload = async()=>{
            // e.preventDefault()
            try{
                const formData = new FormData();
                formData.append("file",cimage)
                const res = await axios.post("http://localhost:4000/upload",formData)
                return res.data;
            }catch(error){
                console.log(error)
            }
            }
            const handleSend = async(e)=>{
                e.preventDefault()
                const imgUrl = await upload()
            try{
               await axios.post("http://localhost:4000/mycate/showcate",{
                    cat_name:cname,
                    cat_image:cimage? imgUrl:""
                },()=>{
                    alert("categorie created successfuly...")
                    navigate('/dashboard')
                })
            }catch(error){
                console.log(error)
            }
        }

        // const [ id,setId ] = useState()
    // Delete  Categories
    
    return(<>
    <div className="container-fluid my-3">
    <div className="container-md">
        <h1>Categories</h1>
        <div className="row">
            <div className="col-md-6">
              <h5>Create New Categories:</h5>
                <form action="">
                <input type="text" className="form-control" placeholder="Categories Name" onChange={(e)=>setCname(e.target.value)}/>
                <input type="file" className="form-control" placeholder="Categories Image" onChange={(e)=>setCimage(e.target.files[0])}/>
                <button className="btn btn-primary form-control mb-4" onClick={handleSend}>Add Categories</button>
        <div id="tempImg w-50">{cimage && <img src={URL.createObjectURL(cimage)} style={{width:"400px"}} alt={cimage}/>}</div>

                </form>
            </div>
            <div className="col-md-6 table-responsive" style={{height:"400px",overflow:"scroll"}}>
            <h5>All Categories</h5>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <td>#ID</td>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {show.map((item)=>(
                        <tr>
                            <td>{item.cat_id}</td>
                            <td><img src={"../.././upload/"+item.cat_image} style={{width:"60px",height:"45px",objectFit:"cover"}} alt="" /></td>
                            <td>{item.cat_name}</td>
                            <td><button className="btn btn-danger form-conrol" onClick={async(e)=>{
                                    e.preventDefault()
                                    try{
                                        // console.log(item.cat_id)
                                        await axios.delete(`http://localhost:4000/mycate/showcate/${item.cat_id}`)
                                        alert("Categories Deleted Successfuly...")
                                    }catch(error){
                                        console.log(error)
                                        alert("Please First Delete All Post Of This Categories ....")
                                    }
                                    
                            }}>Delete</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
    </>
    )
}

function SlideShowSection(){
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
    // console.log(post)
    // create slide show
    const [ stitle,setTitle ] = useState("")
    const [ sdesc,setDesc ] = useState("")
    const [ simage,setImage ] = useState(null)
    const navigate = useNavigate()
        const upload = async()=>{
            // e.preventDefault()
            try{
                const formData = new FormData();
                formData.append("file",simage)
                const res = await axios.post("http://localhost:4000/upload",formData)
                return res.data;
            }catch(error){
                console.log(error)
            }
            }
            const handleSend = async(e)=>{
                e.preventDefault()
                const imgUrl = await upload()
            try{
               await axios.post("http://localhost:4000/mycate/showslide",{
                    slide_title:stitle,
                    slide_description:sdesc,
                    slide_image:simage? imgUrl:""
                },()=>{
                    alert("Slide Show Added successfuly...")
                    navigate('/')

                })
            }catch(error){
                console.log(error)
            }
        }
        // console.log(stitle)
        // console.log(sdesc)
        // console.log(simage)
    return(<>
        <div className="container-fluid my-5">
      <div className="container-md">
          <h1>Slide Show</h1>
          <div className="row">
              <div className="col-md-6">
                <h5>Create New SlideShow:</h5>
                  <form action="">
                  <input type="file" className="form-control" placeholder="Slide Image" onChange={(e)=> setImage(e.target.files[0])}/>
                  <input type="text" className="form-control" placeholder="Slide Tilte" onChange={(e)=> setTitle(e.target.value)}/>
                  <textarea type="text" className="form-control" rows="7" placeholder="Slide Description" onChange={(e)=> setDesc(e.target.value)}></textarea>
                  <button className="btn btn-primary form-control" onClick={handleSend}>Add SlideShow</button>
                  </form>
        <div id="tempImg w-50">{simage && <img src={URL.createObjectURL(simage)} style={{width:"400px"}} alt={simage}/>}</div>

              </div>
              <div className="col-md-6 table-responsive" style={{height:"400px",overflow:"scroll"}}>
              <h5>All SlideShow</h5>
                  <table className="table table-striped" >
                      <thead>
                          <tr>
                              <td>Image</td>
                              <td>Title</td>
                              <td>Description</td>
                              <td>Action</td>
                          </tr>
                      </thead>
                      <tbody>
                        {post.map((item)=>(
                          <tr>
                              <td><img src={"../.././upload/"+item.slide_image} style={{width:"120px",height:"90px",objectFit:"cover"}} alt={item.slide_image}/></td>
                              <td>{item.slide_title}</td>
                              <td>{item.slide_description}</td>
                              <td><button className="btn btn-danger form-conrol" onClick={async(e)=>{
                                    e.preventDefault()
                                    try{
                                        // console.log(item.cat_id)
                                        await axios.delete(`http://localhost:4000/mycate/showslide/${item.slide_id}`)
                                        alert("Slide Show Deleted Successfuly...")
                                    }catch(error){
                                        console.log(error)
                                        // alert("Please First Delete All Post Of This Categories ....")
                                    }
                                    
                            }}>Delete</button></td>
                          </tr>
                        ))}
                         
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
      </div>
      </>)
}