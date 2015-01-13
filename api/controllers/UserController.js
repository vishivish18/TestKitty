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
            
            
                  //////////////////////////////////////////////////////////////////////////////////////////////////
                                    mandrill('/messages/send', {
                                                    message: {
                                                        to: [{email: user.username, name: 'Roshan Raj'}],
                                                        from_email: 'me@roshanraj.com',
                                                        subject: "test email",
                                                        text: "Test Email, validate by visiting the link <a     href='localhost:3000/api/userd/"+user.id+"'>localhost:3000/api/userd/"+user.id+"></a>"
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
        
         
        
//        User.update(req.params.id,{$set : {flag: '1'}}, function (err, user){
//            if(err) { 
//                return res.redirect('/user/edit/' + req.param.id);
//                console.log('failure'+req.params.id);
//            }
//            
//            console.log('success'+req.params.id);
//            res.redirect('/user/approve/');
//            
//        });
//        
        
        User.update(req.params.id ,{flag: "69"}).exec(function(err, users) {
         if(err) {return res.serverError(err);} 
         
            
            //return res.send('success');
            console.log('success'+req.params.id);
            res.redirect('/user/approve/');
});
        
        
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

