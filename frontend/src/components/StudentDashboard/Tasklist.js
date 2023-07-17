import React, { useState, useEffect, useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Checkbox,
  Drawer,
  Modal,
  TextInput,
  createStyles,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import CheckboxItem from "../../components/StudentDashboard/CheckboxItem";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const useStyles = createStyles(() => ({
  month: {
    zIndex: 500,
  },
}));

const Tasklist = (props) => {
  console.log(props.tasks);
  // var tasks = [
  //   {
  //     title: "Coordinate Geometry DPP",
  //     date: "May 1, 2023",
  //     message: "Due Tomorrow",
  //     messagetype: "text-warning",
  //   },
  //   {
  //     title: "Daily Physics Test",
  //     date: "May 4, 2023",
  //   },
  //   {
  //     title: "Solution of Triangles Revision",
  //     date: "April 30, 2023",
  //     message: "Due Today",
  //     messagetype: "text-danger",
  //   },
  //   {
  //     title: "JEE Mains Full Syllabus Test",
  //     date: "May 1, 2023",
  //     message: "Syllabus Completed",
  //     messagetype: "text-success",
  //   },
  //   { title: "Doubt Clearing Session" },
  // ];
  // const [numcompleted, setnumcompleted] = useState(0);

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      due_date: null,
    },
    validate: {
      name: (value) => (value.length === 0 ? "Enter task name" : null),
      due_date: (value) => (!value ? "Choose due date" : null),
    },
  });
  const { classes } = useStyles();

  const [tasks, settasks] = useState(false);
  // const tasks=useRef([]);
  var today = new Date();
  // console.log(tasks, ":tasks");
  console.log(form.values);

  var num = 0;
  useEffect(() => {
    var taskstmp = props.tasks?.map((el) => {
      if (el.completed) num++;
      var end = new Date(el.due_date);
      // end.setMinutes(end.getMinutes() + el.time);
      var status = today < el.due_date ? 2 : 1;
      var date =
        "" + end.getFullYear() + "-" + end.getMonth() + "-" + end.getDate();
      // console.log(
      //   end.getFullYear() + "-" + end.getMonth() + "-" + end.getDate()
      // );
      return {
        id: el.id,
        title: el.name,
        date: date,
        message:
          el.completed === true
            ? "Completed"
            : status === 2
            ? "Pending"
            : "Delayed",
        messagetype:
          el.completed === true
            ? "text-success"
            : status === 2
            ? "text-warning"
            : "text-danger",
        completed: el.completed,
      };
    });
    settasks({ tasks: taskstmp, numcompleted: num });
    // return () => setnumcompleted(num);
  }, []);

  console.log("TASKS: ", tasks);

  function handleCheck(el) {
    console.log(el.currentTarget.id);
    var id = parseInt(el.currentTarget.id.substring(5));
    if (tasks) {
      var tmptasks = {
        tasks: tasks.tasks.map((a) => {
          return { ...a };
        }),
        numcompleted: tasks.numcompleted,
      };
      tmptasks.tasks.find((it) => it.id === id).completed =
        !el.currentTarget.checked;
      if (el.currentTarget.checked) {
        tmptasks.numcompleted += 1;
        tmptasks.tasks.find((it) => it.id === id).completed = true;
        tmptasks.tasks.find((it) => it.id === id).message = "Completed";
        tmptasks.tasks.find((it) => it.id === id).messagetype = "text-success";
      } else {
        tmptasks.numcompleted -= 1;
        tmptasks.tasks.find((it) => it.id === id).completed = false;
        tmptasks.tasks.find((it) => it.id === id).message =
          new Date() < new Date(tmptasks.tasks.find((it) => it.id === id).date)
            ? "Pending"
            : "Delayed";
        tmptasks.tasks.find((it) => it.id === id).messagetype =
          new Date() < new Date(tmptasks.tasks.find((it) => it.id === id).date)
            ? "text-warning"
            : "text-danger";
      }
      settasks(tmptasks);
    } else {
      console.log("tasks not defined");
    }
  }

  return (
    <div class="flex flex-col col-span-12 sm:col-span-6 lg:col-span-4">
      <div class="flex justify-between">
        <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
          Tasklist
        </h2>
        <Drawer
          opened={opened}
          onClose={close}
          title="Add Task"
          position="right"
          size="xs"
        >
          <form
            onSubmit={form.onSubmit(async (values) => {
              var num = tasks.numcompleted;
              var status = new Date() < values.due_date ? 2 : 1;
              var date =
                "" +
                values.due_date.getFullYear() +
                "-" +
                values.due_date.getMonth() +
                "-" +
                values.due_date.getDate();

              settasks((prev) => ({
                ...prev,
                tasks: [
                  ...prev.tasks,
                  {
                    id: prev.tasks.length + 1,
                    title: values.name,
                    date,
                    message: status === 2 ? "Pending" : "Delayed",
                    messagetype: status === 2 ? "text-warning" : "text-danger",
                  },
                ],
              }));

              await axios
                .post("http://localhost:8000/add-task/", {
                  name: values.name,
                  due_date: values.due_date,
                  user: 1,
                  completed: false,
                })
                .then((res) => console.log(res))
                .catch((e) => console.log(e));
            })}
          >
            <TextInput
              label="Name"
              placeholder="Homework"
              {...form.getInputProps("name")}
              mb="sm"
              mt="xl"
            />
            <DateInput
              icon={<FontAwesomeIcon icon={faCalendar} />}
              label="Due Date"
              {...form.getInputProps("due_date")}
              mb="md"
              classNames={{ month: classes.month }}
              hideOutsideDates={true}
            />
            <button
              onClick={form.isValid() ? close : null}
              className="px-4 py-2 rounded-xl bg-[var(--primary)] font-semibold text-white w-full"
            >
              Add
            </button>
          </form>
        </Drawer>
        <span class="px-3 text-2xl text-muted">
          <i
            className="fas fa-plus cursor-pointer"
            onClick={() => {
              form.reset();
              open();
            }}
          ></i>
        </span>
      </div>
      {tasks ? (
        <div class="card noHoverCard px-4 py-3 mb-2 h-auto gap-y-2 ">
          <div class="flex flex-col">
            {tasks.tasks && tasks.tasks.length !== 0 ? (
              tasks.tasks.map((el) => {
                return (
                  <CheckboxItem
                    key={el.id}
                    props={{ ...el, handleCheck: handleCheck }}
                  ></CheckboxItem>
                );
              })
            ) : (
              <p>No tasks created</p>
            )}
          </div>
          <div class="badge float-left mt-2 mr-auto bg-success/10 text-success dark:bg-success/15">
            {tasks.numcompleted}/{tasks.tasks ? tasks.tasks.length : 0}{" "}
            completed
          </div>
        </div>
      ) : (
        <p className="p-3">Loading...</p>
      )}
    </div>
  );
};

export default Tasklist;
