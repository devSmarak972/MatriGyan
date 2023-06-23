import React from "react";
import ResourceCard from "./ResourceCard";
const ResourceSection = ({props}) => {
  console.log(props,"resources");
  return (
    <div class="mt-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 lg:mt-6">
      <div class="flex h-8 items-center justify-between">
        <h2 class="text-base font-medium tracking-wide text-slate-700 dark:text-navy-100">
          {props.sectionname}
        </h2>
        <a
          href="#"
          class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
          View All
        </a>
      </div>
      <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {props.cards.map(el => {
          return <ResourceCard props={el}></ResourceCard>;
        })}
      </div>
    </div>
  );
};

export default ResourceSection;
