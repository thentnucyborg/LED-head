# NTNU CYBORG - LED-SERVER
The LED server is made as a driver for the NTNU Cyborg LED dome. The server will process all visuals for the dome and maintain state. There are two visualization tools for the dome, the development mode and the arduino mode. 
- Development mode hosts a web site that visualizes the animations on a selected device (Dome or head). 
- Arduino mode sends data to the arduino controlled LED dome or box.

## Installation

### Prerequisits: 
NodeJS: https://nodejs.org/en/

Arduino drivers: https://github.com/arduino/arduino-create-agent.

NB! The arduino drivers needs to be installed through the Arduino Create Agent. The older IDEs will not work with the serialport library.

### Instructions: 
1. Download the source code:
```BASH
  $   git clone https://github.com/thentnucyborg/LED-server.git
```

2. jump into the directory containing the package.json and install dependencies: 

```BASH
  $   cd LED-server/server
  $   npm install 
```

## How to use: 
To start the server, make sure you are in the directory containing the package.json and run the following command from terminal:

```BASH
  $   npm start 
```

The server is now started and will be hosting the development tool at the address: http://localhost:3000. 

If visulaization on the arduino device is wanted, make sure the device is connected through USB serial before launching the server. The server software will autodetect the arduino device. 

## Notable files:

ROOT/server/src/model/Program.js contains the different animations available on the device. All of the functions there are templates of how the animation callback looks.
