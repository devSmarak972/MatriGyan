import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@mantine/hooks";
import {
  createStyles,
  Text,
  rem,
  Badge,
  Menu,
  Modal,
  Select,
  TextInput,
  NumberInput,
  Button,
  MultiSelect,
  Textarea,
  FileInput,
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-toastify";

const NewQ = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const fileToDataUri = (file) => {
    console.log(file);
    if (!file) return "";
    return URL.createObjectURL(file);
  };

  console.log(props);

  return (
    <div>
      <Modal centered opened={opened} onClose={close} title="Add question">
        <form
          onSubmit={props.form.onSubmit(async (values) => {
            let quesID = undefined;
            if (props.axiosType === "edit") {
              let quesData = new FormData();
              let quesDataObj = {
                qnumber: props.questions.length + 1,
                question: values.question,
                type: values.type === "single" ? "SINGLE" : "MULTIPLE",
                options: [
                  values.option1,
                  values.option2,
                  values.option3,
                  values.option4,
                ].map((opt) => ({
                  value: opt,
                })),
                image: values.quesMedia,
                marks: values.correct,
              };
              for (let key in quesDataObj) {
                quesData.append(key, quesDataObj[key]);
              }
              quesID = await axios
                .post(
                  `http://localhost:8000/add-question/${props.ID}/`,
                  quesData,
                  {
                    headers: {
                      accept: "application/json",
                      "Accept-Language": "en-US,en;q=0.8",
                      "Content-Type": `multipart/form-data; boundary=${quesData._boundary}`,
                    },
                    withCredentials: true,
                  }
                )
                .then(async (res) => {
                  console.log(res.data);
                  // var data=JSON.parse(res.data);
                  if (!res.data["success"]) {
                    toast("Failed to add question");
                    return -1;
                  }
                  let solData = new FormData();
                  let solDataObj = {
                    answer: props.form.values.answer[0],
                    solution: props.form.values.solutionDesc,
                    media: props.form.values.ansMedia,
                  };
                  for (let key in solDataObj) {
                    solData.append(key, solDataObj[key]);
                  }
                  console.log(res.data.data["id"]);
                  await axios
                    .post(
                      `http://localhost:8000/add-solution/${res.data.data["id"]}/`,
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
                  return res.data.data.id;
                })
                .catch((e) => console.log(e));
            }
            console.log(quesID);

            props.setQuestions((prev) => [
              ...prev,
              {
                id: quesID ? quesID : undefined,
                qnumber: prev.length + 1,
                question: values.question,
                type: values.type,
                options: [
                  values.option1,
                  values.option2,
                  values.option3,
                  values.option4,
                ],
                correct: values.correct,
                incorrect: -values.incorrect,
                answer: values.answer,
                solutionDesc: values.solutionDesc,
                quesMedia: values.quesMedia
                  ? fileToDataUri(values.quesMedia)
                  : "",
                ansMedia: values.ansMedia ? fileToDataUri(values.ansMedia) : "",
              },
            ]);

            close();
          })}
        >
          <Textarea
            label="Question"
            placeholder="What is 78 times 12?"
            {...props.form.getInputProps("question")}
          />
          <Select
            className="mt-2"
            label="Question Type"
            placeholder="MCQ"
            data={[
              { value: "single", label: "Single Choice Correct" },
              { value: "multiple", label: "Multiple Choice Correct" },
            ]}
            {...props.form.getInputProps("type")}
          />
          <label className="text-sm mt-2">Options</label>
          <div className="grid gap-3 grid-cols-1 lg: grid-cols-2">
            <TextInput
              placeholder="Option 1"
              {...props.form.getInputProps("option1")}
            />
            <TextInput
              placeholder="Option 2"
              {...props.form.getInputProps("option2")}
            />
            <TextInput
              placeholder="Option 3"
              {...props.form.getInputProps("option3")}
            />
            <TextInput
              placeholder="Option 4"
              {...props.form.getInputProps("option4")}
            />
          </div>
          <div className="flex gap-3 mt-2">
            <NumberInput
              label="Positive Marks"
              {...props.form.getInputProps("correct")}
            />
            <NumberInput
              label="Negative Marks"
              {...props.form.getInputProps("incorrect")}
            />
          </div>
          <MultiSelect
            data={[
              {
                value: 0,
                label: "1",
              },
              {
                value: 1,
                label: "2",
              },
              {
                value: 2,
                label: "3",
              },
              {
                value: 3,
                label: "4",
              },
            ]}
            label="Answer Key"
            placeholder="Correct Options"
            className="w-full"
            {...props.form.getInputProps("answer")}
          />
          <div className="flex gap-3 w-full mt-2">
            <FileInput
              label="Question Diagram"
              placeholder="Diagram"
              icon={<FontAwesomeIcon icon={faImage} />}
              accept="image/png,image/jpeg,image/jpg,image/svg"
              className="w-full"
              {...props.form.getInputProps("quesMedia")}
            />
            <FileInput
              label="Solution Diagram"
              placeholder="Diagram"
              icon={<FontAwesomeIcon icon={faImage} />}
              accept="image/png,image/jpeg,image/jpg,image/svg"
              className="w-full"
              {...props.form.getInputProps("ansMedia")}
            />
          </div>
          <Textarea
            label="Solution Description"
            placeholder="Explanation"
            className="mt-3"
            {...props.form.getInputProps("solutionDesc")}
          />
          <Button
            onClick={props.form.isValid() ? close : null}
            type="submit"
            className="mt-4 bg-[var(--primary)] hover:bg-[var(--primary)] px-3 py-1.5 text-white rounded-xl"
          >
            Save
          </Button>
        </form>
      </Modal>
      <button
        onClick={() => {
          props.form.reset();
          open();
        }}
        className="flex gap-2 items-center text-sm font-medium text-[var(--primary)] bg-blue-200 px-3 py-2 rounded-lg"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
        New Question
      </button>
    </div>
  );
};

export default NewQ;
