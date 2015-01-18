var mandrill = require('node-mandrill')('J2uoD5eO9PA7eOs8Z407UQ');
module.exports = {
	
    'new': function(req,res){
        res.view();
    },
    
    
      create: function (req, res, next){
          
        
        User.create(req.params.all(), function userCreated (err, user){
           
            
                    if (err) {
                        console.log(err);
                        req.session.flash = {
                        err:err
                        }
                        return res.redirect('/user/new');
                    }
            else
            
            {
             var mail_path ="localhost:1337/api/userd/"+user.id;
                console.log(mail_path)
            
                  //////////////////////////////////////////////////////////////////////////////////////////////////
                                    mandrill('/messages/send', {
                                                    message: {
                                                        to: [{email: user.username, name: 'Kitty'}],
                                                        from_email: 'me@roshanraj.com',
                                                        subject: "Welcome to Kitty | Activate your account",
                                                        html: "<a href=\"http:\/\/"+mail_path+"\">Click Here<\/a> to verify your email address and activate your account "
                                                    }    
                                                }, function(error, response)
                                                {
                                                    //uh oh, there was an error
                                                    if (error) console.log( JSON.stringify(error) );

                                                    //everything's good, lets see what mandrill said
                                                    else console.log(response);
                                                });

                                
                                //////////////////////////////////////////////////////////////////////////////////////////////////
                                
            res.redirect('/user/show/'+user.id);
            }
            
            //res.json(user);
            
            
            
            
            
                    
        }); 
    },
    
    
    
    show: function (req, res, next){
        User.findOne(req.param('id'), function foundUser (err, user){
            if(err) return next (err);
            if(!user) return next();
            res.view({
            user: user
            });
        
        });
    },
    
    
    
    emailresetcheck: function (req, res, next){
                console.log('in action');
        var test = req.body.username;
        console.log(test);
        User.findOne({ username: test }, function(err, user) {
            if(err) return next (err);
            if(!user) return next();
            
            
            
             var mail_path ="localhost:1337/user/userreset/"+user.id;
               console.log(mail_path)
            
               
               
                  //////////////////////////////////////////////////////////////////////////////////////////////////
                                    mandrill('/messages/send', {
                                                    message: {
                                                        to: [{email: user.username, name: 'Test Kitty'}],
                                                        from_email: 'me@roshanraj.com',
                                                        subject: "Password Reset",
                                                        html: "<a href=\"http:\/\/"+mail_path+"\">Click Here<\/a> to reset your Password "
                                                    }    
                                                }, function(error, response)
                                                {
                                                    //uh oh, there was an error
                                                    if (error) console.log( JSON.stringify(error) );

                                                    //everything's good, lets see what mandrill said
                                                    else console.log(response);
                                                });

                                
                                //////////////////////////////////////////////////////////////////////////////////////////////////
                                
            console.log('Email sent sucessfully for password reset !');
                //res.redirect('/user/new/');
                var sentmail = 'Email sent sucessfully for password reset, please check your registered email id !';
                res.json(sentmail);
            
    
});
        
    },
    
    
    
    
     index: function (req, res, next){
        User.find(function foundUsers (err, users){
            if(err) return next (err);
           
            res.view({
            users: users
            });
        
        });
    },
    
        edit: function (req, res, next){
        User.findOne(req.param('id'), function foundUser (err, user){
            if(err) return next (err);
            if(!user) return next();
            res.view({
            user: user
            });
        
        });
    },
    
        update: function (req, res, next){
        User.update(req.param('id'), req.params.all(), function userUpdated (err){
            if(err) { 
                return res.redirect('/user/edit/' + req.param('id'));
            }
            res.redirect('/user/show/' + req.param('id'));
        });
    },
    
    verifyemail: function (req, res, next){
        
        console.log(req.params.id);
          
        
        User.update(req.params.id ,{flag: true}).exec(function(err, users) {
         if(err) {return res.serverError(err);} 
         
            
            //return res.send('success');
            console.log('success'+req.params.id);
            console.log('Updated');
            res.redirect('/user/show/' + req.param('id'));
});
        
        
    },
    
    
    
    updatepassword: function (req, res, next){
        
        var check = req.body.password;
        res.json(check);
        
    },
    
    
    
     destroy: function (req, res, next){
        User.findOne(req.param('id'), function foundUser (err, user){
            if(err) return next (err);
            if(!user) return next('User does not exist');
            User.destroy(req.param('id'), function userDestroyed(err){
            
            if(err) return next(err);
            
            });
           res.redirect('/user');
        
        });
    },
    
   
};

