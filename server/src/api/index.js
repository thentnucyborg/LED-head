
module.exports = (app, options) => {
  const { controller } = options;

  app.get('/api/ping', (req, res) => res.json({date: + new Date()}));

  app.get('/api/start', (req, res) => {
    controller.start();
    res.json({love: 'you'});
  });
};
