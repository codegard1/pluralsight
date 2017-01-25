var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = require('../config/db');
var passport = require('passport');

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
                    req.login(results, function () {
                        res.redirect('/auth/profile');
                    });
                });
            });

        });
    authRouter.route('/signIn')
        .post(passport.authenticate(
            'local', {
                failureRedirect: '/'
            }
        ), function (req, res) {
            res.redirect('/');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                console.log('no user; redirecting to /');
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};