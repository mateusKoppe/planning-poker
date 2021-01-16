import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import {
  findGame,
  gameAdduser,
  gameRemoveUser,
  userSelectCard,
  User as GameUser,
  Game,
} from "./games";

type User = { socket: Socket; id: string };
type Room = User[];

const room: { [code: string]: Room } = {};

const getContextBySocket = (
  socket: Socket
): { room: Room | null; user: User | null; gameCode: string | null } => {
  let user = null;
  let game: Room | null = null;
  let gameCode: string | null = null;
  Object.keys(room).forEach((gameC) =>
    room[gameC].forEach((u) => {
      if (u.socket === socket) {
        user = u;
        game = room[gameC];
        gameCode = gameC;
      }
    })
  );

  return { user, room: game, gameCode };
};

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
      socket.emit("joined game", { game, profile: createdUser });
    });

    socket.on("disconnect", () => {
      Object.keys(room).forEach((gameCode) => {
        const user = room[gameCode].find((c) => c.socket === socket);

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

    socket.on("select card", ({ card }: { card: number }) => {
      const { room, user, gameCode } = getContextBySocket(socket);
      if (!gameCode || !user?.id) return;

      let game: Game | undefined = findGame(gameCode);
      if (game.revealed) return

      game = userSelectCard({ gameId: gameCode, userId: user?.id, card });

      room?.forEach((u) => {
        u.socket.emit("user played", { user: { id: user?.id }, game });
      });
    });

    socket.on("reveal cards", () => {
      const { room, user, gameCode } = getContextBySocket(socket);
      if (!gameCode) return;

      const game = findGame(gameCode);

      // TODO: Improve this please
      game.revealed = true;

      room?.forEach((u) =>
        u.socket.emit("game revealed", { game: findGame(gameCode) })
      );
    });

    socket.on("reset voting", () => {
      const { room, user, gameCode } = getContextBySocket(socket);
      if (!gameCode) return;

      const game = findGame(gameCode);

      // TODO: Improve this please
      game.revealed = false;
      game.users = game.users.map(
        (u: GameUser) => <GameUser>{ ...u, hand: null }
      );

      room?.forEach((u) =>
        u.socket.emit("game revealed", { game: findGame(gameCode) })
      );
    });
  });
};
