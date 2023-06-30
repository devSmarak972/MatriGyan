import React from 'react'
import Header from '../components/Courses/Header'
import Courses from '../components/Courses/Courses'
import './CoursePage/css/material-icons.css'
import './CoursePage/css/app.css'
import Sidebar from '../components/StudentDashboard/Sidebar'

function CoursePage() {
  return (
    <div className="page-section tw-page">
      <Sidebar></Sidebar>
      <div className="container page__container pt-6">
          <Header></Header>
          <Courses title="Popular Courses"></Courses>
          <Courses title="Development Courses"></Courses>
          <Courses title="Desgin Courses"></Courses>
      </div>

    </div>
  )
}

export default CoursePage
