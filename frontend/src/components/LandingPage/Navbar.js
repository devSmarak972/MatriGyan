import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-free-solid";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-fixed">
        <nav className="navbar navbar-expand-lg add-header-bg  header-nav scroll-sticky">
          <div className="container">
            <div className="navbar-header">
              <a id="mobile_btn" href="javascript:void(0);">
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </a>
              <a href="index.html" className="navbar-brand logo">
                <img src="/logo-bg.png" className="" alt="Logo" style={{"max-height":"100px"}}/>
              </a>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <a href="index.html" className="menu-logo">
                  <img
                    src="/LandingPage/assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </a>
                <a
                  id="menu_close"
                  className="menu-close"
                  href="javascript:void(0);">
                  <i className="fas fa-times"></i>
                </a>
              </div>
              <ul className="main-nav">
                <li className="has-submenu active">
                  <a className href>
                    Home <FontAwesomeIcon icon={faChevronDown} />
                  </a>
                  <ul className="submenu">
                    <li className="active">
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="index-two.html">Home Two</a>
                    </li>
                    <li>
                      <a href="index-three.html">Home Three</a>
                    </li>
                    <li>
                      <a href="index-four.html">Home Four</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href>
                    Instructor <FontAwesomeIcon icon={faChevronDown} />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="instructor-dashboard.html">Dashboard</a>
                    </li>
                    <li className="has-submenu">
                      <a href="instructor-list.html">Instructor</a>
                      <ul className="submenu">
                        <li>
                          <a href="instructor-list.html">List</a>
                        </li>
                        <li>
                          <a href="instructor-grid.html">Grid</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="instructor-course.html">My Course</a>
                    </li>
                    <li>
                      <a href="instructor-reviews.html">Reviews</a>
                    </li>
                    <li>
                      <a href="instructor-earnings.html">Earnings</a>
                    </li>
                    <li>
                      <a href="instructor-orders.html">Orders</a>
                    </li>
                    <li>
                      <a href="instructor-payouts.html">Payouts</a>
                    </li>
                    <li>
                      <a href="instructor-tickets.html">Support Ticket</a>
                    </li>
                    <li>
                      <a href="instructor-edit-profile.html">
                        Instructor Profile
                      </a>
                    </li>
                    <li>
                      <a href="instructor-security.html">Security</a>
                    </li>
                    <li>
                      <a href="instructor-social-profiles.html">
                        Social Profiles
                      </a>
                    </li>
                    <li>
                      <a href="instructor-notification.html">Notifications</a>
                    </li>
                    <li>
                      <a href="instructor-profile-privacy.html">
                        Profile Privacy
                      </a>
                    </li>
                    <li>
                      <a href="instructor-delete-profile.html">
                        Delete Profile
                      </a>
                    </li>
                    <li>
                      <a href="instructor-linked-account.html">
                        Linked Accounts
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href>Student</a>
                  <ul className="submenu first-submenu">
                    <li className="has-submenu ">
                      <a href="students-list.html">Student</a>
                      <ul className="submenu">
                        <li>
                          <a href="students-list.html">List</a>
                        </li>
                        <li>
                          <a href="students-grid.html">Grid</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="setting-edit-profile.html">Student Profile</a>
                    </li>
                    <li>
                      <a href="setting-student-security.html">Security</a>
                    </li>
                    <li>
                      <a href="setting-student-social-profile.html">
                        Social profile
                      </a>
                    </li>
                    <li>
                      <a href="setting-student-notification.html">
                        Notification
                      </a>
                    </li>
                    <li>
                      <a href="setting-student-privacy.html">Profile Privacy</a>
                    </li>
                    <li>
                      <a href="setting-student-accounts.html">Link Accounts</a>
                    </li>
                    <li>
                      <a href="setting-student-referral.html">Referal</a>
                    </li>
                    <li>
                      <a href="setting-student-subscription.html">
                        Subscribtion
                      </a>
                    </li>
                    <li>
                      <a href="setting-student-billing.html">Billing</a>
                    </li>
                    <li>
                      <a href="setting-student-payment.html">Payment</a>
                    </li>
                    <li>
                      <a href="setting-student-invoice.html">Invoice</a>
                    </li>
                    <li>
                      <a href="setting-support-tickets.html">Support Tickets</a>
                    </li>
                  </ul>
                </li>
                {/* <li className="has-submenu">
                  <a href>
                    Pages <FontAwesomeIcon icon={faChevronDown} />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="notifications.html">Notification</a>
                    </li>
                    <li>
                      <a href="pricing-plan.html">Pricing Plan</a>
                    </li>
                    <li>
                      <a href="wishlist.html">Wishlist</a>
                    </li>
                    <li className="has-submenu">
                      <a href="course-list.html">Course</a>
                      <ul className="submenu">
                        <li>
                          <a href="add-course.html">Add Course</a>
                        </li>
                        <li>
                          <a href="course-list.html">Course List</a>
                        </li>
                        <li>
                          <a href="course-grid.html">Course Grid</a>
                        </li>
                        <li>
                          <a href="course-details.html">Course Details</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-submenu">
                      <a href="come-soon.html">Error</a>
                      <ul className="submenu">
                        <li>
                          <a href="come-soon.html">Comeing soon</a>
                        </li>
                        <li>
                          <a href="error-404.html">404</a>
                        </li>
                        <li>
                          <a href="error-500.html">500</a>
                        </li>
                        <li>
                          <a href="under-construction.html">
                            Under Construction
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="support.html">Support</a>
                    </li>
                    <li>
                      <a href="job-category.html">Category</a>
                    </li>
                    <li>
                      <a href="cart.html">Cart</a>
                    </li>
                    <li>
                      <a href="checkout.html">Checkout</a>
                    </li>
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="register.html">Register</a>
                    </li>
                    <li>
                      <a href="forgot-password.html">Forgot Password</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href>
                    Blog <FontAwesomeIcon icon={faChevronDown} />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a href="blog-list.html">Blog List</a>
                    </li>
                    <li>
                      <a href="blog-grid.html">Blog Grid</a>
                    </li>
                    <li>
                      <a href="blog-masonry.html">Blog Masonry</a>
                    </li>
                    <li>
                      <a href="blog-modern.html">Blog Modern</a>
                    </li>
                    <li>
                      <a href="blog-details.html">Blog Details</a>
                    </li>
                  </ul>
                </li> */}
                <li className="login-link">
                  <a href="login.html">Login / Signup</a>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <a className="nav-link header-sign" href="login.html">
                  Signin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header-login" href="register.html">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
