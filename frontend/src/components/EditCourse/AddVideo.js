import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Select, NumberInput } from "@mantine/core";
import Video from "./Video";

const AddVideo = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Video"
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
            props.setSections((prev) =>
              prev.map((section) => {
                if (section.title === values.sectionName) {
                  let sec = values.timesecs;
                  let min = values.timemins;
                  let hr = 0;
                  min = min + Math.floor(sec / 60);
                  sec = sec % 60;
                  hr = hr + Math.floor(min / 60);
                  min = min % 60;
                  return {
                    title: section.title,
                    subsections: [
                      ...section.subsections,
                      {
                        name: values.name,
                        time: hr + "hr " + min + "m " + sec + "s",
                      },
                    ],
                  };
                } else return section;
              })
            );
            props.form.reset();
          })}
        >
          <div className="flex flex-column gap-3">
            <Select
              label="Choose section to add video to"
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
            <TextInput
              label="Subsection Name"
              placeholder="Introduction to React States"
              withAsterisk
              {...props.form.getInputProps("name")}
            />
            <div className="flex gap-4">
              <NumberInput
                placeholder="5"
                label="Time in minutes"
                withAsterisk
                {...props.form.getInputProps("timemins")}
              />
              <NumberInput
                placeholder="30"
                label="Time in seconds"
                withAsterisk
                {...props.form.getInputProps("timesecs")}
              />
            </div>
            <Video form={props.form} />
          </div>
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
        Add Video
      </button>
    </div>
  );
};

export default AddVideo;
