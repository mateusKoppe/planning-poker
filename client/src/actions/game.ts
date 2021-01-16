import api from "utils/api";

export class GameNotFound extends Error {
  code: number;
  constructor(message: string | undefined) {
    super(message);
    this.name = "GameNotFound";
    this.code = 404;
  }
}

export const createGame = async (game: { name: string; type: number }) => {
  const response = await api.post("/game", game);
  return response.data;
};

export const findgame = async (gameId: string) => {
  try {
    const response = await api.get(`/game/${gameId}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    }

    throw error;
  }
};
