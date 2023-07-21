import React, { useState } from "react";
import {
  Radio,
  TextInput,
  Button,
  ColorInput,
  MultiSelect,
} from "@mantine/core";
import { DateInput, DateTimePicker, TimeInput } from "@mantine/dates";

const NewEvent = (props) => {
  const [allDay, setAllDay] = useState("1");
  return (
    <div className="lg:col-span-1 flex flex-col gap-2">
      <span className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
        New Event
      </span>
      <form onSubmit={props.form.onSubmit(props.handleSubmit)}>
        <TextInput
          withAsterisk
          label="Event Name"
          placeholder="Doubt Session"
          {...props.form.getInputProps("title")}
        />
        <Radio.Group
          label="Frequency"
          mt={20}
          mb={16}
          onChange={() => {
            props.form.setValues({ start: "", end: "" });
          }}
          className="flex gap-4"
          {...props.form.getInputProps("frequency")}
        >
          <Radio value="0" label="Singular" />
          <Radio value="1" label="Weekly" />
          <Radio value="2" label="Daily" />
        </Radio.Group>
        <Radio.Group
          mt={16}
          mb={16}
          label="Duration"
          onChange={() => {
            props.form.setValues({ start: "", end: "" });
          }}
          className="flex gap-4"
          {...props.form.getInputProps("allDay")}
        >
          <Radio value="1" label="All Day" />
          <Radio value="0" label="Interval" />
        </Radio.Group>
        {(props.form.values.frequency === "0" ||
          props.form.values.frequency === "2") && (
          <div className="flex w-full gap-4">
            <DateInput
              withAsterisk
              label="Start Date"
              placeholder="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              {...props.form.getInputProps("start")}
              className="w-full"
            />
            <DateInput
              withAsterisk
              label="End Date"
              placeholder="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              {...props.form.getInputProps("end")}
              className="w-full"
            />
          </div>
        )}
        {/* {props.form.values.allDay === "0" &&
          props.form.values.frequency === "0" && (
            <div className="flex w-full gap-4">
              <DateTimePicker
                withAsterisk
                label="Start Date-Time"
                placeholder="YYYY-MM-DD hh:mm"
                valueFormat="YYYY-MM-DD hh:mm"
                {...props.form.getInputProps("start")}
                className="w-full"
              />
              <DateTimePicker
                withAsterisk
                label="End Date-Time"
                placeholder="YYYY-MM-DD hh:mm"
                valueFormat="YYYY-MM-DD hh:mm"
                {...props.form.getInputProps("end")}
                className="w-full"
              />
            </div>
          )} */}
        <div className="flex flex-col w-full gap-4">
          {props.form.values.frequency === "1" && (
            <MultiSelect
              className="w-full"
              data={[
                { value: "0", label: "Sunday" },
                { value: "1", label: "Monday" },
                { value: "2", label: "Tuesday" },
                { value: "3", label: "Wednesday" },
                { value: "4", label: "Thursday" },
                { value: "5", label: "Friday" },
                { value: "6", label: "Saturday" },
              ]}
              label="Days of Week"
              placeholder="Choose Days"
              transitionProps={{
                transition: "pop-top-left",
                duration: 100,
                timingFunction: "ease",
              }}
              {...props.form.getInputProps("weekDays")}
            />
          )}
          {props.form.values.allDay === "0" && (
            <div className="flex w-full gap-4">
              <TimeInput
                label="Start time"
                withAsterisk
                className="w-full"
                {...props.form.getInputProps("startTime")}
              />
              <TimeInput
                label="End time"
                withAsterisk
                className="w-full"
                {...props.form.getInputProps("endTime")}
              />
            </div>
          )}
        </div>

        <ColorInput
          placeholder="Pick color"
          label="Task Colour"
          mt={16}
          {...props.form.getInputProps("color")}
        />
        <button
          type="submit"
          className="bg-[var(--primary)] px-3 py-1.5 rounded-lg text-white font-medium mt-4"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewEvent;
