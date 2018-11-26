import {Socket} from 'socket.io-client';

export interface RootState {
  connected: boolean;
  socket: SocketIOClient.Socket;
}
