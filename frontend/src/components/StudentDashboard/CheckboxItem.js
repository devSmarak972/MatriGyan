import {
  faEllipsis,
  faPen,
  faTrashCan,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Drawer, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import React, { useState } from "react";

const CheckboxItem = ({ props }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: props.title,
      due_date: new Date(props.date),
    },
    validate: {
      name: (value) => (value.length === 0 ? "Enter task name" : null),
      due_date: (value) => (!value ? "Choose due date" : null),
    },
  });

  return (
    <>
      <div class="inline-flex items-center justify-between space-x-2">
        <div className="flex items-center gap-2">
          <input
            class="form-checkbox is-outline h-5 w-5 rounded bg-slate-100 border-slate-400/70 before:!bg-success checked:!border-success hover:!border-success focus:!border-success dark:bg-navy-900 dark:border-navy-500"
            type="checkbox"
            id={"check" + props.id}
            value={props.completed}
            onChange={(e) => {
              props.handleCheck(e);
            }}
            defaultChecked={props.completed}
          />
          <div class="my-0 mx-2 py-1">
            <p class="mb-0 text-black font-medium">{props.title}</p>
            <span class="text-muted text-xs">
              {props.date ? props.date : ""}{" "}
              <span
                className={
                  "font-medium " + (props.messagetype ? props.messagetype : "")
                }
              >
                {props.message ? "  |  " + props.message : ""}
              </span>
            </span>
          </div>
        </div>
        <Drawer
          opened={opened}
          onClose={close}
          title="Edit Task"
          position="right"
          size="xs"
        >
          <form
            onSubmit={form.onSubmit(async (values) => {
              const x = new Date(values.due_date);
              const taskID = await axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/edit-task/${props.id}`, {
                  name: values.name,
                  due_date: values.due_date,
                  user: 1,
                  completed: props.completed,
                })
                .then((res) => {
                  return res.data.task.id;
                })
                .catch((e) => console.log(e.response.data));
              props.editedToast();
              var status = new Date() < values.due_date ? 2 : 1;
              var date =
                "" +
                values.due_date.getFullYear() +
                "-" +
                (values.due_date.getMonth() + 1) +
                "-" +
                values.due_date.getDate();

              await props.settasks((prev) => ({
                ...prev,
                tasks: prev.tasks.map((task) => {
                  if (task.id !== props.id) return task;
                  else
                    return {
                      ...task,
                      title: values.name,
                      date,
                      message: task.completed
                        ? "Completed"
                        : status === 2
                        ? "Pending"
                        : "Delayed",
                      messagetype: task.completed
                        ? "text-success"
                        : status === 2
                        ? "text-warning"
                        : "text-danger",
                    };
                }),
              }));
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
              hideOutsideDates={true}
            />
            <button
              onClick={form.isValid() ? close : null}
              className="px-4 py-2 rounded-xl bg-[var(--primary)] font-semibold text-white w-full"
            >
              Save
            </button>
          </form>
        </Drawer>
        {/* <Menu>
        <Menu.Target>
          <FontAwesomeIcon
            icon={faEllipsis}
            size="lg"
            className="cursor-pointer"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<FontAwesomeIcon icon={faPen} style={{ color: "#949494" }} />}
            onClick={open}
          >
            Edit Task
          </Menu.Item>
          <Menu.Item
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            className="text-red-400"
            onClick={() => {
              // await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/`)
              props.settasks((prev) => ({
                numcompleted:
                  prev.numcompleted +
                  (prev.tasks.filter((task) => task.id === prev.id)
                    .completed === 1
                    ? -1
                    : 0),
                tasks: prev.tasks.filter((task) => task.id !== props.id),
              }));
            }}
          >
            Delete Task
          </Menu.Item>
        </Menu.Dropdown>
      </Menu> */}
        <FontAwesomeIcon
          icon={faPen}
          style={{ color: "#aeaeae" }}
          size="sm"
          className="cursor-pointer"
          onClick={open}
        />
      </div>
    </>
  );
};

export default CheckboxItem;
