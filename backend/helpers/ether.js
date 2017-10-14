const Web3 = require('web3');
const testrpcPort = 8545

var web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:8545`));
var accounts = web3.eth.accounts;

function getAccounts(callback) {
  callback(accounts);
}

module.exports = {
  getAccounts
}
