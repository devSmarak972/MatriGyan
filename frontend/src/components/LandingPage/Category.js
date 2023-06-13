import React from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Category = () => {
  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>Exams</span>
            <h2>Top Category</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <a href="job-category.html" className="btn btn-primary">
              All Categories
            </a>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </p>
        </div>
        {/* <div className="owl-carousel mentoring-course owl-theme aos" data-aos="fade-up"> */}
        <OwlCarousel
          items={5}
          className="owl-theme"
          loop
          nav
          margin={8}
          data-aos="fade-up">
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img src="/LandingPage/assets/img/book.jpg" alt />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">JEE Main</div>
                </div>
              </div>
              <p>40 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/book.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">JEE Advanced</div>
                </div>
              </div>
              <p>45 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/hat.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">NEET</div>
                </div>
              </div>
              <p>40 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/pen.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">JEE/NEET Foundation</div>
                </div>
              </div>
              <p>23 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/pen.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">CBSE Class 11 PCM</div>
                </div>
              </div>
              <p>30 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/pen.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">CBSE Class 12 PCM</div>
                </div>
              </div>
              <p>80 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/pen.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">CBSE Class 10</div>
                </div>
              </div>
              <p>40 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/hat.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">JEE/NEET Foundation Class 9</div>
                </div>
              </div>
              <p>45 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/book.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">JEE Mains Crash Course</div>
                </div>
              </div>
              <p>45 Instructors</p>
            </div>
          </div>
          <div className="feature-box text-center ">
            <div className="feature-bg">
              <div className="feature-header">
                <div className="feature-icon">
                  <img
                    src="/LandingPage/assets/img/pen.jpg"
                    alt
                  />
                </div>
                <div className="feature-cont">
                  <div className="feature-text">CBSE Crash Course</div>
                </div>
              </div>
              <p>45 Instructors</p>
            </div>
          </div>

        </OwlCarousel>
      </div>
    </section>
  );
}

export default Category