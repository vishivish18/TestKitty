/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    // Join a chat room -- this is bound to 'post /room/:roomId/users'
    'join': function (req, res, next)
     {
     var socket = req.socket;
     var uderid=req.session.userid;
     var roomvalue=req.param('roomId');
    
        UserInRoom.findOne(({ TableValue: parseInt(roomvalue), Status: 1, Usercount: { $lt: 5} }), function foundUser(err, userInRoom)
         {
         
            if (userInRoom != null)
            {
             
             socket.join(userInRoom.id);
             User.findOne(uderid, function foundUser(err, user) 
             {
             console.log("dfsd");
              console.log(user);
              console.log(user.UserInTable);
              if(user.UserInTable==0 ||user.UserInTable =="undefined")
               {
               console.log("step 1 ");
                user.UserInTable=userInRoom.id;
                user.save();
                console.log("step 2 ");
                var user = userInRoom.Usercount;
                userInRoom.Usercount = user + 1; ;
                userInRoom.save();

                UserInTable.create({  UserId: uderid, Position: user + 1, TableId: userInRoom.id, id: 0  }, function userCreated(err, usrBalance) {
                
                 });
                 socket.in(userInRoom.id).emit("room", { verb: "created", data: { id: req.session.userid, name: req.session.me} })
                 socket.broadcast.to(userInRoom.id).emit("room", { verb: "created", data: { id: req.session.userid, name: req.session.me} })
                 }
                 });
                User.find({ UserInTable: parseInt(userInRoom.id)}, function (err, userModel) {
                userModel.forEach(function (user) 
                {
                
                socket.in(userInRoom.id).emit("room", { verb: "created", data: { id: user.id, name: user.name} })
                  });
                });
                
            }
            else {
                UserInRoom.create({ id: 0, TableValue: roomvalue, Status: 1, Usercount: 1 }, function userCreated(err, userInRoom) 
                {
                UserInTable.create({  UserId: uderid, Position: 1, TableId: userInRoom.id, id: 0  }, function userCreated(err, usrBalance) {
                 if (err) {
                res.send(err)
                 }
                });
                User.findOne(uderid, function foundUser(err, user) {
                if (err) return res.serverError(err);
                user.UserInTable=userInRoom.id;
                user.save();
                });
                     
                    if (err) return res.serverError(err);
                     socket.join(userInRoom.id);

                socket.in(userInRoom.id).emit("room", { verb: "created", data: { id: req.session.userid, name: req.session.me} })
                socket.broadcast.to(userInRoom.id).emit("room", { verb: "created", data: { id: req.session.userid, name: req.session.me} })
                });
            }

        });

        return next();
    },
    'jointen': function (req, res, next) {
        console.log("sd");
        sails.io.sockets.emit("room", { verb: "created", data: { id: req.session.userid, name: req.session.me} })
        //Room.subscribe(req, 1, { verb: "created", data: { id: req.session.userid, name: req.session.me} });
        //        UserInRoom.findOne(({ TableValue: 5, Status: 1, Usercount: { $lt: 5} }), function foundUser(err, userInRoom) {
        //            if (userInRoom != null) {
        //                console.log(userInRoom);
        //                var user = userInRoom.Usercount;
        //                userInRoom.Usercount = user + 1; ;
        //                userInRoom.save();
        //                req.session.tableid = userInRoom.id;
        //                UserInRoom.subscribe(req, userInRoom.id, ['message']);

        //            }
        //            else {
        //                UserInRoom.create({ id: 0, TableValue: 5, Status: 1, Usercount: 1 }, function userCreated(err, userInRoom) {
        //                    console.log("dfd");
        //                    if (err) return res.serverError(err);
        //                    req.session.tableid = userInRoom.id;
        //                    UserInRoom.subscribe(req, userInRoom.id, ['message']);

        //                });
        //            }

        //        });
        return next();
    },

    // Leave a chat room -- this is bound to 'delete /room/:roomId/users'
    'leave': function (req, res, next) {
        // Get the ID of the room to join
        var roomId = req.param('roomId');
        // Unsubscribe the requesting socket from the "message" context
        Room.unsubscribe(req, roomId, ['message']);
        // Continue processing the route, allowing the blueprint
        // to handle removing the user instance from the room's 
        // `users` collection.
        return next();
    }

};
