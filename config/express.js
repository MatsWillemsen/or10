var passport = require('passport');
var parted = require('parted');

module.exports.express = {
    customMiddleware: function (app) {
        app.use(passport.initialize());
        app.use(passport.session());
    }
};
