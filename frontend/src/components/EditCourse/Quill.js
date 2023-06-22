import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";

const Quill = (props) => {
  return (
    <div>
      <div className="mt-3 mb-3 transition-all duration-[.25s]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-md font-bold tracking-wide text-slate-700 dark:text-navy-100"
        >
          Description
        </motion.p>
      </div>
      <ReactQuill
        style={{ height: "8rem", marginBottom: "6rem" }}
        theme="snow"
        value={props.desc}
        onChange={props.setDesc}
      />
    </div>
  );
};

export default Quill;
