import React from "react";
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

const StudentDashboard = () => {
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
      <main className="main-content w-full pb-8 ml-5">
        <Welcome />
        <CurrentCourses />
        <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
          <Statistics1 completed={5} inprogress={3} />
          <Statistics2
            watchtimehrs={21}
            watchtimemin={35}
            tests={14}
            totaltests={20}
            avgtestscore={87.6}
          />
          <Tests />
          <LiveLectures />
          <CompletedCourses />
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
              {classes?.map(el => {
                return <ItemCard props={{ ...el }}></ItemCard>;
              })}
            </div>
          </div>
            <Tasklist></Tasklist>
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
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
