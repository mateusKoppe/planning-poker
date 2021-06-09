import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createGame, findGame } from "./games";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/game", (req, res) => {
  const { name, type }: { name: string; type: number } = req.body;
  const game = createGame({ name, type });
  return res.json(game);
});

app.get("/api/game/:gameId", (req, res) => {
  const { gameId } = req.params;
  const game = findGame(gameId);
  if (!game) return res.sendStatus(404);

  return res.json(game);
});

export default app;
