import { v4 } from "uuid";
import {
  append,
  assoc,
  assocPath,
  filter,
  findIndex,
  merge,
  propEq,
} from "ramda";

export type GamesHash = { [code: string]: Game };

export interface Game {
  code?: string;
  name: string;
  type: number;
  users: User[];
  cards: Number[];
  revealed: boolean;
}

export interface User {
  name: string;
  id: string;
  hand: number | null;
}

export enum CardsGameType {
  fibonnaci = 1,
  powerOf2 = 2,
}

const decks: { [code: number]: Number[] } = {
  [CardsGameType.fibonnaci]: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  [CardsGameType.powerOf2]: [0, 1, 2, 4, 8, 16, 32, 64],
};

const generateGameCode = (): string =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);

export const createGame = (data: {
  name: string;
  type: CardsGameType;
}): Game => {
  const code = generateGameCode();
  const game: Game = {
    ...data,
    users: [],
    code,
    revealed: false,
    cards: decks[data.type],
  };

  return game;
};

export const findGame = (games: GamesHash, name: string): Game => {
  return games[name];
};

export const gameAdduser = (
  game: Game,
  user: { name: string }
): { game: Game; user: User } => {
  const newUser: User = merge(user, {
    id: v4(),
    hand: null,
  });

  const users = append(newUser, game.users);
  const updatedGame = assoc("users", users, game);

  return { game: updatedGame, user: newUser };
};

export const gameRemoveUser = (game: Game, user: { id: string }): Game => {
  const users = filter(propEq("id", user.id), game.users);
  const updatedGame = assoc("users", users, game);
  return updatedGame;
};

export const userSelectCard = ({
  game,
  userId,
  card,
}: {
  game: Game;
  userId: string;
  card: number;
}): Game => {
  const userI = findIndex(propEq("id", userId), game.users);
  if (userI == -1) return game;

  return assocPath(["users", userI, "hand"], card, game);
};
