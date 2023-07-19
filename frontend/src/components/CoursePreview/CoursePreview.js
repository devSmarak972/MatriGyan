import React from 'react'
import Body from './Body'
import Feedb from './Feedb'
import Heading from './Heading'
import './preview.css'
import Comments from './Comments'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function CoursePreview() {
  const params = useParams();
  const [details, setDetails] = useState({});

  const getCourse = () => {
    // const navigate=useNavigate();
    fetch(`http://127.0.0.1:8000/get-course/${params.id}`, {
      method: "get"
    })
      .then((response) => response.json())
      .then((data) => {
        if(!data.success)
        {window.location.href="http://localhost:3000/not-found"
         const notify=()=>toast("Course not found!")
        notify();
        }
        else
        setDetails(data);
      })
      .catch((error) => {
        console.error(error);

         window.location.href="http://localhost:3000/not-found"
      });
  };
// console.log(details,"details in coursepreview")
  useEffect(() => {
    getCourse();
  }, []);

  // Render child components only when details are available
  // if (!details) {
  //   return null;
  // }

  return (
    <div className="course-preview">
      <div className='mdk-header-layout__content  page-content'>
        <Heading details={details}></Heading>
        <Body details={details}></Body>
        <Feedb details={details}></Feedb>
        {/* <Comments></Comments> */}
      </div>
    </div>
  )
}

export default CoursePreview
