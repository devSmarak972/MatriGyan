import React, { useEffect, useState } from "react";
// import data from "./quiz.json";
import { Link, json, useParams } from "react-router-dom";
import axios from "axios";

const PreQuiz = () => {
  const { ID } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:8000/get-quiz/${ID}/`,{withCredentials:true})
          .then((res) => {
            console.log("Quiz questions: ", res.data)
            setData({
              name: res.data.name,
              topic: res.data.topic,
              mins: res.data.time,
              questions: res.data.questions.map((q) => ({
                question: q.question,
                options: q.options,
                type: q.type === "SINGLE" ? "single" : "multi",
                correct: q.marks,
                incorrect: q.type === "SINGLE" ? -1 : -2,
                answer: [parseInt(q.solution.answer)],
                image: q.image,
              })),
            });
          });
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  if (JSON.stringify(data) === "{}") return null;

  let total = 0;
  let qtypes = [];
  for (let i = 0; i < data.questions.length; i++) {
    total = total + data.questions[i].correct;
    if (
      qtypes.filter((qtype) => qtype.type === data.questions[i].type).length ===
      0
    ) {
      qtypes = [
        ...qtypes,
        {
          correct: data.questions[i].correct,
          incorrect: data.questions[i].incorrect,
          type: data.questions[i].type,
        },
      ];
    }
  }

  return (
    <div className="p-4 h-screen flex bg-[var(--background-light)]">
      <div className="bg-white m-auto max-w-[500px] p-8 shadow-lg rounded-xl flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--primary)]">
            {data.name}
          </span>
          <span className="font-medium text-black text-base">{data.topic}</span>
        </div>
        <span>
          This paper contains a total of {data.questions.length} questions.
          <p>
            Back Navigation is allowed. No calculators are allowed during the
            taking of the quiz.
          </p>
        </span>
        <span className="text-base">
          <span className="text-sm font-semibold">Time</span>: {data.mins}{" "}
          minutes
        </span>
        <span className="text-base">
          <span className="text-sm font-semibold">Total Marks</span>: {total}
        </span>
        <div className="flex gap-2 text-base">
          <span className="font-semibold text-sm">Question Types:</span>
          <div className="flex flex-col gap-1">
            {Array.from(qtypes).map((qtype) => (
              <div className="flex gap-1">
                <span className="min-w-[50px] font-semibold text-slate-600">
                  +{qtype.correct}, {qtype.incorrect}
                </span>
                <span>
                  (
                  {qtype.type === "single"
                    ? "Single Correct"
                    : qtype.type === "multi"
                    ? "Multiple Correct"
                    : ""}
                  )
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <span className="h-fit text-white bg-[var(--primary)] px-3 py-1.5 rounded-lg">
              Next
            </span>
            <span>
              {" "}
              Save current answer if any and go to next question. (Does not
              submit quiz.)
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="h-fit text-white bg-orange-400 px-3 py-1.5 rounded-lg">
              Mark
            </span>
            <span>
              {" "}
              Mark question for future review and move to next question.
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="h-fit text-white bg-slate-500  px-3 py-1.5 rounded-lg">
              Prev
            </span>
            <span>
              {" "}
              Go to previous question after saving current answer if any.
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="h-fit font-medium text-[var(--primary)] bg-blue-200 px-3 py-1.5 rounded-lg">
              Submit
            </span>
            <span> Submit Quiz</span>
          </div>
        </div>
        <Link
          to={`/quiz/${ID}`}
          onClick={() => {
            if (!localStorage.getItem("timer"))
              localStorage.setItem("timer", JSON.stringify(Date.now()));
            // else console.log(localStorage.getItem("timer"));
          }}
          className="w-fit m-auto text-center mt-2 hover:scale-105 font-medium text-[var(--primary)] bg-blue-200 px-3 py-1.5 rounded-lg"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default PreQuiz;
