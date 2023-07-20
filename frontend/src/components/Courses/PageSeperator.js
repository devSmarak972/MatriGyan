import React from "react";

function PageSeperator({ title }) {
  return (
    <div className="page-separator">
      <div class="text-base uppercase font-medium tracking-wide text-slate-700 dark:text-navy-100">
        {title}
      </div>
    </div>
  );
}

export default PageSeperator;
