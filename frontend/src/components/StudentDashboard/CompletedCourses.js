import React from "react";
import Course from "./Course";
import { Link } from "react-router-dom";

const CompletedCourses = (props) => {

  var courses = [
    {
      percent: 100,
      coursename: "Basic Mathematics - I",
      educator: "Anand Yadav",
      image: "https://i.ytimg.com/vi/dfUDCgaFOBE/maxresdefault.jpg",
    },
    {
      percent: 90,
      coursename: "JEE Mains Physics Crash Course",
      educator: "Mridul Nayak",
      image:
        "https://www.careerorbits.com/wp-content/uploads/2022/04/JMCC-page-thumbnail.jpg",
    },
    {
      percent: 45,
      coursename: "JEE Advanced PYQ rapid",
      educator: "Adarsh Gupta",
      image:
        "https://score-cdn-devinfinitylearn.s3.ap-south-1.amazonaws.com/Ilwebsite/Autopayment/jeeAdvancedThb.webp",
    },
    {
      percent: 50,
      coursename: "JEE Mains Success Achiever Course",
      educator: "Anand Yadav",
      image:
        "https://www.vedantu.com/seo/learning-videos/18aa5c5d-1fb7-41ee-b091-bc65f1a72865.png",
    },
  ];
  return (
    <>
      <div className="col-span-12 sm:col-span-6 lg:col-span-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
            Completed Courses
          </h2>
          <Link to='/developing'>
          <a
            href="#"
            class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
          >
            View All
          </a>
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-1">
          {props?.courses.length !== 0 ? (
            props.courses
              .map((el) => {
                return {
                  rating: el.rating,
                  enrolled: el.enrolled,
                  ongoing: el.ongoing,
                  coursename: el.title,
                  percent: parseInt(Math.random() * 90 + 10),
                  educator: el.educator.name,
                  image: el.image
                    ? el.image
                    : "https://i.ytimg.com/vi/dfUDCgaFOBE/maxresdefault.jpg",
                  duration: el.duration,
                };
              })
              .map((el) => {
                // console.log(el, "cc");
                return <Course {...el} />;
              })
          ) : (
            <p className="noHoverCard card p-4 mb-2 h-auto justify-center flex flex-col gap-y-2 col-span-2">
              No courses completed yet. Complete a course to view stats!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CompletedCourses;
