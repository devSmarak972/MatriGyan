import React, { useEffect, useRef, useState } from "react";
import CompletedCourses from "../../components/StudentDashboard/CompletedCourses";
import Sidebar from "../../components/StudentDashboard/Sidebar";
import CurrentCourses from "../../components/StudentDashboard/CurrentCourses";
import Welcome from "../../components/StudentDashboard/Welcome";
import Statistics1 from "../../components/StudentDashboard/Statistics1";
import Statistics2 from "../../components/StudentDashboard/Statistics2";
import Tests from "../../components/StudentDashboard/Tests";
import LiveLectures from "../../components/StudentDashboard/LiveLectures";
import ItemCard from "../../components/StudentDashboard/ItemCard";
import { Checkbox } from "@mantine/core";
import DashboardCalendar from "../../components/StudentDashboard/DashboardCalendar";
import Tasklist from "../../components/StudentDashboard/Tasklist";
import axios from "axios";
import { getCookie } from "../../utils/apiCaller";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getUser from "../../utils/checkUser";

const StudentDashboard = (props) => {
  const navigate = useNavigate();
  const [Data, setData] = useState({});
  const mounted = useRef(false);
  const [loader, setLoader] = useState(true);
/*
  const [courses,setCourses] = useState([]);
  const getCourses = async ()=>{
    try{
      const res = await axios.get('http://127.0.0.1:8000/get-courses/')
      const data = res.data
      console.log(res.data);
      setCourses(data.data);
    } catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getCourses();
  }, [])
*/

  useEffect(() => {
    setLoader(false);
  }, []);
  useEffect(() => {
    mounted.current = true;
    const config = {
      withCredentials: true,
      // headers: {
      //   "X-CSRFToken": getCookie("csrftoken"),
      // },
    };
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/student-dashboard-data`,
        config
      )
      .then((res) => {
        console.log(res.data)
        if (!res.data.success) {
          if (res.data.code === 2) navigate("/educator");
          else {
            toast("Please Login first.");
            navigate("/login");
          }
        }

        if (mounted.current) {
          setData(res.data);
        }
      })
      .catch((err) => {
        const notify = () => toast(err.message);
        notify();
        navigate("/");
      });
    return () => (mounted.current = false);
  }, []);

  var comp = 0;
  if (Object.keys(Data).length)
    comp = Data.enrolled_courses.length - Data.on_courses.length;
  return (
    <>
      <ToastContainer></ToastContainer>
      {loader ? <Loader></Loader> : ""}
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
        <Sidebar user={props.user} tab={0} />
        <main className="main-content w-full pb-8 ml-5">

          <Welcome
            name={Data.name}
            user={props.user}
            setLoader={props.setLoader}
          />
          <CurrentCourses courses={Data.enrolled_courses} type="student" />
          <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
            <Statistics1
              completed={comp}
              inprogress={Data.on_courses ? Data.on_courses.length : 0}
            />
            <Statistics2
              watchtimehrs={Data ? Data.totalWatchTime : 0}
              watchtimemin={20}
              tests={Data.attempted_tests ? Data.attempted_tests.length : 0}
              totaltests={Data.my_tests ? Data.my_tests.length : 0}
              avgtestscore={Data.avgTestScore ? Data.avgTestScore : 30}
            />
            <Tests tests={Data.my_tests} attempted={Data.attempted_tests} />
            {Data.enrolled_courses ? (
              <CompletedCourses
                courses={
                  Data.on_courses.length !== 0
                    ? Data.enrolled_courses.filter(
                        (x) =>
                          !Data.on_courses.reduce(
                            (val, el) => x.id === el.id || val
                          )
                      )
                    : []
                }
              />
            ) : (
              ""
            )}
            {Data.tasks ? (
              <Tasklist tasks={Data.tasks}></Tasklist>
            ) : (
              <p className="p-3">Loading...</p>
            )}
            <LiveLectures lectures={Data.live_classes} />
            <div class="flex flex-col col-span-12 sm:col-span-6 lg:col-span-4">
              <div class="flex justify-between">
                <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                  Classes
                </h2>
                <span class="px-3 text-2xl text-muted">
                  <i className="fas fa-plus"></i>
                </span>
              </div>
              {/* <div className="noHoverCard card px-4 py-2 mb-2 h-auto justify-center flex flex-col gap-y-2">
                {Data.on_courses && Data.on_courses.length !== 0 ? (
                  Data.on_courses.map((el) => {
                    var tags = el.tags.map((tagd) => tagd.tagname);
                    return (
                      <ItemCard
                        educator={el.educator.name}
                        title={el.title}
                        tags={tags}
                      ></ItemCard>
                    );
                  })
                ) : (
                  <p className="p-3">
                    No ongoing courses. Enroll to some course to get started!
                  </p>
                )}
              </div> */}
              <p className="noHoverCard card p-4 mb-2 h-auto justify-center flex flex-col gap-y-2 col-span-2">
                Feature in development, coming soon!
              </p>
            </div>
            {/* <div class="flex flex-col col-span-12 sm:col-span-6 lg:col-span-4">
              <div class="flex justify-between">
                <h2 class="px-3 text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100 ">
                  Calendar
                </h2>
                <a
                  href="#"
                  class="pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
                >
                  View
                </a>
              </div>

              <DashboardCalendar></DashboardCalendar>
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
