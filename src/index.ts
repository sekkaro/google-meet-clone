import express from "express";
import { Server } from "socket.io";
import path from "path";
import { UserConnection } from "./types";

const main = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, "public")));

  const server = app.listen(3000, () => console.log("listening on port 3000"));

  const io = new Server(server);

  const userConnections: UserConnection[] = [];

  io.on("connection", (socket) => {
    console.log("socket id is: ", socket.id);
    socket.on("userconnect", ({ userId, meetingId }) => {
      console.log("user", userId, meetingId);
      const otherConnections = userConnections.filter(
        (p) => p.meetingId === meetingId
      );
      userConnections.push({
        connectionId: socket.id,
        userId,
        meetingId,
      });

      otherConnections.forEach((v) => {
        socket.to(v.connectionId).emit("inform_others_about_me", {
          userId,
          connId: socket.id,
        });
      });
    });
  });
};

main();
