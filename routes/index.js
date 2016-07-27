//home page
exports.home = function(req, res) {
  res.render('home', {
    title: 'never forget.'
  });
};

//login page
exports.login = function(req, res) {
  res.render('login', {
    title: 'never forget.'
  });
};
