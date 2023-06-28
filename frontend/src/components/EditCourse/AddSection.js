import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button } from "@mantine/core";

const AddSection = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

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
              { title: props.form.values.sectionName, subsections: [] },
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
            onClick={props.form.isValid() ? close : null}
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
