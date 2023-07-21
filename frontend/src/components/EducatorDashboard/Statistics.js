import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  faPenToSquare,
  faHourglassEnd,
  faBookOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mantine/core";
import { motion } from "framer-motion";
import StatCard from "./StatCard";

const Statistics = (props) => {
  return (
    <div className="grid-flow-row order-first col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-3 lg:order-none lg:col-span-6 lg:gap-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="Average Course Rating"
          value={props.avgrating}
          den={5}
          decimal={1}
          icon={
            // <FontAwesomeIcon
            //   icon={faVideo}
            //   style={{ color: "#ffbc3a", width: "2rem", height: "2rem" }}
            // />
            <Rating value={props.avgrating} fractions={10} readOnly />
          }
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="Average Watch time per Day"
          value={props.watchtimehrs + "h"}
          subtitle={props.watchtimemin + "m"}
          icon={
            <FontAwesomeIcon
              icon={faHourglassEnd}
              style={{ color: "#26a1fd", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="Tests Created"
          value={props.tests}
          den={props.totaltests}
          icon={
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#f100b8", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="Courses Created"
          value={props.courses}
          icon={
            <FontAwesomeIcon
              icon={faBookOpen}
              style={{ color: "#22c55e", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="Hours Taught"
          value={props.taughthrs + "h"}
          subtitle={props.taughtmin + "m"}
          icon={
            <FontAwesomeIcon
              icon={faVideo}
              style={{ color: "#fe6078", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="Students Enrolled"
          value={props.students}
          icon={
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#ffbc3a", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
    </div>
  );
};

export default Statistics;
