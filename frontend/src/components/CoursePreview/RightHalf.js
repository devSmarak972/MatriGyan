import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import the desired Font Awesome icon

function RightHalf(props) {
  console.log(props, "right");
  return (
    <div className="col-lg-4 text-left">
      {props.isEnrolled ? (
        <>
          {/* Content when enrolled */}
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-body py-16pt text-center">
              <span className="icon-holder icon-holder--outline-secondary rounded-circle d-inline-flex mb-8pt">
                <FontAwesomeIcon icon={faClock} size='2xl' /> {/* Use the Font Awesome icon component */}
              </span>
              <h4 className="card-title">
                <strong>Unlock Lesson</strong>
              </h4>
              <p className="card-subtitle text-70 mb-24pt">
                Get access to all videos in the library
              </p>
              <Link to="/signup" className="btn btn-accent mb-8pt">
                Sign Up
              </Link>
              <p className="mb-0">
                Have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </>
      )}

      <div className="page-separator">
        <div className="page-separator__text">Course</div>
      </div>

      <Link to="/coursepage/angular" className="d-flex flex-nowrap mb-24pt">
        <span className="mr-16pt">
          
          <FontAwesomeIcon icon="book" size='xl'/>
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
            className="rounded-circle"
          />
        </span>
        <div className="media-body">
          <Link
            className="card-title m-0"
            to={`/teacher/${props.educator_id}`}
          >
            {props.educator}
          </Link>
          <p className="text-50 lh-1 mb-0">Instructor</p>
        </div>
      </div>
      <p className="text-70">
        Fueled by my passion for understanding the nuances of
        cross-cultural advertising, I consider myself a forever student,
        eager to both build on my academic foundations in psychology and
        sociology and stay in tune with the latest digital marketing
        strategies through continued coursework.
      </p>
    </div>
  );
}

export default RightHalf;
