import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-free-solid";
import {
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const [scroll, setScroll] = useState(false);
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     var val=window.scrollTop() > 100;
  //     console.log(val)
  //     setScroll(true);
  //   });
  // }, []);
  return (
    <header className="header">
      <div className="header-fixed">
        <nav
          className={
            scroll
              ? "navbar navbar-expand-lg add-header-bg  header-nav scroll-sticky"
              : "navbar navbar-expand-lg  header-nav scroll-sticky"
          }
        >
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
                <img
                  src="/logo-bg.png"
                  className=""
                  alt="Logo"
                  style={{ "max-height": "100px" }}
                />
              </a>
            </div>
            
            {props.searchPage? (
              <div className="banner-content m-0">
                <form
                  className="form border rounded-full"
                  // action="course-list.html"
                >
                  <div className="form-inner p-2">
                    <div className="input-group gap-2 items-center">
                      <FontAwesomeIcon icon={faMagnifyingGlass} color="grey" />
                      <input
                        type="email"
                        className="form-control justify-content-center m-0"
                        placeholder="Search"
                        value={props.search}
                        onChange={props.handleSearch}
                      />
                      <span className="drop-detail m-0">
                        <select
                          className="form-select pl-3 select w-fit"
                          value={props.category}
                          onChange={props.handleCategory}
                        >
                          <option>Courses</option>
                          <option>Educators</option>
                          <option>Materials</option>
                        </select>
                      </span>
                      <button
                        className="w-[44px] h-[44px] btn btn-primary sub-btn p-0"
                        // type="submit"
                        onClick={() => props.setSearchPage(0)}
                      >
                        <FontAwesomeIcon icon={faArrowRight} rotation={180} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ):""}

            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <a className="nav-link header-sign" href="login">
                  Signin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header-login" href="signup">
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
