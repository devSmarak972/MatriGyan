import React from 'react'

const VideoContainer = () => {
  return (
    <div class="video-cont-single" id="vcont">
      <div class="video-box">
        <video class="video-frame" id="vd1" autoplay playsinline></video>
        <div class="nametag" id="myname">
          yourname
        </div>
        <div class="mute-icon" id="mymuteicon">
          <i class="fas fa-microphone-slash"></i>
        </div>
        <div class="video-off" id="myvideooff">
          Video Off
        </div>
      </div>
    </div>
  );
}

export default VideoContainer