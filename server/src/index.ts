import { Server } from "http";
import app from "./http";
import { run as runWebsocket } from "./websocket";

const run = (port: Number, callback: Function = () => {}) => {
  app.set("port", port);
  callback(app);
  const server: Server = app.listen(port, () =>
    console.log(`Listeing on port: ${port}`)
  );

  runWebsocket(server);
};

if (process.env.NODE_ENV === "development") {
  const PORT = Number(process.env.REACT_APP_API_PORT ?? 8080);
  run(PORT)
}

export default run;
