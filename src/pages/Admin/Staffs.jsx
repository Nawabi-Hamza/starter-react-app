import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavBar } from "./HomeDash";
import LoginUser from "./Login";
import axios from "axios"


export default function Staffs(){
    const { currentUser } = useContext(AuthContext)
    return( currentUser?
        <>
        <NavBar/>
        <div className="container-md">
        <div className="row">
            <div className="col-md-6 my-3">
                {CreateStaff()}
            </div>
            <div className="col-md-6 my-3">
                {ShowStaff()}
            </div>
        </div>
            <h1>Update About Section</h1>
        <div className="row">
            <div className="col-md-6">
                {CreateAbout()}
            </div>
            <div className="col-md-6">
                {ShowAbout()}
            </div>
        </div>
        </div>
        </>
        :
        <LoginUser/>)
}


function ShowStaff(){
    const { currentUser } = useContext(AuthContext)
    const [ showTeam ,setShowTeam ] = useState([])
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const res = await axios.get("http://localhost:4000/posts/staff/show")
                setShowTeam(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
        
    })
    //  ====================================delete staff=========================
    const deleteStaff =  async(staffId)=>{
        try{
            // alert(e)
            await axios.delete(`http://localhost:4000/posts/staff/delete/${staffId}`)
            alert("Staff Deleted...")
        }catch(error){
            console.log(error)
        }
    }
    // var postStaffId = staffId
        
    return(<>
   <b>Show Staff</b> 
   <div style={{height:'400px',overflow:"scroll",padding:"8px"}}>
        {showTeam.map((item)=>(
            <div className="row my-2">
                <div className="col-sm-5">
                    <img src={"../upload/"+item.staff_image} style={{width:"100%" , height:"150px" , objectFit:"cover"}} alt="" />
                </div>
                <div className="col-sm-7">
                    <div style={{display:"flex"}} className="justify-content-between mt-2">
                    <h2>{item.staff_name}</h2>
                    {currentUser.user_id===1 ?
                    <div className="ml-4">
                        {/* <button className="btn-sm btn-warning" onClick={()=> {}}>Edite</button> */}
                        <button className="btn-sm btn-danger" onClick={()=>deleteStaff(item.staff_id)}>Delete</button>
                    </div>
                    :
                    null
                    }
                    </div>
                    <b>{item.staff_position}</b>
                    <p>{item.staff_description}</p>
                </div>
            </div>
        ))}
   </div>
    </>)
}


function CreateStaff(){
    // console.log(sss)
    const [ name,setName ] = useState("")
    const [ posistion,setPosition ] = useState("")
    const [ file,setFile ] = useState("")
    const [ descripton,setDescription ] = useState("")
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
    const handleSendStaff = async(e)=>{
        e.preventDefault()
        try{
            const imgUrl =  await upload()
         await axios.post("http://localhost:4000/posts/staff/post",{
                staff_name:name,
                staff_position:posistion,
                staff_description:descripton,
                staff_image:file? imgUrl:""
            })
            setName("")
            setPosition("")
            setFile("") 
            setDescription("")
            alert("New Staff Added...")
        }catch(error){
            console.log(error)
        }
    }
    return(<>
    {/* <h1>{sss}</h1> */}
    <b>Create New Staff</b> 
    <form action="">       
        <input type="text" placeholder="Staff Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="Staff Posistion" className="form-control my-3" onChange={(e)=>setPosition(e.target.value)}/>
        <input type="file" placeholder="Staff Image" className="form-control" onChange={(e)=>setFile(e.target.files[0])}/>
        <textarea type="text" placeholder="Staff Description" rows={6} className="form-control my-3" onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button className="btn btn-warning form-control" onClick={handleSendStaff}>Add To New Staff</button>
        <div className="my-3">{file && <img src={URL.createObjectURL(file)} style={{objectFit:"cover",height:"300px",width:"99%"}} alt={file}/>}</div>

    </form>
    </>)
}

// update About

function ShowAbout(){
    const [ show,setShow ] = useState([])
    const TakeData = async()=>{
        try{
            const res = await axios.get("http://localhost:4000/mycate/about")
            setShow(res.data)
        }catch(error){
            console.log(error)

        }
    }
    TakeData()
    return(
    <>
    {show.map((items)=>(
        <div className="row">
    <div className="col-lg-6 my-3">
        <img src={"./upload/"+items.about_image} 
        style={{width:"100%",height:"300px"}} alt="" />
    </div>
    <div className="col-lg-6 my-3">
        <p className="span text-muted" style={{textAlign:"justify"}}>{items.about_description}</p>
    </div>
        </div>
    ))}
    </>
    )
}

function CreateAbout(){
    const [ file,setFile ] = useState(null)
    const [ desc,setDesc ] = useState()
    // const [ show,setShow ] = useState([])
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
    const handleUpdatePost = async(e)=>{
        e.preventDefault()
    try{
        const imgUrl =  await upload()
        const dataUser = {
          about_image:file? imgUrl:"",
          about_description:desc   
      
        }
        const res = await axios.patch(`http://localhost:4000/mycate/about/1`,dataUser)
        console.log(res)
        alert("About updated...")
  }catch(error){
    console.log(error)
  }
}
return(<>
    <div>
        <input type="file" className="form-control" onChange={(e)=>setFile(e.target.files[0])}/>
        <textarea type="text" rows={7} placeholder="Your Description" className="form-control my-3" onChange={(e)=>setDesc(e.target.value)}></textarea>
        <button className="form-control btn btn-primary" onClick={handleUpdatePost}>Update About</button>
    </div>
    </>)
}