import { NumberInput, Select, TextInput } from "@mantine/core";
import React from "react";
import Save from "./Save";
import axios from "axios";

const QuizCourse = (props) => {
  return (
    <div>
      <form
        onSubmit={props.form.onSubmit(async (values) => {
          const quizID = await axios
            .post(`http://localhost:8000/create-quiz/`, {
              creator_id: 1,
              name: values.name,
              topic: values.topic,
              subject: values.subject,
              time: values.time,
            })
            .then((res) => res.data.quiz.id)
            .catch((e) => console.log(e));

          setTimeout(() => {
            console.log(quizID);
          }, 1500);

          setTimeout(() => {
            props.questions.map(async (q, i) => {
              await axios
                .post(`http://localhost:8000/add-question/${quizID}/`, {
                  qnumber: i + 1,
                  questions: q.question,
                  type: q.type === "single" ? "SINGLE" : "MULTI",
                  options: q.options.map((val) => ({ value: val })),
                })
                .then((res) => console.log(res))
                .catch((e) => console.log(e));
            });
          }, 3000);

          setTimeout(() => {
            axios
              .get(`http://localhost:8000/get-quiz/${quizID}/`)
              .then((res) => console.log(res.data))
              .catch((e) => console.log(e));
          }, 6000);

          setTimeout(() => {
            axios
              .get(`http://localhost:8000/get-questions/${quizID}/`)
              .then((res) => console.log("Quiz Questions: ", res))
              .catch((e) => console.log(e.response.data));
          }, 9000);
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
