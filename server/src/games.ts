interface user {
  name: string
}

interface game {
  code?: string
  name: string
  type: number
  users: user[]
}

const games: {[code: string]: game} = {ggbde: { name: 'Acme', type: 1, code: 'ggbde', users: [] }}

// TODO: Improve this function
const generateGameCode = (): string =>
  [1, 2, 3, 4, 5].map(() => {
    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    return letters[Math.floor(Math.random() * letters.length)];
  }).join('');

export const createGame = (data: { name: string; type: number }) => {
  const code = generateGameCode()
  const game: game = {
    ...data,
    users: [],
    code
  };

  games[code] = game

  return game
};

export const findGame = (name: string): game => {
  return games[name]
}

export const gameAdduser = (gameId: string, user: user) => {
  const game = findGame(gameId)
  if (!game) return

  game.users = [...game.users, user]
}

export const gameRemoveUser = (gameId: string, user: {id: string}) => {
  const game = findGame(gameId)
  if (!game) return

  game.users = game.users.filter(u => u.name !== user.id)
}
