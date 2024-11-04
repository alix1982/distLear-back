const ConflictData_409 = require('../errors/409-conflictData');
const IncorrectData_400 = require('../errors/400-incorrectData');
const Questionnaire = require('../models/questionnaire');
const { mesErrConflictQuestionnaire409, mesErrValidationQuestionnaire400, mesQuestion } = require('./messageServer');

const createQuestionnaire = (req, res, next) => {
  const {
    firstName,
    lastName,
    patronymic,
    workName,
    email,
    phone,
    postWork,
    postGoAndChs,
    yearPreviousQualification,
    education,
    snils,
    citizenship,
    consentProcessingPersonalData,
  } = req.body;
  Questionnaire.create({
    firstName,
    lastName,
    patronymic,
    workName,
    email,
    phone,
    postWork,
    postGoAndChs,
    yearPreviousQualification,
    education,
    snils,
    citizenship,
    isModeration: false,
    consentProcessingPersonalData,
  })
    // .then((questionnaire) => {
    //   res.send({...questionnaire, message: mesQuestion});
    // })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        return next(new IncorrectData_400(mesErrValidationQuestionnaire400));
      }
      if (err.code === 11000) {
        return next(new ConflictData_409(mesErrConflictQuestionnaire409));
      }
      return next(err);
    });
};

module.exports = createQuestionnaire;
