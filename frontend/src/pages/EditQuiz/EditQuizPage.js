import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/EducatorDashboard/Sidebar";
import Added from "../../components/EditQuiz/Added";
import Save from "../../components/EditQuiz/Save";
// import data from "../../components/EditQuiz/questions.json";
import { useForm } from "@mantine/form";
import NewQ from "../../components/EditQuiz/NewQ";
import OtherDetails from "../../components/EditQuiz/OtherDetails";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { getUser } from "../../utils/getUser";
const EditQuizPage = (props) => {
  const { ID } = useParams();
  const [data, setData] = useState({});
  const user = useRef(false);
  useEffect(() => {
    (async () => {
      user.current = await getUser();
      if (user.current.code === 0) {
        toast("Login to access quiz");
        window.location.href = "/login";
      }
      if (user.current.code === 1) {
        toast("Unauthorized access");
        window.location.href = "/not-found";
      }
    })();

    const fetchData = async () => {
      try {
        const response = await axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/get-quiz/${ID}/`)
          .then((res) => {
            console.log(res.data.quiz, res.data.quiz.name);
            if (!res.data.success) {
              toast(res.data.message);
              window.location.href = "/not-found";
              return;
            }
            if (res.data.quiz.creator_id !== user.current?.educator?.id) {
              toast("You are not authorised to edit this course");
              window.location.href("/educator");
              return;
            }
            setData({
              name: res.data.quiz.name,
              topic: res.data.quiz.topic,
              mins: res.data.quiz.time,
              course: res.data.quiz.course,
              questions: res.data.quiz?.questions
                ?.map((q) => ({
                  id: q.id,
                  qnumber: q.qnumber,
                  question: q.question,
                  options: q.options.map((op) => op.value),
                  type: q.type === "SINGLE" ? "single" : "multi",
                  correct: q.marks,
                  incorrect: q.type === "SINGLE" ? -1 : -2,
                  answer: [parseInt(q.solution?.answer)],
                  solutionDesc: q.solution?.solution,
                  quesMedia: q.image,
                  ansMedia: q.solution?.media,
                }))
                .sort((a, b) => a.qnumber - b.qnumber),
            });
            form2.setValues({
              name: res.data.quiz.name,
              topic: res.data.quiz.topic,
              time: res.data.quiz.time,
              subject: res.data.quiz.subject,
            });
          });
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  const [questions, setQuestions] = useState(data.questions);

  useEffect(() => {
    console.log(data, "data");
    setQuestions(data.questions);
  }, [data]);

  console.log(questions);

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
      option1: (value) => (value?.length === 0 ? "Enter option 1" : null),
      option2: (value) => (value?.length === 0 ? "Enter option 2" : null),
      option3: (value) => (value?.length === 0 ? "Enter option 3" : null),
      option4: (value) => (value?.length === 0 ? "Enter option 4" : null),
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
      time: 45,
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

  if (JSON.stringify(data) === "{}" || !questions) return null;

  return (
    <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar user={props.user} tab={1} />
      <main className="main-content w-full pb-8 px-[var(--margin-x)]">
        <span className="text-[1.75rem] font-bold text-slate-700 mb-8">
          Edit Quiz
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
                    axiosType="edit"
                    ID={ID}
                  />
                </div>
              </div>
            </div>
            <Added
              questions={questions}
              setQuestions={setQuestions}
              form={form1}
              axiosType="edit"
              ID={ID}
            />
          </div>
          <div>
            <OtherDetails
              form={form2}
              questions={questions}
              axiosType="edit"
              ID={ID}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditQuizPage;
