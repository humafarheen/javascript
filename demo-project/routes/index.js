var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', errors: req.session.errors, success: req.session.success });
  req.session.errors = null;
});

router.post('/submit', function(request, response, next) {
  var email = request.body.email;
  var password = request.body.password;
  var confirm_password = request.body.confirm_password;
  request.check('email', 'Invalid email address').isEmail();
  request.check('password', 'Password is invalid').isLength({ min: 4 });
  request.check('confirm_password', 'Password should match with confirm password').equals(password);
  var errors = request.validationErrors();
  if(errors) {
    request.session.errors = errors;
    response.redirect('/');
  } else {
    request.session.success = true;
  }
  response.redirect('/');
});
module.exports = router;
