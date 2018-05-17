const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Put routes in seperate folder.' });
});

module.exports = routes;