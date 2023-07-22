import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import LandingPage from "./pages/LandingPage";
import CoursePage from "./pages/CoursePage";
import EditCourse from "./pages/EditCourse/EditCourse";
import EducatorDashboard from "./pages/EducatorDashboard/EducatorDashboard";
import Resources from "./pages/Resources";
import StudentCalendarPage from "./pages/StudentCalendarPage";
import EducatorCalendarPage from "./pages/EducatorCalendarPage";
import EditQuizPage from "./pages/EditQuiz/EditQuizPage";
import NewQuizPage from "./pages/EditQuiz/NewQuizPage";
import Live from "./pages/Live";
import Liveclass from "./pages/Liveclass";
import Quiz from "./pages/Quiz/Quiz";
import PreQuiz from "./pages/Quiz/PreQuiz";
import PostQuiz from "./pages/Quiz/PostQuiz";
import ReviewQuiz from "./pages/Quiz/ReviewQuiz";
import CoursePreview from "./pages/CoursePreview";
import MyContents from "./pages/MyContents";
import SearchLanding from "./components/LandingPage/SearchLanding";
import Loader from "./loader";
import MyItems from "./pages/MyContents";
import Page404 from "./pages/Page404/Page404";
import InDev from "./pages/InDev/InDev";
import ResourceView from "./pages/ResourceView";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import CreateCourse from "./pages/CreateCourse";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getUser } from "./utils/getUser";
import { useEffect, useRef, useState } from "react";

function App() {
  const user = useRef(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUser();
        user.current = result;
        setLoader(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log(user.current);
  }, [loader]);

  console.log(user.current);

  useEffect(() => {
    console.log("USER::::::  ", user.current);
  }, [user.current]);

  return (
    <Router>
      <div>
        <ToastContainer></ToastContainer>

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          {loader ? (
            <Route exact path="*" element={<Loader />} />
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginSignup user={user} setLoader={setLoader} />}
              />
              <Route
                path="/signup"
                element={<LoginSignup user={user} setLoader={setLoader} />}
              />
              {/* <Route
                path="/student/profile"
                element={<ProfilePage user={user} />}
              /> */}
              <Route
                path="/profile"
                element={<ProfilePage user={user} setLoader={setLoader} />}
              />
              <Route
                path="/student"
                element={<StudentDashboard user={user} setLoader={setLoader} />}
              />
              <Route path="/courses" element={<CoursePage user={user} />} />
              <Route
                path="/educator/contents"
                element={<MyContents user={user} />}
              />
              <Route path="/resources" element={<Resources user={user} />} />
              <Route
                path="/educator"
                element={
                  <EducatorDashboard user={user} setLoader={setLoader} />
                }
              />
              <Route
                path="/course/:ID/edit"
                element={<EditCourse user={user} />}
              />
              {/* <Route
                path="/calendar"
                element={<StudentCalendarPage user={user} />}
              /> */}
              <Route
                path="/calendar"
                element={
                  user.current.code === 1 ? (
                    <StudentCalendarPage user={user} />
                  ) : (
                    <EducatorCalendarPage user={user} />
                  )
                }
              />
              <Route
                path="/quiz/:ID/edit"
                element={<EditQuizPage user={user} />}
              />
              <Route
                path="/quiz/new"
                element={
                  <NewQuizPage user={user} userID={user.current?.user?.id} />
                }
              />
              <Route path="/live/:ID" element={<InDev />} />
              <Route path="/quiz/:ID" element={<Quiz />} />
              <Route path="/quiz/:ID/start" element={<PreQuiz />} />
              <Route path="/quiz/:ID/end" element={<PostQuiz />} />
              <Route path="/quiz/:ID/review" element={<ReviewQuiz />} />
              <Route
                path="/course/:id"
                element={<CoursePreview user={user} />}
              />
              <Route
                path="/resourceview/:ID"
                element={<ResourceView user={user} />}
              />
          <Route path="/resourceview" element={<ResourceView />}/>

<Route path="/edit/profile" element={<EditProfile />} />

              <Route path="/not-found" element={<Page404 />} />
              <Route path="/developing" element={<InDev />} />
              <Route path="/*" element={<Page404 />} />
            </>
          )}
       </Routes>
      </div>
    </Router>
  );
}

export default App;
