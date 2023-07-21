import React from "react";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top aos" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <img src="/logo-bg.png" alt="logo" />
                </div>
                <div className="footer-about-content">
                  <p>
                    Our platform is a seamless blend of advanced technology and
                    exceptional education, empowering students to reach their
                    full potential and excel in their academic journey.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">For Instructor</h2>
                <ul>
                  <li>
                    <Link to='/educator/profile'><a href="#">Profile</a></Link>
                  </li>
                  <li>
                    <Link to='/login'><a href="#">Login</a></Link>
                  </li>
                  <li>
                    <Link to='/signup'><a href="register.html">Register</a></Link>
                  </li>
                  <li>
                    <Link to='/educator'><a href="#">Instructor</a></Link>
                  </li>
                  <li>
                  <Link to='/educator'><a href="#">Dashboard</a></Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">For Student</h2>
                <ul>
                  <li>
                    <Link to='/educator/profile'><a href="#">Profile</a></Link>
                  </li>
                  <li>
                    <Link to='/login'><a href="login.html">Login</a></Link>
                  </li>
                  <li>
                    <Link to='/signup'><a href="register.html">Register</a></Link>
                  </li>
                  <li>
                    <a href="students-list.html">Student</a>
                    <Link to='/student/profile'></Link>
                  </li>
                  <li>
                    
                    <Link to='/student'><a href="deposit-student-dashboard.html"> Dashboard</a></Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">News letter</h2>
                <div className="news-letter">
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email address"
                      name="email"
                    />
                  </form>
                </div>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <img
                      src="/LandingPage/assets/img/icon/icon-20.svg"
                      alt
                      className="img-fluid"
                    />
                    <p>
                      {" "}
                      IIT Kharagpur
                      <br />
                      West Bengal, Kharagpur -741044{" "}
                    </p>
                  </div>
                  <p>
                    <img
                      src="/LandingPage/assets/img/icon/icon-19.svg"
                      alt
                      className="img-fluid"
                    />
                    <a
                      href="/cdn-cgi/l/email-protection"
                      className="__cf_email__"
                      data-cfemail="16726473777b657a7b6556736e777b667a733875797b">
                      [email&#160;protected]
                    </a>
                  </p>
                  <p className="mb-0">
                    <img
                      src="/LandingPage/assets/img/icon/icon-21.svg"
                      alt
                      className="img-fluid"
                    />
                    +91 9332487812
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6">
                <div className="privacy-policy">
                  <ul>
                    <li>
                      <Link to='/not-found'><a href="">Terms</a></Link>
                    </li>
                    <li>
                    <Link to='/not-found'><a href="">Privacy</a></Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    &copy; 2023 DreamsLMS. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
