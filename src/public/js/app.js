const MyApp = (() => {
  const init = (uid, mid) => {
    event_process_for_signaling_server();
  };
  var socket;
  const event_process_for_signaling_server = () => {
    socket = io();
    socket.on("connect", () => {
      alert("socket connected to client side");
    });
  };

  return {
    _init: (uid, mid) => {
      init(uid, mid);
    },
  };
})();
