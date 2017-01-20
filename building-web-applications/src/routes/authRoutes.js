var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            res.login(req.body, function () {
                res.redirect('/auth/profile');
            });
        });

    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};