import React from 'react'
import Preview from '../components/CoursePreview/CoursePreview'
import './CoursePage/css/app.css'
function CoursePreview(props) {
  return (
    <Preview user={props.user}></Preview>
  )
}

export default CoursePreview
