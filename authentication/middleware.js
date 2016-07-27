function authenticationMiddleware () {
  return function (req, res, next) {
    console.log(req.session);
    if (req.isAuthenticated()) {
      console.log('is authenticated');
      return next();
    }
    res.redirect('/');
  }
}

module.exports = authenticationMiddleware
