const MyApp = (() => {
  const init = (uid, mid) => {
    console.log("from app.js", uid, mid);
  };

  return {
    _init: (uid, mid) => {
      init(uid, mid);
    },
  };
})();
