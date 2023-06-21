import React from "react";
import { motion } from "framer-motion";
import "../../pages/StudentDashboard/css/studentDashboard.css";

const Course = (props) => {
  console.log(props)
  return (
    <div className="card m-0">
      <div className="flex justify-between space-x-2 max-h-40">
        <div className="px-3.5 py-2.5 flex flex-1 flex-col justify-between">
          <div>
            <a
              href="#"
              className="font-medium text-slate-700 outline-none transition-colors line-clamp-2 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
            >
              {props.coursename}
            </a>
            <a
              href="#"
              className="text-xs text-slate-400 hover:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100"
            >
              {props.educator}
            </a>
          </div>
          <div className="my-2">
            <div className="mb-1 flex justify-between">
              <span className="text-xs font-semibold text-chalk-600 bg-slate-200 px-1 py-0.5 rounded">
                English
              </span>
              <span
                className={`text-sm font-medium dark:text-green ${
                  props.percent === 100
                    ? `text-green-600`
                    : `text-[var(--primary)]`
                }`}
              >
                {props.percent}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 dark:bg-gray-700">
              <motion.div
                className={`${
                  props.percent === 100 ? `bg-green-500` : `bg-[var(--primary)]`
                } h-2 rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${props.percent}%` }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs">
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
              <p class="mb-0">16h 14m</p>
            </div>
            <div className="mx-2 my-1 w-px self-stretch bg-slate-200 dark:bg-navy-500"></div>
            <span className="line-clamp-1">475 Students </span>
          </div>
        </div>
        <img
          className="h-40 w-40 rounded-r-lg object-contain"
          src={props.image}
          alt="image"
        />
      </div>
    </div>
  );
};

export default Course;
