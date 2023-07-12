import React from "react";
import { useState } from "react";

function LeftHalf({ details }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  const [activeAccordion, setActiveAccordion] = useState("");

  const handleAccordionToggle = (accordionId) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === accordionId ? "" : accordionId
    );
  };

  const isAccordionOpen = (accordionId) => {
    return activeAccordion === accordionId ? "show" : "";
  };
  const tags_course = details && details.data.tags ? details.data.tags : [];
  return (
    <div class="col-lg-8">
      <div class="js-player card bg-primary embed-responsive embed-responsive-16by9 mb-24pt">
        <div class="player embed-responsive-item">
          <div class="player__content">
            <div
              class="player__image"
              style={{
                "--player-image": "url(public/images/illustration/player.svg)",
              }}
            ></div>
            <button className="btn btn-primary" onClick={handlePlayClick}>
              <span className="material-icons">play_arrow</span>
            </button>
          </div>
          <div className="player__embed">
            {isPlaying && (
              <iframe
                className="embed-responsive-item"
                src="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"
                title="Vimeo Video Player"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
      
      <div class="mb-24pt text-left">
        <span class="chip chip-outline-secondary d-inline-flex align-items-center mx-2">
          <i class="material-icons icon--left">schedule</i>
          {/* {details.data.duration} */}
        </span>
        {tags_course.map((tag, index) => (
          <span class="chip chip-outline-secondary d-inline-flex align-items-center" key={index}>
            {tag.tagname}
          </span>
        ))}
      </div>

      <p class="lead measure-lead text-70 mb-24pt text-left">
        {details.data.description}
      </p>

      <div class="page-separator">
        <div class="page-separator__text">Table of contents</div>
      </div>

      <div
        className="accordion js-accordion accordion--boxed text-left"
        id="parent"
      >
        <div
          className={`accordion__item`}
          // style={{
          //   maxHeight: isAccordionOpen("course-toc-1") ? "0px" : "500px",
          //   transition: "max-height 0.5s ease-in-out",
          //   overflow: "hidden"
          // }}
        >
          <button
            className="accordion__toggle collapsed"
            style={{ border: "none" }}
            onClick={() => handleAccordionToggle("course-toc-1")}
          >
            <span className="flex">Course Overview</span>
            <span className="accordion__toggle-icon material-icons">
              keyboard_arrow_down
            </span>
          </button>
          <div
            className={`accordion__menu `}
            id="course-toc-1"
            style={{
              display: "block",
              maxHeight: isAccordionOpen("course-toc-1") ? "500px" : "0px",
              transition: "max-height 0.5s ease-in-out",
              overflow: "hidden",
            }}
          >
            <div className="accordion__menu-link">
              <span className="icon-holder icon-holder--small icon-holder--dark rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">play_circle_outline</i>
              </span>
              <a className="flex" href="student-lesson.html">
                Watch Trailer
              </a>
              <span className="text-muted">1m 10s</span>
            </div>
          </div>
        </div>
        <div className={`accordion__item`}>
          <button
            className="accordion__toggle"
            style={{ border: "none" }}
            onClick={() => handleAccordionToggle("course-toc-2")}
          >
            <span className="flex">Getting Started with Angular</span>
            <span className="accordion__toggle-icon material-icons">
              keyboard_arrow_down
            </span>
          </button>
          <div
            className={`accordion__menu  `}
            id="course-toc-2"
            style={{
              display: "block",
              maxHeight: isAccordionOpen("course-toc-2") ? "500px" : "0px",
              transition: "max-height 0.5s ease-in-out",
              overflow: "hidden",
            }}
          >
            <div className="accordion__menu-link">
              <span className="icon-holder icon-holder--small icon-holder--dark rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">check_circle</i>
              </span>
              <a className="flex" href="student-lesson.html">
                Introduction
              </a>
              <span className="text-muted">8m 42s</span>
            </div>
            <div className="accordion__menu-link active">
              <span className="icon-holder icon-holder--small icon-holder--primary rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">play_circle_outline</i>
              </span>
              <a className="flex" href="student-lesson.html">
                Introduction to TypeScript
              </a>
              <span className="text-muted">50m 13s</span>
            </div>
            <div className="accordion__menu-link">
              <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">lock</i>
              </span>
              <a className="flex" href="student-lesson.html">
                Comparing Angular to AngularJS
              </a>
              <span className="text-muted">12m 10s</span>
            </div>
            <div className="accordion__menu-link">
              <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">hourglass_empty</i>
              </span>
              <a className="flex" href="student-take-quiz.html">
                Quiz: Getting Started With Angular
              </a>
            </div>
          </div>
        </div>
        <div className={`accordion__item`}>
          <button
            className="accordion__toggle collapsed"
            style={{ border: "none" }}
            onClick={() => handleAccordionToggle("course-toc-3")}
          >
            <span className="flex">
              Creating and Communicating Between Angular Components
            </span>
            <span className="accordion__toggle-icon material-icons">
              keyboard_arrow_down
            </span>
          </button>
          <div
            className={`accordion__menu  `}
            id="course-toc-3"
            style={{
              display: "block",
              maxHeight: isAccordionOpen("course-toc-3") ? "500px" : "0px",
              transition: "max-height 0.5s ease-in-out",
              overflow: "hidden",
            }}
          >
            <div className="accordion__menu-link">
              <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">lock</i>
              </span>
              <a className="flex" href="student-lesson.html">
                Angular Components
              </a>
              <span className="text-muted">04:23</span>
            </div>
          </div>
        </div>
        <div className={`accordion__item my-3`}>
          <button
            className="accordion__toggle collapsed"
            style={{ border: "none" }}
            onClick={() => handleAccordionToggle("course-toc-4")}
          >
            <span className="flex">Exploring the Angular Template Syntax</span>
            <span className="accordion__toggle-icon material-icons">
              keyboard_arrow_down
            </span>
          </button>
          <div
            className={`accordion__menu  `}
            id="course-toc-4"
            style={{
              display: "block",
              maxHeight: isAccordionOpen("course-toc-4") ? "500px" : "0px",
              transition: "max-height 0.5s ease-in-out",
              overflow: "hidden",
            }}
          >
            <div className="accordion__menu-link">
              <span className="icon-holder icon-holder--small icon-holder--light rounded-circle d-inline-flex icon--left">
                <i className="material-icons icon-16pt">lock</i>
              </span>
              <a className="flex" href="student-lesson.html">
                Template Syntax
              </a>
              <span className="text-muted">04:23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftHalf;
