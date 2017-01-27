var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = require('../config/db');

module.exports = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };
                collection.insert(user, function (err, results) {
                    req.login(results[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });
        }); // end .post()

    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        }); // end .get()

    return authRouter;
};