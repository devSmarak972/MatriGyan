import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";


function Heading({details}) {
  return (
    <div className="page-section bg-alt border-bottom-2">
      <div className="container page__container">
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <div className="d-flex flex-column flex-md-row align-items-center flex mb-16pt mb-lg-0 text-center text-md-left">
            <div className="avatar mb-16pt mb-md-0 mr-md-16pt">
              <img
                // src={details?.data.image}
                //added sample image
                className="avatar-img rounded"
                alt="lesson"
              />
            </div>
            <div className="flex text-left" style={{flexDirection:"column"}}> 
              <h1 className="h2 m-0">{details?.data.title}</h1>
              <div className="rating mb-8pt d-inline-flex">
                <div className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="rating__item">
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </div>
              </div>

            </div>
          </div>
          {/* <div className="ml-lg-16pt">
            <Link to="/" className="btn btn-light">
              Library
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Heading;
