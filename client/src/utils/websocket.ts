import config from "config";
import io from "socket.io-client";

const socket = io(config.WS_URL);

export default socket
