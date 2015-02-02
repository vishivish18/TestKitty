
var bcrypt = require('bcryptjs');
module.exports = {
 schema: true,
  autoPK: false,
  attributes: {
    
       id: {
            type: 'integer',
            required: true,
            primaryKey: true
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
      
      
      flag: {
          type:'boolean',
          defaultsTo: 'false'
     
    },
      
      password: {
      type: 'string',
       required: true
     
      },
      re_password: {
      type: 'string'
         
      },
      UserBalance: {
            model: 'UserBalance'
        },
        UserInTable: {
            model: 'UserInTable'
        },
      toJSON: function() {
      var obj = this.toObject();
      return obj;
    }

  },
    
     beforeCreate: function(item, cb) 
     {

      var incModel = "User";

        Counter.findOne({ "model_name": incModel }).exec(function (err, counter) {
            if (err) return err;
            if (counter) {
                var newAmount = counter.amount + 1;
                counter.amount = newAmount;
                counter.save(function (err, c) 
                {
                    item.id = newAmount;
                    bcrypt.genSalt(10, function(err, salt) 
                   {
                    bcrypt.hash(item.password, salt, function(err, hash)
                    {
                     item.password = hash;
                    cb(null,item);
                    });
                    });
                   
                });
            } else {
                Counter.create({ amount: 1, model_name: 'User' }, function countercreate(err, user) {
                    if (err) {

                    }
                });
                item.id = 1;
                 
                bcrypt.genSalt(10, function(err, salt) 
                   {
                    bcrypt.hash(item.password, salt, function(err, hash)
                    {
                    item.password = hash;
                    
                    console.log(item.password);
                    cb(null,item);
                    });
                    });
                
            }
        });

      
  }
    
    
    
};