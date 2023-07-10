import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";

const Home = (props) => {
  console.log(props.search, "+++", props.category);
  return (
    <section className="home-slide d-flex align-items-center">
      <div className="container">
        <div className="row ">
          <div className="col-md-7">
            <div className="home-slide-face aos" data-aos="fade-up">
              <div className="home-slide-text ">
                <h5>The Leader in Online Learning</h5>
                <h1>Engaging & Accessible Online Courses For All</h1>
                <p>Transforming Learning for Exam Excellence</p>
              </div>
              <div className="banner-content">
                <form className="form" action="course-list.html">
                  <div className="form-inner">
                    <div className="input-group">
                      <FontAwesomeIcon className="fas fa-magnifying-glass search-icon" />
                      <input
                        type="email"
                        className="form-control justify-content-center"
                        placeholder="Search School, Topics, Courses etc"
                        value={props.search}
                        onChange={props.handleSearch}
                      />
                      <span className="drop-detail">
                        <select
                          className="form-select pl-3 select"
                          value={props.category}
                          onChange={props.handleCategory}
                        >
                          <option>Courses</option>
                          <option>Educators</option>
                          <option>Materials</option>
                        </select>
                      </span>
                      <Link
                        className="btn btn-primary sub-btn"
                        type="submit"
                        onClick={() => props.setSearchPage(1)}
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className="trust-user">
                <p>
                  Trusted by over 15K students <br />
                  since 2023
                </p>
                <div className="trust-rating d-flex align-items-center">
                  <div className="rate-head">
                    <h2>
                      <span>1000</span>+
                    </h2>
                  </div>
                  <div
                    className="rating d-flex align-items-center"
                    style={{
                      gap: "8px",
                      color: "gold",
                      "font-size": "1.2rem",
                    }}
                  >
                    <h2 className="d-inline-block average-rating">5.0 </h2>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-5 d-flex align-items-center"
            style={{
              background: "url(/LandingPage/assets/img/blob.svg)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="girl-slide-img aos" data-aos="fade-up">
              <img src="/LandingPage/assets/img/hero-graphic.png" alt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
