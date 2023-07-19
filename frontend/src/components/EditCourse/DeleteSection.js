import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Select, PasswordInput } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
const DeleteSection = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const nagivate = useNavigate();
  const params = useParams();
  const handleDelete = () => {
    if (props.form.isValid()) {
      const sectionName = props.form.values.sectionName;
      const updatedSections = props.sections.filter(
        (section) => section.title !== sectionName
      );
  
      // Update the state directly with the updated sections
      props.setSections(updatedSections);
  
      // Close the modal and navigate to the desired page
      close();
      // Make the API call to delete the section
      fetch(`http://127.0.0.1:8000/delete-section/${sectionName}`, {
        method: "delete"
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  
  
  const options = props.sections.map((section) => ({
    value: section.id,
    label: section.title,
  }));
  
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete Section"
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
            props.setSections(() =>
              props.sections.filter(
                (section) => section.title !== values.sectionName
              )
            );
            props.form.reset();
          })}
        >
          <div className="flex flex-column gap-3">
            <Select
              placeholder="Choose Section"
              data={options}
              withAsterisk
              {...props.form.getInputProps("sectionName")}
              transitionProps={{
                transition: "pop-top-left",
                duration: 200,
                timingFunction: "ease",
              }}
              searchable
              // onChange={handleSelectChange}
            />
            <PasswordInput
              placeholder="asd123"
              label="Enter Password to Confirm"
              withAsterisk
              {...props.form.getInputProps("password")}
            />
          </div>
          <Button
            onClick={handleDelete}
            type="submit"
            className="mt-4 text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Delete
          </Button>
        </form>
      </Modal>
      <button
        onClick={open}
        className="text-red-500 bg-red-100 hover:bg-red-200 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2"
      >
        Delete Section
      </button>
    </div>
  );
};

export default DeleteSection;
