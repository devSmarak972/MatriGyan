import React from "react";
import { useState } from "react";
import LogIn from "../../components/LoginSignup/LogIn";
import Illustration from "../../components/LoginSignup/Illustration";
import SignUp from "../../components/LoginSignup/SignUp";


const Landing = () => {
  const [page, setPage] = useState(1);

  const handleSwitch = (n) => {
    setPage((prev) => prev + n);
  };

  return (
    <div className="landing">
      <SignUp page={page} handleSwitch={handleSwitch} />
      <Illustration page={page} />
      <LogIn page={page} handleSwitch={handleSwitch} />
    </div>
  );
};

export default Landing;
