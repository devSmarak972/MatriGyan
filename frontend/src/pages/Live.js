import React, { useState, useEffect, useRef } from "react";
// import useWebSocket from "react-use-websocket"

const Live = () => {
  const [playing, setPlaying] = useState(false);
  const [triggerCallback, settriggerCallback] = useState(false);
  // const [ws, setWs] = useState(null);
  const ws = useRef(null);
  // const triggerCallback = useRef(false);

  const stream = useRef(null);
  const screenStream = useRef(null);
  function setStream(newStream) {
    stream.current = newStream;
  }
  function setScreenStream(newStream) {
    screenStream.current = newStream;
  }
  // controls the current stream value
  // const [stream, setStream] = useState("");
  const [userList, setUserList] = useState([]);
  console.log("Streanm: ", stream.current);

  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [startCam, setStartCam] = useState(false);
  const [startScreenCam, setStartScreenCam] = useState(false);
  // const [username, setUsername] = useState();
  // const [mapPeers, setMapPeers] = useState({});
  const mapPeers = useRef({});
  const mapScreenPeers = useRef({});
  const msginputfield = useRef(null);

  const [usernameInput, setUsernameInput] = useState("");
  const [messageInput, setmessageInput] = useState("");
  const [chatstate, setChatState] = useState([]);
  // const [screenShared, setScreenShared] = useState(false);
  const screenShared = useRef(false);
  function setScreenShared(val) {
    screenShared.current = val;
  }
  // const [messageList, setMessageList] = useState([]);
  // const webcamVideo = useRef([]);
  // const videoObjects = useRef([]);
  const chat = useRef([]);
  const videoObjects = useRef({});
  const username = useRef("");
  function setUsername(value) {
    username.current = value;
  }
  function setChat(value) {
    chat.current = value;
  }
  function setMapPeers(value) {
    mapPeers.current = value;
  }
  function setMapScreenPeers(value) {
    mapScreenPeers.current = value;
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
      const startScreen = async () => {
        await startScreenStream();
      };

      console.log(videoObjects.current[username.current], startCam);
      if (videoObjects.current[username.current] && !startCam) {
        console.log("in it");
        start(); // run it, run it
        setStartCam(true);
      }
      if (
        videoObjects.current[username.current + "-screen"] &&
        !startScreenCam
      ) {
        console.log("in screen on");
        startScreen(); // run it, run it
        setStartScreenCam(true);
      }
      console.log("callbacks", callbacks.current);
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
    console.log(callbacks.current, "all caalbascks");
    while (callbacks.current.length != 0) {
      var calldict = callbacks.current.shift();
      calldict["fn"](...calldict["params"]);
      console.log("called :" + calldict["params"]);
    }
  }, [triggerCallback]);
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
  function getDataChannels() {
    var dataChannels = [];

    Object.entries(mapPeers.current).forEach(([peerUsername, el]) => {
      console.log("mapPeers[", peerUsername, "]: ", el);
      var dataChannel = el[1];
      console.log("dataChannel: ", dataChannel);
      dataChannels.push(dataChannel);
    });

    return dataChannels;
  }

  // get all stored RTCPeerConnections
  // peerStorageObj is an object (either mapPeers or mapScreenPeers)
  function getPeers() {
    var peers = [];

    Object.entries(mapPeers.current).forEach(([peerUsername, el]) => {
      console.log("mapPeers[", peerUsername, "]: ", el);
      var peer = el[0];
      console.log("peer: ", peer);
      peers.push(peer);
    });

    return peers;
  }

  function btnSendMsgOnClick() {
    var message = messageInput;

    setChatState([
      ...chat.current,
      { sender: username.current, message: message },
    ]);
    setChat([...chat.current, { sender: username.current, message: message }]);

    var dataChannels = getDataChannels();

    console.log("Sending: ", message);

    // send to all data channels
    for (var index in dataChannels) {
      dataChannels[index].send(
        JSON.stringify({ sender: username.current, message: message })
      );
    }
    msginputfield.current.value = "";
    setmessageInput("");
  }

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
      // boolean value specified by other peer
      // indicates whether the other peer is sharing screen
      var remoteScreenSharing = parsedData["message"]["local_screen_sharing"];
      console.log("remoteScreenSharing: ", remoteScreenSharing);

      var receiver_channel_name = parsedData["message"].receiver_channel_name;
      console.log(receiver_channel_name);
      if (action === "new-peer") {
        // console.log(stream.current);
        createOfferer(
          peerUsername,
          false,
          remoteScreenSharing,
          receiver_channel_name
        );
        if (screenShared.current && !remoteScreenSharing) {
          // if local screen is being shared
          // and remote peer is not sharing screen
          // send offer from screen sharing peer
          console.log("Creating screen sharing offer.");
          createOfferer(
            peerUsername,
            true,
            remoteScreenSharing,
            receiver_channel_name
          );
        }

        return;
      }
      // remote_screen_sharing from the remote peer
      // will be local screen sharing info for this peer
      var remoteScreenSharing = parsedData["message"]["local_screen_sharing"];
      console.log("screen shaed on receicer offer?", screenShared.current);
      var localScreenSharing = screenShared.current;
      if (action === "new-offer") {
        console.log("Got new offer from ", peerUsername);

        // create new RTCPeerConnection
        // set offer as remote description
        var offer = parsedData["message"]["sdp"];
        console.log("Offer: ", offer);
        var peer = createAnswerer(
          offer,
          peerUsername,
          localScreenSharing,
          remoteScreenSharing,
          receiver_channel_name
        );

        return;
      }
      if (action === "new-answer") {
        // in case of answer to previous offer
        // get the corresponding RTCPeerConnection
        var peer = null;

        if (remoteScreenSharing) {
          // if answerer is screen sharer
          peer = mapPeers.current[peerUsername + "-screen"][0];
        } else if (localScreenSharing) {
          // if offerer was screen sharer
          peer = mapScreenPeers.current[peerUsername][0];
        } else {
          // if both are non-screen sharers
          peer = mapPeers.current[peerUsername][0];
        }

        // get the answer
        var answer = parsedData["message"]["sdp"];

        console.log("mapPeers:", mapPeers.current);

        console.log("peer: ", peer);
        console.log("answer: ", answer);

        // set remote description of the RTCPeerConnection
        peer.setRemoteDescription(answer);

        return;
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }
  function createAnswerer(
    offer,
    peerUsername,
    localScreenSharing,
    remoteScreenSharing,
    receiver_channel_name
  ) {
    console.log("peer in answer", peerUsername);
    var peer = new RTCPeerConnection(null);
    addLocalTracks(peer, localScreenSharing);
    if (!localScreenSharing && !remoteScreenSharing) {
      // if none are sharing screens (normal operation)

      // set remote video
      var remoteVideo = createVideo(peerUsername);
      callbacks.current.push({ fn: setOnTrack, params: [peer, peerUsername] });
      // setOnTrack(peer, remoteVideo);
      peer.ondatachannel = (e) => {
        peer.dc = e.channel;
        peer.dc.onopen = () => {
          console.log("conection opend!");
        };
        // store the RTCPeerConnection
        // and the corresponding RTCDataChannel
        // after the RTCDataChannel is ready
        // otherwise, peer.dc may be undefined
        // as peer.ondatachannel would not be called yet

        peer.dc.onmessage = (event) => dcOnMessage(event);
        var tmppeer = { ...mapPeers.current };
        tmppeer[peerUsername] = [peer, peer.dc];
        setMapPeers(tmppeer);
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
            "New Ice Candidate! Reprinting SDP" +
              JSON.stringify(peer.localDescription)
          );
          return;
        }

        // event.candidate == null indicates that gathering is complete

        console.log(
          "Gathering finished! Sending answer SDP to ",
          peerUsername,
          "."
        );
        console.log("receiverChannelName: ", receiver_channel_name);

        // send answer to offering peer
        // after ice candidate gathering is complete
        // answer needs to send two types of screen sharing data
        // local and remote so that offerer can understand
        // to which RTCPeerConnection this answer belongs
        sendSignal("new-answer", {
          sdp: peer.localDescription,
          receiver_channel_name: receiver_channel_name,
          local_screen_sharing: localScreenSharing,
          remote_screen_sharing: remoteScreenSharing,
        });
      };
      var tmppeer = { ...mapPeers.current };
      tmppeer[peerUsername] = [peer, peer.dc];
      setMapPeers(tmppeer);
    } else if (localScreenSharing && !remoteScreenSharing) {
      // answerer itself is sharing screen
      console.log("answerer is sharing");
      // it will have an RTCDataChannel
      // callbacks.current.push({
      //   fn: setOnTrack,
      //   params: [peer, username.current + "-screen"],
      // });
      console.log(callbacks.current, "callbacks ref");
      peer.ondatachannel = (e) => {
        peer.dc = e.channel;
        peer.dc.onmessage = (evt) => {
          console.log("New message from %s: ", peerUsername, evt.data);
        };
        peer.dc.onopen = () => {
          console.log("Connection opened.");
        };

        // this peer is a screen sharer
        // so its connections will be stored in mapScreenPeers
        // store the RTCPeerConnection
        // and the corresponding RTCDataChannel
        // after the RTCDataChannel is ready
        // otherwise, peer.dc may be undefined
        // as peer.ondatachannel would not be called yet
        mapScreenPeers.current[peerUsername] = [peer, peer.dc];

        peer.oniceconnectionstatechange = () => {
          var iceConnectionState = peer.iceConnectionState;
          if (
            iceConnectionState === "failed" ||
            iceConnectionState === "disconnected" ||
            iceConnectionState === "closed"
          ) {
            delete mapScreenPeers.current[peerUsername];
            if (iceConnectionState != "closed") {
              peer.close();
            }
          }
        };
      };
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(
            "New Ice Candidate! Reprinting SDP" +
              JSON.stringify(peer.localDescription)
          );
          return;
        }

        // event.candidate == null indicates that gathering is complete

        console.log(
          "Gathering finished! Sending answer SDP to ",
          peerUsername,
          "."
        );
        console.log("receiverChannelName: ", receiver_channel_name);

        // send answer to offering peer
        // after ice candidate gathering is complete
        // answer needs to send two types of screen sharing data
        // local and remote so that offerer can understand
        // to which RTCPeerConnection this answer belongs
        sendSignal("new-answer", {
          sdp: peer.localDescription,
          receiver_channel_name: receiver_channel_name,
          local_screen_sharing: localScreenSharing,
          remote_screen_sharing: remoteScreenSharing,
        });
      };
      var tmppeer = { ...mapScreenPeers.current };
      tmppeer[peerUsername] = [peer, peer.dc];
      setMapScreenPeers(tmppeer);
    } else {
      // offerer is sharing screen
      console.log("offerer is remoteScreenSharing");
      // set remote video
      var remoteVideo = createVideo(peerUsername + "-screen");
      // and add tracks to remote video
      callbacks.current.push({
        fn: setOnTrack,
        params: [peer, peerUsername + "-screen"],
      });

      // it will have an RTCDataChannel
      peer.ondatachannel = (e) => {
        peer.dc = e.channel;
        peer.dc.onmessage = (evt) => {
          console.log("New message from %s's screen: ", peerUsername, evt.data);
        };
        peer.dc.onopen = () => {
          console.log("Connection opened.");
        };

        // store the RTCPeerConnection
        // and the corresponding RTCDataChannel
        // after the RTCDataChannel is ready
        // otherwise, peer.dc may be undefined
        // as peer.ondatachannel would not be called yet
        mapPeers.current[peerUsername + "-screen"] = [peer, peer.dc];
      };
      peer.oniceconnectionstatechange = () => {
        var iceConnectionState = peer.iceConnectionState;
        if (
          iceConnectionState === "failed" ||
          iceConnectionState === "disconnected" ||
          iceConnectionState === "closed"
        ) {
          delete mapPeers.current[peerUsername + "-screen"];
          if (iceConnectionState != "closed") {
            peer.close();
          }
          removeVideo(peerUsername + "-screen");
        }
      };
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(
            "New Ice Candidate! Reprinting SDP" +
              JSON.stringify(peer.localDescription)
          );
          return;
        }

        // event.candidate == null indicates that gathering is complete

        console.log(
          "Gathering finished! Sending answer SDP to ",
          peerUsername,
          "."
        );
        console.log("receiverChannelName: ", receiver_channel_name);

        // send answer to offering peer
        // after ice candidate gathering is complete
        // answer needs to send two types of screen sharing data
        // local and remote so that offerer can understand
        // to which RTCPeerConnection this answer belongs
        sendSignal("new-answer", {
          sdp: peer.localDescription,
          receiver_channel_name: receiver_channel_name,
          local_screen_sharing: localScreenSharing,
          remote_screen_sharing: remoteScreenSharing,
        });
      };
      var tmppeer = { ...mapScreenPeers.current };
      tmppeer[peerUsername + "-screen"] = [peer, peer.dc];
      setMapPeers(tmppeer);
    }

    console.log(
      "Gathering finished! Sending answer SDP to ",
      peerUsername,
      "."
    );
    console.log("receiverChannelName: ", receiver_channel_name);

    // send answer to offering peer
    // after ice candidate gathering is complete
    // answer needs to send two types of screen sharing data
    // local and remote so that offerer can understand
    // to which RTCPeerConnection this answer belongs

    console.log(offer, typeof offer, "in answeerer");
    callbacks.current.push({
      fn: function (peer, offer) {
        peer
          .setRemoteDescription(offer)
          .then(() => {
            console.log("Set offer from %s.", peerUsername);
            return peer.createAnswer();
          })
          .then((a) => {
            console.log("Setting local answer for %s.", peerUsername);
            return peer.setLocalDescription(a);
          })
          .then(() => {
            console.log("Answer created for %s.", peerUsername);
            console.log("localDescription: ", peer.localDescription);
            console.log("remoteDescription: ", peer.remoteDescription);
          })
          .catch((error) => {
            console.log("Error creating answer for %s.", peerUsername);
            console.log(error);
          });

        return peer;
      },
      params: [peer, offer],
    });
    console.log("callbacks", callbacks.current);
    settriggerCallback(triggerCallback + 1);
  }

  function createOfferer(
    peerUsername,
    localScreenSharing,
    remoteScreenSharing,
    receiver_channel_name
  ) {
    console.log("peer in offerere", peerUsername);
    var peer = new RTCPeerConnection(null);
    addLocalTracks(peer, localScreenSharing);
    var dc = peer.createDataChannel("channel");
    console.log(dc, "dc");
    dc.onopen = () => {
      console.log("conection opend!");
    };

    // dc.onmessage = (event) => dcOnMessage(event);
    // var remoteVideo = createVideo(peerUsername);
    // console.log(remoteVideo, "remote video in offerer");
    if (!localScreenSharing && !remoteScreenSharing) {
      // none of the peers are sharing screen (normal operation)

      dc.onmessage = dcOnMessage;

      var remoteVideo = createVideo(peerUsername);
      callbacks.current.push({ fn: setOnTrack, params: [peer, peerUsername] });
      peer.oniceconnectionstatechange = () => {
        var iceConnectionState = peer.iceConnectionState;
        if (
          iceConnectionState === "failed" ||
          iceConnectionState === "disconnected" ||
          iceConnectionState === "closed"
        ) {
          var tmpstate = { ...mapPeers.current };
          delete tmpstate[peerUsername];
          setMapPeers(tmpstate);
          if (iceConnectionState !== "closed") {
            peer.close();
          }
          removeVideo(peerUsername);
        }
      };
    } else if (!localScreenSharing && remoteScreenSharing) {
      console.log("answerer is screen sharing");

      dc.onmessage = (e) => {
        console.log("New message from %s's screen: ", peerUsername, e.data);
      };

      remoteVideo = createVideo(peerUsername + "-screen");
      callbacks.current.push({
        fn: setOnTrack,
        params: [peer, peerUsername + "-screen"],
      });
      // console.log("Remote video source: ", remoteVideo.srcObject);

      // if offer is not for screen sharing peer
      mapPeers.current[peerUsername + "-screen"] = [peer, dc];

      peer.oniceconnectionstatechange = () => {
        var iceConnectionState = peer.iceConnectionState;
        if (
          iceConnectionState === "failed" ||
          iceConnectionState === "disconnected" ||
          iceConnectionState === "closed"
        ) {
          var tmpstate = { ...mapPeers.current };
          delete tmpstate[peerUsername + "-screen"];
          setMapPeers(tmpstate);
          if (iceConnectionState != "closed") {
            peer.close();
          }
          removeVideo(remoteVideo);
        }
      };
    } else {
      // offerer itself is sharing screen
      console.log("offerer is sharing");
      dc.onmessage = (e) => {
        console.log("New message from %s: ", peerUsername, e.data);
      };

      mapScreenPeers.current[peerUsername] = [peer, dc];

      peer.oniceconnectionstatechange = () => {
        var iceConnectionState = peer.iceConnectionState;
        if (
          iceConnectionState === "failed" ||
          iceConnectionState === "disconnected" ||
          iceConnectionState === "closed"
        ) {
          var tmpstate = { ...mapScreenPeers.current };
          delete tmpstate[peerUsername];
          setMapScreenPeers(tmpstate);
          if (iceConnectionState != "closed") {
            peer.close();
          }
        }
      };
    }

    // setOnTrack(peer, remoteVideo);
    // setMapPeers((state) => {
    //   var tmpstate = { ...state };
    //   tmpstate[peerUsername] = [peer, dc];
    //   return tmpstate;
    // });

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(
          "New Ice Candidate! Reprinting SDP" +
            JSON.stringify(peer.localDescription)
        );
        return;
      }

      // event.candidate == null indicates that gathering is complete

      console.log(
        "Gathering finished! Sending offer SDP to ",
        peerUsername,
        "."
      );
      console.log("receiverChannelName: ", receiver_channel_name);

      // send offer to new peer
      // after ice candidate gathering is complete
      sendSignal("new-offer", {
        sdp: peer.localDescription,
        receiver_channel_name: receiver_channel_name,
        local_screen_sharing: localScreenSharing,
        remote_screen_sharing: remoteScreenSharing,
      });
    };
    if (!localScreenSharing && !remoteScreenSharing) {
      var tmppeer = { ...mapPeers.current };
      tmppeer[peerUsername] = [peer, dc];
      console.log(tmppeer, "setting map peers in offerer");
      setMapPeers(tmppeer);
    } else if (!localScreenSharing && remoteScreenSharing) {
      var tmppeer = { ...mapPeers.current };
      tmppeer[peerUsername + "-stream"] = [peer, dc];
      console.log(tmppeer, "setting map peers in offerer");
      setMapPeers(tmppeer);
    } else {
      var tmppeer = { ...mapScreenPeers.current };
      tmppeer[peerUsername] = [peer, dc];
      console.log(tmppeer, "setting map peers in offerer");
      setMapScreenPeers(tmppeer);
    }
    callbacks.current.push({
      fn: function (peer) {
        peer
          .createOffer()
          .then((o) => peer.setLocalDescription(o))
          .then(function (event) {
            console.log("Local Description Set successfully.");
          });
        console.log(
          "mapPeers[",
          peerUsername,
          "]: ",
          mapPeers.current[peerUsername]
        );
      },
      params: [peer],
    });

    return peer;
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
  // function dcOnMessage(event) {
  //   var message = event.data;
  //   setMessageList((state) => [...state, ]);
  // }
  function addLocalTracks(peer, localScreenSharing) {
    // console.log(stream.current, peer, peerUsername);
    // tmpstream[username.current] = new MediaStream();
    if (!localScreenSharing) {
      stream.current.getTracks().forEach((track) => {
        console.log(track, "my tracks");
        peer.addTrack(track, stream.current);
      });
      return;
    }
    console.log("local sharing ", localScreenSharing);
    screenStream.current.getTracks().forEach((track) => {
      console.log("Adding localDisplayStream tracks.");
      peer.addTrack(track, screenStream.current);
    });
  }
  // setStream(tmpstream);

  function setOnTrack(peer, peerUsername) {
    // var remoteStream = { ...stream.current };
    var remoteVideo = videoObjects.current[peerUsername];
    console.log(videoObjects.current);
    var newStream = new MediaStream();
    console.log(stream.current, remoteVideo, "in set on track", peerUsername);
    remoteVideo.srcObject = newStream;
    console.log("ontrack");
    peer.ontrack = async (event) => {
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
  const startScreenStream = async () => {
    navigator.mediaDevices.getDisplayMedia(constraints).then((strm) => {
      var localDisplayStream = strm;

      var mediaTracks = strm.getTracks();
      for (var i = 0; i < mediaTracks.length; i++) {
        console.log(mediaTracks[i]);
      }

      videoObjects.current[username.current + "-screen"].srcObject = strm;
      console.log(strm, "sharing scren");
      setScreenStream(strm);
      sendSignal("new-peer", {
        local_screen_sharing: true,
      });
    });

    setScreenShared(true);
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
  function dcOnMessage(event) {
    var data = JSON.parse(event.data);
    console.log(data, "message recv");
    setChatState([
      ...chat.current,
      { sender: data.sender, message: data.message },
    ]);
    setChat([...chat.current, { sender: data.sender, message: data.message }]);
  }
  function getScreenPeers(event) {
    return;
  }
  const constraints = {
    audio: true,
    video: true,
  };
  function screenShare(event) {
    try {
      if (screenShared.current) {
        // toggle screenShared
        setScreenShared(false);
        screenStream.current.getTracks().forEach((track) => track.stop());

        // set to own video
        // if screen already shared
        // var localScreen = document.querySelector('#my-screen-video');
        // videoObjects.current[username.current+"-screen"]

        // get screen sharing video element
        // remove it
        removeVideo(username.current + "-screen");

        // close all screen share peer connections
        var screenPeers = getScreenPeers();
        for (var index in screenPeers) {
          screenPeers[index].close();
        }
        // empty the screen sharing peer storage object
        mapScreenPeers.current = {};
        setStartScreenCam(false);
        return;
      } else {
        // setScreenShared(true);
        createVideo(username.current + "-screen");
      }
    } catch (error) {
      console.log("Error accessing display media.", error);
    }
  }

  // .then(e => {
  //     btnRecordScreen.addEventListener('click', () => {
  //         if(recording){
  //             // toggle recording
  //             recording = !recording;

  //             btnRecordScreen.innerHTML = 'Record Screen';

  //             recorder.stopRecording(function() {
  //                 var blob = recorder.getBlob();
  //                 invokeSaveAsDialog(blob);
  //             });

  //             return;
  //         }

  //         // toggle recording
  //         recording = !recording;

  //         navigator.mediaDevices.getDisplayMedia(constraints)
  //             .then(stream => {
  //                 recorder = RecordRTC(stream, {
  //                     type: 'video',
  //                     MimeType: 'video/mp4'
  //                 });
  //                 recorder.startRecording();

  //                 var mediaTracks = stream.getTracks();
  //                 for(i=0; i < mediaTracks.length; i++){
  //                     console.log(mediaTracks[i]);
  //                 }

  //             })
  //             .catch(error => {
  //                 console.log('Error accessing display media.', error);
  //             });

  //         btnRecordScreen.innerHTML = 'Stop Recording';
  //     });
  // })
  // .catch(error => {
  //     console.error('Error accessing media devices.', error);
  // });

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
            <ul id="msglist">
              {chat.current.map((el) => {
                if (username.current === el.sender)
                  return (
                    <div className="text-left">
                      <p>{el.sender}</p>
                      <p>{el.message}</p>
                    </div>
                  );
                else
                  return (
                    <div className="text-right">
                      <p>{el.sender}</p>
                      <p>{el.message}</p>
                    </div>
                  );
              })}
            </ul>
          </div>
          <div>
            <input
              type="text"
              ref={msginputfield}
              onInput={(e) => setmessageInput(e.target.value)}
            ></input>
            <button
              className="btn btn-primary "
              onClick={btnSendMsgOnClick}
              id="btn-send"
            >
              Send message
            </button>
          </div>
          <button
            className="btn btn-primary "
            onClick={screenShare}
            id="btn-screen"
          >
            {!screenShared.current ? "Share screen" : "Stop Sharing"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Live;
