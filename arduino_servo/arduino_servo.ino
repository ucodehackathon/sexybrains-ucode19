#include <Servo.h>

Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position
bool abierto = false;

void setup() {
  Serial.begin(9600);
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  while (Serial.available() > 0) {
    String cmd = Serial.readStringUntil("\n");
    // Serial.println(cmd);
    
    if(cmd.equals("abrir\n")) {
      abrir();
    }
    else
    {
      if(cmd.equals("cerrar\n")) cerrar(); 
    }
  }
}

void cerrar() 
{
  if(abierto) {
    for (pos = 0; pos <= 90; pos++) {
      myservo.write(pos);
      delay(10);
    }
  }
  abierto = false;
}

void abrir() {
  if(!abierto) {
    for (pos = 90; pos >= 1; pos--) {
      myservo.write(pos);
      delay(10);
    }
  }
  abierto = true;
}
