const router = require('express').Router();

const {
  validationRouterCreateQuestionnaireAdmin,
  validationRouterDeleteQuestionnaireAdmin,
  validationRouterFixQuestionnaireAdmin,
  validationRouterFixModerationQuestionnaireAdmin,
} = require('../validations/validationRouter');

const {
  getQuestionnairesAdmin,
  createQuestionnaireAdmin,
  patchQuestionnaireAdmin,
  patchQuestionnaireAdminModeration,
  deleteQuestionnaireAdmin,
  patchQuestionnairesAdminPostGo,
} = require('../controllers/questionnaireAdmin');

router.get('/questionnaire/admin', getQuestionnairesAdmin);

router.post('/questionnaire/admin', validationRouterCreateQuestionnaireAdmin, createQuestionnaireAdmin);

router.patch('/questionnaire/admin/:_id', validationRouterFixQuestionnaireAdmin, patchQuestionnaireAdmin);

router.patch(
  '/questionnaire/admin/moderation/:_id',
  validationRouterFixModerationQuestionnaireAdmin,
  patchQuestionnaireAdminModeration
);

router.delete('/questionnaire/admin/:_id', validationRouterDeleteQuestionnaireAdmin, deleteQuestionnaireAdmin);

// технический метод для добавление массива postGo на базе строкового postGoAndChs
// закомментировать на прод контроллер и роут
router.patch( '/questionnaire/admin/postGo/:_id', patchQuestionnairesAdminPostGo );

module.exports = router;
