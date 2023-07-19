import React from "react";

const ResourceSectionHeader = (props) => {
  console.log("HIAHIHVIS", props.title);
  return (
    <div class="flex h-8 items-center justify-between">
      <span class="text-base font-medium tracking-wide text-slate-700 dark:text-navy-100">
        {props.title}
      </span>
      <a
        href="#"
        class="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
      >
        View All
      </a>
    </div>
  );
};

export default ResourceSectionHeader;
