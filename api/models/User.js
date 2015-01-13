/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');
module.exports = {
schema: true,
  attributes: {
    
      userid: {
     
    },
      
    username: {
     type: 'email',
        required: true, 
        unique: true
    },
     
      
      
     name: {
      type: 'string',
          required: true,
          
          
      },
      
      mobile: {
        type: 'string',
          
    },
      
      provider: {
     
    },
      
      status: {
     
    },
      flag: {
          type:'string',
          defaultsTo: '0'
     
    },
      
      password: {
      type: 'string',
          required: true
     
      },
      re_password: {
      type: 'string',
          required: true
     
      },
      toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },
    
     beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
    
    
    
};

