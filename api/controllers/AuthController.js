/**
 * AuthController
 *
 */
var passport = require('passport');
module.exports = {

 login: function(req,res){
        res.view();
    },

  processcheck: function (req, res) {
    console.log('I am here');

      passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        //return res.send({
        //message: 'login failed'

        //});
          return res.redirect('/user/new');
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        //return res.send({
        //  message: 'login successful'

    //    });
          return res.redirect('/user/show/'+user.id);
      });
    })(req, res);

  },

  'facebook': function (req, res, next) {
    passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
    function (err, user) {
      req.logIn(user, function (err) {
        if(err) {
          req.session.flash = 'There was an error';
          res.redirect('user/login');
        } else {
          req.session.user = user;
          res.redirect('/user/dashboard');
        }
      });
    })(req, res, next);
  },

  'facebook/callback': function (req, res, next) {
    passport.authenticate('facebook',
    function (req, res) {
      res.redirect('/user/dashboard');
    })(req, res, next);
  }




};
