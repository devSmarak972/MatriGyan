import React from "react";
import "../../pages/StudentDashboard/css/app.css";
import { Rating } from "@mantine/core";

const Course = (props) => {
  return (
    <div className="card m-0">
      <div className="flex justify-between space-x-2 max-h-40">
        <div className="px-3.5 py-2.5 flex flex-1 flex-col justify-between">
          <div>
            <a
              href="#"
              className="font-medium text-slate-700 outline-none transition-colors line-clamp-2 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
            >
              Basic Mathematics - IIBasic Mathematics - II
            </a>
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-xs text-slate-400 hover:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100"
              >
                Alfredo Elliott
              </a>
              <span className="text-xs font-semibold text-chalk-600 bg-slate-200 px-1 py-0.5 rounded">
                English
              </span>
            </div>
          </div>
          <div className="">
            <div className="mb-1 flex justify-between">
              <div className="flex shrink-0 items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>16h 14m</span>
              </div>
              <span className="line-clamp-1">475 Students </span>
            </div>
          </div>
          <div className="flex flex-column items-end space-x-2 text-xs">
            <span className={`text-xs font-normal`}>
              {props.percent}% Completion Rate
            </span>
            {/* <div className="mx-2 my-1 w-px self-stretch bg-slate-200 dark:bg-navy-500"></div> */}
            <Rating value={3.5} fractions={5} readOnly className="m-0" />
          </div>
        </div>
        <img
          className="h-40 w-40 rounded-r-lg object-cover"
          src="StudentDashboard/images/others/testing-sm.jpg"
          alt="image"
        />
      </div>
    </div>
  );
};

export default Course;
