import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
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
          title="Watching Time"
          value={props.watchtimehrs + "h"}
          subtitle={props.watchtimemin + "m"}
          icon={
            <FontAwesomeIcon
              icon={faVideo}
              style={{ color: "#ffbc3a", width: "2rem", height: "2rem" }}
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
          title="Average Watch time per Day"
          value={props.watchtimehrs / 7 + "h"}
          subtitle={props.watchtimemin / 7 + "m"}
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
          title="Tests Attempted"
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
          title="Average Test Score"
          value={props.avgtestscore}
          den={100}
          icon={
            <FontAwesomeIcon
              icon={faChartSimple}
              style={{ color: "#fe6078", width: "2rem", height: "2rem" }}
            />
          }
        />
      </motion.div>
    </div>
  );
};

export default Statistics;
