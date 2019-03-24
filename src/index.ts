import 'reflect-metadata';
import * as dotenv from 'dotenv'; dotenv.config();
import { Container } from 'typedi';
import { WebServer } from './server/server';
import { OpenCvService } from './opencv/opencv.service';
import { SerialService } from './serial/serial.service';
import { SocketIoService } from './server/socketio.service';

process.on('unhandledRejection', (reason: any) => {
  console.log('error', reason.stack);
});

Container.get(WebServer);
Container.get(SocketIoService);
Container.get(OpenCvService);
Container.get(SerialService);