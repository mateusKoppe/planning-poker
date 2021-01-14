import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export const run = (server: HttpServer) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");
    socket.on("join game", (data) => {
      console.log(data);
    });
  });
};
