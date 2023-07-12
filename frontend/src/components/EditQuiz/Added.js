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

  console.log(props);

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
                      <span>{opt.value}</span>
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
                        image: item.image,
                      });
                      open();
                      // if (props.question.length !== 0 && !opened) {
                      //   console.log("$^$^", props.form.values);
                      // }
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
                    onClick={() => {
                      props.setQuestions((prev) =>
                        prev.filter((q) => q !== item)
                      );
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
            {item.image && (
              <Popover withArrow shadow="lg">
                <Popover.Target>
                  <button className="flex gap-1 items-center text-[#949494] font-medium text-xs border-2 rounded-lg px-1.5 py-0.5">
                    <FontAwesomeIcon icon={faImage} />
                    Image
                  </button>
                </Popover.Target>
                <Popover.Dropdown>
                  <img src={item.image} className="max-w-xs" />
                </Popover.Dropdown>
              </Popover>
            )}
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Authentication">
        <form
          onSubmit={props.form.onSubmit((values) => {
            // console.log(values);
            props.setQuestions((prev) =>
              prev.map((q, i) => {
                if (i + 1 !== editingQ) return q;
                else
                  return {
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
                    image: props.form.values.image.name,
                  };
              })
            );
            setEditingQ(0);
            close();
          })}
        >
          <Textarea
            label="Question"
            placeholder="What is 78 times 12?"
            {...props.form.getInputProps("question")}
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
          <div className="flex gap-3 w-full mt-2">
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
            <FileInput
              label="Upload Image"
              placeholder="Diagram"
              icon={<FontAwesomeIcon icon={faImage} />}
              accept="image/png,image/jpeg,image/jpg,image/svg"
              className="w-full"
              {...props.form.getInputProps("image")}
            />
          </div>
          <Button
            onClick={props.form.isValid() ? close : null}
            type="submit"
            className="mt-4 bg-[var(--primary)] hover:bg-[var(--primary)] px-3 py-1.5 text-white rounded-xl"
          >
            Save
          </Button>
        </form>
      </Modal>

      <DragDropContext
        onDragEnd={({ destination, source }) => {
          const from = source.index;
          const to = destination?.index || 0;
          props.setQuestions((prev) =>
            prev.map((q, i) => {
              if (i === from) return prev[to];
              else if (i === to) return prev[from];
              else return q;
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
