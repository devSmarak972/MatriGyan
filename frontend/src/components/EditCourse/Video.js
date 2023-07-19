import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { TextInput,FileInput,Progress } from "@mantine/core";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {uploadVideoToStorage} from "../../utils/storage"
const Video = (props) => {
  const [showProgress,setShowProgress]=useState(false)
  // console.log("here")
  async function uploadVideo(e){
    // console.log(e.currentTarget,e.currentTarget.files,"files",e.target.value)
    var file=e;
    console.log(e)
    
    if(e!==null)
    {
    // props.form.setFieldValue('videofile',file)
    // setShowProgress(1);
     var url=await uploadVideoToStorage(file,setShowProgress);
    //  axios.put("",{});
    console.log(url,"uploaded")
    props.form.setFieldValue('video',url)
    setShowProgress(true);
    }

}  
return (
    <div className="m-0">
      {/* <div className="page-separator">
        <div className="flex items-center gap-2 mb-3 mt-5 page-separator__text text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          <span>Video</span>
          <div className="border-1 flex-1 h-0"></div>
        </div>
      </div> */}

      {/* <div className="card"> */}
      
      {
        !isNaN(showProgress)?<Progress value={showProgress}></Progress> :(
          showProgress?
        <div className="embed-responsive embed-responsive-16by9 w-full">
        <iframe
          className="w-full bg-black h-48 sm:h-48 lg:h-64 embed-responsive-item rounded-t-lg"
          src={props.form.values.video}
          allowfullscreen=""
        ></iframe>
      </div>:"")
      }
      {/* <div className="card-body"> */}
        {/* <label className="form-label font-semibold">URL</label> */}
        <FileInput
              label="Video File"
              placeholder="Upload Video"
              icon={<FontAwesomeIcon icon={faVideo} />}
              accept="video/mp4,video/mkv"
              className="w-full"
              value={props.form.values.input}
             onChange={event=>uploadVideo(event)}
           />
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
