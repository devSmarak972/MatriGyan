import React from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import Calendar from "../components/CalendarPage/StudentCalendar";

const CalendarPage = () => {
  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900">
      <Sidebar />
      <main className="main-content w-full pb-8 px-[var(--margin-x)] ml-6">
        {/* <span className="font-bold text-[var(--primary)] text-2xl">
          Calendar
        </span> */}
        <div className="mt-8 block container-sm" style={{maxWidth:"1000px"}}>
          <Calendar />
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
