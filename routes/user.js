var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');


//*******Ajout *********
router.post('/user', function(req, res, next) {
    var user = new User();
    user.name = req.body.name ;
    user.type = req.body.type ;

    // save the contact and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New user created!',
            data: user
        });
    });

});

router.get('/user', function(req, res, next) {

    User.find(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: users
        });
    });
});

router.get('/user/:id', function(req, res, next) {

    User.findOne({"_id": req.params.id}).exec(function (err, users) {
        if (err) {
            res.json(err);
        }
        res.json(users
        );
    });
});
module.exports = router;
