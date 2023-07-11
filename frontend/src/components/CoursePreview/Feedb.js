import React from "react";
import { Link } from "react-router-dom";

function Feedb() {
  return (
    <div class="page-section bg-alt">
      <div class="container page__container">
        <div class="page-separator">
          <div class="page-separator__text">Feedback</div>
        </div>

        <div class="row">
          <div class="col-sm-6 col-md-4">
            <div class="card card-feedback card-body">
              <blockquote class="blockquote mb-0">
                <p class="text-70 small mb-0">
                  A wonderful course on how to start. Eddie beautifully conveys
                  all essentials of a becoming a good Angular developer. Very
                  glad to have taken this course. Thank you Eddie Bryan.
                </p>
              </blockquote>
            </div>
            <div class="media ml-12pt">
              <div class="media-left mr-12pt">
                <Link to = "/student/:id" class="avatar avatar-sm">
                  {/* <img
                    src="public/images/people/110/guy-.jpg"
                    width="40"
                    alt="avatar"
                    class="rounded-circle"
                  /> */}
                  <span class="avatar-title rounded-circle">UK</span>
                </Link>
              </div>
              <div class="media-body media-middle">
                <Link href="/student/:id" class="card-title">
                  Umberto Kass
                </Link>
                <div class="rating mt-4pt">
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-md-4">
            <div class="card card-feedback card-body">
              <blockquote class="blockquote mb-0">
                <p class="text-70 small mb-0">
                  A wonderful course on how to start. Eddie beautifully conveys
                  all essentials of a becoming a good Angular developer. Very
                  glad to have taken this course. Thank you Eddie Bryan.
                </p>
              </blockquote>
            </div>
            <div class="media ml-12pt">
              <div class="media-left mr-12pt">
                <Link to = "/student/:id" class="avatar avatar-sm">
                  {/* <img
                    src="public/images/people/110/guy-.jpg"
                    width="40"
                    alt="avatar"
                    class="rounded-circle"
                  /> */}
                  <span class="avatar-title rounded-circle">UK</span>
                </Link>
              </div>
              <div class="media-body media-middle">
                <Link to = "/student/:id" class="card-title">
                  Umberto Kass
                </Link>
                <div class="rating mt-4pt">
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-md-4">
            <div class="card card-feedback card-body">
              <blockquote class="blockquote mb-0">
                <p class="text-70 small mb-0">
                  A wonderful course on how to start. Eddie beautifully conveys
                  all essentials of a becoming a good Angular developer. Very
                  glad to have taken this course. Thank you Eddie Bryan.
                </p>
              </blockquote>
            </div>
            <div class="media ml-12pt">
              <div class="media-left mr-12pt">
                <Link to = "/student/:id" class="avatar avatar-sm">
                  {/* <!-- <img src="public/images/people/110/guy-.jpg" width="40" alt="avatar" class="rounded-circle"> --> */}
                  <span class="avatar-title rounded-circle">UK</span>
                </Link>
              </div>
              <div class="media-body media-middle">
                <Link to = "/student/:id" class="card-title">
                  Umberto Kass
                </Link>
                <div class="rating mt-4pt">
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star</span>
                  </span>
                  <span class="rating__item">
                    <span class="material-icons">star_border</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedb;
