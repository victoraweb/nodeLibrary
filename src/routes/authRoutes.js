var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function () {
    'use strict';
    authRouter.route('/signup')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users'); // If we do not have a collection called 'users' mongodb will created
                var user = {
                    username: req.body.username, // The names html form inputs
                    password: req.body.password
                };
                collection.insert(user, function (err, result) {
                    req.login(result.ops[0], function () {
                        res.redirect('/auth/profile');
                    });

                });
            });

        });
    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;