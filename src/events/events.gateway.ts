import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
  } from '@nestjs/websockets';
  import { Server } from "socket.io";
  import {Injectable} from "@nestjs/common";
import { log } from 'console';
  
  @Injectable()
  @WebSocketGateway()
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
    @WebSocketServer()
    server: Server;
  
    users: number = 0;
  
    @SubscribeMessage('addNoti')
    async handleNoti(client, payload) {
      client.broadcast.emit('alertNoti', payload);
    }

    @SubscribeMessage('fetchProducts')
    async handle(client, payload) {
        console.log("=======", payload);
        
      client.broadcast.emit('resetProduct', payload);
    }
  
    async handleConnection() {
      console.log('New Connection on Event');
      this.users++;
      this.server.emit('users', this.users);
    }
  
    async handleDisconnect() {
      console.log('Disconnection on Event');
      this.users--;
      this.server.emit('users', this.users);
    }
  
  }