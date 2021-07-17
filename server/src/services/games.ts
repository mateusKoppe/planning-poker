import {
  append,
  assoc,
  find,
  findIndex,
  merge,
  propEq,
  reject,
  update,
} from "ramda";

import { User } from "./user";

export type GamesHash = { [code: string]: Game };

export interface Game {
  code: string;
  name: string;
  type: number;
  users: User[];
  cards: Number[];
  revealed: boolean;
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

export const createGame = (data: { name: string; type: CardsGameType }): Game =>
  merge(data, {
    users: [],
    code: generateGameCode(),
    revealed: false,
    cards: decks[data.type],
  });

export const findGame = (games: GamesHash, code: string): Game => games[code];

export const gameAddUser = (game: Game, user: User): Game =>
  assoc("users", append(user, game.users), game);

export const gameRemoveUser = (game: Game, user: User): Game =>
  assoc("users", reject(propEq("id", user.id), game.users), game);

export const gameFindUser = (game: Game, userId: string): User | null =>
  find(propEq("id", userId), game.users) || null;

export const gameUpdateUser = (game: Game, user: User): Game => {
  const userIndex = findIndex(propEq("id", user.id), game.users);
  return assoc("users", update(userIndex, user, game.users), game);
};
