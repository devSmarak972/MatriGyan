import React from "react";
import Course from "./Course";

const CompletedCourses = () => {
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
      <div className="col-span-12 lg:col-span-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
            Completed Courses
          </h2>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-1">
          {courses.map((el) => {
            console.log(el,"cc");
            return <Course {...el} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CompletedCourses;
