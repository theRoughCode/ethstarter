const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const async = require('async');
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
 * data { title, price, description, royalty, address, image_url, mileStones: { profit, amount, timeStamp } }
 * @returns address of contract
 */
function createProposal(data, callback) {
  if (!isContractInstantiated()) {
    console.log('Contract is not instantiated.');
    callback(null);
  } else if (!data.address) {
    console.log('Owner address is invalid.');
    callback(null);
  } else {
    AgentContract.new(data.price, data.royalty, {
      data: bytecode,
      from: data.address,
      gas: gasLimit
    }, function(e, contract){
      if(!e) {
        if(!contract.address) {
          console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
          console.log("Contract mined! Address: " + contract.address);
          database.addProposal(data.title, data.price, data.description, data.royalty, data.image_url, data.mileStones, contract.address, data.address)
            .then(success => {
              console.log("Created new contract successfully");
              data.mileStones.forEach((item) => {
                contract.addMileStone(item.profit, item.amount, item.timeStamp, {
                  from: data.address,
                  gas: gasLimit
                }, function(err, contract) {
                  if (err) return callback(err)
                  else return callback(contract.address);
                });
              });
              return callback(contract.address);
            }, error => {
              console.log(error);
              return callback("Failed to update database.");
            })
        }
      } else {
        console.log(e);
        return callback("Failed to create new contract.");
      }
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

function getProposal(address, callback) {
  database.getProposal(address).then(snapshot => {
    if (!snapshot.val()) {
      console.error('ERROR: Address does not exist.');
      return callback(null);
    } else return callback(snapshot.val());
  });
}

function getAllProposals(callback) {
  database.getAllProposals().then(snapshot => {
    if (!snapshot.val()) callback(null);
    else callback(snapshot.val());
  });
}

function getAccounts(callback) {
  callback(accounts);
}

function generateHistory(contractAddress, callback) {
  generateInvestors(Math.round(Math.random() * 4 + 1), investorArr => {
    database.generateInvestors(contractAddress, investorArr).then(success => {
      var isAtLeastYear = investorArr[0].year <= 2016 && investorArr[0].month <= 9;
      var growthArrSize = (isAtLeastYear) ? 12 : ((investorArr[0].year === 2016) ? 22 - investorArr[0].month : 11 - investorArr[0].month);
      generateGrowth(growthArrSize, growthArr => {
        database.generateGrowth(contractAddress, growthArr).then(success => {
          callback(true);
        }, error => {
          console.error(err);
          console.log(`Error generating growth for ${contractAddress}`);
          callback(false);
        });
      });
    }, error => {
      console.error(err);
      console.log(`Error generating investors for ${contractAddress}`);
      callback(false);
    })
  });
}

function generateInvestors(arraySize, callback) {
  async.times(arraySize, (i, next) => {
    next(null, {
      amount: (Math.random() * 50000 + 1000).toFixed(2),
      day: Math.round(Math.random() * 28 + 1),
      month: Math.round(Math.random() * 12 + 1),
      year: Math.round(Math.random() * 3 + 2014)
    });
  }, (err, arr) => callback(arr.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      else if (a.month !== b.month) return a.month - b.month;
      else return a.day - b.day;
    })));
}

function generateGrowth(arraySize, callback) {
    async.times(arraySize, (i, next) => {
      next(null, (Math.random() * 0.7 - 0.3).toFixed(2));
    }, (err, arr) => callback(arr));
}

module.exports = {
  getAccounts,
  createProposal,
  investProposal,
  getProposal,
  getAllProposals,
  generateHistory
}
