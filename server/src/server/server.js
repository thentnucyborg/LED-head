const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const api = require('../api/index');
const Controller = require('../controllers/controller');

const start = (options) => {
  const { PORT, socket } = options;
  return new Promise((resolve, reject) => {

    const app = express();

    /* Configuration */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));

    app.use(express.static(path.join(__dirname, '../../public')));

    /* Controller */
    const controller = new Controller(options);

    /* API */
    api(app, { controller: controller });

    /* Start Express server */
    const server = http.createServer(app);
    server.listen(PORT, () => resolve());

    /* Connect to socket */
    socket.connect({ server });
    
  });
};

module.exports = Object.assign({}, { start });
