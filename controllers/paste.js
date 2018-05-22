const express = require('express');

// const Post = require('../models/Post');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('paste/index', {
    title: 'Paste Tools'
  });
});

module.exports = router;