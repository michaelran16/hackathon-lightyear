const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const newsPostSchema = new Schema({
    author: ObjectId,
    body: String,
    source_url: String,
    title: String,
    date: Date
});

const NewsPost = mongoose.model('Post', newsPostSchema);

module.exports = NewsPost;
