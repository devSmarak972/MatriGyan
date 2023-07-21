import React from "react";

const Point = () => {
  return (
    <section className="section share-knowledge">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="knowledge-img aos" data-aos="fade-up">
              <img
                src="/LandingPage/assets/img/share.png"
                alt
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="join-mentor aos" data-aos="fade-up">
              <h2>Want to share your knowledge? Join us a Teacher</h2>
              <p>
                Become a part of our teaching community and ignite the spark of
                knowledge in students' lives.
              </p>
              <ul className="course-list">
                <li>
                  <i className="fa-solid fa-circle-check"></i>Best Courses
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>Top rated
                  Instructors
                </li>
              </ul>
              <div className="all-btn all-category d-flex align-items-center">
                <a href="instructor-list.html" className="btn btn-primary">
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
