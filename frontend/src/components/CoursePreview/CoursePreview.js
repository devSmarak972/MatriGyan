import React from 'react'
import Body from './Body'
import Feedb from './Feedb'
import Heading from './Heading'
import './preview.css'
import Comments from './Comments'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
function CoursePreview() {
  const params  = useParams();
  const [details, setdetails] = useState("");
  const getCourse = () => {
    fetch(`http://127.0.0.1:8000/get-course/${params.id}`, {
      method: "get"
    })
      .then((response) => response.json())
      .then((data) => {
        setdetails(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getCourse();
  }, []);
  
  return (
    <div className="course-preview">
    <div className='mdk-header-layout__content  page-content'>
      <Heading details={details}></Heading>
      <Body details={details}></Body>
      <Feedb details={details}></Feedb>
      <Comments></Comments>
    </div>
    </div>
  )
}

export default CoursePreview
