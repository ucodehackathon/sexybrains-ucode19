import * as socketio from 'socket.io';
import { WebServer } from './server';
import { SerialService } from '../serial/serial.service';
import { OpenCvService } from '../opencv/opencv.service';
import { Service } from 'typedi';

@Service()
export class SocketIoService {
  io: socketio.Server;

  constructor(
    webServer: WebServer,
    private serialService: SerialService,
    private opencvService: OpenCvService,
  ) {
    this.io = socketio(webServer.httpServer);

    this.io.on('connection', (socket) => {
      socket.on('payment', () => {
        this.serialService.openDoor();
      });
      socket.on('pickup', () => {
        this.serialService.closeDoor();
      });
      this.opencvService.$facesDetected.subscribe(faces => {
        socket.emit('isFace', faces);
      });
    });
  }
}