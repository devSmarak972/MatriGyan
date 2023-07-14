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

const NewQ = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  // const fileToDataUri = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       resolve(event.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   });

  const fileToDataUri = (file) => {
    if (!file) return "";
    return URL.createObjectURL(file);
  };

  return (
    <div>
      <Modal centered opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={props.form.onSubmit((values) => {
            // console.log(values);
            props.setQuestions((prev) => [
              ...prev,
              {
                question: props.form.values.question,
                type: props.form.values.type,
                options: [
                  props.form.values.option1,
                  props.form.values.option2,
                  props.form.values.option3,
                  props.form.values.option4,
                ],
                correct: props.form.values.correct,
                incorrect: -props.form.values.incorrect,
                answer: props.form.values.answer,
                solutionDesc: props.form.values.solutionDesc,
                quesMedia: props.form.values.quesMedia
                  ? fileToDataUri(props.form.values.quesMedia)
                  : "",
                ansMedia: props.form.values.ansMedia
                  ? fileToDataUri(props.form.values.ansMedia)
                  : "",
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
