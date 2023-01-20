import { Link } from "react-router-dom"
export default function FooterSection(){
    return(<>
    {/* <!-- Footer Start --> */}
    <div class="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                <h5 class="text-secondary text-uppercase mb-4">Get In Touch</h5>
                {/* <p class="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p> */}
                <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>10 District, Kabul, Afghanistan</p>
                <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>ceo@logistics.af</p>
                <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+93786306600</p>
            </div>
            <div class="col-lg-8 col-md-12">
                <div class="row">
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">Quick Shop</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <Link class="text-secondary mb-2" to="/"><i class="fa fa-angle-right mr-2"></i>Home</Link>
                            <Link class="text-secondary mb-2" to="/shop"><i class="fa fa-angle-right mr-2"></i>Our Shop</Link>
                            <Link class="text-secondary mb-2" to="/about"><i class="fa fa-angle-right mr-2"></i>About Us</Link>
                            <Link class="text-secondary mb-2" to="/"><i class="fa fa-angle-right mr-2"></i>Checkout</Link>
                            <Link class="text-secondary" to="/contact"><i class="fa fa-angle-right mr-2"></i>Contact Us</Link>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        <h5 class="text-secondary text-uppercase mb-4">My Account</h5>
                        <div class="d-flex flex-column justify-content-start">
                        <Link class="text-secondary mb-2" to="/"><i class="fa fa-angle-right mr-2"></i>Facebook</Link>
                            <Link class="text-secondary mb-2" to="/shop"><i class="fa fa-angle-right mr-2"></i>Instagram</Link>
                            <Link class="text-secondary mb-2" to="/shop"><i class="fa fa-angle-right mr-2"></i>Twiter</Link>
                            <Link class="text-secondary mb-2" to="/"><i class="fa fa-angle-right mr-2"></i>YouTube</Link>
                            <Link class="text-secondary" to="/login"><i class="fa fa-angle-right mr-2"></i>Login</Link>
                        </div>
                    </div>
                    <div class="col-md-4 mb-5">
                        {/* <h5 class="text-secondary text-uppercase mb-4">Newsletter</h5>
                        <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p> */}
                        <form action="">
                            <div class="input-group">
                                <input type="text" class="form-control p-4 mt-1" placeholder="Your Email Address"/>
                                    <button class="btn btn-primary mt-1" >Sign Up</button>
                            </div>
                        </form>
                        <h6 class="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                        <div class="d-flex">
                            <Link class="btn btn-primary btn-square mr-2" href="#"><i class="fab fa-twitter"></i></Link>
                            <Link class="btn btn-primary btn-square mr-2" href="#"><i class="fab fa-facebook-f"></i></Link>
                            <Link class="btn btn-primary btn-square mr-2" href="#"><i class="fab fa-linkedin-in"></i></Link>
                            <Link class="btn btn-primary btn-square" href="#"><i class="fab fa-instagram"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-top mx-xl-5 py-4" style={{borderColor:"rgba(256, 256, 256, .1) !important"}}>
            {/* <div class="col-md-6 px-xl-0"> */}
                <p class="mb-md-0 text-center text-md-left text-secondary">
                    &copy; <a class="text-primary" href="https://hamza-nawabi.netlify.app">Nawabi</a> All Rights Reserved. Designed
                    by Hamza Nawabi
                    <a class="text-primary" href="mailto:h.nawabi007@gmail.com">&nbsp;h.nawabi007@gmail.com</a>
                </p>
            {/* </div> */}
            {/* <div class="col-md-6 px-xl-0 text-center text-md-right">
                <img class="img-fluid" src="img/payments.png" alt=""/>
            </div> */}
        </div>
    </div>
    {/* <!-- Footer End --> */}
    {/* <!-- Back to Top --> */}

    </>)
}