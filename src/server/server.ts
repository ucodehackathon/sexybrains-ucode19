import { Service } from 'typedi';
import * as http from 'http';
import { getApp } from './app';

const API_PORT = 8080;

@Service()
export class WebServer {
  httpServer: http.Server = new http.Server();

  constructor() {
    this.httpServer = getApp().listen( API_PORT, () => {
      console.log('Server Express iniciado');
    });
  }
}