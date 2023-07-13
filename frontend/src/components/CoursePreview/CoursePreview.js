import React from 'react'
import Body from './Body'
import Feedb from './Feedb'
import Heading from './Heading'
import './preview.css'
import Comments from './Comments'
function CoursePreview() {
  return (
    <div className="course-preview">
    <div className='mdk-header-layout__content  page-content'>
      <Heading></Heading>
      <Body></Body>
      <Comments></Comments>
      <Feedb></Feedb>
    </div>
    </div>
  )
}

export default CoursePreview
