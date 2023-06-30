import React from "react";

function Popover() {
  return (
    <div
      className="popover popover-lg fade bs-popover-right show"
      role="tooltip"
      id="popover391343"
      style={{position: "absolute",
      transform: "translate3d(350px, 475px, 0px)",
      top: "0px",
      left: "0px",
      willChange: "transform"}}
      x-placement="right"
    >
      <div className="arrow" style={{top: "164px"}}></div>
      <h3 className="popover-header">Hi</h3>
      <div className="popover-body">
        <div className="media">
          <div className="media-left mr-12pt">
            <img
              src="../../public/images/paths/angular_40x40@2x.png"
              width="40"
              height="40"
              alt="Angular"
              className="rounded"
            />
          </div>
          <div className="media-body">
            <div className="card-title mb-0">Learn Angular fundamentals</div>
            <p className="lh-1 mb-0">
              <span className="text-50 small">with</span>
              <span className="text-50 small font-weight-bold">Elijah Murray</span>
            </p>
          </div>
        </div>

        <p className="my-16pt text-70">
          Learn the fundamentals of working with Angular and how to create basic
          applications.
        </p>

        <div className="mb-16pt">
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">check</span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Fundamentals of working with Angular</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">check</span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Create complete Angular applications</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">check</span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Working with the Angular CLI</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">check</span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Understanding Dependency Injection</small>
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-icons icon-16pt text-50 mr-8pt">check</span>
            <p className="flex text-50 lh-1 mb-0">
              <small>Testing with Angular</small>
            </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-auto">
            <div className="d-flex align-items-center mb-4pt">
              <span className="material-icons icon-16pt text-50 mr-4pt">
                access_time
              </span>
              <p className="flex text-50 lh-1 mb-0">
                <small>6 hours</small>
              </p>
            </div>
            <div className="d-flex align-items-center mb-4pt">
              <span className="material-icons icon-16pt text-50 mr-4pt">
                play_circle_outline
              </span>
              <p className="flex text-50 lh-1 mb-0">
                <small>12 lessons</small>
              </p>
            </div>
            <div className="d-flex align-items-center">
              <span className="material-icons icon-16pt text-50 mr-4pt">
                assessment
              </span>
              <p className="flex text-50 lh-1 mb-0">
                <small>Beginner</small>
              </p>
            </div>
          </div>
          <div className="col text-right">
            <a href="student-course.html" className="btn btn-primary">
              Watch trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popover;
