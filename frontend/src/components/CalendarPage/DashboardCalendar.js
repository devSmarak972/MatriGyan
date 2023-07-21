import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useForm } from "@mantine/form";
import data from "./Events.json";
import NewEvent from "./NewEvent";
import DeleteEvent from "./DeleteEvent.tsx";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Group, Button } from "@mantine/core";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";

const DashboardCalendar = () => {
  const [openedAdd, { open:openAdd, close:closeAdd }] = useDisclosure(false);
  const [openedDel, { open:openDel, close:closeDel }] = useDisclosure(false);

  const handleSubmit = () => {
    console.log(form.values);
    if (form.values.frequency === "0") {
      let start =
        form.values.start.getFullYear() +
        "-" +
        ((form.values.start.getMonth() + 1).toString().length === 1
          ? "0" + (form.values.start.getMonth() + 1).toString()
          : (form.values.start.getMonth() + 1).toString()) +
        "-" +
        (form.values.start.getDate().toString().length === 1
          ? "0" + form.values.start.getDate().toString()
          : form.values.start.getDate().toString());

      let end =
        form.values.end.getFullYear() +
        "-" +
        ((form.values.end.getMonth() + 1).toString().length === 1
          ? "0" + (form.values.end.getMonth() + 1).toString()
          : (form.values.end.getMonth() + 1).toString()) +
        "-" +
        (form.values.end.getDate().toString().length === 1
          ? "0" + form.values.end.getDate().toString()
          : form.values.end.getDate().toString());
      if (form.values.allDay === "0") {
        start = start + " " + form.values.startTime;
        end = end + " " + form.values.endTime;
      }
      console.log(start, "   ", end);
      data = [
        ...data,
        {
          title: form.values.title,
          start: start,
          end: end,
          color: form.values.color,
        },
      ];
      console.log(data);
    } else if (form.values.frequency === "1") {
      if (form.values.allDay === "1") {
        data = [
          ...data,
          {
            title: form.values.title,
            daysOfWeek: form.values.weekDays,
            color: form.values.color,
          },
        ];
      } else {
        data = [
          ...data,
          {
            title: form.values.title,
            daysOfWeek: form.values.weekDays,
            startTime: form.values.startTime,
            endTime: form.values.endTime,
            color: form.values.color,
          },
        ];
      }
    } else {
      let start =
        form.values.start.getFullYear() +
        "-" +
        ((form.values.start.getMonth() + 1).toString().length === 1
          ? "0" + (form.values.start.getMonth() + 1).toString()
          : (form.values.start.getMonth() + 1).toString()) +
        "-" +
        (form.values.start.getDate().toString().length === 1
          ? "0" + form.values.start.getDate().toString()
          : form.values.start.getDate().toString());

      let end =
        form.values.end.getFullYear() +
        "-" +
        ((form.values.end.getMonth() + 1).toString().length === 1
          ? "0" + (form.values.end.getMonth() + 1).toString()
          : (form.values.end.getMonth() + 1).toString()) +
        "-" +
        (form.values.end.getDate().toString().length === 1
          ? "0" + form.values.end.getDate().toString()
          : form.values.end.getDate().toString());

      if (form.values.allDay === "1") {
        data = [
          ...data,
          {
            title: form.values.title,
            startRecur: start,
            endRecur: end,
            color: form.values.color,
          },
        ];
      } else {
        data = [
          ...data,
          {
            title: form.values.title,
            startRecur: start,
            endRecur: end,
            startTime: form.values.startTime,
            endTime: form.values.endTime,
            color: form.values.color,
          },
        ];
      }
    }
    form.reset();
  };

  const handleRemove = () => {
    data = data.filter((event) => event.title !== delform.values.find);
    delform.reset();
  };

  const form = useForm({
    initialValues: {
      title: "",
      start: "",
      end: "",
      allDay: "1",
      frequency: "0",
      weekDays: "",
      startTime: "",
      endTime: "",
      color: "#3788d8",
    },
    validate: {
      title: (value) =>
        value.length === 0
          ? "Enter event name"
          : value.length < 2
          ? "Event name must be at least 2 characters"
          : null,
      start: (value) =>
        (form.values.frequency === "0" || form.values.frequency === "2") &&
        value.length === 0
          ? "Enter Start Time"
          : null,
      end: (value) =>
        (form.values.frequency === "0" || form.values.frequency === "2") &&
        value.length === 0
          ? "Enter End Time"
          : null,
      weekDays: (value) =>
        form.values.frequency === "1" && value.length === 0
          ? "Choose atleast 1 day per week"
          : null,
      startTime: (value) =>
        form.values.allDay === "0" && value.length === 0
          ? "Choose start time"
          : null,
      endTime: (value) =>
        form.values.allDay === "0" && value.length === 0
          ? "Choose end time"
          : null,
      color: (value) => (value.length === 0 ? "Choose a color" : null),
    },
  });

  const delform = useForm({
    initialValues: {
      find: "",
    },
    validate: {
      find: (value) => (value.length === 0 ? "Event not selected" : null),
    },
  });

  return (
    <div className="">
      <Drawer
        opened={openedAdd}
        onClose={closeAdd}
        title="Authentication"
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
        <div className="order-last flex flex-col gap-8">
          <NewEvent form={form} handleSubmit={handleSubmit} />
        </div>
      </Drawer>
      <Drawer
        opened={openedDel}
        onClose={closeDel}
        title="Authentication"
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
        <div className="order-last flex flex-col gap-8">
          <DeleteEvent form={delform} handleRemove={handleRemove} data={data} />{" "}
        </div>
      </Drawer>

      <div className="mt-8 block container-sm" style={{ maxWidth: "1000px" }}>
        <div className="ButtonsCal mb-3">
          <Group position="center">
            <div className="removeEventBtn">
            <Button
              color="red"
              onClick={openDel}
            >
              <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon>
              <span class="pl-1">Remove Event</span>
            </Button>
              </div>
                          <div className="addEventBtn">

            <Button onClick={openAdd}>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              <span class="pl-1">Add Event</span>
            </Button>
            </div>
          </Group>
        </div>

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView={window.innerWidth >= 640 ? "dayGridMonth" : "listWeek"}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,listWeek",
            center: window.innerWidth >= 640 ? "title" : "",
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
      </div>
    </div>
  );
};

export default DashboardCalendar;
