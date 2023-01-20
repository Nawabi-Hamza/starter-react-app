import { useState } from "react"
import { Link } from "react-router-dom"

export default function Liker(){
     const [love,setLove] = useState(true)
     return(<>
    <Link class="btn btn-outline-dark btn-square" to="" onClick={()=>{setLove(!love)}}>{love? <i class="far fa-heart"></i>:<i class=" fa fa-solid fa-heart"></i>}</Link>
    </>)
} 