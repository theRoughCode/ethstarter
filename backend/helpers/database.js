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
var ref = db.ref('db');

function addUser(name, price) {
  return ref.child(name).set(price);
}

function getUser(name) {
  return ref.child(name).once('value');
}

function addProposal(title, price, description) {
  return ref.child(title).set({
    "price": price,
    "description": description
  });
}

module.exports = {
  addUser,
  getUser,
  addProposal
}
