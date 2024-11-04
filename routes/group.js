const router = require('express').Router();

const { validationRouterCreateGroup, validationRouterDeleteGroup } = require('../validations/validationRouter');

const { getGroups, createGroup, deleteGroup, getGroup } = require('../controllers/group');

router.get('/group', getGroups);

router.post('/group', validationRouterCreateGroup, createGroup);

router.delete('/group/:_id', validationRouterDeleteGroup, deleteGroup);

module.exports = router;
