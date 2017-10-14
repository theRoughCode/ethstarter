// grab the packages we need
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./routes');

//  Connect all our routes to our application
app.use('/', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Turn on that server!
app.listen(port, () =>
          console.log('Server started! At http://localhost:' + port));
app.use(express.static(path.join(__dirname, '/')));

app.set('views', path.join(__dirname, '../frontend/public'));
app.engine('html', require('ejs').renderFile);
