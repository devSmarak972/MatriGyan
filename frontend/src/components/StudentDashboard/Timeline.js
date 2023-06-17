import React from "react";

const Timeline = () => {
  return (
    <div className="card col-span-12 pb-3 lg:col-span-6">
      <div className="mt-3 flex h-8 items-center justify-between px-4 sm:px-5">
        <h2 className="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
          Courses Timeline
        </h2>

        <div className="inline-flex">
          <button className="btn -mr-1.5 h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>

          <div x-ref="popperRoot" className="popper-root">
            <div className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
              <ul>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                  >
                    Another Action
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                  >
                    Something else
                  </a>
                </li>
              </ul>
              <div className="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
              <ul>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                  >
                    Separated Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="course-schedule-chart pr-2">
        <div x-init="$nextTick(() => { $el._x_chart = new ApexCharts($el,pages.charts.courseTimeline); $el._x_chart.render() });"></div>
      </div>
    </div>
  );
};

export default Timeline;
