import React, { useEffect, useState } from "react";
import Sidebar from "../../components/EducatorDashboard/Sidebar";
import Added from "../../components/EditQuiz/Added";
import Save from "../../components/EditQuiz/Save";
// import data from "../../components/EditQuiz/questions.json";
import { useForm } from "@mantine/form";
import NewQ from "../../components/EditQuiz/NewQ";
import OtherDetails from "../../components/EditQuiz/OtherDetails";
import axios from "axios";
import checkUser from "../../utils/checkUser";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const NewQuizPage = (props) => {
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  console.log(props.user.current.code, 2);
  if (props.user.current.code !== 2) {
    nav("/not-found");
  }

  const form1 = useForm({
    initialValues: {
      question: "",
      type: "",
      correct: "",
      incorrect: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      solutionDesc: "",
      quesMedia: "",
      ansMedia: "",
    },
    validate: {
      question: (value) =>
        value.length === 0 ? "Please enter question statement" : null,
      type: (value) => (value.length === 0 ? "Choose question type" : null),
      correct: (value) =>
        value.length === 0 ? "Choose credits for correct answer" : null,
      incorrect: (value) =>
        value.length === 0 ? "Choose credits for correct answer" : null,
      option1: (value) => (value.length === 0 ? "Enter option 1" : null),
      option2: (value) => (value.length === 0 ? "Enter option 2" : null),
      option3: (value) => (value.length === 0 ? "Enter option 3" : null),
      option4: (value) => (value.length === 0 ? "Enter option 4" : null),
      answer: (value) =>
        value.length === 0
          ? "Choose the correct answer(s)"
          : form1.values.type.length !== 0 &&
            form1.values.type === "single" &&
            value.length > 1
          ? "Choose only one correct answer"
          : null,
    },
  });

  const form2 = useForm({
    initialValues: {
      name: "",
      course: "",
      time: "",
      topic: "",
      subject: "",
    },
    validate: {
      time: (value) =>
        value.length === 0 || value === 0
          ? "Allot a non-zero time in minutes"
          : null,
      name: (value) => (value.length === 0 ? "Enter quiz name" : null),
      topic: (value) => (value.length === 0 ? "Enter quiz topic" : null),
      subject: (value) => (value.length === 0 ? "Enter quiz subject" : null),
    },
  });

  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar user={props.user} tab={1} />
      <main className="main-content w-full pb-8 px-[var(--margin-x)]">
        <span className="text-[1.75rem] font-bold text-slate-700 mb-8">
          New Quiz
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div>
              <div className="page-separator">
                <div className="flex items-center gap-2 mb-3 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
                  <span>Questions</span>
                  <div className="border-1 flex-1 h-0"></div>
                  <NewQ
                    questions={questions}
                    setQuestions={setQuestions}
                    form={form1}
                    axiosType="add"
                  />
                </div>
              </div>
            </div>
            <Added
              questions={questions}
              setQuestions={setQuestions}
              form={form1}
              axiosType="add"
            />
          </div>
          <div>
            <OtherDetails
              userID={props.userID}
              form={form2}
              questions={questions}
              axiosType="add"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewQuizPage;
