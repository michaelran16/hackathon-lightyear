const express = require('express');

// const Post = require('../models/Post');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('paste/paste', {
    title: 'Paste Tools'
  });
});

router.get('/save', async (req, res) => {
  const str = '<h2>save</h2>';

  res.render('paste/abc', {
    title: 'Horizon Testing Tools',
    dynamic_content: str
  });
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
