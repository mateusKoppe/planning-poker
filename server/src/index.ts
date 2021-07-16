import { Server } from "http";
import runServer from "./http";
import atom from "./utils/atom";
import { GamesHash } from "./games";
import { run as runWebsocket } from "./websocket";

const gamesAtom = atom<GamesHash>({});

const run = (port: Number, callback: Function = () => {}) => {
  const server = runServer({ gamesAtom, port });
  runWebsocket(server);
};

if (process.env.NODE_ENV === "development") {
  const PORT = Number(process.env.REACT_APP_API_PORT ?? 8080);
  run(PORT);
}

export default run;
