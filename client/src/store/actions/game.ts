import socket from "utils/websocket";

export const createGame = ({ name, type }: { name: string; type: number }) => {
  console.log('creating game')
  socket.emit("create game", {
    name,
    type,
  });
};
