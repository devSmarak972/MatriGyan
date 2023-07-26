import React, { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import { getUser } from "../../utils/getUser";
const EditCourse = (props) => {
  const user = useRef(false);
  const params = useParams();
  const [details, setDetails] = useState(null);
  const [cdata, setData] = useState(false);

  const [sections, setSections] = useState([]);
  const [category, setcategory] = useState([]);
  const [tags, settags] = useState([]);
  const [desc, setDesc] = useState("");
  const [name, setname] = useState("");
  const [optionscategory, setoptioncategory] = useState([]);
  const [optionstags, setoptiontags] = useState([]);
  const form = useForm({
    initialValues: {
      // section_id:"",
      title: "",
      category: "",
      price: "",
      tags: "",
      video: "",
      // videofile:"",
    },
  });
  console.log("Sections added", sections);
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


     axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-course/${params.ID}`)
      .then((data) => {
        setData(data.data.data);
        setSections(data.data.sections);
        setname(data.data.title);
        setDesc(data.data.description);
        setcategory(data.data.category);
        settags(data.data.tags);
        setoptioncategory(data.data.category);
        setoptiontags(data.data.tags);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      if (props.user.current.code === 0) {
        toast("Login to access course");
        window.location.href = "/login";
      }
      if (props.user.current.code === 1) {
        toast("Unauthorized access");
        window.location.href = "/student";
      }
    })();
    getCourse();
  }, []);
  console.log(cdata);

  // if(sections.length==0 || tags.length==0 || category.length==0){
  //   return toast("Course has no sections");
  // }

  // if (!details) {
  //   return null;
  // }

  const handleTitleChange = (value) => {
    setData(state=>{
      var tmp={...state};
      tmp["name"]=value;
    })
    // setname(value);
  };
  return (
    <div className="container p-8">
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 p-8">
        <Sidebar user={props.user} tab={1} />
        <main className="main-content w-full pb-8">
          <Title />
          {
            cdata? <div className="grid gap-[var(--margin-x)] grid-cols-1 sm:grid-cols-5 px-[var(--margin-x)]">
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
                  name={cdata.title}
                  onTitlechange={handleTitleChange}
                />
                <Quill setDesc={setDesc} desc={cdata.description} />
              </div>

              <Sections
                sections={cdata.sections}
                setSections={setSections}
                // classes={useStyles().classes}
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Save
                form={form}
                name={cdata.name}
                desc={cdata.desc}
                category={cdata.category}
                tags={cdata.tags}
              />
              {/* <Video form={form} /> */}
              <Options
                form={form}
                category={cdata.category}
                tags={cdata.tags}
                optionscategory={cdata.category}
                optionstags={cdata.tags}
                setcategory={cdata.category}
                settags={cdata.tags}
              />
            </div>
          </div>:<p>Loading ...</p>
          }
         
        </main>
      </div>
    </div>
  );
};

export default EditCourse;
