import React from "react";
import OwlCarousel from "react-owl-carousel-autoheight";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import data from "./instructors.json";
import { Link } from 'react-router-dom';


const Instructors = () => {
  console.log(data);
  return (
    <section className="section trend-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>What’s New</span>
            <h2>Study Material</h2>
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

        <OwlCarousel
          items={4}
          className="owl-theme trending-course aos"
          loop
          nav
          margin={8}
          data-aos="fade-up"
        >
          {/* <div className="owl-carousel trending-course owl-theme aos" data-aos="fade-up"> */}
          <div className="course-box trend-box">
            <div className="product trend-product">
              <div className="product-img">
                <a href="course-details.html">
                  <img
                    className="img-fluid"
                    alt
                    src="https://schools.aglasem.com/wp-content/uploads/2016/11/ncert-books-min.jpg"
                  />
                </a>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <div className="course-name">
                      <h4>
                        <a href="instructor-profile.html">Amit Mittal</a>
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
                <h3 className="title">
                  <a href="course-details.html">NCERT Solutions</a>
                </h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img
                      src="/LandingPage/assets/img/icon/icon-01.svg"
                      alt
                      className="img-fluid bookicon"
                    />
                    <p>50+ Documents</p>
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
          <div className="course-box trend-box">
            <div className="product trend-product">
              <div className="product-img">
                <a href="course-details.html">
                  <img
                    className="img-fluid"
                    alt
                    src="/LandingPage/assets/img/pyq.png"
                  />
                </a>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <div className="course-name">
                      <h4>
                        <a href="instructor-profile.html">Anuj Sharma</a>
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
                <h3 className="title">
                  <a href="course-details.html">
                    Previous Year Question Papers
                  </a>
                </h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img
                      src="/LandingPage/assets/img/icon/icon-01.svg"
                      alt
                      className="img-fluid bookicon"
                    />
                    <p>5000+ Questions</p>
                  </div>
                </div>
                <div className="rating">
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star filled"></i>
                  <i className="fas fa-star"></i>
                  <span className="d-inline-block average-rating">
                    <span>5.0</span> (20)
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
          <div className="course-box trend-box">
            <div className="product trend-product">
              <div className="product-img">
                <a href="course-details.html">
                  <img
                    className="img-fluid"
                    alt
                    src="https://m.media-amazon.com/images/I/71My7kHgfqL._AC_UF1000,1000_QL80_.jpg"
                  />
                </a>
              </div>
              <div className="product-content">
                <div className="course-group d-flex">
                  <div className="course-group-img d-flex">
                    <div className="course-name">
                      <h4>
                        <a href="instructor-profile.html">Akshat Agarwal</a>
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
                <h3 className="title">
                  <a href="course-details.html">HC Verma Solutions</a>
                </h3>
                <div className="course-info d-flex align-items-center">
                  <div className="rating-img d-flex align-items-center">
                    <img
                      src="/LandingPage/assets/img/icon/icon-01.svg"
                      alt
                      className="img-fluid bookicon"
                    />
                    <p>50+ Documents</p>
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
        </OwlCarousel>
        <div className="feature-instructors">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>Featured Instructor</h2>
              <div className="section-text aos" data-aos="fade-up">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                  aenean accumsan bibendum gravida maecenas augue elementum et
                  neque. Suspendisse imperdiet.
                </p>
              </div>
            </div>
          </div>
          <OwlCarousel
            items={4}
            className="owl-theme instructors-course aos"
            loop
            nav
            margin={8}
            data-aos="fade-up"
          >
            {/* <div className="owl-carousel instructors-course owl-theme aos" data-aos="fade-up"> */}
            {data.map((instructor) => (
              <div className="instructors-widget">
                <div className="instructors-img ">
                  <a href="instructor-list.html">
                    <img className="img-fluid" alt src={instructor.image} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="instructor-profile.html">{instructor.name}</a>
                  </h5>
                  <p>{instructor.subtitle}</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-user-group"></i>
                    <span>{instructor.students}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="instructors-widget">
              <div className="instructors-img ">
                <a href="instructor-list.html">
                  <img
                    className="img-fluid"
                    alt
                    src="/LandingPage/assets/img/user/educator2.jpg"
                  />
                </a>
              </div>
              <div className="instructors-content text-center">
                <h5>
                  <a href="instructor-profile.html">Anit Thakur</a>
                </h5>
                <p>Educator</p>
                <div className="student-count d-flex justify-content-center">
                  <i className="fa-solid fa-user-group"></i>
                  <span>50 Students</span>
                </div>
              </div>
            </div>
            <div className="instructors-widget">
              <div className="instructors-img ">
                <a href="instructor-list.html">
                  <img
                    className="img-fluid"
                    alt
                    src="/LandingPage/assets/img/user/educator4.jpg"
                  />
                </a>
              </div>
              <div className="instructors-content text-center">
                <h5>
                  <a href="instructor-profile.html">Rahul Gupta</a>
                </h5>
                <p>Educator</p>
                <div className="student-count d-flex justify-content-center">
                  <i className="fa-solid fa-user-group"></i>
                  <span>50 Students</span>
                </div>
              </div>
            </div>
            <div className="instructors-widget">
              <div className="instructors-img ">
                <a href="instructor-list.html">
                  <img
                    className="img-fluid"
                    alt
                    src="/LandingPage/assets/img/user/educator5.jpg"
                  />
                </a>
              </div>
              <div className="instructors-content text-center">
                <h5>
                  <a href="instructor-profile.html">Rahul Gupta</a>
                </h5>
                <p>Educator</p>
                <div className="student-count d-flex justify-content-center">
                  <i className="fa-solid fa-user-group"></i>
                  <span>50 Students</span>
                </div>
              </div>
            </div>
            <div className="instructors-widget">
              <div className="instructors-img ">
                <a href="instructor-list.html">
                  <img
                    className="img-fluid"
                    alt
                    src="https://edge.uacdn.net/static/thumbnail/user/15f37ed161cb4585a5b4a99b07a22aff.png"
                  />
                </a>
              </div>
              <div className="instructors-content text-center">
                <h5>
                  <a href="instructor-profile.html">Rahul Gupta</a>
                </h5>
                <p>Educator</p>
                <div className="student-count d-flex justify-content-center">
                  <i className="fa-solid fa-user-group"></i>
                  <span>50 Students</span>
                </div>
              </div>
            </div> */}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
