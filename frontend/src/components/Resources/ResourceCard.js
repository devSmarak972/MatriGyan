import React from "react";

const ResourceCard = ({ props }) => {
  return (
    <div class="flex flex-col">
      <img
        class="h-44 w-full rounded-2xl object-cover object-center"
        src={props.bgimage}
        alt="image"
      />
      <div class="bg-white hover:scale-105  duration-300 -mt-8 grow rounded-2xl p-4">
        <div>
          <a
            href="#"
            class="text-sm+ font-medium text-slate-700 line-clamp-1 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
          >
            {props.name}
          </a>
        </div>
        <p class="mt-2 grow line-clamp-3">{props.description}</p>
        <div class="mt-4 flex items-center justify-between">
          <a
            href="#"
            class="flex items-center space-x-2 text-xs hover:text-slate-800 dark:hover:text-navy-100"
          >
            <div class="avatar h-6 w-6">
              <img class="rounded-full" src={props.avatar} alt="avatar" />
            </div>
            <span class="line-clamp-1">{props.uploader}</span>
          </a>
          <p class="m-0 flex shrink-0 items-center space-x-1.5 text-slate-400 dark:text-navy-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
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
            <span class="text-xs">{props.date}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
