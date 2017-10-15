const routes = require('express').Router();
const database = require('../helpers/database');
const ether = require('../helpers/ether');

routes.post('/proposals/create', function(req, res) {
  req.checkBody('title', 'Invalid title').notEmpty().isAlpha();
  req.checkBody('description', 'Invalid description').isAlpha();
  req.checkBody('price', 'Invalid price').notEmpty().isInt();

  //Trim and escape the name field.
  req.sanitize('title').escape();
  req.sanitize('description').escape();
  req.sanitize('title').trim();

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
      mileStones: [{
        profit: 10,
        amount: 1000,
        timeStamp: Date.now()
      }]
    }
    
    ether.getAccounts(accounts => ether.createProposal(accounts[0], data, address => res.send(address)));
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
  ether.getVar(req.params.address, contract => {
    res.send(contract.startUp.call());
  });
})

module.exports = routes;
