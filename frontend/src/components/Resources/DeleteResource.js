import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, Select, Drawer } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";

const DeleteResource = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      resID: "",
    },
    validate: {
      resID: (value) =>
        value.length === 0 ? "Choose a resouece to delete" : null,
    },
  });

  console.log(props.educatorRes?.resources);

  return (
    <div>
      <Drawer opened={opened} onClose={close} title="Delete Resource">
        <form
          onSubmit={form.onSubmit(async (values) => {
            await axios
              .delete(`http://localhost:8000/delete-resource/${values.resID}/`)
              .then((res) => {
                toast("Resource Deleted.");
                props.setEducatorRes((prev) => ({
                  ...prev,
                  resources: prev.resources.filter(
                    (resource) => resource.id !== values.resID
                  ),
                }));
                props.setResources((prev) =>
                  prev.map((section) => ({
                    ...section,
                    cards: section.cards.filter(
                      (card) => card.id !== values.resID
                    ),
                  }))
                );
                close();
              })
              .catch((e) => console.log(e));
          })}
        >
          <Select
            label="Resource Name"
            searchable
            allowDeselect
            data={props.educatorRes?.resources?.map((resource) => ({
              value: resource.id,
              label: resource.title,
            }))}
            {...form.getInputProps("resID")}
          />
          <button
            type="submit"
            className="bg-red-200 text-red-500 rounded-lg mt-4 px-3 py-1.5 font-semibold"
          >
            Delete
          </button>
        </form>
      </Drawer>
      <div
        onClick={open}
        className="cursor-pointer bg-red-200 text-red-500 text-lg p-2 rounded-lg"
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="w-[25px] h-[25px] mb-[-1px]"
        />
      </div>
    </div>
  );
};

export default DeleteResource;
