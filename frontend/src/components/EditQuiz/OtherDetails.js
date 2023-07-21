import { NumberInput, Select, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Save from "./Save";
import axios from "axios";
import { getUser } from "../../utils/getUser";

const OtherDetails = (props) => {
  const [courses, setCourses] = useState({});
  useEffect(() => {
    const f = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-courses/`).then((res) => {
          setCourses(res.data);
        });
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, []);

  if (JSON.stringify(courses) === "{}") return null;

  return (
    <div>
      <form
        onSubmit={props.form.onSubmit(async (values) => {
          if (props.axiosType === "add") {
            console.log({
              creator_id: props.userID,
              name: values.name,
              topic: values.topic,
              subject: values.subject,
              time: values.time,
              course_id: values.course,
            });
            const quizID = await axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/create-quiz/`, {
                creator_id: props.userID,
                name: values.name,
                topic: values.topic,
                subject: values.subject,
                time: values.time,
                course_id: values.course,
              })
              .then((res) => {
                console.log(res.data);
                return res.data.quiz.id;
              })
              .catch((e) => console.log(e));

            await axios
              .get(`${process.env.REACT_APP_BACKEND_URL}/get-quiz/${quizID}/`)
              .then((res) => console.log(res.data))
              .catch((e) => console.log(e));

            props.questions.map(async (q, i) => {
              let quesData = new FormData();
              let quesDataObj = {
                qnumber: i + 1,
                question: q.question,
                type: q.type === "single" ? "SINGLE" : "MULTIPLE",
                options: q.options.map((val) => ({ value: val })),
                image: q.quesMedia,
                marks: q.correct,
              };
              for (let key in quesDataObj) {
                quesData.append(key, quesDataObj[key]);
              }
              const quesID = await axios
                .post(
                  `${process.env.REACT_APP_BACKEND_URL}/add-question/${quizID}/`,
                  quesData,
                  {
                    headers: {
                      accept: "application/json",
                      "Accept-Language": "en-US,en;q=0.8",
                      "Content-Type": `multipart/form-data; boundary=${quesData._boundary}`,
                    },
                  }
                )
                .then(async (res) => {
                  console.log(res);
                  let solData = new FormData();
                  let solDataObj = {
                    answer: q.answer[0],
                    solution: q.solutionDesc,
                    media: q.ansMedia,
                  };
                  for (let key in solDataObj) {
                    solData.append(key, solDataObj[key]);
                  }
                  await axios
                    .post(
                      `${process.env.REACT_APP_BACKEND_URL}/add-solution/${res.data.data.id}/`,
                      solData,
                      {
                        headers: {
                          accept: "application/json",
                          "Accept-Language": "en-US,en;q=0.8",
                          "Content-Type": `multipart/form-data; boundary=${solData._boundary}`,
                        },
                      }
                    )
                    .then((res) => console.log(res.data))
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            });
          } else if (props.axiosType === "edit") {
            const quesIDs = await axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/edit-quiz/${props.ID}/`, {
                name: values.name,
                topic: values.topic,
                subject: values.subject,
                time: values.time,
                course_id: values.course,
              })
              .then((res) => {
                return res.data.quiz.questions.map((q) => q.id);
              })
              .catch((e) => console.log(e));

            await axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/set-question-order/${props.ID}/`, {
                qnos: props.questions.map((q, i) => ({
                  question_id: q.id,
                  qnumber: i + 1,
                })),
              })
              .then((res) => console.log(res))
              .catch((e) => console.log(e));

            console.log(quesIDs);
          }
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
          searchable
          allowDeselect
          placeholder="Select course to add quiz to"
          data={courses.data.map((course) => ({
            value: course.id,
            label: course.title,
          }))}
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

export default OtherDetails;
