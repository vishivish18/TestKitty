/**
 * UserInRoomController
 *
 * @description :: Server-side logic for managing Userinrooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'show': function (req, res) {
        console.log("show");
        res.view();
    },

    'five': function (req, res) {
        if (req.session.userid == null || req.session.userid == "undefined") {
            res.redirect('/user/new');
        }
        else {
            UserInRoom.create({ id: 0, UserId: req.session.userid, RoomType: 1, Status: null }, function userCreated(err, userInRoom) {
                if (err) return res.serverError(err);
                req.session.roomid = userInRoom.id;
                console.log(req.session.roomid);
                //UserInRoom.publishCreate(userInRoom);
                res.view();
            });
        }

    }
	,
    subscribe: function (req, res) {

        // Find all current users in the user model
        UserInRoom.find(function foundUsers(err, users) {
            if (err) return next(err);

            // subscribe this socket to the User model classroom
            //UserInRoom.subscribe(req.socket);

            // subscribe this socket to the user instance rooms
            UserInRoom.subscribe(req.socket, users);

            // This will avoid a warning from the socket for trying to render
            // html over the socket.
            res.send(200);
        });
    }
};

