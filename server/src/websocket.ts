import { Express } from "express";
import { Server, Socket } from "socket.io";
import http from "http"

import { createGame, findGame } from "./games";

export const run = (app: Express) => {
  const io = new Server(new http.Server(app));

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("create game", (data: { name: string; type: number }) => {
      socket.emit("game created", createGame(data));
    });

    socket.on("search game", (data: { name: string }) => {
      socket.emit("game searched", findGame(data.name));
    });
  });
}
