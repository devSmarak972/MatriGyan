import React from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import Calendar from "../components/CalendarPage/EducatorCalendar";

const CalendarPage = (props) => {
  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900">
      <Sidebar user={props.user} />
      <main className="main-content w-full pb-8 px-[var(--margin-x)]">
        <Calendar />
      </main>
    </div>
  );
};

export default CalendarPage;
