import { Service } from 'typedi';
import * as SerialPort from 'serialport';

@Service()
export class SerialService {
  serialPort: SerialPort;

  constructor() {
    this.serialPort = new SerialPort('/dev/ttyACM0', {
      baudRate: 9600
    });;
  }

  openDoor() {
    this.serialPort.write('abrir\n');
  }

  closeDoor() {
    this.serialPort.write('cerrar\n');
  }
}