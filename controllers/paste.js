const express = require('express');

// const Post = require('../models/Post');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('paste/paste', {
    title: 'paste'
  });
});

router.get('/new', async (req, res) => {
  var newId = Math.floor(Math.random() * 1000);
  
  res.redirect(newId);
});

// TODO post the form
router.post('/load', async (req, res) => {
  console.log(req.body.short_id_input);
  res.redirect(`/paste/${  req.body.short_id_input}`);
});

router.get('/:shortId', async (req, res) => {
  console.log(req.params.shortId);

  res.render('paste/view', {
    respStr: req.params.shortId
  });
});

module.exports = router;
