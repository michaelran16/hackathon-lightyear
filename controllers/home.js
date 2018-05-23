/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.redirect('/home');
};

exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};
