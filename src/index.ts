import express from "express";
import { Server } from "socket.io";
import path from "path";

const main = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, "public")));

  const server = app.listen(3000, () => console.log("listening on port 3000"));

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("socket id is: ", socket.id);
  });
};

main();
