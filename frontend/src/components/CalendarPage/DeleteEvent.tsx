import { forwardRef } from "react";
import * as React from "react";
import { Group, Avatar, Text, Select } from "@mantine/core";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  date: string;
  color: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, date, color, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-6 bg-[${color}] rounded-full`}></div>
            <Text className="text-base">{label}</Text>
          </div>
          <Text className="text-slate-500 text-xs font-semibold">{date}</Text>
        </div>
      </Group>
    </div>
  )
);

function weekTranslate(days) {
  let arr = days.map((day) => {
    if (day === "0") return "Sunday";
    else if (day === "1") return "Monday";
    else if (day === "2") return "Tuesday";
    else if (day === "3") return "Wednesday";
    else if (day === "4") return "Thursday";
    else if (day === "5") return "Friday";
    else if (day === "6") return "Saturday";
  });
  let ans = "";
  for (let i = 0; i < arr.length; i++) {
    ans = ans + arr[i];
    if (i !== arr.length - 1) ans = ans + ", ";
  }
  return ans;
}

function Demo(props) {
  let dataModified = props.data.map((event) => ({
    label: event.title,
    value: event.title,
    date: event.hasOwnProperty("start")
      ? event.start.slice(0, 10)
      : event.hasOwnProperty("startRecur")
      ? event.startRecur
      : event.hasOwnProperty("daysOfWeek")
      ? weekTranslate(event.daysOfWeek)
      : "",
    color: event.hasOwnProperty("color") ? event.color : "#3788d8",
  }));
  return (
    <div className="lg:col-span-1 flex flex-col gap-2">
      <span className="text-base font-bold tracking-wide text-red-700 dark:text-navy-100">
        Delete Event
      </span>
      <form onSubmit={props.form.onSubmit(props.handleRemove)}>
        <Select
          label="Choose event to delete"
          placeholder="Search..."
          itemComponent={SelectItem}
          data={dataModified}
          searchable
          maxDropdownHeight={400}
          nothingFound="Nobody here"
          {...props.form.getInputProps("find")}
        />
        <button
          type="submit"
          className="bg-red-100 text-red-500 px-3 py-1.5 rounded-lg font-medium mt-3 hover:bg-red-200 hover:text-red-600"
        >
          Remove
        </button>
      </form>
    </div>
  );
}

export default Demo;
