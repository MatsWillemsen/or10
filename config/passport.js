var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOneById(id).then(function (user) {
        done(null, user);
    }).fail(function(err) {
      done(err);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
    User.findOne({ username: username}).then(function(user) {
            if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
            if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
            return done(null, user);
        }).fail(function(err) {
            return done(err);
        });
    }
));
