import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import data from "./Events.json";
import "./Calendar.css"
import interactionPlugin from "@fullcalendar/interaction";

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={window.innerWidth >= 640 ? "dayGridMonth" : "listWeek"}
        headerToolbar={{
          left:"dayGridMonth,timeGridWeek,listWeek",
          center: window.innerWidth>=640?"title":"",
          right: "prev,next",
        }}
        events={data}
        nowIndicator={true}
        editable={true}
        droppable={true}
        // nextDayThreshold= {"00:00:00"}

        // contentHeight={window.innerWidth<640?400:window.innerWidth<1024?600:900}
        contentHeight={
          window.innerWidth < 640 ? 400 : window.innerWidth < 1024 ? 550 : 600
        }
        dayMaxEventRows={
          window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 3 : 3
        }
      />
    );
  }
}
