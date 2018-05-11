const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    author: ObjectId,
    body: String,
    source_url: String,
    title: String,
    date: Date
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
