import { NumberInput, Select } from "@mantine/core";
import React from "react";

const QuizCourse = (props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 mt-4 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
        <span>Other Details</span>
        <div className="border-1 flex-1 h-0"></div>
      </div>
      <Select
        label="Quiz Course"
        placeholder="Select course to add quiz to"
        data={[
          { value: "react", label: "React" },
          { value: "ng", label: "Angular" },
          { value: "svelte", label: "Svelte" },
          { value: "vue", label: "Vue" },
        ]}
        {...props.form.getInputProps("course")}
      />
      <NumberInput placeholder="30" label="Time in minutes" {...props.form.getInputProps("time")}/>
    </div>
  );
};

export default QuizCourse;
