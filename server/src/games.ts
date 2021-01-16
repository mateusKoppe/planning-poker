import { v4 } from "uuid";

export interface User {
  name: string;
  id: string;
}

export interface Game {
  code?: string;
  name: string;
  type: number;
  users: User[];
}

const games: { [code: string]: Game } = {
  ggbde: { name: "Acme", type: 1, code: "ggbde", users: [] },
};

const generateGameCode = (): string =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);

export const createGame = (data: { name: string; type: number }) => {
  const code = generateGameCode();
  const game: Game = {
    ...data,
    users: [],
    code,
  };

  games[code] = game;

  return game;
};

export const findGame = (name: string): Game => {
  return games[name];
};

export const gameAdduser = (gameId: string, user: { name: string }): User => {
  const game = findGame(gameId);

  const newUser: User = {
    ...user,
    id: v4(),
  };

  console.log(newUser);

  game.users = [...game.users, newUser];
  return newUser;
};

export const gameRemoveUser = (gameId: string, user: { id: string }) => {
  const game = findGame(gameId);
  if (!game) return;

  game.users = game.users.filter((u) => u.id !== user.id);
};
