const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const api = require('../api/index');
const Controller = require('../controllers/controller');

/* Express server with socket handler attached */
const start = (options) => {
  const { port, socket } = options;
  return new Promise((resolve, reject) => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(express.static(path.join(__dirname, '../../public')));

    const controller = new Controller(options);
    api(app, { controller: controller });

    const server = http.createServer(app).listen(port, () => {
      socket.connect({ server });
      resolve();
    });
  });
};

module.exports = Object.assign({}, { start });
