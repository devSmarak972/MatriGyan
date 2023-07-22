import React, { useEffect, useState } from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import DemoApp from "../components/CalendarPage/StudentCalendar";
import axios from "axios";

const CalendarPage = (props) => {
  const [data, setData] = useState([]);
  const [user_id, setID] = useState(props.id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get-events/${user_id}/`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        console.log(data, "Set Data.");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if(data.length==0){
  //   return null;
  // }

  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900">
      <Sidebar user={props.user} />
      <main className="main-content w-full pb-8 px-[var(--margin-x)] ml-6">
        {/* <span className="font-bold text-[var(--primary)] text-2xl">
          Calendar
        </span> */}
        <div className="mt-8 block container-sm" style={{ maxWidth: "1000px" }}>
          <DemoApp data={data} />
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
