import { TextInput } from "@mantine/core";
import React from "react";

const Video = (props) => {
  return (
    <div className="m-0">
      {/* <div className="page-separator">
        <div className="flex items-center gap-2 mb-3 mt-5 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          <span>Video</span>
          <div className="border-1 flex-1 h-0"></div>
        </div>
      </div> */}

      {/* <div className="card"> */}
      <div className="embed-responsive embed-responsive-16by9 w-full">
        <iframe
          className="w-full h-48 sm:h-48 lg:h-64 embed-responsive-item rounded-t-lg"
          src={props.form.values.video}
          allowfullscreen=""
        ></iframe>
      </div>
      {/* <div className="card-body"> */}
        {/* <label className="form-label font-semibold">URL</label> */}
        <TextInput
          label="URL"
          placeholder="www.youtube.com"
          {...props.form.getInputProps("video")}
        />
        <small className="form-text text-muted">Enter a valid video URL.</small>
      {/* </div> */}
    </div>
    // </div>
  );
};

export default Video;
