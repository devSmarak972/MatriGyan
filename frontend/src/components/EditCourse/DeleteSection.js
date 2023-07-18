import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, TextInput, Button, Select, PasswordInput } from "@mantine/core";
import axios from "axios";

const DeleteSection = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setName] = useState(null);
  const [section_id,setId] = useState(0);
  const [sid, setSid] = useState("");

  const handleIdChange = (id_section)=>{
    setId(id_section);
    setSid(section_id.toString());
    console.log("id is : ",section_id);
  }

  const handleChangeSection = (value) =>{
    setName(value);
    console.log("name is ",value);
    for(let i=0;i<props.sections.length;i++){
      if(props.sections[i].title===value){
        handleIdChange(props.sections[i].id);
        console.log("props id :",props.sections[i].id);
        break;
      }
    }
  }

  const DeleteSection = (sid) =>{
    console.log("sid : ",sid);
    axios.delete(`http://127.0.0.1:8000/delete-section/${sid}`)
    .then((res)=>{
      console.log('Section deleted.');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Delete Section"
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
            props.setSections(() =>
              props.sections.filter(
                (section) => section.title !== values.sectionName
              )
            );
            props.form.reset();
          })}
        >
          <div className="flex flex-column gap-3">
            <Select
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
              value={value}
              onChange={handleChangeSection}
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
                for(let i=0;i<props.sections.length;i++){
                  if(props.sections[i].title===value){
                    console.log('Yes');
                    handleIdChange(props.sections[i].id);
                    DeleteSection(sid);
                    break;
                  }
                }
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
        Delete Section
      </button>
    </div>
  );
};

export default DeleteSection;
