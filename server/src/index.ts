import { Express } from "express";
import runServer from "./server/http";
import atom from "./utils/atom";
import { GamesHash } from "./services/games";
import { run as runWebsocket } from "./server/websocket";

const gamesAtom = atom<GamesHash>({});

const run = (port: Number, callback?: (app: Express) => void) => {
  const server = runServer({ gamesAtom, port, callback });
  runWebsocket({server, gamesAtom});
};

if (process.env.NODE_ENV === "development") {
  const PORT = Number(process.env.REACT_APP_API_PORT ?? 8080);
  run(PORT);
}

export default run;
