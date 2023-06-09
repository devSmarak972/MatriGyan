import React from "react";
import { motion } from "framer-motion";
import "./Landing.css";

const Illustration = (props) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={{
          x: props.page === 1 ? (window.innerWidth >= 1024 ? "-50vw" : 0) : 0,
        }}
        transition={{ duration: 0.7 }}
        className="illustration"
      >
        <motion.span
          initial={false}
          animate={{
            x:
              props.page === 1
                ? 0
                : window.innerWidth > 1024
                ? window.innerWidth / 2 -
                  document.querySelector(".title").clientWidth
                : 0,
          }}
          transition={{ duration: 0.7 }}
          className="title"
        >
          MaitriGyan
        </motion.span>
        <img src="/online-learning.svg" alt="studying-img"/>
      </motion.div>
    </>
  );
};

export default Illustration;
