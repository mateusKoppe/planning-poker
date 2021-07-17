import { Server as HttpServer } from "http";
import { assoc, chain, dissoc, ifElse, map, pipe, propEq } from "ramda";
import { Server, Socket } from "socket.io";

import { Atom } from "../../utils/atom";

import {
  findGame,
  gameAddUser,
  gameRemoveUser,
  gameUpdateUser,
  Game,
  GamesHash,
  gameFindUser,
} from "../../services/games";

import { createUser, User } from "../../services/user";

const usersSocket: { [id: string]: { gameCode: string; userId: string } } = {};
const rooms: { [code: string]: Socket[] } = {};

const sendSocketsMessage = (
  sockets: Socket[],
  message: string,
  options: Object
) => sockets.forEach((s) => s.emit(message, options));

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

      console.log({ game, updatedGame });

      setGames(assoc(updatedGame.code, updatedGame, getGames()));

      usersSocket[socket.id] = { gameCode, userId: createdUser.id };
      rooms[gameCode] = [...(rooms[gameCode] ?? []), socket];
      sendSocketsMessage(rooms[gameCode], "new user", {
        newUser: createdUser,
        game: updatedGame,
      });

      socket.emit("joined game", { game: updatedGame, profile: createdUser });
    });

    socket.on("disconnect", () => {
      const { gameCode, userId } = usersSocket[socket.id];
      const sockets = rooms[gameCode].filter((s) => s != socket);
      const game = findGame(getGames(), gameCode);
      const user = gameFindUser(game, userId);
      if (!user) return;

      const updatedGame = gameRemoveUser(game, user);
      setGames(assoc(updatedGame.code, updatedGame, getGames()));

      rooms[gameCode] = sockets;
      delete usersSocket[socket.id];
      sendSocketsMessage(sockets, "user left", {
        userLeft: user,
        game: updatedGame,
      });
    });

    socket.on("select card", ({ card }: { card: number }) => {
      const { gameCode, userId } = getContextBySocket(socket);
      if (!gameCode || !userId) return;

      let game = findGame(getGames(), gameCode);
      const user = gameFindUser(game, userId);
      if (game.revealed || !user) return;

      const updatedUser = assoc("hand", card, user);
      game = gameUpdateUser(game, updatedUser);
      setGames(assoc(game.code, game, getGames()));

      const room = rooms[gameCode];
      sendSocketsMessage(room, "user played", { user: { id: user?.id }, game });
    });

    socket.on("reveal cards", () => {
      const { gameCode } = getContextBySocket(socket);
      const room = rooms[gameCode];
      if (!gameCode) return;

      const game = findGame(getGames(), gameCode);

      // TODO: Improve this please
      game.revealed = true;
      setGames(assoc(game.code, game, getGames()));

      sendSocketsMessage(room, "game revealed", { game });
    });

    socket.on("reset voting", () => {
      const { gameCode } = getContextBySocket(socket);
      const room = rooms[gameCode];
      if (!gameCode) return;

      const game = findGame(getGames(), gameCode);
      const users = map(dissoc("hand"), game.users);

      const updatedGame = pipe(
        assoc("revealed", false),
        assoc("users", users)
      )(game);

      setGames(assoc(game.code, updatedGame, getGames()));

      sendSocketsMessage(room, "game revealed", { game: updatedGame });
    });
  });
};
