import React from "react";
import { motion } from "framer-motion";
import Logout from "../General/Logout";

const Welcome = (props) => {
  function handleLogout(e) {}
  return (
    <div className="flex gap-2 sticky px-[var(--margin-x)]">
      <span className="text-[1.75rem] font-bold text-slate-700 dark:text-navy-100">
        Welcome back,
      </span>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[1.75rem] font-bold text-[var(--primary)] dark:text-navy-100">
          Educator
        </span>
      </motion.div>
      <Logout user={props.user}></Logout>
    </div>
  );
};

export default Welcome;
