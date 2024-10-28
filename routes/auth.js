const router = require('express').Router();
const { login, createPasswordAdmin } = require('../controllers/auth');
const { validationRouterLogin } = require('../validations/validationRouter');

router.post('/signin', validationRouterLogin, login);

router.post('/createPassword', createPasswordAdmin);

module.exports = router;
