import React from 'react'
import Body from './Body'
import Feedb from './Feedb'
import Heading from './Heading'
import './preview.css'
function CoursePreview() {
  return (
    <div className='mdk-header-layout__content page-content'>
      <Heading></Heading>
      <Body></Body>
      <Feedb></Feedb>
    </div>
  )
}

export default CoursePreview
