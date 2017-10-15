const routes = require('express').Router();
const database = require('../helpers/database');
const ether = require('../helpers/ether');

routes.post('/proposals/create', function(req, res) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('price', 'Invalid price').notEmpty().isInt();
  req.checkBody('royalty', 'Invalid royalty').notEmpty().isDecimal();
  req.checkBody('address', 'Invalid address').notEmpty();

  //Trim and escape the name field.
  req.sanitize('title').escape();
  req.sanitize('title').trim();
  req.sanitize('description').escape();
  req.sanitize('price').escape();
  req.sanitize('price').trim();
  req.sanitize('royalty').escape();
  req.sanitize('royalty').trim();
  req.sanitize('address').escape();
  req.sanitize('address').trim();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    return res.send(errors);
  }
  else {
    var data = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      royalty: req.body.royalty,
      address: req.body.address,
      image_url: req.body.image_url,
      mileStones: [{
        profit: 10,
        amount: 1000,
        timeStamp: Date.now()
      }]
    }

    ether.getAccounts(accounts => {
      data.address = accounts[0];
      ether.createProposal(data, address => res.send(address));
    });
  }
});

routes.post('/proposals/invest', function(req, res) {
  req.checkBody('proposalAddress', 'Invalid Proposal Address').notEmpty().isAlpha();
  req.sanitize('proposalAddress').escape();
  req.sanitize('proposalAddress').trim();
  req.checkBody('investorAddress', 'Invalid Investor Address').notEmpty().isAlpha();
  req.sanitize('investorAddress').escape();
  req.sanitize('investorAddress').trim();

  var errors = req.validationErrors();
  if (errors) {
    return res.send(errors);
  } else {
    var data = {
      proposalAddress: req.body.proposalAddress,
      investorAddress: req.body.investorAddress
    }

    ether.getAccounts(accounts => ether.investProposal(accounts[1], data, address => res.send(address)));
  }
});

routes.get('/proposals/:address', function(req, res) {
  ether.getProposal(req.params.address, data => {
    res.send(data);
  });
});

routes.get('/proposals', function(req, res) {
  ether.getAllProposals(data => {
    res.send(data);
  });
});

routes.get('/proposals/growth/:address', function(req, res) {
  ether.generateHistory(req.params.address, success => res.send(success));
});

module.exports = routes;
