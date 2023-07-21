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

const Resources = () => {
  const [search, setSearch] = useState("");

  const [resources, setResources] = useState([]);

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
      .get("http://127.0.0.1:8000/get-resources/")
      .then((res) => {
        // console.log(res.data.sections);
        setResources(res.data.sections);
        // console.log(resources, "resources");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="min-h-[100vh]  flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar></Sidebar>
      <div className="main-content w-full px-[var(--margin-x)]">
        <div className="form-wrapper mt-3 flex gap-3">
          <Modal centered opened={opened} onClose={close} title="New Resource">
            <form
              onSubmit={form.onSubmit(async (values) => {
                console.log("HIIII ", {
                  title: values.name,
                  description: values.desc,
                  image: values.image,
                  file_url: values.fileUrl,
                  creator: 2,
                  tagname: values.tagname,
                });
                console.log("RESOURCES: ", resources);
                let resourceID = await axios
                  .post(`${process.env.REACT_APP_BACKEND_URL}/add-resource/2/`, {
                    title: values.name,
                    description: values.desc,
                    image: values.image,
                    file_url: values.fileUrl,
                    creator: 2,
                    tagname: values.tagname,
                  })
                  .then((res) => res.data.resource.id)
                  .catch((e) => console.log(e));
                await setResources((prev) => {
                  console.log(
                    "HIIIIIIIVASDOVO",
                    prev.map((section) => !section.sectionname.toLowerCase())
                  );
                  if (
                    !prev
                      .map((section) => section.sectionname.toLowerCase())
                      .includes(values.tagname)
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
                            // date: new Date(),
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
          <button
            onClick={open}
            className="flex items-center gap-2 bg-[var(--primary)] text-white py-1.5 px-3 rounded-lg"
          >
            <span className="font-semibold text-xl">+</span>
            <span className="font-medium w-max">New</span>
          </button>
          <FilterTopBar
            search={search}
            handleSearch={handleSearch}
          ></FilterTopBar>
          <DeleteResource />
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
