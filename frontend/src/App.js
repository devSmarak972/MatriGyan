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
import "@fortawesome/fontawesome-svg-core/styles.css";
import checkUser from "./utils/checkUser";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(0);
  // user types are:
  //0 for anonymous user
  //1 for student
  //2 for educator
  useEffect(() => {
    checkUser() 
      .then((data) => {
        console.log(data);
        if (data.success) {
          if (data.is_student) setUser(1);
          else setUser(2);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Router>
      <div>
        <ToastContainer></ToastContainer>

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          {/* <Route path="/search" element={<SearchLanding />} /> */}
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/student"
            element={
              user === 0 ? (
                <LoginSignup />
              ) : user === 1 ? (
                <StudentDashboard />
              ) : (
                <Page404 />
              )
            }
          />
          <Route
            path="/student/calendar"
            element={
              user === 0 ? (
                <LoginSignup />
              ) : user === 1 ? (
                <StudentCalendarPage />
              ) : (
                <Page404 />
              )
            }
          />
          <Route
            path="/educator/contents"
            element={user === 2 ? <MyContents /> : <Page404 />}
          />
          <Route
            path="/educator"
            element={
              user === 0 ? (
                <LoginSignup />
              ) : user === 2 ? (
                <EducatorDashboard />
              ) : (
                <Page404 />
              )
            }
          />
          <Route
            path="/course/:ID/edit"
            element={user === 2 ? <EditCourse /> : <Page404 />}
          />
          {/* <Route path="/course/add" element={< />} /> */}
          <Route
            path="/educator/calendar"
            element={
              user === 0 ? (
                <LoginSignup />
              ) : user === 2 ? (
                <EducatorCalendarPage />
              ) : (
                <Page404 />
              )
            }
          />
          <Route
            path="/quiz/:ID/edit"
            element={user === 2 ? <EditQuizPage /> : <Page404 />}
          />
          <Route
            path="/quiz/new"
            element={user === 2 ? <NewQuizPage /> : <Page404 />}
          />
          <Route
            path="/live/:ID"
            element={user === 0 ? <LoginSignup /> : <Liveclass />}
          />
          <Route
            path="/quiz/:ID"
            element={user === 0 ? <LoginSignup /> : <Quiz />}
          />
          <Route
            path="/quiz/:ID/start"
            element={user === 0 ? <LoginSignup /> : <PreQuiz />}
          />
          <Route
            path="/quiz/:ID/end"
            element={user === 0 ? <LoginSignup /> : <PostQuiz />}
          />
          <Route
            path="/quiz/:ID/review"
            element={user === 0 ? <LoginSignup /> : <ReviewQuiz />}
          />
          <Route
            path="/course/:id"
            element={user === 0 ? <LoginSignup /> : <CoursePreview />}
          />
          <Route
            path="/resourceview/:ID"
            element={user === 0 ? <LoginSignup /> : <ResourceView />}
          />
          <Route path="/developing" element={<InDev />} />
          <Route path="/not-found" element={<Page404 />} />
          <Route path="*" element={<Page404 />} /> .
        </Routes>
      </div>
    </Router>
  );
}

export default App;
