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
  req.checkBody('title', 'Invalid title').notEmpty().isAlpha();
  req.checkBody('description', 'Invalid description').isAlpha();
  req.checkBody('price', 'Invalid price').notEmpty().isInt();

  //Trim and escape the name field.
  req.sanitize('title').escape();
  req.sanitize('description').escape();
  req.sanitize('title').trim();

  var errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  }
  else {
    var data = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description
    }
    console.log(data);
    database.addProposal(data.title, data.price, data.description)
      .then(success => {
        console.log("success");
        return res.send(data);
      }, error => {
        console.log("error");
        return res.send("Failed to update database");
      })
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
