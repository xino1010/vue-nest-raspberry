import {
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger} from '@nestjs/common';
import {IndoorData} from '../classes/indoor-data';
import {Event} from '../classes/event';
import {IndoorService} from './indoor.service';

const port = 3001;

@WebSocketGateway(port)
export class WebsocketService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  private intervalData: number = 2000; // ms

  @WebSocketServer() server: Server;

  constructor(private indoorService: IndoorService) {
  }

  afterInit(server: Server): void {
    Logger.log(`Websocket listening on port ${port}`, WebsocketService.name);
    this.setTimers();
  }

  handleConnection(socket: Socket): void {
    Logger.log(`${socket.id} connected`, WebsocketService.name);
    Logger.log(`${Object.keys(this.server.sockets.connected).length} users connected`, WebsocketService.name);
  }

  handleDisconnect(socket: Socket) {
    Logger.log(`${socket.id} disconnected`, WebsocketService.name);
    Logger.log(`${Object.keys(this.server.sockets.connected).length} users connected`, WebsocketService.name);
  }

  private setTimers(): void {
    setInterval(async () => {
      await this.sendIndoorData();
    }, this.intervalData);
  }

  private async sendIndoorData() {
    await this.indoorService.updateIndoorData();
    const indoorData: IndoorData = this.indoorService.getIndoorData();
    this.server.emit(Event.INDOOR_DATA, indoorData);
  }
}
