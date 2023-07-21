
import React, { useEffect,useRef, useState } from 'react'
import Header from '../components/Courses/Header'
import Courses from '../components/Courses/Courses'
import './CoursePage/css/material-icons.css'
import './CoursePage/css/app.css'
import "../components/Courses/transition.css";
import Sidebar from '../components/StudentDashboard/Sidebar'
import axios from 'axios'
// import courseData from "../components/Courses/Details.json";
import Backdrop from "../components/Courses/Backdrop";

import Filters from "../components/Courses/Filters";
import { getUser } from '../utils/getUser'
function CoursePage() {
  const [isActive, setActive] = useState(false);
  const user=useRef(false);
  useEffect(()=>{
    (async () => {
       user.current=await getUser();
      
    })();
   
    
  },[])

  const handleclick = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isActive]);

  const [courses,setData] = useState([]);

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/get-courses/")
    .then((res)=>{
      console.log("Data recieved");
      console.log(res.data.data);
      setData(res.data.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  // if(courses.length==0){
  //   return null;
  // }

  return (
    <div className="page-section tw-page">
      <Sidebar></Sidebar>
      <div className="container page__container pt-6">
         {(courses && courses.length!==0)?
         <>
          <Header onButtonClick={handleclick}></Header>
          <Courses title="All Courses" courses={courses}></Courses>
          <Courses title="Recent Courses" courses={courses}></Courses>
          <Courses title="Popular Courses" courses={courses}></Courses></>
:<p className="m-auto p-3">Loading ...</p>}
      </div>
      <Backdrop isActive={isActive} onButtonClick={handleclick}></Backdrop>
      <Filters isActive={isActive}></Filters>
    </div>
  );
}

export default CoursePage;
