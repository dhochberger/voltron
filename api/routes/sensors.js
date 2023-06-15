let router = require('express').Router();
const passport = require('passport');
const SensorController = require('../controllers/SensorController');

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

router.get('/all', SensorController.getAllSensors);
router.get('/all/date', SensorController.getAllSensorsByDate);

router.get('/humidity', SensorController.getAllHumidity);
router.get('/humidity/date', SensorController.getHumidityByDate);
router.post('/humidity', SensorController.addHumidity);
router.delete('/humidity', authorized,
                           passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin),
                           SensorController.deleteHumidityByDate)

router.get('/luminosity', SensorController.getAllLuminosity);
router.get('/luminosity/date', SensorController.getLuminosityByDate);
router.post('/luminosity', SensorController.addLuminosity);
router.delete('/luminosity', authorized,
                   passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin),
                   SensorController.deleteLuminosityByDate)

router.get('/temperature', SensorController.getAllTemperature);
router.get('/temperature/date', SensorController.getTemperatureByDate);
router.post('/temperature', SensorController.addTemperature);
router.delete('/temperature', authorized,
                   passport_roles.checkIsInRole(ROLES.SuperAdmin, ROLES.Admin),
                   SensorController.deleteHumidityByDate)

router.get('/random', SensorController.generateRandomDatas)

//Export API routes
module.exports = router;
