import { NumberInput, Select, TextInput } from "@mantine/core";
import React from "react";
import Save from "./Save";
import axios from "axios";

const QuizCourse = (props) => {
  return (
    <div>
      <form
        onSubmit={props.form.onSubmit(async (values) => {
          console.log(values);
          console.log(props.questions);
          const quizRes = await axios
            .post(`http://localhost:8000/create-quiz/`, {
              creator_id: 1,
              name: values.name,
              topic: values.topic,
              subject: values.subject,
              time: 30,
            })
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));

          console.log(quizRes);

          // const ques = await axios("http://localhost:8000/get-questions/1")
          //   .then((res) => console.log(res.data))
          //   .catch((e) => console.log(e));
        })}
        className="flex flex-col gap-2"
      >
        {/* <Save /> */}
        <button
          type="submit"
          className="w-fit text-white bg-[var(--primary)] hover:bg-blue-600 font-medium rounded-lg text-sm py-2 px-3 mr-2 mb-2 "
        >
          Save Changes
        </button>
        <div className="flex items-center gap-2 mb-2 mt-4 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          <span>Other Details</span>
          <div className="border-1 flex-1 h-0"></div>
        </div>
        <TextInput
          label="Quiz Name"
          placeholder="Ex: Weekly Test"
          withAsterisk
          {...props.form.getInputProps("name")}
        />

        <TextInput
          label="Topic"
          placeholder="Ex: Gravitation"
          withAsterisk
          {...props.form.getInputProps("topic")}
        />

        <TextInput
          label="Subject"
          placeholder="Ex: Physics"
          withAsterisk
          {...props.form.getInputProps("subject")}
        />
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
        <NumberInput
          placeholder="30"
          label="Time in minutes"
          {...props.form.getInputProps("time")}
        />
      </form>
    </div>
  );
};

export default QuizCourse;
