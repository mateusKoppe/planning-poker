const games: {[code: string]: {}} = {}

// TODO: Improve this function
const generateGameCode = (): string =>
  [1, 2, 3, 4, 5].map(() => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    return letters[Math.floor(Math.random() * letters.length)];
  }).join('');

export const createGame = (data: { name: string; type: number }) => {
  const game = { ...data, code: generateGameCode() };
  games[game.code] = game

  return game
};

export const findGame = (name: string) => {
  return games[name]
}
