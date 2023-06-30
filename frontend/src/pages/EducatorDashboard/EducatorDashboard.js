import React from "react";
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

import EducatorClass from "../../components/EducatorDashboard/EducatorClass";
const EducatorDashboard = () => {
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
  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar />
      <main className="main-content w-full pb-8">
        <Welcome />
        <CurrentCourses type="educator" />
        <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
          {/* <Statistics1 completed={5} inprogress={3} /> */}
          <Statistics2
            taughthrs={58}
            taughtmin={29}
            students={529}
            watchtimehrs={273}
            watchtimemin={45}
            tests={28}
            avgrating={4.3}
            courses={7}
          />
          <div className="mt-4 col-span-12 lg:col-span-6 h-[300px] sm:h-[400px]">
            <span className="ml-12 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
              Course Completion Rate
            </span>
            <Graph1 />
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
              {classes?.map(el => {
                return <EducatorClass props={{ ...el }}></EducatorClass>;
              })}
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
          <Reviews />
          <Doubts />
          <Tasklist></Tasklist>
          {/* <Tests/>
          <LiveLectures/> */}
          <Graphs2and3 />
          {/* <MakingCourses /> */}
        </div>
      </main>
    </div>
  );
};

export default EducatorDashboard;
