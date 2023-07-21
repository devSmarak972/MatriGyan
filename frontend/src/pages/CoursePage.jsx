
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

  const getCourses = async ()=>{
    try{
      const res = await axios.get("http://127.0.0.1:8000/get-courses/");
      console.log(res.data);
      const data = res.data;
      if(data.success){
        setData(data.data);
      }
    } catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getCourses();
  },[])


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
