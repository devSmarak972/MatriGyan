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
import Live from "./pages/Live";
import Quiz from "./pages/Quiz/Quiz";
import PreQuiz from "./pages/Quiz/PreQuiz";
import PostQuiz from "./pages/Quiz/PostQuiz";
import ReviewQuiz from "./pages/Quiz/ReviewQuiz";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/coursepage" element={<CoursePage/>}/>
          <Route path="/resources" element={<Resources />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/educator-dashboard" element={<EducatorDashboard />} />
          <Route path="/edit-course" element={<EditCourse />} />
          <Route path="/student-calendar" element={<StudentCalendarPage />} />
          <Route path="/educator-calendar" element={<EducatorCalendarPage />} />
          <Route path="/edit-quiz" element={<EditQuizPage />} />
          <Route path="/live" element={<Live />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-start" element={<PreQuiz />} />
          <Route path="/quiz-end" element={<PostQuiz />} />
          <Route path="/quiz-review" element={<ReviewQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
