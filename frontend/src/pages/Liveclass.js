import React, { useState } from "react";
import "./Liveclass/liveclass.css";
import Copycode from "../components/Liveclass/Copycode";
import Whiteboard from "../components/Liveclass/Whiteboard";
import VideoContainer from "../components/Liveclass/VideoContainer";
import Chatsection from "../components/Liveclass/Chatsection";
import Attendees from "../components/Liveclass/Attendees";
const Liveclass = () => {
  const [Video, setVideo] = useState(true);
  const [Canvas, setCanvas] = useState(false);
  const [activeTab, setActiveTab] = useState("chatTab");
  const [sidebar, setSidebar] = useState(true);

  return (
    <div class="liveclass">
      <div class="container-room">
        <div class="left-cont">
          <VideoContainer></VideoContainer>
          {Canvas ? <Whiteboard></Whiteboard> : ""}

          <div class="footer">
            <div class="utils">
              <div class="audio">
                <i class="fas fa-microphone"></i>
              </div>
              <div class="novideo">
                <i class="fas fa-video"></i>
              </div>
              <div class="screenshare tooltip-class">
                <i class="fas fa-desktop"></i>
                <span class="tooltiptext">Share Screen</span>
              </div>
              <div class="board-icon tooltip-class">
                <i class="fas fa-chalkboard"></i>
                <span class="tooltiptext">Whiteboard</span>
              </div>
              <div class="cutcall tooltip-class">
                <i class="fas fa-phone-slash"></i>
                <span class="tooltiptext">Leave Call</span>
              </div>
            </div>
            <Copycode></Copycode>
          </div>
        </div>

        <div class="right-cont">
          <div class="head-title">
            <div
              class={
                activeTab === "chatTab"
                  ? "chats border-b-4 border-indigo-500"
                  : "chats hover:border-b-4 border-gray"
              }
              onClick={(e) => setActiveTab("chatTab")}
            >
              <i class="fas fa-comment-alt mr-1"></i>Chats
            </div>
            <div
              class={
                activeTab === "attendeeTab"
                  ? "attendies border-b-4 border-indigo-500"
                  : "attendies hover:border-b-4 border-gray"
              }
              onClick={(e) => setActiveTab("attendeeTab")}
            >
              <i class="fas fa-users mr-1"></i>Attendies
            </div>
          </div>

          {activeTab === "chatTab" ? (
            <Chatsection></Chatsection>
          ) : (
            <Attendees></Attendees>
          )}
        </div>
      </div>
    </div>
  );
};

export default Liveclass;
