import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Select, PasswordInput } from "@mantine/core";

const DeleteVideo = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  // console.log(props.form.values);
  console.log(
    props.form.values.sectionName === ""
      ? []
      : props.sections
          .find((section) => section.title === props.form.values.sectionName)
          .videos.map((subsection) => subsection.title)
  );
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete Video"
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
            console.log(values);
            props.setSections((prev) =>
              prev.map((section) => {
                if (section.title === values.sectionName) {
                  return {
                    title: section.title,
                    videos: section.videos.filter(
                      (subsection) => subsection.title !== values.videoName
                    ),
                  };
                } else return section;
              })
            );
            props.form.reset();
          })}
        >
          <div className="flex flex-column gap-3">
            <Select
              label="Choose section to delete from"
              placeholder="Choose Section"
              data={props.sections.map((section) => section.title)}
              withAsterisk
              {...props.form.getInputProps("sectionName")}
              transitionProps={{
                transition: "pop-top-left",
                duration: 200,
                timingFunction: "ease",
              }}
              searchable
            />
            <Select
              label="Choose Subsection to delete"
              placeholder="Choose Subsection"
              data={
                props.form.values.sectionName === ""
                  ? []
                  : props.sections
                      .find(
                        (section) =>
                          section.title === props.form.values.sectionName
                      )
                      .videos.map((subsection) => subsection.title)
              }
              withAsterisk
              {...props.form.getInputProps("videoName")}
              transitionProps={{
                transition: "pop-top-left",
                duration: 200,
                timingFunction: "ease",
              }}
              searchable
            />
            <PasswordInput
              placeholder="asd123"
              label="Enter Password to Confirm"
              withAsterisk
              {...props.form.getInputProps("password")}
            />
          </div>
          <Button
            onClick={() => {
              if (props.form.isValid()) {
                close();
              }
            }}
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
        Delete Video
      </button>
    </div>
  );
};

export default DeleteVideo;
