/**
* UserInTable.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    autoPK: false,
    attributes: {
        UserId: { type: 'integer' },
        Position: { type: 'integer' },
        TableId: { type: 'integer' },
        id: {
            type: 'integer',
            required: true,
            primaryKey: true

        }

    },
    beforeCreate: function (item, cb) {
        var incModel = "UserInTable";
        Counter.findOne({ "model_name": incModel }).exec(function (err, counter) {
            if (err) return err;
            if (counter) {
                var newAmount = counter.amount + 1;
                counter.amount = newAmount;

                counter.save(function (err, c) {
                    //Error handling...
                    item.id = newAmount;
                    cb();
                });
            } else {
                Counter.create({ amount: 1, model_name: 'UserInTable' }, function countercreate(err, user) {
                    if (err) {

                    }
                });
                item.id = 1;
                cb();
            }
        });
    }
};

