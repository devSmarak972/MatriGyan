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
import CheckboxItem from "../../components/StudentDashboard/CheckboxItem";
import DashboardCalendar from "../../components/StudentDashboard/DashboardCalendar";

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

            </div>
            <div className="noHoverCard card px-4 py-2 mb-2 h-auto justify-center flex flex-col gap-y-2">
              {classes?.map(el => {
                return <ItemCard props={{ ...el }}></ItemCard>;
              })}
            </div>
          </div>
          <div class="flex flex-col col-span-4">
            <div class="flex justify-between">
              <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                Tasklist
              </h2>

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
