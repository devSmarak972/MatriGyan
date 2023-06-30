import React from 'react'
import CheckboxItem from "../../components/StudentDashboard/CheckboxItem";

const Tasklist = () => {
      var tasks = [
        {
          title: "Coordinate Geometry DPP",
          date: "May 1, 2023",
          message: "Due Tomorrow",
          messagetype: "text-warning",
        },
        {
          title: "Daily Physics Test",
          date: "May 4, 2023",
        },
        {
          title: "Solution of Triangles Revision",
          date: "April 30, 2023",
          message: "Due Today",
          messagetype: "text-danger",
        },
        {
          title: "JEE Mains Full Syllabus Test",
          date: "May 1, 2023",
          message: "Syllabus Completed",
          messagetype: "text-success",
        },
        { title: "Doubt Clearing Session" },
      ];
  return (
    <div class="flex flex-col col-span-4">
      <div class="flex justify-between">
        <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
          Tasklist
        </h2>
        <span class="px-3 text-2xl text-muted">
          <i className="fas fa-plus"></i>
        </span>
      </div>
      <div class="card noHoverCard px-4 py-3 mb-2 h-auto gap-y-2 ">
        <div class="flex flex-col">
          {tasks.map(el => {
            return <CheckboxItem props={{ ...el }}></CheckboxItem>;
          })}
        </div>
        <div class="badge float-left mt-2 mr-auto bg-success/10 text-success dark:bg-success/15">
          3/10 completed
        </div>
      </div>
    </div>
  );
}

export default Tasklist