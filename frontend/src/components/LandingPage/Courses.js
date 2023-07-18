import { faUser } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from 'react-router-dom';


const Courses = () => {
  return (
    <section className="section new-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>What's New</span>
            <h2>Featured Courses</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <Link to='/courses'>
            <a href="#" className="btn btn-primary">
              All Courses
            </a>
            </Link>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p className="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </p>
        </div>
        <div className="course-feature">
          <div className="row">
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="course-box d-flex aos" data-aos="fade-up">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img
                        className="img-fluid"
                        alt
                        src="https://www.acadboost.com/s/store/courses/5fc737b40cf2f2f9923e69e7/cover.jpg?v=4"
                      />
                    </a>
                    <div className="price">
                      <span>
                        300+ <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </span>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        {/* <a href="instructor-profile.html"><img src="/LandingPage/assets/img/user/user1.jpg" alt className="img-fluid"/></a> */}
                        <div className="course-name">
                          <h4>
                            <a href="instructor-profile.html">Mohit Mittal</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#">
                          <i className="fa-regular fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 className="title instructor-text">
                      <a href="course-details.html">
                        JEE Main and Advanced Crash Course
                      </a>
                    </h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img
                          src="/LandingPage/assets/img/icon/icon-01.svg"
                          alt
                        />
                        <p>12+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img
                          src="/LandingPage/assets/img/icon/icon-02.svg"
                          alt
                        />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        <span>4.0</span> (15)
                      </span>
                    </div>
                    <div className="all-btn all-category d-flex align-items-center">
                      <a href="checkout.html" className="btn btn-primary">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="course-box d-flex aos" data-aos="fade-up">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img
                        className="img-fluid"
                        alt
                        src="https://www.acadboost.com/s/store/courses/5fc737b40cf2f2f9923e69e7/cover.jpg?v=4"
                      />
                    </a>
                    <div className="price">
                      <span>
                        300+ <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </span>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        {/* <a href="instructor-profile.html"><img src="/LandingPage/assets/img/user/user1.jpg" alt className="img-fluid"/></a> */}
                        <div className="course-name">
                          <h4>
                            <a href="instructor-profile.html">Mohit Mittal</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#">
                          <i className="fa-regular fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 className="title instructor-text">
                      <a href="course-details.html">
                        JEE Main and Advanced Crash Course
                      </a>
                    </h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img
                          src="/LandingPage/assets/img/icon/icon-01.svg"
                          alt
                        />
                        <p>12+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img
                          src="/LandingPage/assets/img/icon/icon-02.svg"
                          alt
                        />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        <span>4.0</span> (15)
                      </span>
                    </div>
                    <div className="all-btn all-category d-flex align-items-center">
                      <a href="checkout.html" className="btn btn-primary">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="course-box d-flex aos" data-aos="fade-up">
                <div className="product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img
                        className="img-fluid"
                        alt
                        src="https://www.acadboost.com/s/store/courses/5fc737b40cf2f2f9923e69e7/cover.jpg?v=4"
                      />
                    </a>
                    <div className="price">
                      <span>
                        300+ <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </span>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        {/* <a href="instructor-profile.html"><img src="/LandingPage/assets/img/user/user1.jpg" alt className="img-fluid"/></a> */}
                        <div className="course-name">
                          <h4>
                            <a href="instructor-profile.html">Mohit Mittal</a>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#">
                          <i className="fa-regular fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <h3 className="title instructor-text">
                      <a href="course-details.html">
                        JEE Main and Advanced Crash Course
                      </a>
                    </h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img
                          src="/LandingPage/assets/img/icon/icon-01.svg"
                          alt
                        />
                        <p>12+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img
                          src="/LandingPage/assets/img/icon/icon-02.svg"
                          alt
                        />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        <span>4.0</span> (15)
                      </span>
                    </div>
                    <div className="all-btn all-category d-flex align-items-center">
                      <a href="checkout.html" className="btn btn-primary">
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
