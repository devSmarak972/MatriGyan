import React from "react";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./transition.css";

function Column({ cid, course, isTransitioning }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const [fav, setfav] = useState(false);
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const handleicon = () => {
    setfav(!fav);
  };
  return (
    <>
      <div
        id={course.id}
        className={`col-md-6 col-lg-4 my-2 col-xl-3 card-group-row__col course-card${
          isTransitioning ? " transitioning" : ""
        }`}
      >
        <div
          className={`card h-100 card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay card-group-row__card ${
            isPopoverOpen ? "overlay--show" : ""
          }`}
          role="button"
          tabIndex={0}
        >
          <div
            className="card-img-top js-image"
            data-position=""
            style={{
              display: "block",
              position: "relative",
              overflow: "hidden",
              backgroundImage: `url(${course.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              paddingBottom: "75%",
            }}
            onClick={togglePopover}
          >
            {isPopoverOpen && (
              <span className="overlay__content">
                <span className="overlay__action d-flex flex-column text-center">
                  <FontAwesomeIcon icon={faPlayCircle} className="icon-32pt" />
                  <span className="card-title text-white">Preview</span>
                </span>
              </span>
            )}
          </div>

          <div className="card-body flex-column justify-content-between p-16pt">
            <div
              className="d-flex"
              style={{ height: "40%", justifyContent: "space-between" }}
            >
              <div
                className="flex"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Link to={`/course/${cid}`} className="card-title text-left">
                  {course.title}
                </Link>
              </div>
              <div>
                <span
                  className="card-course__icon-favorite"
                  data-tip={`${fav ? "Remove" : "Add"} Favorite`}
                  data-for={`tooltip-${course.id}`}
                >
                  <i
                    className={`${!fav ? "fa-regular" : "fa-solid"} fa-heart fa-xl`}
                    onClick={handleicon}
                    id={`app-title-${course.id}`}
                  ></i>
                </span>
              </div>
            </div>
            <div className="d-flex" style={{ height: "27%" }}>
              <div className="rating flex">
                <span className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="rating__item">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="rating__item">
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                </span>
              </div>
            </div>
            <div className="d-flex">
              <button type="button" className="btn btn-outline-primary">
                <Link to={`/course/${cid}`}>View</Link>
              </button>
            </div>
          </div>

          <div className="card-footer">
            <div className="row justify-content-between">
              <div className="col-auto d-flex align-items-center">
                <span className="icon-16pt text-50 mr-4pt">
                <FontAwesomeIcon icon="fa-clock" size="sm" />
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>{course.duration}</small>
                </p>
              </div>
              <div className="col-auto d-flex align-items-center">
                <span className="icon-16pt text-50 mr-4pt">
                  <FontAwesomeIcon icon={faPlayCircle} size="sm" />
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>{course.sections.length}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Column;
