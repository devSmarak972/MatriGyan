import React from "react";
import { motion } from "framer-motion";

const Test = (props) => {
  // console.log(props,"in test")
  var today = new Date();
  // console.log(props.start.getTime());
  var end = new Date(props.start);
  end.setMinutes(end.getMinutes() + props.time);
  const status = today < props.start ? 2 : today > end ? 0 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`card px-4 py-2 mb-2 h-32 justify-center ${
        status === 1 ? `font-semibold border-2 border-red-200` : ``
      }`}>
      <div className="flex items-center space-x-3 justify-between">
        <div>
          <p className="text-base font-medium text-slate-700 dark:text-navy-100">
            {props.title}
          </p>
          <p className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
            {props.questions + " questions, " + props.time + " minutes"}
          </p>
          <div className="mt-3 flex items-center space-x-2 text-slate-400 dark:text-navy-300">
            {status !== 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5 mx-0 text-slate-400 dark:text-navy-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
            <span className="text-xs">
              {
              status === 0
                ? props.start.getHours() +
                  `:` +
                  (props.start.getMinutes() < 10
                    ? `0${props.start.getMinutes()}`
                    : props.start.getMinutes()) +
                  ` ` +
                  props.start.getDate() +
                  `/` +
                  props.start.getMonth() +
                  `/` +
                  props.start.getFullYear()
                : status === 2
                ? props.start.getHours() +
                  `:` +
                  (props.start.getMinutes() < 10
                    ? `0${props.start.getMinutes()}`
                    : props.start.getMinutes()) +
                  ` ` +
                  props.start.getDate() +
                  `/` +
                  props.start.getMonth() +
                  `/` +
                  props.start.getFullYear()
                : ``
            }</span>
            <span
              className={`${status !== 1 ? `mx-3` : `m-0`} text-xs ${
                status === 0
                  ? `bg-slate-200`
                  : status === 1
                  ? ``
                  : `bg-blue-100`
              } ${
                status === 0
                  ? `text-slate-500`
                  : status === 1
                  ? `text-red-500`
                  : `text-blue-500`
              } ${
                status === 1 ? `font-semibold border-1 border-red-200` : ``
              } rounded px-1 py-0.5`}>
              {`${
                status === 0 ? `PAST` : status === 1 ? `LIVE NOW` : `UPCOMING`
              }`}
            </span>
          </div>
        </div>
        {!isNaN(props.marks) && (
          <div className="single-chart justify-around">
            <svg viewBox="0 0 36 36" className="w-20 circular-chart blue">
              <path
                className="circle-bg"
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${
                  (props.marks / props.totalmarks) * 100
                }, 100`}
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {props.marks + " / " + props.totalmarks}
              </text>
            </svg>
          </div>
        )}
        {!props.marks && status === 1 && (
          <div className="w-20 flex flex-column items-center gap-2">
            <span className="font-semibold text-[var(--primary)]">ATTEMPT</span>
            <button className="btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 hover:shadow-lg hover:shadow-slate-200/50 focus:bg-slate-200 focus:shadow-lg focus:shadow-slate-200/50 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:hover:shadow-navy-450/50 dark:focus:bg-navy-450 dark:focus:shadow-navy-450/50 dark:active:bg-navy-450/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Test;
