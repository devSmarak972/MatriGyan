import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/LoginSignup/LoginSignup";
import LandingPage from "./pages/LandingPage";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Landing />} />
          <Route path="/signup" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
