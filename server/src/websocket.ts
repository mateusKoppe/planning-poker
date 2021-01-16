import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { findGame, gameAdduser, gameRemoveUser } from "./games";

const room: { [code: string]: { socket: Socket; id: string }[] } = {};

export const run = (server: HttpServer) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("join game", ({ game: { code: gameCode }, profile }) => {
      const game = findGame(gameCode);

      const createdUser = gameAdduser(gameCode, profile);

      room[gameCode]?.forEach((user) =>
        user.socket.emit("new user", { newUser: createdUser, game })
      );
      room[gameCode] = [
        ...(room[gameCode] ?? []),
        { socket, id: createdUser.id },
      ];
      socket.emit("joined game", { game, profile });
    });

    socket.on("disconnect", () => {
      Object.keys(room).forEach((gameCode) => {
        const user = room[gameCode].find((c) => c.socket === socket);
        console.log(user, 'found user')

        if (user) {
          gameRemoveUser(gameCode, user);
          room[gameCode] = room[gameCode].filter((u) => u !== user);
          room[gameCode].forEach((u) => {
            u.socket.emit("user left", {
              userLeft: { id: user.id },
              game: findGame(gameCode),
            });
          });
        }
      });
    });
  });
};
