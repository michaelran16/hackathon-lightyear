const NewsPost = require('../models/NewsPost');

const striptags = require('striptags');


exports.index = (req, res) => {
  NewsPost.find({}).limit(8).then((news) => {
    const newsArray = [];

    news.forEach((doc) => {
      const {
        _id,
        sourceUrl,
        body,
        title
      } = doc;

      newsArray.push({
        id: _id,
        short_title: `${title.substring(0, 9)}...`,
        full_title: title,
        sourceUrl,
        short_body: `${striptags(body).substring(0, 99)}...`,
        full_body: body,
      });
    });

    return Promise.all(newsArray);
  }).then((newsArray) => {
    res.render('news/news', {
      title: 'news',
      news_titles: newsArray
    });
  })
    .catch((error) => {
      res.status(500).send('one of the queries failed', error);
    });
};

exports.viewNewsPost = (req, res, next) => {
  console.log(req.params.postid);

  NewsPost.findById(req.params.postid, (err, article) => {
    if (err) {
      return next(err);
    }

    console.log(article.title);
    res.render('news/article', {
      article
    });
  });
};
