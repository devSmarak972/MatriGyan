import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Select, NumberInput } from "@mantine/core";
import Video from "./Video";
import axios from "axios"
import {toast} from "react-toastify"
const AddVideo = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
async function handleVideoSubmit(values){
   console.log("submit");
   var section_id=props.sections.find(el=>el.title===values.sectionName);
   console.log(section_id,"sectionid")
   section_id=section_id?section_id.id:0;
    let videoData = new FormData();
    let vidObj = {
      title: values.name,
      url: values.video,
      section_id:section_id,
      duration:values.timemins
    };
    for (let key in vidObj) {
      videoData.append(key, vidObj[key]);
    }
    var videoId = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/add-video/`,
        videoData,
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${videoData._boundary}`,
          },
          withCredentials:true
        }
      )
      .then(async (res) => {
        console.log(res.data)
        // var data=JSON.parse(res.data);
        if(!res.data["success"])
        {
          toast("Failed to add video");
          return -1;
        }
        else return res.data.id
      }).catch(err=>{
          console.log(err.message);
        });
      props.setSections((prev) =>
        prev?.map((section) => {
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
              videos: [
                ...(section.videos?section.videos:[]),
                {
                  title:values.name,
                  duration:values.timemins,
                  url:values.url
                },
              ],
            };
          } else return section;
        })
      );
      props.form.reset();
  }
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
          onSubmit={props.form.onSubmit(async (values) =>{console.log("submitting",props.form.values); await handleVideoSubmit(values) 
          })}
        >
          <div className="flex flex-column gap-3">
            <Select
              label="Choose section to add video to"
              placeholder="Choose Section"
              data={props.sections?.map((section) => section.title)}
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
              label="Video Name"
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
