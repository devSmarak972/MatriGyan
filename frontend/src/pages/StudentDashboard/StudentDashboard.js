import React from "react";
import CompletedCourses from "../../components/StudentDashboard/CompletedCourses";
import Sidebar from "../../components/StudentDashboard/Sidebar";
import CurrentCourses from "../../components/StudentDashboard/CurrentCourses";
import Welcome from "../../components/StudentDashboard/Welcome";
import Statistics1 from "../../components/StudentDashboard/Statistics1";
import Statistics2 from "../../components/StudentDashboard/Statistics2"
import Tests from "../../components/StudentDashboard/Tests";
import LiveLectures from "../../components/StudentDashboard/LiveLectures";

const StudentDashboard = () => {
  return (
    <div
      className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900"
    >
      <Sidebar />
      <main className="main-content w-full pb-8">
        <Welcome />
        <CurrentCourses />
        <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
          <Statistics1 completed={5} inprogress={3}/>
          <Statistics2 watchtimehrs={21} watchtimemin={35} tests={14} totaltests={20} avgtestscore={87.6}/>
          <Tests/>
          <LiveLectures/>
          <CompletedCourses />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
