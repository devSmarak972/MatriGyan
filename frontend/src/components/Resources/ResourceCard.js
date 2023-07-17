import React from "react";

function ResourceCard (props){
  console.log(props.rdata, "rdata");
  return (
    <>
    <div className="flex flex-col">
      <img
        className="h-44 w-full rounded-2xl object-cover object-center"
        src="https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png"
        alt="image"
      />
      <div className="bg-white hover:scale-105  duration-300 -mt-8 grow rounded-2xl p-4">
        <div>
          <a
            href="#"
            className="text-sm+ font-medium text-slate-700 line-clamp-1 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
          >
            {props.rdata.title}
          </a>
        </div>
        <p className="mt-2 grow line-clamp-3">{props.rdata.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center space-x-2 text-xs hover:text-slate-800 dark:hover:text-navy-100"
          >
            <div className="avatar h-6 w-6">
              <img className="rounded-full" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png" alt="avatar" />
            </div>
            <span className="line-clamp-1">Ojas Modak</span>
          </a>
          <p className="m-0 flex shrink-0 items-center space-x-1.5 text-slate-400 dark:text-navy-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-xs">14/07/2023</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResourceCard;
