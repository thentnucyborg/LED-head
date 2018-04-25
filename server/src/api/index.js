module.exports = (app, options) => {
  const { controller } = options;
  const api = '/api';

  app.get(`${api}/`, (req, res) => {
    console.log('jadda');
    res.json({ message: true });
  });

  app.post(`${api}/start`, (req, res) => {
    controller.start();
    console.log('start show');
    res.json({ success: true });
  });

  app.post(`${api}/stop`, (req, res) => {
    controller.stop();
    console.log('stop show');
    res.json({ success: true });
  });

  app.post(`${api}/setshow`, (req, res) => {
    const { showIndex } = req.body;
    controller.setMode(showIndex);
    console.log('set show', showIndex);
    res.json({ success: true });
  });

  app.post(`${api}/setmode`, (req, res) => {
    const { mode } = req.body;
    controller.setMode(mode);
    console.log('set mode', mode);
    res.json({ success: true });
  });
};
