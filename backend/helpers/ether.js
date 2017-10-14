const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const database = require('./database');
const testrpcPort = 8545
const gasLimit = 4700000;

var accounts;
var bytecode;
var AgentContract;

var web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${testrpcPort}`));

if (!web3.isConnected()) {
  alert('Please start a node.');
} else {
  accounts = web3.eth.accounts;
  compileContract(success => {
    if (success) console.log('Successfully compiled Agent contract.');
    else console.log('Failed to compile Agent contract.');
  });
}

function compileContract(callback) {
  var code = fs.readFileSync('./contracts/Agent.sol').toString();
  try{
    var compiledCode = solc.compile(code);
    bytecode = compiledCode.contracts[':Agent'].bytecode;
    var abi = compiledCode.contracts[':Agent'].interface;
    var abiDefinition = JSON.parse(abi);
    AgentContract = web3.eth.contract(abiDefinition);
  } catch (err) {
    console.log(err);
    callback(false);
  }
  callback(true);
}

function isContractInstantiated() {
  return (bytecode != null && AgentContract != null);
}

/*
 * @params {string} ownerAddress,
 * data { title, price, description, mileStones: { profit, amount, timeStamp } }
 * @returns address of contract
 */
function createProposal(ownerAddress, data, callback) {
  if (!isContractInstantiated()) {
    console.log('Contract is not instantiated.');
    callback(null);
  } else if (!ownerAddress) {
    console.log('Owner address is invalid.');
    callback(null);
  } else {
    AgentContract.new(data.price, {
      data: bytecode,
      from: ownerAddress,
      gas: gasLimit
    }, function(e, contract){
      if(!e) {
        if(!contract.address) {
          console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
          console.log("Contract mined! Address: " + contract.address);
          database.addProposal(data.title, data.price, data.description, data.mileStones, contract.address)
            .then(success => {
              console.log("Created new contract successfully");
              data.mileStones.forEach((item) => {
                contract.addMileStone(item.profit, item.amount, item.timeStamp, {
                  from: ownerAddress,
                  gas: gasLimit
                }, function(err, contract) {
                  if (err) return callback(err)
                  else return callback(contract.address);
                });
              });
              return callback(contract.address);
            }, error => {
              console.log(error);
              return callback("Failed to update database");
            })
        }
      } else console.log(e);
    });
  }
}

function investProposal(proposalAddress, investorAddress, callback) {
  database.getProposal(proposalAddress, snapshot => {
    if(!snapshot.val())  return callback(null);

    AgentContract.at(proposalAddress).deposit(Date.now(), {
      from: investorAddress,
      gas: gasLimit,
      value: snapshot.val().price
    }, function(err, contract) {
      if (err) {
        console.error(err);
        return callback(err)
      } else {
        callback(contract.address);
      }
    });
  })
}

function getVar(address, callback) {
  callback(AgentContract.at(address));
}

function getAccounts(callback) {
  callback(accounts);
}

module.exports = {
  getAccounts,
  createProposal,
  investProposal,
  getVar
}
