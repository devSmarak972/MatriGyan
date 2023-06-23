import React from "react";
import Sidebar from "../../components/EducatorDashboard/Sidebar";
import CurrentCourses from "../../components/EducatorDashboard/CurrentCourses";
import Welcome from "../../components/EducatorDashboard/Welcome";
import Statistics2 from "../../components/EducatorDashboard/Statistics";
import Graphs2and3 from "../../components/EducatorDashboard/graphs/Graphs2and3";
import Graph1 from "../../components/EducatorDashboard/graphs/Graph1";
import Reviews from "../../components/EducatorDashboard/Reviews";
import Doubts from "../../components/EducatorDashboard/Doubts";

const EducatorDashboard = () => {
  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-page">
      <Sidebar />
      <main className="main-content w-full pb-8">
        <Welcome />
        <CurrentCourses />
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
          {/* <Tests/>
          <LiveLectures/> */}
          <Graphs2and3 />
          {/* <MakingCourses /> */}
          <Reviews />
          <Doubts />
        </div>
      </main>
    </div>
  );
};

export default EducatorDashboard;
