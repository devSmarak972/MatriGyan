import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import LandingPage from "./pages/LandingPage";
import CoursePage from "./pages/CoursePage";
import EditCourse from "./pages/EditCourse/EditCourse";
import EducatorDashboard from "./pages/EducatorDashboard/EducatorDashboard";
import Resources from "./pages/Resources";
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
          <Route path="/educator-dashboard" element={<EducatorDashboard />} />
          <Route path="/edit-course" element={<EditCourse />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
