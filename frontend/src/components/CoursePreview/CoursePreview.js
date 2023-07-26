import React from "react";
import Body from "./Body";
import Feedb from "./Feedb";
import Heading from "./Heading";
import "./preview.css";
import Comments from "./Comments";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function CoursePreview(props) {
  const params = useParams();
  const [details, setDetails] = useState(false);

  const getCourse = async () => {
    // const navigate=useNavigate();
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get-course/${params.id}`)
      .then((res) => {
        if (!res.data?.success) {
          window.location.href = "/not-found";
          const notify = () => toast("Course not found!");
          notify();
        } else {
          setDetails((state) => {
            var tmp = { ...res.data };
            if (tmp.data.educator) {
              tmp.educator = tmp.data.educator;
              tmp.data.educator = tmp.educator.name;
            }
            return tmp;
          });
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.error(error);

        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/not-found`;
      });
  };
  console.log(details, "details in coursepreview", props.user?.current);
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
