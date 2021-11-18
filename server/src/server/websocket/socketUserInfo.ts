import { assoc, dissoc } from "ramda";
import { Socket } from "socket.io";
import { Atom } from "../../utils/atom";

export type UserInfo = { gameCode: string; userId: string }
export type SocketUserInfo = { [id: string]: UserInfo }

export const getInfoBySocket = (
  [getUserInfo]: Atom<SocketUserInfo>,
  socket: Socket
): UserInfo => getUserInfo()[socket.id];

export const addSocketInfo = (atom: Atom<SocketUserInfo>, socket: Socket, info: UserInfo): SocketUserInfo => {
  const [getSocketInfo, setSocketInfo] = atom;

  return setSocketInfo(assoc(socket.id, info, getSocketInfo()))
}

export const removeSocketInfo = (atom: Atom<SocketUserInfo>, socket: Socket): SocketUserInfo => {
  const [getSocketInfo, setSocketInfo] = atom;

  return setSocketInfo(dissoc(socket.id, getSocketInfo()))
}
