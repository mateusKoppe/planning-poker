import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { createGame, findGame, GamesHash } from "./games";
import { Atom } from "./utils/atom";

const run = ({
  gamesAtom,
  port,
  callback,
}: {
  gamesAtom: Atom<GamesHash>;
  port: Number;
  callback: (app: Express) => void;
}) => {
  const app = express();
  const [getGames, setGames] = gamesAtom;

  app.use(bodyParser.json());
  app.use(cors());

  app.post("/api/game", (req, res) => {
    const { name, type }: { name: string; type: number } = req.body;
    const game = createGame({ name, type });
    setGames({ ...getGames(), game });
    return res.json(game);
  });

  app.get("/api/game/:gameId", (req, res) => {
    const { gameId } = req.params;
    const game = findGame(getGames(), gameId);
    if (!game) return res.sendStatus(404);

    return res.json(game);
  });

  app.set("port", port);
  callback(app);
  return app.listen(port, () => console.log(`Listeing on port: ${port}`));
};

export default run;
