import React, { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import data from "./quiz.json";
import { Link, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [question, setQuestion] = useState(0);
  const [selected, setSelected] = useState([]);
  console.log(localStorage.getItem("timer"));
  const [start, setStart] = useState(JSON.parse(localStorage.getItem("timer")));
  const [opened, { open, close }] = useDisclosure(false);

  const Completionist = () => <span>Time Up!</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div>
          {hours ? <span>{hours + ":"}</span> : ""}
          <span>{zeroPad(minutes) + ":" + zeroPad(seconds)}</span>
        </div>
      );
    }
  };

  const [dataModified, setDataModified] = useState(
    data.questions.map((q) => ({
      ...q,
      selected: [],
      status: "unanswered",
    }))
  );

  const HandleTimerComplete = () => {
    localStorage.removeItem("timer");
    const navigate = useNavigate();
    navigate("/quiz-end");
  };

  return (
    <div className="h-screen flex">
      <div className="grid grid-cols-3 gap-8 w-[500px] sm:w-[800px] p-4 m-auto">
        <div className="col-span-3  mt-[50px]">
          <div className="fixed flex flex-col items-center top-0 left-0 w-full flex justify-center">
            <div className="flex items-center justify-between sm:justify-center w-full text-lg text-white bg-[var(--primary)] p-3">
              <Countdown
                renderer={renderer}
                date={start + data.mins * 60 * 1000}
                onComplete={() => {
                  window.location.href = "/quiz-end";
                }}
              />
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
                      {dataModified.map((q, i) => (
                        <div
                          onClick={() => {
                            setDataModified((prev) =>
                              prev.map((q, i) => {
                                if (i === question) {
                                  return {
                                    ...q,
                                    status:
                                      q.status === "unanswered" &&
                                      selected.length !== 0
                                        ? "answered"
                                        : q.status,
                                    selected: selected,
                                  };
                                } else return q;
                              })
                            );
                            setSelected(dataModified[i].selected);
                            setQuestion((prev) => i);
                          }}
                          className={`cursor-pointer flex items-center justify-center rounded-xl w-8 h-8 border-2 ${
                            q.status === "answered"
                              ? `bg-[var(--primary)] border-[var(--primary)] text-white`
                              : q.status === "marked"
                              ? `bg-orange-400 border-orange-400 text-white`
                              : ""
                          } ${
                            question === i
                              ? "font-semibold border-slate-300"
                              : ""
                          }`}
                        >
                          <Menu.Item
                            element="span"
                            className={`hover:bg-transparent cursor-pointer flex items-center justify-center rounded-xl w-8 h-8 border-2 ${
                              q.status === "answered"
                                ? `bg-[var(--primary)] border-[var(--primary)] text-white`
                                : q.status === "marked"
                                ? `bg-orange-400 border-orange-400 text-white`
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
            <span className="font-medium py-1 w-full text-center bg-[#f5f7fa]">
              {data.topic}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-end col-span-3 sm:col-span-2 gap-3">
          <div className="flex flex-col gap-3 min-h-[350px] overflow-y-scroll h-[70vh] pr-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold mb-2">
                Question {question + 1} of {dataModified.length}
              </span>
              <div className="flex flex-col items-end">
                <span>
                  {dataModified[question].type === "single"
                    ? "Single Choice Correct"
                    : "Multi Choice Correct"}
                </span>
                <span className="font-semibold">
                  +{dataModified[question].correct},
                  {" " + dataModified[question].incorrect}
                </span>
              </div>
            </div>
            <span className="font-medium text-black">
              {dataModified[question].question}
            </span>
            {dataModified[question].image && (
              <img src={dataModified[question].image} />
            )}
            <div className="flex flex-col gap-3">
              {dataModified[question].options.map((option, i) => (
                <div
                  className="flex gap-3 cursor-pointer"
                  onClick={() =>
                    setSelected((prev) =>
                      prev.includes(i + 1)
                        ? prev
                        : dataModified[question].type === "multi"
                        ? [...prev, i + 1]
                        : [i + 1]
                    )
                  }
                >
                  <span
                    className={`ease-in-out duration-300 font-medium flex w-8 h-8 border-2 items-center justify-center rounded-full ${
                      selected.includes(i + 1)
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : ""
                    }`}
                  >
                    {i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : "D"}
                  </span>
                  <span className="font-medium flex items-center text-black">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex mt-2 ${
              question === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {question !== 0 && (
              <button
                className="text-white bg-slate-500  px-3 py-1.5 rounded-lg"
                onClick={() => {
                  setDataModified((prev) =>
                    prev.map((q, i) => {
                      if (i === question) {
                        return {
                          ...q,
                          status:
                            selected.length !== 0 && q.status === "unanswered"
                              ? "answered"
                              : q.status,
                          selected: selected,
                        };
                      } else return q;
                    })
                  );
                  setSelected(dataModified[question - 1].selected);
                  setQuestion((prev) => prev - 1);
                }}
              >
                Prev
              </button>
            )}
            <div className="flex gap-4">
              <button
                className="text-white bg-orange-400  px-3 py-1.5 rounded-lg"
                onClick={() => {
                  setDataModified((prev) =>
                    prev.map((q, i) => {
                      if (i === question) {
                        return {
                          ...q,
                          status:
                            q.status !== "marked"
                              ? "marked"
                              : selected.length === 0
                              ? "unanswered"
                              : "answered",
                          selected: selected,
                        };
                      } else return q;
                    })
                  );
                  if (question < dataModified.length - 1) {
                    setSelected(dataModified[question + 1].selected);
                    setQuestion((prev) => prev + 1);
                  }
                }}
              >
                {dataModified[question].status === "marked" ? "Unmark" : "Mark"}
              </button>
              <button
                className="text-white bg-[var(--primary)]  px-3 py-1.5 rounded-lg"
                onClick={() => {
                  setDataModified((prev) =>
                    prev.map((q, i) => {
                      if (i === question) {
                        return {
                          ...q,
                          status:
                            q.status === "unanswered" && selected.length !== 0
                              ? "answered"
                              : q.status,
                          selected: selected,
                        };
                      } else return q;
                    })
                  );
                  if (question < dataModified.length - 1) {
                    setSelected(dataModified[question + 1].selected);
                    setQuestion((prev) => prev + 1);
                  }
                }}
              >
                {question < dataModified.length - 1 ? "Next" : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-end sm:items-start gap-8 col-span-3 sm:col-span-1">
          {window.innerWidth >= 640 && (
            <div className="flex flex-col gap-4">
              <span className="font-semibold">Questions</span>
              <div className="flex gap-2 flex-wrap max-w-[275px]">
                {dataModified.map((q, i) => (
                  <div
                    onClick={() => {
                      setDataModified((prev) =>
                        prev.map((q, i) => {
                          if (i === question) {
                            return {
                              ...q,
                              status:
                                q.status === "unanswered" &&
                                selected.length !== 0
                                  ? "answered"
                                  : q.status,
                              selected: selected,
                            };
                          } else return q;
                        })
                      );
                      setSelected(dataModified[i].selected);
                      setQuestion((prev) => i);
                    }}
                    className={`cursor-pointer flex items-center justify-center rounded-xl w-8 h-8 border-2 ${
                      q.status === "answered"
                        ? `bg-[var(--primary)] border-[var(--primary)] text-white`
                        : q.status === "marked"
                        ? `bg-orange-400 border-orange-400 text-white`
                        : ""
                    } ${
                      question === i ? "font-semibold border-slate-300" : ""
                    }`}
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
                {dataModified.filter((q) => q.selected.length > 0).length}
              </span>{" "}
              out of{" "}
              <span className="font-semibold">{dataModified.length}</span>{" "}
              question(s), and marked{" "}
              <span className="font-semibold">
                {dataModified.filter((q) => q.status === "marked").length}
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
              <Link
                to="/quiz-end"
                onClick={() => {
                  close();
                  localStorage.removeItem("timer");
                }}
                className="font-medium text-[var(--primary)] bg-blue-200 px-3 py-1.5 rounded-lg"
              >
                Submit
              </Link>
            </div>
          </Modal>

          <button
            onClick={open}
            className="font-medium text-[var(--primary)] bg-blue-200 px-3 py-1.5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
