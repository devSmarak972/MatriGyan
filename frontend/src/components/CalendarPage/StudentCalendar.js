import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import data from "./Events.json";
import "./Calendar.css"

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={window.innerWidth >= 640 ? "dayGridMonth" : "listWeek"}
        headerToolbar={{
          left: window.innerWidth>=640?"title":"dayGridMonth,timeGridWeek,listWeek",
          center: window.innerWidth>=640?"dayGridMonth,timeGridWeek,listWeek":"",
          right: "prev,next",
        }}
        events={data}
        nowIndicator={true}
        contentHeight={window.innerWidth<640?400:window.innerWidth<1024?600:900}
        dayMaxEventRows={window.innerWidth<640?3:window.innerWidth<1024?4:6}
      />
    );
  }
}
