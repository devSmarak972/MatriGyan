import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons"; // Import the desired Font Awesome icon
import axios from "axios";
import { toast } from "react-toastify";

function RightHalf(props) {
  console.log(props, "right");
  return (
    <div class="col-lg-4 text-left">
      {props.isEnrolled ? (
        <></>
      ) : (
        <>
          <div class="card">
            <div class="card-body py-16pt text-center">
              <span class="icon-holder icon-holder--outline-secondary rounded-circle d-inline-flex mb-8pt">
                <i class="material-icons">timer</i>
              </span>
              <h4 class="card-title">
                <strong>Unlock Lesson</strong>
              </h4>
              <p class="card-subtitle text-70 mb-24pt">
                Get access to all videos in the library
              </p>
              {props.user?.current?.code === 0 && (
                <div>
                  <Link to="/signup" class="btn btn-accent mb-8pt">
                    Sign Up
                  </Link>
                  <p class="mb-0">
                    Have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              )}
              {props.user?.current?.code !== 0 && (
                <div>
                  <button
                    onClick={async () => {
                      await axios
                        .get(
                          `${process.env.REACT_APP_BACKEND_URL}/enroll-student/${props.id}/`
                        )
                        .then((res) => console.log(res))
                        .catch((e) => console.log(e));
                      props.setEnrolled(true);
                      toast("Enrolled Successfully!");
                    }}
                    class="btn btn-accent mb-8pt"
                  >
                    Enroll
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="page-separator">
        <div className="page-separator__text">Course</div>
      </div>

      <Link to="/coursepage/angular" className="d-flex flex-nowrap mb-24pt">
        <span className="mr-16pt">
          <FontAwesomeIcon icon="book" size="xl" />
        </span>
        <span className="flex d-flex flex-column align-items-start">
          <span className="card-title">{props.title}</span>
          <span className="card-subtitle text-50"> Lessons</span>
        </span>
      </Link>

      <div className="page-separator">
        <div className="page-separator__text">Author</div>
      </div>

      <div className="media align-items-center mb-16pt">
        <span className="media-left mr-16pt">
          <img
            src="https://th.bing.com/th?id=OIP.4-sbLLBhDhOMgWeYXs8Y9QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            width="40"
            alt="avatar"
            class="rounded-circle"
          />
        </span>
        <div class="media-body">
          <Link class="card-title m-0" to={`/teacher/${props.educator_id}`}>
            {props.educator}
          </Link>
          <p class="text-50 lh-1 mb-0">Instructor</p>
        </div>
      </div>
      <p class="text-70">
        Fueled by my passion for understanding the nuances of cross-cultural
        advertising, I consider myself a forever student, eager to both build on
        my academic foundations in psychology and sociology and stay in tune
        with the latest digital marketing strategies through continued
        coursework.
      </p>
    </div>
  );
}

export default RightHalf;
