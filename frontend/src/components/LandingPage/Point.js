import React from "react";

const Point = () => {
  return (
    <section class="section share-knowledge">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="knowledge-img aos" data-aos="fade-up">
              <img
                src="/LandingPage/assets/img/share.png"
                alt
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <div class="join-mentor aos" data-aos="fade-up">
              <h2>Want to share your knowledge? Join us a Teacher</h2>
              <p>
                Become a part of our teaching community and ignite the spark of
                knowledge in students' lives.
              </p>
              <ul class="course-list">
                <li>
                  <i class="fa-solid fa-circle-check"></i>Best Courses
                </li>
                <li>
                  <i class="fa-solid fa-circle-check"></i>Top rated Instructors
                </li>
              </ul>
              <div class="all-btn all-category d-flex align-items-center">
                <a href="instructor-list.html" class="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Point;
