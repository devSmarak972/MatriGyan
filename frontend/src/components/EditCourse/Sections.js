import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Accordion, TextInput } from "@mantine/core";
import { Modal, Button, Group } from "@mantine/core";
import AddSection from "./AddSection";
import DeleteSection from "./DeleteSection";
import AddVideo from "./AddVideo";
import DeleteVideo from "./DeleteVideo";

const Sections = (props) => {
  
  const form1 = useForm({
    initialValues: { sectionName: "" },
    validate: {
      sectionName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const form2 = useForm({
    initialValues: { sectionName: "", password: "" },
    validate: {
      sectionName: (value) =>
        value.length === 0 ? "Please choose a section" : null,
      password: (value) =>
        value === ""
          ? "Please enter your password to confirm"
          : value !== "asd123"
          ? "Incorrect Password"
          : null,
    },
  });

  const form3 = useForm({
    initialValues: {
      sectionName: "",
      name: "",
      timemins: "",
      timesecs: "",
      video: "",
      videofile:""
    },
    validate: {
      sectionName: (value) =>
        value.length === 0 ? "Please choose a section" : null,
      name: (value) =>
        value.length < 2
          ? "Subsection name must have atlease 2 characters"
          : null,
      timemins: (value) =>
        value === "" ? "Please enter minutes (at least 0)" : null,
      timesecs: (value) =>
        value === "" || value === 0
          ? "Please enter seconds (at least 1)"
          : null,
      video: (value) => (value.length === 0 ? "Please enter video URL" : null),
    },
  });

  const form4 = useForm({
    initialValues: {
      sectionName: "",
      videoName: "",
      password: "",
    },
    validate: {
      sectionName: (value) =>
        value.length === 0 ? "Please choose a section" : null,
      videoName: (value) =>
        value.length === 0 ? "Please choose a section" : null,
      password: (value) =>
        value === ""
          ? "Please enter your password to confirm"
          : value !== "asd123"
          ? "Incorrect Password"
          : null,
    },
  });
  if (props.sections.length === 0) {
    return (
      <div>
        <p>No sections available</p>
        <AddSection
          form={form1}
          sections={props.sections}
          setSections={props.setSections}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="page-separator">
        <div className="flex items-center gap-2 mb-3 mt-5 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          <span>Sections</span>
          <div className="border-1 flex-1 h-0"></div>
        </div>
      </div>
      <div id="accordion-collapse" data-accordion="collapse">
        <Accordion
          defaultValue={props.sections[0].title}
          // classNames={props.classes}
          // className={props.classes.root}
        >
          {props.sections?.map((section) => (
            <Accordion.Item value={section.title}>
              <Accordion.Control>
                <span className="font-semibold text-sm">{section.title}</span>
              </Accordion.Control>
              <Accordion.Panel>
                <div className="flex flex-column divide-y">
                  {section.videos?.map((videos) => (
                    <div className="flex justify-between py-2">
                      <Link className="font-normal text-slate-400" to={videos.url}>
                        {videos.title}
                      </Link>
                      <span>{videos.duration}</span>
                    </div>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="my-4 flex gap-3 flex-wrap">
          <AddSection
            form={form1}
            sections={props.sections}
            setSections={props.setSections}
          />

          <AddVideo
            form={form3}
            sections={props.sections}
            setSections={props.setSections}
          />

          <DeleteSection
            form={form2}
            sections={props.sections}
            setSections={props.setSections}
          />

          <DeleteVideo
            form={form4}
            sections={props.sections}
            setSections={props.setSections}
          />
        </div>
      </div>
    </div>
  );
};

export default Sections;
