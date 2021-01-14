import http from "./http";
import { run as runWebsocket } from "./websocket"

const PORT = Number(process.env.PORT ?? 8080);

http.listen(PORT)
runWebsocket(http)
