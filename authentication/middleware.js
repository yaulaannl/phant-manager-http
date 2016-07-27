function authenticationMiddleware () {
  return function (req, res, next) {
    console.log(req.session);
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}

module.exports = authenticationMiddleware
