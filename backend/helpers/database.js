const admin = require('firebase-admin');

require('dotenv').config();

var serviceAccount = {};
serviceAccount["type"] = process.env.TYPE;
serviceAccount["project_id"] = process.env.PROJECT_ID;
serviceAccount["private_key_id"] = process.env.FIREBASE_ID;
serviceAccount["private_key"] = process.env.FIREBASE_KEY;
serviceAccount["client_email"] = process.env.FIREBASE_EMAIL;
serviceAccount["client_id"] = process.env.FIREBASE_CLIENT_ID;
serviceAccount["auth_uri"] = process.env.FIREBASE_AUTH_URI;
serviceAccount["token_uri"] = process.env.FIREBASE_TOKEN_URI;
serviceAccount["auth_provider_x509_cert_url"] = process.env.FIREBASE_AUTH_CERT;
serviceAccount["client_x509_cert_url"] = process.env.FIREBASE_CLIENT_CERT;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

var db = admin.database();
var proposalRef = db.ref('proposals');

function addProposal(title, price, description, royalty, imageURL, mileStones, contractAddress, entrepreneurAddress) {
  return proposalRef.child(contractAddress).set({
    "title": title,
    "price": price,
    "description": description,
    "royalty": royalty,
    "imageURL": imageURL,
    "entrepreneurAddress": entrepreneurAddress,
    "mileStones": mileStones
  });
}

/*
 * @params proposalAddress, investorAddress, day, month, year
 */
function setInvestor(data) {
  return getProposal(data.proposalAddress).then(snapshot => {
    if (snapshot.val()) {
      const investors = (snapshot.val().investors) ? snapshot.val().investors : [];
      investors.push({
        amount: snapshot.val().price,
        address: data.investorAddress,
        timeStamp: data.timeStamp
      });
      proposalRef.child(`${data.proposalAddress}/investors`).set(investors);
    }
  });
}

function getProposal(contractAddress) {
  return proposalRef.child(contractAddress).once('value');
}

function getAllProposals() {
  return proposalRef.once('value');
}

function generateGrowth(contractAddress, arr) {
  return proposalRef.child(`${contractAddress}/growth`).set(arr);
}

function generateInvestors(contractAddress, arr) {
  return proposalRef.child(`${contractAddress}/investors`).set(arr);
}

function setImage(contractAddress, imageUrl) {
  return proposalRef.child(`${contractAddress}/imageUrl`).set(imageUrl);
}

module.exports = {
  addProposal,
  setInvestor,
  getProposal,
  getAllProposals,
  generateGrowth,
  generateInvestors,
  setImage
}
