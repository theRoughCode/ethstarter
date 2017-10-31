import Web3 from 'web3';


// Checking if Web3 has been injected by the browser (Mist/MetaMask)
let WEB3 = {};
if (typeof window.web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  WEB3 = new Web3(window.web3.currentProvider);
} else {
  console.log('Web3 (MetaMask / Parity) not available!');
  // fallback - local node
  WEB3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

export default WEB3;
