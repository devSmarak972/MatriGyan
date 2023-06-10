import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Landing from "./pages/Landing/Landing";

function App() {
  //   // Import the functions you need from the SDKs you need
  // import { initializeApp } from "firebase/app";
  // import { getAnalytics } from "firebase/analytics";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCtqdA8GnAPkLaqPnGdQusAwH5D15JUfzY",
  //   authDomain: "maitrigyan-a989c.firebaseapp.com",
  //   projectId: "maitrigyan-a989c",
  //   storageBucket: "maitrigyan-a989c.appspot.com",
  //   messagingSenderId: "768951886895",
  //   appId: "1:768951886895:web:49688ade90cd795c7152da",
  //   measurementId: "G-P5TBYNV3F6"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Landing />} />
          <Route path="/signup" element={<Landing />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
