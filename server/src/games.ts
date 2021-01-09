export const generateGameCode = () => Array(4).map(() => {
  const letters = ['a', 'b', 'c', 'd']
  return letters[Math.floor(Math.random() * letters.length)]
})
