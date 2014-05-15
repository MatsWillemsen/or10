var passport = require('passport');
module.exports = {
    passport_local: function(req, res)
    {
        passport.authenticate('local', function(err, user, info)
        {
          console.log("Error" + err);
          console.log("User" + user);
          console.log("Info" + info);
            if ((err) || (!user))
            {
                res.send(404, { err: 'User not found'});
                return;
            }

            req.logIn(user, function(err)
            {
                if (err)
                {
                    res.send(404, err);
                    return;
                }
                res.redirect('/');
                return;
            });
        })(req, res);
    },

    logout: function (req,res)
    {
        req.logout();
        res.redirect('/');
    },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}


};
