import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonChalkboard,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./UserSelect.css";

const UserSelect = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="signup-content h-full"
    >
      <span className="signup-heading">Select User</span>
      <span className="signup-subheading">
        Are you an educator or a student?
      </span>
      <div className="flex flex-row w-full justify-between items-center flex-1">
        <div
          onClick={() => props.setUserType(2)}
          className="user-type-signup flex flex-col gap-3 items-center -translate-y-1/3 "
        >
          <FontAwesomeIcon
            icon={faPersonChalkboard}
            size="xl"
            className="user-icon-signup cursor-pointer mb-[-4px] mt-[4px] text-[var(--grey-dark)] w-[70px] h-[70px] rounded-full border-2 p-4 border-[var(--grey-dark)]"
          />
          <span className="user-name-signup font-medium uppercase text-[var(--grey-dark)]">
            Educator
          </span>
        </div>
        <div
          onClick={() => props.setUserType(1)}
          className="user-type-signup flex flex-col gap-3 items-center -translate-y-1/3 "
        >
          <FontAwesomeIcon
            icon={faUserGraduate}
            size="xl"
            className="user-icon-signup cursor-pointer mb-[-4px] mt-[4px] text-[var(--grey-dark)] w-[70px] h-[70px] rounded-full border-2 p-4 border-[var(--grey-dark)]"
          />
          <span className="user-name-signup font-medium uppercase text-[var(--grey-dark)]">
            Student
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserSelect;
