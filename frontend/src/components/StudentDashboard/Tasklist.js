import React, { useState, useEffect ,useRef} from "react";
import CheckboxItem from "../../components/StudentDashboard/CheckboxItem";

const Tasklist = (props) => {
  // var tasks = [
  //   {
  //     title: "Coordinate Geometry DPP",
  //     date: "May 1, 2023",
  //     message: "Due Tomorrow",
  //     messagetype: "text-warning",
  //   },
  //   {
  //     title: "Daily Physics Test",
  //     date: "May 4, 2023",
  //   },
  //   {
  //     title: "Solution of Triangles Revision",
  //     date: "April 30, 2023",
  //     message: "Due Today",
  //     messagetype: "text-danger",
  //   },
  //   {
  //     title: "JEE Mains Full Syllabus Test",
  //     date: "May 1, 2023",
  //     message: "Syllabus Completed",
  //     messagetype: "text-success",
  //   },
  //   { title: "Doubt Clearing Session" },
  // ];
  const [numcompleted, setnumcompleted] = useState(0);
const tasks=useRef([]);
  var today = new Date();
  // console.log(props.start.getTime());

  var num = 0;
  useEffect(() => {
    tasks.current = props.tasks?.map((el) => {
      if (el.completed) num++;
      var end = new Date(props.due_date);
      end.setMinutes(end.getMinutes() + props.time);
      var status = today < props.due_date ? 2 : 1;

      return {
        title: el.title,
        date: new Date(el.due_date),
        message:
          el.completed === true
            ? "Completed"
            : status === 2
            ? "Pending"
            : "Delayed",
        messagetype:
          el.completed === true
            ? "text-success"
            : status === 2
            ? "text-warning"
            : "text-danger",
        completed: el.completed,
      };
    });
    return () => setnumcompleted(num);
  }, []);

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
          {tasks.current?tasks.current.map(el => {
            return <CheckboxItem props={{ ...el }}></CheckboxItem>;
          }):<p>No tasks created</p>}
        </div>
        <div class="badge float-left mt-2 mr-auto bg-success/10 text-success dark:bg-success/15">
          {numcompleted}/{tasks.current?tasks.current.length:0} completed
        </div>
      </div>
    </div>
  );
};

export default Tasklist;
