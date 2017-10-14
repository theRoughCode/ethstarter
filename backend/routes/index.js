const routes = require('express').Router();
const database = require('../helpers/database');
const ether = require('../helpers/ether');

routes.get('/', function(req, res){
  res.render('../../frontend/public/index.html');
});

routes.get('/submit/:name/:price', function(req, res) {
  database.addUser(req.params.name, req.params.price).then(success => {
    res.send("Success!");
  }, error => {
    res.send("Error!");
  });
});

routes.post('/submit', function(req, res) {
  console.log(req);
  req.checkBody('name', 'Invalid name').notEmpty().isAlpha();
  req.checkBody('price', 'Invalid price').notEmpty().isInt();

  //Trim and escape the name field.
  req.sanitize('name').escape();
  req.sanitize('name').trim();

  var errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  }
  else {
    var data = {
      name: req.body.name,
      price: req.body.price
    }
    return res.send(data);
  }
});

routes.get('/user/:name', function(req, res) {
  database.getUser(req.params.name).then(snapshot => {
    res.send(snapshot.val());
  }, error => {
    res.send(`Username ${name} not found!`);
  });
});

module.exports = routes;
