import React from "react";
import Body from "./Body";
import Feedb from "./Feedb";
import Heading from "./Heading";
import "./preview.css";
import Comments from "./Comments";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function CoursePreview(props) {
  const params = useParams();
  const [details, setDetails] = useState(false);

  const getCourse = () => {
    // const navigate=useNavigate();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/get-course/${params.id}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          window.location.href = `${process.env.REACT_APP_BACKEND_URL}/not-found`;
          const notify = () => toast("Course not found!");
          notify();
        } else {
          setDetails((state) => {
            var tmp = { ...data };
            if (tmp.data.educator) {
              tmp.educator = tmp.data.educator;
              tmp.data.educator = tmp.educator.name;
            }
            return tmp;
          });
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);

        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/not-found`;
      });
  };
  console.log(details, "details in coursepreview");
  useEffect(() => {
    getCourse();
  }, []);

  // Render child components only when details are available
  // if (!details) {
  //   return null;
  // }

  return (
    <div className="course-preview">
      {details && (
        <div className="mdk-header-layout__content  page-content">
          <Heading
            title={details.data.title}
            rating={details.data.rating}
          ></Heading>
          <Body
            user={props.user}
            {...details.data}
            isEnrolled={details.isEnrolled}
          ></Body>
          <Comments comments={details.data?.comments}></Comments>
          <Feedb
            feedbacks={details?.feedbacks}
            isEnrolled={details.isEnrolled}
          ></Feedb>
        </div>
      )}
    </div>
  );
}

export default CoursePreview;
