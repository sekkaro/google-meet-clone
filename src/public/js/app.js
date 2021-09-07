const AppProcess = () => {
  const iceConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "stun:stun1.l.google.com:19302",
      },
    ],
  };

  const setConnection = (connId) => {
    const connection = new RTCPeerConnection(iceConfiguration);
  };

  return {
    setNewConnection: async (connId) => {
      await setConnection(connId);
    },
  };
};

const MyApp = (() => {
  let socket;
  let userId;
  let meetingId;
  const init = (uid, mid) => {
    userId = uid;
    meetingId = mid;
    event_process_for_signaling_server();
  };
  const event_process_for_signaling_server = () => {
    socket = io();
    socket.on("connect", () => {
      if (socket.connected) {
        if (userId && meetingId) {
          socket.emit("userconnect", {
            userId,
            meetingId,
          });
        }
      }
    });

    socket.on("inform_others_about_me", ({ userId, connId }) => {
      addUser(userId, connId);
      AppProcess.setNewConnection(connId);
    });
  };

  const addUser = (userId, connId) => {
    let newDivId = $("otherTemplate").clone();
    newDivId = newDivId.attr("id", connId).addClass("other");
    newDivId.find("h2").text(userId);
    newDivId.find("video").attr("id", "v_" + connId);
    newDivId.find("audio").attr("id", "a_" + connId);
    newDivId.show();

    $("#divUsers").append(newDivId);
  };

  return {
    _init: (uid, mid) => {
      init(uid, mid);
    },
  };
})();
