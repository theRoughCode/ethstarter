const routes = require('express').Router();

routes.get('/', function(req, res){
  res.send('hi');
});

module.exports = routes;
