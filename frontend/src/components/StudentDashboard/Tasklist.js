import React, { useState, useEffect ,useRef} from "react";
import CheckboxItem from "../../components/StudentDashboard/CheckboxItem";

const Tasklist = (props) => {
  console.log(props.tasks)
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
  // const [numcompleted, setnumcompleted] = useState(0);
  const [tasks, settasks] = useState(false);
// const tasks=useRef([]);
  var today = new Date();
  console.log(tasks,":tasks");

  var num = 0;
  useEffect(() => {
   var taskstmp= props.tasks?.map((el) => {
      if (el.completed) num++;
      var end = new Date(el.due_date);
      // end.setMinutes(end.getMinutes() + el.time);
      var status = today < el.due_date ? 2 : 1;
       var date=""+end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate();
       console.log(end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate())
      return {
        id:el.id,
        title: el.name,
        date: date,
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
    settasks({"tasks":taskstmp,"numcompleted":num})
    // return () => setnumcompleted(num);
  }, []);
function handleCheck(el){
  console.log(el.currentTarget.checked)
  var id=parseInt(el.currentTarget.id.substring(5));
  if(tasks)
  {
    var tmptasks={"tasks":tasks.tasks.map(a => {return {...a}}),"numcompleted":tasks.numcompleted}
    tmptasks.tasks.find(it=>it.id===id).completed=!el.currentTarget.checked;
    if(el.currentTarget.checked)tmptasks.numcompleted+=1;
    else tmptasks.numcompleted-=1;
  settasks(tmptasks)
}
else{
  console.log("tasks not defined")
}
}
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
     { tasks ?
      <div class="card noHoverCard px-4 py-3 mb-2 h-auto gap-y-2 ">
        <div class="flex flex-col">
          {( tasks.tasks) && (tasks.tasks.length!==0)?tasks.tasks.map(el => {
            return <CheckboxItem key={el.id} props={{ ...el ,handleCheck:handleCheck}}></CheckboxItem>;
          }):<p>No tasks created</p>}
        </div>
        <div class="badge float-left mt-2 mr-auto bg-success/10 text-success dark:bg-success/15">
          {tasks.numcompleted}/{tasks.tasks?tasks.tasks.length:0} completed
        </div>
      </div>:<p className="p-3">Loading...</p>}
    </div>
  );
};

export default Tasklist;
