import React, { useState } from "react";
import { TextInput } from "@mantine/core";
import { motion } from "framer-motion";

const EditTitle = (props) => {
  // const [name, setname]=useState("");
  const handleChange = (e) => {
    props.onTitlechange(e.target.value);
  }
  return (
    <div>
      <div className="my-3 transition-all duration-[.25s]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-md font-bold tracking-wide text-slate-700 dark:text-navy-100"
        >
          Course Title
        </motion.p>
      </div>
      <div className="form-group mb-24pt">
        <TextInput
          placeholder="Course name"
          {...props.form.getInputProps("name")}
          onChange={handleChange}
          value={props.name}
        />
        {/* <small className="form-text text-muted">
          Please see our <a href="">course title guideline</a>
        </small> */}
      </div>
    </div>
  );
};

export default EditTitle;
