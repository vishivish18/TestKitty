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
        return res.send({
        message: 'login failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: 'login successful'
        });
      });
    })(req, res);
  
  },
  
  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  }
};