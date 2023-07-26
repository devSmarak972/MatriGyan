import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Courses/Header";
import Courses from "../components/Courses/Courses";
import "./CoursePage/css/material-icons.css";
import "./CoursePage/css/app.css";
import "../components/Courses/transition.css";
import Sidebar from "../components/StudentDashboard/Sidebar";
import axios from "axios";
// import courseData from "../components/Courses/Details.json";
import Backdrop from "../components/Courses/Backdrop";

import Filters from "../components/Courses/Filters";
import { getUser } from "../utils/getUser";
function CoursePage(props) {
  const [isActive, setActive] = useState(false);
  const user = useRef(false);
  useEffect(() => {
    (async () => {
      user.current = await getUser();
    })();
  }, []);

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

  const [courses, setData] = useState(false);


  const getCourses = async ()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-courses/`,{withCredentials:true});
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
      <Sidebar user={props.user} tab={1} />
      <div className="container page__container pt-6">
        {courses  ? (
          <>
            <Header onButtonClick={handleclick} user={props.user}></Header>
            <Courses title="All Courses" courses={courses}></Courses>
            <Courses title="Recent Courses" courses={courses}></Courses>
            <Courses title="Popular Courses" courses={courses}></Courses>
          </>
        ) : (( Array.isArray(courses))?<h5 className="text-muted">No courses available right now</h5>:(
          <p className="m-auto p-3">Loading ...</p>)
        )}
      </div>
      <Backdrop isActive={isActive} onButtonClick={handleclick}></Backdrop>
      <Filters isActive={isActive}></Filters>
    </div>
  );
}

export default CoursePage;
