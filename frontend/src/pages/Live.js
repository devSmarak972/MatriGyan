import React, { useState, useEffect } from "react";
// import useWebSocket from "react-use-websocket"
function webSocketOnMessage(event) {
  try {
    var parsedData = JSON.parse(event.data);
    var message = parsedData.message;
    console.log("message: ", message);
  } catch (err) {
    console.log("error: ", err);
  }
}
const Live = () => {
  var loc = window.location;
  var websocket;
  var wsStart = "ws://";
  if (loc.protocol == "https") {
    wsStart = "wss://";
  }
  var endpoint = wsStart+"127.0.0.1:8000/live"
  console.log("endpoint: ", endpoint);
  useEffect(() => {
    const ws = new WebSocket(endpoint);
    ws.onopen = (event) => {
      // ws.send(JSON.stringify(apiCall));
      console.log("Connection opened!");
      var jsonstr=JSON.stringify({
        "message":"This is a message from client"
      })
      ws.send(jsonstr);
    };
    ws.onmessage = webSocketOnMessage;
    ws.onclose = (event) => {
      console.log("Connection closed");
    };
    ws.onerror = (e) => {
      console.log("Error occured: ", e);
    };
    //clean up function
    return () => 
    {
     if (ws.readyState === 1) { // <-- This is important
                ws.close();
            }
    }
      
  }, []);
  return (
    <div>
      <h3>live</h3>
      <div>
        <input id="username" type="text" />
        <button id="btn-join" className="btn btn-primary ">
          Join room
        </button>
        {/* </input> */}
      </div>
      <div className="main-grid-container">
        <div id="video-container">
          <div>
            {" "}
            <video id="local-video" autoPlay playsInline></video>
          </div>
          <button className="btn btn-primary " id="btn-toggle-audio">
            Mute audio
          </button>
          <button className="btn btn-primary " id="btn-toggle-video">
            Video off
          </button>
        </div>
        <div id="chat">
          <h3>chat</h3>
          <div id="messages">
            <ul id="msglist"></ul>
          </div>
          <div>
            <button className="btn btn-primary " id="btn-send">
              Send message
            </button>
          </div>
          <button className="btn btn-primary " id="btn-screen">
            Share screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Live;
