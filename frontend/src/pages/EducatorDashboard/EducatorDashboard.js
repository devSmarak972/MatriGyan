import React,{useEffect,useRef,useState} from "react";
import Sidebar from "../../components/EducatorDashboard/Sidebar";
// import CurrentCourses from "../../components/EducatorDashboard/CurrentCourses";
import CurrentCourses from "../../components/StudentDashboard/CurrentCourses";
import Welcome from "../../components/EducatorDashboard/Welcome";
import Statistics2 from "../../components/EducatorDashboard/Statistics";
import Graphs2and3 from "../../components/EducatorDashboard/graphs/Graphs2and3";
import Graph1 from "../../components/EducatorDashboard/graphs/Graph1";
import Reviews from "../../components/EducatorDashboard/Reviews";
import Doubts from "../../components/EducatorDashboard/Doubts";
import DashboardCalendar from "../../components/StudentDashboard/DashboardCalendar";
import Tasklist from "../../components/StudentDashboard/Tasklist";
import axios from "axios";
import EducatorClass from "../../components/EducatorDashboard/EducatorClass";
import { Navigate, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
const EducatorDashboard = () => {
  const navigate=useNavigate()
  var classes = [
    {
      border: "border-l-info",
      classname: "JEE Mains Master course",
      educator: "Arvind Gupta",
      tags: ["Physics", "JEE"],
    },
    {
      border: "border-l-secondary",
      classname: "JEE Mains Master course",
      educator: "Arvind Gupta",
      tags: ["Physics", "JEE"],
    },
    {
      border: "border-l-warning",
      classname: "JEE Mains Master course",
      educator: "Arvind Gupta",
      tags: ["Physics", "JEE"],
    },
    {
      border: "border-l-info",
      classname: "JEE Mains Master course",
      educator: "Arvind Gupta",
      tags: ["Physics", "JEE"],
    },
  ];
   const [Data, setData] = useState(false);
   const mounted = useRef(false);
   useEffect(() => {
     mounted.current = true;
     const config = {
       withCredentials: true,
       // headers: {
       //   "X-CSRFToken": getCookie("csrftoken"),
       // },
     };
     console.log("config", "config");
     axios.get(`${process.env.REACT_APP_BACKEND_URL}/educator-dashboard-data`, config).then((res) => {
       console.log(res);
       console.log(res.data, "received data");
       if(!res.data.success)
       {
        if(res.code===2)
        navigate("/student")
        else
        navigate("/login")

       }
       if (mounted.current) {
         setData(res.data);
       }
     }).catch(err=>{
      toast(err.message)
      navigate("/")

     });
     return () => (mounted.current = false);
   }, []);

 
  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar />
      <main className="main-content w-full pb-8">
        <Welcome />
        <CurrentCourses courses={Data.courses} type="educator" />
        <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
          {/* <Statistics1 completed={5} inprogress={3} /> */}
        {  Data?<Statistics2
            taughthrs={Data.taughtTime}
            taughtmin={parseInt(Math.random()*50+10)}
            students={Data.numStudents}
            watchtimehrs={Data.watchTime}
            watchtimemin={45}
            tests={Data.numTests}
            avgrating={Data.rating}
            courses={Data.courses?.length}
          />:<p>Loading</p>}
          <div className="mt-4 col-span-12 lg:col-span-6 h-[300px] sm:h-[400px]">
            <span className="ml-12 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
              Course Completion Rate
            </span>
            <Graph1 course={Data.courses}/>
          </div>
          <div class="flex flex-col  col-span-8">
            <div class="flex justify-between">
              <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                Classes
              </h2>
              <span class="px-3 text-2xl text-muted">
                <i className="fas fa-plus"></i>
              </span>
            </div>
            <div className="noHoverCard card px-0 py-2 mb-2 h-auto justify-center flex flex-col gap-y-2">
              {Data?.classes?.length?Data.classes.map(el => {
                var date=new Date(el.start)
                date=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
                var startDate=new Date(el.start);
                var startTime=startDate.getTime();
                var endTime=new Date(el.end);
                endTime=endTime.getTime();
                var duration=parseInt(((endTime-startTime)/(1000*60)))
                startTime=startDate.toLocaleTimeString(undefined, {timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
                return <EducatorClass title={el.title} date={date} start={startTime} duration={duration} tags={el.tags}></EducatorClass>;
              }):<p className="p-3">No classes scheduled</p>}
            </div>
          </div>
          <div class="flex flex-col col-span-4">
            <div class="flex justify-between">
              <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                Calendar
              </h2>
              <a
                href="#"
                class="pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
                View
              </a>
            </div>

            <DashboardCalendar></DashboardCalendar>
          </div>
          <Reviews feedback={Data?.feedback}/>
          <Doubts course={Data?.courses} comments={Data?.comments}/>
          <Tasklist tasks={Data?.tasks}></Tasklist>
          {/* <Tests/>
          <LiveLectures/> */}
          <Graphs2and3 courses={Data?.courses} />
          {/* <MakingCourses /> */}
        </div>
      </main>
    </div>
  );
};

export default EducatorDashboard;
