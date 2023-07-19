import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import Events from "./Events.json"

const DemoApp = (props) => {
  const [events, setEvents] = useState(props.data);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView={window.innerWidth >= 640 ? "dayGridMonth" : "listWeek"}
      headerToolbar={{
        left: "dayGridMonth,timeGridWeek,listWeek",
        center: window.innerWidth >= 640 ? "title" : "",
        right: "prev,next",
      }}
      events={events}
      nowIndicator={true}
      editable={true}
      droppable={true}
      contentHeight={
        window.innerWidth < 640 ? 400 : window.innerWidth < 1024 ? 550 : 600
      }
      dayMaxEventRows={
        window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 3 : 3
      }
    />
  );
};

export default DemoApp;
