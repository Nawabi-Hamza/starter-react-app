import NavFooterPage from "./NavFooter/NavPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./Page/Home";
import ShopPage from "./Page/Shop";
import ShopDetailsPage from "./Page/ShopDetails";
import ContactPage from "./Page/Contact";
// import Login from "./Page/Login";
import LoginUser from "./Admin/Login";
import DashboardPage from "./Admin/Dashboard";
import AllPostShowEdite from "./Admin/AllPosts";
import UsersShow from "./Admin/User";
import SlideShow from "./Admin/SlideShow";
import SinglePost from "./Admin/Single";
import AboutSection from "./Page/About";
import Staffs from "./Admin/Staffs";
import HomeDashboardUpdate from "./Admin/SingleUpdate";
 
export default function RouterAllPage(){
    return(<>

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<NavFooterPage/>}>
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="" element={<HomePage/>} /> */}
        <Route path="/shop" element={<ShopPage/>} />
        <Route path="/shop/:id" element={<ShopPage/>} />
        <Route path="/shopdetails/:id" element={<ShopDetailsPage/>}/>
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about" element={<AboutSection/>} />
        </Route>           
        <Route path="/login" element={<LoginUser/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/allposts" element={<AllPostShowEdite/>} />
        <Route path="/users" element={<UsersShow/>} />
        <Route path="/slideshow" element={<SlideShow/>} />
        <Route path="/singlepost/:id" element={<SinglePost/>} />
        <Route path="/singlepostupdate/:id" element={<HomeDashboardUpdate/>} />
        <Route path="/staffs" element={<Staffs />} />
    </Routes>
    </BrowserRouter>
    
    </>)
 }
 