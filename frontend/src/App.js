import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
