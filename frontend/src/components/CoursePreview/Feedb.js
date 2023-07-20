import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function Feedb(props) {
  console.log(props);

  const getRatingStars = (rating) => {
    const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
      <span className="rating__item" key={index}>
        <FontAwesomeIcon icon={faStar} />
      </span>
    ));

    const hasHalfStar = rating % 1 !== 0;

    return [...filledStars, hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} />];
  };

  return (
    <div className="page-section bg-alt">
      <div className="container page__container">
        <div className="page-separator">
          <div className="page-separator__text">Feedback</div>
        </div>

        <div className="row">
          {props.feedbacks.map((feedback, index) => (
            <div className="col-sm-6 col-md-4 my-2" key={index}>
              <div className="card card-feedback card-body">
                <blockquote className="blockquote mb-0">
                  <p className="text-70 small mb-0">{feedback.message}</p>
                </blockquote>
              </div>
              <div className="media ml-12pt">
                <div className="media-left mr-12pt">
                  <Link to="/student/:id" className="avatar avatar-sm">
                    {/* <img
                      src="public/images/people/110/guy-.jpg"
                      width="40"
                      alt="avatar"
                      className="rounded-circle"
                    /> */}
                    <span className="avatar-title rounded-circle">UK</span>
                  </Link>
                </div>
                <div className="media-body media-middle">
                  <Link href="/student/:id" className="card-title">
                    {feedback.user.firstname}
                  </Link>
                  <div className="rating mt-4pt">
                    {getRatingStars(feedback.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedb;
