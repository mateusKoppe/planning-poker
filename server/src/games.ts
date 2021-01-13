const games: {[code: string]: {}} = {}

// TODO: Improve this function
const generateGameCode = (): string =>
  [1, 2, 3, 4, 5].map(() => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    console.log('random', Math.floor(Math.random() * letters.length))
    return letters[Math.floor(Math.random() * letters.length)];
  }).join('');

export const createGame = (data: { name: string; type: number }) => {
  console.log(generateGameCode())

  const game = { ...data, code: generateGameCode() };
  games[game.code] = game

  return game
};
