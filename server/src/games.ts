import { v4 } from "uuid";

enum CardsGameType {
  fibonnaci = 1,
  powerOf2 = 2,
}

const decks: {[code: number]: Number[]} = {
  [CardsGameType.fibonnaci]: [0, 1, 2, 3, 5, 6, 13, 21, 34, 55, 89],
  [CardsGameType.powerOf2]: [0, 1, 2, 4, 8, 16, 32, 64],
};

export interface User {
  name: string;
  id: string;
  hand: number | null;
}

export interface Game {
  code?: string;
  name: string;
  type: number;
  users: User[];
  cards: Number[];
  revealed: boolean;
}

const games: { [code: string]: Game } = {
  acme: {
    name: "Acme",
    type: 1,
    code: "acme",
    users: [],
    revealed: false,
    cards: decks[CardsGameType.fibonnaci],
  },
};

const generateGameCode = (): string =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);

export const createGame = (data: { name: string; type: CardsGameType }) => {
  const code = generateGameCode();
  const game: Game = {
    ...data,
    users: [],
    code,
    revealed: false,
    cards: decks[data.type],
  };

  console.log(game)

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
    hand: null,
  };

  game.users = [...game.users, newUser];
  return newUser;
};

export const gameRemoveUser = (gameId: string, user: { id: string }) => {
  const game = findGame(gameId);
  if (!game) return;

  game.users = game.users.filter((u) => u.id !== user.id);
};

export const userSelectCard = ({
  gameId,
  userId,
  card,
}: {
  gameId: string;
  userId: string;
  card: number;
}) => {
  const game = findGame(gameId);
  const user = game.users.find((u) => u.id === userId);
  if (!user) return;

  user.hand = card;

  return game;
};
