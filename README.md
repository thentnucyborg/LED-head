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

2. Create a .env inside `/server` file with the following:

```env
ADDRESS = localhost
PORT = 8080
AUTO_START = false
AUTO_START_SHOW = 1
FREQUENCY = 500
START_DELAY = 500
```

3. Install dependencies:

```BASH
  $   npm i --prefix server && npm i --prefix client
```

## Development:
The server and client needs to be started seperatively, with the following command inside `/server` and `/client` folders: 

```BASH
  $   npm run start
```

The server is now started and will be hosting the development tool at the default address: http://localhost:3000.

If visulaization on the arduino device is wanted, make sure the device is connected through USB serial before launching the server. The server software will autodetect the arduino device. 

## Production: 
The server and client needs to be started seperatively, with the following command inside `/server` and `/client` folders: 
The client needs to be built first, where the files will be placed inside `/server/src/build`.

```BASH
  $   cd client
  $   npm run build
```

Then the server can be started from inside the `/server` folder.

```BASH
  $   cd server
  $   npm run build
```

## Notable files:

ROOT/server/src/model/Program.js contains the different animations available on the device. All of the functions there are templates of how the animation callback looks.

## Built With
* [Nodejs](https://nodejs.org/en/) - 9.*
* [Express](http://expressjs.com/) - 4.15.5
* [React](https://reactjs.org/) - 16.2.0
* [React Router](https://github.com/ReactTraining/react-router) - 4.2.0
* [Redux](https://redux.js.org/) - 4.0.0
* [Styled Components](https://github.com/styled-components/awesome-styled-components) - 3.2.3 
* [Webpack](https://webpack.js.org/) - 3.11.0
* [Babel](https://babeljs.io/) - 6.23.0
* [ESLint](https://eslint.org/) - 4.19.0
