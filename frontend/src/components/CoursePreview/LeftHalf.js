import React from "react";
import { useState } from "react";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import parse from 'html-react-parser'
function LeftHalf(props) {
  console.log(props)
  const [videoURL, setvideoURL] = useState(
    "https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = (url) => {
    setvideoURL(url);
    setIsPlaying(true);
  };
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (accordionId) => {
    console.log("Accordion toggled:", accordionId);
    setActiveAccordion((prevAccordion) =>
      prevAccordion === accordionId ? null : accordionId
    );
  };

  const isAccordionOpen = (accordionId) => {
    console.log("Checking accordion:", accordionId);
    return activeAccordion === accordionId ? "show" : "";
  };

  const tags_course = props && props.tags ? props.tags : [];
  const course_secion =
    props && props.sections ? props.sections : [];

  return (
    <div className="col-lg-8">
      <div className="js-player card bg-primary embed-responsive embed-responsive-16by9 mb-24pt">
        <div className="player embed-responsive-item">
          <div className="player__content">
            <div
              className="player__image"
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
                src={videoURL}
                title="Vimeo Video Player"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>

      <div className="mb-24pt text-left">
        <span className="chip chip-outline-secondary d-inline-flex align-items-center mx-2">
          <i className="material-icons icon--left">schedule</i>
          {/* {props.duration} */}
        </span>
        {tags_course.map((tag, index) => (
          <span
            className="chip chip-outline-secondary d-inline-flex align-items-center"
            key={index}
          >
            {tag.tagname}
          </span>
        ))}
      </div>

      <p className="lead measure-lead text-70 mb-24pt text-left">
        {parse(props.description)}
      </p>

      <div className="page-separator">
        <div className="page-separator__text">Table of contents</div>
      </div>

      <div
        className="accordion js-accordion accordion--boxed text-left my-2"
        id="parent"
      >
        {course_secion.map((item, index) => (
          <div className="accordion__item" key={item.id}>
            <button
              className="accordion__toggle"
              style={{ border: "none" }}
              onClick={() => handleAccordionToggle(`course-toc-${item.id}`)}
            >
              <span className="flex">{item.title}</span>
              <span className="accordion__toggle-icon">
                <FontAwesomeIcon icon={faPlayCircle} />
              </span>
            </button>
            <div
              className={`accordion__menu ${
                isAccordionOpen(`course-toc-${item.id}`) ? "show" : ""
              }`}
              id={`course-toc-${item.id}`}
              style={{
                display: "block",
                maxHeight: isAccordionOpen(`course-toc-${item.id}`)
                  ? "500px"
                  : "0px",
                transition: "max-height 0.5s ease-in-out",
                overflow: "hidden",
              }}
            >
              {item.videos.map((video, index) => (
                <div className="accordion__menu-link" key={video.id}>
                  <span className="icon-holder icon-holder--small icon-holder--dark rounded-circle d-inline-flex icon--left">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                  <Link
                    className="flex scroll-link"
                    to="js-player"
                    spy={true}
        smooth={true}
        duration={500}
        
                    onClick={() => handlePlay(video.url)}
                  >
                    {video.title}
                  </Link>
                  <span className="text-muted">{video.duration} mins</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftHalf;
