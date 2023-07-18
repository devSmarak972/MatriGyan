import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const params = useParams();
  const [details, setDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [category, setcategory] = useState([]);
  const [tags, settags] = useState([]);
  const [desc, setDesc] = useState("");
  const [name, setname] = useState("");
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      price: "",
      tags: "",
      video: "",
    },
  });
  
  // const useStyles = createStyles((theme) => ({
  //   root: {
  //     borderRadius: theme.radius.sm,
  //   },
  //   item: {
  //     position: "relative",
  //     zIndex: 0,
  //     transition: "transform 150ms ease",
  
  //     "&[data-active]": {
  //       transform: "scale(1.03)",
  //       backgroundColor:
  //         theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  //       boxShadow: theme.shadows.md,
  //       borderColor:
  //         theme.colorScheme === "dark"
  //           ? theme.colors.dark[4]
  //           : theme.colors.gray[2],
  //       borderRadius: theme.radius.md,
  //       zIndex: 1,
  //     },
  //   },
  //   chevron: {
  //     "&[data-rotate]": {
  //       transform: "rotate(-90deg)",
  //     },
  //   },
  // }));
  
  const getCourse = () => {
    fetch(`http://127.0.0.1:8000/get-course/${params.ID}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        setSections(data.data.sections);
        setname(data.data.title);
        setDesc(data.data.description);
        setcategory(data.data.category);
        settags(data.data.tags);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCourse();
    
  }, []);

  // if (!details) {
  //   return null;
  // }
  console.log({name, desc, sections, category, tags})
  const handleTitleChange = (value) => {
    setname(value);
  };
  return (
    <div className="container p-8">
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 p-8">
        <Sidebar />
        <main className="main-content w-full pb-8">
          <Title />
          <div className="grid gap-[var(--margin-x)] grid-cols-1 sm:grid-cols-5 px-[var(--margin-x)]">
            <div className="col-span-1 sm:col-span-3">
              <div>
                <div className="page-separator">
                  <div className="flex items-center gap-2 mb-3 mt-[4rem] page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
                    <span>Basic Information</span>
                    <div className="border-1 flex-1 h-0"></div>
                  </div>
                </div>

                <EditTitle
                  form={form}
                  name={name}
                  onTitlechange={handleTitleChange}
                />
                <Quill setDesc={setDesc} desc={desc} />
              </div>

              <Sections
                sections={sections}
                setSections={setSections}
                // classes={useStyles().classes}
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Save form = {form} name = {name} desc={desc} category={category} tags={tags}/>
              {/* <Video form={form} /> */}
              <Options form={form} category={category} tags={tags}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditCourse;
