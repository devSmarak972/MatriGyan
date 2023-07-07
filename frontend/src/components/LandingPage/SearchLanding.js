import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowRight,
  faStar,
} from "@fortawesome/fontawesome-free-solid";
import "font-awesome/css/font-awesome.min.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Category from "./Category";

import CourseData from "../Courses/Details.json";
import ResourceData from "../Resources/resources.json";
import Card from "../SearchPage/Card";
import Row from "../Courses/Row";
import "../Courses/transition.css";
import Courses from "../Courses/Courses";
import "../../pages/CoursePage/css/material-icons.css";
import "../../pages/CoursePage/css/app.css";
import "../Courses/transition.css";
import Column from "../Courses/Column";
import EducatorData from "../LandingPage/instructors.json";
import OwlCarousel from "react-owl-carousel-autoheight";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ResourceSection from "../Resources/ResourceSection";
import ResourceCard from "../Resources/ResourceCard";

const SearchLanding = (props) => {
  const [scroll, setScroll] = useState(false);

  const [courses, setCourses] = useState(
    CourseData.filter((course) =>
      course.name.toLowerCase().includes(props.search.toLowerCase())
    )
  );
  useEffect(() => {
    setCourses(
      CourseData.filter((course) =>
        course.name.toLowerCase().includes(props.search.toLowerCase())
      )
    );
  }, [props.search]);

  const [educators, setEducators] = useState(
    EducatorData.filter((educator) =>
      educator.name.toLowerCase().includes(props.search.toLowerCase())
    )
  );
  useEffect(() => {
    setEducators(
      EducatorData.filter((educator) =>
        educator.name.toLowerCase().includes(props.search.toLowerCase())
      )
    );
  }, [props.search]);

  const [resources, setResources] = useState({
    sections: ResourceData.sections.map((section) => ({
      ...section,
      cards: section.cards.filter((card) =>
        card.name.toLowerCase().includes(props.search.toLowerCase())
      ),
    })),
  });
  useEffect(() => {
    setResources({
      sections: ResourceData.sections.map((section) => ({
        ...section,
        cards: section.cards.filter((card) => {
          console.log(card.name.toLowerCase(), props.search.toLowerCase());
          console.log(
            card.name.toLowerCase().includes(props.search.toLowerCase())
          );
          return card.name.toLowerCase().includes(props.search.toLowerCase());
        }),
      })),
    });
  }, [props.search]);

  console.log(props.category.length, props.search.length);

  return (
    <div className="page-section tw-page mt-[120px]">
      <div className="container page__container py-6">
        {(props.search.length !== 0) && (props.category.length !== 0) && (
          <p className="font-bold text-lg">
            Showing Results for "{props.search}" ({props.category})
          </p>
        )}
        {props.category === "Courses" && <Courses courseData={courses} />}
        {props.category === "Educators" && (
          <OwlCarousel
            items={4}
            className="owl-theme instructors-course aos"
            // loop
            nav
            margin={8}
            data-aos="fade-up"
          >
            {educators.map((educator) => (
              <div className="instructors-widget">
                <div className="instructors-img ">
                  <a href="instructor-list.html">
                    <img className="img-fluid" alt src={educator.image} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="instructor-profile.html">{educator.name}</a>
                  </h5>
                  <p>{educator.subtitle}</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-user-group"></i>
                    <span>{educator.students}</span>
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
        )}
        {props.category === "Materials" &&
          resources.sections.map((el) => (
            <div class="mt-4 transition-all duration-[.25s] sm:mt-5 lg:mt-6">
              <div class="flex h-8 items-center justify-between">
                <span class="text-base font-medium tracking-wide text-slate-700 dark:text-navy-100">
                  {el.sectionname}
                </span>
                <a
                  href="#"
                  class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
                >
                  View All
                </a>
              </div>
              <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {el.cards.map((card) => {
                  return <ResourceCard props={card}></ResourceCard>;
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchLanding;
