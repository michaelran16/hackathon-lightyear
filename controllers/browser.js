const express = require('express');

const router = express.Router();
const StellarSdk = require('stellar-sdk');

router.get('/', (req, res) => {
  res.render('browser/browser', {
    title: 'XLM Browser'
  });
});

module.exports = router;
