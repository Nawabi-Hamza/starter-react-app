import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavBar } from "./HomeDash";
import LoginUser from "./Login";
import axios from "axios";

function UsersShow(){
    const { currentUser } = useContext(AuthContext)
    return(<>
    {currentUser?
    <>
    <NavBar/>
    {UsersIn()}
     </> 
     :<LoginUser/>
    }
    </>)
}
export default UsersShow;

function UsersIn(){
    // edite user 
    const [id,setId] = useState()
    const [ nameup,setNameup ] = useState()
    const [ emailup,setEmailup ] = useState()
    const [ typeup,setTypeup ] = useState()
    const [ passwordup,setPasswordup ] = useState()
    const a = nameup + emailup + typeup + passwordup

    const { currentUser } = useContext(AuthContext)
    const [ show,setShow ] = useState(false)
    // show all user from api
    const [ user,setUser ] = useState([])
    useEffect(()=>{
        const handleFetch = async()=>{
            try{
                const res = await axios.get("http://localhost:4000/auth/users")
                setUser(res.data)
            }catch(error){
                console.log(error)
            }
        }
        handleFetch()
    },[user])

// create user
        // show inputs
    const handleShow = ()=>{
        setId("")
        setNameup("")
        setEmailup("")
        setTypeup("")
        setPasswordup("")
        setShow(!show)
        // create(!update)

    }
        // take value of inputs
    const [ inputs,setInputs ] = useState({
        user_name:"",
        user_email:"",
        user_type:"",
        user_password:""
    })
        const handleSet = (e)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
        }
        // send user information to api
        const handleCreate = async(e)=>{
           e.preventDefault()
            try{
                 await axios.post(`http://localhost:4000/auth/register`,inputs)
                setShow(!show)
                alert("User Added")
                // console.log(res)
                
            }catch(error){
                console.log(error)
            }
        }
//  Edite User
      console.log(id)
        const [ update,create ] = useState()
        const handleEdite =async()=>{
            create(!update)
            try{
               await axios.patch(`http://localhost:4000/auth/users/${id}`,inputs)
               setShow(!show)
               alert("user updated")
           }catch(error){
               console.log(error)
           }

       }
  // Delete User

    //    console.log
    return(<>
    <div className="container-fluid">
        <div className="container-md"style={{overflow:"scroll"}}>
            <span style={{display:"none"}}>{a}</span>
             In Here You Can Add Remove Or Eddite A User &nbsp;
             {currentUser.user_type==="admin" && (
                <button type="button" class="btn btn-primary my-1" onClick={handleShow}>
                Create New User
              </button>
             )}
            <table className="table table-hover resposive navbar-expand" >
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {show?
                    <tr id="tableInput">
                        
                        <td>{update? id:null}</td>
                        <td><input type="text"className="form-control"  name="user_name" placeholder="User Name" onChange={handleSet} /></td>
                        <td><input type="text"className="form-control"  name="user_email" placeholder="User Email" onChange={handleSet} /></td>
                        <td><select name="user_type" id="" onChange={handleSet} className="form-control">
                            <option value="user">Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                            {/* <input type="text"className="form-control"  name="user_type" placeholder="Type User"  /> */}
                        <button className="btn btn-danger form-control" onClick={handleShow}>Cancel</button>
                        </td>
                        <td><input type="text"className="form-control"  name="user_password" placeholder="User Password" onChange={handleSet} />
                        {update?
                        <button className="btn btn-primary form-control" onClick={handleEdite}>Update</button>
                        :
                        <button className="btn btn-primary form-control" onClick={handleCreate}>Create</button>
                             }
                        </td>
                       
                    </tr>:null
                    }
                  {user.map((item)=>(
                  <tr>
                    <td>{item.user_id}</td>
                    <td><b>{item.user_name}</b></td>
                    <td>{item.user_email}</td>
                    <td>{item.user_type}</td>
                        {currentUser.user_type==="admin" && (
                    <td>
                            <button className="btn btn-primary" onClick={()=>{
                                setId(item.user_id)
                                setNameup(item.user_name)
                                setEmailup(item.user_email)
                                setTypeup(item.user_type)
                                // setPasswordup()
                                setShow(!show)
                                create(!update)

                            }}>Edite</button>
                          
                            <button className="btn btn-danger" onClick={async()=>{
                                try{
                                    await axios.delete(`http://localhost:4000/auth/users/${item.user_id}`)
                                    alert("user removed")
                                }catch(error){
                                    console.log(error)
                                }
                            }}>Delete</button>
                    </td>
                        )}
                    </tr>
                  ))}  
                </tbody>
            </table>
        </div>
    </div>
    </>)
}
