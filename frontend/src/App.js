import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import LandingPage from "./pages/LandingPage";
import EditCourse from "./pages/EditCourse/EditCourse";
import EducatorDashboard from "./pages/EducatorDashboard/EducatorDashboard";
import StudentCalendarPage from "./pages/StudentCalendarPage";
import EducatorCalendarPage from "./pages/EducatorCalendarPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/educator-dashboard" element={<EducatorDashboard />} />
          <Route path="/edit-course" element={<EditCourse />} />
          <Route path="/student-calendar" element={<StudentCalendarPage />} />
          <Route path="/educator-calendar" element={<EducatorCalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
