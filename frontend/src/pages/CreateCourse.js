import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { createStyles } from "@mantine/core";
// import Sidebar from "../../components/StudentDashboard/Sidebar";
import Sidebar from "../components/StudentDashboard/Sidebar";
import CreateTitle from "../components/CreateCourse/CreateHeading";
import EditTitle from "../components/EditCourse/EditTitle";
import Quill from "../components/EditCourse/Quill";
import Sections from "../components/EditCourse/Sections";
import Save from "../components/EditCourse/Save";
import Options from "../components/EditCourse/Options";
import axios from "axios";
import {toast} from "react-toastify"
import Create from "../components/CreateCourse/Create";



const CreateCourse = (props) => {
  const params = useParams();
  const [details, setDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [category, setcategory] = useState([]);
  const [tags, settags] = useState([]);
  const [desc, setDesc] = useState("");
  const [name, setname] = useState("");
  const [optionscategory, setoptioncategory] = useState([]);
  const [optionstags, setoptiontags] = useState([]);
  const [id,setID] = useState(1);
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
  console.log("Sections added",sections);
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
  
  const getTags = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-tags/`,{withCredentials:true});
        const data = res.data;
        if(data.success){
            setoptiontags(data.tags);
        }
    }catch(error){
        console.log(error);
    }
  };

  const getCategory = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-category/`,{withCredentials:true});
        const data = res.data;
        if(data.success){
            setoptioncategory(data.categories);
        }
    }catch(error){
        console.log(error);
    }
  };

  useEffect(() => {
    getTags();
    getCategory();
  }, []);

  useEffect(() => {
    console.log(tags, "tags");
    console.log(category, "category");
    console.log(desc, "desc");
  }, [tags,category,desc]);

  console.log({category, tags})

  // if(sections.length==0 || tags.length==0 || category.length==0){
  //   return toast("Course has no sections");
  // }

  // if (!details) {
  //   return null;
  // }

  const handleTitleChange = (value) => {
    setname(value);
  };
  return (
    <div className="container p-8">
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 p-8">
        <Sidebar user={props.user} />
        <main className="main-content w-full pb-8">
          <CreateTitle />
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

              {/* <Sections
                sections={sections}
                setSections={setSections}
                // classes={useStyles().classes}
              /> */}
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Create form = {form} name = {name} desc={desc} category={category} tags={tags} id={id}/>
              {/* <Video form={form} /> */}
              <Options form={form} category={category} tags={tags} optionscategory={optionscategory} optionstags={optionstags} setcategory={setcategory} settags={settags}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;
