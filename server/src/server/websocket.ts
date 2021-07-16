import { Server as HttpServer } from "http";
import { assoc } from "ramda";
import { Server, Socket } from "socket.io";
import {
  findGame,
  gameAddUser,
  gameRemoveUser,
  userSelectCard,
  Game,
  GamesHash,
  gameFindUser,
} from "../services/games";

import { createUser, User } from "../services/user";
import { Atom } from "../utils/atom";

const usersSocket: { [id: string]: { gameCode: string; userId: string } } = {};
const rooms: { [code: string]: Socket[] } = {};

const getContextBySocket = (
  socket: Socket
): { gameCode: string; userId: string } => usersSocket[socket.id];

export const run = ({
  server,
  gamesAtom,
}: {
  server: HttpServer;
  gamesAtom: Atom<GamesHash>;
}) => {
  const io = new Server(server, { cors: { origin: "*" } });
  const [getGames, setGames] = gamesAtom;

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("join game", ({ game: { code: gameCode }, profile }) => {
      const game = findGame(getGames(), gameCode);

      const createdUser = createUser(profile.name);
      const updatedGame = gameAddUser(game, createdUser);

      setGames(assoc(updatedGame.code, updatedGame, getGames()));

      rooms[gameCode]?.forEach((socket) =>
        socket.emit("new user", { newUser: createdUser, game: updatedGame })
      );
      rooms[gameCode] = [...(rooms[gameCode] ?? []), socket];
      socket.emit("joined game", { game, profile: createdUser });
    });

    socket.on("disconnect", () => {
      const { gameCode, userId } = usersSocket[socket.id];
      const sockets = rooms[gameCode].filter((s) => s != socket);
      const game = findGame(getGames(), gameCode);
      const user = gameFindUser(game, userId);

      const updatedGame = gameRemoveUser(game, user);
      setGames(assoc(updatedGame.code, updatedGame, getGames()));

      rooms[gameCode] = sockets;
      sockets.forEach((s) => {
        s.emit("user left", {
          userLeft: user,
          game: updatedGame,
        });
      });
    });

    socket.on("select card", ({ card }: { card: number }) => {
      const { gameCode, userId } = getContextBySocket(socket);
      const room = rooms[gameCode];
      if (!gameCode || !userId) return;

      let game: Game = findGame(getGames(), gameCode);
      const user = gameFindUser(game, userId);
      if (game.revealed) return;

      game = userSelectCard(game, user, card);
      setGames(assoc(game.code, game, getGames()));

      room?.forEach((s) => {
        s.emit("user played", { user: { id: user?.id }, game });
      });
    });

    socket.on("reveal cards", () => {
      const { gameCode } = getContextBySocket(socket);
      const room = rooms[gameCode];
      if (!gameCode) return;

      const game = findGame(getGames(), gameCode);

      // TODO: Improve this please
      game.revealed = true;
      setGames(assoc(game.code, game, getGames()));

      room?.forEach((s) => s.emit("game revealed", { game }));
    });

    socket.on("reset voting", () => {
      const { gameCode } = getContextBySocket(socket);
      const room = rooms[gameCode];
      if (!gameCode) return;

      const game = findGame(getGames(), gameCode);

      // TODO: Improve this please
      game.revealed = false;
      game.users = Object.fromEntries(
        Object.entries(game.users).map(([index, user]: [string, User]) => [
          index,
          assoc("hand", undefined, user),
        ])
      );

      setGames(assoc(game.code, game, getGames()));

      room?.forEach((s) => s.emit("game revealed", { game }));
    });
  });
};
