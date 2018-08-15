// server.js

// init project
const atob = require('atob');
const bodyParser = require('body-parser');
const btoa = require('btoa');
const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const myNetworkInterfaces = require('./helpers/networkInterfaces')

const { log } = console;

const { Url } = require('./models/Url');

const app = express();


const connectionString = process.env.MONGO_ATLAS_CONNECTION_STRING;

const port = process.env.PORT || 8080;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

app.post('/api/getShortLink', (req, res, next) => {
  // const { hash } = req.body;
  console.log('hash');
  console.log(req.body);
  // const id = atob(hash);
  // let shortLink = {hash: baseId, }
  // TODO: add the host data
  res.send(req.body);
});

app.get('/:hash', (req, res) => {
  const baseId = req.params.hash;
  const id = atob(baseId);
  Url.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect('/');
    }
  });
});

app.post('/shorten', (req, res, next) => {
  console.log('Inside post req.body.url');
  console.log(req.body);
  const urlData = req.body.url;
  Url.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log('entry found in db');
      console.log({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
    } else {
      console.log('entry NOT found in db, saving new');
      const stringUrl = urlData.toString();
      const url = new Url({
        url: stringUrl
      });
      url.save(() => {
        // Use any CSS color name

        // crayon('#ffcc00').log('old gold');

        // Compose multiple styles using the chainable API
        // log(chalk.grey.bgGreen.bold('FROM SAVE'));

        log(
          chalk
            .bgHex('#89CFF0')
            .hex('#36454F')
            .bold('\n      FROM SAVE    \n')
        );
        console.log('url._id');
        console.log(url._id);
        console.log('btoa');
        console.log(btoa(url._id));
        if (err) console.error(err);
        res.send({
          url: urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: 'OK'
        });
      });
    }
  });
});

var network = require('network');
 

// ROUTES
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  log(
  chalk
    .bgHex('#FFCC00')
    .hex('#36454F')
    .bold(`              Your app is listening at http://${myNetworkInterfaces[0].address}:${port}              `)
);
});

// connect to mongoose
// the `dbName` below is essential, the db in the connection string is now ignored
const db = mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    dbName: 'test'
  }
);

db.then(
  (database) => {
    console.log("we're connected to mongoDB!");    
  },
  (err) => {
    console.error(err);
  }
).catch((err) => {
  console.error(err);
});
