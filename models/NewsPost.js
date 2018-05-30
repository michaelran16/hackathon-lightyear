const mongoose = require('mongoose');

const newsPostSchema = new mongoose.Schema({
  author: mongoose.Schema.Types.ObjectId,
  body: String,
  source_url: String,
  title: String,
  date: Date
});

const NewsPost = mongoose.model('Post', newsPostSchema);

module.exports = NewsPost;