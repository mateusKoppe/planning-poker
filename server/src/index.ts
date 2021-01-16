import http from "./http";
import { Server } from "http";
import { run as runWebsocket } from "./websocket"

const server: Server = http.listen(http.get('port'),
  () => console.log(`Listeing on port: ${http.get('port')}`));

runWebsocket(server)
