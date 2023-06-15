let router = require('express').Router();
const passport = require('passport');
const UserController = require('../controllers/UserController');

const passport_roles = require('../auth/passport')
const ROLES = require('../utils/Roles')

const Util = require('../utils/Utils');
const util = new Util();

function authorized(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (error, user) => {
        let token = req.header('Authorization');

        if (token === undefined) {
            util.setError(401, 'No token');
            return util.send(res);
        }

        if (error || !user) {
            util.setError(401, 'Token not valid');
            return util.send(res);
        }

        req.user = user;

        next();
    })(req, res, next);
}

router.get('/', authorized,
                passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin, ROLES.Employee), 
                UserController.getAllUsers);

router.get('/me', authorized,
                  UserController.getProfile);
router.put('/me', authorized,
                  UserController.updateProfile);
router.delete('/me', authorized, UserController.deleteProfile);

router.get('/:id', authorized,
                   passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin, ROLES.Employee),
                   UserController.getUser);
router.put('/:id', authorized,
                   passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin),
                   UserController.updateUser);
router.delete('/:id', authorized,
                      passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin),
                      UserController.deleteUser);

router.post('/register', UserController.register);
//router.post('/addUser', passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin), UserController.register);
router.post('/login', UserController.login);
//router.post('/refresh-token', UserController.refreshToken);
router.post('/disconnect', authorized, UserController.disconnect);

//Export API routes
module.exports = router;
