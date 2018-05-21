const Post = require('../models/Post');

const striptags = require('striptags');


exports.index = (req, res) => {
  Post.find({}).then((posts) => {
    const postArray = [];

    posts.forEach((doc) => {
      const {
        _id,
        source_url,
        body,
        title
      } = doc;

      postArray.push({
        id: _id,
        short_title: `${title.substring(0, 9)}...`,
        full_title: title,
        source_url,
        short_body: `${striptags(body).substring(0, 99)}...`,
        full_body: body,
      });
    });

    return Promise.all(postArray);
  }).then((postArray) => {
    res.render('post', {
      title: '区块链新闻',
      post_titles: postArray
    });
  }).catch((error) => {
    res.status(500).send('one of the queries failed', error);
  });
};

exports.viewPost = (req, res, next) => {
  console.log(req.params.postid);

  Post.findById(req.params.postid, (err, article) => {
    if (err) {
      return next(err);
    }

    console.log(article.title);
    res.render('article', {
      article
    });
  });
};
