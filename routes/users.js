const router = require('express').Router();
const { getUserMe, getDataMe, patchUserProgramm, getUserGroup } = require('../controllers/users');
const { validationRouterUpdateProgramm } = require('../validations/validationRouter');

router.get('/user/me', getUserMe);
router.get('/user/meData', getDataMe);
router.get('/user/groups', getUserGroup);
router.patch('/user/updateProgramm/:id', validationRouterUpdateProgramm, patchUserProgramm);
// router.patch('/user/updateProgramm/:id', validationRouterUpdateProgramm, patchUserProgramm);
// router.patch('/user/updateProgramm/:id', patchUserProgramm);

module.exports = router;
