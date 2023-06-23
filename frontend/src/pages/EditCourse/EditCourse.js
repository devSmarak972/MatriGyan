import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { createStyles } from "@mantine/core";
import Sidebar from "../../components/StudentDashboard/Sidebar";
import Title from "../../components/EditCourse/EditCourseHeading";
import EditTitle from "../../components/EditCourse/EditTitle";
import Quill from "../../components/EditCourse/Quill";
import Sections from "../../components/EditCourse/Sections";
import Save from "../../components/EditCourse/Save";
import Options from "../../components/EditCourse/Options";

const EditCourse = () => {
  const sectionsData = [
    {
      title: "Course Overview",
      subsections: [
        { name: "Introduction", time: "8m 42s" },
        { name: "Introduction to TypeScript", time: "50m 32s" },
        { name: "Comparing Angular to AngularJS", time: "12m 10s" },
      ],
    },
    {
      title: "Creating and Communicating Between Angular Components",
      subsections: [
        { name: "Introduction2", time: "8m 42s" },
        { name: "Introduction to TypeScript2", time: "50m 32s" },
        { name: "Comparing Angular to AngularJS2", time: "12m 10s" },
      ],
    },
    {
      title: "Exploring the Angular Tempalte Syntax",
      subsections: [
        { name: "Introduction3", time: "8m 42s" },
        { name: "Introduction to TypeScript3", time: "50m 32s" },
        { name: "Comparing Angular to AngularJS3", time: "12m 10s" },
      ],
    },
  ];

  const [sections, setSections] = useState(sectionsData);

  const category = ["VueJS", "Angular", "React"];

  const tags = ["Javascript", "Angular", "Bootstrap", "CSS", "HTML"];

  const useStyles = createStyles((theme) => ({
    root: {
      borderRadius: theme.radius.sm,
    },

    item: {
      position: "relative",
      zIndex: 0,
      transition: "transform 150ms ease",

      "&[data-active]": {
        transform: "scale(1.03)",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        boxShadow: theme.shadows.md,
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
        borderRadius: theme.radius.md,
        zIndex: 1,
      },
    },

    chevron: {
      "&[data-rotate]": {
        transform: "rotate(-90deg)",
      },
    },
  }));

  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      price: "",
      tags: "",
      video: "",
    },
  });

  const [desc, setDesc] = useState("");

  useEffect(() => {
    console.log(desc);
  }, [desc]);

  return (
    <div className="container p-8">
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 p-8">
        <Sidebar />
        <main className="main-content w-full pb-8">
          <Title />
          <div class="grid gap-[var(--margin-x)] grid-cols-1 sm:grid-cols-5 px-[var(--margin-x)]">
            <div class=" col-span-1 sm:col-span-3 ">
              <div>
                <div class="page-separator">
                  <div class="flex items-center gap-2 mb-3 mt-[4rem] page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
                    <span>Basic Information</span>
                    <div className="border-1 flex-1 h-0"></div>
                  </div>
                </div>

                <EditTitle form={form} />
                <Quill setDesc={setDesc} desc={desc} />
              </div>

              <Sections
                sections={sections}
                setSections={setSections}
                classes={classes}
              />
            </div>

            <div class=" col-span-1 sm:col-span-2">
              <Save />
              {/* <Video form={form} /> */}
              <Options form={form} category={category} tags={tags} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditCourse;
