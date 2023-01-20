
import {useState} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
export default function ContactPage(){
    return(<>
    {SectionOneBreadcrumb()}
    {SectionTwoContactStart()}
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
                    <span class="breadcrumb-item active">Contact</span>
                </nav>
            </div>
        </div>
    </div>

    </>)
}
// <!-- Breadcrumb End -->

// <!-- Contact Start -->
function SectionTwoContactStart(){
    const navigate = useNavigate()
    const [input,setInput] = useState({
        name:"",
        email:"",
        subject:"",
        message:"" 
      })
      const handlChange = (e)=>{
        setInput((prev)=>({...prev,[e.target.id] : e.target.value}))
      }
    //   console.log(input)
      const handleSubmit = async(e)=>{
            document.getElementById("success").style="border:1px solid yellow; margin:10px; border-radius:12px;color:black;"
            document.getElementById("success").innerHTML= "Your Message Is In Sending Please Waite ...."
        e.preventDefault()
        try{
          await axios.post("http://localhost:4000/contactMail",input)
        //   alert("We Recieve Your Email : "+input.name)
            document.getElementById("success").style="border:1px solid green; margin:10px; border-radius:12px;color:green;"
          document.getElementById("success").innerHTML= "We Recieve Your Message ❤❤❤"
            setTimeout(()=>{
                 document.getElementById("success").innerHTML= ""
                document.getElementById("success").style=""
                navigate("/")
            },5000)
            // alert("Your Email Send it Successfuly...")
        
        }catch(error){
          console.log(error)
          document.getElementById("success").style="border:1px solid red; margin:10px; border-radius:12px;color:red;"
            document.getElementById("success").innerHTML= "Your Message did not send  please Try Agian !"
        //   alert("Please Try Again")
        }
    
    
      }
    //   console.log(input)
    return(<>
    <div class="container-fluid">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Contact Us</span></h2>
        <div class="row px-xl-5">
            <div class="col-lg-7 mb-5">
                <div class="contact-form bg-light p-30">
                    <div id="success" className="p-3 bg-light"></div>
                    <form name="sentMessage" id="contactForm" novalidate="novalidate">
                        <div class="control-group">
                            <input type="text" class="form-control" id="name" placeholder="Your Name"
                                required="required" data-validation-required-message="Please enter your name"  onChange={handlChange}/>
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="email" class="form-control" id="email" placeholder="Your Email"
                                required="required" data-validation-required-message="Please enter your email"  onChange={handlChange}/>
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="text" class="form-control" id="subject" placeholder="Subject"
                                required="required" data-validation-required-message="Please enter a subject"  onChange={handlChange}/>
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <textarea class="form-control" rows="8" id="message" placeholder="Message"
                                required="required" onChange={handlChange}
                                data-validation-required-message="Please enter your message"></textarea>
                            <p class="help-block text-danger"></p>
                        </div>
                        <div>
                            <button class="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton" onClick={handleSubmit}>Send
                                Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-5 mb-5">
                <div class="bg-light p-30 mb-30">
                    <iframe style={{width: "100%" ,height: "314px",border: 0}} title="title"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=qalay fatullah&amp;t=k&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
                <div class="bg-light p-30 mb-3">
                    <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>10 District, Kabul, Afghanistan</p>
                    <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>ceo@logistics.af</p>
                    <p class="mb-2"><i class="fa fa-phone-alt text-primary mr-3"></i>+93 786306600</p>
                </div>
            </div>
        </div>
    </div>
    </>)
}
// <!-- Contact End -->