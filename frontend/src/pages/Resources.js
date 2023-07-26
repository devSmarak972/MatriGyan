import React, { useEffect, useState } from "react";
import ResourceCard from "../components/Resources/ResourceCard";
import ResourceSection from "../components/Resources/ResourceSection";
import Sidebar from "../components/StudentDashboard/Sidebar";
import FilterTopBar from "../components/General/FilterTopBar";
import data from "../components/Resources/resources.json";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import DeleteResource from "../components/Resources/DeleteResource";
import { toast } from "react-toastify";
import checkUser from "../utils/checkUser.js";

const Resources = (props) => {
  const [search, setSearch] = useState("");

  const [resources, setResources] = useState([]);

  const [educatorRes, setEducatorRes] = useState({});

  // const [userID, setUserID] = useState();

  const form = useForm({
    initialValues: {
      name: "",
      desc: "",
      image: "",
      fileUrl: "",
      tagname: "",
    },
    validate: {
      name: (value) => (value.length === 0 ? "Enter resource name" : null),
      fileUrl: (value) =>
        !new RegExp(/\/d\/(.+?)\//).test(value)
          ? "Please enter a Google Drive Sharing PDF URL of the format https://drive.google.com/file/d/FILE_ID/preview"
          : null,
      tagname: (value) =>
        value.length === 0 ? "Please enter a tag name" : null,
    },
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get-resources/`)
      .then(res=>{
        return res.data
      }).then((res) => {
        console.log(res.data.sections, " RES.DATA");
        setResources(res.data.sections);
        console.log(resources, "resources");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   setUserID(props.user?.current?.user?.id);
  // });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/educator-resource/${props.user.current?.educator?.id}/`)
      .then((res) => {
        console.log("DEL DATA: ", res.data);
        setEducatorRes(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const [opened, { open, close }] = useDisclosure(false);

  if (JSON.toString(educatorRes) === "{}") return null;

  console.log(educatorRes);

  return (
    <div className="min-h-[100vh]  flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar user={props.user} tab={3}></Sidebar>
      <div className="main-content w-full px-[var(--margin-x)]">
        <div className="form-wrapper mt-3 flex gap-3">
          <Modal centered opened={opened} onClose={close} title="New Resource">
            <form
              onSubmit={form.onSubmit(async (values) => {
                let resourceID = await axios
                  .post(
                    `${process.env.REACT_APP_BACKEND_URL}/add-resource/`,
                    {
                      title: values.name,
                      description: values.desc,
                      image: values.image,
                      file_url: values.fileUrl,
                      creator: 2,
                      tagname: values.tagname,
                    }
                  )
                  .then((res) => {
                    console.log("Resource Added");
                    setEducatorRes((prev) => ({
                      ...prev,
                      resources: [...prev.resources, res.data.resource],
                    }));
                    console.log(educatorRes);
                    return res.data?.resource?.id;
                  })
                  .catch((e) => toast(e.message));
                await setResources((prev) => {
                  if (
                    !prev
                      .map((section) => section.sectionname.toLowerCase())
                      .includes(values.tagname?.toLowerCase())
                  ) {
                    return [
                      {
                        sectionname: values.tagname,
                        cards: [
                          {
                            id: resourceID,
                            image: values.image,
                            description: values.desc,
                            image: values.image,
                            title: values.name,
                            file_url: values.fileUrl,
                            // date: new Date(),
                          },
                        ],
                      },
                      ...prev,
                    ];
                  }
                  return prev.map((section) => {
                    if (
                      section.sectionname.toLowerCase() !==
                      values.tagname.toLowerCase()
                    )
                      return section;
                    else {
                      return {
                        sectionname: section.sectionname,
                        cards: [
                          {
                            id: resourceID,
                            image: values.image,
                            description: values.desc,
                            image: values.image,
                            title: values.name,
                            file_url: values.fileUrl,
                            creator: props.user?.current?.educator,
                          },
                          ...section.cards,
                        ],
                      };
                    }
                  });
                });
                toast("Resource Added Successfully!");
              })}
            >
              <TextInput
                label="Resource Name"
                placeholder="Formula Sheet"
                {...form.getInputProps("name")}
              />
              <Textarea
                label="Description"
                placeholder="A concise formula sheet for integral and differential calculus"
                {...form.getInputProps("desc")}
                mt="md"
              />
              <TextInput
                mt="md"
                mb="md"
                label="Image URL"
                {...form.getInputProps("image")}
              />
              <TextInput
                mt="md"
                mb="md"
                label="File URL"
                placeholder="https://drive.google.com/file/d/FILE_ID/preview"
                {...form.getInputProps("fileUrl")}
              />
              <TextInput
                label="Tag Name"
                placeholder="Maths"
                {...form.getInputProps("tagname")}
              />
              <span className="font-semibold text-xs text-slate-400">
                (A Tag Name classifies resources into seperate viewing
                categories)
              </span>
              <button
                type="submit"
                onClick={form.isValid() ? close : null}
                className="mt-4 flex items-center gap-2 bg-[var(--primary)] text-white py-1.5 px-3 rounded-lg"
              >
                Add
              </button>
            </form>
          </Modal>
          {props.user?.current?.code === 2 && (
            <button
              onClick={open}
              className="flex items-center gap-2 bg-[var(--primary)] text-white py-1.5 px-3 rounded-lg"
            >
              <span className="font-semibold text-xl">+</span>
              <span className="font-medium w-max">New</span>
            </button>
          )}
          <FilterTopBar
            search={search}
            handleSearch={handleSearch}
          ></FilterTopBar>
          {props.user?.current?.code === 2 && (
            <DeleteResource
              educatorRes={educatorRes}
              setEducatorRes={setEducatorRes}
              resources={resources}
              setResources={setResources}
            />
          )}
        </div>
        <div className="container-lg page__container">
          {resources
            .map((section) => ({
              sectionname: section.sectionname,
              cards: section.cards.filter((card) => {
                // console.log(card.title.toLowerCase(), search);
                return card.title.toLowerCase().includes(search);
              }),
            }))
            .map((el) => {
              return (
                <ResourceSection
                  resource={el}
                  search={search}
                ></ResourceSection>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Resources;
