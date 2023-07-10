import React, { useEffect, useRef, useState } from "react";
import CompletedCourses from "../../components/StudentDashboard/CompletedCourses";
import Sidebar from "../../components/StudentDashboard/Sidebar";
import CurrentCourses from "../../components/StudentDashboard/CurrentCourses";
import Welcome from "../../components/StudentDashboard/Welcome";
import Statistics1 from "../../components/StudentDashboard/Statistics1";
import Statistics2 from "../../components/StudentDashboard/Statistics2";
import Tests from "../../components/StudentDashboard/Tests";
import LiveLectures from "../../components/StudentDashboard/LiveLectures";
import ItemCard from "../../components/StudentDashboard/ItemCard";
import { Checkbox } from "@mantine/core";
import DashboardCalendar from "../../components/StudentDashboard/DashboardCalendar";
import Tasklist from "../../components/StudentDashboard/Tasklist";
import axios from "axios";
import { getCookie } from "../../utils/apiCaller";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate=useNavigate();
  const [Data, setData] = useState({});
  const mounted = useRef(false);
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    
    console.log(loader,"loader")
    setLoader(false);
    
 
},[])
  useEffect(() => {
    mounted.current = true;
    const config = {
      withCredentials: true,
      // headers: {
      //   "X-CSRFToken": getCookie("csrftoken"),
      // },
    };
    console.log("config", "config");
    axios.get(`http://localhost:8000/student-dashboard-data`, config).then((res) => {
      console.log(res);
      console.log(res.data, "received data");
      if(!res.data.success)
       {
        if(res.code===2)
        navigate("/educator")
        else
        navigate("/")

       }
      if (mounted.current) {
        setData(res.data);
      }
    });
    return () => (mounted.current = false);
  }, []);

 
  var comp = 0;
  if (Object.keys(Data).length)
    comp = Data.enrolled_courses.length - Data.on_courses.length;
  return (
    <>
    {loader?<Loader></Loader>:""}
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar />
      <main className="main-content w-full pb-8 ml-5">
        <Welcome name={Data.name} />
        <CurrentCourses courses={Data.enrolled_courses} type="student" />
        <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
          <Statistics1
            completed={comp}
            inprogress={Data.on_courses ? Data.on_courses.length : 0}
          />
          <Statistics2
            watchtimehrs={Data ? Data.totalWatchTime : 0}
            watchtimemin={20}
            tests={Data.attempted_tests ? Data.attempted_tests.length : 0}
            totaltests={Data.my_tests ? Data.my_tests.length : 0}
            avgtestscore={Data.avgTestScore ? Data.avgTestScore : 30}
          />
          <Tests tests={Data.my_tests} attempted={Data.attempted_tests} />
          <LiveLectures lectures={Data.live_classes} />
          {Data.enrolled_courses ? (
            <CompletedCourses
              courses={Data.enrolled_courses.filter(
                (x) => !Data.on_courses.reduce((val,el)=>(x.id===el.id)||val)
              )}
            />
          ) : (
            ""
          )}
        </div>
        <div class="mt-4 grid col-4 grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6 w-100">
          <div class="flex flex-col  col-span-4">
            <div class="flex justify-between">
              <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                Classes
              </h2>
              <span class="px-3 text-2xl text-muted">
                <i className="fas fa-plus"></i>
              </span>
            </div>
            <div className="noHoverCard card px-4 py-2 mb-2 h-auto justify-center flex flex-col gap-y-2">
              {Data.on_courses ? (
                Data.on_courses.map((el) => {
                  var tags=el.tags.map(tagd=>tagd.tagname);
                  return <ItemCard educator={el.educator.name} title={el.title} tags={tags}></ItemCard>;
                })
              ) : (
                <p>
                  No ongoing courses. Enroll to some course to get started! 
              </p>
              )}
            </div>
          </div>
          <Tasklist tasks={Data.tasks}></Tasklist>
          <div class="flex flex-col col-span-4">
            <div class="flex justify-between">
              <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                Calendar
              </h2>
              <a
                href="#"
                class="pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
              >
                View
              </a>
            </div>

            <DashboardCalendar></DashboardCalendar>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default StudentDashboard;
