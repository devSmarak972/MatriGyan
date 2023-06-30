
import React from 'react'
import { useEffect } from 'react'
import Navbar from '../components/LandingPage/Navbar'
import Stats from '../components/LandingPage/Stats'
import Home from '../components/LandingPage/Home'
import Category from '../components/LandingPage/Category'
import Info from '../components/LandingPage/Info'
import Instructors from '../components/LandingPage/Instructors'
import Courses from '../components/LandingPage/Courses'
// import '../components/LandingPage/assets/css/bootstrap.min.css';
// import '../components/LandingPage/assets/css/owl.carousel.min.css';
// import '../components/LandingPage/assets/css/owl.theme.default.min.css';
// import '../components/LandingPage/assets/css/style.css';
import 'font-awesome/css/font-awesome.min.css';

// import AOS from 'aos';
// import 'aos/dist/aos.css';
import Point from '../components/LandingPage/Point'
import Footer from '../components/LandingPage/Footer'

const LandingPage = () => {
  
  // useEffect(() => {
  //   AOS.init();
  // }, []);
// import 

  return (
    <div className="main-wrapper" id="landingpage">
           <Navbar></Navbar>
           <Home></Home>
           <Stats></Stats>
           <Category></Category>
           <Courses></Courses>
           <Info></Info>
           <Instructors></Instructors>
           <Point></Point>
           <Footer></Footer>
    </div>
  )
}

export default LandingPage