import React, { useEffect, useState } from "react";
// import data from "./quiz-answered.json";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const PostQuiz = () => {
  const { ID } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    setTimeout(() => {
      const fetchData = axios
        .get(`http://localhost:8000/get-quiz-response/${ID}/`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success)
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
                answer: [parseInt(ans.question.solution?.answer)],
                selected:
                  ans.answer.length > 0
                    ? ans.answer.split(" ").map((i) => parseInt(i) - 1)
                    : [],
                status: ans.answer.length === 0 ? "unanswered" : "answered",
                image: ans.question.image,
              })),
            });
          else {
            throw res.data.message;
          }
        })
        .catch((e) => {
          const error = () => toast(e);
          error();
          console.log(e);
        });
    }, 300);
  }, []);

  if (JSON.stringify(data) === "{}") return null;

  localStorage.removeItem("timer");
  // var {ID} = useParams();
  let marks = 0;
  let total = 0;
  let attempted = 0;
  let correct = 0;
  let negative = 0;
  for (let i = 0; i < data.questions.length; i++) {
    total = total + data.questions[i].correct;
    let answer = data.questions[i].answer;
    let selected = data.questions[i].selected;
    answer.sort();
    selected.sort();
    const arrEqual = answer.every((val, i) => val === selected[i]);
    if (arrEqual) {
      marks = marks + data.questions[i].correct;
      correct++;
      attempted++;
    } else if (selected.length > 0) {
      marks = marks + data.questions[i].incorrect;
      if (selected.length > 0) {
        attempted++;
        negative -= data.questions[i].incorrect;
      }
    }
  }

  const fraction = Math.max(0, marks / total);
  const largeArcFlag = fraction <= 0.5 ? 0 : 1;
  const sweepFlag = 1;
  const endX = 50 + 40 * Math.sin(2 * Math.PI * fraction);
  const endY = 50 - 40 * Math.cos(2 * Math.PI * fraction);

  return (
    <div className="p-4 h-screen flex bg-[var(--background-light)]">
      <div className="bg-white m-auto max-w-[500px] p-8 shadow-lg rounded-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--primary)]">Quiz</span>
          <span className="font-medium text-base">{data.topic}</span>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-base text-[var(--primary)]">
              Score
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#ccc"
                stroke-width="10"
              />

              <motion.path
                d={`M50,10 A40,40 0 ${largeArcFlag},${sweepFlag} ${endX},${endY}`}
                fill="none"
                stroke="var(--primary)"
                stroke-width="10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />

              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="black"
                font-size="16"
              >
                {marks} / {total}
              </text>
            </svg>
          </div>
          <img src="/quiz-end.svg" className="h-[200px]" />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            Attempted:{" "}
            <span className="font-normal text-base ml-0.5">
              {attempted} / {data.questions.length}
            </span>
          </span>
          <span className="font-semibold">
            Accuracy:{" "}
            <span className="font-normal text-base ml-0.5">
              {((100 * correct) / attempted).toFixed(2)}
            </span>
          </span>
          <span className="font-semibold">
            Negative:{" "}
            <span className="font-normal text-base ml-0.5">{-negative}</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={"/quiz/" + ID + "/review"}
            className="font-medium text-[var(--primary)]"
          >
            Check Your Mistakes
          </Link>
          <Link
            to="/student"
            className="font-medium text-white bg-[var(--primary)] px-3 py-1.5 rounded-lg"
          >
            To Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostQuiz;
