const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const secureRandom = require('secure-random');

const Util = require('../utils/Utils');
const util = new Util();

const variables = {
    secretOrKey: secureRandom(256, { type: 'Buffer' }),
};

if (process.env.NODE_ENV.toLowerCase() == 'development') {
    variables.secretOrKey = process.env.JWT_SECRET;
}

const checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        util.setError(401, 'No user');
        return util.send(res);
    }
    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
        util.setError(403, 'Forbidden');
        return util.send(res);
    }
    return next()
}

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: variables.secretOrKey,
        },
        function (jwtPayload, done) {
            return User.findOne({ _id: jwtPayload.id }, { password: 0 })
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    )
);

module.exports = { variables, checkIsInRole};
