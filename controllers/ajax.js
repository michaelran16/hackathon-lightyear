const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const newId = Math.floor(Math.random() * 1000);
  console.log(`newId is ${newId}`);

  res.render('ajax/ajax', {
    title: 'ajax'
  });
});

router.post('/ajaxURL', (req, res) => {
  console.log("hello ajax");
  res.send('I want this string to return to the client');
});

module.exports = router;
