import React from 'react'

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-top aos" data-aos="fade-up">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="footer-widget footer-about">
                <div class="footer-logo">
                  <img src="/logo-bg.png" alt="logo" />
                </div>
                <div class="footer-about-content">
                  <p>
                    Our platform is a seamless blend of advanced technology and
                    exceptional education, empowering students to reach their
                    full potential and excel in their academic journey.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6">
              <div class="footer-widget footer-menu">
                <h2 class="footer-title">For Instructor</h2>
                <ul>
                  <li>
                    <a href="instructor-profile.html">Profile</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="register.html">Register</a>
                  </li>
                  <li>
                    <a href="instructor-list.html">Instructor</a>
                  </li>
                  <li>
                    <a href="deposit-instructor-dashboard.html"> Dashboard</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-6">
              <div class="footer-widget footer-menu">
                <h2 class="footer-title">For Student</h2>
                <ul>
                  <li>
                    <a href="student-profile.html">Profile</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="register.html">Register</a>
                  </li>
                  <li>
                    <a href="students-list.html">Student</a>
                  </li>
                  <li>
                    <a href="deposit-student-dashboard.html"> Dashboard</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="footer-widget footer-contact">
                <h2 class="footer-title">News letter</h2>
                <div class="news-letter">
                  <form>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your email address"
                      name="email"
                    />
                  </form>
                </div>
                <div class="footer-contact-info">
                  <div class="footer-address">
                    <img
                      src="/LandingPage/assets/img/icon/icon-20.svg"
                      alt
                      class="img-fluid"
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
                      class="img-fluid"
                    />
                    <a
                      href="/cdn-cgi/l/email-protection"
                      class="__cf_email__"
                      data-cfemail="16726473777b657a7b6556736e777b667a733875797b">
                      [email&#160;protected]
                    </a>
                  </p>
                  <p class="mb-0">
                    <img
                      src="/LandingPage/assets/img/icon/icon-21.svg"
                      alt
                      class="img-fluid"
                    />
                    +91 9332487812
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <div class="copyright">
            <div class="row">
              <div class="col-md-6">
                <div class="privacy-policy">
                  <ul>
                    <li>
                      <a href="term-condition.html">Terms</a>
                    </li>
                    <li>
                      <a href="privacy-policy.html">Privacy</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="copyright-text">
                  <p class="mb-0">
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
}

export default Footer