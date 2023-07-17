import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UploadAvatar = (props) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(props.preview);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

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
          onClick={() => {
            props.setAvatar(null);
            props.close();
          }}
          className="bg-red-200 text-white w-full rounded-lg p-2 font-semibold w-fit"
        >
          <FontAwesomeIcon icon={faTrash} className="text-red-400 w-[20px] h-[15px] mb-[-1px]" />
        </button>
        <button
          onClick={() => {
            props.setAvatar(preview);
            props.close();
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
