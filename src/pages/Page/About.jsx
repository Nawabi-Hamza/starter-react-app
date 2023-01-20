import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"

function AboutSection(){
    return(<>
    <div className="container-fluid-lg p-4">
        
            {Top()}
            
        
        <div>
            {OurTeam()}
        </div>
    </div>
    </>)
}
export default AboutSection;
const AboutImage = {
    height:"500px",
    width:"100%",
    objectFit:"cover",
    boxShadow:"2px 2px 41px black",
    filter:"brightness(80%)",
    borderRadius:"12px"
    }
function Top(){
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
        style={AboutImage} alt="" />
    </div>
    <div className="col-lg-6 my-3">
        <h1 className="display-3">About Us</h1>
        <p className="h3 text-muted" style={{textAlign:"justify"}}>{items.about_description}</p>
    </div>
        </div>
    ))}
    </>
    )
}

const imageUserStyle = {
    width:"100%",
    height:"250px",
    borderRadius:"12px 12px 0px 0px",
    objectFit:"cover"
    }
const cardStyle = {
    borderRadius:"12px",
    boxShadow:"2px 2px 41px black",
    height:"450px"
}
function OurTeam(){
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
    // console.log(showTeam)
    return(<>
    <hr />
    <center>
        <h1 className="display-2 fw-bolder mt-5">Our Team</h1>
    </center>
    <div className="row my-5 gap-4">
        {showTeam.map((item)=>(
        <div className="col-12 col-sm-6 col-md-4 my-3" >
            <div className="card cardUserAbout" style={cardStyle}>
                <img src={"../upload/"+item.staff_image}  style={imageUserStyle} alt={item.staff_image} />
                <div className="card-item p-3">
                    <h3>Name: {item.staff_name}</h3>
                    <h5>Job: {item.staff_position}</h5>
                    <p>{item.staff_description}</p>
                </div>
            </div>
        </div>
        ))}
    </div>
    </>)
}