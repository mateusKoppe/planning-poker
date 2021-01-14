import { Express } from "express";
import { Server, Socket } from "socket.io";
import http from "http"

export const run = (app: Express) => {
  const io = new Server(new http.Server(app));

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");
  });
}
