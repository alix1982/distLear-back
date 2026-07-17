const router = require('express').Router();

// const {
//   validationRouterCreateGroup,
//   validationRouterDeleteGroup,
//   validationRouterGroupUserData,
// } = require('../validations/validationRouter');

const {
  createFeedback,
  getFeedbacksAdmin,
  patchFeedbackAdmin,
  deleteFeedbackAdmin
} = require('../controllers/feedback');

router.get('/feedback', getFeedbacksAdmin);

// router.get('/group/:_id', validationRouterGroupUserData, getGroupUserData);

router.post('/feedback', createFeedback);

router.patch('/feedback/:id', patchFeedbackAdmin);

router.delete('/feedback/:id', deleteFeedbackAdmin);

module.exports = router;
