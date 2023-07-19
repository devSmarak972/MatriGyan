import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AddSection = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams();
  const nagivate = useNavigate();
  const handleClick = () => {
    if (props.form.isValid()) {
      const title = props.form.values.sectionName;
      const order_id= props.sections.length + 1;
      fetch(`http://127.0.0.1:8000/add-section/${params.ID}/`,{
        method:"post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, order_id}),
      })
      .then((result)=>{
        console.log(result);
        close();
        nagivate(`/course/${params.ID}/edit`);
      })
      
    }
  };
 
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Section"
        centered
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
      >
        <form
          onSubmit={props.form.onSubmit((values) => {
            props.setSections([
              ...props.sections,
              { title: props.form.values.sectionName, videos: [] },
            ]);
            props.form.reset();
          })}
        >
          <TextInput
            placeholder="ReactJS"
            label="Section Name"
            withAsterisk
            {...props.form.getInputProps("sectionName")}
          />
          <Button
            onClick={handleClick}
            type="submit"
            className="mt-4 text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Save
          </Button>
        </form>
      </Modal>
      <button
        onClick={open}
        className="text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2"
      >
        Add Section
      </button>
    </div>
  );
};

export default AddSection;
