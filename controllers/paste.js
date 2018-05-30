const express = require('express');

// const Post = require('../models/Post');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('paste/paste', {
    title: 'paste'
  });
});

router.get('/new', async (req, res) => {
  const newId = Math.floor(Math.random() * 1000);

  res.redirect(newId);
});

router.post('/load', async (req, res) => {
  console.log(req.body.short_id_input);
  res.redirect(`/paste/${req.body.short_id_input}`);
});

router.post('/save', async (req, res) => {
  console.log('save save');
  res.send('save');
});

router.get('/:shortId', async (req, res) => {
  console.log(req.params.shortId);

  res.render('paste/view', {
    respStr: req.params.shortId
  });
});

module.exports = router;
