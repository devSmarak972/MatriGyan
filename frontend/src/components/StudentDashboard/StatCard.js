import React from "react";

const StatCard = (props) => {
  return (
    <div class="card justify-between px-4 py-3 m-0 bg-white h-32">
      <p class="font-medium">{props.title}</p>
      <div class="flex items-center justify-between pt-4">
        <div>
          <span class="text-3xl font-semibold text-slate-700 dark:text-navy-100">
            {props.value}
          </span>
          {props.subtitle && (
            <span class="ml-1 text-xl font-semibold text-slate-700 dark:text-navy-100">
              {props.subtitle}
            </span>
          )}
          {props.den && <span>{" / " + props.den}</span>}
        </div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-primary dark:text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg> */}
        {props.icon}
      </div>
    </div>
  );
};

export default StatCard;
