
import React, { useEffect, useState } from 'react'
import Header from '../components/Courses/Header'
import Courses from '../components/Courses/Courses'
import './CoursePage/css/material-icons.css'
import './CoursePage/css/app.css'
import "../components/Courses/transition.css";
import Sidebar from '../components/StudentDashboard/Sidebar'
import axios from 'axios'
import courseData from "../components/Courses/Details.json";
import Backdrop from "../components/Courses/Backdrop";

import Filters from "../components/Courses/Filters";

function CoursePage() {

  const [data,setData] = useState([]);
   const [isActive, setActive] = useState(false);
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
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/get-courses/')
    .then((res)=>{
      console.log("Data recieved!");
      setData(res.data);
      console.log("Data set successfuly!");
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])


  return (
    <div className="page-section tw-page">
      <Sidebar></Sidebar>
      <div className="container page__container pt-6">

          <Header onButtonClick={handleclick}></Header>
          <Courses title="Popular Courses" courses={data}></Courses>
          <Courses title="Development Courses" courses={data}></Courses>
          <Courses title="Desgin Courses" courses={data}></Courses>

      </div>
      <Backdrop isActive={isActive} onButtonClick={handleclick}></Backdrop>
      <Filters isActive={isActive}></Filters>
    </div>
  );
}

export default CoursePage;
