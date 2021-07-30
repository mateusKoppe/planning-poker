import { Server as HttpServer } from "http";
import { assoc, dissoc, map, pipe } from "ramda";
import { Server, Socket } from "socket.io";

import atom, { Atom } from "../../utils/atom";

import {
  findGame,
  gameAddUser,
  gameRemoveUser,
  gameUpdateUser,
  GamesHash,
  gameFindUser,
} from "../../services/games";

import { createUser } from "../../services/user";
import { addSocketInfo, getInfoBySocket, removeSocketInfo, SocketUserInfo } from "./socketUserInfo";


const socketInfoAtom = atom({} as SocketUserInfo);

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
      let game = findGame(getGames(), gameCode);

      const newUser = createUser(profile.name);
      game = gameAddUser(game, newUser);

      setGames(assoc(game.code, game, getGames()));

      addSocketInfo(socketInfoAtom, socket, { gameCode, userId: newUser.id })

      io.to(`game-${gameCode}`).emit("new user", { newUser, game });

      socket.join(`game-${gameCode}`);
      socket.emit("joined game", { game, profile: newUser });
    });

    socket.on("disconnect", () => {
      const { gameCode, userId } = getInfoBySocket(socketInfoAtom, socket);
      const game = findGame(getGames(), gameCode);
      const user = gameFindUser(game, userId);
      if (!user) return;

      const updatedGame = gameRemoveUser(game, user);
      setGames(assoc(updatedGame.code, updatedGame, getGames()));

      removeSocketInfo(socketInfoAtom, socket)

      io.to(`game-${gameCode}`).emit("user left", {
        userLeft: user,
        game: updatedGame,
      });
    });

    socket.on("select card", ({ card }: { card: number }) => {
      const { gameCode, userId } = getInfoBySocket(socketInfoAtom, socket);
      if (!gameCode || !userId) return;

      let game = findGame(getGames(), gameCode);
      let user = gameFindUser(game, userId);
      if (game.revealed || !user) return;

      user = assoc("hand", card, user);
      game = gameUpdateUser(game, user);
      setGames(assoc(game.code, game, getGames()));

      io.to(`game-${gameCode}`).emit("user played", { user: { id: user?.id }, game });
    });

    socket.on("reveal cards", () => {
      const { gameCode } = getInfoBySocket(socketInfoAtom, socket);
      if (!gameCode) return;

      const game = findGame(getGames(), gameCode);

      // TODO: Improve this please
      game.revealed = true;
      setGames(assoc(game.code, game, getGames()));

      io.to(`game-${gameCode}`).emit("game revealed", { game });
    });

    socket.on("reset voting", () => {
      const { gameCode } = getInfoBySocket(socketInfoAtom, socket);
      if (!gameCode) return;

      const game = findGame(getGames(), gameCode);
      const users = map(dissoc("hand"), game.users);

      const updatedGame = pipe(
        assoc("revealed", false),
        assoc("users", users)
      )(game);

      setGames(assoc(game.code, updatedGame, getGames()));

      io.to(`game-${gameCode}`).emit("game revealed", { game: updatedGame });
    });
  });
};
