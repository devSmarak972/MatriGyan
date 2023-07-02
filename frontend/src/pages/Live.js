import React, { useState, useEffect, useRef } from "react";
// import useWebSocket from "react-use-websocket"

const Live = () => {
  const [playing, setPlaying] = useState(false);
  // const [ws, setWs] = useState(null);
  const ws = useRef(null);
  const stream = useRef(null);
  function setStream(newStream) {
    stream.current = newStream;
  }
  // controls the current stream value
  // const [stream, setStream] = useState("");
  const [userList, setUserList] = useState([]);
  console.log("Streanm: ", stream.current);

  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [startCam, setStartCam] = useState(false);
  // const [username, setUsername] = useState();
  // const [mapPeers, setMapPeers] = useState({});
  const mapPeers = useRef({});

  const [usernameInput, setUsernameInput] = useState("");

  const [messageList, setMessageList] = useState([]);
  // const webcamVideo = useRef([]);
  // const videoObjects = useRef([]);
  const videoObjects = useRef({});
  const username = useRef("");
  function setUsername(value) {
    username.current = value;
  }
  function setMapPeers(value) {
    mapPeers.current = value;
  }
  // const vlis
  const [videoList, setVideoList] = useState([
    // <video ref={videoObjects[0]} autoPlay playsInline></video>,
  ]);
  const callbacks = useRef([]);
  // controls the video DOM element

  var loc = window.location;
  var websocket;
  var wsStart = "ws://";
  if (loc.protocol == "https") {
    wsStart = "wss://";
  }
  var endpoint = wsStart + "127.0.0.1:8000/live";
  function sendSignal(action, message) {
    console.log(username.current);
    var jsonstr = JSON.stringify({
      peer: username.current,
      action: action,
      message: message,
    });
    ws.current.send(jsonstr);
  }
  useEffect(() => {
    ws.current = new WebSocket(endpoint);
    console.log("endpoint: ", endpoint);
    if (ws.current !== null) {
      console.log(usernameInput, "inhandlejoin");
      ws.current.onopen = (event) => {
        // ws.send(JSON.stringify(apiCall));
        console.log("Connection opened!");
      };

      ws.current.onmessage = webSocketOnMessage;
      ws.current.onclose = (event) => {
        console.log("Connection closed");
      };
      ws.current.onerror = (e) => {
        console.log("Error occured: ", e);
      };
    }
    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);
  useEffect(() => {
    console.log(videoObjects.current);
    if (Object.keys(videoObjects.current).length !== 0) {
      // console.log(
      //   username.current,
      //   videoList,
      //   videoObjects.current,
      //   stream[username.current]
      // );
      const start = async () => {
        await startStream();
      };
      console.log(videoObjects.current[username.current], startCam);
      if (videoObjects.current[username.current] && !startCam) {
        console.log("in it");
        start(); // run it, run it
        setStartCam(true);
      }

      // Object.entries(mapPeers.current).forEach(([key, value]) => {
      //   console.log(key, "setting ontrack");
      //   setOnTrack(key, value[0], videoObjects.current[key]);
      //   // addLocalTracks(peer, peerUsername);
      // });
      while (callbacks.current.length != 0) {
        var calldict = callbacks.current.shift();
        calldict["fn"](...calldict["params"]);
        console.log("called :" + calldict["params"]);
      }
      console.log(stream.current);
      //  sendSignal("new-peer", {
      //   local_screen_sharing: false,
      // });
    }
  }, [videoList]);
  useEffect(() => {
    console.log(stream.current, "stream.current changed");
  }, [stream.current]);

  useEffect(() => {
    console.log(mapPeers.current, "map peers has changed!!");
  }, [mapPeers.current]);

  // useEffect(() => {
  // const start = async () => {
  //   await startStream();
  // };
  // if (startCam) start(); // run it, run it

  //   return () => {
  //     // this now gets called when the component unmounts
  //   };
  // }, [startCam]);

  // useEffect(() => {
  // if (ws !== null) {
  //   ws.onopen = (event) => {
  //     // ws.send(JSON.stringify(apiCall));
  //     console.log("Connection opened!");
  //     sendSignal("new-peer", {});
  //   };

  //   ws.onmessage = webSocketOnMessage;
  //   ws.onclose = (event) => {
  //     console.log("Connection closed");
  //   };
  //   ws.onerror = (e) => {
  //     console.log("Error occured: ", e);
  //   };

  //     //clean up function
  //     return () => {
  //       if (ws.readyState === 1) {
  //         // <-- This is important
  //         ws.close();
  //       }
  //     };
  //   }
  // }, [ws]);
  function webSocketOnMessage(event) {
    try {
      var parsedData = JSON.parse(event.data);
      var message = parsedData.message;
      var peerUsername = parsedData.peer;
      var action = parsedData.action;
      console.log(
        "message: ",
        message,
        usernameInput,
        peerUsername,
        action,
        stream.current
      );
      if (username.current === peerUsername) {
        return;
      }
      var receiver_channel_name = parsedData["message"].receiver_channel_name;
      console.log(receiver_channel_name);
      if (action === "new-peer") {
        console.log(stream.current);
        createOfferer(peerUsername, receiver_channel_name);
        return;
      }
      if (action === "new-offer") {
        var offer = parsedData["message"]["sdp"];
        console.log(mapPeers.current, "in offerer");
        createAnswerer(offer, peerUsername, receiver_channel_name);

        return;
      }
      if (action === "new-answer") {
        var answer = parsedData["message"]["sdp"];
        console.log(mapPeers.current, answer, "received new answer");
        var peer = mapPeers.current[peerUsername][0];
        peer.setRemoteDescription(answer);
        mapPeers.current[peerUsername][0] = peer;
        // createAnswerer(offer,peerUsername,receiver_channel_name);
        return;
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }
  function createAnswerer(offer, peerUsername, receiver_channel_name) {
    console.log("peer", peerUsername);
    var peer = new RTCPeerConnection(null);
    addLocalTracks(peer, peerUsername);

    var remoteVideo = createVideo(peerUsername);
    callbacks.current.push({ fn: setOnTrack, params: [peerUsername] });
    // setOnTrack(peer, remoteVideo);
    peer.ondatachannel = (e) => {
      peer.dc = e.channel;
      peer.dc.onopen = () => {
        console.log("conection opend!");
      };
      peer.dc.onmessage = (event) => dcOnMessage(event);
      var tmppeer = { ...mapPeers.current };
      tmppeer[peerUsername] = [peer, peer.dc];
      setMapPeers(tmppeer);
      // setMapPeers.current((state) => {
      //   var tmpstate = { ...state };

      //   tmpstate[peerUsername] = [peer, peer.dc];
      //   return tmpstate;
      // });
    };
    peer.oniceconnectionstatechange = () => {
      var iceConnectionState = peer.iceConnectionState;
      if (
        iceConnectionState === "failed" ||
        iceConnectionState === "disconnected" ||
        iceConnectionState === "closed"
      ) {
        console.log("removing iceconnetion");
        var tmpstate = { ...mapPeers.current };
        delete tmpstate[peerUsername];
        // return tmpstate;
        setMapPeers(tmpstate);
        if (iceConnectionState !== "closed") {
          peer.close();
        }
        removeVideo(peerUsername);
      }
    };
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(
          "new ice candidate: ",
          JSON.stringify(peer.localDescription)
        );
        return;
      }
      console.log(mapPeers.current);
    };
    var tmppeer = { ...mapPeers.current };
    tmppeer[peerUsername] = [peer, peer.dc];
    setMapPeers(tmppeer);
    console.log(offer, typeof offer, "in answeerer");
    callbacks.current.push({
      fn: function (peerUsername, receiver_channel_name, offer) {
        console.log(mapPeers.current);
        mapPeers.current[peerUsername][0]
          .setRemoteDescription(offer)
          .then(() => {
            console.log(
              "Remote descriptio set successfully for %s.",
              peerUsername
            );
            return mapPeers.current[peerUsername][0].createAnswer();
          })
          .then((a) => {
            console.log("Answer created!");

            mapPeers.current[peerUsername][0].setLocalDescription(a);
            console.log(
              mapPeers.current[peerUsername][0].localDescription,
              a,
              "after answer creation"
            );
            sendSignal("new-answer", {
              sdp: a,
              receiver_channel_name: receiver_channel_name,
            });
          });
      },
      params: [peerUsername, receiver_channel_name, offer],
    });
  }
  function createOfferer(peerUsername, receiver_channel_name) {
    console.log("peer in offerere", peerUsername);
    var peer = new RTCPeerConnection(null);
    addLocalTracks(peer, peerUsername);
    var dc = peer.createDataChannel("channel");
    console.log(dc, "dc");
    dc.onopen = () => {
      console.log("conection opend!");
    };
    dc.onmessage = (event) => dcOnMessage(event);
    var remoteVideo = createVideo(peerUsername);
    console.log(remoteVideo, "remote video in offerer");
    callbacks.current.push({ fn: setOnTrack, params: [peerUsername] });

    // setOnTrack(peer, remoteVideo);
    // setMapPeers((state) => {
    //   var tmpstate = { ...state };
    //   tmpstate[peerUsername] = [peer, dc];
    //   return tmpstate;
    // });

    peer.oniceconnectionstatechange = () => {
      var iceConnectionState = peer.iceConnectionState;
      if (
        iceConnectionState === "failed" ||
        iceConnectionState === "disconnected" ||
        iceConnectionState === "closed"
      ) {
        setMapPeers((state) => {
          var tmpstate = { ...state };
          delete tmpstate[peerUsername];
          return tmpstate;
        });
        if (iceConnectionState !== "closed") {
          peer.close();
        }
        removeVideo(peerUsername);
      }
    };
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(
          "new ice candidate: ",
          JSON.stringify(peer.localDescription)
        );
        return;
      }
      console.log("new offer");
      sendSignal("new-offer", {
        sdp: peer.localDescription,
        receiver_channel_name: receiver_channel_name,
      });
    };
    var tmppeer = { ...mapPeers.current };
    tmppeer[peerUsername] = [peer, dc];
    console.log(tmppeer, "setting map peers in offerer");
    setMapPeers(tmppeer);
    callbacks.current.push({
      fn: function (peerUsername) {
        console.log(
          mapPeers.current,
          peerUsername,
          mapPeers.current[peerUsername]
        );

        mapPeers.current[peerUsername][0]
          .createOffer()
          .then((o) => mapPeers.current[peerUsername][0].setLocalDescription(o))
          .then(() => {
            console.log("local description set successsfully");
          });
      },
      params: [peerUsername],
    });
  }
  function removeVideo(peerUsername) {
    var video = videoObjects.current[peerUsername];
    if (video) {
      setVideoList((state) => {
        var tmpstate = [...state];

        const index = tmpstate.indexOf(video);
        if (index > -1) {
          // only splice array when item is found
          tmpstate.splice(video);
        }
        // tmpstate.remove(video);
        return tmpstate;
      });
    }
  }

  function createVideo(peerUsername) {
    //create a video element add video

    setVideoList((state) => [
      ...state,
      <video
        id={peerUsername + "-video"}
        ref={(element) => (videoObjects.current[peerUsername] = element)}
        autoPlay
        playsInline
      ></video>,
    ]);
    return videoObjects.current[peerUsername];
  }
  function dcOnMessage(event) {
    var message = event.data;
    setMessageList((state) => [...state, <li>{message}</li>]);
  }
  function addLocalTracks(peer, peerUsername) {
    console.log(stream.current, peer, peerUsername);
    // tmpstream[username.current] = new MediaStream();

    stream.current.getTracks().forEach((track) => {
      console.log(track, "my tracks");
      peer.addTrack(track, stream.current);
    });
  }
  // setStream(tmpstream);

  function setOnTrack(peerUsername) {
    // var remoteStream = { ...stream.current };
    var remoteVideo = videoObjects.current[peerUsername];
    var newStream = new MediaStream();
    console.log(stream.current, remoteVideo, "in set on track", peerUsername);
    remoteVideo.srcObject = newStream;
    console.log("ontrack");
    mapPeers.current[peerUsername][0].ontrack = async (event) => {
      console.log(stream.current, event.track, event.streams, "track");
      newStream.addTrack(event.track, newStream);

      // setStream(stream.current);
    };

    // console.log(stream.current.getTracks(),"tracks")
  }
  // controls if media input is on or off

  // get the user's media stream.current
  const startStream = async () => {
    let newStream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((newStream) => {
        // setVideoList([
        //   ...videoList,
        //   <video
        //     id={username.current + "-video"}
        //     ref={(element) =>
        //       (videoObjects.current[username.current] = element)
        //     }
        //     autoPlay
        //     playsInline
        //   ></video>,
        // ]);
        // newStream.getTracks().forEach((track) => stream.current.addTrack(track));

        videoObjects.current[username.current].srcObject = newStream;
        console.log(newStream, "turning on webcam");
        setStream(newStream);
        sendSignal("new-peer", {
          local_screen_sharing: false,
        });
      });

    setPlaying(true);
  };

  // stops the user's media stream.current
  const stopStream = () => {
    stream.current.getTracks().forEach((track) => track.stop());
    // setStartCam(false);
    setPlaying(false);
  };

  // enable/disable audio tracks in the media stream.current
  const toggleAudio = () => {
    stream.current.getAudioTracks()[0].enabled = !audio;
    setAudio(!audio);
    console.log(audio, "audio");
  };

  // enable/disable video tracks in the media stream.current
  const toggleVideo = () => {
    stream.current.getVideoTracks()[0].enabled = !video;
    setVideo(!video);
  };
  function handleJoin(ev) {
    setUsername(usernameInput);
    createVideo(username.current);

    // setStartCam(true);
    //  await startStream();
  }

  return (
    <div>
      <h3>live {username.current ? username.current : "not set"}</h3>
      <div>
        <input
          id="username"
          type="text"
          value={usernameInput}
          onChange={(el) => setUsernameInput(el.target.value)}
        />
        <button id="btn-join" onClick={handleJoin} className="btn btn-primary ">
          Join room
        </button>
        {/* </input> */}
      </div>
      <div className="main-grid-container">
        <div className="container">
          {/* <video ref={webcamVideo} autoPlay playsInline></video> */}
          {videoList}
          <button onClick={playing ? stopStream : startStream}>
            Start webcam
          </button>

          <button onClick={toggleAudio}>Toggle Sound</button>
          <button onClick={toggleVideo}>Toggle Video</button>
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
