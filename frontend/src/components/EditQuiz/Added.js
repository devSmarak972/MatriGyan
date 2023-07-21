import React, { useState } from "react";
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
  HoverCard,
  Popover,
  FileInput,
} from "@mantine/core";
import { useListState, useDisclosure } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faEllipsis,
  faGripVertical,
  faImage,
  faPen,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./added.css";
import axios from "axios";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";

const questionTruncate = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
};

const Added = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [editingQ, setEditingQ] = useState(0);

  const [ansShow, setAnsShow] = useState(0);

  const items = props.questions.map((item, index) => (
    <Draggable key={"" + index} index={index} draggableId={"" + index}>
      {(provided, snapshot) => (
        <div
          className={`flex items-center rounded-xl border border-slate-300 p-4 pl-8 bg-white mb-3 ${
            snapshot.isDragging ? "drop-shadow-md" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-center h-full text-slate-400"
          >
            <FontAwesomeIcon icon={faGripVertical} />
          </div>
          <span className="text-xl font-semibold w-16 text-center">
            Q{index + 1}
          </span>
          <div className="flex flex-col gap-2 w-full items-start">
            <div className="w-full flex justify-between">
              <span className="text-[15px] font-medium">
                {questionTruncate(
                  item.question,
                  window.innerWidth < 640 ? 100 : 200
                )}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAnsShow((prev) => {
                    if (index === prev - 1) return 0;
                    else return index + 1;
                  });
                }}
                className="flex gap-1 items-center bg-slate-200 rounded-full text-xs font-semibold px-2.5 py-1"
              >
                <FontAwesomeIcon icon={faAngleDown} />
                <span className="mt-[-1px]">Answers</span>
              </button>
              {item.type === "single" ? (
                <Badge color="blue">Single Correct</Badge>
              ) : (
                <Badge color="orange">Multi Correct</Badge>
              )}
            </div>
            <AnimatePresence>
              {index + 1 === ansShow && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-2 grid-cols-1 sm:grid-cols-2 w-full"
                >
                  {item.options.map((opt, id) => (
                    <div
                      className={`flex gap-2 col-span-1 text-sm ${
                        item.answer.includes(id)
                          ? "text-green-500 font-medium"
                          : ""
                      }`}
                    >
                      <span>
                        {id === 0 ? "A" : id === 1 ? "B" : id === 2 ? "C" : "D"}
                        .
                      </span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-1 items-center self-start">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  size="lg"
                  style={{ color: "#949494", cursor: "pointer" }}
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#949494" }}
                    />
                  }
                >
                  <button
                    onClick={() => {
                      props.form.reset();
                      setEditingQ(index + 1);
                      props.form.setValues({
                        question: item.question,
                        option1: item.options[0],
                        option2: item.options[1],
                        option3: item.options[2],
                        option4: item.options[3],
                        answer: item.answer,
                        type: item.type,
                        correct: item.correct,
                        incorrect: item.incorrect,
                        quesMedia: item.quesMedia,
                        ansMedia: item.ansMedia,
                        // new File([b64toBlob(item.ansMedia)], "solution.png", {
                        //   type: "image/png",
                        //   lastModified: new Date().getTime(),
                        // }),
                        solutionDesc: item.solutionDesc,
                      });
                      open();
                    }}
                  >
                    Edit Question
                  </button>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  icon={<FontAwesomeIcon icon={faTrashCan} />}
                  className="text-red-400"
                >
                  <button
                    onClick={async () => {
                      props.setQuestions((prev) =>
                        prev.filter((q) => q !== item)
                      );
                      await axios
                        .delete(
                          `${process.env.REACT_APP_BACKEND_URL}/delete-question/${item.id}/`
                        )
                        .then((res) => console.log(res))
                        .catch((e) => console.log(e));
                      toast("Question Deleted.");
                    }}
                  >
                    Delete Question
                  </button>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Text className="w-10 mt-[-5px] mb-[2px]" color="dimmed" size="sm">
              +{item.correct}, {item.incorrect}
            </Text>
            {item.quesMedia && (
              <Popover withArrow shadow="lg">
                <Popover.Target>
                  <button className="flex gap-1 items-center text-[#949494] font-medium text-xs border-2 rounded-lg px-1.5 py-0.5">
                    <FontAwesomeIcon icon={faImage} />
                    Image
                  </button>
                </Popover.Target>
                <Popover.Dropdown>
                  <img src={item.quesMedia} className="max-w-xs" />
                </Popover.Dropdown>
              </Popover>
            )}
          </div>
        </div>
      )}
    </Draggable>
  ));

  const fileToDataUri = (file) => {
    console.log("FILES: ", file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        const blob = b64toBlob(base64data);
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        return imageUrl;
      };

      reader.readAsDataURL(file);
    } else return "";
  };

  function b64toBlob(base64data) {
    const contentType = base64data.split(",")[0].split(":")[1].split(";")[0];
    const byteCharacters = atob(base64data.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "image/png" });
  }

  console.log(props.form.values);

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={props.form.onSubmit(async (values) => {
            props.setQuestions((prev) =>
              prev.map((q, i) => {
                if (i + 1 !== editingQ) return q;
                else
                  return {
                    id: q.id,
                    qnumber: q.qnumber,
                    question: props.form.values.question,
                    type: props.form.values.type,
                    options: [
                      props.form.values.option1,
                      props.form.values.option2,
                      props.form.values.option3,
                      props.form.values.option4,
                    ],
                    correct: props.form.values.correct,
                    incorrect: props.form.values.incorrect,
                    answer: props.form.values.answer,
                    solutionDesc: props.form.values.solutionDesc,
                    quesMedia: props.form.values.quesMedia
                      ? fileToDataUri(props.form.values.quesMedia)
                      : "",
                    ansMedia: props.form.values.ansMedia
                      ? fileToDataUri(props.form.values.ansMedia)
                      : "",
                  };
              })
            );
            console.log(editingQ);
            if (props.axiosType === "edit") {
              // console.log("Post Question: ", {
              //   // qnumber: props.questions[editingQ - 1].qnumber,
              //   question: values.question,
              //   type: values.type === "single" ? "SINGLE" : "MULTIPLE",
              //   options: [
              //     values.option1,
              //     values.option2,
              //     values.option3,
              //     values.option4,
              //   ].map((opt) => ({ value: opt })),
              //   image: values.quesMedia ? fileToDataUri(values.quesMedia) : "",
              //   marks: values.correct,
              // });
              // console.log(props.questions[editingQ - 1].id);
              let quesData = new FormData();
              let quesDataObj = {
                question: values.question,
                type: values.type === "single" ? "SINGLE" : "MULTIPLE",
                options: [
                  values.option1,
                  values.option2,
                  values.option3,
                  values.option4,
                ].map((opt) => ({ value: opt })),
                image: values.quesMedia,
                marks: values.correct,
              };
              for (let key in quesDataObj) {
                quesData.append(key, quesDataObj[key]);
              }
              await axios
                .post(
                  `${process.env.REACT_APP_BACKEND_URL}/edit-question/${
                    props.questions[editingQ - 1].id
                  }/`,
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
                  let solData = new FormData();
                  let solDataObj = {
                    answer: values.answer[0],
                    solution: values.solutionDesc,
                    media: values.ansMedia,
                  };
                  for (let key in solDataObj) {
                    solData.append(key, solDataObj[key]);
                  }
                  console.log("Question edited: ", res.data);
                  await axios
                    .post(
                      `${process.env.REACT_APP_BACKEND_URL}/edit-solution/${res.data.question.solution.id}/`,
                      solData,
                      {
                        headers: {
                          accept: "application/json",
                          "Accept-Language": "en-US,en;q=0.8",
                          "Content-Type": `multipart/form-data; boundary=${solData._boundary}`,
                        },
                      }
                    )
                    .then((res) => console.log(res))
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
              toast("Question Edited Successfully!");
            }
            setEditingQ(0);
            close();
          })}
        >
          <Textarea
            label="Question"
            placeholder="What is 78 times 12?"
            {...props.form.getInputProps("question")}
          />

          <Select
            label="Question Type"
            placeholder="MCQ"
            className="mt-2"
            data={[
              { value: "single", label: "Single Choice Correct" },
              { value: "multi", label: "Multiple Choice Correct" },
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

      {props.questions.length === 0 && (
        <div className="flex items-center rounded-xl border-2 border-slate-300 p-4 pl-8 border-dashed mb-3 text-slate-400">
          <span className="w-full text-center font-semibold text-base text-slate-400">
            No Questions Added
          </span>
        </div>
      )}

      <DragDropContext
        onDragEnd={({ destination, source }) => {
          const from = source.index;
          const to = destination?.index || 0;
          props.setQuestions((prev) =>
            prev.map((q, i) => {
              if (i === to) return prev[from];
              else if (i >= from && i < to) return prev[i + 1];
              else if (i > to && i <= from) return prev[i - 1];
              else return prev[i];
            })
          );
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Added;
