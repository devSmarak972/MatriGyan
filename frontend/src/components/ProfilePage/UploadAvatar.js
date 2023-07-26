import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

const UploadAvatar = (props) => {
  console.log("HIII", props.data);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(props.preview);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  useEffect(() => {
    console.log(preview?.slice(0, 40));
  }, [preview]);

  return (
    <div className="flex flex-col gap-8 items-center">
      <Avatar
        width={250}
        height={250}
        onCrop={onCrop}
        onClose={onClose}
        exportQuality={1}
      />
      {preview && (
        <div className="flex flex-col gap-2 items-center w-fit">
          <span className="font-semibold">Preview</span>
          <img src={preview} className="w-2/3" />
        </div>
      )}
      <div className="flex gap-2 w-full">
        <button
          onClick={async () => {
            props.setAvatar(null);
            await axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/edit-${
                  props.data.code === 1 ? "student" : "educator"
                }/${props.data.user.id}/`,
                {
                  profile_pic:
                    "https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg",
                }
              )
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
            props.close();
            window.location.reload();
          }}
          className="bg-red-200 text-white w-full rounded-lg p-2 font-semibold w-fit"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-400 w-[20px] h-[15px] mb-[-1px]"
          />
        </button>
        <button
          onClick={async () => {
            props.setAvatar(preview);
            await axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/edit-${
                  props.data.code === 1 ? "student" : "educator"
                }/${props.data.user.id}/`,
                {
                  profile_pic: preview,
                }
              )
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
            props.close();
            // window.location.reload();
          }}
          className="bg-[var(--primary)] text-white w-full rounded-lg px-4 py-2 font-semibold w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UploadAvatar;
