import React from 'react'
import Header from '../components/Courses/Header'
import Courses from '../components/Courses/Courses'
import './CoursePage/css/material-icons.css'
import './CoursePage/css/app.css'
import '../components/Courses/transition.css'
import Sidebar from '../components/StudentDashboard/Sidebar'
import Filters from '../components/Courses/Filters'
import Backdrop from '../components/Courses/Backdrop'
import { useState } from 'react'
import { useEffect } from 'react'

function CoursePage() {
  const [isActive, setActive] = useState(false);
  const handleclick = () => {
      setActive(!isActive);
    
  };
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isActive]);
  return (
    <div className="page-section tw-page">
      <Sidebar></Sidebar>
      <div className="container page__container pt-6">
          <Header onButtonClick={handleclick}></Header>
          <Courses title="Popular Courses"></Courses>
          <Courses title="Development Courses"></Courses>
          <Courses title="Desgin Courses"></Courses>
      </div>
      <Backdrop isActive={isActive} onButtonClick={handleclick}></Backdrop>
      <Filters isActive={isActive}></Filters>
    </div>
  )
}

export default CoursePage
