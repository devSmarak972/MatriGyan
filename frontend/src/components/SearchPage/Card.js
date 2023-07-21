import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const Card = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  return (
    <>
      <div
        // className={`col-md-6 col-lg-4 my-2 col-xl-3 card-group-row__col course-card${
        //   isTransitioning ? " transitioning" : ""
        // }`}
        className={`col-md-6 col-lg-4 my-2 col-xl-3 card-group-row__col course-card`}
      >
        <div
          className={`${
            isPopoverOpen
              ? "card h-100 card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay card-group-row__card overlay--show"
              : "card h-100 card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay card-group-row__card"
          }`}
          onClick={togglePopover}
          role="button"
          tabIndex={0}
        >
          <div
            className="card-img-top js-image"
            data-position=""
            data-height="140"
            style={{
              display: "block",
              position: "relative",
              overflow: "hidden",
              backgroundImage: `url(${props.course.img_url_1})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              paddingBottom: "75%",
            }}
          >
            <img
              src={props.course.img_url_2}
              alt="course"
              style={{ visibility: "hidden" }}
            />
            {isPopoverOpen && (
              <span className="overlay__content">
                <span className="overlay__action d-flex flex-column text-center">
                  <i className="material-icons icon-32pt">
                    play_circle_outline
                  </i>
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
                <a className="card-title text-left" href="student-course.html">
                  {props.course.name}
                </a>

                <p className="text-50 text-left font-weight-bold mb-4pt">
                  {props.course.tutor}
                </p>
              </div>
              <div>
                <Tooltip effect="solid" place="top" />
                <span
                  className="material-icons text-20 card-course__icon-favorite"
                  data-tip="Add Favorite"
                  data-for="favorite-tooltip"
                >
                  favorite_border
                </span>
              </div>
            </div>
            <div className="d-flex" style={{ height: "27%" }}>
              <div className="rating flex">
                <span className="rating__item">
                  <span className="material-icons">star</span>
                </span>
                <span className="rating__item">
                  <span className="material-icons">star</span>
                </span>
                <span className="rating__item">
                  <span className="material-icons">star</span>
                </span>
                <span className="rating__item">
                  <span className="material-icons">star</span>
                </span>
                <span className="rating__item">
                  <span className="material-icons">star_border</span>
                </span>
              </div>
              {/* <small className="text-50">6 hours</small> */}
            </div>
            <div className="d-flex">
              <button type="button" class="btn btn-outline-primary">
                <Link>View</Link>
              </button>
            </div>
          </div>

          <div className="card-footer">
            <div className="row justify-content-between">
              <div className="col-auto d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-4pt">
                  access_time
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>{props.course.length}</small>
                </p>
              </div>
              <div className="col-auto d-flex align-items-center">
                <span className="material-icons icon-16pt text-50 mr-4pt">
                  play_circle_outline
                </span>
                <p className="flex text-50 lh-1 mb-0">
                  <small>{props.course.lessons}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
