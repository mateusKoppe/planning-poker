import { Server, Socket } from "socket.io";
import { generateGameCode } from "./games";

const PORT = Number(process.env.PORT ?? 8080);

const io = new Server(PORT, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  socket.on("create game", (data: { name: string; type: number }) => {
    socket.emit('game created', {
      ...data,
      code: generateGameCode()
    })
  });
});

console.log(`Websocket running on port ${PORT}`);
