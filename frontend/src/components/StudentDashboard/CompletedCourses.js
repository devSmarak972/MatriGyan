import React from "react";
import Course from "./Course";

const CompletedCourses = () => {
  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
            Completed Courses
          </h2>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-1">
          <Course percent={100} />
          <Course percent={100} />
          <Course percent={100} />
          <Course percent={100} />
        </div>
      </div>
    </>
  );
};

export default CompletedCourses;
