
module.exports = {


  buychips: function (req, res) {
      
      UserBalance.create(req.params.all(), function BalanceAdded(err, userbalance,user){
           
                    if (err) {
                        console.log(err);
                        req.session.flash = {
                        err:err
                        }
                        return res.redirect('/user/new/show'+user.id);
                    }
            
            res.json(userbalance);
            
            
           // res.redirect('/user/show/'+user.id);
                    
        }); 

  },

        
      

};
