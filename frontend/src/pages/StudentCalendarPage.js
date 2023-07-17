import React, { useEffect, useState } from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import DemoApp from "../components/CalendarPage/StudentCalendar";
import axios from "axios";

const CalendarPage = () => {

  const [data,setData] = useState([]);

  // useEffect(()=>{
  //   axios.get("http://127.0.0.1:8000/get-events/1/")
  //   .then((res)=>{
  //     console.log(res.data);
  //     setData(res.data);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }, [])

  // if(data.length==0){
  //   return null;
  // }

  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900">
      <Sidebar />
      <main className="main-content w-full pb-8 px-[var(--margin-x)] ml-6">
        {/* <span className="font-bold text-[var(--primary)] text-2xl">
          Calendar
        </span> */}
        <div className="mt-8 block container-sm" style={{maxWidth:"1000px"}}>
          <DemoApp  />
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
