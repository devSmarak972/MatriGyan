import React from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EducatorClass = ( props ) => {
  return (
    <div class="itemCard py-3 flex flex-grow align-items-center">
      <div
        className={
          "startTime border-4 border-transparent px-2 flex align-items-center " + props.border
        }>
        <FontAwesomeIcon icon={faBook} className="text-2xl"></FontAwesomeIcon>
        <div className="pl-6 text-sm flex flex-col w-100">
          <span>{props.date}</span>
          <span>{props.start}</span>
        </div>
      </div>
      <div class={"flex flex-col justify-between px-4 "}>
        <div>
          <p class="text-base font-medium text-primary dark:text-navy-100 mb-0">
            {props.title}
          </p>
          {/* <p class="text-xs text-slate-400 dark:text-navy-300 mb-1">
            {props.educator}
          </p> */}
          <div className="classDuration pt-1 text-sm flex gap-2 align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{props.duration} mins</span>
          </div>
        </div>
      </div>
      <div className="tags flex">
        {props.tags?props.tags.map(tag => {
          return (
            <div class="badge mt-2 mx-1 bg-info/10 text-info dark:bg-info/15">
              {tag.tagname}
            </div>
          );
        }):""}
      </div>
      <span class="px-3">
        <button class="btn bg-success/10 text-sm text-success px-2.5 py-0.75 hover:bg-success/20 focus:bg-success/20 active:bg-success/25">
          Go Live
        </button>
      </span>
    </div>
  );
};

export default EducatorClass;
