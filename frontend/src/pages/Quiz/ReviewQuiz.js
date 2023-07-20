import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import data from "./quiz-answered.json";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ReviewQuiz = () => {
  const { ID } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = axios
      .get(`http://localhost:8000/get-quiz-response/${ID}/`)
      .then((res) => {
        console.log(res);
        setData({
          name: res.data.response.quiz.name,
          topic: res.data.response.quiz.topic,
          mins: res.data.response.quiz.time,
          questions: res.data.answers.map((ans) => ({
            id: ans.question.id,
            question: ans.question.question,
            options: ans.question.options,
            type: ans.question.type === "SINGLE" ? "single" : "multi",
            correct: ans.question.marks,
            incorrect: ans.question.type === "SINGLE" ? -1 : -2,
            answer: [parseInt(ans.question.solution.answer)],
            selected:
              ans.answer.length > 0
                ? ans.answer.split(" ").map((i) => parseInt(i) - 1)
                : [],
            status: ans.answer.length === 0 ? "unanswered" : "answered",
            image: ans.question.image,
            solution: ans.question.solution.solution,
            ansMedia: ans.question.solution.media,
          })),
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const [question, setQuestion] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  if (JSON.stringify(data) === "{}") return null;

  const qstatus = data.questions.map((q) => {
    const answer = q.answer;
    const selected = q.selected;
    answer.sort();
    selected.sort();
    const equal = answer.every((e, i) => selected[i] === e);
    if (equal) return 1;
    else if (selected.length === 0) return 0;
    else return -1;
  });

  return (
    <div className="h-screen flex">
      <div className="grid grid-cols-3 gap-8 w-[500px] sm:w-[800px] p-4 m-auto">
        <div className="col-span-3">
          <div className="fixed flex flex-col items-center top-0 left-0 w-full flex justify-center">
            <div className="flex items-center justify-between sm:justify-center w-full text-lg text-white bg-[var(--primary)] p-3">
              <span>Quiz Review</span>
              {window.innerWidth < 640 && (
                <Menu>
                  <Menu.Target>
                    <FontAwesomeIcon
                      icon={faGrip}
                      style={{ color: "#ffffff" }}
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>
                      <span className="font-semibold">Questions</span>
                    </Menu.Label>
                    <div className="flex gap-2 flex-wrap max-w-[275px] px-2 pb-2.5">
                      {qstatus.map((q, i) => (
                        <div
                          onClick={() => {
                            setQuestion((prev) => i);
                          }}
                          className={`cursor-pointer flex items-center justify-center rounded-xl w-8 h-8 border-2 ${
                            q === 1
                              ? `bg-green-500 border-green-500 text-white`
                              : q === -1
                              ? `bg-red-400 border-red-400 text-white`
                              : ""
                          } ${question === i ? "font-semibold" : ""}`}
                        >
                          <Menu.Item
                            element="span"
                            className={`hover:bg-transparent cursor-pointer flex items-center justify-center rounded-xl w-8 h-8 border-2 ${
                              q === 1
                                ? `bg-green-500 border-green-500 text-white`
                                : q === -1
                                ? `bg-red-400 border-red-400 text-white`
                                : ""
                            }`}
                          >
                            {i + 1}
                          </Menu.Item>
                        </div>
                      ))}
                    </div>
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
            <span className="font-medium mt-1">{data.topic}</span>
          </div>
        </div>
        <div className="flex flex-col col-span-3 sm:col-span-2 gap-3 overflow-y-scroll h-[69vh] pr-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold mb-2">
                Question {question + 1} of {data.questions.length}
              </span>
              <div className="flex flex-col items-end">
                <span>
                  {data.questions[question].type === "single"
                    ? "Single Choice Correct"
                    : "Multi Choice Correct"}
                </span>
                <span className="font-semibold">
                  +{data.questions[question].correct},
                  {" " + data.questions[question].incorrect}
                </span>
              </div>
            </div>
            <span className="font-medium text-black">
              {data.questions[question].question}
            </span>
            {data.questions[question].image && (
              <img className="w-fit" src={data.questions[question].image} />
            )}
            <div className="flex flex-col gap-3 my-2">
              {data.questions[question].options.map((option, i) => (
                <div className="flex gap-3">
                  <span
                    className={`ease-in-out duration-300 font-medium flex w-8 h-8 border-2 items-center justify-center rounded-full  ${
                      data.questions[question].answer.includes(i)
                        ? "bg-green-500 border-green-500 text-white"
                        : [0, 1, 2, 3]
                            .filter(
                              (e) =>
                                !data.questions[question].answer.includes(e) &&
                                data.questions[question].selected.includes(e)
                            )
                            .includes(i)
                        ? "bg-red-400 border-red-400 text-white"
                        : ""
                    }`}
                  >
                    {i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : "D"}
                  </span>
                  <span className="font-medium flex items-center text-black">
                    {option.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">
              Correct Answer:{" "}
              <span className="font-normal text-base">
                {data.questions[question].answer
                  .map((e) =>
                    e === 0 ? "A" : e === 1 ? "B" : e === 2 ? "C" : "D"
                  )
                  .join(", ")}
              </span>{" "}
            </span>
            <span className="font-semibold">
              Your Answer:{" "}
              <span className="font-normal text-base">
                {data.questions[question].selected.length === 0
                  ? "Unattempted"
                  : data.questions[question].selected
                      .map((e) =>
                        e === 0 ? "A" : e === 1 ? "B" : e === 2 ? "C" : "D"
                      )
                      .join(", ")}
              </span>{" "}
            </span>
          </div>
          <span className="font-normal">
            <span className="font-semibold">Solution: </span>
            {data.questions[question].solution}
          </span>
          {data.questions[question].ansMedia && (
            <img className="w-fit" src={data.questions[question].ansMedia} />
          )}
          <div
            className={`flex mt-2 ${
              question === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {question !== 0 && (
              <button
                className="text-white bg-slate-500  px-3 py-1.5 rounded-lg"
                onClick={() => {
                  setQuestion((prev) => prev - 1);
                }}
              >
                Prev
              </button>
            )}
            {question < data.questions.length - 1 && (
              <div className="flex gap-4">
                <button
                  className="text-white bg-[var(--primary)]  px-3 py-1.5 rounded-lg"
                  onClick={() => {
                    if (question < data.questions.length - 1) {
                      setQuestion((prev) => prev + 1);
                    }
                  }}
                >
                  {question < data.questions.length - 1 ? "Next" : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-start items-end sm:items-start gap-8 col-span-3 sm:col-span-1">
          {window.innerWidth >= 640 && (
            <div className="flex flex-col gap-4">
              <span className="font-semibold">Questions</span>
              <div className="flex gap-2 flex-wrap max-w-[275px]">
                {qstatus.map((q, i) => (
                  <div
                    onClick={() => {
                      setQuestion((prev) => i);
                    }}
                    className={`cursor-pointer flex items-center justify-center rounded-xl w-8 h-8 border-2 ${
                      q === 1
                        ? `bg-green-500 border-green-500 text-white`
                        : q === -1
                        ? `bg-red-400 border-red-400 text-white`
                        : ""
                    } ${question === i ? "font-semibold" : ""}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Modal
            opened={opened}
            onClose={close}
            title="Confirm"
            centered
            overlayProps={{
              opacity: 0.55,
              blur: 3,
            }}
          >
            <p>
              You have answered{" "}
              <span className="font-semibold">
                {data.questions.filter((q) => q.selected.length > 0).length}
              </span>{" "}
              out of{" "}
              <span className="font-semibold">{data.questions.length}</span>{" "}
              question(s), and marked{" "}
              <span className="font-semibold">
                {data.questions.filter((q) => q.status === "marked").length}
              </span>{" "}
              question(s).
            </p>
            <p className="mt-2">
              Do you want to <span className="font-semibold">SUBMIT</span>?
            </p>
            <div className="flex justify-between  mt-3">
              <button
                onClick={close}
                className="border-2 text-slate-700 px-3 py-1.5 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={() => {
                  close();
                }}
                className="font-medium text-[var(--primary)] bg-blue-200 px-3 py-1.5 rounded-lg"
              >
                Submit
              </button>
            </div>
          </Modal>
          <Link
            to={`/quiz/${ID}/end`}
            className="font-medium text-[var(--primary)] rounded-lg"
          >
            Quiz Summary
          </Link>
          <Link
            to="/student"
            className="font-medium text-[var(--primary)] mt-[-20px] rounded-lg"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewQuiz;
