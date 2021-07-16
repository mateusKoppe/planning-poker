import { assocPath, dissocPath, merge } from "ramda";

import { User, UsersHash } from "./user";

export type GamesHash = { [code: string]: Game };

export interface Game {
  code: string;
  name: string;
  type: number;
  users: UsersHash;
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
    users: {},
    code: generateGameCode(),
    revealed: false,
    cards: decks[data.type],
  });

export const findGame = (games: GamesHash, name: string): Game => games[name];

export const gameAddUser = (game: Game, user: User): Game =>
  assocPath(["users", user.id], user, game);

export const gameRemoveUser = (game: Game, user: User): Game =>
  dissocPath(["users", user.id], game);

export const gameFindUser = (game: Game, userId: string): User =>
  game.users[userId];

export const userSelectCard = (game: Game, user: User, card: number): Game =>
  assocPath(["users", user.id, "hand"], card, game);
