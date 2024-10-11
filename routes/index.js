// const { errors } = require('celebrate');
const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const noAutorizationRouter = require('./noAutorization');
const authAdmin = require('../middlewares/authAdmin');
const userRouterAdmin = require('./usersAdmin');
const questionnaireRouterAdmin = require('./questionnaireAdmin');
const programmRouterAdmin = require('./programm');
const groupRouterAdmin = require('./group');

const errorRouter = require('./errors');
const auth = require('../middlewares/auth');
// const { requestLogger, errorLogger } = require('../middlewares/logger');
const cors = require('../middlewares/cors');

// router.use(requestLogger);
router.use(cors);

router.use(noAutorizationRouter);
router.use(authRouter);
router.use(auth);
router.use(userRouter);
router.use(authAdmin);
router.use(questionnaireRouterAdmin);
router.use(userRouterAdmin);
router.use(programmRouterAdmin);
router.use(groupRouterAdmin);

router.use(errorRouter);
// router.use(errorLogger);
// router.use(errors());

module.exports = router;
