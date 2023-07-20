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
import { getUser } from "./utils/getUser";
import { useEffect, useRef, useState } from "react";

function App() {
  const user = useRef(0);
  // user types are:
  //0 for anonymous user
  //1 for student
  //2 for educator
  useEffect(() => {
    getUser()
      .then((data) => {
        console.log(data);
        if (data.success) {
          if (data.is_student) user.current = 1;
          else user.current = 2;
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
          <Route path="/student/profile" element={<ProfilePage />} />
          <Route path="/educator/profile" element={<ProfilePage />} />
          <Route path="/student" element={<StudentDashboard user={user} />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route
            path="/educator/contents"
            element={<MyContents user={user} />}
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/educator" element={<EducatorDashboard user={user} />} />
          <Route path="/course/:ID/edit" element={<EditCourse user={user} />} />
          <Route path="/student/calendar" element={<StudentCalendarPage />} />
          <Route path="/educator/calendar" element={<EducatorCalendarPage />} />
          <Route path="/quiz/:ID/edit" element={<EditQuizPage />} />
          <Route path="/quiz/new" element={<NewQuizPage user={user} />} />
          <Route path="/live/:ID" element={<InDev />} />
          <Route path="/quiz/:ID" element={<Quiz />} />
          <Route path="/quiz/:ID/start" element={<PreQuiz user={user} />} />
          <Route path="/quiz/:ID/end" element={<PostQuiz user={user} />} />
          <Route path="/quiz/:ID/review" element={<ReviewQuiz user={user} />} />
          <Route path="/course/:id" element={<CoursePreview />} />
          <Route path="/resourceview/:ID" element={<ResourceView user={user} />} />
          <Route path="/not-found" element={<Page404 />} />
          <Route path="/developing" element={<InDev />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
