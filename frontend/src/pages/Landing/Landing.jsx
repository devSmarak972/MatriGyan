import React from "react";
import { useState } from "react";
import SignIn from "./SignIn";
import Illustration from "./Illustration";
import SignUp from "./SignUp";

const Landing = () => {
  const [page, setPage] = useState(1);

  const handleSwitch = (n) => {
    setPage((prev) => prev + n);
    console.log(page);
  };

  return (
    <div className="landing">
      <SignUp page={page} handleSwitch={handleSwitch} />
      <Illustration page={page} />
      <SignIn page={page} handleSwitch={handleSwitch} />
    </div>
  );
};

export default Landing;
