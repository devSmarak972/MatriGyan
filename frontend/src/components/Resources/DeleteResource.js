import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteResource = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get-user/2/`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  });

  return (
    <div className="cursor-pointer bg-red-200 text-red-500 text-lg p-2 rounded-lg">
      <Modal opened={opened} onClose={close} title="Delete Resource">
        {/*  */}
      </Modal>
      <FontAwesomeIcon icon={faTrash} className="w-[25px] h-[25px] mb-[-1px]" />
    </div>
  );
};

export default DeleteResource;
