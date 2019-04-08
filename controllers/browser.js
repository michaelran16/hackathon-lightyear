const express = require('express');

const router = express.Router();
const StellarSdk = require('stellar-sdk');

router.get('/', (req, res) => {
  res.render('browser/browser', {
    title: 'XLM Browser'
  });
});


router.get('/view', async (req, res) => {
  var xlmID = req.query.id;
  console.log(xlmID);

  res.render('paste/view', {
    respStr: 'Your Text:' + xlmID
  });
});

// http://localhost:8080/horizon/transaction
router.get('/payment', async (req, res) => {
  let str = '<h2>start testing transaction with payment opeartion...</h2>';
  let transaction;

  res.render('horizon/horizon', {
    title: 'Horizon Testing Tools',
    dynamic_content: str
  });
});

module.exports = router;
