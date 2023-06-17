import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import StatCard from "./StatCard";

const Statistics = props => {
  return (
    <div className="mt-3 order-first col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:order-none lg:col-span-6 lg:gap-6">
      <div className="m-auto px-1 col-span-1 row-span-2">
        <img
          className="max-w-xs scale-125"
          src="dashboard.svg"
          alt="image"
          style={{ height: "17rem" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <StatCard
          title={"Courses in Progress"}
          value={props.inprogress}
          den={props.completed + props.inprogress}
          icon={
            <FontAwesomeIcon
              icon={faBarsProgress}
              style={{ color: "#306fd7", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <StatCard
          title={"Completed Courses"}
          value={props.completed}
          den={props.completed + props.inprogress}
          icon={
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "#22c55e", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
    </div>
  );
};

export default Statistics;
