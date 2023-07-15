import React from "react";
import { Link } from "react-router-dom";

function Feedb({details}) {
  console.log(details.title);
  const comments = details && details.data.comments ? details.data.comments : [];
  return (
    <div class="page-section bg-alt">
      <div class="container page__container">
        <div class="page-separator">
          <div class="page-separator__text">Feedback</div>
        </div>

        <div class="row">
          {comments.map((comment, index)=>(
            <div class="col-sm-6 col-md-4 my-2" key={index}>
            <div class="card card-feedback card-body">
              <blockquote class="blockquote mb-0">
                <p class="text-70 small mb-0">
                  {comment.comment}
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
                  {comment.user.firstname}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedb;
