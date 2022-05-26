const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
require('dotenv').config()

const app = new express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ugne.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ugne.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ugne.online/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const uri = process.env.ATLAS_DEMO

mongoose.connect(uri, {useNewUrlParser: true})
  .then(() => console.log('You are now connected to Mongo'))
  .catch(err => console.error('Something went wrong', err))

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: true
}));

app.use(connectFlash());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/routes')(app);

process.env.NODE_ENV = 'production';

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get(['/demo', '/demo/*'], (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

// Starting both http & https servers
const httpServer = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
