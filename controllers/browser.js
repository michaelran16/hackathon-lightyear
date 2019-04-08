const express = require('express');

const router = express.Router();
const StellarSdk = require('stellar-sdk');
const https = require('https');


router.get('/', (req, res) => {
  res.render('browser/browser', {
    title: 'XLM Browser'
  });
});

router.get('/view', async (req, res) => {
  var xlmID = req.query.id;

  // TODO remove
  if (xlmID == '') {
    xlmID = 'GAPMTZ5M6HPGBLRUCEPDXGZB7K5IYN7IUWYKQGSB4BC47P27OB7E6NW5';
  }
  console.log(xlmID);
  // TODO end

  // Now decide if the ID is: 1. account 2. tx 3. ledger 4. other type of ID
  if (xlmID.length == 56 && xlmID.charAt(0) == 'G') {
    // 1. Check if ID is account ID
    var horizonString = 'https://horizon.stellar.org/accounts/' + xlmID;
    https.get(horizonString, (resp) => {
      let data = '';
      console.log(`Start to print HTTPS result on ${horizonString}`);
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      console.log(`Processing HTTPS result on ${horizonString}`);

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log('account_id from HTTPS response is ' + JSON.parse(data).account_id);
        if (JSON.parse(data).account_id == xlmID) {
          res.render('browser/account', {
            parseData: JSON.parse(data)
          });
        } else {
          res.render('browser/unknown', {
            respStr: xlmID
          });
        }
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  } else if (xlmID.length == 64) {
    // 2. Check if ID is transaction ID
    var horizonString = 'https://horizon.stellar.org/transactions/' + xlmID;
    https.get(horizonString, (resp) => {
      let data = '';
      console.log(`Start to print HTTPS result on ${horizonString}`);
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      console.log(`Processing HTTPS result on ${horizonString}`);

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log('hash from HTTPS response is ' + JSON.parse(data).hash);
        if (JSON.parse(data).hash == xlmID) {
          res.render('browser/transaction', {
            parseData: JSON.parse(data)
          });
        } else {
          res.render('browser/unknown', {
            respStr: xlmID
          });
        }
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  } else {
    res.render('browser/unknown', {
      respStr: xlmID + ' length ' + xlmID.length
    });
  }
});

module.exports = router;
